import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { createHeroSlide, listHeroSlides } from "@/lib/server/content-store";
import { heroSlideSchema } from "@/lib/server/hero-schema";
import { translateHeroSlideToGerman, optionalTranslation } from "@/lib/server/codecraft";
import type { HeroSlide } from "@/components/home/hero-slide-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  return NextResponse.json(await listHeroSlides(true), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const parsed = heroSlideSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ detail: "Invalid hero slide data.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const { translation: german, translationWarning } = await optionalTranslation(() => translateHeroSlideToGerman(parsed.data), {
      eyebrowDe: parsed.data.eyebrowDe || "", headlineSubDe: parsed.data.headlineSubDe || "",
      categoryDe: parsed.data.categoryDe || "", descriptionDe: parsed.data.descriptionDe || "", badgeDe: parsed.data.badgeDe || "",
    });
    const slide = await createHeroSlide({ ...parsed.data, ...german } as HeroSlide);
    return NextResponse.json({ ...slide, translationWarning }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ detail: error instanceof Error ? error.message : "Unable to create hero slide." }, { status: 502 });
  }
}
