import { apiClient, API_BASE_URL } from "./client";
import { mockRepository } from "./mock-repository";
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
  DRFResponse,
} from "./types";

/**
 * ==============================================================================
 * NOVYX API ENDPOINTS & DISPATCHER
 * Encapsulates the browser-facing API contract. The default base URL targets the
 * Next.js Route Handlers in this same application, with the mock repository available for development.
 * ==============================================================================
 */

export const isMockApiEnabled = (): boolean => {
  const mockRequested = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
  const productionOverride =
    process.env.ALLOW_MOCK_API_IN_PRODUCTION === "true";

  if (process.env.NODE_ENV === "production") {
    return mockRequested && productionOverride;
  }

  return mockRequested;
};

/**
 * Local development resilience:
 * - If the Next.js API is unavailable, read-only API calls can fall back to the bundled
 *   repository so UI development remains usable.
 * - Production never falls back automatically.
 * - Mutations (contact/partner inquiries) never use this automatic fallback,
 *   so the UI cannot report a fake successful submission.
 *
 * Set NEXT_PUBLIC_API_FALLBACK_TO_MOCK=false to disable the local fallback.
 */
const isDevelopmentReadFallbackEnabled = (): boolean =>
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_API_FALLBACK_TO_MOCK !== "false";

const NETWORK_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ERR_NETWORK",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ENOTFOUND",
  "EAI_AGAIN",
  "HTTP_NETWORK_ERROR",
]);

const isNetworkFailure = (error: unknown): boolean => {
  const err = error as { statusCode?: number; code?: string } | null;
  return Boolean(
    err &&
      !err.statusCode &&
      typeof err.code === "string" &&
      NETWORK_ERROR_CODES.has(err.code)
  );
};

