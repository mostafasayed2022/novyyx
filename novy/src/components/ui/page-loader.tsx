"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

export function PageLoader() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="
        fixed
        inset-0
        z-[2147483647]
        flex
        min-h-[100dvh]
        w-screen
        items-center
        justify-center
        bg-[#040711]
      "
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-44 sm:h-20 sm:w-56">
          <Image
            src="/logos/novyx_logo_platinum_light.webp"
            alt="NŌVYX"
            fill
            priority
            sizes="224px"
            className="object-contain animate-pulse"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00D2FF]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00D2FF] [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00D2FF] [animation-delay:300ms]" />
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>,
    document.body,
  );
}
