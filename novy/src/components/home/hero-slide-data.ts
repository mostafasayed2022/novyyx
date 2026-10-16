import { ROUTES } from "@/lib/constants/routes";

export interface HeroSlideMetric {
  label: string;
  value: string;
}

export interface HeroSlide {
  id: string;
  number: string;
  name: string;
  brand: string;
  eyebrow: string;
  eyebrowDe: string;
  eyebrowFr?: string;
  headlineMain: string;
  headlineSub: string;
  headlineSubDe: string;
  headlineSubFr?: string;
  category: string;
  categoryDe: string;
  categoryFr?: string;
  description: string;
  descriptionDe: string;
  descriptionFr?: string;
  image: string;
  isWideComposite?: boolean;
  badge: string;
  badgeDe: string;
  badgeFr?: string;
  metrics: HeroSlideMetric[];
  productLink: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "cutis", number: "01", name: "Labs™", brand: "NOVYX",
    eyebrow: "ENGINEERED FOR LONGEVITY", eyebrowDe: "ENTWICKELT FÜR LANGLEBIGKEIT",
    headlineMain: "SCIENCE", headlineSub: "BEYOND TIME", headlineSubDe: "JENSEITS DER ZEIT",
    category: "DERMAL BIOTECHNOLOGY", categoryDe: "DERMALE BIOTECHNOLOGIE",
    description: "Dual-vector extracellular matrix activation and type-I collagen synthesis with pharmaceutical-grade analytical purity.",
    descriptionDe: "Dualvektor-Aktivierung der extrazellulären Matrix und Typ-I-Kollagensynthese mit analytischer Reinheit auf pharmazeutischem Niveau.",
    image: "/products/Novyx Labs GHK-Cu Product Set.png", isWideComposite: true,
    badge: "FLAGSHIP MATRIX // 99.82% HPLC", badgeDe: "FLAGGSCHIFF-MATRIX // 99,82% HPLC",
    metrics: [{ label: "PURITY", value: "99.82%" }, { label: "VECTOR", value: "DUAL GHK" }],
    productLink: ROUTES.products,
  },
  {
    id: "ghk-cu", number: "02", name: "GHK-Cu", brand: "NOVYX",
    eyebrow: "CELLULAR ARCHITECTURE", eyebrowDe: "ZELLULÄRE ARCHITEKTUR",
    headlineMain: "REPAIR", headlineSub: "MATRIX REBIRTH", headlineSubDe: "MATRIX-REGENERATION",
    category: "COPPER TRIPEPTIDE COMPLEX", categoryDe: "KUPFER-TRIPEPTID-KOMPLEX",
    description: "Stoichiometrically chelated 1:1 copper tripeptide matrix designed for deep fibroblast rejuvenation and dermal density.",
    descriptionDe: "Stöchiometrisch chelatierte 1:1-Kupfertripeptid-Matrix für Fibroblastenregeneration und dermale Dichte.",
    image: "/products/novyx_ghk_cu_transparent.webp",
    badge: "50MG AZURE CORE // 1:1 AAS", badgeDe: "50MG AZURE CORE // 1:1 AAS",
    metrics: [{ label: "PURITY", value: "99.85%" }, { label: "CHELATION", value: "1:1 AAS" }],
    productLink: ROUTES.products,
  },
  {
    id: "bpc-157", number: "03", name: "BPC-157", brand: "NOVYX",
    eyebrow: "SYSTEMIC BIO-INTEGRITY", eyebrowDe: "SYSTEMISCHE BIO-INTEGRITÄT",
    headlineMain: "HEALING", headlineSub: "VASCULAR FLOW", headlineSubDe: "VASKULÄRER FLUSS",
    category: "CYTOPROTECTIVE SEQUENCE", categoryDe: "ZYTOPROTEKTIVE SEQUENZ",
    description: "Ultra-pure synthetic 15-amino acid pentadecapeptide sequence researched for accelerated soft tissue healing and cellular repair.",
    descriptionDe: "Hochreine synthetische 15-Aminosäuren-Pentadecapeptid-Sequenz für Forschungsarbeiten zu Weichgeweberegeneration und Zellreparatur.",
    image: "/products/novyx_bpc157_transparent.webp",
    badge: "10MG BIO-ACTIVE // GMP", badgeDe: "10MG BIO-AKTIV // GMP",
    metrics: [{ label: "PURITY", value: "99.91%" }, { label: "STANDARD", value: "GMP CLEANROOM" }],
    productLink: ROUTES.products,
  },
  {
    id: "retatrutide", number: "04", name: "Retatrutide", brand: "NOVYX",
    eyebrow: "METABOLIC MODULATION", eyebrowDe: "METABOLISCHE MODULATION",
    headlineMain: "ENERGY", headlineSub: "TRIPLE AGONIST", headlineSubDe: "TRIPLE-AGONIST",
    category: "GIP / GLP-1 / GLUCAGON", categoryDe: "GIP / GLP-1 / GLUKAGON",
    description: "Next-generation triple co-agonist peptide sequence engineered for clinical metabolic homeostasis and advanced receptor signaling.",
    descriptionDe: "Triple-Co-Agonist-Peptidsequenz der nächsten Generation für metabolische Homöostase und fortgeschrittene Rezeptorsignalgebung in der Forschung.",
    image: "/products/novyx_retatrutide_transparent.webp",
    badge: "30MG CLINICAL CORE // LC-MS", badgeDe: "30MG CLINICAL CORE // LC-MS",
    metrics: [{ label: "PURITY", value: "99.78%" }, { label: "STRUCTURE", value: "TRIPLE AGONIST" }],
    productLink: ROUTES.products,
  },
];
