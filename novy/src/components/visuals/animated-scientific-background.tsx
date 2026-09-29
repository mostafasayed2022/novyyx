"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { novaxVisuals, SectionVisualKey, VisualAsset } from "@/config/visuals";
import { NoiseOverlay } from "./noise-overlay";
import { ScientificGrid } from "./scientific-grid";
import { LightSweep } from "./light-sweep";
import { GradientMesh } from "./gradient-mesh";
import { ParticleField } from "./particle-field";
import { MolecularField } from "./molecular-field";
import { cn } from "@/lib/utils/cn";

export interface AnimatedScientificBackgroundProps {
  section?: SectionVisualKey;
  customAsset?: VisualAsset;
  showMolecules?: boolean;
  showParticles?: boolean;
  showGrid?: boolean;
  showLightSweep?: boolean;
  showNoise?: boolean;
  overlayVignette?: boolean;
  blurStrength?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export function AnimatedScientificBackground({
  section = "hero",
  customAsset,
  showMolecules = false,
  showParticles = true,
  showGrid = true,
  showLightSweep = true,
  showNoise = true,
  overlayVignette = true,
  blurStrength,
  className,
}: AnimatedScientificBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  // Select asset according to section and active theme
  const activeSectionVisual = novaxVisuals[section];
  const activeAsset: VisualAsset =
    customAsset ||
    (isDark ? activeSectionVisual.dark : activeSectionVisual.light);

  const blurClasses = {
    none: "blur-none",
    sm: "blur-[2px]",
    md: "blur-[6px]",
    lg: "blur-[12px]",
  };

  const chosenBlur = blurStrength || activeAsset.blur;
  const opacity = isDark
    ? activeAsset.recommendedOverlayOpacity.dark
    : activeAsset.recommendedOverlayOpacity.light;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none select-none overflow-hidden -z-20 bg-background transition-colors duration-300",
        className
      )}
    >
      {/* Layer 1: Ambient Multi-Point Gradient Mesh */}
      <GradientMesh intensity={isDark ? "subtle" : "medium"} />

      {/* Layer 2: Theme-Aware Scientific Image Layer with Contrast Masking */}
      {!imageError && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700 overflow-hidden",
            blurClasses[chosenBlur]
          )}
          style={{ opacity }}
        >
          <Image
            src={activeAsset.path}
            alt={activeAsset.description}
            fill
            sizes="100vw"
            priority={section === "hero"}
            quality={60}
            onError={() => setImageError(true)}
            className="object-cover object-center transform scale-105 motion-safe:hover:scale-100 transition-transform duration-1000"
          />
        </div>
      )}

      {/* Layer 3: High-Contrast Directional & Radial Vignette Masks */}
      {overlayVignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? `
                radial-gradient(ellipse 75% 65% at 50% 45%, transparent 20%, var(--background) 95%),
                linear-gradient(to bottom, var(--background) 0%, transparent 25%, transparent 75%, var(--background) 100%)
              `
              : `
                radial-gradient(ellipse 75% 65% at 50% 45%, transparent 30%, var(--background) 95%),
                linear-gradient(to bottom, var(--background) 0%, transparent 25%, transparent 75%, var(--background) 100%)
              `,
          }}
        />
      )}

      {/* Layer 4: Laboratory Optical Grid with Micro-Coordinates */}
      {showGrid && <ScientificGrid density={section === "hero" ? "normal" : "sparse"} />}

      {/* Layer 5: Molecular Lattice Interactive Depth */}
      {showMolecules && (
        <div className="absolute inset-0 pointer-events-none">
          <MolecularField nodeCount={section === "hero" ? 28 : 16} />
        </div>
      )}

      {/* Layer 6: Ambient Drifting Bio-Particles */}
      {showParticles && !showMolecules && (
        <ParticleField particleCount={section === "hero" ? 30 : 16} />
      )}

      {/* Layer 7: Cinematic Volumetric Specular Light Sweep */}
      {showLightSweep && <LightSweep durationSeconds={isDark ? 14 : 18} />}

      {/* Layer 8: Tactile Fine Laboratory Film Grain */}
      {showNoise && <NoiseOverlay opacity={isDark ? 0.03 : 0.02} />}
    </div>
  );
}
