import { ProductQueryParams } from "./types";

/**
 * ==============================================================================
 * NOVYX CENTRALIZED QUERY KEYS FACTORY
 * Provides hierarchical, type-safe cache keys for TanStack React Query.
 * Follows TanStack Query best practices for granular invalidation.
 * ==============================================================================
 */

export const queryKeys = {
  // Products
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (params?: ProductQueryParams | string) =>
      [...queryKeys.products.lists(), typeof params === "string" ? { category: params } : params ?? {}] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (slug: string) => [...queryKeys.products.details(), slug] as const,
    certificates: (slug: string) =>
      [...queryKeys.products.detail(slug), "certificates"] as const,
    documents: (slug: string) =>
      [...queryKeys.products.detail(slug), "documents"] as const,
  },

  // Categories
  categories: {
    all: ["categories"] as const,
    lists: () => [...queryKeys.categories.all, "list"] as const,
  },

  // Certificates of Analysis
  certificates: {
    all: ["certificates"] as const,
    lists: () => [...queryKeys.certificates.all, "list"] as const,
    details: () => [...queryKeys.certificates.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.certificates.details(), id] as const,
  },

  // Batches
  batches: {
    all: ["batches"] as const,
    details: () => [...queryKeys.batches.all, "detail"] as const,
    detail: (batchNumber: string) =>
      [...queryKeys.batches.details(), batchNumber] as const,
    coa: (batchNumber: string) =>
      [...queryKeys.batches.all, "coa", batchNumber] as const,
  },

  // Science & Research
  science: {
    all: ["science"] as const,
    content: () => [...queryKeys.science.all, "content"] as const,
  },

  // Quality & Accreditation
  quality: {
    all: ["quality"] as const,
    content: () => [...queryKeys.quality.all, "content"] as const,
    batch: (batchId: string) => [...queryKeys.quality.all, "batch", batchId] as const,
  },

  // Global Site Settings
  siteSettings: ["siteSettings"] as const,

  // CMS / Static Pages
  pages: {
    all: ["pages"] as const,
    detail: (slug: string) => [...queryKeys.pages.all, "detail", slug] as const,
  },
} as const;
