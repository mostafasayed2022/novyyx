import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { findProductById } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await findProductById(id);
  if (!product) notFound();
  return <ProductForm product={product} />;
}
