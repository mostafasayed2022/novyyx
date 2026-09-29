"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  shimmer?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      shimmer = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-md select-none overflow-hidden group active:scale-[0.98]";

    const variants = {
      primary:
        "bg-brand text-white font-semibold hover:bg-brand-hover shadow-sm border border-brand/20",
      secondary:
        "bg-surface-elevated text-foreground hover:bg-surface border border-border shadow-sm",
      outline:
        "border border-border text-foreground hover:bg-surface-elevated hover:border-brand/40 shadow-sm",
      ghost:
        "text-muted-foreground hover:text-foreground hover:bg-surface-elevated",
      glow:
        "bg-brand text-white font-semibold shadow-[0_0_18px_rgba(27,77,255,0.25)] hover:shadow-[0_0_26px_rgba(27,77,255,0.45)] hover:bg-brand-hover border border-white/10",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-4.5 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
    };

    const hasShimmer =
      shimmer && (variant === "glow" || variant === "primary");

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Subtle 45-degree Shimmer Sweep on Hover */}
        {hasShimmer && (
          <span
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-25 -translate-x-[150%] transition-transform duration-700 ease-out group-hover:translate-x-[350%]" />
          </span>
        )}

        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
