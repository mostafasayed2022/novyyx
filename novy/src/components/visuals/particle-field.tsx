"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  pulseSpeed: number;
}

export function ParticleField({
  particleCount = 28,
  className,
}: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    // Disable completely on phones / tablets
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Also disable for users requesting reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;

    let width =
      (canvas.width =
        canvas.parentElement?.clientWidth || window.innerWidth);

    let height =
      (canvas.height =
        canvas.parentElement?.clientHeight || 600);

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.8,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -(Math.random() * 0.35 + 0.15),
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;

      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(40, 123, 255, ${p.opacity * 0.7})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        p.opacity += Math.sin(now * p.pulseSpeed * 0.001) * 0.005;
        p.opacity = Math.max(0.15, Math.min(0.65, p.opacity));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        // Important: do not even display the canvas on mobile
        "absolute inset-0 -z-10 hidden h-full w-full select-none pointer-events-none md:block",
        className
      )}
    />
  );
}