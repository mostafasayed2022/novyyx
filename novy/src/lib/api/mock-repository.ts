import { MOCK_PRODUCTS } from "@/data/mock-products";
import {
  Product,
  ProductCategory,
  Certificate,
  Batch,
  ProductDocument,
  ProductQueryParams,
  ScienceContent,
  QualityContent,
  SiteSettings,
  PageContent,
  ContactPayload,
  PartnerInquiryPayload,
} from "./types";

/**
 * ==============================================================================
 * NOVYX MOCK DATA REPOSITORY
 * Centralized offline / development repository matching future DRF endpoints.
 * Simulates asynchronous network latency and database lookups.
 * ==============================================================================
 */

const delay = (ms: number = 180) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// --- Mock Categories ---
export const MOCK_CATEGORIES: ProductCategory[] = [
  {
    id: "cat-longevity",
    slug: "longevity",
    name: "Cellular Longevity",
    description:
      "Advanced peptides formulated to modulate epigenetic aging, telomere dynamics, and mitochondrial bioenergetics.",
    productCount: 2,
    featured: true,
  },
  {
    id: "cat-cellular-repair",
    slug: "cellular-repair",
    name: "Tissue Regeneration",
    description:
      "High-affinity compounds designed to accelerate extracellular matrix remodeling, angiogenesis, and collagen synthesis.",
    productCount: 2,
    featured: true,
  },
  {
    id: "cat-metabolic",
    slug: "metabolic",
    name: "Metabolic Precision",
    description:
      "Targeted GLP/GIP dual-agonist analogs and metabolic regulators synthesized for research laboratory investigations.",
    productCount: 3,
    featured: true,
  },
  {
    id: "cat-cognitive",
    slug: "cognitive",
    name: "Cognitive Optimization",
    description:
      "Neurotrophic factors and nootropic neuropeptides engineered to support synaptic plasticity and BDNF expression.",
    productCount: 2,
    featured: false,
  },
  {
    id: "cat-immunology",
    slug: "immunology",
    name: "Immunology & Host Defense",
    description:
      "Thymic peptides and antimicrobial sequences modulating innate immune cell activity and cytokine homeostasis.",
    productCount: 1,
    featured: false,
  },
  {
    id: "cat-custom",
    slug: "custom-synthesis",
    name: "Custom Synthesis",
    description:
      "Gram-to-kilogram cGMP solid-phase synthesis with custom isotopic labeling and modified terminal capping.",
    productCount: 0,
    featured: false,
  },
];

// --- Mock Products with Hydrated Certificate Models ---
export const MOCK_REPOSITORY_PRODUCTS: Product[] = MOCK_PRODUCTS.map((p) => ({
  ...p,
  certificates: p.certificates.map((cert) => ({
    id: `cert-${cert.batchId.toLowerCase()}`,
    batchId: cert.batchId,
    batchNumber: cert.batchId,
    productSlug: p.slug,
    productName: p.name,
    casNumber: p.casNumber,
    manufacturingDate: cert.manufacturingDate,
    expiryDate: cert.expiryDate,
    verifiedPurity: cert.verifiedPurity,
    analyst: cert.analyst,
    certifiedLab: cert.certifiedLab,
    downloadUrl: cert.downloadUrl || `/certificates/${cert.batchId.toLowerCase()}.pdf`,
    hplcReport: cert.hplcReport,
    massSpecReport: cert.massSpecReport,
    specifications: p.specifications,
    issuedAt: `${cert.manufacturingDate}T09:30:00Z`,
  })),
}));

// --- Mock Certificates & Batches derived from Products ---
const derivedCertificates: Certificate[] = MOCK_REPOSITORY_PRODUCTS.flatMap(
  (p) => p.certificates as Certificate[]
);

const derivedBatches: Batch[] = derivedCertificates.map((cert) => {
  const batchNum = cert.batchNumber || cert.batchId;
  return {
    id: `batch-${batchNum.toLowerCase()}`,
    batchNumber: batchNum,
    productSlug: cert.productSlug || "",
    productName: cert.productName || "",
    manufacturingDate: cert.manufacturingDate,
    expiryDate: cert.expiryDate,
    verifiedPurity: cert.verifiedPurity,
    analyst: cert.analyst,
    certifiedLab: cert.certifiedLab,
    status: "certified",
    certificateId: cert.id || `cert-${batchNum.toLowerCase()}`,
    coaUrl: cert.downloadUrl,
  };
});

