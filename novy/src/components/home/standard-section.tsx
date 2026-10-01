"use client";

import * as React from "react";
import Image from "next/image";
import { useVisualActivity } from "@/hooks/use-visual-capabilities";
import { Container } from "@/components/layout/container";
import {
  Droplets,
  ShieldCheck,
  FileText,
  Dna,
  Infinity as InfinityIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/locale-provider";

/**
 * StandardSection
 * Authentic implementation of the flagship NOVYX Standard showroom:
 * - Upper White Science Zone:
 *   • Confidence in Every Peptide manifesto
 *   • 3 Core Value Props with circular badges (No unnecessary complexity, No ambiguity, Only higher standard)
 *   • Translucent 3D Crystalline Glass DNA Double Helix Architecture
 *   • Vertical Science / Integrity / Longevity typographic manifesto
 * - Lower Cosmic Horizon Zone:
 *   • Planet Earth horizon with atmospheric blue limb from backgrounds/novyx_hero_cosmic_bg.jpg
 *   • 4 Core Pillars: Purity, Verification, Transparency, Consistency
 *   • Centered motto: "A HIGHER STANDARD FOR A LONGER TOMORROW"
 */
export function StandardSection() {
  const { tr } = useLocale();
  const sectionRef = React.useRef<HTMLElement>(null);
  const active = useVisualActivity(sectionRef);
  const threeValues = [
    {
      title: tr("No unnecessary complexity.", "Keine unnötige Komplexität."),
      description: tr("We focus on what matters — pure, high-quality peptides.", "Wir konzentrieren uns auf das Wesentliche — reine Peptide in hoher Qualität."),
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#0F172A] dark:text-white"
        >
          <line x1="8" y1="12" x2="16" y2="8" />
          <line x1="16" y1="8" x2="16" y2="16" />
          <line x1="8" y1="12" x2="12" y2="18" />
          <circle cx="8" cy="12" r="3" fill="currentColor" fillOpacity="0.12" />
          <circle
            cx="16"
            cy="8"
            r="2.5"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <circle
            cx="16"
            cy="16"
            r="2.5"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <circle
            cx="12"
            cy="18"
            r="2"
            fill="currentColor"
            fillOpacity="0.12"
          />
        </svg>
      ),
    },
    {
      title: tr("No ambiguity.", "Keine Unklarheit."),
      description:
        tr("Our products are verified and documented for your confidence.", "Unsere Produkte sind verifiziert und dokumentiert — für maximale Sicherheit."),
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#0F172A] dark:text-white"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: tr("Only a higher standard of peptide quality.", "Ein höherer Standard für Peptidqualität."),
      description: tr("Because your work deserves it.", "Weil Ihre Arbeit es verdient."),
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#0F172A] dark:text-white"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const fourPillars = [
    {
      title: tr("PURITY", "REINHEIT"),
      subtitle: tr("Exceptionally pure raw materials", "Außergewöhnlich reine Ausgangsstoffe"),
      icon: Droplets,
    },
    {
      title: tr("VERIFICATION", "VERIFIZIERUNG"),
      subtitle: tr("Independent testing and validation", "Unabhängige Prüfung und Validierung"),
      icon: ShieldCheck,
    },
    {
      title: tr("TRANSPARENCY", "TRANSPARENZ"),
      subtitle: tr("Full analytical documentation", "Vollständige analytische Dokumentation"),
      icon: FileText,
    },
    {
      title: tr("CONSISTENCY", "KONSISTENZ"),
      subtitle: tr("Reliable quality across every batch", "Verlässliche Qualität über jede Charge hinweg"),
      icon: InfinityIcon,
    },
  ];

  return (
    <section ref={sectionRef} data-visual-active={active} className="relative w-full overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. UPPER WHITE / BIOTECHNOLOGY SCIENCE BANNER                             */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-[#FFFFFF] dark:bg-[#070B14] text-foreground border-b border-border/70 dark:border-white/10 transition-colors duration-500 py-16 sm:py-20 lg:py-24">
        {/* Subtle flowing glass caustics overlay from backgrounds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen">
          <Image
            src="/backgrounds/novyx_bg_04_01.webp"
            alt="Laboratory Glass Caustics"
            fill
            sizes="100vw"
            loading="lazy"
            quality={60}
            className="object-cover object-center"
          />
        </div>

        {/* Ambient subtle light glows */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#1B4DFF]/5 ambient-glow rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#00D2FF]/5 ambient-glow rounded-full blur-[120px] pointer-events-none" />

        <Container size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            {/* Left Column: Heading & Narrative */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-6 text-left">
              {/* Eyebrow */}
              <div className="font-mono text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#1B4DFF] dark:text-[#00D2FF] uppercase">
                {tr("THE NOVYX STANDARD", "DER NOVYX STANDARD")}
              </div>

              {/* Master Headline */}
              <h2 className="font-display text-4xl sm:text-5xl xl:text-6xl font-black text-[#0A0F1D] dark:text-white uppercase leading-[1.04] tracking-tight">
                {tr("CONFIDENCE", "VERTRAUEN")} <br />
                {tr("IN EVERY PEPTIDE", "IN JEDEM PEPTID")}
              </h2>

              {/* Narrative Statement */}
              <p className="text-sm sm:text-base text-[#475467] dark:text-[#94A3B8] font-normal leading-relaxed max-w-xl">
                {tr("At NOVYX, we believe better tomorrows begin with higher standards today. Our peptides are developed with a relentless focus on quality, purity and verification — backed by transparent analytical documentation so you can move forward with confidence.", "Bei NOVYX glauben wir, dass eine bessere Zukunft mit höheren Standards heute beginnt. Unsere Peptide werden mit konsequentem Fokus auf Qualität, Reinheit und Verifizierung entwickelt — unterstützt durch transparente analytische Dokumentation.")}
              </p>

              {/* Tagline Subtext */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-[1.5px] bg-[#1B4DFF] dark:bg-[#00D2FF]" />
                <span className="font-mono text-xs tracking-[0.24em] text-[#64748B] dark:text-[#A0AEC0] uppercase font-semibold">
                  {tr("ENGINEERED FOR LONGEVITY", "ENTWICKELT FÜR LANGLEBIGKEIT")}
                </span>
              </div>
            </div>

            {/* Middle Column: 3 Value Proposition Bullets */}
            <div className="lg:col-span-4 xl:col-span-4 space-y-6">
              {threeValues.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 group text-left"
                >
                  {/* Circular Bordered Badge */}
                  <div className="w-12 h-12 rounded-full border border-[#D0D5DD] dark:border-white/20 bg-white/90 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-[#1B4DFF]/40 dark:group-hover:border-[#00D2FF]/40">
                    {item.icon}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-sm sm:text-base text-[#0F172A] dark:text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#475467] dark:text-[#94A3B8] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: 3D Glass DNA Double Helix + Vertical Manifesto */}
            <div className="lg:col-span-3 xl:col-span-3 flex items-center justify-center lg:justify-end gap-5">
              {/* DNA Helix Model with slight floating oscillation */}
              <motion.div
                animate={active ? { y: [-4, 4, -4] } : { y: 0 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-36 sm:w-44 md:w-48 aspect-[3/4] shrink-0"
              >
                <div
                  role="img"
                  aria-label="NOVYX crystalline DNA double helix"
                  className="absolute inset-0 flex items-center justify-center rounded-[2rem] bg-gradient-to-b from-white/80 via-[#DCE6F5]/45 to-transparent dark:from-white/5 dark:via-[#1B4DFF]/10 dark:to-transparent border border-[#DCE6F5]/70 dark:border-white/10 shadow-[0_18px_60px_rgba(27,77,255,0.12)]"
                >
                  <Dna className="h-[78%] w-[78%] stroke-[1.1] text-[#1B4DFF] dark:text-[#7DD3FC] drop-shadow-[0_4px_22px_rgba(27,77,255,0.28)]" />
                </div>
              </motion.div>

              {/* Vertical Typographic Manifesto with Thin Dividing Line */}
              <div className="flex items-center gap-3 pl-4 sm:pl-5 border-l border-[#D0D5DD] dark:border-white/20 py-6 shrink-0">
                <div className="flex flex-col gap-2.5 font-mono text-[11px] sm:text-xs tracking-[0.28em] text-[#64748B] dark:text-[#94A3B8] font-semibold uppercase leading-tight">
                  <span>{tr("SCIENCE", "WISSENSCHAFT")}</span>
                  <span>{tr("INTEGRITY", "INTEGRITÄT")}</span>
                  <span>{tr("LONGEVITY", "LANGLEBIGKEIT")}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ========================================================================= */}
      {/* 2. LOWER COSMIC EARTH HORIZON 4-PILLARS BANNER                            */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-[#040711] text-white py-16 sm:py-20 overflow-hidden">
        {/* Cosmic Earth Horizon Background from public/backgrounds */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/backgrounds/novyx_hero_cosmic_bg.webp"
            alt="Earth Limb Cosmic Atmosphere Horizon"
            fill
            sizes="100vw"
            quality={60}
            loading="lazy"
            className="object-cover object-bottom opacity-75 filter brightness-110 contrast-115 pointer-events-none select-none"
          />
          {/* Horizon Gradient Vignette to seamlessly blend with the deep space */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040711]/90 via-[#040711]/40 to-[#040711]/80 pointer-events-none" />
        </div>

        <Container size="xl" className="relative z-10">
          {/* 4 Pillars Grid with Elegant Vertical Dividing Lines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {fourPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex flex-col items-center text-center px-4 sm:px-6 py-4 group"
                >
                  {/* Pillar Icon */}
                  <div className="text-[#00D2FF] drop-shadow-[0_0_12px_rgba(0,210,255,0.6)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 stroke-[1.6]" />
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-base sm:text-lg font-bold tracking-[0.25em] text-white uppercase mt-4 mb-1.5 drop-shadow-sm">
                    {pillar.title}
                  </h4>

                  {/* Subtitle */}
                  <p className="font-sans text-xs sm:text-sm text-[#A0AEC0] dark:text-[#94A3B8] font-light max-w-[210px] leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Centered Bottom Motto flanked by horizontal gradient lines */}
          <div className="mt-12 sm:mt-16 flex items-center justify-center gap-4 text-center">
            <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-r from-transparent to-white/35" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/75 uppercase font-medium">
              {tr("A HIGHER STANDARD FOR A LONGER TOMORROW", "EIN HÖHERER STANDARD FÜR EINE LÄNGERE ZUKUNFT")}
            </span>
            <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-l from-transparent to-white/35" />
          </div>
        </Container>
      </div>
    </section>
  );
}
