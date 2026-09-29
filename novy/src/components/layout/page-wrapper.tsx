"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "./container";
import { GlowEffect } from "@/components/ui/glow-effect";
import { AnimatedScientificBackground } from "@/components/visuals/animated-scientific-background";
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
  visualSection,
  className,
}: PageWrapperProps) {
  return (
    <div className={cn("min-h-screen pt-28 pb-20 relative overflow-hidden bg-background text-foreground", className)}>
      {/* Animated Scientific Background Layer if visualSection is provided */}
      {visualSection ? (
        <AnimatedScientificBackground
          section={visualSection}
          showMolecules={false}
          showParticles={true}
          showGrid={true}
          showLightSweep={true}
          showNoise={true}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 pointer-events-none -z-10"
            style={{ background: "var(--hero-overlay)" }}
          />
          <GlowEffect color="brand" position="top-center" />
        </>
      )}

      {(title || subtitle || badge) && (
        <Container size="xl" className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-4"
          >
            {badge && (
              <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-brand/10 text-brand border border-brand/25">
                {badge}
              </div>
            )}
            {title && (
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground font-sans editorial-headline">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                {subtitle}
              </p>
            )}
          </motion.div>
        </Container>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
