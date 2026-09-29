import { Suspense } from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { ProductCatalog } from "@/components/products";
import { listProducts } from "@/lib/server/content-store";
import { getServerLocale } from "@/i18n/server";
import { tr } from "@/i18n/config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: tr(locale, "NOVYX Skin Boosters", "NOVYX Skin Booster"),
    description: tr(locale, "Explore NOVYX skin-booster research presentations.", "Entdecken Sie NOVYX Skin-Booster-Forschungspräsentationen."),
  };
}

export default async function SkinBoostersPage() {
  const locale = await getServerLocale();
  const initialProducts = await listProducts({ productType: "skin-booster" });
  return (
    <PageWrapper
      badge={tr(locale, "NOVYX Products", "NOVYX Produkte")}
      title={tr(locale, "Skin Boosters", "Skin Booster")}
      subtitle={tr(locale, "Premium dermal-research presentations managed independently from the peptide catalog.", "Premium-Präsentationen für die Hautforschung, getrennt vom Peptidkatalog verwaltet.")}
      visualSection="products"
    >
      <Container size="xl">
        <Suspense fallback={<div className="min-h-[560px]" aria-hidden="true" />}>
          <ProductCatalog initialProducts={initialProducts} productType="skin-booster" />
        </Suspense>
      </Container>
    </PageWrapper>
  );
}
