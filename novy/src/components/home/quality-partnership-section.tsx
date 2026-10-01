"use client";

import * as React from "react";
import Image from "next/image";
import { useVisualActivity } from "@/hooks/use-visual-capabilities";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/locale-provider";
import { ShieldCheck, FileCheck, Award, ArrowUpRight } from "lucide-react";

export function QualityPartnershipSection() {
  const { tr } = useLocale();
  const sectionRef = React.useRef<HTMLElement>(null);
  const active = useVisualActivity(sectionRef);
  const trustPoints = [
    {
      icon: Award,
      title: tr("Ultra-Pure Synthesis", "Ultrareine Synthese"),
      desc: tr("≥ 99.2% benchmark validated through preparative multi-gradient HPLC.", "≥ 99,2 % Benchmark, validiert durch präparative Multi-Gradient-HPLC."),
    },
    {
      icon: ShieldCheck,
      title: tr("Third-Party Audited", "Durch Dritte geprüft"),
      desc: tr("Independent blind verification across accredited European laboratories.", "Unabhängige verblindete Verifizierung in akkreditierten europäischen Laboren."),
    },
    {
      icon: FileCheck,
      title: tr("Analytical Transparency", "Analytische Transparenz"),
      desc: tr("Batch-specific COAs, mass spectrometry telemetry, and HPLC traces.", "Chargenspezifische COAs, Massenspektrometrie-Daten und HPLC-Traces."),
    },
  ];

  return (
    <section ref={sectionRef} data-visual-active={active} className="relative w-full overflow-hidden bg-white dark:bg-[#070B14] py-16 sm:py-20 lg:py-28 transition-colors duration-500 border-b border-border/70 dark:border-white/10">
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-brand/5 dark:bg-brand/10 ambient-glow rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#1B4DFF]/5 dark:bg-[#00D2FF]/5 ambient-glow rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]" style={{ backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative w-full max-w-[480px] sm:max-w-[540px] aspect-[4/3] flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/5 to-brand/10 dark:via-brand/15 dark:to-brand/10 ambient-glow rounded-3xl blur-2xl transform scale-90 -z-10" />
              <motion.div animate={active ? { y: [-5, 5, -5] } : { y: 0 }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative w-full h-full flex items-center justify-center">
                <Image src="/products/novyx_cutis_box_vial.webp" alt="NOVYX Cutis Box and Vial — GHK-Cu Peptide Skin Booster" fill quality={75} loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" className="object-contain filter drop-shadow-[0_22px_32px_rgba(15,23,42,0.14)] dark:drop-shadow-[0_28px_44px_rgba(0,0,0,0.65)] select-none transition-transform duration-500 group-hover:scale-[1.02]" />
              </motion.div>
              <div className="absolute bottom-2 left-2 sm:left-4 bg-white/90 dark:bg-[#0E1322]/90 backdrop-blur-md border border-brand/10 dark:border-brand/20 px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-[#0F172A] dark:text-white uppercase">{tr("Batch Lot Verified • ISO 9001", "Charge verifiziert • ISO 9001")}</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 xl:col-span-6 space-y-7 text-left">
            <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] text-brand uppercase">─ {tr("QUALITY & PARTNERSHIP", "QUALITÄT & PARTNERSCHAFT")}</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold text-[#0A0F1D] dark:text-white uppercase leading-[1.12] tracking-tight">
              {tr("Trust The Product.", "Vertrauen Sie dem Produkt.")} <br className="hidden sm:inline" />
              {tr("Verify The Science.", "Verifizieren Sie die Wissenschaft.")}
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-lg text-[#475467] dark:text-[#94A3B8] font-normal leading-relaxed max-w-xl">
              {tr(
                "At NOVYX, quality isn't an afterthought. It's the foundation. We believe confidence in any peptide begins with knowing exactly what you're working with. That's why our approach centers on high-purity peptide products, independent third-party verification and transparent analytical documentation.",
                "Bei NOVYX ist Qualität kein nachträglicher Gedanke, sondern die Grundlage. Vertrauen in ein Peptid beginnt damit, exakt zu wissen, womit man arbeitet. Deshalb setzen wir auf hochreine Produkte, unabhängige Drittverifizierung und transparente analytische Dokumentation."
              )}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-black/5 dark:border-white/10">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-brand"><Icon className="w-4 h-4 shrink-0" /><h4 className="font-sans font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white">{point.title}</h4></div>
                    <p className="font-sans text-[11px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] leading-normal font-light">{point.desc}</p>
                  </div>
                );
              })}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap items-center gap-4 pt-3">
              <Link href="/about#verification" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A0F1D] dark:bg-white text-white dark:text-[#0A0F1D] font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-[#1B4DFF] dark:hover:bg-[#00D2FF] dark:hover:text-black shadow-sm group">
                <span>{tr("Explore Analytical Rigor", "Analytische Präzision entdecken")}</span><ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="/products/novax-cutis" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border/80 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.04] text-[#0F172A] dark:text-white font-sans text-xs sm:text-sm font-semibold tracking-wide hover:border-brand/35 hover:bg-brand/5 dark:hover:bg-brand/10 transition-all duration-200">
                <span>{tr("View Product Dossier", "Produktdossier ansehen")}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