// --- Mock Documents ---
const MOCK_DOCUMENTS: Record<string, ProductDocument[]> = {
  "novax-cutis": [
    {
      id: "doc-cutis-coa",
      title: "Certificate of Analysis (Lot #NVX-2026-CUT-0042)",
      fileType: "PDF",
      fileSize: "1.4 MB",
      documentType: "COA",
      url: "/docs/NVX-2026-CUT-0042-COA.pdf",
      uploadedAt: "2026-03-12",
    },
    {
      id: "doc-cutis-msds",
      title: "Material Safety Data Sheet (GHK-Cu / Pal-GHK)",
      fileType: "PDF",
      fileSize: "420 KB",
      documentType: "MSDS",
      url: "/docs/NOVYX-CUTIS-MSDS.pdf",
      uploadedAt: "2026-01-15",
    },
    {
      id: "doc-cutis-hplc",
      title: "High-Resolution Dual-Wavelength HPLC Raw Spectra Data",
      fileType: "CSV",
      fileSize: "2.8 MB",
      documentType: "HPLC_RAW",
      url: "/docs/NVX-CUTIS-HPLC-SPECTRA.csv",
      uploadedAt: "2026-03-12",
    },
  ],
};

// --- Mock Science Content ---
export const MOCK_SCIENCE_CONTENT: ScienceContent = {
  articles: [
    {
      id: "art-1",
      slug: "microwave-assisted-solid-phase-synthesis",
      title: "Microwave-Assisted Solid Phase Peptide Synthesis: Overcoming Aggregation",
      subtitle: "Thermodynamic energy dispersal during sterically hindered amino acid coupling.",
      category: "synthesis",
      publishedAt: "2026-02-14",
      readTimeMinutes: 7,
      summary:
        "Conventional peptide synthesis suffers from intra-chain folding and hydrophobic beta-sheet aggregation during elongated sequence assembly. Microwave irradiation disrupts secondary structures, elevating crude purity yields beyond 95%.",
    },
    {
      id: "art-2",
      slug: "dual-wavelength-hplc-analytical-verification",
      title: "Dual-Wavelength HPLC & ESI-TOF Mass Spectrometry Standards",
      subtitle: "Why single-wavelength UV detection fails to reveal peptide deletion impurities.",
      category: "mechanism",
      publishedAt: "2026-01-28",
      readTimeMinutes: 9,
      summary:
        "Detection at both 214nm (peptide bonds) and 280nm (aromatic side chains) coupled with high-resolution electrospray ionization prevents false-positive single-peak reporting.",
    },
    {
      id: "art-3",
      slug: "ghk-cu-stoichiometric-chelation-kinetics",
      title: "Copper Tripeptide (GHK-Cu) Stoichiometric Chelation Kinetics",
      subtitle: "Spectrophotometric titration of Cu(II) complexes and ligand affinity constants.",
      category: "stability",
      publishedAt: "2025-11-19",
      readTimeMinutes: 6,
      summary:
        "Analysis of log K stability constants (log K = 16.4) demonstrates why sub-stoichiometric copper preparation leads to unbound pro-oxidant copper ions.",
    },
  ],
  methodologies: [
    {
      title: "Sub-Nanomolar In-Silico Molecular Docking",
      description:
        "Computational conformational sweeps verify stereochemical stability and target receptor docking before synthesis begins.",
      metrics: "RMSD < 0.4 Å",
    },
    {
      title: "Continuous Temperature-Regulated SPPS",
      description:
        "Precise nitrogen purging and microfluidic reagent pulsing eliminate racemization during chiral amino acid coupling.",
      metrics: "Coupling Efficiency ≥ 99.7%",
    },
    {
      title: "Cryogenic Supercritical Lyophilization",
      description:
        "Deep-freeze sublimation preserves tertiary peptide integrity and creates instantly resolubilizing crystalline matrices.",
      metrics: "Residual Moisture < 1.0%",
    },
  ],
  synthesisStandards: [
    "Fmoc-Solid Phase Peptide Synthesis (SPPS)",
    "High-Performance Liquid Chromatography (RP-HPLC)",
    "Electrospray Ionization Quadrupole Time-of-Flight (ESI-QTOF)",
    "Limulus Amebocyte Lysate Endotoxin Testing (USP <85>)",
    "Nuclear Magnetic Resonance Spectrometry (1H-NMR)",
  ],
};

