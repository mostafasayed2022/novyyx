"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { locale, setLocale, tr } = useLocale();

  return (
    <div className={cn("inline-flex items-center rounded-full border border-border bg-surface/70 p-1 shadow-sm backdrop-blur-xl", className)} role="group" aria-label={tr("Language selection", "Sprachauswahl")}>
      {!compact && <Languages className="ml-2 mr-1 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
      {(["en", "de"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          aria-pressed={locale === item}
          aria-label={item === "en" ? tr("Switch to English", "Auf Englisch wechseln") : tr("Switch to German", "Auf Deutsch wechseln")}
          className={cn(
            "rounded-full px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.14em] transition-all",
            locale === item ? "bg-brand text-white shadow-[0_0_14px_rgba(27,77,255,0.28)]" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
