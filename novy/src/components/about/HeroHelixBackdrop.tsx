"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

const XylophoneHelix = dynamic(
  () => import("@/components/originkit/ui/xylophone-helix-03"),
  {
    ssr: false,
    loading: () => null,
  },
);

type HeroHelixBackdropProps = {
  className?: string;
  intensity?: "soft" | "normal";
};

export function HeroHelixBackdrop({
  className,
  intensity = "soft",
}: HeroHelixBackdropProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const media = window.matchMedia(
      "(max-width: 900px), (pointer: coarse)",
    );

    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 bg-[#f7f9fc] dark:bg-[#040711]",
          className,
        )}
      />
    );
  }

  const dark = resolvedTheme === "dark";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      <XylophoneHelix
        width="100%"
        height="100%"
        background={dark ? "#040711" : "#f7f9fc"}
        baseColor={dark ? "#5368ff" : "#b8c8e8"}
        bars={isMobile ? 14 : 32}
        shape="helix"
        torusRadius={isMobile ? 0.82 : 1.25}
        tubeRadius={isMobile ? 0.3 : 0.54}
        speed={isMobile ? 24 : 52}
        drag={0}
        scale={isMobile ? 160 : 300}
        hover={{
          glow: 0,
          tint: 0,
          strength: 0,
          colors: dark
            ? ["#ffffff", "#3b5cff", "#00d2ff", "#071342"]
            : ["#ffffff", "#c9d8ff", "#5879ff", "#dff7ff"],
        }}
        camera={{
          tilt: isMobile ? 44 : 52,
          sideTilt: isMobile ? 52 : 72,
        }}
        className={cn(
          "h-full w-full",
          intensity === "soft"
            ? "opacity-85 dark:opacity-90"
            : "opacity-100",
        )}
      />

      {/* Cheap readability overlay; no backdrop-filter / blur. */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r",
          isMobile
            ? "from-[#f7f9fc]/72 via-[#f7f9fc]/28 to-transparent dark:from-[#040711]/72 dark:via-[#040711]/28 dark:to-transparent"
            : "from-[#f7f9fc]/82 via-[#f7f9fc]/45 to-transparent dark:from-[#040711]/82 dark:via-[#040711]/45 dark:to-transparent",
        )}
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent",
          isMobile ? "h-12" : "h-20",
        )}
      />
    </div>
  );
}
