"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ROUTES } from "@/lib/constants/routes";
import { useLocale } from "@/i18n/locale-provider";
import {
  FileCheck2,
  ShieldCheck,
  FlaskConical,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

export function TestedVerifiedSection() {
  const { tr } = useLocale();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const verificationPillars = [
    {
      key: "tested",
      title: tr("Tested", "Geprüft"),
      subtitle: tr(
        "Every batch is checked before release",
        "Jede Charge wird vor der Freigabe geprüft"
      ),
      desc: tr(
        "We review purity, identity, and consistency so the material entering our catalog matches the expected standard.",
        "Wir prüfen Reinheit, Identität und Konsistenz, damit das Material in unserem Katalog dem erwarteten Standard entspricht."
      ),
      points: [
        tr("Purity and identity review", "Prüfung von Reinheit und Identität"),
        tr("Batch-by-batch quality checks", "Qualitätskontrollen für jede Charge"),
      ],
      icon: FlaskConical,
    },
    {
      key: "documented",
      title: tr("Documented", "Dokumentiert"),
      subtitle: tr(
        "Clear records for every lot",
        "Klare Unterlagen für jede Charge"
      ),
      desc: tr(
        "Each product is supported by simple, traceable documentation so researchers can review the batch with confidence.",
        "Jedes Produkt wird durch einfache, nachvollziehbare Dokumentation unterstützt, damit Forschende die Charge mit Vertrauen prüfen können."
      ),
      points: [
        tr("COA and batch documentation", "COA- und Chargendokumentation"),
        tr("Straightforward, transparent records", "Klare und transparente Unterlagen"),
      ],
      icon: FileCheck2,
    },
    {
      key: "verified",
      title: tr("Verified", "Verifiziert"),
      subtitle: tr(
        "Independent confirmation",
        "Unabhängige Bestätigung "
      ),
      desc: tr(
        "Independent review helps confirm that the final material aligns with the quality level expected for research use.",
        "Eine unabhängige Prüfung bestätigt, dass das Endmaterial dem für Forschungszwecke erwarteten Qualitätsniveau entspricht."
      ),
      points: [
        tr("Third-party review support", "Unterstützung durch Drittanbieter-Prüfung"),
        tr("Extra confidence before procurement", "Mehr Sicherheit vor der Beschaffung"),
      ],
      icon: ShieldCheck,
    },
  ];

  const activePillar = verificationPillars[activeIndex];
  const ActiveIcon = activePillar.icon;

  const goPrev = () =>
    setActiveIndex((current) =>
      current === 0 ? verificationPillars.length - 1 : current - 1
    );

  const goNext = () =>
    setActiveIndex((current) =>
      current === verificationPillars.length - 1 ? 0 : current + 1
    );

  return (
    <section className="relative overflow-hidden bg-background py-24">
      <Container size="xl" className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="brand">
                {tr("Analytical Integrity", "Analytische Integrität")}
              </Badge>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-[#00D2FF]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {tr("Clear Batch Confidence", "Klare Chargensicherheit")}
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="editorial-headline font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {tr("TESTED • DOCUMENTED", "GEPRÜFT • DOKUMENTIERT")}
                <span className="text-brand"> {tr("• VERIFIED", "• VERIFIZIERT")}</span>
              </h2>
              <p className="max-w-xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                {tr(
                  "A simpler way to understand how NOVYX supports product confidence: every lot is reviewed, recorded, and independently checked before it reaches researchers.",
                  "Ein einfacherer Überblick darüber, wie NOVYX Produktsicherheit unterstützt: Jede Charge wird geprüft, dokumentiert und unabhängig kontrolliert, bevor sie Forschende erreicht."
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {verificationPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={pillar.key}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-left transition-all duration-200 ${
                      isActive
                        ? "border-brand bg-brand/10 text-foreground shadow-[0_0_20px_rgba(27,77,255,0.12)]"
                        : "border-border bg-surface/70 text-muted-foreground hover:border-brand/40 hover:text-foreground"
                    }`}
                    aria-pressed={isActive}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-brand" : "text-muted-foreground"}`} />
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em]">
                      {pillar.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div>
              <Link href={ROUTES.contact} className="inline-flex">
                <Button variant="outline" className="gap-2 font-mono text-xs">
                  <Search className="h-4 w-4 text-brand" />
                  <span>{tr("Request Lot Audit", "Chargenprüfung anfragen")}</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <GlassCard
              glow="brand"
              spotlight
              tilt
              className="rounded-2xl border border-border p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-brand">
                      {activePillar.title}
                    </p>
                    <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                      {activePillar.subtitle}
                    </h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {activePillar.desc}
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={tr("Previous slide", "Vorherige Folie")}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={tr("Next slide", "Nächste Folie")}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {activePillar.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-xl border border-border/80 bg-surface/60 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/90">{point}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-border/80 pt-5 sm:hidden">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label={tr("Previous slide", "Vorherige Folie")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2">
                  {verificationPillars.map((pillar, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={pillar.key}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`${tr("Go to", "Gehe zu")} ${pillar.title}`}
                        className={`h-2.5 rounded-full transition-all ${
                          isActive ? "w-8 bg-brand" : "w-2.5 bg-border"
                        }`}
                      />
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label={tr("Next slide", "Nächste Folie")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </GlassCard>

            <div className="hidden items-center justify-center gap-2 sm:flex">
              {verificationPillars.map((pillar, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={pillar.key}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${tr("Go to", "Gehe zu")} ${pillar.title}`}
                    className={`h-2.5 rounded-full transition-all ${
                      isActive ? "w-10 bg-brand" : "w-2.5 bg-border hover:bg-brand/40"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
