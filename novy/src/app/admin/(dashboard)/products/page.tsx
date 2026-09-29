import { AdminProductList } from "@/components/admin/product-list";
import { listAllProducts } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await listAllProducts();
  return <AdminProductList products={products} title="Products" subtitle="English-only CMS. German copy is generated and stored automatically on save." />;
}
