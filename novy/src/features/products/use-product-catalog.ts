"use client";

import * as React from "react";
import { useProducts } from "@/lib/api/hooks";
import type { Product } from "@/lib/api/types";

interface UseProductCatalogOptions {
  initialProducts?: Product[];
  productType?: Product["productType"];
}

export function useProductCatalog({
  initialProducts,
  productType,
}: UseProductCatalogOptions) {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Query only the selected top-level catalog type. The old research-category
  // filters were intentionally removed from the public catalog UI.
  const productsQuery = useProducts(productType ? { productType } : undefined, {
    initialData: initialProducts,
  });

  const products = productsQuery.data || initialProducts || [];

  const filteredProducts = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return products.filter((product) => {
      const matchesType = !productType || product.productType === productType;
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.scientificName.toLowerCase().includes(query) ||
        product.casNumber.toLowerCase().includes(query) ||
        product.sequence.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [products, productType, searchQuery]);

  const resetFilters = React.useCallback(() => {
    setSearchQuery("");
  }, []);

  return {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    resetFilters,
    isLoading: productsQuery.isLoading && !products.length,
    isError: productsQuery.isError && !products.length,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
  };
}
