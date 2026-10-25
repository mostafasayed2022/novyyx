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
      "Nōvyx",
      "Nōvyx.com",
      "NŌVYX",
      "Novyx",
      "NOVYX",
      "novyx.com",
      "NŌVYX peptides",
      "Nōvyx peptides",
      "NŌVYX skin boosters",
      "Nōvyx skin boosters",
      "NŌVYX GHK-Cu",
      "Nōvyx Labs",
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
      "longevity peptides",
      "anti-aging peptides",
      "TB-500",
      "Tirzepatide",
      "Retatrutide",
      "CJC-1295",
      "Ipamorelin",
      "buy research peptides",
      "high purity peptides",
      "German peptide biotechnology",
      "clinical grade peptides",
    ],
    authors: [{ name: "NŌVYX Peptide Sciences Inc." }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
      title: `${siteConfig.name} — ${tagline}`,
      description,
      siteName: siteConfig.name,
      url: siteConfig.url,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: ["Nōvyx", "NOVYX", "Novyx", "Nōvyx.com", "novyx.com"],
        url: siteConfig.url,
        logo: `${siteConfig.url}/logos/novyx_logo_mark.webp`,
        description: siteConfig.description,
        sameAs: Object.values(siteConfig.social).filter(Boolean),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: siteConfig.contact.email,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: ["Nōvyx", "NOVYX", "novyx.com", "Nōvyx.com"],
        publisher: { "@id": `${siteConfig.url}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/products?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen bg-transparent dark:bg-background text-foreground flex flex-col antialiased selection:bg-brand/20 selection:text-foreground font-sans">
        <Providers locale={locale}>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
