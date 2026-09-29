"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Save, Sparkles } from "lucide-react";
import type { Product } from "@/lib/api/types";

const emptyProduct: Product = {
  id: "",
  slug: "",
  name: "",
  scientificName: "Research peptide",
  category: "metabolic",
  productType: "peptide",
  published: true,
  tagline: "",
  description: "",
  sequence: "—",
  casNumber: "—",
  molecularFormula: "—",
  molecularWeight: 0,
  purity: 99.5,
  form: "Lyophilized Powder",
  storageConditions: "Store according to the validated research lot specification.",
  reconstitutionNotes: "For controlled laboratory research workflows only.",
  price: 0,
  vialSizeMg: 0,
  inStock: true,
  featured: false,
  imageUrl: "",
  certificates: [],
  specifications: {},
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function specsToText(specs: Record<string, string>) {
  return Object.entries(specs).map(([key, value]) => `${key}: ${value}`).join("\n");
}

function textToSpecs(value: string) {
  return Object.fromEntries(
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const index = line.indexOf(":");
        return index === -1 ? [line, ""] : [line.slice(0, index).trim(), line.slice(index + 1).trim()];
      }),
  );
}

const inputClass = "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-brand";
const textareaClass = "w-full rounded-xl border border-border bg-background px-3 py-3 text-sm leading-6 outline-none transition focus:border-brand";
const labelClass = "mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground";

