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
        className="relative z-30 flex items-center justify-center gap-2 px-4 pb-2 pt-2 select-none lg:hidden"
      >
        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-black/35 p-1 shadow-sm backdrop-blur-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-1.5 sm:backdrop-blur-md">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => onSelectSlide(index)}
                aria-label={tr(`Slide ${slide.number} - ${slide.name}`, `Folie ${slide.number} - ${slide.name}`)}
                className={cn(
                  "flex min-h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] transition-all duration-300 sm:px-3 sm:text-xs",
                  isActive
                    ? "bg-brand text-white font-bold shadow-[0_0_12px_rgba(27,77,255,0.5)]"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
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
