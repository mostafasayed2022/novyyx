"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import dynamic from "next/dynamic";

const HeroCosmicCanvas = dynamic(
  () => import("./hero-cosmic-canvas").then((mod) => mod.HeroCosmicCanvas),
  { ssr: false },
);

const HeroProduct3DScene = dynamic(
  () => import("./hero-product-3d-scene").then((mod) => mod.HeroProduct3DScene),
  { ssr: false },
);
import { HeroSlideContent } from "./hero-slide-content";
import { HeroSliderPagination } from "./hero-slider-pagination";
import { HeroBrandPillars } from "./hero-brand-pillars";
import { HERO_SLIDES, type HeroSlide } from "./hero-slide-data";

/**
 * HeroSection
 * Flagship interactive showroom banner for NOVYX — Engineered for Longevity:
 * - Interactive 01—04 slider showcasing NOVYX CUTIS™, GHK-Cu, BPC-157, Retatrutide
 * - Dynamic 3D perspective parallax with ambient lighting and molecular structures
 * - Signature "NOVYX" typography in official Brand Blue (#1B4DFF)
 * - Seamless White/Dark mode adaptation with luxury ambient glows
 * - Clean modular component architecture
 */
export function HeroSection({
  initialSlides,
}: {
  initialSlides?: HeroSlide[];
}) {
  const slides = initialSlides?.length ? initialSlides : HERO_SLIDES;
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 769px) and (hover: hover) and (pointer: fine)",
    );

    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);
  // Auto-advance slides every 7 seconds, pauses when hovering over the hero
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const activeSlide = slides[currentSlideIndex] ?? slides[0];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[100svh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#F7F8FA] dark:bg-[#040711] text-foreground dark:text-white pt-28 pb-8 transition-colors duration-500"
    >
      {/* 1. Scientific Ambient Backdrop (Adaptive Cosmic/Laboratory Lighting) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Ambient Light Glows in Light Mode */}
        <div className="hidden md:block absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#1B4DFF]/10 rounded-full blur-[140px] pointer-events-none dark:hidden" />
        <div className="hidden md:block absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00D2FF]/10 rounded-full blur-[120px] pointer-events-none dark:hidden" />

        {/* Cosmic Deep Space Image for Dark Mode with delicate presence in Light Mode */}
        <Image
          src="/backgrounds/novyx_hero_cosmic_bg.webp"
          alt="NOVYX Cosmic Scientific Laboratory Environment"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-center md:object-bottom opacity-20 dark:opacity-80"
        />

        {/* Adaptive Gradient Overlays for Smooth Horizon Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F8FA]/90 via-[#F7F8FA]/40 to-[#F7F8FA] dark:from-[#040711]/80 dark:via-transparent dark:to-[#040711]/60 transition-colors duration-500" />
      </div>

      {/* 2. Interactive 60fps HTML5 Animated Cosmic & Molecular Canvas */}
      {isDesktop ? (
        <HeroCosmicCanvas className="absolute inset-0 z-[1] h-full w-full pointer-events-none opacity-40 dark:opacity-100" />
      ) : null}
      {/* 3. Main Hero Two-Column Grid */}
      <Container size="xl" className="relative z-10 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Column: Modular Slide Typography & Interactive CTAs */}
          <div className="lg:col-span-6 xl:col-span-7">
            <HeroSlideContent slide={activeSlide} />
          </div>

          {/* Right Column: Dynamic 3D Interactive Product Presentation */}
          <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center relative">
            {isDesktop ? (
              <HeroProduct3DScene slide={activeSlide} />
            ) : (
              <div className="relative mx-auto h-[370px] w-[min(88vw,320px)]">
                <Image
                  src={activeSlide.image}
                  alt={`NOVYX ${activeSlide.name}`}
                  fill
                  priority
                  sizes="88vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* 4. Interactive Vertical Pagination Controller (01 — 04) */}
      <HeroSliderPagination
        slides={slides}
        currentIndex={currentSlideIndex}
        onSelectSlide={setCurrentSlideIndex}
      />

      {/* 5. Modular Bottom 4 Brand Pillars Bar */}
      <HeroBrandPillars />
    </section>
  );
}
