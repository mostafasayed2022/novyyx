import type { Metadata, Viewport } from "next";
import { Providers } from "@/providers";
import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/config/site.config";
import { getServerLocale } from "@/i18n/server";
import "./globals.css";

// Fonts are provided through resilient CSS font stacks in globals.css.
// This avoids Turbopack build-time next/font/google network resolution failures.

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1000,
        height: 566,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "./",
  },
};

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
