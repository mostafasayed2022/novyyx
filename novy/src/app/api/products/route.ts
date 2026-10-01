import { z } from "zod";
import { toPublicProduct } from "@/lib/utils/public-product";
import { NextRequest, NextResponse } from "next/server";
import { listProducts } from "@/lib/server/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const querySchema = z.object({
  category: z.string().optional(),
  productType: z.enum(["peptide", "skin-booster"]).optional(),
  search: z.string().max(200).optional(),
  featured: z.enum(["true", "false"]).transform((value) => value === "true").optional(),
  inStock: z.enum(["true", "false"]).transform((value) => value === "true").optional(),
  limit: z.coerce.number().int().min(1).max(1000).optional(),
  offset: z.coerce.number().int().min(0).optional(),
  ordering: z.enum(["price", "-price", "purity", "-purity", "name", "-name"]).optional(),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return NextResponse.json({ detail: "Invalid product query." }, { status: 400 });
  const products = await listProducts(parsed.data);

  // Keep the real price in Turso/Admin only; strip it from every public product payload.
  const publicProducts = products.map(toPublicProduct);

  return NextResponse.json(publicProducts, {
    headers: { "Cache-Control": "no-store" },
  });
}
