import { useQuery, useMutation, UseQueryOptions } from "@tanstack/react-query";
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
  ApiError,
} from "./types";
import {
  getProducts,
  getProductBySlug,
  getProductCategories,
  getScienceContent,
  getQualityContent,
  getCertificates,
  getCertificateById,
  getProductCertificates,
  getProductDocuments,
  getBatchByNumber,
  getBatchCoa,
  submitContact,
  submitPartnerInquiry,
  getSiteSettings,
  getPageContent,
} from "./endpoints";
import { queryKeys } from "./queryKeys";

/**
 * ==============================================================================
 * NOVYX TANSTACK REACT QUERY HOOKS
 * Cleanly decouples UI components from Axios and data resolution logic.
 * Supports SSR initialData, stale-while-revalidate, and standardized error states.
 * ==============================================================================
 */

/**
 * Hook to retrieve products catalog with optional category/search filters
 */
export function useProducts(
  params?: ProductQueryParams | string,
  options?: Omit<UseQueryOptions<Product[], ApiError>, "queryKey" | "queryFn">
) {
  const normalizedParams: ProductQueryParams | undefined =
    typeof params === "string" ? { category: params } : params;

  return useQuery<Product[], ApiError>({
    queryKey: queryKeys.products.list(params),
    queryFn: () => getProducts(normalizedParams),
    ...options,
  });
}

/**
 * Hook to retrieve single product detail by slug
 */
export function useProduct(
  slug: string,
  options?: Omit<UseQueryOptions<Product | null, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<Product | null, ApiError>({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    ...options,
  });
}

/**
 * Backward compatibility alias for useProduct
 */
export const useProductBySlug = useProduct;

/**
 * Hook to retrieve product categories taxonomy
 */
export function useProductCategories(
  options?: Omit<UseQueryOptions<ProductCategory[], ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<ProductCategory[], ApiError>({
    queryKey: queryKeys.categories.lists(),
    queryFn: () => getProductCategories(),
    staleTime: 5 * 60 * 1000, // Categories are relatively static
    ...options,
  });
}

/**
 * Hook to retrieve all registered Certificates of Analysis
 */
export function useCertificates(
  options?: Omit<UseQueryOptions<Certificate[], ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<Certificate[], ApiError>({
    queryKey: queryKeys.certificates.lists(),
    queryFn: () => getCertificates(),
    ...options,
  });
}

/**
 * Hook to retrieve a single certificate by ID or Lot Number
 */
export function useCertificate(
  id: string,
  options?: Omit<UseQueryOptions<Certificate | null, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<Certificate | null, ApiError>({
    queryKey: queryKeys.certificates.detail(id),
    queryFn: () => getCertificateById(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * Hook to retrieve certificates associated with a product slug
 */
export function useProductCertificates(
  slug: string,
  options?: Omit<UseQueryOptions<Certificate[], ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<Certificate[], ApiError>({
    queryKey: queryKeys.products.certificates(slug),
    queryFn: () => getProductCertificates(slug),
    enabled: !!slug,
    ...options,
  });
}

/**
 * Hook to retrieve downloadable documents for a product
 */
export function useProductDocuments(
  slug: string,
  options?: Omit<UseQueryOptions<ProductDocument[], ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<ProductDocument[], ApiError>({
    queryKey: queryKeys.products.documents(slug),
    queryFn: () => getProductDocuments(slug),
    enabled: !!slug,
    ...options,
  });
}

/**
 * Hook to retrieve batch record by lot/batch number
 */
export function useBatch(
  batchNumber: string,
  options?: Omit<UseQueryOptions<Batch | null, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<Batch | null, ApiError>({
    queryKey: queryKeys.batches.detail(batchNumber),
    queryFn: () => getBatchByNumber(batchNumber),
    enabled: !!batchNumber,
    ...options,
  });
}

/**
 * Hook to retrieve COA by lot/batch number
 */
export function useBatchCoa(
  batchNumber: string,
  options?: Omit<UseQueryOptions<Certificate | null, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<Certificate | null, ApiError>({
    queryKey: queryKeys.batches.coa(batchNumber),
    queryFn: () => getBatchCoa(batchNumber),
    enabled: !!batchNumber && batchNumber.length >= 3,
    ...options,
  });
}

/**
 * Backward compatibility alias for verifying batches
 */
export function useBatchVerification(batchId: string) {
  return useBatchCoa(batchId);
}

/**
 * Hook to retrieve science and methodology content
 */
export function useScienceContent(
  options?: Omit<UseQueryOptions<ScienceContent, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<ScienceContent, ApiError>({
    queryKey: queryKeys.science.content(),
    queryFn: () => getScienceContent(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Hook to retrieve quality standards and pillars content
 */
export function useQualityContent(
  options?: Omit<UseQueryOptions<QualityContent, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<QualityContent, ApiError>({
    queryKey: queryKeys.quality.content(),
    queryFn: () => getQualityContent(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Hook to retrieve global site settings
 */
export function useSiteSettings(
  options?: Omit<UseQueryOptions<SiteSettings, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<SiteSettings, ApiError>({
    queryKey: queryKeys.siteSettings,
    queryFn: () => getSiteSettings(),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}

/**
 * Hook to retrieve content for a specific CMS/static page
 */
export function usePageContent(
  slug: string,
  options?: Omit<UseQueryOptions<PageContent | null, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<PageContent | null, ApiError>({
    queryKey: queryKeys.pages.detail(slug),
    queryFn: () => getPageContent(slug),
    enabled: !!slug,
    ...options,
  });
}

/**
 * Mutation hook for submitting institutional contact inquiry
 */
export function useSubmitContact() {
  return useMutation<
    { success: boolean; ticketId: string; message: string },
    ApiError,
    ContactPayload
  >({
    mutationFn: (payload: ContactPayload) => submitContact(payload),
  });
}

/**
 * Mutation hook for submitting institutional partnership inquiry
 */
export function useSubmitPartnerInquiry() {
  return useMutation<
    { success: boolean; inquiryId: string; message: string },
    ApiError,
    PartnerInquiryPayload
  >({
    mutationFn: (payload: PartnerInquiryPayload) =>
      submitPartnerInquiry(payload),
  });
}
