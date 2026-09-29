import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface LightSweepProps {
  durationSeconds?: number;
  className?: string;
}

/**
 * LightSweep
 * Slow cinematic specular light sweep passing across the background at controlled intervals.
 * Automatically halts when prefers-reduced-motion is enabled.
 */
export function LightSweep({
  durationSeconds = 14,
  className,
}: LightSweepProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none -z-10",
        className
      )}
    >
      <div
        className="absolute -inset-x-full inset-y-0 opacity-40 dark:opacity-20 transform-gpu motion-reduce:hidden"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(40,123,255,0.06) 40%, rgba(40,123,255,0.18) 50%, rgba(40,123,255,0.06) 60%, transparent 100%)",
          animation: `novaxLightSweep ${durationSeconds}s infinite ease-in-out`,
        }}
      />
    </div>
  );
}
