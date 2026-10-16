import { AdminProductList } from "@/components/admin/product-list";
import { listAllProducts } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function AdminPeptidesPage() {
  const products = (await listAllProducts()).filter((product) => product.productType !== "skin-booster");
  return <AdminProductList products={products} title="Peptides" subtitle="Manage peptide catalog entries. German and French fields stay hidden and are generated on save." />;
}
