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

    return () => {
      media.removeEventListener("change", update);
    };
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
        bars={isMobile ? 22 : 44}
        shape="helix"
        torusRadius={isMobile ? 1.1 : 1.38}
        tubeRadius={isMobile ? 0.45 : 0.64}
        speed={isMobile ? 45 : 72}
        drag={0}
        scale={isMobile ? 250 : 330}
        hover={{
          glow: isMobile ? 0 : 34,
          tint: isMobile ? 0 : 42,
          strength: isMobile ? 0 : 90,
          colors: dark
            ? ["#ffffff", "#3b5cff", "#00d2ff", "#071342"]
            : ["#ffffff", "#c9d8ff", "#5879ff", "#dff7ff"],
        }}
        camera={{
          tilt: isMobile ? 48 : 54,
          sideTilt: isMobile ? 60 : 78,
        }}
        className={cn(
          "h-full w-full",
          // intensity === "soft"
          //   ? "opacity-45 dark:opacity-50"
          //   : "opacity-65 dark:opacity-70",
          "opacity-100"
        )}
      />

      {/* Keeps text readable while preserving the lab visual. */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#f7f9fc]/95
          via-[#f7f9fc]/65
          to-[#f7f9fc]/10
          dark:from-[#040711]/95
          dark:via-[#040711]/65
          dark:to-[#040711]/10
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-28
          bg-gradient-to-t
          from-background
          to-transparent
        "
      />
    </div>
  );
}
