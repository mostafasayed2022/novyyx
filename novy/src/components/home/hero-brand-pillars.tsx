"use client";

import {
  Atom,
  ShieldCheck,
  FlaskConical,
  Infinity as InfinityIcon,
} from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";
import styles from "@/components/ui/hero-brand-pillars.module.css";

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
      title: tr(
        "LONGEVITY FOCUSED",
        "AUF LANGLEBIGKEIT AUSGERICHTET",
      ),
      description: tr(
        "Healthier skin. Longer tomorrow.",
        "Gesündere Haut. Eine längere Zukunft.",
      ),
    },
  ];

  return (
    <div
      className="
        relative
        z-20
        mt-6
        w-full
        overflow-hidden
        border-y
        border-border/80
        bg-white/75
        shadow-sm
        backdrop-blur-md
        dark:border-white/10
        dark:bg-[#040711]/60
      "
    >
      <div className={styles.marquee}>
        <div className={styles.track}>
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className={styles.group}
              aria-hidden={groupIndex === 1}
            >
              {pillars.map((pillar, pillarIndex) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={`${groupIndex}-${pillarIndex}`}
                    className={styles.item}
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-border/80
                        bg-brand/5
                        text-brand
                        shadow-sm
                        dark:border-white/15
                        dark:bg-white/5
                        dark:text-[#00D2FF]
                      "
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <h4
                        className="
                          whitespace-nowrap
                          font-display
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                          text-foreground
                          dark:text-white
                        "
                      >
                        {pillar.title}
                      </h4>

                      <p
                        className="
                          whitespace-nowrap
                          font-sans
                          text-[11px]
                          font-light
                          text-muted-foreground
                          dark:text-[#A7ADB5]
                        "
                      >
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
