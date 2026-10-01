import Image from "next/image";
import Link from "next/link";
import { Edit3, Plus } from "lucide-react";
import { DeleteHeroSlideButton } from "@/components/admin/delete-hero-slide-button";
import { listHeroSlides } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage({ searchParams }: { searchParams: Promise<{ translation?: string }> }) {
  const { translation } = await searchParams;
  const slides = await listHeroSlides(true);
  return (
    <div className="space-y-6">
      {translation === "unavailable" && <p role="status" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">English slide saved. German translation was unavailable; previous German copy was preserved. Review it before publishing.</p>}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-brand">Homepage / Hero</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Hero slides</h1><p className="mt-2 text-sm text-muted-foreground">Draft/published control with automatic German translation on save.</p></div>
        <Link href="/admin/hero/new" className="inline-flex h-10 items-center gap-2 self-start rounded-xl bg-brand px-4 text-xs font-semibold text-white"><Plus className="h-4 w-4" /> Add slide</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {slides.map((slide) => (
          <article key={slide.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="relative aspect-[16/10] bg-background"><Image src={slide.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-5" /></div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-mono text-brand">{slide.number}</p><h2 className="mt-1 font-semibold">{slide.name}</h2><p className="mt-1 text-xs text-muted-foreground">{slide.headlineMain} · {slide.headlineSub}</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${slide.published === false ? "bg-amber-500/10 text-amber-600" : "bg-brand/10 text-brand"}`}>{slide.published === false ? "Draft" : "Published"}</span></div>
              <div className="mt-5 flex gap-2"><Link href={`/admin/hero/${slide.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-2 text-[11px] font-medium"><Edit3 className="h-3.5 w-3.5" /> Edit</Link><DeleteHeroSlideButton id={slide.id} name={slide.name} /></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
