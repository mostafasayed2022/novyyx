import { Metadata } from "next";
import {
  HeroSection,
  StandardSection,
  TestedVerifiedSection,
  OurQualitySection,
  CtaSection,
} from "@/components/home";
import { SectionDivider } from "@/components/ui/section-divider";
import { getServerLocale } from "@/i18n/server";
import { tr } from "@/i18n/config";
import { listHeroSlides } from "@/lib/server/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: tr(locale,
      "NOVYX — Engineered for Longevity | Molecular Biotechnology & Peptide Synthesis",
      "NOVYX — Entwickelt für Langlebigkeit | Molekulare Biotechnologie & Peptidsynthese"
    ),
    description: tr(locale,
      "Setting the global benchmark in ultra-high purity peptide research. Engineered through automated solid-phase synthesis, preparative multi-gradient HPLC, and transparent batch-level analytics.",
      "Ein neuer Maßstab für hochreine Peptidforschung — entwickelt durch automatisierte Festphasensynthese, präparative Multi-Gradient-HPLC und transparente Analytik auf Chargenebene."
    ),
  };
}


export const dynamic = "force-dynamic";

/**
 * HOME PAGE
 * Home Sections:
 * 1. Hero
 * 2. NOVYX Standard
 * 3. Tested / Documented / Verified
 * 4. Our Quality
 * 5. Contact CTA
 */
export default async function HomePage() {
  const locale = await getServerLocale();
  const heroSlides = await listHeroSlides();
  return (
    <div className="flex flex-col w-full overflow-hidden bg-background text-foreground">
      {/* 01 Hero Section */}
      <HeroSection initialSlides={heroSlides} />

      <SectionDivider label={tr(locale, "THE STANDARD // PROTOCOL 01", "DER STANDARD // PROTOKOLL 01")} />

      {/* 02 NOVYX Standard */}
      <StandardSection />

      <SectionDivider label={tr(locale, "ANALYTICAL RIGOR // QUALITY VERIFICATION", "ANALYTISCHE STRIKTHEIT // QUALITÄTSVERIFIZIERUNG")} />

      {/* 03 Tested / Documented / Verified */}
      <TestedVerifiedSection />

      <SectionDivider label={tr(locale, "CLINICAL RIGOR // CLEANROOM SUITES", "KLINISCHE STRIKTHEIT // REINRAUMBEREICHE")} />

      {/* 04 Our Quality */}
      <OurQualitySection />

      <SectionDivider label={tr(locale, "DIRECT COLLABORATION // GLOBAL ACCESS", "DIREKTE ZUSAMMENARBEIT // GLOBALER ZUGANG")} />

      {/* 05 Contact CTA */}
      <CtaSection />
    </div>
  );
}
