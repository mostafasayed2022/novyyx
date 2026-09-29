import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface ScientificGridProps {
  showCoordinates?: boolean;
  className?: string;
  density?: "sparse" | "normal" | "dense";
}

/**
 * ScientificGrid
 * High-precision laboratory optical grid with sub-pixel lines and micro-coordinates.
 */
export function ScientificGrid({
  showCoordinates = true,
  className,
  density = "normal",
}: ScientificGridProps) {
  const densities = {
    sparse: "64px 64px",
    normal: "48px 48px",
    dense: "32px 32px",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none select-none overflow-hidden",
        className
      )}
    >
      {/* Hairline grid lines */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundSize: densities[density],
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
        }}
      />

      {/* Laboratory crosshair markers & coordinates */}
      {showCoordinates && (
        <div className="hidden md:block absolute inset-0">
          <div className="absolute top-6 left-8 font-mono text-[9px] tracking-widest uppercase text-muted-foreground/60 select-none">
            + [SEC-01: 280.4nm]
          </div>
          <div className="absolute top-6 right-8 font-mono text-[9px] tracking-widest uppercase text-muted-foreground/60 select-none">
            + [REF-CHROMA: 99.5%]
          </div>
          <div className="absolute bottom-6 left-8 font-mono text-[9px] tracking-widest uppercase text-muted-foreground/60 select-none">
            + [LAT-MOL: 42.3601°N]
          </div>
          <div className="absolute bottom-6 right-8 font-mono text-[9px] tracking-widest uppercase text-muted-foreground/60 select-none">
            + [TELEM: PASS]
          </div>

          {/* Center alignment marks */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 w-2 h-[1px] bg-brand/30" />
          <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-[1px] bg-brand/30" />
        </div>
      )}
    </div>
  );
}