async function withDevelopmentMockFallback<T>(
  label: string,
  request: () => Promise<T>,
  fallback: () => Promise<T>
): Promise<T> {
  try {
    return await request();
  } catch (error: unknown) {
    if (isDevelopmentReadFallbackEnabled() && isNetworkFailure(error)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[NOVYX API] ${label}: ${API_BASE_URL} is unavailable; using local mock data for this read request.`
        );
      }
      return fallback();
    }

    throw error;
  }
}

/**
 * API Endpoints Registry
 */
export const API_ENDPOINTS = {
  products: {
    list: "/products",
    detail: (slug: string) => `/products/${slug}`,
    certificates: (slug: string) => `/products/${slug}/certificates`,
    documents: (slug: string) => `/products/${slug}/documents`,
  },
  categories: {
    list: "/product-categories",
  },
  science: {
    content: "/science/",
  },
  quality: {
    content: "/quality/",
  },
  certificates: {
    list: "/certificates/",
    detail: (id: string) => `/certificates/${id}/`,
  },
  batches: {
    detail: (batchNumber: string) => `/batches/${batchNumber}/`,
    coa: (batchNumber: string) => `/batches/${batchNumber}/coa/`,
  },
  inquiries: {
    contact: "/contact",
    partner: "/partner-inquiries",
  },
  siteSettings: "/site-settings/",
  pages: {
    detail: (slug: string) => `/pages/${slug}/`,
  },
} as const;

// ==============================================================================
// ENDPOINT FUNCTIONS
// ==============================================================================

/**
 * GET /products/
 */
export async function getProducts(
  params?: ProductQueryParams
): Promise<Product[]> {
  if (isMockApiEnabled()) {
    return mockRepository.getProducts(params);
  }

  return withDevelopmentMockFallback(
    "GET /products/",
    async () => {
      const res = await apiClient.get<DRFResponse<Product[]> | Product[]>(
        API_ENDPOINTS.products.list,
        { params }
      );

      if (res.data && "results" in res.data && Array.isArray(res.data.results)) {
        return res.data.results;
      }
      return res.data as Product[];
    },
    () => mockRepository.getProducts(params)
  );
}

/**
 * GET /products/{slug}/
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isMockApiEnabled()) {
    return mockRepository.getProductBySlug(slug);
  }

  return withDevelopmentMockFallback(
    `GET /products/${slug}/`,
    async () => {
      try {
        const res = await apiClient.get<Product>(
          API_ENDPOINTS.products.detail(slug)
        );
        return res.data;
      } catch (error: unknown) {
        const err = error as { statusCode?: number };
        if (err?.statusCode === 404) return null;
        throw error;
      }
    },
    () => mockRepository.getProductBySlug(slug)
  );
}

/**
 * GET /product-categories/
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
  if (isMockApiEnabled()) {
    return mockRepository.getProductCategories();
  }

  return withDevelopmentMockFallback(
    "GET /product-categories/",
    async () => {
      const res = await apiClient.get<DRFResponse<ProductCategory[]> | ProductCategory[]>(
        API_ENDPOINTS.categories.list
      );

      if (res.data && "results" in res.data && Array.isArray(res.data.results)) {
        return res.data.results;
      }
      return res.data as ProductCategory[];
    },
    () => mockRepository.getProductCategories()
  );
}

/**
 * GET /science/
 */
export async function getScienceContent(): Promise<ScienceContent> {
  if (isMockApiEnabled()) {
    return mockRepository.getScienceContent();
  }

  return withDevelopmentMockFallback(
    "GET /science/",
    async () => {
      const res = await apiClient.get<ScienceContent>(API_ENDPOINTS.science.content);
      return res.data;
    },
    () => mockRepository.getScienceContent()
  );
}

/**
 * GET /quality/
 */
export async function getQualityContent(): Promise<QualityContent> {
  if (isMockApiEnabled()) {
    return mockRepository.getQualityContent();
  }

  return withDevelopmentMockFallback(
    "GET /quality/",
    async () => {
      const res = await apiClient.get<QualityContent>(API_ENDPOINTS.quality.content);
      return res.data;
    },
    () => mockRepository.getQualityContent()
  );
}

/**
 * GET /certificates/
 */
export async function getCertificates(): Promise<Certificate[]> {
  if (isMockApiEnabled()) {
    return mockRepository.getCertificates();
  }

  return withDevelopmentMockFallback(
    "GET /certificates/",
    async () => {
      const res = await apiClient.get<DRFResponse<Certificate[]> | Certificate[]>(
        API_ENDPOINTS.certificates.list
      );

      if (res.data && "results" in res.data && Array.isArray(res.data.results)) {
        return res.data.results;
      }
      return res.data as Certificate[];
    },
    () => mockRepository.getCertificates()
  );
}

/**
 * GET /certificates/{id}/
 */
export async function getCertificateById(id: string): Promise<Certificate | null> {
  if (isMockApiEnabled()) {
    return mockRepository.getCertificateById(id);
  }

  return withDevelopmentMockFallback(
    `GET /certificates/${id}/`,
    async () => {
      try {
        const res = await apiClient.get<Certificate>(
          API_ENDPOINTS.certificates.detail(id)
        );
        return res.data;
      } catch (error: unknown) {
        const err = error as { statusCode?: number };
        if (err?.statusCode === 404) return null;
        throw error;
      }
    },
    () => mockRepository.getCertificateById(id)
  );
}

/**
 * GET /products/{slug}/certificates/
 */
export async function getProductCertificates(
  slug: string
): Promise<Certificate[]> {
  if (isMockApiEnabled()) {
    return mockRepository.getProductCertificates(slug);
  }

  return withDevelopmentMockFallback(
    `GET /products/${slug}/certificates/`,
    async () => {
      const res = await apiClient.get<DRFResponse<Certificate[]> | Certificate[]>(
        API_ENDPOINTS.products.certificates(slug)
      );

      if (res.data && "results" in res.data && Array.isArray(res.data.results)) {
        return res.data.results;
      }
      return res.data as Certificate[];
    },
    () => mockRepository.getProductCertificates(slug)
  );
}

/**
 * GET /products/{slug}/documents/
 */
export async function getProductDocuments(
  slug: string
): Promise<ProductDocument[]> {
  if (isMockApiEnabled()) {
    return mockRepository.getProductDocuments(slug);
  }

  return withDevelopmentMockFallback(
    `GET /products/${slug}/documents/`,
    async () => {
      const res = await apiClient.get<DRFResponse<ProductDocument[]> | ProductDocument[]>(
        API_ENDPOINTS.products.documents(slug)
      );

      if (res.data && "results" in res.data && Array.isArray(res.data.results)) {
        return res.data.results;
      }
      return res.data as ProductDocument[];
    },
    () => mockRepository.getProductDocuments(slug)
  );
}

/**
 * GET /batches/{batch_number}/
 */
export async function getBatchByNumber(batchNumber: string): Promise<Batch | null> {
  if (isMockApiEnabled()) {
    return mockRepository.getBatchByNumber(batchNumber);
  }

  return withDevelopmentMockFallback(
    `GET /batches/${batchNumber}/`,
    async () => {
      try {
        const res = await apiClient.get<Batch>(
          API_ENDPOINTS.batches.detail(batchNumber)
        );
        return res.data;
      } catch (error: unknown) {
        const err = error as { statusCode?: number };
        if (err?.statusCode === 404) return null;
        throw error;
      }
    },
    () => mockRepository.getBatchByNumber(batchNumber)
  );
}

/**
 * GET /batches/{batch_number}/coa/
 */
export async function getBatchCoa(batchNumber: string): Promise<Certificate | null> {
  if (isMockApiEnabled()) {
    return mockRepository.getBatchCoa(batchNumber);
  }

  return withDevelopmentMockFallback(
    `GET /batches/${batchNumber}/coa/`,
    async () => {
      try {
        const res = await apiClient.get<Certificate>(
          API_ENDPOINTS.batches.coa(batchNumber)
        );
        return res.data;
      } catch (error: unknown) {
        const err = error as { statusCode?: number };
        if (err?.statusCode === 404) return null;
        throw error;
      }
    },
    () => mockRepository.getBatchCoa(batchNumber)
  );
}

/**
 * POST /contact/
 */
export async function submitContact(
  payload: ContactPayload
): Promise<{ success: boolean; ticketId: string; message: string }> {
  if (isMockApiEnabled()) {
    return mockRepository.submitContact(payload);
  }

  const res = await apiClient.post<{ success: boolean; ticketId: string; message: string }>(
    API_ENDPOINTS.inquiries.contact,
    payload
  );
  return res.data;
}

/**
 * POST /partner-inquiries/
 */
export async function submitPartnerInquiry(
  payload: PartnerInquiryPayload
): Promise<{ success: boolean; inquiryId: string; message: string }> {
  if (isMockApiEnabled()) {
    return mockRepository.submitPartnerInquiry(payload);
  }

  const res = await apiClient.post<{ success: boolean; inquiryId: string; message: string }>(
    API_ENDPOINTS.inquiries.partner,
    payload
  );
  return res.data;
}

/**
 * GET /site-settings/
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isMockApiEnabled()) {
    return mockRepository.getSiteSettings();
  }

  return withDevelopmentMockFallback(
    "GET /site-settings/",
    async () => {
      const res = await apiClient.get<SiteSettings>(API_ENDPOINTS.siteSettings);
      return res.data;
    },
    () => mockRepository.getSiteSettings()
  );
}

/**
 * GET /pages/{slug}/
 */
export async function getPageContent(slug: string): Promise<PageContent | null> {
  if (isMockApiEnabled()) {
    return mockRepository.getPageContent(slug);
  }

  return withDevelopmentMockFallback(
    `GET /pages/${slug}/`,
    async () => {
      try {
        const res = await apiClient.get<PageContent>(
          API_ENDPOINTS.pages.detail(slug)
        );
        return res.data;
      } catch (error: unknown) {
        const err = error as { statusCode?: number };
        if (err?.statusCode === 404) return null;
        throw error;
      }
    },
    () => mockRepository.getPageContent(slug)
  );
}
