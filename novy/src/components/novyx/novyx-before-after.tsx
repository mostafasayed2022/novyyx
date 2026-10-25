"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";

export function NovyxBeforeAfter() {
  const { tr } = useLocale();
  const [position, setPosition] = React.useState(50);
  const captionId = React.useId();

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--card-shadow)]">
      <div className="group relative isolate aspect-[4/5] overflow-hidden bg-[#dce6f5] focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand sm:aspect-[5/4] lg:aspect-[4/5]">
        <Image
          src="/products/novyx-skin-illustration-before.webp"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <Image
            src="/products/novyx-skin-illustration-after.webp"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-center"
          />
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0b1933]/35 to-transparent" />
        <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 rounded bg-[#10233f]/90 px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-white sm:left-5 sm:top-5 sm:text-[10px]">
          {tr("Before / illustrative", "Vorher / Illustration")}
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 rounded bg-[#10233f]/90 px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-white sm:right-5 sm:top-5 sm:text-[10px]">
          {tr("After / illustrative", "Nachher / Illustration")}
        </span>

        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" style={{ left: `${position}%` }} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/20 bg-white text-brand shadow-[0_8px_30px_rgba(12,34,76,0.28)] transition-shadow group-focus-within:ring-4 group-focus-within:ring-brand/25"
          style={{ left: `${position}%` }}
        >
          <ArrowLeftRight className="size-5" strokeWidth={2.2} />
        </div>

        <input
          type="range"
          min="5"
          max="95"
          step="1"
          value={position}
          onChange={(event) => setPosition(Number(event.currentTarget.value))}
          aria-label={tr("Drag to compare illustrative before and after images", "Ziehen, um illustrative Vorher-Nachher-Bilder zu vergleichen")}
          aria-describedby={captionId}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        />
      </div>
      <figcaption id={captionId} className="border-t border-border px-5 py-4 text-xs leading-6 text-muted-foreground sm:px-6">
        {tr(
          "Illustrative, digitally generated portraits. This is not a clinical before-and-after result or evidence of NŌVYX product efficacy.",
          "Illustrative, digital erstellte Porträts. Dies ist kein klinisches Vorher-Nachher-Ergebnis und kein Beleg für die Wirksamkeit des NŌVYX Produkts.",
        )}
      </figcaption>
    </figure>
  );
}
