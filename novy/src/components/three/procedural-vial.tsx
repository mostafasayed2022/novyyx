"use client";

import * as React from "react";
import * as THREE from "three";

interface ProceduralVialProps {
  productName?: string;
  purity?: number;
  lotId?: string;
  glowColor?: string;
}

/**
 * ProceduralVial
 * Precision-machined 3D pharmaceutical laboratory vial for NOVYX Labs™.
 * Features physical borosilicate glass transmission, aluminium crimp cap,
 * butyl septum stopper, internal peptide matrix, and pharmaceutical label.
 */
export function ProceduralVial({
  productName = "NŌVYX Labs™",
  purity = 99.82,
  lotId = "NVX-2026-CUT-0042",
  glowColor = "#00D2FF",
}: ProceduralVialProps) {
  // Generate high-resolution pharmaceutical label texture via HTML5 canvas
  const labelTexture = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Label background (clean off-white clinical stock)
    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle blue edge guide line
    ctx.fillStyle = "#1769E0";
    ctx.fillRect(0, 0, 8, canvas.height);

    // 1. Draw Official NOVYX Camera Shutter / Vortex Circular Logo
    const logoX = 220;
    const logoY = 110;
    const logoR = 36;

    // Draw 4 circular vortex blades
    ctx.save();
    ctx.translate(logoX, logoY);
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.fillStyle = "#0B1528";
      ctx.arc(0, 0, logoR, -Math.PI / 6, Math.PI / 3);
      ctx.lineTo(logoR * 0.45, 0);
      ctx.closePath();
      ctx.fill();
    }

    // Glowing cyan optical core in center
    const radialGlow = ctx.createRadialGradient(0, 0, 2, 0, 0, 16);
    radialGlow.addColorStop(0, "#FFFFFF");
    radialGlow.addColorStop(0.3, "#00D2FF");
    radialGlow.addColorStop(0.7, "#1769E0");
    radialGlow.addColorStop(1, "transparent");
    ctx.fillStyle = radialGlow;
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Official Brand Typography: NOVYX CUTIS
    ctx.fillStyle = "#0B1528";
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("NŌVYX", logoX, 200);

    ctx.font = "900 42px sans-serif";
    ctx.fillText(productName.replace(/^(?:NŌVYX|NOVYX)\s*/i, ""), logoX, 246);

    // 3. Formula Active Ingredients List
    ctx.textAlign = "left";
    ctx.fillStyle = "#1E293B";
    ctx.font = "600 20px sans-serif";
    const startY = 295;
    ctx.fillText("GHK-Cu", 120, startY);
    ctx.fillText("PN", 120, startY + 28);
    ctx.fillText("PDRN", 120, startY + 56);
    ctx.fillText("Acetyl Octapeptide-3", 120, startY + 84);

    // Thin separator line
    ctx.strokeStyle = "#94A3B8";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(120, startY + 98);
    ctx.lineTo(320, startY + 98);
    ctx.stroke();

    // Label footer microcopy
    ctx.fillStyle = "#334155";
    ctx.font = "bold 14px monospace";
    ctx.fillText("IVI L", 120, startY + 150);

    // Right Side Quality Dossier Stamp
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 18px monospace";
    ctx.fillText(`LOT NO: ${lotId}`, 580, 160);
    ctx.fillText(`HPLC PURITY: ${purity}% (SINGLE PEAK)`, 580, 200);
    ctx.fillText("SYNTHESIS: AUTOMATED MICROWAVE SPPS", 580, 240);
    ctx.fillText("CLASS 10,000 CLEANROOM // ISO 9001:2015", 580, 280);

    ctx.strokeStyle = "#287BFF";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(580, 320, 320, 120);
    ctx.fillStyle = "#287BFF";
    ctx.font = "bold 22px monospace";
    ctx.fillText("ANALYTICAL VERIFICATION", 605, 365);
    ctx.font = "bold 16px monospace";
    ctx.fillText("RESEARCH-USE ONLY (RUO)", 625, 405);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = 8;
    return texture;
  }, [productName, purity, lotId]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Glass Vial Body (Outer Borosilicate Shell) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 2.6, 64]} />
        <meshPhysicalMaterial
          transmission={0.92}
          roughness={0.06}
          metalness={0.05}
          ior={1.52}
          thickness={0.4}
          transparent={true}
          opacity={0.88}
          color="#E6F2FF"
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* 2. Glass Vial Shoulder & Taper */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.55, 0.85, 0.35, 64]} />
        <meshPhysicalMaterial
          transmission={0.92}
          roughness={0.06}
          metalness={0.05}
          ior={1.52}
          thickness={0.4}
          transparent={true}
          opacity={0.88}
          color="#E6F2FF"
        />
      </mesh>

      {/* 3. Glass Neck */}
      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.25, 64]} />
        <meshPhysicalMaterial
          transmission={0.9}
          roughness={0.08}
          metalness={0.05}
          ior={1.5}
          transparent={true}
          opacity={0.88}
          color="#E6F2FF"
        />
      </mesh>

      {/* 4. Glass Lip Ring */}
      <mesh position={[0, 1.82, 0]}>
        <torusGeometry args={[0.56, 0.06, 24, 64]} />
        <meshPhysicalMaterial
          transmission={0.9}
          roughness={0.08}
          ior={1.5}
          transparent={true}
          opacity={0.9}
          color="#E6F2FF"
        />
      </mesh>

      {/* 5. Aluminium Crimp Collar Cap */}
      <mesh position={[0, 1.88, 0]}>
        <cylinderGeometry args={[0.59, 0.59, 0.22, 64]} />
        <meshStandardMaterial
          color="#D1D5DB"
          metalness={0.92}
          roughness={0.16}
        />
      </mesh>

      {/* 6. Butyl Rubber Septum Stopper (Center Top) */}
      <mesh position={[0, 1.98, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 32]} />
        <meshStandardMaterial
          color="#1E293B"
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      {/* 7. Internal Lyophilized Azure Peptide Cake */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 1.1, 48]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={0.35}
          roughness={0.35}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 8. Meniscus Liquid Interface */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 0.75, 48]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 9. Pharmaceutical Clinical Label Sleeve */}
      {labelTexture && (
        <mesh position={[0, 0.1, 0]} rotation={[0, -Math.PI / 3, 0]}>
          <cylinderGeometry args={[0.86, 0.86, 1.35, 64, 1, true, 0, Math.PI * 1.5]} />
          <meshBasicMaterial
            map={labelTexture}
            side={THREE.DoubleSide}
            transparent={false}
          />
        </mesh>
      )}

      {/* 10. Vial Base Cushion (Bottom Disc) */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.08, 48]} />
        <meshPhysicalMaterial
          transmission={0.88}
          roughness={0.1}
          color="#E6F2FF"
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
