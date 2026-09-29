import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { AboutHeroBanner } from "@/components/about/about-hero-banner";
import { SectionDivider } from "@/components/ui/section-divider";
import {
  QualityPartnershipSection,
  BrandPillarsSection,
  ProcessSection,
  ProfessionalsSection,
} from "@/components/home";
import { getServerLocale } from "@/i18n/server";
import { tr } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: tr(locale,
      "About NOVYX — Philosophy, Standards & Scientific Heritage",
      "Über NOVYX — Philosophie, Standards & wissenschaftliche Herkunft"
    ),
    description: tr(locale,
      "Learn about the foundational biotechnology philosophy, ISO 9001:2015 cleanroom infrastructure, and transparent analytical standards of NOVYX Peptide Sciences.",
      "Erfahren Sie mehr über die biotechnologische Philosophie, Reinrauminfrastruktur und transparenten analytischen Standards von NOVYX Peptide Sciences."
    ),
  };
}


/**
 * ABOUT PAGE
 * About Sections:
 * 1. Quality & Partnership (NOVYX Standard)
 * 2. Brand Pillars
 * 3. Quality / Process
 * 4. Professional Partners + CTA
 */
export default async function AboutPage() {
  const locale = await getServerLocale();
  return (
    <PageWrapper className="pt-24">
      <AboutHeroBanner
        badge={tr(locale, "About NOVYX", "Über NOVYX")}
        title={tr(locale, "Engineered for Longevity", "Entwickelt für Langlebigkeit")}
        subtitle={tr(
          locale,
          "Advanced peptide science, premium quality, and modern biotechnology — built around clarity, consistency, and research confidence.",
          "Fortschrittliche Peptidwissenschaft, Premium-Qualität und moderne Biotechnologie — entwickelt für Klarheit, Konsistenz und Vertrauen in der Forschung."
        )}
        scienceLabel={tr(locale, "Advanced Science", "Fortschrittliche Wissenschaft")}
        peptideLabel={tr(locale, "Peptide Innovation", "Peptid-Innovation")}
      />

      <div className="flex flex-col w-full">
        {/* 01 NOVYX Standard — Quality & Partnership */}
        <div id="standard">
          <QualityPartnershipSection />
        </div>

        <SectionDivider label={tr(locale, "CORE VALUES // BRAND PILLARS", "KERNWERTE // MARKENPFEILER")} />

        {/* 02 Brand Pillars */}
        <div id="brand-pillars">
          <BrandPillarsSection />
        </div>

        {/* <SectionDivider label="FACILITY SPECIFICATIONS // CLEANROOM SUITES" /> */}

        {/* 02 Our Quality */}
        {/* <div id="quality">
          <OurQualitySection />
        </div> */}

        {/* <SectionDivider label="ANALYTICAL RIGOR // DUAL-ORTHOGONAL AUDITS" /> */}

        {/* 03 Tested / Documented / Verified */}
        {/* <div id="verification">
          <TestedVerifiedSection />
        </div> */}

        <SectionDivider label={tr(locale, "METHODOLOGY // 4-STAGE ACCREDITATION", "METHODIK // 4-STUFIGE AKKREDITIERUNG")} />

        {/* 03 Quality / Process */}
        <div id="process">
          <ProcessSection />
        </div>

        <SectionDivider label={tr(locale, "GLOBAL ALLIANCES // INSTITUTIONAL ACCESS", "GLOBALE ALLIANZEN // INSTITUTIONELLER ZUGANG")} />

        {/* 04 Professional Partners + CTA */}
        <div id="partners">
          <ProfessionalsSection />
        </div>
      </div>
    </PageWrapper>
  );
}
