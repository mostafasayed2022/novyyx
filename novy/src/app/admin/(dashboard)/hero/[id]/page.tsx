import { notFound } from "next/navigation";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";
import { findHeroSlideById } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slide = await findHeroSlideById(id);
  if (!slide) notFound();
  return <HeroSlideForm slide={slide} />;
}
