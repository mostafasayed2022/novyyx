"use client";

import * as React from "react";
import Image from "next/image";
import { useVisualActivity } from "@/hooks/use-visual-capabilities";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, Dna, Activity, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/i18n/locale-provider";

/**
 * InteractiveHeroProduct
 * Cinematic interactive 3D laboratory vial & molecular orbital product scene.
 * Features the real NOVYX CUTIS™ dual pharmaceutical vial presentation,
 * cursor-reactive 3D perspective parallax, and high-precision scientific telemetry.
 */
export function InteractiveHeroProduct() {
  const { tr } = useLocale();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const imageSrc = "/products/novyx_cutis_box_vial.webp";

  // Mouse coordinate motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const active = useVisualActivity(containerRef);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

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
      className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none perspective-[1400px]"
    >
      {/* Background Volumetric Optical Glow */}
      <div className="absolute inset-0 ambient-glow rounded-full bg-radial from-brand/25 via-brand/8 to-transparent blur-[90px] pointer-events-none" />

      {/* Orbital Scientific Rings */}
      <div className="absolute inset-2 rounded-full border border-brand/20 animate-[spin_36s_linear_infinite] pointer-events-none" />
      <div className="absolute inset-14 rounded-full border border-dashed border-brand/25 animate-[spin_26s_linear_infinite_reverse] pointer-events-none" />
      <div className="absolute inset-24 rounded-full border border-border/60 pointer-events-none" />

      {/* Tilting 3D Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: active ? "preserve-3d" : "flat",
        }}
        className="relative z-10 w-80 sm:w-96 flex flex-col items-center justify-center"
      >
        {/* Synthetic Peptide Vial Container Card */}
        <div className="relative w-full rounded-3xl border border-brand/35 bg-surface/90 dark:bg-[#06090e]/90 backdrop-blur-2xl shadow-2xl p-6 flex flex-col justify-between overflow-hidden group">
          {/* Top Vial Telemetry Bar */}
          <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand animate-ping" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-foreground font-semibold">
                NOVYX LABS // GENEVA
              </span>
            </div>
            <Badge variant="brand" className="text-[9px] py-0 font-mono">
              LOT #NVX-CUT-0042
            </Badge>
          </div>

          {/* Real NOVYX CUTIS Dual Vials Photographic Presentation */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-brand/10 via-surface/40 to-brand/15 border border-border/80 flex items-center justify-center p-3 group/img">
            {/* Ambient Volumetric Backlight */}
            <div className="absolute inset-0 bg-radial from-brand/30 via-transparent to-transparent blur-xl pointer-events-none" />

            {/* Real High-Resolution NOVYX CUTIS Dual Vials Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={imageSrc}
                alt="NOVYX CUTIS™ Dual Borosilicate Glass Vials"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-contain transform transition-transform duration-700 group-hover/img:scale-105"
              />
            </div>

            {/* Specular Light Sweep Shimmer */}
            <div className="absolute -inset-x-full inset-y-0 bg-gradient-to-r from-transparent via-white/15 dark:via-cyan-400/15 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
          </div>

          {/* Sub-label under real product */}
          <div className="mt-4 text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tr("FLAGSHIP CLINICAL DUAL-VIAL MATRIX", "KLINISCHE DUAL-VIAL-FLAGGSCHIFFMATRIX")}</span>
            </div>
            <h3 className="text-xl font-bold text-foreground font-mono tracking-tight">
              NOVYX Labs™
            </h3>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
              GHK-Cu • PN • PDRN • Acetyl Octapeptide-3
            </p>
          </div>

          {/* Bottom Telemetry Verification Row */}
          <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-1 text-brand font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>&gt;99.82% {tr("PURITY", "REINHEIT")}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>5 mL × 5 {tr("VIALS", "VIALS")}</span>
            </div>
          </div>
        </div>

        {/* Floating Telemetry Satellite Cards (Parallax Depth) */}
        <motion.div
          style={{ transform: "translateZ(35px)" }}
          className="absolute -top-4 -left-8 sm:-left-12 p-3 surface-card bg-surface/90 backdrop-blur-md shadow-xl rounded-xl border border-border/80 flex items-center gap-2.5 pointer-events-none"
        >
          <div className="w-7 h-7 rounded-lg bg-brand/15 text-brand flex items-center justify-center">
            <Dna className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[9px] font-mono text-muted-foreground uppercase">
              {tr("Stoichiometry", "Stöchiometrie")}
            </div>
            <div className="text-xs font-mono font-bold text-foreground">
              1:1 Cu(II) Chelate
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(45px)" }}
          className="absolute -bottom-4 -right-6 sm:-right-10 p-3 surface-card bg-surface/90 backdrop-blur-md shadow-xl rounded-xl border border-border/80 flex items-center gap-2.5 pointer-events-none"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[9px] font-mono text-muted-foreground uppercase">
              {tr("Mass Accuracy", "Massengenauigkeit")}
            </div>
            <div className="text-xs font-mono font-bold text-emerald-500">
              1.8 PPM (ESI+)
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
