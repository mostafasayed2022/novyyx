import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface GlowEffectProps {
  color?: "brand" | "metal" | "subtle";
  position?: "top-left" | "top-right" | "center" | "top-center" | "bottom-center";
  className?: string;
}

export function GlowEffect({
  color = "brand",
  position = "top-center",
  className,
}: GlowEffectProps) {
  const colors = {
    brand: "from-brand/10 via-brand/5 to-transparent",
    metal: "from-metal/10 via-metal/5 to-transparent",
    subtle: "from-brand/5 via-transparent to-transparent",
  };

  const positions = {
    "top-left": "-top-40 -left-40",
    "top-right": "-top-40 -right-40",
    "top-center": "-top-32 left-1/2 -translate-x-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-center": "-bottom-40 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute w-[600px] h-[500px] rounded-full bg-radial blur-[120px] pointer-events-none -z-10 transition-opacity duration-500",
        colors[color],
        positions[position],
        className
      )}
    />
  );
}
