"use client";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { useLocale } from "@/i18n/locale-provider";
import { Atom, Leaf, ShieldCheck, Dna } from "lucide-react";

export function BrandPillarsSection() {
  const { tr } = useLocale();

  const pillars = [
    {
      title: tr("Science Driven", "Wissenschaftlich geführt"),
      desc: tr(
        "Research-first thinking guides how NOVYX develops and presents every product.",
        "Forschungsorientiertes Denken bestimmt, wie NOVYX jedes Produkt entwickelt und präsentiert."
      ),
      icon: Atom,
    },
    {
      title: tr("Youthful Results", "Jugendliche Ergebnisse"),
      desc: tr(
        "Formulations are selected to support modern longevity and appearance-focused goals.",
        "Die Formulierungen werden ausgewählt, um moderne Ziele rund um Langlebigkeit und Erscheinungsbild zu unterstützen."
      ),
      icon: Leaf,
    },
    {
      title: tr("German Quality", "Deutsche Qualität"),
      desc: tr(
        "Clean execution, reliable handling, and a clear quality mindset shape the NOVYX standard.",
        "Saubere Ausführung, verlässliche Handhabung und ein klares Qualitätsverständnis prägen den NOVYX-Standard."
      ),
      icon: ShieldCheck,
    },
    {
      title: tr("Advanced Peptides", "Fortschrittliche Peptide"),
      desc: tr(
        "A focused peptide portfolio built around clarity, quality, and research confidence.",
        "Ein fokussiertes Peptidportfolio, aufgebaut auf Klarheit, Qualität und Forschungssicherheit."
      ),
      icon: Dna,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-24">
      <Container size="xl" className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="space-y-4">
            <Badge variant="brand">{tr("Brand Pillars", "Markenpfeiler")}</Badge>
            <h2 className="editorial-headline font-sans text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {tr("WHAT", "WAS")} <span className="text-brand">NOVYX</span> {tr("STANDS FOR", "AUSZEICHNET")}
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
              {tr(
                "Four simple ideas shape the NOVYX identity — science-led, quality-focused, and built for modern peptide research.",
                "Vier einfache Ideen prägen die Identität von NOVYX — wissenschaftlich geführt, qualitätsorientiert und für moderne Peptidforschung entwickelt."
              )}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <GlassCard
                  key={pillar.title}
                  glow="brand"
                  spotlight
                  className="group rounded-2xl border border-border p-7 text-center"
                >
                  <div className="flex min-h-[250px] flex-col items-center justify-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/15 bg-brand/5 text-brand transition-transform duration-300 group-hover:scale-105 group-hover:bg-brand/10">
                      <Icon className="h-8 w-8" strokeWidth={1.8} />
                    </div>

                    <h3 className="max-w-[180px] text-xl font-semibold uppercase tracking-[0.16em] text-foreground">
                      {pillar.title}
                    </h3>

                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {pillar.desc}
                    </p>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
