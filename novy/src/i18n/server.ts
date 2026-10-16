import { headers } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

export async function getServerLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  const value = requestHeaders.get("x-novyx-locale");
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
