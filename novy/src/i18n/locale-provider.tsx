"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, type Locale, tr } from "./config";
import { localeFromPathname } from "./paths";

type LocaleContextValue = {
  locale: Locale;
  tr: (english: string, german: string) => string;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale = DEFAULT_LOCALE }: { children: React.ReactNode; initialLocale?: Locale }) {
  const pathname = usePathname();
  const locale = pathname ? localeFromPathname(pathname) : initialLocale;

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = React.useMemo<LocaleContextValue>(() => ({
    locale,
    tr: (english, german) => tr(locale, english, german),
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = React.useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
