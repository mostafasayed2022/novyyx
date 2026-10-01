import "server-only";

import path from "node:path";
import { cache } from "react";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import type { InquiryStatus, Product, ProductQueryParams } from "@/lib/api/types";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { BLEND_PRODUCTS } from "@/lib/server/blend-seed";
import { HERO_SLIDES, type HeroSlide } from "@/components/home/hero-slide-data";

export interface StoredInquiry {
  id: string;
  kind: "contact" | "partner";
  payload: Record<string, unknown>;
  status: InquiryStatus;
  createdAt: string;
}

interface ContentStore {
  version: number;
  products: Product[];
  heroSlides: HeroSlide[];
  inquiries: StoredInquiry[];
}

const CURRENT_STORE_VERSION = 5;

type HranaValue =
  | { type: "null" }
  | { type: "integer"; value: string }
  | { type: "float"; value: number }
  | { type: "text"; value: string };

type HranaResult = {
  type: "ok" | "error";
  response?: {
    type: string;
    result?: {
      cols?: Array<{ name: string | null }>;
      rows?: HranaValue[][];
    };
  };
  error?: { message?: string; code?: string };
};

const tursoUrl = process.env.TURSO_DATABASE_URL?.trim() || "";
const tursoToken = process.env.TURSO_AUTH_TOKEN?.trim() || "";
const useTurso = tursoUrl.startsWith("libsql://") && Boolean(tursoToken);

const dataDirectory =
  process.env.NOVYX_DATA_DIR?.trim() ||
  (process.env.VERCEL === "1"
    ? path.join("/tmp", "novyx-data")
    : path.join(process.cwd(), ".novyx-data"));
const dataFile = path.join(dataDirectory, "content.json");
let writeQueue = Promise.resolve();
let remoteInitialization: Promise<void> | undefined;
const remoteSnapshots = new WeakMap<ContentStore, string>();
class StoreConflictError extends Error {}

function seedStore(): ContentStore {
  return {
    version: CURRENT_STORE_VERSION,
    products: [...MOCK_PRODUCTS, ...BLEND_PRODUCTS].map((product) => ({
      ...product,
      productType: product.productType ?? (product.slug === "novax-cutis" ? "skin-booster" : "peptide"),
      published: true,
      certificates: product.certificates ?? [],
      specifications: product.specifications ?? {},
    })),
    heroSlides: HERO_SLIDES.map((slide) => ({ ...slide, published: true })),
    inquiries: [],
  };
}


function normalizeStore(parsed: Partial<ContentStore>): ContentStore {
  const seeded = seedStore();
  const storedProducts = Array.isArray(parsed.products) ? parsed.products : seeded.products;
  const parsedVersion = typeof parsed.version === "number" ? parsed.version : 1;

  let products = [...storedProducts];

  // Version 2 introduced the NOVYX Blend Series. Keep dashboard edits intact and
  // only insert blends that are missing from an existing store.
  if (parsedVersion < 2) {
    products = [
      ...products,
      ...BLEND_PRODUCTS.filter(
        (seedProduct) =>
          !products.some(
            (storedProduct) =>
              storedProduct.id === seedProduct.id || storedProduct.slug === seedProduct.slug,
          ),
      ),
    ];
  }

  // Version 3 moved blend records fully into the persistent store and removed
  // the generated local product artwork. Existing blend records are retained,
  // but their old /products/blends/* image references are cleared once.
  if (parsedVersion < 3) {
    products = products.map((product) =>
      product.specifications?.Series === "NOVYX Blend Series" &&
      product.imageUrl?.startsWith("/products/blends/")
        ? { ...product, imageUrl: "" }
        : product,
    );

    products = [
      ...products,
      ...BLEND_PRODUCTS.filter(
        (seedProduct) =>
          !products.some(
            (storedProduct) =>
              storedProduct.id === seedProduct.id || storedProduct.slug === seedProduct.slug,
          ),
      ),
    ];
  }

  // Version 4 is the database-only Blend Series migration. It is intentionally
  // idempotent: it inserts only missing blend records, never overwrites edits
  // made in the dashboard, and removes only obsolete local blend image paths.
  // Cloudinary/external image URLs that were uploaded later are preserved.
  if (parsedVersion < 4) {
    products = products.map((product) =>
      product.specifications?.Series === "NOVYX Blend Series" &&
      product.imageUrl?.startsWith("/products/blends/")
        ? { ...product, imageUrl: "" }
        : product,
    );

    const existingIds = new Set(products.map((product) => product.id));
    const existingSlugs = new Set(products.map((product) => product.slug));
    const missingBlends = BLEND_PRODUCTS.filter(
      (seedProduct) =>
        !existingIds.has(seedProduct.id) && !existingSlugs.has(seedProduct.slug),
    );

    products = [...products, ...missingBlends];
  }

  // Version 5 reclassifies the complete NOVYX Blend Series as Skin Boosters.
  // This updates already-persisted Turso/local records, not only future seeds.
  // Product content, Cloudinary images, prices and dashboard edits are preserved.
  if (parsedVersion < 5) {
    products = products.map((product) =>
      product.specifications?.Series === "NOVYX Blend Series"
        ? { ...product, productType: "skin-booster" as const }
        : product,
    );

    const existingIds = new Set(products.map((product) => product.id));
    const existingSlugs = new Set(products.map((product) => product.slug));
    const missingBlends = BLEND_PRODUCTS.filter(
      (seedProduct) =>
        !existingIds.has(seedProduct.id) && !existingSlugs.has(seedProduct.slug),
    );

    products = [...products, ...missingBlends];
  }

  return {
    version: CURRENT_STORE_VERSION,
    products,
    heroSlides: Array.isArray(parsed.heroSlides) ? parsed.heroSlides : seeded.heroSlides,
    inquiries: Array.isArray(parsed.inquiries)
      ? parsed.inquiries.map((item) => {
          const legacyStatus = String((item as { status?: unknown }).status || "new");
          const status: InquiryStatus = legacyStatus === "read"
            ? "resolved"
            : legacyStatus === "in-progress" || legacyStatus === "resolved"
              ? legacyStatus
              : "new";
          return { ...item, status };
        })
      : [],
  };
}

