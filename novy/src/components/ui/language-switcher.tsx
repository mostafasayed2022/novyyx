"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";
import { localizedPath } from "@/i18n/paths";
import { cn } from "@/lib/utils/cn";

const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
] as const;

export function LanguageSwitcher({ compact = false, className, onSelect }: { compact?: boolean; className?: string; onSelect?: () => void }) {
  const { locale, tr } = useLocale();
  const pathname = usePathname();
  const search = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const hrefFor = (code: (typeof languages)[number]["code"]) => {
    const target = localizedPath(pathname || "/", code);
    const query = search.toString();
    return query ? `${target}?${query}` : target;
  };
  const label = tr("Choose language", "Sprache wählen");

  if (!compact) {
    return (
      <div className={cn("grid grid-cols-3 gap-1 rounded-2xl border border-border/80 bg-surface/70 p-1.5", className)} role="group" aria-label={label}>
        {languages.map((item) => (
          <a key={item.code} href={hrefFor(item.code)} hrefLang={item.code} lang={item.code} aria-current={locale === item.code ? "page" : undefined} onClick={onSelect}
            className={cn("flex min-h-12 flex-col items-center justify-center rounded-xl px-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand", locale === item.code ? "bg-brand text-white shadow-[0_4px_18px_rgba(27,77,255,0.26)]" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground")}>
            <span className="font-mono font-bold uppercase tracking-[0.12em]">{item.code}</span>
            <span className="mt-0.5 text-[10px]">{item.name}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button type="button" aria-label={`${label}: ${languages.find((item) => item.code === locale)?.name}`} aria-expanded={open} aria-controls="site-language-options"
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 min-w-[76px] items-center justify-center gap-1.5 rounded-full border border-border/80 bg-surface/70 px-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-foreground shadow-sm transition-colors hover:border-brand/50 hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
        <Globe2 className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
        {locale}
        <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open && (
        <div id="site-language-options" className="absolute right-0 top-[calc(100%+10px)] z-50 w-44 rounded-2xl border border-border/80 bg-background/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          {languages.map((item) => (
            <a key={item.code} href={hrefFor(item.code)} hrefLang={item.code} lang={item.code} aria-current={locale === item.code ? "page" : undefined}
              onClick={() => { setOpen(false); onSelect?.(); }}
              className={cn("flex min-h-10 items-center gap-3 rounded-xl px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-brand", locale === item.code ? "bg-brand/10 text-brand" : "text-foreground hover:bg-surface-elevated")}>
              <span className="w-6 font-mono font-bold uppercase">{item.code}</span>
              <span className="flex-1">{item.name}</span>
              {locale === item.code && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
