import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { findProductBySlug } from "@/lib/server/content-store";
import { ROUTES } from "@/lib/constants/routes";
import { getServerLocale } from "@/i18n/server";
import { tr, type Locale } from "@/i18n/config";
import { localizeProductField } from "@/i18n/product-localization";
import { getProductPresentation } from "@/config/product-presentation";
import type { Product } from "@/lib/api/types";
import { optimizeCloudinaryImage } from "@/lib/cloudinary";
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}



export const dynamic = "force-dynamic";

function getCategoryLabel(category: Product["category"], locale: Locale) {
  const labels: Record<Product["category"], [string, string]> = {
    longevity: ["Skin & Longevity", "Haut & Langlebigkeit"],
    metabolic: ["Metabolic", "Stoffwechsel"],
    "cellular-repair": ["Cellular Repair", "Zelluläre Regeneration"],
    cognitive: ["Cognitive", "Kognitiv"],
    immunology: ["Immunology", "Immunologie"],
    "custom-synthesis": ["Custom Synthesis", "Individuelle Synthese"],
  };

  const [en, de] = labels[category];
  return tr(locale, en, de);
}

function ProductField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/55 p-4">
      <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.13em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-medium leading-6 text-foreground">{value}</p>
    </div>
  );
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const product = await findProductBySlug(slug);

  if (!product) {
    return { title: tr(locale, "Product not found", "Produkt nicht gefunden") };
  }

  const imageSrc = optimizeCloudinaryImage(product.imageUrl);

  const description = localizeProductField(
    locale,
    product.slug,
    "description",
    product.description,
    product.translations?.de?.description,
  );

  return {
    title: `${product.name} | NOVYX`,
    description,
    openGraph: {
      title: `${product.name} | NOVYX`,
      description,
      ...(product.imageUrl ? { images: [{ url: product.imageUrl, alt: product.name }] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const product = await findProductBySlug(slug);

  if (!product) notFound();

  const imageSrc = optimizeCloudinaryImage(product.imageUrl);
  const presentation = getProductPresentation(product, locale);
  const description = localizeProductField(
    locale,
    product.slug,
    "description",
    product.description,
    product.translations?.de?.description,
  );
  const scientificName = localizeProductField(
    locale,
    product.slug,
    "scientificName",
    product.scientificName,
    product.translations?.de?.scientificName,
  );
  const tagline = localizeProductField(
    locale,
    product.slug,
    "tagline",
    product.tagline,
    product.translations?.de?.tagline,
  );
  const form = localizeProductField(
    locale,
    product.slug,
    "form",
    product.form,
    product.translations?.de?.form,
  );
  const storage = localizeProductField(
    locale,
    product.slug,
    "storageConditions",
    product.storageConditions,
    product.translations?.de?.storageConditions,
  );
  const reconstitutionNotes = localizeProductField(
    locale,
    product.slug,
    "reconstitutionNotes",
    product.reconstitutionNotes,
    product.translations?.de?.reconstitutionNotes,
  );

  const specifications = Object.entries(product.specifications || {});
  const isBlend = product.specifications?.Series === "NOVYX Blend Series";
  const productGroup =
    product.productType === "skin-booster"
      ? tr(locale, "Skin Booster", "Skin Booster")
      : tr(locale, "Peptide", "Peptid");
  const category = getCategoryLabel(product.category, locale);
  const eyebrow =
    product.productType === "skin-booster"
      ? tr(locale, "NOVYX · Skin Booster", "NOVYX · Skin Booster")
      : presentation.eyebrow;
  const backHref =
    product.productType === "skin-booster" ? "/products/skin-boosters" : "/products/peptides";

  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_16%,rgba(27,77,255,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_78%_16%,rgba(59,130,246,0.10),transparent_30%)]" />

      <Container size="xl">
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {tr(locale, "Back to products", "Zurück zu den Produkten")}
        </Link>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div
            className={`relative min-h-[430px] overflow-hidden rounded-2xl border sm:min-h-[560px] ${
              isBlend
                ? "border-brand/15 bg-[linear-gradient(145deg,#f8fbff,#edf3ff)] shadow-[0_30px_90px_rgba(33,83,180,0.10)] dark:border-white/10 dark:bg-[linear-gradient(145deg,#0d172b,#070c18)]"
                : "border-transparent bg-[#f7f4fb] dark:bg-white/[0.035]"
            }`}
          >
            {isBlend ? (
              <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_50%_0%,rgba(48,108,255,0.22),transparent_72%)]" />
            ) : null}
            <div className="absolute left-5 top-5 z-10 rounded-full border border-brand/15 bg-white/80 px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-brand backdrop-blur dark:bg-black/30">
              {isBlend ? "NOVYX BLEND SERIES" : "NOVYX"}
            </div>
            {product.imageUrl ? (
<Image
  src={imageSrc}
  alt={product.name}
  width={700}
  height={700}
  unoptimized={imageSrc.includes("res.cloudinary.com")}
/>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-brand">NOVYX</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {tr(
                      locale,
                      "Final product artwork will be uploaded from the dashboard.",
                      "Das finale Produktbild wird über das Dashboard hochgeladen.",
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-xl">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <p className="mt-3 text-sm font-medium text-foreground/70">{scientificName}</p>

            <p className="mt-4 text-base font-medium leading-7 text-foreground">{tagline}</p>

            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>

            <p className="mt-5 text-sm font-medium text-foreground">{presentation.pack}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
                {productGroup}
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {category}
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {product.inStock
                  ? tr(locale, "In stock", "Auf Lager")
                  : tr(locale, "Out of stock", "Nicht auf Lager")}
              </span>
              {product.featured ? (
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {tr(locale, "Featured", "Hervorgehoben")}
                </span>
              ) : null}
              {product.published !== false ? (
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {tr(locale, "Published", "Veröffentlicht")}
                </span>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ROUTES.contact}>
                <Button variant="glow" size="lg" className="gap-2">
                  {tr(locale, "Request information", "Informationen anfragen")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href={backHref}>
                <Button variant="outline" size="lg">
                  {tr(locale, "View collection", "Kollektion ansehen")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-6 lg:mt-20">
          <section className="rounded-2xl border border-border/80 bg-surface/70 p-5 sm:p-7">
            <div className="max-w-2xl">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-brand">
                {tr(locale, "Technical profile", "Technisches Profil")}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {tr(locale, "Product data", "Produktdaten")}
              </h2>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ProductField label={tr(locale, "Product reference", "Produktreferenz")} value={product.slug} />
              <ProductField label={tr(locale, "Product group", "Produktgruppe")} value={productGroup} />
              <ProductField label={tr(locale, "Category", "Kategorie")} value={category} />
              <ProductField label={tr(locale, "Vial size", "Vial-Größe")} value={`${product.vialSizeMg} mg`} />
              <ProductField label={tr(locale, "Purity", "Reinheit")} value={`${product.purity}%`} />
              <ProductField label={tr(locale, "Form", "Form")} value={form} />
              {/* <ProductField label={tr(locale, "CAS number", "CAS-Nummer")} value={product.casNumber || "—"} /> */}
              <ProductField
                label={tr(locale, "Molecular weight", "Molekulargewicht")}
                value={product.molecularWeight ? `${product.molecularWeight} g/mol` : "—"}
              />
              <ProductField
                label={tr(locale, "Molecular formula", "Molekülformel")}
                value={product.molecularFormula || "—"}
              />
              <ProductField
                label={tr(locale, "Availability", "Verfügbarkeit")}
                value={
                  product.inStock
                    ? tr(locale, "In stock", "Auf Lager")
                    : tr(locale, "Out of stock", "Nicht auf Lager")
                }
              />
              <ProductField
                label={tr(locale, "Featured", "Hervorgehoben")}
                value={product.featured ? tr(locale, "Yes", "Ja") : tr(locale, "No", "Nein")}
              />
              <ProductField
                label={tr(locale, "Published", "Veröffentlicht")}
                value={product.published !== false ? tr(locale, "Yes", "Ja") : tr(locale, "No", "Nein")}
              />
            </div>
          </section>

          {product.sequence && product.sequence !== "—" ? (
            <section className="rounded-2xl border border-border/80 bg-surface/70 p-5 sm:p-7">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-brand">
                {tr(locale, "Sequence", "Sequenz")}
              </p>
              <p className="mt-4 break-words font-mono text-sm leading-7 text-foreground/85">{product.sequence}</p>
            </section>
          ) : null}

          {specifications.length ? (
            <section className="rounded-2xl border border-border/80 bg-surface/70 p-5 sm:p-7">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-brand">
                {tr(locale, "Specifications", "Spezifikationen")}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {tr(locale, "Additional specifications", "Weitere Spezifikationen")}
              </h2>
              <div className="mt-6 divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70">
                {specifications.map(([label, value]) => (
                  <div key={label} className="grid gap-1 bg-background/55 px-4 py-3 sm:grid-cols-[220px_1fr] sm:gap-6">
                    <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                    <p className="text-sm text-foreground">{value || "—"}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/80 bg-surface/70 p-5 sm:p-7">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-brand">
                {tr(locale, "Storage", "Lagerung")}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                {tr(locale, "Storage conditions", "Lagerbedingungen")}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{storage}</p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-surface/70 p-5 sm:p-7">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-brand">
                {tr(locale, "Handling", "Handhabung")}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                {tr(locale, "Reconstitution / handling notes", "Rekonstitution / Handhabung")}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{reconstitutionNotes}</p>
            </div>
          </section>
        </div>

        <p className="mt-8 text-[11px] leading-5 text-muted-foreground">
          {tr(
            locale,
            "Research presentation only. Product handling and laboratory use should follow the supplied technical documentation.",
            "Nur für Forschungszwecke. Produkthandhabung und Laboranwendung müssen der mitgelieferten technischen Dokumentation entsprechen.",
          )}
        </p>
      </Container>
    </section>
  );
}
