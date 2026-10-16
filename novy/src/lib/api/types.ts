import { z } from "zod";
import { HPLCReport, MassSpectrometryReport } from "@/types/product";

/**
 * ==============================================================================
 * NOVYX BIOTECHNOLOGY DATA ARCHITECTURE — TYPES & CONTRACTS
 * Prepared for Django REST Framework (DRF) backend integration.
 * ==============================================================================
 */

// --- Category & Taxonomies ---

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  productCount?: number;
  featured?: boolean;
}

// --- Images & Assets ---

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  width?: number;
  height?: number;
}

// --- Specifications & Metrics ---

export interface ProductSpecification {
  id?: string;
  label: string;
  value: string;
  standard?: string;
}

// --- Analytical Reports & Certificates ---

export interface Certificate {
  id?: string;
  batchId: string;
  batchNumber?: string;
  productSlug?: string;
  productName?: string;
  casNumber?: string;
  manufacturingDate: string;
  expiryDate: string;
  verifiedPurity: number;
  analyst: string;
  certifiedLab: string;
  downloadUrl?: string;
  hplcReport: HPLCReport;
  massSpecReport: MassSpectrometryReport;
  specifications?: Record<string, string>;
  issuedAt?: string;
}

export type ProductCertificate = Certificate;

// --- Batches ---

export interface Batch {
  id: string;
  batchNumber: string;
  productSlug: string;
  productName: string;
  manufacturingDate: string;
  expiryDate: string;
  verifiedPurity: number;
  analyst: string;
  certifiedLab: string;
  status: "certified" | "in_analysis" | "quarantine";
  certificateId?: string;
  coaUrl?: string;
}

// --- Documents ---

export interface ProductDocument {
  id: string;
  title: string;
  fileType: "PDF" | "CSV" | "DOCX";
  fileSize: string;
  documentType: "COA" | "MSDS" | "NMR" | "HPLC_RAW";
  url: string;
  uploadedAt: string;
}

export type InquiryStatus = "new" | "in-progress" | "resolved";

// --- Core Product Model ---

export type PeptideCategory =
  | "longevity"
  | "metabolic"
  | "cellular-repair"
  | "cognitive"
  | "immunology"
  | "custom-synthesis";


export interface ProductTranslation {
  scientificName?: string;
  tagline?: string;
  description?: string;
  form?: string;
  storageConditions?: string;
  reconstitutionNotes?: string;
}

export type ProductType = "peptide" | "skin-booster";

export interface Product {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  category: PeptideCategory;
  productType?: ProductType;
  published?: boolean;
  categoryDetail?: ProductCategory;
  tagline: string;
  description: string;
  sequence: string;
  casNumber: string;
  molecularFormula: string;
  molecularWeight: number; // g/mol
  purity: number; // e.g. 99.82
  form: "Lyophilized Powder" | "Solution" | "Sublingual Matrix";
  storageConditions: string;
  reconstitutionNotes: string;
  price: number;
  vialSizeMg: number;
  inStock: boolean;
  featured: boolean;
  model3dUrl?: string;
  imageUrl: string;
  images?: ProductImage[];
  certificates: (Certificate | ProductCertificate)[];
  specifications: Record<string, string>;
  documents?: ProductDocument[];
  translations?: { de?: ProductTranslation; fr?: ProductTranslation };
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Backward compatibility alias for existing components
 */
export type PeptideProduct = Product;

// --- Query Parameters ---

export interface ProductQueryParams {
  category?: string;
  productType?: ProductType;
  search?: string;
  featured?: boolean;
  inStock?: boolean;
  limit?: number;
  offset?: number;
  ordering?: "price" | "-price" | "purity" | "-purity" | "name" | "-name";
}

// --- Science & Quality Content Models ---

export interface ScienceArticleSummary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "mechanism" | "synthesis" | "clinical-review" | "stability";
  publishedAt: string;
  readTimeMinutes: number;
  summary: string;
}

export interface ScienceContent {
  articles: ScienceArticleSummary[];
  methodologies: Array<{
    title: string;
    description: string;
    metrics: string;
  }>;
  synthesisStandards: string[];
}

export interface QualityContent {
  standards: Array<{
    code: string;
    name: string;
    body: string;
    description: string;
  }>;
  testingPillars: Array<{
    title: string;
    metric: string;
    description: string;
  }>;
  recentAudits: Array<{
    date: string;
    type: string;
    status: string;
  }>;
}

// --- Site Settings ---

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  inquiriesEmail: string;
  labLocation: string;
  supportHours: string;
  minimumOrderQuantityMg: number;
  isNoticeActive: boolean;
  noticeMessage?: string;
  complianceDisclaimer: string;
  socialLinks?: Record<string, string>;
}

// --- Content Pages ---

export interface PageSection {
  key: string;
  heading: string;
  body: string;
  badge?: string;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  sections?: PageSection[];
  metaDescription?: string;
  updatedAt: string;
}

// --- ZOD SCHEMAS & FORM PAYLOADS ---

export const contactPayloadSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid institutional email address"),
  company: z.string().min(2, "Organization name is required"),
  phone: z.string().min(6, "Valid phone number is required"),
  country: z.string().min(2, "Country is required"),
  representation: z.enum([
    "Clinic",
    "Laboratory",
    "Distributor",
    "Research organization",
    "Other",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export const partnerInquiryPayloadSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid institutional email required"),
  institution: z.string().min(2, "Institution/Organization name is required"),
  department: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  partnershipTier: z.enum([
    "academic",
    "clinical",
    "commercial_distributor",
    "custom_synthesis",
  ]),
  projectDescription: z.string().min(15, "Project description must be detailed"),
  estimatedVolumeMg: z.number().optional(),
});

export type PartnerInquiryPayload = z.infer<typeof partnerInquiryPayloadSchema>;

// --- Django REST Framework Envelope & Error Models ---

export interface DRFResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T;
}

export interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
  details?: Record<string, unknown>;
  statusCode?: number;
}
