"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { useLocale } from "@/i18n/locale-provider";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { tr } = useLocale();

  const isAdmin =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-mono focus:text-xs"
      >
        {tr("Skip to main content", "Zum Hauptinhalt springen")}
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main-content" className="flex-1 flex flex-col">
        <Suspense fallback={null}>{children}</Suspense>
      </main>

      <Footer />
    </>
  );
}
