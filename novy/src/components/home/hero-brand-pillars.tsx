"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { useLocale } from "@/i18n/locale-provider";
import { Atom, ShieldCheck, FlaskConical, Infinity as InfinityIcon } from "lucide-react";

export function HeroBrandPillars() {
  const { tr } = useLocale();
  const pillars = [
    { icon: Atom, title: tr("SCIENCE DRIVEN", "WISSENSCHAFTLICH GETRIEBEN"), description: tr("Advanced peptide technology", "Fortschrittliche Peptidtechnologie") },
    { icon: ShieldCheck, title: tr("GERMAN QUALITY", "DEUTSCHE QUALITÄT"), description: tr("Manufactured in Germany", "Hergestellt in Deutschland") },
    { icon: FlaskConical, title: tr("ADVANCED PEPTIDES", "FORTSCHRITTLICHE PEPTIDE"), description: tr("Clinically researched formulations", "Klinisch erforschte Formulierungen") },
    { icon: InfinityIcon, title: tr("LONGEVITY FOCUSED", "AUF LANGLEBIGKEIT AUSGERICHTET"), description: tr("Healthier skin. Longer tomorrow.", "Gesündere Haut. Eine längere Zukunft.") },
  ];

  return (
    <div className="relative z-20 w-full border-t border-border/80 bg-white/75 dark:border-white/10 dark:bg-[#040711]/60 backdrop-blur-md mt-6 transition-colors duration-500 shadow-sm">
      <Container size="xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-lg border border-border/80 bg-brand/5 dark:border-white/15 dark:bg-white/5 flex items-center justify-center shrink-0 text-brand dark:text-[#00D2FF] shadow-sm dark:shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/10 dark:group-hover:border-[#00D2FF]/50 dark:group-hover:bg-[#00D2FF]/10">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-foreground dark:text-white">{pillar.title}</h4>
                  <p className="font-sans text-[11px] text-muted-foreground dark:text-[#A7ADB5] font-light">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
