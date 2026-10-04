"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSlide } from "./hero-slide-data";
import { ROUTES } from "@/lib/constants/routes";
import { ArrowRight, Play } from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";

interface HeroSlideContentProps {
  slide: HeroSlide;
  active?: boolean;
}

export function HeroSlideContent({ slide, active = false }: HeroSlideContentProps) {
  const { locale, tr } = useLocale();
  return (
    <div className="space-y-7 text-left">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          initial={active ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Eyebrow Pill + Scientific Category */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs sm:text-sm tracking-[0.24em] uppercase text-brand dark:text-[#DCE6F5]/90 font-semibold dark:font-medium drop-shadow-sm dark:drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]">
              {locale === "de" ? slide.eyebrowDe || slide.eyebrow : slide.eyebrow}
            </span>
            <span className="opacity-30 text-xs font-mono">•</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-brand/10 text-brand dark:bg-brand/20 dark:text-[#00D2FF] border border-brand/25 font-bold uppercase">
              {locale === "de" ? slide.badgeDe || slide.badge : slide.badge}
            </span>
          </div>

          {/* Master Headline: NOVYX (Brand Blue) / Product Title / Dynamic Subtitle */}
          <div className="space-y-1">
            <h1 className="flex flex-col font-display uppercase leading-[0.98] tracking-tight">
              {/* NOVYX in Official Nexus Brand Blue */}
              <span className="text-5xl sm:text-7xl xl:text-8xl font-black text-[#1B4DFF] drop-shadow-[0_2px_20px_rgba(27,77,255,0.35)] dark:drop-shadow-[0_0_40px_rgba(27,77,255,0.7)] tracking-tight">
                {slide.brand}
              </span>
              <span className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white dark:text-[#E2ECF8] mt-1.5 tracking-tight transition-colors duration-300 drop-shadow-sm dark:drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                {slide.name}
              </span>
              <span className="text-2xl sm:text-4xl xl:text-5xl font-light text-white/90 dark:text-white/90 mt-1 tracking-wide transition-colors duration-300">
                {locale === "de" ? slide.headlineSubDe || slide.headlineSub : slide.headlineSub}
              </span>
            </h1>
          </div>

          {/* Narrative Statement */}
          <p className="text-base sm:text-lg text-white/80 dark:text-[#A7ADB5] font-normal dark:font-light max-w-xl leading-relaxed transition-colors duration-300">
            {locale === "de" ? slide.descriptionDe || slide.description : slide.description}
          </p>

          {/* Live Telemetry Metrics Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {slide.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/80 dark:bg-white/[0.04] border border-border/80 text-xs font-mono shadow-sm"
              >
                <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
                  {metric.label === "PURITY" ? tr("PURITY", "REINHEIT") : metric.label === "VECTOR" ? tr("VECTOR", "VEKTOR") : metric.label === "CHELATION" ? tr("CHELATION", "CHELATIERUNG") : metric.label === "STANDARD" ? tr("STANDARD", "STANDARD") : metric.label === "STRUCTURE" ? tr("STRUCTURE", "STRUKTUR") : metric.label}:
                </span>
                <span className="font-bold text-foreground dark:text-[#00D2FF]">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Pill Buttons (Static interactive controls) */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        {/* Primary Pill Button: Explore Our Products */}
        <Link href={slide.productLink || ROUTES.products}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand text-white hover:bg-brand-hover dark:bg-white dark:text-[#111625] font-semibold text-sm transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_20px_rgba(27,77,255,0.35)] dark:hover:shadow-[0_0_28px_rgba(255,255,255,0.55)] active:scale-[0.98] cursor-pointer"
          >
            <span>{tr("Explore Our Peptides", "Unsere Peptide entdecken")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        {/* Secondary Pill Button: Discover NOVYX */}
        <Link href={ROUTES.science}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-surface/90 hover:bg-surface-elevated border border-border text-foreground dark:bg-white/10 dark:hover:bg-white/15 dark:border-white/20 dark:text-white font-medium text-sm backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-brand/40 active:scale-[0.98] cursor-pointer shadow-sm"
          >
            <span>{tr("Analytical Rigor", "Analytische Präzision")}</span>
            <div className="w-5 h-5 rounded-full bg-brand/10 dark:bg-white/20 text-brand dark:text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
        </Link>
      </div>

      {/* Bottom-Left Micro Element: SCROLL TO EXPLORE */}
      <div className="pt-4 hidden sm:flex items-center gap-3">
        <div className="w-7 h-11 rounded-full border border-border dark:border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm">
          <motion.div
            animate={active ? { y: [0, 12, 0] } : { y: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2.5 rounded-full bg-brand dark:bg-[#00D2FF] shadow-[0_0_8px_rgba(27,77,255,0.6)] dark:shadow-[0_0_8px_#00D2FF]"
          />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground dark:text-white/60">
          {tr("SCROLL TO EXPLORE", "SCROLLEN ZUM ENTDECKEN")}
        </span>
      </div>
    </div>
  );
}
