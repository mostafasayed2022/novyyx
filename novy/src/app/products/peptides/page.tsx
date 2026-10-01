import { toPublicProduct } from "@/lib/utils/public-product";
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
    title: tr(locale, "NOVYX Peptides", "NOVYX Peptide"),
    description: tr(locale, "Explore NOVYX peptide research products.", "Entdecken Sie NOVYX Peptid-Forschungsprodukte."),
  };
}

export default async function PeptidesPage() {
  const locale = await getServerLocale();
  const initialProducts = await listProducts({ productType: "peptide" });
  return (
    <PageWrapper
      badge={tr(locale, "NOVYX Products", "NOVYX Produkte")}
      title={tr(locale, "Peptides", "Peptide")}
      subtitle={tr(locale, "Focused peptide research formats and the NOVYX Blend Series, presented with clear technical specifications.", "Fokussierte Peptid-Forschungsformate und die NOVYX Blend Series mit klaren technischen Spezifikationen.")}
      visualSection="products"
    >
      <Container size="xl">
        <Suspense fallback={<div className="min-h-[560px]" aria-hidden="true" />}>
          <ProductCatalog initialProducts={initialProducts.map(toPublicProduct)} productType="peptide" />
        </Suspense>
      </Container>
    </PageWrapper>
  );
}
