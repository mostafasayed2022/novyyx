export type PeptideCategory =
  | "longevity"
  | "metabolic"
  | "cellular-repair"
  | "cognitive"
  | "immunology"
  | "custom-synthesis";

export interface HPLCReport {
  retentionTimeMinutes: number;
  areaUnderCurvePercentage: number;
  solventGradient: string;
  columnType: string;
  flowRate: string;
  chartDataPoints: Array<{ time: number; absorbance: number }>;
}

export interface MassSpectrometryReport {
  theoreticalMass: number;
  observedMass: number;
  massAccuracyPpm: number;
  ionizationMode: "ESI+" | "ESI-" | "MALDI-TOF";
}

export interface ProductCertificate {
  id?: string;
  batchId: string;
  batchNumber?: string;
  productSlug?: string;
  productName?: string;
  casNumber?: string;
  manufacturingDate: string;
  expiryDate: string;
  verifiedPurity: number;
  hplcReport: HPLCReport;
  massSpecReport: MassSpectrometryReport;
  analyst: string;
  certifiedLab: string;
  downloadUrl?: string;
  specifications?: Record<string, string>;
  issuedAt?: string;
}

export interface ProductTranslation {
  scientificName?: string;
  tagline?: string;
  description?: string;
  form?: string;
  storageConditions?: string;
  reconstitutionNotes?: string;
}

export type ProductType = "peptide" | "skin-booster";

export interface PeptideProduct {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  category: PeptideCategory;
  productType?: ProductType;
  published?: boolean;
  tagline: string;
  description: string;
  sequence: string;
  casNumber: string;
  molecularFormula: string;
  molecularWeight: number; // in g/mol
  purity: number; // e.g. 99.6
  form: "Lyophilized Powder" | "Solution" | "Sublingual Matrix";
  storageConditions: string;
  reconstitutionNotes: string;
  price: number;
  vialSizeMg: number;
  inStock: boolean;
  featured: boolean;
  model3dUrl?: string;
  imageUrl: string;
  certificates: ProductCertificate[];
  specifications: Record<string, string>;
  translations?: { de?: ProductTranslation };
}
