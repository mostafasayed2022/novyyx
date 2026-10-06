"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { Container } from "./container";
import { HeroHelixBackdrop } from "@/components/about/HeroHelixBackdrop";
import { SectionVisualKey } from "@/config/visuals";
import { cn } from "@/lib/utils/cn";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  visualSection?: SectionVisualKey;
  className?: string;
}

export function PageWrapper({
  children,
  title,
  subtitle,
  badge,
  visualSection: _visualSection,
  className,
}: PageWrapperProps) {
  const pathname = usePathname();

  // Support normal routes + optional EN / DE locale prefixes
  const cleanPath =
    pathname.replace(/^\/(en|de)(?=\/|$)/, "") || "/";

  const isHome = cleanPath === "/";

  const isAbout =
    cleanPath === "/about" ||
    cleanPath.startsWith("/about/");

  const showHelix = !isHome && !isAbout;

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden bg-background pb-20 pt-28 text-foreground",
        className,
      )}
    >
      {/* Xylophone Helix */}
      {showHelix && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-0
            h-[420px]
            sm:h-[600px]
            lg:h-[680px]
          "
        >
          <HeroHelixBackdrop
            intensity="normal"
            className="absolute inset-0"
          />

          {/* Fade into page */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-20
              sm:h-40
              bg-gradient-to-t
              from-background
              via-background/80
              to-transparent
            "
          />
        </div>
      )}

      {(title || subtitle || badge) && (
        <Container
          size="xl"
          className="relative z-10 mb-12"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-3xl space-y-4"
          >
            {badge && (
              <div
                className="
                  inline-block
                  rounded-full
                  border
                  border-brand/25
                  bg-background/55
                  px-3
                  py-1
                  text-[10px]
                  font-mono
                  uppercase
                  tracking-widest
                  text-brand
                  backdrop-blur-sm
                  dark:bg-black/20
                "
              >
                {badge}
              </div>
            )}

            {title && (
              <h1
                className="
                  editorial-headline
                  font-sans
                  text-3xl
                  font-bold
                  tracking-tight
                  text-foreground
                  sm:text-5xl
                "
              >
                {title}
              </h1>
            )}

            {subtitle && (
              <p
                className="
                  max-w-2xl
                  text-base
                  font-light
                  leading-relaxed
                  text-muted-foreground
                  sm:text-lg
                "
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        </Container>
      )}

      <motion.div
        className="relative z-10"
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}