// --- Mock Quality Content ---
export const MOCK_QUALITY_CONTENT: QualityContent = {
  standards: [
    {
      code: "ISO 9001:2015",
      name: "Quality Management Systems",
      body: "International Organization for Standardization",
      description:
        "Rigorous systematic controls governing raw material provenance, traceability, and manufacturing reproducibility.",
    },
    {
      code: "cGMP Part 211",
      name: "Current Good Manufacturing Practice",
      body: "US FDA / EMA Aligned Guidelines",
      description:
        "Class 10,000 (ISO 7) and Class 100 (ISO 5) laminar flow cleanroom environments with automated environmental monitoring.",
    },
    {
      code: "ISO/IEC 17025",
      name: "Testing and Calibration Laboratories",
      body: "ILAC Mutual Recognition Arrangement",
      description:
        "Independent third-party analytical laboratory verification and calibration assurance for all analytical equipment.",
    },
  ],
  testingPillars: [
    {
      title: "Chromatographic Purity",
      metric: "≥ 99.5% by HPLC",
      description:
        "Every batch must exhibit a single dominant elution peak with total non-target peptide impurities under 0.5%.",
    },
    {
      title: "Endotoxin Safety",
      metric: "< 0.05 EU/mg",
      description:
        "Quantified via turbidimetric LAL kinetic assays, far exceeding baseline laboratory requirements.",
    },
    {
      title: "Sequence Identity",
      metric: "ΔMass < 2.5 ppm",
      description:
        "High-resolution mass spectrometry confirms exact atomic mass matches theoretical sequence specifications.",
    },
    {
      title: "Residual Solvent Level",
      metric: "< 0.01% (Headspace GC)",
      description:
        "Thermal desorption gas chromatography confirms complete elimination of acetonitrile, piperidine, and TFA.",
    },
  ],
  recentAudits: [
    {
      date: "2026-02-15",
      type: "ISO 9001:2015 Surveillance Audit",
      status: "Zero Non-Conformances",
    },
    {
      date: "2026-01-20",
      type: "Cleanroom Airborne Particle ISO 5 Recertification",
      status: "Passed 100%",
    },
    {
      date: "2025-11-10",
      type: "HPLC Calibration & Column Efficiency Audit",
      status: "Verified",
    },
  ],
};

// --- Mock Site Settings ---
export const MOCK_SITE_SETTINGS: SiteSettings = {
  siteName: "NOVYX Peptide Sciences",
  tagline: "Cellular Longevity & High-Affinity Peptide Synthesis",
  contactEmail: "inquiries@novax-labs.com",
  inquiriesEmail: "procurement@novax-labs.com",
  labLocation: "Geneva Biotech Campus, Switzerland / Cambridge Science Park, UK",
  supportHours: "Monday – Friday: 08:00 – 18:00 CET",
  minimumOrderQuantityMg: 5,
  isNoticeActive: false,
  noticeMessage: undefined,
  complianceDisclaimer:
    "All peptides cataloged and manufactured by NOVYX are strictly designated for laboratory in-vitro, ex-vivo, and scientific research purposes only. Not for direct human or clinical diagnostic administration.",
  socialLinks: {
    linkedin: "https://linkedin.com/company/novax-peptide-sciences",
    github: "https://github.com/novax-biotech",
    orcid: "https://orcid.org",
  },
};

// --- Mock Page Content ---
export const MOCK_PAGES: Record<string, PageContent> = {
  about: {
    id: "page-about",
    slug: "about",
    title: "The Architecture of Molecular Precision",
    subtitle:
      "NOVYX was founded to eliminate batch variability and non-standardized impurities from biotechnology research.",
    content:
      "Biotechnology research demands absolute chemical certainty. A single isomeric impurity or truncated deletion sequence can invalidate years of cellular assays. NOVYX provides absolute reproducibility through robotic microwave-assisted solid-phase synthesis and mandatory third-party analytical verification.",
    metaDescription:
      "Learn about the NOVYX standard: ultra-pure peptide synthesis, cleanroom synthesis, and dual-wavelength analytical verification.",
    updatedAt: "2026-03-01T12:00:00Z",
  },
  science: {
    id: "page-science",
    slug: "science",
    title: "Synthesis Technology & Analytical Chemistry",
    subtitle:
      "A deep dive into microwave SPPS, dual-wavelength RP-HPLC, and electrospray mass spectrometry.",
    content:
      "From in-silico conformational prediction to sub-nanomolar peptide sequence assembly, NOVYX utilizes advanced synthesis hardware to deliver high-affinity peptide matrices.",
    metaDescription:
      "Detailed scientific methodology behind NOVYX peptide synthesis and analytical verification.",
    updatedAt: "2026-03-01T12:00:00Z",
  },
};

// ==============================================================================
// ASYNCHRONOUS REPOSITORY METHODS
// ==============================================================================

