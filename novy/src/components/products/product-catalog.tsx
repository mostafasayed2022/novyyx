"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PublicProduct as Product } from "@/lib/utils/public-product";
import { useProductCatalog } from "@/features/products/use-product-catalog";
import { useLocale } from "@/i18n/locale-provider";
import { localizeProductField } from "@/i18n/product-localization";
import { ROUTES } from "@/lib/constants/routes";
import {
  CATALOG_PRODUCT_SLUGS,
  getProductPresentation,
} from "@/config/product-presentation";
import { AlertTriangle, ChevronLeft, ChevronRight, Filter, RefreshCw, Search } from "lucide-react";

interface ProductCatalogProps {
  initialProducts?: Product[];
  productType?: Product["productType"];
}

const slugOrder: ReadonlyMap<string, number> = new Map(
  CATALOG_PRODUCT_SLUGS.map((slug, index) => [slug, index]),
);

const PRODUCTS_PER_PAGE = 9;

function getPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis-left" | "ellipsis-right"> = [1];

  if (currentPage > 4) {
    pages.push("ellipsis-left");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 3) {
    pages.push("ellipsis-right");
  }

  pages.push(totalPages);
  return pages;
}

export function ProductCatalog({ initialProducts, productType }: ProductCatalogProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale, tr } = useLocale();
  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    resetFilters,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductCatalog({ initialProducts, productType });

  const visibleProducts = [...filteredProducts].sort(
    (a, b) =>
      (slugOrder.get(a.slug) ?? 999) - (slugOrder.get(b.slug) ?? 999),
  );

  const requestedPage = Number(searchParams.get("page") || "1");
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(Math.trunc(requestedPage), 1), totalPages)
    : 1;
  const pageStart = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = visibleProducts.slice(
    pageStart,
    pageStart + PRODUCTS_PER_PAGE,
  );
  const paginationItems = getPaginationItems(currentPage, totalPages);

  const updatePage = (page: number, scroll = true) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    const params = new URLSearchParams(searchParams.toString());

    if (nextPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });

    if (scroll) {
      requestAnimationFrame(() => {
        document.getElementById("product-catalog-start")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (currentPage !== 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }
  };

  return (
    <div id="product-catalog-start" className="scroll-mt-28 space-y-8">
      <div className="flex flex-col gap-4 border-b border-border/70 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { label: "Peptides", href: ROUTES.peptides },
            { label: "Skin Boosters", href: ROUTES.skinBoosters },
          ].map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 select-none touch-manipulation rounded-full border px-4 py-2 text-[11px] font-medium transition-all active:scale-[0.97] ${
                  active
                    ? "border-brand bg-brand text-white shadow-sm"
                    : "border-border bg-transparent text-muted-foreground hover:border-brand/35 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <label className="relative block w-full lg:w-72">
          <span className="sr-only">
            {tr("Search products", "Produkte suchen")}
          </span>
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder={tr("Search products...", "Produkte suchen...")}
            className="h-10 w-full rounded-full border border-border bg-background/60 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-xl bg-[#f7f4fb] dark:bg-white/[0.035]"
            >
              <div className="aspect-[4/3] animate-pulse bg-black/[0.035] dark:bg-white/[0.04]" />
              <div className="space-y-3 p-6 text-center">
                <div className="mx-auto h-3 w-24 animate-pulse rounded bg-black/[0.06] dark:bg-white/[0.07]" />
                <div className="mx-auto h-5 w-36 animate-pulse rounded bg-black/[0.06] dark:bg-white/[0.07]" />
                <div className="mx-auto h-3 w-4/5 animate-pulse rounded bg-black/[0.06] dark:bg-white/[0.07]" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-border bg-surface p-10 text-center">
          <AlertTriangle className="mx-auto mb-4 h-7 w-7 text-amber-500" />
          <h3 className="font-semibold text-foreground">
            {tr("Unable to load products", "Produkte konnten nicht geladen werden")}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {error?.message ||
              tr(
                "The product catalog is temporarily unavailable.",
                "Der Produktkatalog ist vorübergehend nicht verfügbar.",
              )}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 inline-flex cursor-pointer select-none touch-manipulation items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-all active:scale-[0.97]"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            {tr("Try again", "Erneut versuchen")}
          </button>
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-10 text-center">
          <Filter className="mx-auto mb-4 h-7 w-7 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">
            {tr("No products found", "Keine Produkte gefunden")}
          </h3>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 cursor-pointer select-none touch-manipulation rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-all active:scale-[0.97]"
          >
            {tr("Reset filters", "Filter zurücksetzen")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginatedProducts.map((product) => {
            const description = localizeProductField(
              locale,
              product.slug,
              "description",
              product.description,
              product.translations?.de?.description,
            );
            const presentation = getProductPresentation(product, locale);
            const isBlend = product.specifications?.Series === "NOVYX Blend Series";

            return (
              <Link
                key={product.id}
                href={ROUTES.productDetail(product.slug)}
                className="group block h-full"
                aria-label={`${tr("View details for", "Details anzeigen für")} ${product.name}`}
              >
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    isBlend
                      ? "border-brand/15 bg-[linear-gradient(145deg,rgba(248,250,255,0.98),rgba(238,244,255,0.92))] shadow-[0_12px_34px_rgba(35,78,160,0.08)] hover:border-brand/30 hover:shadow-[0_24px_70px_rgba(31,78,173,0.16)] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(12,22,42,0.96),rgba(7,12,24,0.98))] dark:hover:border-brand/35 dark:hover:shadow-[0_28px_80px_rgba(0,0,0,0.42)]"
                      : "border-transparent bg-[#f7f4fb] hover:shadow-[0_18px_48px_rgba(72,52,118,0.10)] dark:bg-white/[0.035] dark:hover:bg-white/[0.055] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
                  }`}
                >
                  {isBlend ? (
                    <>
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_50%_0%,rgba(42,103,255,0.20),transparent_72%)]" />
                      <div className="absolute left-4 top-4 z-10 rounded-full border border-brand/20 bg-white/85 px-3 py-1 text-[8px] font-mono font-bold uppercase tracking-[0.16em] text-brand backdrop-blur dark:bg-black/30">
                        NOVYX Blend Series
                      </div>
                    </>
                  ) : null}

                  <div className={`relative aspect-[4/3] overflow-hidden ${isBlend ? "px-3 pt-5" : "px-5 pt-5"}`}>
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={`${product.name} — NOVYX research product`}
                        fill
                        loading="lazy"
                        quality={80}
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjRmMGY4Ii8+PC9zdmc+"
                        className={`object-contain transition-transform duration-500 ease-out group-hover:scale-[1.045] ${isBlend ? "p-2" : "p-5"}`}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="rounded-full border border-brand/15 bg-brand/[0.05] px-4 py-2 text-[9px] font-mono font-semibold uppercase tracking-[0.16em] text-brand">
                          NOVYX · Artwork pending
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex flex-1 flex-col items-center px-6 pb-7 pt-2 text-center">
                    <p className="mb-2 text-[9px] font-mono font-semibold uppercase tracking-[0.16em] text-brand">
                      {isBlend ? "NOVYX · Blend Research" : presentation.eyebrow}
                    </p>
                    <h2 className={`font-medium tracking-[-0.01em] text-foreground ${isBlend ? "text-[16px] leading-6" : "text-[17px]"}`}>
                      {product.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 max-w-[32ch] text-[12px] leading-5 text-muted-foreground">
                      {description}
                    </p>
                    {isBlend ? (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="rounded-full border border-brand/15 bg-brand/[0.06] px-2.5 py-1 text-[9px] font-semibold text-brand">
                          {product.vialSizeMg} mg
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">5 mL × 1 vial</span>
                      </div>
                    ) : (
                      <p className="mt-4 max-w-[34ch] text-[10px] leading-4 text-foreground/75">
                        {presentation.pack}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}

      {!isLoading && !isError && visibleProducts.length > 0 && totalPages > 1 ? (
        <nav
          className="flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row"
          aria-label={tr("Product pagination", "Produktseiten-Navigation")}
        >
          <p className="text-[11px] text-muted-foreground">
            {tr("Showing", "Anzeige")} {pageStart + 1}–{Math.min(pageStart + PRODUCTS_PER_PAGE, visibleProducts.length)} {tr("of", "von")} {visibleProducts.length}
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => updatePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex h-9 items-center gap-1 rounded-full border border-border px-3 text-[11px] font-medium text-foreground transition-colors hover:border-brand/35 hover:text-brand disabled:pointer-events-none disabled:opacity-35"
              aria-label={tr("Previous page", "Vorherige Seite")}
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{tr("Previous", "Zurück")}</span>
            </button>

            {paginationItems.map((item) =>
              typeof item === "number" ? (
                <button
                  key={item}
                  type="button"
                  onClick={() => updatePage(item)}
                  aria-current={currentPage === item ? "page" : undefined}
                  aria-label={`${tr("Page", "Seite")} ${item}`}
                  className={`h-9 min-w-9 rounded-full border px-2 text-[11px] font-semibold transition-all ${
                    currentPage === item
                      ? "border-brand bg-brand text-white shadow-sm"
                      : "border-border text-muted-foreground hover:border-brand/35 hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ) : (
                <span
                  key={item}
                  className="inline-flex h-9 min-w-7 items-center justify-center text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  …
                </span>
              ),
            )}

            <button
              type="button"
              onClick={() => updatePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex h-9 items-center gap-1 rounded-full border border-border px-3 text-[11px] font-medium text-foreground transition-colors hover:border-brand/35 hover:text-brand disabled:pointer-events-none disabled:opacity-35"
              aria-label={tr("Next page", "Nächste Seite")}
            >
              <span className="hidden sm:inline">{tr("Next", "Weiter")}</span>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
