import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { deleteProduct, updateProduct, findProductById } from "@/lib/server/content-store";
import { productSchema } from "@/lib/server/product-schema";
import type { Product } from "@/lib/api/types";
import { translateProductToGerman, optionalTranslation } from "@/lib/server/codecraft";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { detail: "Invalid product data.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const draft = { ...parsed.data, id } as Product;
    const existing = await findProductById(id);
    if (!existing) return NextResponse.json({ detail: "Product not found." }, { status: 404 });
    const { translation: german, translationWarning } = await optionalTranslation(() => translateProductToGerman(draft), existing.translations?.de || {});
    const product = await updateProduct(id, {
      ...draft,
      translations: { ...(draft.translations || {}), de: german },
    });
    if (!product) return NextResponse.json({ detail: "Product not found." }, { status: 404 });
    return NextResponse.json({ ...product, translationWarning });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update product.";
    const status = message.includes("CodeCraft") || message.includes("CODECRAFT") ? 502 : 409;
    return NextResponse.json({ detail: message }, { status });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const deleted = await deleteProduct(id);
  if (!deleted) return NextResponse.json({ detail: "Product not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
