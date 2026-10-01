"use client";

import * as React from "react";
import { useHasMounted } from "@/hooks/use-visual-capabilities";

interface ThreeCanvasProps {
  children?: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * SSR-Safe Three.js Canvas Container
 * Renders an ambient futuristic molecular placeholder until client-side WebGL initializes.
 */
export function ThreeCanvas({
  children,
  className,
  fallback,
}: ThreeCanvasProps) {
  const mounted = useHasMounted();


  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {fallback || (
          <div className="w-24 h-24 rounded-full border border-brand/20 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-brand/40 animate-ping" />
          </div>
        )}
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}
