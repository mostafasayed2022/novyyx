"use client";

import Link from "@/components/layout/localized-link";
import { Container } from "./container";
import { NovyxLogo } from "@/components/ui/novax-logo";
import { useLocale } from "@/i18n/locale-provider";
import { MAIN_NAVIGATION } from "@/lib/constants/navigation";

export function Footer() {
  const { locale, tr } = useLocale();

  return (
    <footer className="border-t border-border bg-surface text-sm">
      <Container size="xl" className="py-10 md:py-12">
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center"
            aria-label="NŌVYX Home"
          >
            <NovyxLogo variant="stacked" height={96} />
          </Link>

          <nav aria-label="Footer navigation" className="mt-7">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-muted-foreground sm:text-sm">
              {MAIN_NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {locale === "de" ? item.titleDe || item.title : locale === "fr" ? item.titleFr || item.title : item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 w-full max-w-2xl border-t border-border/70 pt-5">
            <p className="text-[11px] text-muted-foreground sm:text-xs">
              © 2023 NŌVYX. {tr("All rights reserved.", "Alle Rechte vorbehalten.")}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
