import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "metal" | "outline" | "subtle";
}

export function Badge({
  className,
  variant = "brand",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    brand: "bg-brand/10 text-brand border border-brand/30",
    metal: "bg-metal/10 text-metal border border-metal/30",
    outline: "border border-border text-foreground bg-surface/50",
    subtle: "bg-surface-elevated text-muted-foreground border border-border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-mono tracking-widest uppercase transition-colors select-none",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </div>
  );
}
