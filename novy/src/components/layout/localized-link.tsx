"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { localizedPath } from "@/i18n/paths";

export default function LocalizedLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { locale } = useLocale();
  return <Link href={typeof href === "string" ? localizedPath(href, locale) : href} {...props} />;
}
