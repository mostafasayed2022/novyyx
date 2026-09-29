"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionDividerProps {
  label?: string;
  className?: string;
  showNode?: boolean;
}

export function SectionDivider({
  label,
  className,
  showNode = true,
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        "relative w-full py-8 flex items-center justify-center pointer-events-none select-none overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Left Hairline Laser */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border/80 to-brand/30" />

      {/* Center Laser Node & Telemetry Badge */}
      {showNode && (
        <div className="flex items-center gap-2.5 px-4 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(40,123,255,0.8)] animate-pulse" />
          {label && (
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/80">
              {label}
            </span>
          )}
          <div className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(40,123,255,0.8)] animate-pulse" />
        </div>
      )}

      {/* Right Hairline Laser */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-border/80 to-brand/30" />
    </div>
  );
}
