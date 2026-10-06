"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
// import { HeroHelixBackdrop } from "@/components/about/HeroHelixBackdrop";
import { useLocale } from "@/i18n/locale-provider";

export function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { tr } = useLocale();

  const isAdmin =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isAdmin) {
    return <>{children}</>;
  }

  // Don't show the Helix background on Home or About
  const isHome = pathname === "/";

  const isAbout =
    pathname === "/about" ||
    pathname.startsWith("/about/");

  // const showHelixBackground = !isHome && !isAbout;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">

      {/* Global Helix Background */}
      {/* {showHelixBackground && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
        >
          <HeroHelixBackdrop
            intensity="normal"
            className="absolute inset-0"
          />
        </div>
      )} */}

      {/* Skip Link */}
      <a
        href="#main-content"
        className="
          sr-only
          focus:not-sr-only
          focus:fixed
          focus:left-4
          focus:top-4
          focus:z-[100]
          focus:rounded-xl
          focus:bg-brand
          focus:px-4
          focus:py-2
          focus:font-mono
          focus:text-xs
          focus:text-white
          focus:shadow-2xl
        "
      >
        {tr(
          "Skip to main content",
          "Zum Hauptinhalt springen"
        )}
      </a>

      {/* Scroll Progress */}
      <div className="relative z-[60]">
        <ScrollProgress />
      </div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Page Content */}
      <main
        id="main-content"
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          bg-transparent
        "
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}