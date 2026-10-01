"use client";

import * as React from "react";
import { useRichVisuals } from "@/hooks/use-visual-capabilities";
import { startCanvasLoop } from "@/lib/visuals/canvas-loop";
import { cn } from "@/lib/utils/cn";

interface MolecularFieldProps {
  nodeCount?: number;
  connectionDistance?: number;
  className?: string;
  enablePointerReaction?: boolean;
}

interface MolNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

/**
 * MolecularField
 * Connected molecular lattice with distance-based covalent bonds and pointer-reactive depth.
 */
export function MolecularField({
  nodeCount = 26,
  connectionDistance = 110,
  className,
  enablePointerReaction = true,
}: MolecularFieldProps) {
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

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.floor(nodeCount * 0.45) : nodeCount;
    const maxDist = isMobile ? connectionDistance * 0.8 : connectionDistance;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const mouse = { x: -1000, y: -1000, active: false };

    const nodes: MolNode[] = [];
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 1.8 + 1.2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: r,
        baseRadius: r,
      });
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!enablePointerReaction) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw covalent bonds between proximate nodes
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(40, 123, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      for (let i = 0; i < count; i++) {
        const n = nodes[i];

        // Draw molecular node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(40, 123, 255, 0.45)";
        ctx.fill();

        if (!prefersReducedMotion) {
          // Pointer reactive physics
          if (mouse.active) {
            const mdx = n.x - mouse.x;
            const mdy = n.y - mouse.y;
            const mdist = Math.hypot(mdx, mdy);
            if (mdist < 140 && mdist > 0) {
              const force = (140 - mdist) / 140;
              n.x += (mdx / mdist) * force * 1.5;
              n.y += (mdy / mdist) * force * 1.5;
            }
          }

          n.x += n.vx;
          n.y += n.vy;

          // Bounce bounds
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

    };

    const stopLoop = startCanvasLoop(canvas, render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      stopLoop();
    };
  }, [nodeCount, connectionDistance, enablePointerReaction, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none select-none -z-10 w-full h-full opacity-70 dark:opacity-85",
        className
      )}
    />
  );
}
