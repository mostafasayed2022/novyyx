import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface GradientMeshProps {
  intensity?: "subtle" | "medium" | "vibrant";
  className?: string;
}

/**
 * GradientMesh
 * Multi-layer ambient chromatic gradient field for luxury laboratory atmosphere.
 */
export function GradientMesh({
  intensity = "subtle",
  className,
}: GradientMeshProps) {
  const opacities = {
    subtle: "opacity-40 dark:opacity-30",
    medium: "opacity-60 dark:opacity-45",
    vibrant: "opacity-80 dark:opacity-60",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none select-none overflow-hidden -z-20",
        opacities[intensity],
        className
      )}
    >
      {/* Top primary optical spotlight */}
      <div
        className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(40, 123, 255, 0.25) 0%, rgba(23, 105, 224, 0.08) 50%, transparent 80%)",
        }}
      />

      {/* Secondary accent node */}
      <div
        className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Deep foundation counter-glow */}
      <div
        className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(40, 123, 255, 0.1) 0%, transparent 75%)",
        }}
      />
    </div>
  );
}
