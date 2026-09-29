import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

/**
 * NoiseOverlay
 * Generates an ultra-fine cinematic laboratory film grain via SVG feTurbulence filter.
 * 100% vector, zero external network requests, ultra-lightweight.
 */
export function NoiseOverlay({ opacity = 0.025, className }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none select-none z-[1] mix-blend-overlay",
        className
      )}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
