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
    title: tr(locale, "NOVYX Research Products", "NOVYX Forschungsprodukte"),
    description: tr(
      locale,
      "Explore the focused NOVYX research product range.",
      "Entdecken Sie das fokussierte NOVYX Sortiment für Forschungsprodukte.",
    ),
  };
}

export default async function ProductsPage() {
  const locale = await getServerLocale();
  const initialProducts = await listProducts();

  return (
    <PageWrapper
      badge={tr(locale, "NOVYX Products", "NOVYX Produkte")}
      title={tr(locale, "Research Product Collection", "Forschungsprodukt-Kollektion")}
      subtitle={tr(
        locale,
        "A focused collection presented with clear product visuals and concise research information.",
        "Eine fokussierte Kollektion mit klaren Produktbildern und kompakten Forschungsinformationen.",
      )}
      visualSection="products"
    >
      <Container size="xl">
        <Suspense fallback={<div className="min-h-[560px]" aria-hidden="true" />}>
          <ProductCatalog initialProducts={initialProducts.map(toPublicProduct)} />
        </Suspense>
      </Container>
    </PageWrapper>
  );
}
