"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "brand" | "none";
  interactive?: boolean;
  spotlight?: boolean;
  tilt?: boolean;
}

type GlassCardStyle = React.CSSProperties & {
  "--spotlight-x"?: string;
  "--spotlight-y"?: string;
};

export function GlassCard({
  className,
  glow = "none",
  interactive = false,
  spotlight = true,
  tilt = false,
  children,
  style,
  ...props
}: GlassCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number | null>(null);
  const reducedMotionRef = React.useRef(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = query.matches;
    };

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  React.useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((!spotlight && !tilt) || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      if (spotlight) {
        card.style.setProperty("--spotlight-x", `${x}px`);
        card.style.setProperty("--spotlight-y", `${y}px`);
      }

      if (tilt && !reducedMotionRef.current) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(2px)`;
        card.style.transition = "transform 0.1s ease-out";
      }

      frameRef.current = null;
    });
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card || !tilt) return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    card.style.transition = "transform 0.4s ease-out";
  };

  const glowStyles = {
    brand:
      "hover:border-brand/40 dark:hover:border-brand/50 hover:shadow-[0_6px_24px_-4px_rgba(27,77,255,0.14)]",
    none: "",
  };

  const cardStyle: GlassCardStyle = {
    "--spotlight-x": "50%",
    "--spotlight-y": "50%",
    ...style,
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={spotlight || tilt ? handlePointerMove : undefined}
      onPointerLeave={tilt ? handlePointerLeave : undefined}
      style={cardStyle}
      className={cn(
        "surface-card rounded-lg p-6 transition-all duration-300 relative overflow-hidden group",
        interactive && "cursor-pointer hover:-translate-y-0.5",
        glowStyles[glow],
        className,
      )}
      {...props}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0 motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(450px circle at var(--spotlight-x) var(--spotlight-y), rgba(27, 77, 255, 0.08), transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      <div
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
