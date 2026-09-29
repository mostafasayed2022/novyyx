"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "@/i18n/locale-provider";

interface ThemeToggleProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function ThemeToggle({
  variant = "desktop",
  className,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { tr } = useLocale();
  const [mounted, setMounted] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          variant === "desktop"
            ? "w-9 h-9 rounded-lg border border-border bg-surface/50 animate-pulse"
            : "w-full h-10 rounded-lg border border-border bg-surface/50 animate-pulse",
          className
        )}
      />
    );
  }

  // Mobile segmented pill control
  if (variant === "mobile") {
    return (
      <div
        className={cn(
          "flex items-center justify-between p-1 rounded-xl bg-surface-elevated border border-border w-full select-none",
          className
        )}
        role="group"
        aria-label={tr("Theme selection", "Designauswahl")}
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer",
            theme === "light"
              ? "bg-surface text-foreground font-bold shadow-sm border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={theme === "light"}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>{tr("Light", "Hell")}</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer",
            theme === "dark"
              ? "bg-surface text-foreground font-bold shadow-sm border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={theme === "dark"}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>{tr("Dark", "Dunkel")}</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("system")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer",
            theme === "system"
              ? "bg-surface text-foreground font-bold shadow-sm border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={theme === "system"}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>{tr("System", "System")}</span>
        </button>
      </div>
    );
  }

  // Desktop elegant control with clean dropdown
  return (
    <div className={cn("relative inline-block text-left select-none", className)}>
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
        className="w-9 h-9 rounded-lg border border-border bg-surface hover:bg-surface-elevated text-foreground flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-brand cursor-pointer shadow-sm"
        aria-label={tr("Toggle visual theme", "Darstellung wechseln")}
        aria-expanded={menuOpen}
        aria-haspopup="true"
      >
        {theme === "system" ? (
          <Monitor className="w-4 h-4 text-brand" />
        ) : resolvedTheme === "dark" ? (
          <Moon className="w-4 h-4 text-brand" />
        ) : (
          <Sun className="w-4 h-4 text-brand" />
        )}
      </button>

      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-xl border border-border bg-surface surface-card p-1 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          <button
            type="button"
            onClick={() => {
              setTheme("light");
              setMenuOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer",
              theme === "light"
                ? "bg-brand/10 text-brand font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
            )}
            role="menuitem"
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{tr("Light", "Hell")}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme("dark");
              setMenuOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer",
              theme === "dark"
                ? "bg-brand/10 text-brand font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
            )}
            role="menuitem"
          >
            <Moon className="w-3.5 h-3.5" />
            <span>{tr("Dark", "Dunkel")}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme("system");
              setMenuOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer",
              theme === "system"
                ? "bg-brand/10 text-brand font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
            )}
            role="menuitem"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{tr("System", "System")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
