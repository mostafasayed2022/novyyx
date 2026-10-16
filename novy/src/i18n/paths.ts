import { DEFAULT_LOCALE, type Locale } from "./config";

const PREFIX = /^\/(?:en|de|fr)(?=\/|[?#]|$)/;

export function localeFromPathname(pathname: string): Locale {
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(PREFIX, "") || "/";
}

export function localizedPath(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const path = stripLocalePrefix(href);
  if (/^\/(?:admin|api|_next)(?:\/|$)/.test(path) || /\.[a-z0-9]+(?:[?#]|$)/i.test(path)) {
    return path;
  }

  return locale === DEFAULT_LOCALE ? path : `/${locale}${path === "/" ? "" : path}`;
}

export function localizedAlternates(path: string, locale: Locale) {
  return {
    canonical: localizedPath(path, locale),
    languages: {
      en: localizedPath(path, "en"),
      de: localizedPath(path, "de"),
      fr: localizedPath(path, "fr"),
      "x-default": localizedPath(path, "en"),
    },
  };
}

export function openGraphLocale(locale: Locale): string {
  return locale === "de" ? "de_DE" : locale === "fr" ? "fr_FR" : "en_US";
}
