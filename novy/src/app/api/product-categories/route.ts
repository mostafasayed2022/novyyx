import { NextResponse } from "next/server";
import { listProducts } from "@/lib/server/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const labels: Record<string, string> = {
  longevity: "Skin & Longevity",
  metabolic: "Metabolic Precision",
  "cellular-repair": "Regeneration",
  cognitive: "Cognitive Optimization",
  immunology: "Immunology",
  "custom-synthesis": "Custom Synthesis",
};

export async function GET() {
  const products = await listProducts();
  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) || 0) + 1);
  }

  const categories = [...counts.entries()].map(([slug, productCount]) => ({
    id: slug,
    slug,
    name: labels[slug] || slug,
    description: `${labels[slug] || slug} products`,
    productCount,
  }));

  return NextResponse.json(categories, {
    headers: { "Cache-Control": "no-store" },
  });
}
