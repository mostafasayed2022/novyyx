"use client";

import * as React from "react";
import Image from "next/image";
import { useVisualActivity } from "@/hooks/use-visual-capabilities";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { HeroSlide, HERO_SLIDES } from "./hero-slide-data";

/**
 * HeroProduct3DScene
 * Faithful implementation of the official NOVYX cinematic hero product presentation:
 * - Transparent background-removed isolated product image with dynamic multi-slide support
 * - Grounded solidly on the authentic dark obsidian mineral pedestal
 * - Spring-damped 3D perspective parallax tilt reacting in real-time to pointer movement
 * - Idle floating levitation oscillation
 * - Dynamic 3D looping light ribbons curving in front and behind the product
 * - Crystalline floating molecular structures with glowing cyan/blue nuclei
 */
export function HeroProduct3DScene({
  className,
  slide = HERO_SLIDES[0],
}: {
  className?: string;
  slide?: HeroSlide;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const active = useVisualActivity(containerRef);

  // Mouse coordinate motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 140 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const lightShiftX = useTransform(smoothX, [-0.5, 0.5], [-70, 70]);
  const lightShiftY = useTransform(smoothY, [-0.5, 0.5], [-50, 50]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!active || e.pointerType !== "mouse" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      data-visual-active={active}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`hero-product-scene relative w-full max-w-[640px] aspect-[4/4.3] flex items-center justify-center select-none perspective-[1300px] ${className || ""}`}
    >
      {/* 1. Deep Core Nexus Blue Radial Glow behind product */}
      <motion.div
        style={{
          x: lightShiftX,
          y: lightShiftY,
        }}
        className="absolute inset-x-4 top-10 bottom-24 ambient-glow rounded-full bg-radial from-[#1B4DFF]/45 via-[#00D2FF]/25 to-transparent blur-[90px] pointer-events-none -z-10"
      />

      {/* 2. Background Swirling 3D Energy Ribbon Vortex */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Outer subtle orbital ring */}
        <div className="w-[460px] sm:w-[560px] h-[240px] sm:h-[280px] rounded-full border border-[#00D2FF]/30 animate-[spin_28s_linear_infinite] [transform:rotate(-26deg)_rotateX(68deg)] shadow-[0_0_24px_rgba(0,210,255,0.3)]" />
        {/* Inner fast photon ring */}
        <div className="absolute w-[400px] sm:w-[500px] h-[200px] sm:h-[240px] rounded-full border border-dashed border-[#1B4DFF]/45 animate-[spin_20s_linear_infinite_reverse] [transform:rotate(-22deg)_rotateX(72deg)]" />
      </div>

      {/* 3. Tilting 3D Container with Parallax Layers */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: active ? "preserve-3d" : "flat",
        }}
        className="relative w-full h-full flex flex-col items-center justify-end pb-4"
      >
        {/* Floating Idle Sine Oscillation Wrapper */}
        <motion.div
          animate={active ? { y: [-6, 6, -6] } : { y: 0 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full flex flex-col items-center [transform-style:preserve-3d]"
        >
          {/* Background Molecular Cluster floating behind vial */}
          <div className="absolute left-2 sm:left-6 top-10 z-10 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-80">
              {/* Bonds */}
              <line x1="60" y1="60" x2="25" y2="35" stroke="rgba(0,210,255,0.5)" strokeWidth="2.5" />
              <line x1="60" y1="60" x2="95" y2="40" stroke="rgba(27,77,255,0.5)" strokeWidth="2.5" />
              <line x1="60" y1="60" x2="65" y2="100" stroke="rgba(0,210,255,0.5)" strokeWidth="2.5" />
              {/* Center Node */}
              <circle cx="60" cy="60" r="14" fill="url(#molGrad1)" />
              <circle cx="60" cy="60" r="6" fill="#00D2FF" filter="drop-shadow(0 0 6px #00D2FF)" />
              <circle cx="58" cy="58" r="2.5" fill="#FFFFFF" />
              {/* Connected Nodes */}
              <circle cx="25" cy="35" r="10" fill="url(#molGrad2)" />
              <circle cx="25" cy="35" r="4" fill="#1B4DFF" />
              <circle cx="95" cy="40" r="11" fill="url(#molGrad1)" />
              <circle cx="95" cy="40" r="5" fill="#00D2FF" />
              <circle cx="65" cy="100" r="9" fill="url(#molGrad2)" />
              <circle cx="65" cy="100" r="3.5" fill="#00D2FF" />

              <defs>
                <radialGradient id="molGrad1" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#80E5FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0077FF" stopOpacity="0.7" />
                </radialGradient>
                <radialGradient id="molGrad2" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#1B4DFF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0033AA" stopOpacity="0.8" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* A. Product Image Presentation with Dynamic Slide Switching */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={active ? { opacity: 0, scale: 0.94, y: 12 } : false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative z-20 flex items-center justify-center transition-transform duration-300 group"
            >
              <div
                className={
                  slide.isWideComposite
                    ? "relative w-[min(340px,85vw)] sm:w-[440px] md:w-[500px] aspect-[1024/677]"
                    : "relative w-[240px] sm:w-[300px] md:w-[340px] aspect-[1200/1600] -mb-6"
                }
              >
                {/* Crisp Foreground Transparent Product */}
                <Image
                  src={slide.image}
                  alt={`NOVYX ${slide.name}`}
                  fill
                  preload={slide.id === HERO_SLIDES[0].id}
                  sizes={slide.isWideComposite ? "(max-width: 640px) 85vw, (max-width: 768px) 440px, 500px" : "(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"}
                  quality={75}
                  className="object-contain relative z-20 transition-transform duration-300 group-hover:scale-[1.02]"
                />

                {/* Specular Light Sweep on Product Hover */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute -inset-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20 animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Foreground Swirling Light Ribbon Swooping in Front of the Product */}
          <div className="absolute -right-6 sm:-right-10 top-1/3 w-48 sm:w-64 h-32 sm:h-44 pointer-events-none z-30 [transform:rotate(15deg)]">
            <svg viewBox="0 0 260 180" fill="none" className="w-full h-full filter drop-shadow-[0_0_16px_rgba(0,210,255,0.85)]">
              <path
                d="M 10 160 C 80 120, 160 40, 240 15 C 260 8, 250 50, 210 95 C 160 150, 70 175, 10 160 Z"
                fill="url(#ribbonGradFront)"
                opacity="0.75"
              />
              <path
                d="M 10 160 C 80 120, 160 40, 240 15"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="ribbonGradFront" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1B4DFF" stopOpacity="0.1" />
                  <stop offset="40%" stopColor="#00D2FF" stopOpacity="0.8" />
                  <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* B. Dark Obsidian Mineral Pedestal Plinth Base */}
          <div className="relative w-[360px] sm:w-[460px] md:w-[520px] h-[170px] -mt-32 sm:-mt-40 md:-mt-48 z-10 pointer-events-none">
            {/* Deep Contact Shadow directly beneath the vial and box base */}
            <div className="absolute top-12 inset-x-8 h-14 rounded-full bg-black/95 blur-md" />

            {/* Mineral Rock Image with smooth bottom fade-out into the horizon */}
            <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]">
              <Image
                src="/products/novyx_rock_pedestal.webp"
                alt="Obsidian Laboratory Display Pedestal"
                fill
                quality={60}
                sizes="(max-width: 640px) 360px, (max-width: 768px) 460px, 520px"
                className="object-cover object-top filter brightness-105 contrast-125 drop-shadow-[0_12px_32px_rgba(0,0,0,0.95)]"
              />
            </div>

            {/* Top Rim Light Reflection Line on the rock edge */}
            <div className="absolute top-10 inset-x-10 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent blur-[0.5px] opacity-85" />
          </div>
        </motion.div>

        {/* 4. Lower Right Secondary Molecule Cluster */}
        <motion.div
          animate={active ? { y: [4, -8, 4], rotate: [0, 6, 0] } : { y: 0, rotate: 0 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 sm:right-4 bottom-12 w-28 sm:w-36 pointer-events-none z-30"
        >
          <svg width="100" height="80" viewBox="0 0 100 80" fill="none" className="opacity-90 filter drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]">
            <line x1="25" y1="50" x2="65" y2="25" stroke="rgba(0,210,255,0.6)" strokeWidth="2.5" />
            <line x1="65" y1="25" x2="85" y2="45" stroke="rgba(27,77,255,0.6)" strokeWidth="2" />
            {/* Left Sphere */}
            <circle cx="25" cy="50" r="11" fill="url(#molGrad1)" />
            <circle cx="25" cy="50" r="4.5" fill="#00D2FF" />
            {/* Top Sphere */}
            <circle cx="65" cy="25" r="13" fill="url(#molGrad1)" />
            <circle cx="65" cy="25" r="5" fill="#FFFFFF" />
            {/* Right Sphere */}
            <circle cx="85" cy="45" r="8" fill="url(#molGrad2)" />
            <circle cx="85" cy="45" r="3" fill="#00D2FF" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