export function ProductForm({ product }: { product?: Product | null }) {
  const router = useRouter();
  const isEdit = Boolean(product?.id);
  const [form, setForm] = useState<Product>(product ? { ...product } : { ...emptyProduct });
  const [specText, setSpecText] = useState(specsToText(product?.specifications || {}));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const imagePreview = useMemo(() => form.imageUrl.trim(), [form.imageUrl]);

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await response.json().catch(() => null)) as { url?: string; detail?: string } | null;
      if (!response.ok || !data?.url) throw new Error(data?.detail || "Upload failed.");
      set("imageUrl", data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function generateCopy() {
    if (!form.name.trim()) {
      setError("Enter the product name first.");
      return;
    }
    setGenerating(true);
    setError("");
    try {
      const response = await fetch("/api/admin/ai/product-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          productType: form.productType,
          scientificName: form.scientificName,
          description: form.description,
          vialSizeMg: form.vialSizeMg,
        }),
      });
      const data = (await response.json().catch(() => null)) as Partial<Product> & { detail?: string } | null;
      if (!response.ok || !data) throw new Error(data?.detail || "AI generation failed.");
      setForm((current) => ({
        ...current,
        scientificName: data.scientificName || current.scientificName,
        tagline: data.tagline || current.tagline,
        description: data.description || current.description,
        storageConditions: data.storageConditions || current.storageConditions,
        reconstitutionNotes: data.reconstitutionNotes || current.reconstitutionNotes,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        ...(isEdit ? { id: form.id } : { id: undefined }),
        slug: form.slug || slugify(form.name),
        specifications: textToSpecs(specText),
        certificates: form.certificates || [],
      };
      const url = isEdit ? `/api/admin/products/${encodeURIComponent(form.id)}` : "/api/admin/products";
      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as { detail?: string; errors?: Record<string, string[]> } | null;
      if (!response.ok) {
        const fieldError = data?.errors
          ? Object.entries(data.errors).find(([, messages]) => messages?.length)
          : undefined;
        const fieldMessage = fieldError ? `${fieldError[0]}: ${fieldError[1][0]}` : "";
        throw new Error(fieldMessage || data?.detail || "Unable to save product.");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{isEdit ? `Edit ${form.name}` : "New product"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage the content shown on the public product catalog and detail page.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={generateCopy} disabled={generating} className="inline-flex h-10 items-center gap-2 rounded-xl border border-brand/25 bg-brand/5 px-4 text-xs font-semibold text-brand transition hover:bg-brand/10 disabled:opacity-50">
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            CodeCraft AI
          </button>
          <button type="submit" disabled={saving} className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-xs font-semibold text-white transition hover:brightness-110 disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save product
          </button>
        </div>
      </div>

      {error ? <div className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-500">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <h2 className="text-sm font-semibold">Core content</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Product name</label>
                <input className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Slug</label>
                <div className="flex gap-2">
                  <input className={inputClass} value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} placeholder="auto-from-name" />
                  <button type="button" onClick={() => set("slug", slugify(form.name))} className="rounded-xl border border-border px-3 text-xs text-muted-foreground">Auto</button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Scientific name</label>
                <input className={inputClass} value={form.scientificName} onChange={(e) => set("scientificName", e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value as Product["category"])}>
                  <option value="longevity">Skin & Longevity</option>
                  <option value="metabolic">Metabolic</option>
                  <option value="cellular-repair">Cellular Repair</option>
                  <option value="cognitive">Cognitive</option>
                  <option value="immunology">Immunology</option>
                  <option value="custom-synthesis">Custom Synthesis</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Product group</label>
                <select className={inputClass} value={form.productType || "peptide"} onChange={(e) => set("productType", e.target.value as Product["productType"])}>
                  <option value="peptide">Peptide</option>
                  <option value="skin-booster">Skin Booster</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Tagline</label>
                <input className={inputClass} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} required />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea rows={5} className={textareaClass} value={form.description} onChange={(e) => set("description", e.target.value)} required />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <h2 className="text-sm font-semibold">Technical data</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div><label className={labelClass}>Vial size (mg)</label><input type="number" step="0.01" className={inputClass} value={form.vialSizeMg} onChange={(e) => set("vialSizeMg", Number(e.target.value))} /></div>
              <div><label className={labelClass}>Purity (%)</label><input type="number" step="0.01" min="0" max="100" className={inputClass} value={form.purity} onChange={(e) => set("purity", Number(e.target.value))} /></div>
              <div><label className={labelClass}>Price</label><input type="number" step="0.01" min="0" className={inputClass} value={form.price} onChange={(e) => set("price", Number(e.target.value))} /></div>
              <div><label className={labelClass}>CAS number</label><input className={inputClass} value={form.casNumber} onChange={(e) => set("casNumber", e.target.value)} /></div>
              <div><label className={labelClass}>Molecular formula</label><input className={inputClass} value={form.molecularFormula} onChange={(e) => set("molecularFormula", e.target.value)} /></div>
              <div><label className={labelClass}>Molecular weight</label><input type="number" step="0.01" min="0" className={inputClass} value={form.molecularWeight} onChange={(e) => set("molecularWeight", Number(e.target.value))} /></div>
              <div className="sm:col-span-2 lg:col-span-3"><label className={labelClass}>Sequence</label><textarea rows={2} className={textareaClass} value={form.sequence} onChange={(e) => set("sequence", e.target.value)} /></div>
              <div><label className={labelClass}>Form</label><select className={inputClass} value={form.form} onChange={(e) => set("form", e.target.value as Product["form"])}><option>Lyophilized Powder</option><option>Solution</option><option>Sublingual Matrix</option></select></div>
              <div className="sm:col-span-2"><label className={labelClass}>Specifications (one per line: Label: Value)</label><textarea rows={4} className={textareaClass} value={specText} onChange={(e) => setSpecText(e.target.value)} /></div>
              <div className="sm:col-span-2 lg:col-span-3"><label className={labelClass}>Storage conditions</label><textarea rows={3} className={textareaClass} value={form.storageConditions} onChange={(e) => set("storageConditions", e.target.value)} required /></div>
              <div className="sm:col-span-2 lg:col-span-3"><label className={labelClass}>Reconstitution / handling notes</label><textarea rows={3} className={textareaClass} value={form.reconstitutionNotes} onChange={(e) => set("reconstitutionNotes", e.target.value)} required /></div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">Product image</h2>
            <div className="relative mt-4 aspect-square overflow-hidden rounded-xl border border-border bg-background">
              {imagePreview ? (
                <Image src={imagePreview} alt="Product preview" fill sizes="320px" className="object-contain p-5" />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-xs text-muted-foreground">
                  No product image yet. Upload the final artwork when it is ready.
                </div>
              )}
            </div>
            <label className="mt-4 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border text-xs font-semibold transition hover:bg-background">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
              {uploading ? "Uploading..." : "Upload to Cloudinary"}
              <input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadImage(file); }} />
            </label>
            <div className="mt-4"><label className={labelClass}>Image URL</label><input className={inputClass} value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} placeholder="Optional — upload later" /></div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">Visibility</h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center justify-between gap-4 rounded-xl border border-border p-3 text-sm"><span>In stock</span><input type="checkbox" checked={form.inStock} onChange={(e) => set("inStock", e.target.checked)} className="h-4 w-4 accent-[var(--brand)]" /></label>
              <label className="flex items-center justify-between gap-4 rounded-xl border border-border p-3 text-sm"><span>Featured</span><input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 accent-[var(--brand)]" /></label>
              <label className="flex items-center justify-between gap-4 rounded-xl border border-border p-3 text-sm"><span>Published</span><input type="checkbox" checked={form.published !== false} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4 accent-[var(--brand)]" /></label>
            </div>
          </section>
        </aside>
      </div>
    </form>
  );
}
