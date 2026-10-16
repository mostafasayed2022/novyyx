import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { listProducts } from "@/lib/server/content-store";
import { SUPPORTED_LOCALES } from "@/i18n/config";
import { localizedPath } from "@/i18n/paths";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const languageUrls = (route: string) => ({
    ...Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, `${baseUrl}${localizedPath(route, locale)}`])),
    "x-default": `${baseUrl}${localizedPath(route, "en")}`,
  });
  const staticRoutes = ["/", "/about", "/products", "/products/peptides", "/products/skin-boosters", "/products/novyx", "/calculator", "/contact"].flatMap((route) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: `${baseUrl}${localizedPath(route, locale)}`,
      alternates: { languages: languageUrls(route) },
      changeFrequency: route === "/" ? ("daily" as const) : ("weekly" as const),
      priority: route === "/" ? 1 : route === "/products" ? 0.9 : 0.8,
    })),
  );

  const products = await listProducts();
  const productRoutes = products.filter((product) => product.slug !== "novyx").flatMap((product) => {
    const route = `/products/${product.slug}`;
    return SUPPORTED_LOCALES.map((locale) => ({
      url: `${baseUrl}${localizedPath(route, locale)}`,
      alternates: { languages: languageUrls(route) },
      ...(product.updatedAt ? { lastModified: new Date(product.updatedAt) } : {}),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  });

  return [...staticRoutes, ...productRoutes];
}
