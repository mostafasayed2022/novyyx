"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ROUTES } from "@/lib/constants/routes";
import { useLocale } from "@/i18n/locale-provider";
import {
  ShieldCheck,
  FileCheck2,
  ScanSearch,
  BadgeCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function OurQualitySection() {
  const { tr } = useLocale();

const qualitySteps = [
  {
    title: tr("Third-Party Verified", "Von Dritten verifiziert"),
    desc: tr(
      "Independent analytical testing provides objective verification of product purity and quality.",
      "Unabhängige analytische Tests ermöglichen eine objektive Überprüfung der Reinheit und Qualität unserer Produkte."
    ),
    icon: ShieldCheck,
  },
  {
    title: tr("Certificate of Analysis", "Analysezertifikat"),
    desc: tr(
      "Clear, accessible COAs give our professional partners visibility into the quality of the products they source.",
      "Klare und zugängliche Analysezertifikate geben unseren professionellen Partnern Einblick in die Qualität der von ihnen bezogenen Produkte."
    ),
    icon: FileCheck2,
  },
  {
    title: tr("Batch-Level Transparency", "Transparenz auf Chargenebene"),
    desc: tr(
      "Products are identifiable by batch, connecting the product in your hands with the analytical documentation behind it.",
      "Produkte sind anhand ihrer Charge identifizierbar und können direkt mit der zugehörigen analytischen Dokumentation verknüpft werden."
    ),
    icon: ScanSearch,
  },
  {
    title: tr("Consistency by Design", "Konsistenz durch Design"),
    desc: tr(
      "Our quality standards are built around one simple principle: every batch should earn the NOVYX name.",
      "Unsere Qualitätsstandards basieren auf einem einfachen Prinzip: Jede Charge sollte den Namen NOVYX verdienen."
    ),
    icon: BadgeCheck,
  },
];

  return (
    <section className="relative overflow-hidden bg-background-subtle/40 py-24">
      <Container size="xl" className="relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <Badge variant="brand">{tr("Our Quality", "Unsere Qualität")}</Badge>

              <div className="space-y-3">
                <h2 className="editorial-headline font-sans text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {tr("QUALITY, MADE", "QUALITÄT, DIE")}
                  <span className="text-brand"> {tr("SIMPLE.", "EINFACH BLEIBT.")}</span>
                </h2>

                <p className="max-w-xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                  {tr(
                    "Good quality should be easy to understand. NOVYX focuses on three essentials: a controlled environment, a precise process, and careful handling.",
                    "Gute Qualität sollte leicht verständlich sein. NOVYX konzentriert sich auf drei Grundlagen: kontrollierte Umgebung, präzise Prozesse und sorgfältige Handhabung."
                  )}
                </p>
              </div>
            </div>

            <Link href={ROUTES.about} className="shrink-0">
              <Button variant="outline" className="gap-2 font-mono text-xs">
                <span>{tr("Explore Our Quality", "Unsere Qualität entdecken")}</span>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {qualitySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <GlassCard
                  key={step.title}
                  glow="brand"
                  spotlight
                  className="group rounded-2xl border border-border p-6 sm:p-7"
                >
                  <div className="flex h-full min-h-[230px] flex-col">
                    <div className="mb-7 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>

                    {/* <div className="mt-auto pt-6">
                      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-brand">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{tr("NOVYX quality standard", "NOVYX Qualitätsstandard")}</span>
                      </div>
                    </div> */}
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