function toHranaValue(value: string | number | boolean | null): HranaValue {
  if (value === null) return { type: "null" };
  if (typeof value === "boolean") return { type: "integer", value: value ? "1" : "0" };
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { type: "integer", value: String(value) }
      : { type: "float", value };
  }
  return { type: "text", value };
}

function fromHranaValue(value: HranaValue | undefined): string | number | null {
  if (!value || value.type === "null") return null;
  if (value.type === "integer") return Number(value.value);
  if (value.type === "float") return value.value;
  return value.value;
}

function remoteHttpUrl() {
  return tursoUrl.replace(/^libsql:/, "https:").replace(/\/$/, "");
}

async function tursoExecute(
  sql: string,
  args: Array<string | number | boolean | null> = [],
  wantRows = true,
) {
  const response = await fetch(`${remoteHttpUrl()}/v3/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tursoToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      baton: null,
      requests: [
        {
          type: "execute",
          stmt: {
            sql,
            args: args.map(toHranaValue),
            want_rows: wantRows,
          },
        },
        { type: "close" },
      ],
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  const data = (await response.json().catch(() => null)) as
    | { results?: HranaResult[]; message?: string }
    | null;
  if (!response.ok) {
    throw new Error(data?.message || `Turso request failed with HTTP ${response.status}.`);
  }
  const first = data?.results?.[0];
  if (!first || first.type === "error") {
    throw new Error(first?.error?.message || "Turso SQL request failed.");
  }
  const result = first.response?.result;
  const columns = result?.cols?.map((col) => col.name || "") || [];
  return (result?.rows || []).map((row) =>
    Object.fromEntries(row.map((value, index) => [columns[index] || String(index), fromHranaValue(value)])),
  );
}

async function ensureRemoteStore() {
  if (!remoteInitialization) {
    remoteInitialization = (async () => {
      await tursoExecute(
        "CREATE TABLE IF NOT EXISTS novyx_content_store (id TEXT PRIMARY KEY, data TEXT NOT NULL, updated_at TEXT NOT NULL)", [], false,
      );
      await tursoExecute(
        "INSERT INTO novyx_content_store (id, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(id) DO NOTHING",
        ["main", JSON.stringify(seedStore()), new Date().toISOString()], false,
      );
    })().catch((error) => { remoteInitialization = undefined; throw error; });
  }
  await remoteInitialization;
}

async function ensureLocalStore(): Promise<void> {
  await mkdir(dataDirectory, { recursive: true });
  try {
    await readFile(dataFile, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    try {
      await writeFile(dataFile, JSON.stringify(seedStore(), null, 2), { encoding: "utf8", flag: "wx" });
    } catch (writeError) {
      if ((writeError as NodeJS.ErrnoException).code !== "EEXIST") throw writeError;
    }
  }
}

async function readStore(): Promise<ContentStore> {
  let raw: string;
  if (useTurso) {
    await ensureRemoteStore();
    const rows = await tursoExecute("SELECT data FROM novyx_content_store WHERE id = ?", ["main"]);
    if (typeof rows[0]?.data !== "string") throw new Error("Content store is missing.");
    raw = rows[0].data;
  } else {
    await ensureLocalStore();
    raw = await readFile(dataFile, "utf8");
  }
  // Never silently replace corrupted content with seed data during a write.
  const parsed = JSON.parse(raw) as Partial<ContentStore>;
  if (!parsed || !Array.isArray(parsed.products) || !Array.isArray(parsed.heroSlides) || !Array.isArray(parsed.inquiries)) {
    throw new Error("Invalid content store. Restore a valid backup before editing.");
  }
  const store = normalizeStore(parsed);
  if (useTurso) remoteSnapshots.set(store, raw);
  return store;
}

// Deduplicate metadata/page reads within a render; no persistent stale cache.
const readStoreForRender = cache(readStore);

async function writeStore(store: ContentStore): Promise<void> {
  if (useTurso) {
    const expected = remoteSnapshots.get(store);
    if (expected === undefined) throw new Error("Missing content store revision.");
    const rows = await tursoExecute(
      "UPDATE novyx_content_store SET data = ?, updated_at = ? WHERE id = ? AND data = ? RETURNING id",
      [JSON.stringify(store), new Date().toISOString(), "main", expected],
    );
    if (rows.length !== 1) throw new StoreConflictError("Content changed concurrently. Please retry.");
    return;
  }
  const tmp = `${dataFile}.${randomUUID()}.tmp`;
  await writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
  await rename(tmp, dataFile);
}

function mutateStore<T>(mutate: (store: ContentStore) => T): Promise<T> {
  // Serialize the whole read/modify/write, and recover after a failed write.
  const operation = writeQueue.then(async () => {
    for (let attempt = 0; attempt < 5; attempt++) {
      const store = await readStore();
      const result = mutate(store);
      try {
        await writeStore(store);
        return result;
      } catch (error) {
        if (!(error instanceof StoreConflictError) || attempt === 4) throw error;
      }
    }
    throw new StoreConflictError("Content changed concurrently. Please retry.");
  });
  writeQueue = operation.then(() => {}, () => {});
  return operation;
}

export function getContentStoreInfo() {
  return {
    backend: useTurso ? "turso" : "file",
    dataDirectory: useTurso ? "Turso Cloud" : dataDirectory,
    isEphemeral: !useTurso && process.env.VERCEL === "1" && !process.env.NOVYX_DATA_DIR?.trim(),
  };
}

export async function listProducts(params?: ProductQueryParams): Promise<Product[]> {
  const store = await readStoreForRender();
  let products = [...store.products].filter((item) => item.published !== false);

  if (params?.category) products = products.filter((item) => item.category === params.category);
  if (params?.productType) products = products.filter((item) => item.productType === params.productType);
  if (typeof params?.featured === "boolean") products = products.filter((item) => item.featured === params.featured);
  if (typeof params?.inStock === "boolean") products = products.filter((item) => item.inStock === params.inStock);
  if (params?.search?.trim()) {
    const query = params.search.trim().toLowerCase();
    products = products.filter((item) =>
      [item.name, item.scientificName, item.slug, item.casNumber, item.sequence]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  const ordering = params?.ordering;
  if (ordering) {
    const descending = ordering.startsWith("-");
    const key = ordering.replace(/^-/, "") as "price" | "purity" | "name";
    products.sort((a, b) => {
      const left = a[key];
      const right = b[key];
      const result = typeof left === "string" ? left.localeCompare(String(right)) : Number(left) - Number(right);
      return descending ? -result : result;
    });
  }

  const offset = Math.max(0, params?.offset ?? 0);
  const limit = params?.limit ? Math.max(1, params.limit) : undefined;
  return products.slice(offset, limit ? offset + limit : undefined);
}

export async function listAllProducts(): Promise<Product[]> {
  const store = await readStoreForRender();
  return [...store.products];
}

export async function findProductBySlug(slug: string): Promise<Product | null> {
  const store = await readStoreForRender();
  return store.products.find((product) => product.slug === slug && product.published !== false) ?? null;
}

export async function findProductById(id: string): Promise<Product | null> {
  const store = await readStoreForRender();
  return store.products.find((product) => product.id === id) ?? null;
}

export async function createProduct(input: Product): Promise<Product> {
  return mutateStore((store) => {
    if (store.products.some((item) => item.slug === input.slug)) throw new Error("A product with this slug already exists.");
    const now = new Date().toISOString();
    const product: Product = {
      ...input,
      id: input.id || randomUUID(),
      productType: input.productType || "peptide",
      published: input.published ?? true,
      certificates: input.certificates ?? [],
      specifications: input.specifications ?? {},
      createdAt: input.createdAt ?? now,
      updatedAt: now,
    };
    store.products.push(product);
    return product;
  });
}

export async function updateProduct(id: string, input: Product): Promise<Product | null> {
  return mutateStore((store) => {
    const index = store.products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    if (store.products.some((item) => item.slug === input.slug && item.id !== id)) throw new Error("A product with this slug already exists.");

    const current = store.products[index];
    const product: Product = {
      ...input,
      id,
      productType: input.productType || current.productType || "peptide",
      published: input.published ?? current.published ?? true,
      certificates: input.certificates ?? current.certificates ?? [],
      specifications: input.specifications ?? current.specifications ?? {},
      createdAt: current.createdAt,
      updatedAt: new Date().toISOString(),
    };
    store.products[index] = product;
    return product;
  });
}

export async function deleteProduct(id: string): Promise<boolean> {
  return mutateStore((store) => {
    const nextProducts = store.products.filter((item) => item.id !== id);
    if (nextProducts.length === store.products.length) return false;
    store.products = nextProducts;
    return true;
  });
}

export async function createInquiry(kind: StoredInquiry["kind"], payload: Record<string, unknown>): Promise<StoredInquiry> {
  return mutateStore((store) => {
    const inquiry: StoredInquiry = {
      id: `${kind === "contact" ? "NX" : "NP"}-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 6).toUpperCase()}`,
      kind,
      payload,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    store.inquiries.unshift(inquiry);
    return inquiry;
  });
}

export async function listInquiries(): Promise<StoredInquiry[]> {
  const store = await readStoreForRender();
  return [...store.inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateInquiryStatus(id: string, status: StoredInquiry["status"]): Promise<StoredInquiry | null> {
  return mutateStore((store) => {
    const index = store.inquiries.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const inquiry = { ...store.inquiries[index], status };
    store.inquiries[index] = inquiry;
    return inquiry;
  });
}


export async function listHeroSlides(includeDrafts = false): Promise<HeroSlide[]> {
  const store = await readStoreForRender();
  const slides = includeDrafts ? store.heroSlides : store.heroSlides.filter((slide) => slide.published !== false);
  return [...slides].sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }));
}

export async function findHeroSlideById(id: string): Promise<HeroSlide | null> {
  const store = await readStoreForRender();
  return store.heroSlides.find((slide) => slide.id === id) ?? null;
}

export async function createHeroSlide(input: HeroSlide): Promise<HeroSlide> {
  return mutateStore((store) => {
    if (store.heroSlides.some((slide) => slide.id === input.id)) throw new Error("A hero slide with this ID already exists.");
    const now = new Date().toISOString();
    const slide: HeroSlide = { ...input, published: input.published ?? true, createdAt: now, updatedAt: now };
    store.heroSlides.push(slide);
    return slide;
  });
}

export async function updateHeroSlide(id: string, input: HeroSlide): Promise<HeroSlide | null> {
  return mutateStore((store) => {
    const index = store.heroSlides.findIndex((slide) => slide.id === id);
    if (index === -1) return null;
    const current = store.heroSlides[index];
    const slide: HeroSlide = {
      ...input,
      id,
      published: input.published ?? current.published ?? true,
      createdAt: current.createdAt,
      updatedAt: new Date().toISOString(),
    };
    store.heroSlides[index] = slide;
    return slide;
  });
}

export async function deleteHeroSlide(id: string): Promise<boolean> {
  return mutateStore((store) => {
    const nextSlides = store.heroSlides.filter((slide) => slide.id !== id);
    if (nextSlides.length === store.heroSlides.length) return false;
    store.heroSlides = nextSlides;
    return true;
  });
}
