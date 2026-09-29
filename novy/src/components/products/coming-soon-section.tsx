"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { useLocale } from "@/i18n/locale-provider";
import { Clock, Sparkles, ArrowRight } from "lucide-react";

interface PipelineCompound {
  name: string;
  sequence: string;
  category: string;
  categoryDe: string;
  stage: string;
  stageDe: string;
  targetPurity: string;
  description: string;
  descriptionDe: string;
}

export function ComingSoonSection() {
  const { locale, tr } = useLocale();

  const pipelineCompounds: PipelineCompound[] = [
    {
      name: "EPITHALON",
      sequence: "Ala-Glu-Asp-Gly",
      category: "Telomeric & Pineal",
      categoryDe: "Telomerisch & Pineal",
      stage: "Stage 3: Cryogenic Sublimation",
      stageDe: "Stufe 3: Kryogene Sublimation",
      targetPurity: "> 99.6%",
      description:
        "Pineal gland tetrapeptide investigated for telomerase induction and DNA methylation stability in primary somatic cell lines.",
      descriptionDe:
        "Tetrapeptid der Zirbeldrüse, das hinsichtlich Telomerase-Induktion und Stabilität der DNA-Methylierung in primären somatischen Zelllinien untersucht wird.",
    },
    {
      name: "MOTS-c",
      sequence: "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg",
      category: "Mitochondrial Signaling",
      categoryDe: "Mitochondriale Signalgebung",
      stage: "Stage 2: Preparative HPLC",
      stageDe: "Stufe 2: Präparative HPLC",
      targetPurity: "> 99.4%",
      description:
        "Mitochondrial-derived 16-amino acid peptide regulating systemic metabolic homeostasis, glucose utilization, and cellular energy.",
      descriptionDe:
        "Mitochondrial abgeleitetes 16-Aminosäuren-Peptid zur Forschung an systemischer metabolischer Homöostase, Glukoseverwertung und zellulärer Energie.",
    },
    {
      name: "SS-31 (Elamipretide)",
      sequence: "D-Arg-Dmt-Lys-Phe-NH2",
      category: "Cardiolipin Bioenergetics",
      categoryDe: "Cardiolipin-Bioenergetik",
      stage: "Stage 3: Mass Spec Validation",
      stageDe: "Stufe 3: Massenspektrometrische Validierung",
      targetPurity: "> 99.8%",
      description:
        "Mitochondria-targeting tetrapeptide engineered to selectively associate with inner membrane cardiolipin, optimizing electron transport.",
      descriptionDe:
        "Mitochondrienadressierendes Tetrapeptid zur selektiven Assoziation mit Cardiolipin der inneren Membran und zur Untersuchung des Elektronentransports.",
    },
    {
      name: "THYMOSIN ALPHA-1",
      sequence: "Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu... (28-AA)",
      category: "Immune Regulatory",
      categoryDe: "Immunregulatorisch",
      stage: "Stage 1: Microwave SPPS",
      stageDe: "Stufe 1: Mikrowellen-SPPS",
      targetPurity: "> 99.5%",
      description:
        "Highly conserved 28-amino acid polypeptide investigated for T-cell differentiation and dendritic antigen-presenting activity.",
      descriptionDe:
        "Hochkonserviertes Polypeptid aus 28 Aminosäuren zur Untersuchung von T-Zell-Differenzierung und dendritischer Antigenpräsentation.",
    },
  ];

  return (
    <section className="mt-20 pt-16 border-t border-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs text-[#00D2FF]">
              <Sparkles className="w-3 h-3 mr-1" />
              {tr("Pre-Release Synthesis Pipeline", "Synthese-Pipeline vor Markteinführung")}
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans editorial-headline">
            {tr("COMING SOON", "DEMNÄCHST")} <br />
            <span className="text-brand">{tr("PIPELINE FORMULATIONS", "PIPELINE-FORMULIERUNGEN")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            {tr(
              "These sequence candidates are progressing through solid-phase synthesis, fraction isolation, and blind testing. Advance allocation reservations available for research institutions.",
              "Diese Sequenzkandidaten durchlaufen derzeit Festphasensynthese, Fraktionsisolierung und verblindete Prüfungen. Vorabreservierungen sind für Forschungseinrichtungen möglich.",
            )}
          </p>
        </div>

        <Link href={ROUTES.contact} className="shrink-0">
          <Button variant="outline" className="gap-2 font-mono text-xs">
            <span>{tr("Reserve Future Lots", "Künftige Chargen reservieren")}</span>
            <ArrowRight className="w-4 h-4 text-brand" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pipelineCompounds.map((c) => (
          <GlassCard key={c.name} glow="brand" spotlight className="p-6 space-y-4 rounded-xl border border-border">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-lg font-bold text-foreground">{c.name}</h3>
                  <Badge variant="brand" className="text-[10px] py-0 font-mono">
                    {c.targetPurity} {tr("Target", "Ziel")}
                  </Badge>
                </div>
                <p className="font-mono text-xs text-brand">{locale === "de" ? c.categoryDe : c.category}</p>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-[10px] font-mono text-muted-foreground shrink-0">
                <Clock className="w-3 h-3 text-[#00D2FF]" />
                <span>{locale === "de" ? c.stageDe : c.stage}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              {locale === "de" ? c.descriptionDe : c.description}
            </p>

            <div className="pt-2 border-t border-border/70 flex items-center justify-between text-[11px] font-mono">
              <span className="text-muted-foreground truncate max-w-[240px]">{c.sequence}</span>
              <Link href={ROUTES.contact} className="text-brand hover:underline font-semibold flex items-center gap-1 shrink-0">
                {tr("Inquire Allocation", "Zuteilung anfragen")} &rarr;
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
