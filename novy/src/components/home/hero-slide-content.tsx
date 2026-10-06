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
}

export function HeroSlideContent({ slide }: HeroSlideContentProps) {
  const { locale, tr } = useLocale();
  return (
    <div className="space-y-5 text-left sm:space-y-7">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Eyebrow Pill + Scientific Category */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] min-[390px]:text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#7DD3FC] font-semibold drop-shadow-sm">
              {locale === "de" ? slide.eyebrowDe : slide.eyebrow}
            </span>
            <span className="opacity-30 text-xs font-mono">•</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-black/30 text-[#7DD3FC] border border-white/15 font-bold uppercase">
              {locale === "de" ? slide.badgeDe : slide.badge}
            </span>
          </div>

          {/* Master Headline: NOVYX (Brand Blue) / Product Title / Dynamic Subtitle */}
          <div className="space-y-1">
            <h1 className="flex flex-col font-display uppercase leading-[0.98] tracking-tight">
              {/* NOVYX in Official Nexus Brand Blue */}
              <span className="text-[clamp(2.65rem,13vw,4.4rem)] sm:text-7xl xl:text-8xl font-black text-[#8AB4FF] drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] tracking-tight">
                {slide.brand}
              </span>
              <span className="text-[clamp(2rem,10vw,3.6rem)] sm:text-6xl xl:text-7xl font-extrabold text-white mt-1.5 tracking-tight transition-colors duration-300 drop-shadow-sm">
                {slide.name}
              </span>
              <span className="text-[clamp(1.15rem,5.8vw,2.15rem)] sm:text-4xl xl:text-5xl font-light text-white/90 mt-1 tracking-wide transition-colors duration-300">
                {locale === "de" ? slide.headlineSubDe : slide.headlineSub}
              </span>
            </h1>
          </div>

          {/* Narrative Statement */}
          <p className="max-w-xl text-sm font-normal leading-7 text-white/80 transition-colors duration-300 sm:text-lg sm:leading-relaxed">
            {locale === "de" ? slide.descriptionDe : slide.description}
          </p>

          {/* Live Telemetry Metrics Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5 sm:gap-3 sm:pt-1">
            {slide.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5 font-mono text-[11px] shadow-sm sm:gap-2 sm:px-3 sm:text-xs"
              >
                <span className="text-white/60 text-[10px] tracking-wider uppercase">
                  {metric.label === "PURITY" ? tr("PURITY", "REINHEIT") : metric.label === "VECTOR" ? tr("VECTOR", "VEKTOR") : metric.label === "CHELATION" ? tr("CHELATION", "CHELATIERUNG") : metric.label === "STANDARD" ? tr("STANDARD", "STANDARD") : metric.label === "STRUCTURE" ? tr("STRUCTURE", "STRUKTUR") : metric.label}:
                </span>
                <span className="font-bold text-[#7DD3FC]">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Pill Buttons (Static interactive controls) */}
      <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4 sm:pt-2">
        {/* Primary Pill Button: Explore Our Products */}
        <Link href={ROUTES.products} className="w-full sm:w-auto">
          <button
            type="button"
            className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-full px-5 py-3 sm:w-auto sm:px-7 sm:py-3.5 bg-brand text-white hover:bg-brand-hover dark:bg-white dark:text-[#111625] font-semibold text-sm transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_20px_rgba(27,77,255,0.35)] active:scale-[0.98] cursor-pointer"
          >
            <span>{tr("Explore Our Peptides", "Unsere Peptide entdecken")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Link>

        {/* Secondary Pill Button: Discover NOVYX */}
        <Link href={ROUTES.science} className="w-full sm:w-auto">
          <button
            type="button"
            className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white/10 px-5 py-3 sm:w-auto sm:px-6 sm:py-3.5 hover:bg-white/15 border border-white/20 text-white font-medium text-sm backdrop-blur-none sm:backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-brand/40 active:scale-[0.98] cursor-pointer shadow-sm"
          >
            <span>{tr("Analytical Rigor", "Analytische Präzision")}</span>
            <div className="w-5 h-5 rounded-full bg-white/15 text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
          </button>
        </Link>
      </div>

      {/* Bottom-Left Micro Element: SCROLL TO EXPLORE */}
      <div className="pt-4 hidden sm:flex items-center gap-3">
        <div className="w-7 h-11 rounded-full border border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2.5 rounded-full bg-[#7DD3FC] shadow-[0_0_8px_rgba(27,77,255,0.6)] dark:shadow-[0_0_8px_#00D2FF]"
          />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">
          {tr("SCROLL TO EXPLORE", "SCROLLEN ZUM ENTDECKEN")}
        </span>
      </div>
    </div>
  );
}
