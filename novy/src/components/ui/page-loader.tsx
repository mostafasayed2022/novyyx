"use client";

import Image from "next/image";

export function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-[#040711]
      "
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-44 sm:h-20 sm:w-56">
          <Image
            src="/logos/novyx_logo_platinum_light.webp"
            alt="NOVYX"
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
    </div>
  );
}
