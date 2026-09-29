"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ProceduralVial } from "./procedural-vial";
import { FloatingMolecules3D } from "./floating-molecules-3d";

interface NovyxProductSceneProps {
  className?: string;
  enableInteraction?: boolean;
}

/**
 * ProductContainer
 * Controls idle floating oscillation, smooth cursor parallax lerp,
 * and scroll-induced rotational deflection.
 */
function ProductContainer({
  mouse,
  scrollOffset,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollOffset: React.MutableRefObject<number>;
}) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Idle vertical breathing oscillation
    const idleY = Math.sin(time * 1.3) * 0.06;
    groupRef.current.position.y = idleY;

    // Smooth cursor tilt damping
    const targetRotY = mouse.current.x * 0.35 + scrollOffset.current * 0.5 + Math.sin(time * 0.3) * 0.1;
    const targetRotX = -mouse.current.y * 0.25;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.06
    );
  });

  return (
    <group ref={groupRef}>
      {/* 3D Laboratory Physical Glass Vial */}
      <ProceduralVial
        productName="NOVYX CUTIS™"
        purity={99.82}
        lotId="NVX-2026-CUT-0042"
      />

      {/* Floating 3D Molecular Lattice & Orbital Rings */}
      <FloatingMolecules3D count={24} radius={3.0} />

      {/* Contact Shadow Ground Disc */}
      <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 1.6, 48]} />
        <meshBasicMaterial
          color="#06090E"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * NovyxProductScene
 * Full WebGL 3D scene with studio lighting rig, azure rim lighting,
 * and mouse parallax physics.
 */
export function NovyxProductScene({
  className = "w-full h-full min-h-[460px]",
  enableInteraction = true,
}: NovyxProductSceneProps) {
  const mouse = React.useRef({ x: 0, y: 0 });
  const scrollOffset = React.useRef(0);

  React.useEffect(() => {
    if (!enableInteraction) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollOffset.current = (window.scrollY / window.innerHeight) * Math.PI;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enableInteraction]);

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        {/* Studio Key Directional Light */}
        <directionalLight position={[4, 5, 4]} intensity={1.6} color="#FFFFFF" />

        {/* Scientific Azure Rim Light (Key brand highlight on vial contour) */}
        <directionalLight position={[-4, 2, -3]} intensity={3.2} color="#287BFF" />

        {/* Ambient Fill Light */}
        <ambientLight intensity={0.8} color="#0B132B" />

        {/* Cyan Specular Refraction Accent */}
        <pointLight position={[0, 2.5, 3]} intensity={1.2} color="#00D2FF" />

        {/* Bottom Reflected Ground Glow */}
        <pointLight position={[0, -2.5, 1]} intensity={0.6} color="#1769E0" />

        {/* Interactive 3D Product Container */}
        <ProductContainer mouse={mouse} scrollOffset={scrollOffset} />
      </Canvas>
    </div>
  );
}
