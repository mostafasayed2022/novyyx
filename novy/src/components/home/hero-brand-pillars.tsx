"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { useLocale } from "@/i18n/locale-provider";
import {
  Atom,
  ShieldCheck,
  FlaskConical,
  Infinity as InfinityIcon,
} from "lucide-react";

export function HeroBrandPillars() {
  const { tr } = useLocale();

  const pillars = [
    {
      icon: Atom,
      title: tr("SCIENCE DRIVEN", "WISSENSCHAFTLICH GETRIEBEN"),
      description: tr(
        "Advanced peptide technology",
        "Fortschrittliche Peptidtechnologie",
      ),
    },
    {
      icon: ShieldCheck,
      title: tr("GERMAN QUALITY", "DEUTSCHE QUALITÄT"),
      description: tr(
        "Manufactured in Germany",
        "Hergestellt in Deutschland",
      ),
    },
    {
      icon: FlaskConical,
      title: tr("ADVANCED PEPTIDES", "FORTSCHRITTLICHE PEPTIDE"),
      description: tr(
        "Clinically researched formulations",
        "Klinisch erforschte Formulierungen",
      ),
    },
    {
      icon: InfinityIcon,
      title: tr("LONGEVITY FOCUSED", "AUF LANGLEBIGKEIT AUSGERICHTET"),
      description: tr(
        "Healthier skin. Longer tomorrow.",
        "Gesündere Haut. Eine längere Zukunft.",
      ),
    },
  ];

  return (
    <div className="relative z-20 mt-6 w-full border-t border-border/80 bg-white dark:border-white/10 dark:bg-[#040711]">
      <Container size="xl">
        <div className="grid grid-cols-2 gap-5 py-5 md:grid-cols-4 md:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.title}
                className="flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-brand/5 text-brand dark:border-white/15 dark:bg-white/5 dark:text-[#00D2FF]">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-foreground dark:text-white">
                    {pillar.title}
                  </h4>

                  <p className="font-sans text-[11px] font-light text-muted-foreground dark:text-[#A7ADB5]">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}