import { toPublicProduct } from "@/lib/utils/public-product";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "@/components/layout/localized-link";
import { ArrowUpRight } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { NovyxStaticVial } from "@/components/novyx/novyx-static-vial";
import { ProductCatalog } from "@/components/products";
import { listProducts } from "@/lib/server/content-store";
import { getServerLocale } from "@/i18n/server";
import { localizedAlternates } from "@/i18n/paths";
import { tr } from "@/i18n/config";
import { ROUTES } from "@/lib/constants/routes";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    alternates: localizedAlternates("/products/skin-boosters", locale),
    title: tr(locale, "NŌVYX Skin Boosters", "NŌVYX Skin Booster"),
    description: tr(locale, "Explore NŌVYX skin-booster research presentations.", "Entdecken Sie NŌVYX Skin-Booster-Forschungspräsentationen."),
  };
}

export default async function SkinBoostersPage() {
  const locale = await getServerLocale();
  const initialProducts = await listProducts({ productType: "skin-booster" });
  return (
    <PageWrapper
      badge={tr(locale, "NŌVYX Products", "NŌVYX Produkte")}
      title={tr(locale, "Skin Boosters", "Skin Booster")}
      subtitle={tr(locale, "Premium dermal-research presentations managed independently from the peptide catalog.", "Premium-Präsentationen für die Hautforschung, getrennt vom Peptidkatalog verwaltet.")}
      visualSection="products"
    >
      <Container size="xl">
        <Link
          href={ROUTES.novyx}
          className="group relative mb-12 grid overflow-hidden rounded-xl border border-brand/20 bg-surface bg-[radial-gradient(circle_at_78%_40%,rgba(27,77,255,0.14),transparent_48%)] shadow-[var(--card-shadow)] transition hover:border-brand/45 hover:shadow-[var(--card-hover-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10">
            <span className="micro-label text-brand">{tr(locale, "Featured professional formula", "Professionelle Formel im Fokus")}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">NŌVYX™</h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-brand">GHK-Cu Skin Booster</p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
              {tr(locale, "A GHK-Cu-led formula for visible skin renewal and long-term skin-quality care.", "Eine Formel mit GHK-Cu für sichtbare Hauterneuerung und langfristige Pflege der Hautqualität.")}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand">
              {tr(locale, "Explore NŌVYX", "NŌVYX entdecken")}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
          <div role="img" aria-label={tr(locale, "NŌVYX GHK-Cu vial", "NŌVYX GHK-Cu Fläschchen")} className="relative flex min-h-60 items-center justify-center bg-brand/5 sm:min-h-72">
            <NovyxStaticVial className="h-56 transition-transform duration-500 group-hover:scale-105 sm:h-64" sizes="(max-width: 768px) 180px, 220px" />
          </div>
        </Link>
        <Suspense fallback={<div className="min-h-[560px]" aria-hidden="true" />}>
          <ProductCatalog initialProducts={initialProducts.map(toPublicProduct)} productType="skin-booster" />
        </Suspense>
      </Container>
    </PageWrapper>
  );
}
