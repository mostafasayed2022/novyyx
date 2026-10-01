"use client";

import * as React from "react";
import { useRichVisuals } from "@/hooks/use-visual-capabilities";
import { startCanvasLoop } from "@/lib/visuals/canvas-loop";
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

/**
 * ParticleField
 * Lightweight canvas particle system simulating floating peptide micro-nodes.
 * Automatically halts animation when prefers-reduced-motion is active and optimizes for mobile.
 */
export function ParticleField({
  particleCount = 28,
  className,
}: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const enabled = useRichVisuals();

  React.useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Responsive count: fewer particles on mobile screens
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.floor(particleCount * 0.45) : particleCount;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
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
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render particles
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(40, 123, 255, ${p.opacity * 0.7})`;
        ctx.fill();

        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap edges
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          // Gentle breathing pulse
          p.opacity += Math.sin(Date.now() * p.pulseSpeed * 0.001) * 0.005;
          p.opacity = Math.max(0.15, Math.min(0.65, p.opacity));
        }
      }

    };

    const stopLoop = startCanvasLoop(canvas, render);

    return () => {
      window.removeEventListener("resize", handleResize);
      stopLoop();
    };
  }, [particleCount, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none select-none -z-10 w-full h-full",
        className
      )}
    />
  );
}
