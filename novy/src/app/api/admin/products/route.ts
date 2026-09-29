import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { createProduct, listAllProducts } from "@/lib/server/content-store";
import { productSchema } from "@/lib/server/product-schema";
import type { Product } from "@/lib/api/types";
import { translateProductToGerman } from "@/lib/server/codecraft";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await listAllProducts(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { detail: "Invalid product data.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const draft = {
      ...parsed.data,
      id: parsed.data.id || randomUUID(),
    } as Product;
    const german = await translateProductToGerman(draft);
    const product = await createProduct({
      ...draft,
      translations: { ...(draft.translations || {}), de: german },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create product.";
    const status = message.includes("CodeCraft") || message.includes("CODECRAFT") ? 502 : 409;
    return NextResponse.json({ detail: message }, { status });
  }
}
