export const ROUTES = {
  home: "/",
  about: "/about",
  products: "/products",
  peptides: "/products/peptides",
  skinBoosters: "/products/skin-boosters",
  novyx: "/products/novyx",
  productDetail: (slug: string) => `/products/${slug}`,
  calculator: "/calculator",
  contact: "/contact",
  // Aliases for consolidated content
  science: "/about#process",
  quality: "/about#quality",
  professionals: "/about#partners",
} as const;
