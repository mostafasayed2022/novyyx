import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface NovyxLogoProps {
  variant?: "full" | "stacked" | "symbol";
  className?: string;
  height?: number;
  priority?: boolean;
}

const FULL_LOGO = {
  width: 777,
  height: 635,
  lightSrc: "/logos/novyx_logo_platinum_light.webp",
  darkSrc: "/logos/novyx_logo_platinum_dark.webp",
  alt: "NOVYX — Engineered for Longevity",
};

const SYMBOL_LOGO = {
  width: 384,
  height: 483,
  src: "/logos/novyx_logo_mark.webp",
  alt: "NOVYX symbol",
};

export function NovyxLogo({
  variant = "full",
  className,
  height = 72,
  priority = false,
}: NovyxLogoProps) {
  if (variant === "symbol") {
    const width = Math.round((SYMBOL_LOGO.width / SYMBOL_LOGO.height) * height);

    return (
      <span
        className={cn(
          "relative inline-flex shrink-0 select-none items-center transition-transform duration-300 hover:scale-[1.01]",
          className,
        )}
        style={{ height, width }}
      >
        <Image
          src={SYMBOL_LOGO.src}
          alt={SYMBOL_LOGO.alt}
          width={SYMBOL_LOGO.width}
          height={SYMBOL_LOGO.height}
          priority={priority}
          sizes={`${width}px`}
          className="h-full w-auto object-contain"
        />
      </span>
    );
  }

  const width = Math.round((FULL_LOGO.width / FULL_LOGO.height) * height);

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 select-none items-center transition-transform duration-300 hover:scale-[1.01]",
        className,
      )}
      style={{ height, width }}
    >
      <Image
        src={FULL_LOGO.lightSrc}
        alt={FULL_LOGO.alt}
        width={FULL_LOGO.width}
        height={FULL_LOGO.height}
        priority={priority}
        sizes={`${width}px`}
        className="block h-full w-auto object-contain dark:hidden"
      />
      <Image
        src={FULL_LOGO.darkSrc}
        alt={FULL_LOGO.alt}
        width={FULL_LOGO.width}
        height={FULL_LOGO.height}
        priority={priority}
        sizes={`${width}px`}
        className="hidden h-full w-auto object-contain dark:block"
      />
    </span>
  );
}
