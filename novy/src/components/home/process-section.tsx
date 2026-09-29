"use client";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/i18n/locale-provider";
import { Search, FlaskConical, ShieldCheck, FileCheck2 } from "lucide-react";

export function ProcessSection() {
  const { tr } = useLocale();

  const steps = [
    {
      num: "01",
      title: tr("IDENTIFY", "IDENTIFIZIEREN"),
      subtitle: tr(
        "Molecular Sequence Conformation",
        "Molekulare Sequenzkonformation"
      ),
      desc: tr(
        "Precursor amino acids and protecting groups are checked before synthesis, while automated monitoring follows the sequence assembly step by step.",
        "Vor der Synthese werden Aminosäuren und Schutzgruppen geprüft, während die Sequenzbildung Schritt für Schritt automatisiert überwacht wird."
      ),
      icon: Search,
      badge: tr("Stage 01: Pre-Synthesis", "Stufe 01: Vor der Synthese"),
    },
    {
      num: "02",
      title: tr("TEST", "PRÜFEN"),
      subtitle: tr(
        "Multi-Angle Spectroscopic Analysis",
        "Mehrdimensionale spektroskopische Analyse"
      ),
      desc: tr(
        "The synthesized peptide is evaluated with analytical HPLC and high-resolution mass spectrometry against reference standards.",
        "Das synthetisierte Peptid wird mittels analytischer HPLC und hochauflösender Massenspektrometrie mit Referenzstandards verglichen."
      ),
      icon: FlaskConical,
      badge: tr("Stage 02: Analytical Core", "Stufe 02: Analytikkern"),
    },
    {
      num: "03",
      title: tr("VERIFY", "VERIFIZIEREN"),
      subtitle: tr(
        "Blind Independent Laboratory Audit",
        "Verblindete unabhängige Laborprüfung"
      ),
      desc: tr(
        "Selected production samples are sent under coded identifiers for independent third-party laboratory validation.",
        "Ausgewählte Produktionsproben werden unter codierten Kennungen zur unabhängigen Drittanbieterprüfung versendet."
      ),
      icon: ShieldCheck,
      badge: tr("Stage 03: Third-Party", "Stufe 03: Drittanbieter"),
    },
    {
      num: "04",
      title: tr("DOCUMENT", "DOKUMENTIEREN"),
      subtitle: tr(
        "Public Cryptographic COA Issuance",
        "Kryptografisch nachvollziehbare COA-Freigabe"
      ),
      desc: tr(
        "After release checks are complete, the batch Certificate of Analysis is signed, archived, and linked to the product record.",
        "Nach Abschluss der Freigabeprüfungen wird das chargenspezifische Analysezertifikat signiert, archiviert und mit dem Produktdatensatz verknüpft."
      ),
      icon: FileCheck2,
      badge: tr("Stage 04: Release", "Stufe 04: Freigabe"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-8 h-72 w-72 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] h-80 w-80 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="brand">{tr("The NOVYX Process", "Der NOVYX-Prozess")}</Badge>

          <h2 className="editorial-headline mt-5 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {tr("THE 4-STAGE", "DIE 4-STUFIGE")} <br />
            <span className="text-brand">
              {tr("CLINICAL PIPELINE", "KLINISCHE PIPELINE")}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
            {tr(
              "A clear four-stage workflow that follows each peptide from sequence preparation through testing, independent review, and final documentation.",
              "Ein klarer vierstufiger Ablauf, der jedes Peptid von der Sequenzvorbereitung über Prüfung und unabhängige Kontrolle bis zur finalen Dokumentation begleitet."
            )}
          </p>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <div className="absolute left-[8%] right-[8%] top-0 hidden h-px bg-gradient-to-r from-transparent via-brand/45 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.num}
                  className="group relative flex min-h-[320px] flex-col rounded-[26px] border border-border/80 bg-surface/75 px-6 pb-7 pt-12 text-center shadow-[0_16px_48px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_20px_60px_rgba(27,77,255,0.10)] dark:bg-surface/60 dark:shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
                >
                  <div className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/30 bg-background font-mono text-sm font-bold text-brand shadow-[0_0_0_7px_rgba(27,77,255,0.06)]">
                    {step.num}
                  </div>

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/15 bg-brand/5 text-brand transition-all duration-300 group-hover:bg-brand/10">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  <span className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-brand">
                    {step.badge}
                  </span>

                  <h3 className="mt-3 font-mono text-lg font-bold tracking-[0.12em] text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium leading-relaxed text-foreground/75">
                    {step.subtitle}
                  </p>

                  <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>

                  <div className="mx-auto mt-auto pt-6">
                    <div className="h-0.5 w-10 rounded-full bg-brand/70 transition-all duration-300 group-hover:w-16" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
