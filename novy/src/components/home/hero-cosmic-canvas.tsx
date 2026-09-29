"use client";

import * as React from "react";

/**
 * HeroCosmicCanvas
 * High-performance 60fps HTML5 Canvas background engine:
 * - Planetary horizon curvature with vibrant cyan/blue atmospheric rim glow
 * - 3D floating molecular lattice bonds (spheres connected by glowing rods)
 * - Swirling orbital energy ribbons and photon streams
 * - Deep space stardust and luminous micro-particles
 * - Responsive pointer parallax deflection
 */
export function HeroCosmicCanvas({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  // Skip heavy canvas rendering on mobile devices
  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  React.useEffect(() => {
    if (isMobile) return; // Skip heavy canvas on mobile — static bg image is the fallback
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isIntersecting = true;
    let isDocumentVisible = !document.hidden;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotionQuery.matches;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for interactive parallax
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // 1. Cosmic Stardust Particles
    const PARTICLE_COUNT = 75;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedY: Math.random() * 0.35 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? "#00D2FF" : "#1B4DFF",
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    // 2. Floating Molecular Clusters
    interface MoleculeNode {
      relX: number;
      relY: number;
      relZ: number;
      radius: number;
      coreColor: string;
    }

    interface MoleculeCluster {
      baseX: number;
      baseY: number;
      depth: number;
      rotX: number;
      rotY: number;
      rotSpeedX: number;
      rotSpeedY: number;
      nodes: MoleculeNode[];
      bonds: [number, number][];
    }

    const clusters: MoleculeCluster[] = [
      // Left-middle molecular structure
      {
        baseX: 0.18,
        baseY: 0.42,
        depth: 0.8,
        rotX: 0,
        rotY: 0,
        rotSpeedX: 0.003,
        rotSpeedY: 0.005,
        nodes: [
          { relX: 0, relY: 0, relZ: 0, radius: 11, coreColor: "#1B4DFF" },
          { relX: -42, relY: -30, relZ: 15, radius: 8, coreColor: "#00D2FF" },
          { relX: 45, relY: -25, relZ: -20, radius: 9, coreColor: "#00D2FF" },
          { relX: 20, relY: 48, relZ: 25, radius: 8, coreColor: "#1B4DFF" },
        ],
        bonds: [
          [0, 1],
          [0, 2],
          [0, 3],
        ],
      },
      // Center-right orbital molecule cluster (behind/near product)
      {
        baseX: 0.62,
        baseY: 0.28,
        depth: 0.95,
        rotX: 0.4,
        rotY: 0.2,
        rotSpeedX: 0.004,
        rotSpeedY: 0.006,
        nodes: [
          { relX: 0, relY: 0, relZ: 0, radius: 14, coreColor: "#1B4DFF" },
          { relX: 52, relY: -35, relZ: 25, radius: 10, coreColor: "#00D2FF" },
          { relX: -48, relY: -40, relZ: -30, radius: 9, coreColor: "#00D2FF" },
          { relX: -35, relY: 55, relZ: 15, radius: 9, coreColor: "#1B4DFF" },
          { relX: 50, relY: 50, relZ: -20, radius: 8, coreColor: "#00D2FF" },
        ],
        bonds: [
          [0, 1],
          [0, 2],
          [0, 3],
          [0, 4],
        ],
      },
      // Far-right secondary molecule cluster
      {
        baseX: 0.90,
        baseY: 0.60,
        depth: 0.6,
        rotX: 0.8,
        rotY: 0.5,
        rotSpeedX: -0.003,
        rotSpeedY: 0.004,
        nodes: [
          { relX: 0, relY: 0, relZ: 0, radius: 9, coreColor: "#00D2FF" },
          { relX: -30, relY: -22, relZ: 15, radius: 7, coreColor: "#1B4DFF" },
          { relX: 32, relY: 28, relZ: -15, radius: 7, coreColor: "#1B4DFF" },
        ],
        bonds: [
          [0, 1],
          [0, 2],
        ],
      },
    ];

    // 3. Swirling 3D Energy Ribbons around the product area
    let ribbonPhase = 0;

    const shouldAnimate = () =>
      isIntersecting && isDocumentVisible && !prefersReducedMotion;

    const scheduleFrame = () => {
      if (animationFrameId === null && shouldAnimate()) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const render = () => {
      animationFrameId = null;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const parallaxX = (mouse.x / width - 0.5) * 35;
      const parallaxY = (mouse.y / height - 0.5) * 25;

      ctx.clearRect(0, 0, width, height);

      // A. Curved Planetary Horizon Glow at the bottom
      const horizonY = height * 0.88;
      const horizonRadius = width * 1.35;
      const horizonCenterX = width * 0.5 + parallaxX * 0.2;
      const horizonCenterY = horizonY + horizonRadius * 0.82;

      // Outer atmospheric blue bloom
      const atmosphereGrad = ctx.createRadialGradient(
        horizonCenterX,
        horizonCenterY,
        horizonRadius * 0.76,
        horizonCenterX,
        horizonCenterY,
        horizonRadius * 1.05
      );
      atmosphereGrad.addColorStop(0, "rgba(0, 210, 255, 0.45)");
      atmosphereGrad.addColorStop(0.2, "rgba(27, 77, 255, 0.35)");
      atmosphereGrad.addColorStop(0.6, "rgba(10, 30, 90, 0.15)");
      atmosphereGrad.addColorStop(1, "transparent");

      ctx.fillStyle = atmosphereGrad;
      ctx.beginPath();
      ctx.arc(horizonCenterX, horizonCenterY, horizonRadius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // Crisp luminous atmospheric rim line
      ctx.save();
      ctx.strokeStyle = "rgba(140, 225, 255, 0.75)";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#00D2FF";
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(horizonCenterX, horizonCenterY, horizonRadius * 0.82, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.restore();

      // B. Floating Star Particles with upward drift
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.phase += p.pulseSpeed;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.phase));
        const px = p.x + parallaxX * (p.size * 0.3);
        const py = p.y + parallaxY * (p.size * 0.3);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow around larger particles
        if (p.size > 1.8) {
          ctx.fillStyle = "rgba(0, 210, 255, 0.25)";
          ctx.beginPath();
          ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      // C. Swirling 3D Energy Rings around product zone (around width * 0.72, height * 0.46)
      ribbonPhase += 0.015;
      const ribbonCenterX = width * 0.70 + parallaxX * 0.8;
      const ribbonCenterY = height * 0.45 + parallaxY * 0.8;

      ctx.save();
      ctx.translate(ribbonCenterX, ribbonCenterY);
      ctx.rotate(-0.28); // Angle matching the reference mockup

      // Double elliptical vortex
      for (let r = 0; r < 3; r++) {
        const radiusX = 220 + r * 35;
        const radiusY = 110 + r * 18;
        const offsetPhase = ribbonPhase + (r * Math.PI) / 3;

        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle =
          r === 1
            ? "rgba(0, 210, 255, 0.45)"
            : "rgba(27, 77, 255, 0.28)";
        ctx.lineWidth = r === 1 ? 2.5 : 1.5;
        ctx.shadowColor = "#00D2FF";
        ctx.shadowBlur = 18;
        ctx.stroke();

        // Pulsing photon head moving along the ellipse
        const photonAngle = offsetPhase * 1.5;
        const photonX = Math.cos(photonAngle) * radiusX;
        const photonY = Math.sin(photonAngle) * radiusY;

        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "#00D2FF";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(photonX, photonY, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // D. 3D Floating Molecular Structures
      clusters.forEach((cluster) => {
        cluster.rotX += cluster.rotSpeedX;
        cluster.rotY += cluster.rotSpeedY;

        const cx = cluster.baseX * width + parallaxX * cluster.depth;
        const cy = cluster.baseY * height + parallaxY * cluster.depth;

        // Project 3D nodes
        const projectedNodes = cluster.nodes.map((n) => {
          // 3D rotation Y
          const cosY = Math.cos(cluster.rotY);
          const sinY = Math.sin(cluster.rotY);
          const x1 = n.relX * cosY - n.relZ * sinY;
          const z1 = n.relX * sinY + n.relZ * cosY;

          // 3D rotation X
          const cosX = Math.cos(cluster.rotX);
          const sinX = Math.sin(cluster.rotX);
          const y2 = n.relY * cosX - z1 * sinX;
          const z2 = n.relY * sinX + z1 * cosX;

          const scale = (z2 + 200) / 200;
          return {
            x: cx + x1 * scale,
            y: cy + y2 * scale,
            z: z2,
            scale,
            radius: n.radius * scale,
            coreColor: n.coreColor,
          };
        });

        // Draw Bonds (interconnecting glassy rods)
        cluster.bonds.forEach(([i, j]) => {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          const bondGrad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
          bondGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
          bondGrad.addColorStop(0.5, "rgba(0, 210, 255, 0.55)");
          bondGrad.addColorStop(1, "rgba(27, 77, 255, 0.45)");

          ctx.strokeStyle = bondGrad;
          ctx.lineWidth = 3.5 * ((n1.scale + n2.scale) / 2);
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();

          // Glass edge highlight
          ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Draw Nodes (Spheres with glowing core and glass outer ring)
        projectedNodes
          .sort((a, b) => a.z - b.z)
          .forEach((node) => {
            // Outer Glass Sphere
            const outerGrad = ctx.createRadialGradient(
              node.x - node.radius * 0.3,
              node.y - node.radius * 0.3,
              node.radius * 0.1,
              node.x,
              node.y,
              node.radius
            );
            outerGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
            outerGrad.addColorStop(0.3, "rgba(220, 240, 255, 0.4)");
            outerGrad.addColorStop(0.8, "rgba(0, 150, 255, 0.2)");
            outerGrad.addColorStop(1, "rgba(0, 80, 220, 0.6)");

            ctx.fillStyle = outerGrad;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();

            // Inner Luminous Nucleus
            const coreRadius = node.radius * 0.45;
            const coreGrad = ctx.createRadialGradient(
              node.x,
              node.y,
              0,
              node.x,
              node.y,
              coreRadius
            );
            coreGrad.addColorStop(0, "#FFFFFF");
            coreGrad.addColorStop(0.4, node.coreColor);
            coreGrad.addColorStop(1, "transparent");

            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(node.x, node.y, coreRadius, 0, Math.PI * 2);
            ctx.fill();

            // Specular Reflection Gleam
            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            ctx.beginPath();
            ctx.arc(
              node.x - node.radius * 0.35,
              node.y - node.radius * 0.35,
              node.radius * 0.2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          });
      });

      scheduleFrame();
    };

    const updateAnimationState = () => {
      if (!shouldAnimate() && animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      if (isIntersecting && isDocumentVisible && prefersReducedMotion) {
        render();
        return;
      }

      scheduleFrame();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry?.isIntersecting ?? false;
        updateAnimationState();
      },
      { threshold: 0.01 },
    );

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      updateAnimationState();
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      updateAnimationState();
    };

    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    updateAnimationState();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      intersectionObserver.disconnect();
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className || "absolute inset-0 w-full h-full pointer-events-none -z-10"}
    />
  );
}
