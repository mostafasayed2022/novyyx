import type { Product } from "@/lib/api/types";

export type PublicProduct = Omit<Product, "price">;

export function toPublicProduct(product: Product): PublicProduct {
  const result: Partial<Product> = { ...product };
  delete result.price;
  return result as PublicProduct;
}
