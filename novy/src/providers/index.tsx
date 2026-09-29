"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { LocaleProvider } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/config";

interface ProvidersProps {
  children: React.ReactNode;
  locale: Locale;
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <LocaleProvider initialLocale={locale}>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <QueryProvider>{children}</QueryProvider>
        </MotionConfig>
      </ThemeProvider>
    </LocaleProvider>
  );
}
