import { NextRequest, NextResponse } from "next/server";
import { listProducts } from "@/lib/server/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const products = await listProducts({
    category: searchParams.get("category") || undefined,
    productType: (searchParams.get("productType") || undefined) as "peptide" | "skin-booster" | undefined,
    search: searchParams.get("search") || undefined,
    featured: searchParams.has("featured") ? searchParams.get("featured") === "true" : undefined,
    inStock: searchParams.has("inStock") ? searchParams.get("inStock") === "true" : undefined,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
    offset: searchParams.get("offset") ? Number(searchParams.get("offset")) : undefined,
    ordering: (searchParams.get("ordering") || undefined) as
      | "price"
      | "-price"
      | "purity"
      | "-purity"
      | "name"
      | "-name"
      | undefined,
  });

  // Keep the real price in Turso/Admin only; strip it from every public product payload.
  const publicProducts = products.map(({ price: _price, ...product }) => product);

  return NextResponse.json(publicProducts, {
    headers: { "Cache-Control": "no-store" },
  });
}
