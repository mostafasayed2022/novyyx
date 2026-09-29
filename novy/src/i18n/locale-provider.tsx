"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale, tr } from "./config";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  tr: (english: string, german: string) => string;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale = DEFAULT_LOCALE }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale);
  const router = useRouter();

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = React.useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLocale;
    router.refresh();
  }, [router]);

  const value = React.useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale,
    tr: (english, german) => tr(locale, english, german),
  }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = React.useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
