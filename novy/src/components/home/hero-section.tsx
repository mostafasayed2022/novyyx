"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import { Container } from "@/components/layout/container";
import { HeroSlideContent } from "./hero-slide-content";
import { HeroSliderPagination } from "./hero-slider-pagination";
import { HeroBrandPillars } from "./hero-brand-pillars";
import { HERO_SLIDES, type HeroSlide } from "./hero-slide-data";
import { HeroLightVideoBackground } from "./hero-light-video-background";

const HeroCosmicCanvas = dynamic(
  () =>
    import("./hero-cosmic-canvas").then(
      (mod) => mod.HeroCosmicCanvas,
    ),
  {
    ssr: false,
  },
);

const HeroProduct3DScene = dynamic(
  () =>
    import("./hero-product-3d-scene").then(
      (mod) => mod.HeroProduct3DScene,
    ),
  {
    ssr: false,
  },
);

/**
 * HeroSection
 *
 * NOVYX flagship hero.
 *
 * Mobile / iPhone:
 * - Static background image
 * - Static product image
 * - No cosmic canvas
 * - No 3D product scene
 * - No automatic slide switching
 *
 * Desktop:
 * - Cosmic canvas
 * - Interactive 3D product scene
 * - Automatic slide switching
 */
export function HeroSection({
  initialSlides,
}: {
  initialSlides?: HeroSlide[];
}) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const slides =
    initialSlides?.length ? initialSlides : HERO_SLIDES;

  const [currentSlideIndex, setCurrentSlideIndex] =
    React.useState(0);

  const [isPaused, setIsPaused] =
    React.useState(false);

  const [isDesktop, setIsDesktop] =
    React.useState(false);

  /**
   * Heavy visual effects are desktop-only.
   *
   * The hover / fine-pointer checks are important because
   * large tablets and touch devices should still receive
   * the lightweight version.
   */
  React.useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 901px) and (hover: hover) and (pointer: fine)",
    );

    const update = () => {
      setIsDesktop(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  /**
   * Auto-advance only on desktop.
   *
   * On iPhone / touch devices the user changes slides
   * manually. This avoids unnecessary hero re-renders
   * every seven seconds.
   */
  React.useEffect(() => {
    if (
      !isDesktop ||
      isPaused ||
      slides.length <= 1
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentSlideIndex(
        (previous) =>
          (previous + 1) % slides.length,
      );
    }, 7000);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    isDesktop,
    isPaused,
    slides.length,
  ]);

  /**
   * Protect against an out-of-range slide index if the
   * dashboard changes the number of slides.
   */
  React.useEffect(() => {
    if (
      currentSlideIndex >= slides.length &&
      slides.length > 0
    ) {
      setCurrentSlideIndex(0);
    }
  }, [
    currentSlideIndex,
    slides.length,
  ]);

  const activeSlide =
    slides[currentSlideIndex] ?? slides[0];

  if (!activeSlide) {
    return null;
  }

  const mobileProductClass =
    activeSlide.isWideComposite
      ? "relative mx-auto h-[220px] w-[min(92vw,320px)] min-[390px]:h-[245px] min-[390px]:w-[350px] sm:h-[280px] sm:w-[380px]"
      : "relative mx-auto h-[285px] w-[min(82vw,250px)] min-[390px]:h-[320px] min-[390px]:w-[280px] sm:h-[360px] sm:w-[320px]";

  return (
    <section
      onMouseEnter={() => {
        if (isDesktop) {
          setIsPaused(true);
        }
      }}
      onMouseLeave={() => {
        if (isDesktop) {
          setIsPaused(false);
        }
      }}
      className="
        relative
        flex
        min-h-[100svh]
        w-full
        flex-col
        justify-between
        overflow-hidden
        bg-transparent
        pb-3
        pt-28
        text-foreground
        dark:bg-[#040711]
        dark:text-white
        sm:pb-5
        sm:pt-32
        lg:min-h-screen
        lg:pb-8
        lg:pt-28
        md:transition-colors
        md:duration-500
      "
    >
      {/* Background
          Light mode: Mux video on BOTH desktop and mobile.
          Dark mode: keep the current cosmic image exactly as before. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* This replaces the old light-mode image/background. */}
        <HeroLightVideoBackground />

        {/* Dark mode keeps the existing NOVYX cosmic background. */}
        <Image
          src="/backgrounds/novyx_hero_cosmic_bg.webp"
          alt=""
          fill
          priority
          quality={80}
          sizes="100vw"
          className="
            hidden
            object-cover
            object-center
            opacity-80
            dark:block
            md:object-bottom
          "
        />

        {/* Dark-mode blend only. The light video has its own tiny overlay. */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            hidden
            bg-gradient-to-b
            from-[#040711]/80
            via-[#040711]/20
            to-[#040711]/70
            dark:block
          "
        />
      </div>

      {/* Heavy animated canvas: desktop only */}
      {isDesktop && isDarkMode ? (
        <HeroCosmicCanvas
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]
            h-full
            w-full
            opacity-100
          "
        />
      ) : null}

      {/* Main hero content */}
      <Container
        size="xl"
        className="
          relative
          z-10
          my-0
          w-full
          pt-1
          sm:pt-2
          lg:my-auto
          lg:pt-0
        "
      >
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-4
            sm:gap-6
            md:gap-5
            lg:grid-cols-12
            lg:gap-4
          "
        >
          {/* Copy */}
          <div
            className="
              order-1
              lg:col-span-6
              xl:col-span-7
            "
          >
            <HeroSlideContent
              slide={activeSlide}
            />
          </div>

          {/* Product */}
          <div
            className="
              order-2
              relative
              mt-1
              flex
              items-center
              justify-center
              sm:mt-2
              lg:mt-0
              lg:col-span-6
              xl:col-span-5
            "
          >
            {isDesktop ? (
              <HeroProduct3DScene
                slide={activeSlide}
              />
            ) : (
              <div className="relative flex w-full items-center justify-center overflow-visible py-0 sm:py-1">
                {/* Product glow is dark-mode only; light mode shows the raw video background. */}
                {isDarkMode ? (
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-[300px]
                      w-[300px]
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-[radial-gradient(circle_at_center,rgba(27,77,255,0.15)_0%,rgba(0,210,255,0.06)_38%,transparent_72%)]
                    "
                  />
                ) : null}

                <div
                  className={mobileProductClass}
                >
                  <Image
                    src={activeSlide.image}
                    alt={`NŌVYX ${activeSlide.name}`}
                    fill
                    priority={
                      currentSlideIndex === 0
                    }
                    quality={75}
                    sizes={
                      activeSlide.isWideComposite
                        ? "(max-width: 900px) 94vw, 380px"
                        : "(max-width: 900px) 90vw, 340px"
                    }
                    className="
                      object-contain
                      object-center
                    "
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Manual pagination remains available on mobile */}
      <HeroSliderPagination
        slides={slides}
        currentIndex={currentSlideIndex}
        onSelectSlide={
          setCurrentSlideIndex
        }
      />

      <HeroBrandPillars />
    </section>
  );
}