export const mockRepository = {
  /**
   * List all products with optional filters
   */
  async getProducts(params?: ProductQueryParams): Promise<Product[]> {
    await delay(160);
    let results = [...MOCK_REPOSITORY_PRODUCTS];

    if (params?.category && params.category !== "all") {
      results = results.filter((p) => p.category === params.category);
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.scientificName.toLowerCase().includes(q) ||
          p.casNumber.toLowerCase().includes(q) ||
          p.sequence.toLowerCase().includes(q)
      );
    }

    if (params?.featured !== undefined) {
      results = results.filter((p) => p.featured === params.featured);
    }

    if (params?.inStock !== undefined) {
      results = results.filter((p) => p.inStock === params.inStock);
    }

    if (params?.ordering) {
      if (params.ordering === "price") results.sort((a, b) => a.price - b.price);
      if (params.ordering === "-price") results.sort((a, b) => b.price - a.price);
      if (params.ordering === "purity") results.sort((a, b) => a.purity - b.purity);
      if (params.ordering === "-purity") results.sort((a, b) => b.purity - a.purity);
      if (params.ordering === "name") results.sort((a, b) => a.name.localeCompare(b.name));
      if (params.ordering === "-name") results.sort((a, b) => b.name.localeCompare(a.name));
    }

    return results;
  },

  /**
   * Get single product by slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    await delay(120);
    return MOCK_REPOSITORY_PRODUCTS.find((p) => p.slug === slug) || null;
  },

  /**
   * Get all product categories
   */
  async getProductCategories(): Promise<ProductCategory[]> {
    await delay(100);
    return MOCK_CATEGORIES;
  },

  /**
   * Get science platform content
   */
  async getScienceContent(): Promise<ScienceContent> {
    await delay(140);
    return MOCK_SCIENCE_CONTENT;
  },

  /**
   * Get quality assurance content
   */
  async getQualityContent(): Promise<QualityContent> {
    await delay(140);
    return MOCK_QUALITY_CONTENT;
  },

  /**
   * Get all certificates
   */
  async getCertificates(): Promise<Certificate[]> {
    await delay(120);
    return derivedCertificates;
  },

  /**
   * Get certificate by ID or batchNumber
   */
  async getCertificateById(id: string): Promise<Certificate | null> {
    await delay(100);
    const query = id.toLowerCase();
    return (
      derivedCertificates.find(
        (c) =>
          c.id?.toLowerCase() === query ||
          (c.batchNumber || c.batchId).toLowerCase() === query ||
          c.batchId.toLowerCase() === query
      ) || null
    );
  },

  /**
   * Get certificates for a specific product
   */
  async getProductCertificates(slug: string): Promise<Certificate[]> {
    await delay(110);
    return derivedCertificates.filter((c) => (c.productSlug || "") === slug);
  },

  /**
   * Get documents for a specific product
   */
  async getProductDocuments(slug: string): Promise<ProductDocument[]> {
    await delay(90);
    return MOCK_DOCUMENTS[slug] || [];
  },

  /**
   * Get batch by batch number
   */
  async getBatchByNumber(batchNumber: string): Promise<Batch | null> {
    await delay(110);
    const query = batchNumber.toLowerCase();
    return (
      derivedBatches.find((b) => b.batchNumber.toLowerCase() === query) || null
    );
  },

  /**
   * Get batch COA by batch number
   */
  async getBatchCoa(batchNumber: string): Promise<Certificate | null> {
    await delay(120);
    const query = batchNumber.toLowerCase();
    return (
      derivedCertificates.find(
        (c) => (c.batchNumber || c.batchId).toLowerCase() === query
      ) || null
    );
  },

  /**
   * Submit institutional contact inquiry
   */
  async submitContact(
    payload: ContactPayload
  ): Promise<{ success: boolean; ticketId: string; message: string }> {
    if (!payload.email || !payload.message) throw new Error("Email and message are required.");
    await delay(350);
    const ticketId = `NVX-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      success: true,
      ticketId,
      message: `Inquiry registered successfully. Ticket ${ticketId} dispatched to Geneva Scientific Advisory.`,
    };
  },

  /**
   * Submit institutional partnership inquiry
   */
  async submitPartnerInquiry(
    payload: PartnerInquiryPayload
  ): Promise<{ success: boolean; inquiryId: string; message: string }> {
    if (!payload.email) throw new Error("Email is required.");
    await delay(350);
    const inquiryId = `NVX-PARTNER-${Math.floor(10000 + Math.random() * 90000)}`;
    return {
      success: true,
      inquiryId,
      message: `Partnership proposal ${inquiryId} received. Advisory board will review within 24 hours.`,
    };
  },

  /**
   * Get global site settings
   */
  async getSiteSettings(): Promise<SiteSettings> {
    await delay(80);
    return MOCK_SITE_SETTINGS;
  },

  /**
   * Get content page by slug
   */
  async getPageContent(slug: string): Promise<PageContent | null> {
    await delay(90);
    return MOCK_PAGES[slug] || null;
  },
};
