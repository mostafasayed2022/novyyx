"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useVisualActivity } from "@/hooks/use-visual-capabilities";
import { InteractiveHeroProduct } from "@/components/home/interactive-hero-product";
import { Dna, Activity } from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";

// Dynamic import with ssr: false for safe Next.js App Router WebGL mounting
const DynamicProductScene = dynamic(
  () =>
    import("./novax-product-scene").then((mod) => mod.NovyxProductScene),
  {
    ssr: false,
    loading: () => <ProductSceneSkeleton />,
  }
);

function ProductSceneSkeleton() {
  return (
    <div className="w-full h-full min-h-[460px] flex items-center justify-center relative">
      <div className="w-48 h-72 rounded-2xl border border-brand/20 bg-surface/50 backdrop-blur-md animate-pulse flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-full border border-brand/30 animate-spin flex items-center justify-center text-brand">
          <Dna className="w-8 h-8 opacity-40" />
        </div>
        <div className="space-y-2 text-center">
          <div className="w-24 h-3 rounded bg-brand/20 mx-auto" />
          <div className="w-16 h-2 rounded bg-muted-foreground/20 mx-auto" />
        </div>
      </div>
    </div>
  );
}

interface ProductSceneWrapperProps {
  className?: string;
  forceStaticFallback?: boolean;
}

/**
 * ProductSceneWrapper
 * Orchestrates WebGL 3D vs. Static CSS 3D fallback based on device capability,
 * viewport width, and prefers-reduced-motion.
 */
export function ProductSceneWrapper({
  className = "relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center",
  forceStaticFallback = false,
}: ProductSceneWrapperProps) {
  const { tr } = useLocale();
  const sceneRef = React.useRef<HTMLDivElement>(null);
  const active = useVisualActivity(sceneRef);

  return (
    <div ref={sceneRef} data-visual-active={active} className={className}>
      {/* Dynamic 3D WebGL Canvas */}
      {active && !forceStaticFallback ? <DynamicProductScene className="w-full h-full min-h-[460px]" /> : <InteractiveHeroProduct />}

      {/* Floating Telemetry Satellite Cards (HTML Overlays on 3D Canvas) */}
      <div className="absolute top-4 left-0 p-3 surface-card bg-surface/90 backdrop-blur-md shadow-xl rounded-xl border border-border/80 flex items-center gap-2.5 pointer-events-none z-10">
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
      </div>

      <div className="absolute bottom-4 right-0 p-3 surface-card bg-surface/90 backdrop-blur-md shadow-xl rounded-xl border border-border/80 flex items-center gap-2.5 pointer-events-none z-10">
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
      </div>
    </div>
  );
}
