import french from "./fr.json";

export const SUPPORTED_LOCALES = ["en", "de", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "de" || value === "fr";
}

export function tr(locale: Locale, english: string, german: string) {
  if (locale === "de") return german;
  if (locale === "fr") return (french as Record<string, string>)[english] || english;
  return english;
}
