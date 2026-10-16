"use client";

import { useLocale } from "@/i18n/locale-provider";
import { NovyxStaticVial } from "./novyx-static-vial";

export function NovyxVialVisual() {
  const { tr } = useLocale();

  return (
    <div
      role="img"
      aria-label={tr("NOVYX GHK-Cu professional skin booster vial", "NOVYX GHK-Cu Fläschchen für professionelle Anwendung")}
      className="relative mx-auto aspect-[4/5] w-full max-w-[500px] translate-y-4 sm:translate-y-6 lg:translate-y-10"
    >
      <div aria-hidden="true" className="absolute inset-x-[7%] bottom-[4%] h-[13%] rounded-[50%] bg-brand/20 blur-2xl" />
      <div aria-hidden="true" className="absolute inset-[4%] rounded-full border border-brand/15 [transform:rotate(-20deg)_rotateX(72deg)]" />
      <div aria-hidden="true" className="absolute inset-[15%] rounded-full border border-brand/10 [transform:rotate(26deg)_rotateX(72deg)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <NovyxStaticVial className="h-[calc(100%-2.5rem)]" sizes="(max-width: 1024px) 260px, 420px" priority />
      </div>
    </div>
  );
}
