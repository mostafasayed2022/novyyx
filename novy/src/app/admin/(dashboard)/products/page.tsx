import { AdminProductList } from "@/components/admin/product-list";
import { listAllProducts } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ translation?: string }> }) {
  const { translation } = await searchParams;
  const products = await listAllProducts();
  return <>
    {translation === "unavailable" && <p role="status" className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">English content saved. Automatic German or French translation was unavailable. Existing translated copy was preserved where available; review both languages before publishing.</p>}
    <AdminProductList products={products} title="Products" subtitle="English-only CMS. German and French copy is generated and stored when automatic translation is available." />
  </>;
}
