"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingMoleculesProps {
  count?: number;
  radius?: number;
}

/**
 * FloatingMolecules3D
 * Instanced floating molecular nodes, distance-based covalent bonds,
 * and ambient microscopic peptide bio-particles in 3D WebGL space.
 */
export function FloatingMolecules3D({
  count = 20,
  radius = 3.5,
}: FloatingMoleculesProps) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const linesRef = React.useRef<THREE.LineSegments>(null);
  const ring1Ref = React.useRef<THREE.Group>(null);
  const ring2Ref = React.useRef<THREE.Group>(null);

  // Generate stable random node positions & velocities
  const [nodes] = React.useState(() => {
    const list: Array<{
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      basePos: THREE.Vector3;
    }> = [];
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius + 1.2;
      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      );
      list.push({ pos, vel, basePos: pos.clone() });
    }
    return list;
  });

  // Particle positions array buffer
  const particlePositions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = nodes[i].pos.x;
      arr[i * 3 + 1] = nodes[i].pos.y;
      arr[i * 3 + 2] = nodes[i].pos.z;
    }
    return arr;
  }, [nodes, count]);

  // Bond line geometry buffers
  const maxBonds = (count * (count - 1)) / 2;
  const linePositions = React.useMemo(() => new Float32Array(maxBonds * 6), [maxBonds]);
  const lineColors = React.useMemo(() => new Float32Array(maxBonds * 6), [maxBonds]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate ambient orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.15;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.12;
      ring2Ref.current.rotation.z = time * 0.18;
    }

    // Animate molecular nodes and calculate distance bonds
    let lineIdx = 0;
    const maxDistance = 1.8;

    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      node.pos.add(node.vel);

      // Bounce back to base region
      if (node.pos.distanceTo(node.basePos) > 0.8) {
        node.vel.negate();
      }

      // Update points buffer
      particlePositions[i * 3] = node.pos.x;
      particlePositions[i * 3 + 1] = node.pos.y;
      particlePositions[i * 3 + 2] = node.pos.z;

      // Check distance to other nodes to draw covalent bonds
      for (let j = i + 1; j < count; j++) {
        const other = nodes[j];
        const dist = node.pos.distanceTo(other.pos);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.35;

          linePositions[lineIdx * 6] = node.pos.x;
          linePositions[lineIdx * 6 + 1] = node.pos.y;
          linePositions[lineIdx * 6 + 2] = node.pos.z;

          linePositions[lineIdx * 6 + 3] = other.pos.x;
          linePositions[lineIdx * 6 + 4] = other.pos.y;
          linePositions[lineIdx * 6 + 5] = other.pos.z;

          // Azure color with distance alpha
          for (let k = 0; k < 2; k++) {
            lineColors[lineIdx * 6 + k * 3] = 0.15 * alpha; // R
            lineColors[lineIdx * 6 + k * 3 + 1] = 0.5 * alpha; // G
            lineColors[lineIdx * 6 + k * 3 + 2] = 1.0 * alpha; // B
          }

          lineIdx++;
        }
      }
    }

    // Clear unused line segments
    for (let i = lineIdx * 6; i < linePositions.length; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 3D Molecular Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#00D2FF"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Covalent Bond Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Orbital Crystalline Ring 1 */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[2.4, 2.415, 64]} />
          <meshBasicMaterial
            color="#287BFF"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Orbital Crystalline Ring 2 */}
      <group ref={ring2Ref}>
        <mesh rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
          <ringGeometry args={[2.7, 2.715, 64]} />
          <meshBasicMaterial
            color="#00D2FF"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
