import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { listProducts } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const staticRoutes = ["", "/about", "/products", "/products/peptides", "/products/skin-boosters", "/calculator", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1 : route === "/products" ? 0.9 : 0.8,
  }));

  const products = await listProducts();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
