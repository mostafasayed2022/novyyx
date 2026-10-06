"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MAIN_NAVIGATION } from "@/lib/constants/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils/cn";
import { NovyxLogo } from "@/components/ui/novax-logo";
import {
  Menu,
  X,
  ArrowUpRight,
  Search,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { locale, tr } = useLocale();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hoveredHref, setHoveredHref] = React.useState<string | null>(null);
  const [productsOpen, setProductsOpen] = React.useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false);

  const productItems = MAIN_NAVIGATION.filter(
    (item) => item.href === ROUTES.peptides || item.href === ROUTES.skinBoosters
  );
  const primaryItems = MAIN_NAVIGATION.filter(
    (item) => item.href !== ROUTES.peptides && item.href !== ROUTES.skinBoosters
  );
  const isProductsActive = productItems.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled ? "pt-2 pb-2 xl:pt-3 xl:pb-3" : "pt-2 pb-2 xl:pt-5 xl:pb-3"
      )}
    >
      <Container size="xl" className="px-3 sm:px-6 lg:px-8">
        <div
          className={cn(
            "relative transition-all duration-500 ease-out flex items-center justify-between gap-2 sm:gap-4",
            scrolled
              ? "px-3 py-1.5 xl:px-5 xl:py-2 rounded-2xl bg-background/92 dark:bg-[#07090e]/92 backdrop-blur-none sm:backdrop-blur-xl xl:backdrop-blur-2xl border border-border/80 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.28),0_1px_1px_0_rgba(255,255,255,0.08)_inset]"
              : "px-1 py-0.5 sm:px-2 sm:py-1 bg-transparent"
          )}
        >
          {/* Hairline Top Specular Chamfer Reflection (Jewelry / Chronometer aesthetic) */}
          {scrolled && (
            <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none" />
          )}

          {/* Hairline Bottom Nexus Blue Glow on Scroll */}
          {scrolled && (
            <div className="absolute inset-x-8 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent pointer-events-none" />
          )}

          {/* Left: Brand Identity */}
          <Link
            href={ROUTES.home}
            className="flex items-center group select-none shrink-0 relative transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            aria-label="NOVYX Home"
          >
            <span className="xl:hidden">
              <NovyxLogo variant="full" height={54} priority />
            </span>
            <span className="hidden xl:inline-flex">
              <NovyxLogo variant="full" height={96} priority />
            </span>
          </Link>

          {/* Center: Precision Milled Navigation Track */}
          <nav
            onMouseLeave={() => setHoveredHref(null)}
            className="hidden xl:flex items-center gap-1 bg-surface/60 dark:bg-[#0c0f18]/65 backdrop-blur-2xl px-3 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] relative"
          >
            {primaryItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              const isHovered = hoveredHref === item.href;

              return (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[11.5px] font-mono uppercase tracking-[0.14em] transition-all duration-300 relative whitespace-nowrap z-10 flex items-center gap-1.5 select-none font-medium",
                      isActive
                        ? "text-brand font-bold"
                        : "text-muted-foreground hover:text-foreground hover:tracking-[0.16em]"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand/15 via-brand/25 to-brand/15 border border-brand/40 shadow-[0_0_16px_rgba(27,77,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="navbar-hover-pill"
                        className="absolute inset-0 rounded-full bg-surface-elevated/90 dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{locale === "de" ? item.titleDe || item.title : item.title}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-brand/20 text-brand font-mono font-bold tracking-normal border border-brand/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {item.href === ROUTES.about && (
                    <div
                      className="relative -mb-3 pb-3"
                      onMouseEnter={() => {
                        setProductsOpen(true);
                        setHoveredHref("catalog-dropdown");
                      }}
                      onMouseLeave={() => {
                        setProductsOpen(false);
                        setHoveredHref(null);
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setProductsOpen((open) => !open)}
                        aria-haspopup="menu"
                        aria-expanded={productsOpen}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-[11.5px] font-mono uppercase tracking-[0.14em] transition-all duration-300 relative whitespace-nowrap z-10 flex items-center gap-1.5 select-none font-medium",
                          isProductsActive
                            ? "text-brand font-bold"
                            : "text-muted-foreground hover:text-foreground hover:tracking-[0.16em]"
                        )}
                      >
                        {isProductsActive && (
                          <motion.div
                            layoutId="navbar-active-pill"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-brand/15 via-brand/25 to-brand/15 border border-brand/40 shadow-[0_0_16px_rgba(27,77,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] -z-10"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span>Peptides &amp; Skin Boosters</span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            productsOpen && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {productsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.16, ease: "easeOut" }}
                            className="absolute left-1/2 top-full w-64 -translate-x-1/2 rounded-2xl border border-border/80 bg-background/95 dark:bg-[#090c13]/95 p-2 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                            role="menu"
                          >
                            {productItems.map((productItem) => {
                              const active =
                                pathname === productItem.href ||
                                pathname.startsWith(`${productItem.href}/`);
                              return (
                                <Link
                                  key={productItem.href}
                                  href={productItem.href}
                                  role="menuitem"
                                  onClick={() => setProductsOpen(false)}
                                  className={cn(
                                    "group flex items-center justify-between rounded-xl px-4 py-3 transition-colors",
                                    active
                                      ? "bg-brand/10 text-brand"
                                      : "text-foreground hover:bg-surface-elevated"
                                  )}
                                >
                                  <div>
                                    <div className="text-xs font-mono font-semibold uppercase tracking-[0.12em]">
                                      {productItem.title}
                                    </div>
                                    {productItem.description && (
                                      <div className="mt-1 text-[10px] normal-case leading-relaxed text-muted-foreground line-clamp-2">
                                        {locale === "de"
                                          ? productItem.descriptionDe || productItem.description
                                          : productItem.description}
                                      </div>
                                    )}
                                  </div>
                                  <ArrowUpRight className="ml-3 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right: Haute Actions Suite */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            {/* Quick Catalog Search Jewel */}
            <Link
              href={ROUTES.products}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-border/80 bg-surface/60 dark:bg-white/[0.03] hover:border-brand/50 hover:bg-surface-elevated text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 shadow-sm group"
              aria-label={tr("Search catalog", "Katalog durchsuchen")}
            >
              <Search className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            </Link>

            {/* Signature Luxury Pill CTA */}
            <Link href={ROUTES.contact}>
              <button
                type="button"
                className="relative group overflow-hidden inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-brand to-[#2257ff] hover:from-[#2257ff] hover:to-brand text-white text-[11px] font-mono font-semibold uppercase tracking-[0.14em] shadow-[0_0_20px_rgba(27,77,255,0.35)] hover:shadow-[0_0_28px_rgba(27,77,255,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/20 cursor-pointer"
              >
                {/* Micro-shimmer shine reflection */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">{tr("Scientific Dossier", "Wissenschaftliches Dossier")}</span>
                <span className="relative z-10 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </button>
            </Link>

            <LanguageSwitcher compact />

            {/* Machined Circular Theme Toggle */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center border border-border/80 bg-surface/60 dark:bg-white/[0.03] shadow-sm">
              <ThemeToggle variant="desktop" />
            </div>
          </div>

          {/* Mobile Right Cluster */}
          <div className="flex xl:hidden items-center gap-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-surface/85 shadow-sm">
              <ThemeToggle variant="desktop" />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/90 bg-surface/85 p-0 text-foreground hover:bg-surface-elevated transition-colors shadow-sm cursor-pointer"
              aria-label={tr("Toggle menu", "Menü öffnen oder schließen")}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer with Staggered Entrance & Glassmorphic Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="xl:hidden fixed inset-x-3 top-[72px] sm:inset-x-4 sm:top-20 bg-background/98 dark:bg-[#07090e]/98 backdrop-blur-none sm:backdrop-blur-xl border border-border/80 rounded-2xl p-4 sm:p-6 transition-all shadow-[0_20px_44px_-14px_rgba(0,0,0,0.45)] z-50 max-h-[calc(100dvh-88px)] sm:max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {primaryItems.map((item) => (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between",
                      pathname === item.href
                        ? "bg-brand/10 text-brand font-bold border border-brand/20 shadow-sm"
                        : "text-foreground hover:bg-surface-elevated hover:text-brand",
                    )}
                  >
                    <span>{locale === "de" ? item.titleDe || item.title : item.title}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] bg-brand/15 text-brand font-mono font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {item.href === ROUTES.about && (
                    <div className="rounded-xl border border-border/70 bg-surface/40 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setMobileProductsOpen((open) => !open)}
                        aria-expanded={mobileProductsOpen}
                        className={cn(
                          "w-full px-4 py-3 text-left text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between",
                          isProductsActive
                            ? "text-brand font-bold"
                            : "text-foreground hover:text-brand"
                        )}
                      >
                        <span>Peptides &amp; Skin Boosters</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            mobileProductsOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-2 pb-2">
                              {productItems.map((productItem) => (
                                <Link
                                  key={productItem.href}
                                  href={productItem.href}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setMobileProductsOpen(false);
                                  }}
                                  className={cn(
                                    "flex items-center justify-between rounded-lg px-3 py-3 text-xs font-mono uppercase tracking-wider transition-colors",
                                    pathname === productItem.href || pathname.startsWith(`${productItem.href}/`)
                                      ? "bg-brand/10 text-brand font-bold"
                                      : "text-muted-foreground hover:bg-surface-elevated hover:text-brand"
                                  )}
                                >
                                  <span>{productItem.title}</span>
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* Mobile Theme Segmented Control */}
              <div className="pt-4 mt-2 border-t border-border/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2 px-1">
                  {tr("Display Theme", "Darstellung")}
                </span>
                <ThemeToggle variant="mobile" />
              </div>

              <div className="pt-4 mt-2 border-t border-border/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2 px-1">
                  {tr("Language", "Sprache")}
                </span>
                <LanguageSwitcher className="w-full justify-center" />
              </div>

              {/* Mobile Action Buttons */}
              <div className="pt-4 mt-2 border-t border-border/80 flex flex-col gap-2.5">
                <Link href={ROUTES.products} onClick={() => setIsOpen(false)}>
                  <Button
                    className="w-full font-mono text-xs tracking-wider"
                    size="md"
                    variant="outline"
                  >
                    {tr("Explore Catalog", "Katalog entdecken")}
                  </Button>
                </Link>
                <Link
                  href={ROUTES.contact}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    className="w-full gap-2 font-mono text-xs tracking-wider"
                    size="md"
                    variant="glow"
                  >
                    <span>{tr("Request Scientific Dossier", "Wissenschaftliches Dossier anfordern")}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
