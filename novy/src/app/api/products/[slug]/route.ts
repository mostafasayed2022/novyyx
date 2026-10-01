import { toPublicProduct } from "@/lib/utils/public-product";
import { NextResponse } from "next/server";
import { findProductBySlug } from "@/lib/server/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const product = await findProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ detail: "Product not found." }, { status: 404 });
  }

  // Price stays available in the admin/Turso store but is never exposed by the public API.
  const publicProduct = toPublicProduct(product);

  return NextResponse.json(publicProduct, {
    headers: { "Cache-Control": "no-store" },
  });
}
