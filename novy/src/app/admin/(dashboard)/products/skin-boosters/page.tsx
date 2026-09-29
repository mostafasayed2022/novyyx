import { AdminProductList } from "@/components/admin/product-list";
import { listAllProducts } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function AdminSkinBoostersPage() {
  const products = (await listAllProducts()).filter((product) => product.productType === "skin-booster");
  return <AdminProductList products={products} title="Skin Boosters" subtitle="Manage skin-booster catalog entries with automatic German translation on save." />;
}
