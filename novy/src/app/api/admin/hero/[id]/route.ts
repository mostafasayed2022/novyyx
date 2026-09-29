import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { deleteHeroSlide, updateHeroSlide } from "@/lib/server/content-store";
import { heroSlideSchema } from "@/lib/server/hero-schema";
import { translateHeroSlideToGerman } from "@/lib/server/codecraft";
import type { HeroSlide } from "@/components/home/hero-slide-data";

export const runtime = "nodejs";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = heroSlideSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ detail: "Invalid hero slide data.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  try {
    const german = await translateHeroSlideToGerman(parsed.data);
    const slide = await updateHeroSlide(id, { ...parsed.data, id, ...german } as HeroSlide);
    if (!slide) return NextResponse.json({ detail: "Hero slide not found." }, { status: 404 });
    return NextResponse.json(slide);
  } catch (error) {
    return NextResponse.json({ detail: error instanceof Error ? error.message : "Unable to update hero slide." }, { status: 502 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  const deleted = await deleteHeroSlide(id);
  if (!deleted) return NextResponse.json({ detail: "Hero slide not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
