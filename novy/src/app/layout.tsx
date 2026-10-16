import type { Metadata, Viewport } from "next";
import { Providers } from "@/providers";
import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/config/site.config";
import { getServerLocale } from "@/i18n/server";
import { openGraphLocale } from "@/i18n/paths";
import { tr } from "@/i18n/config";
import "./globals.css";

// Fonts are provided through resilient CSS font stacks in globals.css.
// This avoids Turbopack build-time next/font/google network resolution failures.

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const tagline = tr(locale, siteConfig.tagline, "Entwickelt für Langlebigkeit");
  const description = tr(locale, siteConfig.description, "Klare Wissenschaft. Beständige Leistung. Präzise Peptidbiotechnologie für Langlebigkeit, analytische Reinheit und deutsche Qualitätsstandards.");
  return {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  keywords: [
    "peptides",
    "biotechnology",
    "peptide synthesis",
    "research peptides",
    "HPLC verified",
    "purity analysis",
    "molecular biology",
    "BPC-157",
    "GHK-Cu",
    "Semaglutide research",
  ],
  authors: [{ name: "NOVYX Peptide Sciences Inc." }],
  openGraph: {
    type: "website",
    locale: openGraphLocale(locale),
    title: `${siteConfig.name} — ${tagline}`,
    description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1000,
        height: 566,
        alt: `${siteConfig.name} — ${tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="relative min-h-screen bg-transparent dark:bg-background text-foreground flex flex-col antialiased selection:bg-brand/20 selection:text-foreground font-sans">
        <Providers locale={locale}>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
