import { Metadata } from "next";
import Link from "@/components/layout/localized-link";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { PeptideCalculator } from "@/components/calculator/peptide-calculator";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { HelpCircle, ArrowRight, Mail } from "lucide-react";
import { getServerLocale } from "@/i18n/server";
import { localizedAlternates } from "@/i18n/paths";
import { tr } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    alternates: localizedAlternates("/calculator", locale),
    title: tr(locale, "Peptide Reconstitution & Dilution Calculator", "Peptid-Rekonstitutions- & Verdünnungsrechner"),
    description: tr(locale,
      "Scientific reconstitution tool for in-vitro laboratory research. Calculate required diluent solvent volume (mL/µL) from lyophilized peptide mass and target stock concentration.",
      "Wissenschaftliches Rekonstitutionswerkzeug für In-vitro-Laborforschung. Berechnet das benötigte Verdünnungsvolumen aus lyophilisierter Peptidmasse und Zielkonzentration."
    ),
    keywords: [
      "peptide calculator",
      "reconstitution calculator",
      "peptide dilution",
      "laboratory research",
      "Peptid Rechner",
      "Peptid Rekonstitution",
    ],
  };
}


/**
 * RECONSTITUTION CALCULATOR PAGE
 * Exactly 2 Sections:
 * 1. Calculator (Precision reconstitution tool)
 * 2. Contact CTA (Scientific advisory support)
 */
export default async function CalculatorPage() {
  const locale = await getServerLocale();
  return (
    <PageWrapper
      badge={tr(locale, "Laboratory Tools", "Laborwerkzeuge")}
      title={tr(locale, "Contact Your NŌVYX Representative", "Peptid-Rekonstitutionsrechner")}
      subtitle={tr(locale, "Precision volumetric dilution calculator for laboratory research solutions. Computes exact solvent volume, aliquot concentration, and pipetting parameters.", "Präziser volumetrischer Verdünnungsrechner für Laborlösungen. Berechnet exaktes Lösungsmittelvolumen, Aliquot-Konzentration und Pipettierparameter.")}
      visualSection="science"
    >
      <Container size="xl" className="space-y-10 px-3 sm:space-y-16 sm:px-6 lg:px-8">
        {/* 01 Reconstitution Calculator Widget */}
        <PeptideCalculator />

        {/* 02 Contact CTA */}
        <section className="pt-4">
          <GlassCard
            glow="brand"
            className="mx-auto max-w-3xl space-y-5 rounded-2xl border border-border p-5 text-center sm:space-y-6 sm:p-12"
          >
            <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-foreground">
                {tr(locale, "Require Custom Dilution or Protocol Support?", "Benötigen Sie Unterstützung bei Verdünnung oder Protokoll?")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
                {tr(locale, "If working with hydrophobic sequences, peptide salts requiring specific buffer pH adjustments, or complex molarities, our analytical team is here to assist.", "Bei hydrophoben Sequenzen, Peptidsalzen mit spezifischen pH-Anforderungen oder komplexen Molaritäten unterstützt Sie unser Analytikteam.")}
              </p>
            </div>

            <div className="flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link href={ROUTES.contact} className="w-full sm:w-auto">
                <Button variant="glow" size="md" className="w-full gap-2 font-mono text-xs sm:w-auto">
                  <Mail className="w-4 h-4" />
                  <span>{tr(locale, "Inquire With Chemist", "Chemiker kontaktieren")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href={ROUTES.products} className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full font-mono text-xs sm:w-auto">
                  <span>{tr(locale, "Browse Peptide Catalog", "Peptidkatalog durchsuchen")}</span>
                </Button>
              </Link>
            </div>
          </GlassCard>
        </section>
      </Container>
    </PageWrapper>
  );
}
