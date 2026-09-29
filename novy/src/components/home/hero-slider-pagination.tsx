"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HeroSlide } from "./hero-slide-data";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "@/i18n/locale-provider";

interface HeroSliderPaginationProps {
  slides: HeroSlide[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  className?: string;
}

export function HeroSliderPagination({
  slides,
  currentIndex,
  onSelectSlide,
  className,
}: HeroSliderPaginationProps) {
  const { tr } = useLocale();

  return (
    <>
      {/* 1. Desktop & Laptop Vertical Pagination Controller (01 — 04) */}
      <nav
        aria-label={tr("Hero Product Slider Navigation", "Navigation des Produkt-Sliders")}
        className={cn(
          "hidden lg:flex flex-col items-center gap-4 absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-30 font-mono select-none",
          className
        )}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelectSlide(index)}
              aria-label={tr(`Go to slide ${slide.number}: ${slide.name}`, `Zu Folie ${slide.number}: ${slide.name}`)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
            >
              {/* Hover Tooltip showing Product Name */}
              <div className="absolute right-full mr-3.5 px-3 py-1 rounded-lg bg-surface/90 dark:bg-[#07090e]/90 backdrop-blur-xl border border-border/80 text-[10px] font-mono tracking-widest uppercase text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-lg -translate-x-1 group-hover:translate-x-0">
                <span className="text-brand font-bold mr-1.5">{slide.number}</span>
                <span>{slide.name}</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                {/* Number Label */}
                <span
                  className={cn(
                    "text-xs font-bold transition-all duration-300",
                    isActive
                      ? "text-brand dark:text-white scale-110 drop-shadow-[0_0_10px_rgba(27,77,255,0.6)]"
                      : "text-muted-foreground/50 dark:text-white/35 hover:text-foreground dark:hover:text-white"
                  )}
                >
                  {slide.number}
                </span>

                {/* Active Indicator Bar / Pip */}
                <div className="relative w-1.5 h-6 rounded-full overflow-hidden bg-border/80 dark:bg-white/15">
                  {isActive && (
                    <motion.div
                      layoutId="hero-slider-active-pip"
                      className="absolute inset-0 w-full bg-gradient-to-b from-brand to-[#00D2FF] shadow-[0_0_12px_rgba(27,77,255,0.8)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                    />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* 2. Mobile & Tablet Horizontal Slider Navigation */}
      <nav
        aria-label={tr("Mobile Hero Slider Navigation", "Mobile Slider-Navigation")}
        className="lg:hidden flex items-center justify-center gap-2 relative z-30 pt-3 pb-1 select-none"
      >
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface/90 dark:bg-white/5 border border-border/70 dark:border-white/10 backdrop-blur-md shadow-sm">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => onSelectSlide(index)}
                aria-label={tr(`Slide ${slide.number} - ${slide.name}`, `Folie ${slide.number} - ${slide.name}`)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5",
                  isActive
                    ? "bg-brand text-white font-bold shadow-[0_0_12px_rgba(27,77,255,0.5)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                )}
              >
                <span>{slide.number}</span>
                {isActive && <span className="text-[10px] hidden sm:inline">{slide.name}</span>}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
