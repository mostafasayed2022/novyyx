"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Save } from "lucide-react";
import type { HeroSlide } from "@/components/home/hero-slide-data";

const emptySlide: HeroSlide = {
  id: "",
  number: "01",
  name: "",
  brand: "NŌVYX",
  eyebrow: "",
  eyebrowDe: "",
  headlineMain: "SCIENCE",
  headlineSub: "",
  headlineSubDe: "",
  category: "",
  categoryDe: "",
  description: "",
  descriptionDe: "",
  image: "/products/Novyx Labs GHK-Cu Product Set.png",
  badge: "",
  badgeDe: "",
  metrics: [
    { label: "PURITY", value: "99.8%" },
    { label: "STANDARD", value: "NŌVYX" },
  ],
  productLink: "/products",
  published: true,
};

const inputClass = "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-brand";
const textareaClass = "w-full rounded-xl border border-border bg-background px-3 py-3 text-sm leading-6 outline-none transition focus:border-brand";
const labelClass = "mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function HeroSlideForm({ slide }: { slide?: HeroSlide | null }) {
  const router = useRouter();
  const isEdit = Boolean(slide?.id);
  const [form, setForm] = useState<HeroSlide>(slide ? { ...slide } : { ...emptySlide });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof HeroSlide>(key: K, value: HeroSlide[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function setMetric(index: number, key: "label" | "value", value: string) {
    setForm((current) => ({
      ...current,
      metrics: current.metrics.map((metric, metricIndex) => metricIndex === index ? { ...metric, [key]: value } : metric),
    }));
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await response.json().catch(() => null)) as { url?: string; detail?: string } | null;
      if (!response.ok || !data?.url) throw new Error(data?.detail || "Upload failed.");
      set("image", data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, id: form.id || slugify(form.name) };
      const response = await fetch(isEdit ? `/api/admin/hero/${encodeURIComponent(form.id)}` : "/api/admin/hero", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as { translationWarning?: string; detail?: string } | null;
      if (!response.ok) throw new Error(data?.detail || "Unable to save hero slide.");
      router.push(data?.translationWarning ? "/admin/hero?translation=unavailable" : "/admin/hero");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save hero slide.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{isEdit ? `Edit ${form.name}` : "New hero slide"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">English-only editor. German and French fields are generated when automatic translation is available. English content can always be saved.</p>
        </div>
        <button type="submit" disabled={saving} className="inline-flex h-10 items-center gap-2 self-start rounded-xl bg-brand px-4 text-xs font-semibold text-white disabled:opacity-50">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save slide
        </button>
      </div>

      {error ? <div className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-500">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <h2 className="text-sm font-semibold">Hero copy</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div><label className={labelClass}>Slide ID</label><input className={inputClass} value={form.id} disabled={isEdit} onChange={(e) => set("id", slugify(e.target.value))} placeholder="auto-from-name" /></div>
            <div><label className={labelClass}>Order number</label><input className={inputClass} value={form.number} onChange={(e) => set("number", e.target.value)} required /></div>
            <div><label className={labelClass}>Product / slide name</label><input className={inputClass} value={form.name} onChange={(e) => { set("name", e.target.value); if (!isEdit && !form.id) set("id", slugify(e.target.value)); }} required /></div>
            <div><label className={labelClass}>Brand</label><input className={inputClass} value={form.brand} onChange={(e) => set("brand", e.target.value)} required /></div>
            <div className="sm:col-span-2"><label className={labelClass}>Eyebrow</label><input className={inputClass} value={form.eyebrow} onChange={(e) => set("eyebrow", e.target.value)} required /></div>
            <div><label className={labelClass}>Headline main</label><input className={inputClass} value={form.headlineMain} onChange={(e) => set("headlineMain", e.target.value)} required /></div>
            <div><label className={labelClass}>Headline sub</label><input className={inputClass} value={form.headlineSub} onChange={(e) => set("headlineSub", e.target.value)} required /></div>
            <div className="sm:col-span-2"><label className={labelClass}>Category</label><input className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)} required /></div>
            <div className="sm:col-span-2"><label className={labelClass}>Description</label><textarea rows={5} className={textareaClass} value={form.description} onChange={(e) => set("description", e.target.value)} required /></div>
            <div className="sm:col-span-2"><label className={labelClass}>Badge</label><input className={inputClass} value={form.badge} onChange={(e) => set("badge", e.target.value)} required /></div>
            <div><label className={labelClass}>Metric 1 label</label><input className={inputClass} value={form.metrics[0]?.label || ""} onChange={(e) => setMetric(0, "label", e.target.value)} required /></div>
            <div><label className={labelClass}>Metric 1 value</label><input className={inputClass} value={form.metrics[0]?.value || ""} onChange={(e) => setMetric(0, "value", e.target.value)} required /></div>
            <div><label className={labelClass}>Metric 2 label</label><input className={inputClass} value={form.metrics[1]?.label || ""} onChange={(e) => setMetric(1, "label", e.target.value)} required /></div>
            <div><label className={labelClass}>Metric 2 value</label><input className={inputClass} value={form.metrics[1]?.value || ""} onChange={(e) => setMetric(1, "value", e.target.value)} required /></div>
            <div className="sm:col-span-2"><label className={labelClass}>Product link</label><input className={inputClass} value={form.productLink} onChange={(e) => set("productLink", e.target.value)} required /></div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">Visual</h2>
            <div className="relative mt-4 aspect-square overflow-hidden rounded-xl border border-border bg-background">
              <Image src={form.image} alt="Hero slide preview" fill sizes="320px" className="object-contain p-5" />
            </div>
            <label className="mt-4 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border text-xs font-semibold">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
              {uploading ? "Uploading..." : "Upload to Cloudinary"}
              <input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadImage(file); }} />
            </label>
            <div className="mt-4"><label className={labelClass}>Image URL</label><input className={inputClass} value={form.image} onChange={(e) => set("image", e.target.value)} required /></div>
          </section>
          <section className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">Publishing</h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center justify-between rounded-xl border border-border p-3 text-sm"><span>Published</span><input type="checkbox" checked={form.published !== false} onChange={(e) => set("published", e.target.checked)} /></label>
              <label className="flex items-center justify-between rounded-xl border border-border p-3 text-sm"><span>Wide composite image</span><input type="checkbox" checked={Boolean(form.isWideComposite)} onChange={(e) => set("isWideComposite", e.target.checked)} /></label>
            </div>
          </section>
        </aside>
      </div>
    </form>
  );
}
