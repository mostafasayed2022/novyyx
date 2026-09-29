export const SUPPORTED_LOCALES = ["en", "de"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "novyx-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "de";
}

export function tr(locale: Locale, english: string, german: string) {
  return locale === "de" ? german : english;
}
