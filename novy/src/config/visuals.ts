/**
 * NOVYX scientific background registry.
 *
 * Kept intentionally small: only image assets that are used by the current site remain.
 */

export type BackgroundCategory =
  | "light-scientific"
  | "light-pearl"
  | "dark-molecular"
  | "dark-laboratory";

export interface VisualAsset {
  id: string;
  fileName: string;
  path: string;
  category: BackgroundCategory;
  themeAffinity: "dark" | "light" | "both";
  title: string;
  description: string;
  accentColor: string;
  recommendedOverlayOpacity: {
    dark: number;
    light: number;
  };
  blur: "none" | "sm" | "md" | "lg";
}

export const NOVYX_BACKGROUND_CATALOG: Record<string, VisualAsset> = {
  novyx_bg_01_02: {
    id: "novyx_bg_01_02",
    fileName: "novyx_bg_01_02.webp",
    path: "/backgrounds/novyx_bg_01_02.webp",
    category: "light-pearl",
    themeAffinity: "light",
    title: "Pearl Architectural Cleanroom",
    description: "Sleek, high-luminance pharmaceutical laboratory space with soft pearl reflections.",
    accentColor: "#1769E0",
    recommendedOverlayOpacity: { dark: 0.2, light: 0.4 },
    blur: "none",
  },
  novyx_bg_02_01: {
    id: "novyx_bg_02_01",
    fileName: "novyx_bg_02_01.webp",
    path: "/backgrounds/novyx_bg_02_01.webp",
    category: "dark-molecular",
    themeAffinity: "dark",
    title: "Helical DNA & Amino Chain Core",
    description: "Cinematic double helix and peptide polymer chains illuminated by spectral blue photons.",
    accentColor: "#4B9DFF",
    recommendedOverlayOpacity: { dark: 0.42, light: 0.18 },
    blur: "none",
  },
  novyx_bg_02_02: {
    id: "novyx_bg_02_02",
    fileName: "novyx_bg_02_02.webp",
    path: "/backgrounds/novyx_bg_02_02.webp",
    category: "light-scientific",
    themeAffinity: "light",
    title: "Molecular Surface Topology",
    description: "Precision computer-assisted molecular modeling topology on clinical white background.",
    accentColor: "#1769E0",
    recommendedOverlayOpacity: { dark: 0.2, light: 0.38 },
    blur: "sm",
  },
  novyx_bg_03_01: {
    id: "novyx_bg_03_01",
    fileName: "novyx_bg_03_01.webp",
    path: "/backgrounds/novyx_bg_03_01.webp",
    category: "dark-laboratory",
    themeAffinity: "dark",
    title: "Precision Analytical Vials & Laser Spectrometry",
    description: "Sterile analytical vials under laser inspection in a dark graphite cleanroom.",
    accentColor: "#287BFF",
    recommendedOverlayOpacity: { dark: 0.45, light: 0.2 },
    blur: "none",
  },
  novyx_bg_04_01: {
    id: "novyx_bg_04_01",
    fileName: "novyx_bg_04_01.webp",
    path: "/backgrounds/novyx_bg_04_01.webp",
    category: "dark-laboratory",
    themeAffinity: "dark",
    title: "Graphite Research Library Vault",
    description: "Deep carbon architecture with subtle ambient blue accents.",
    accentColor: "#287BFF",
    recommendedOverlayOpacity: { dark: 0.45, light: 0.15 },
    blur: "none",
  },
  novyx_bg_04_02: {
    id: "novyx_bg_04_02",
    fileName: "novyx_bg_04_02.webp",
    path: "/backgrounds/novyx_bg_04_02.webp",
    category: "light-pearl",
    themeAffinity: "light",
    title: "Platinum Medical Laboratory Space",
    description: "Pristine pharmaceutical architectural suite with soft diffuse illumination.",
    accentColor: "#1769E0",
    recommendedOverlayOpacity: { dark: 0.2, light: 0.4 },
    blur: "none",
  },
};

/**
 * Section-to-visual mappings.
 * Some sections share assets deliberately so no unused image files are shipped.
 */
export const novaxVisuals = {
  hero: {
    dark: NOVYX_BACKGROUND_CATALOG.novyx_bg_04_01,
    light: NOVYX_BACKGROUND_CATALOG.novyx_bg_01_02,
  },
  science: {
    dark: NOVYX_BACKGROUND_CATALOG.novyx_bg_02_01,
    light: NOVYX_BACKGROUND_CATALOG.novyx_bg_02_02,
  },
  quality: {
    dark: NOVYX_BACKGROUND_CATALOG.novyx_bg_03_01,
    light: NOVYX_BACKGROUND_CATALOG.novyx_bg_04_02,
  },
  products: {
    dark: NOVYX_BACKGROUND_CATALOG.novyx_bg_04_01,
    light: NOVYX_BACKGROUND_CATALOG.novyx_bg_04_02,
  },
  professionals: {
    dark: NOVYX_BACKGROUND_CATALOG.novyx_bg_04_01,
    light: NOVYX_BACKGROUND_CATALOG.novyx_bg_04_02,
  },
  about: {
    dark: NOVYX_BACKGROUND_CATALOG.novyx_bg_04_01,
    light: NOVYX_BACKGROUND_CATALOG.novyx_bg_01_02,
  },
  contact: {
    dark: NOVYX_BACKGROUND_CATALOG.novyx_bg_03_01,
    light: NOVYX_BACKGROUND_CATALOG.novyx_bg_01_02,
  },
} as const;

export type SectionVisualKey = keyof typeof novaxVisuals;
