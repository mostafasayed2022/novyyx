import type { Locale } from "@/i18n/config";
import { tr } from "@/i18n/config";
import type { Product } from "@/lib/api/types";

export const CATALOG_PRODUCT_SLUGS = [
  "novax-cutis",
  "tirzepatide-pen-24mg",
  "retatrutide",
  "tirzepatide",
  "tb-500",
  "ghk-cu-crystal",
  "bpc-157-ultra",
] as const;

export type CatalogProductSlug = (typeof CATALOG_PRODUCT_SLUGS)[number];

type ProductPresentation = {
  eyebrowEn: string;
  eyebrowDe: string;
  packEn: string;
  packDe: string;
};

const PRESENTATION: Record<string, ProductPresentation> = {
  "tirzepatide-pen-24mg": {
    eyebrowEn: "NOVYX · Metabolic Science",
    eyebrowDe: "NOVYX · Stoffwechselforschung",
    packEn: "Pack: 1 × Tirzepatide 24 mg multidose research pen",
    packDe: "Packung: 1 × Tirzepatide 24 mg Mehrdosis-Forschungs-Pen",
  },
  retatrutide: {
    eyebrowEn: "NOVYX · Next-Generation Metabolics",
    eyebrowDe: "NOVYX · Metabolik der nächsten Generation",
    packEn: "Pack: 1 × Retatrutide 30 mg research vial",
    packDe: "Packung: 1 × Retatrutide 30 mg Forschungs-Vial",
  },
  tirzepatide: {
    eyebrowEn: "NOVYX · Metabolic Science",
    eyebrowDe: "NOVYX · Stoffwechselforschung",
    packEn: "Pack: 1 × Tirzepatide 20 mg research vial",
    packDe: "Packung: 1 × Tirzepatide 20 mg Forschungs-Vial",
  },
  "tb-500": {
    eyebrowEn: "NOVYX · Recovery Research",
    eyebrowDe: "NOVYX · Regenerationsforschung",
    packEn: "Pack: 1 × TB-500 10 mg research vial",
    packDe: "Packung: 1 × TB-500 10 mg Forschungs-Vial",
  },
  "ghk-cu-crystal": {
    eyebrowEn: "NOVYX · Skin & Longevity",
    eyebrowDe: "NOVYX · Haut & Langlebigkeit",
    packEn: "Pack: 1 × GHK-Cu 50 mg research vial",
    packDe: "Packung: 1 × GHK-Cu 50 mg Forschungs-Vial",
  },
  "bpc-157-ultra": {
    eyebrowEn: "NOVYX · Regeneration Research",
    eyebrowDe: "NOVYX · Regenerationsforschung",
    packEn: "Pack: 1 × BPC-157 10 mg research vial",
    packDe: "Packung: 1 × BPC-157 10 mg Forschungs-Vial",
  },
  "novax-cutis": {
    eyebrowEn: "NOVYX · Flagship Peptide System",
    eyebrowDe: "NOVYX · Flaggschiff-Peptidsystem",
    packEn: "Pack: NOVYX Labs™ professional research presentation",
    packDe: "Packung: NOVYX Labs™ professionelle Forschungspräsentation",
  },
};

export function getProductPresentation(product: Omit<Product, "price">, locale: Locale) {
  const presentation = PRESENTATION[product.slug];

  return {
    eyebrow: tr(locale, presentation?.eyebrowEn || "NOVYX · Research Peptide", presentation?.eyebrowDe || "NOVYX · Forschungspeptid"),
    pack: presentation ? tr(locale, presentation.packEn, presentation.packDe) :
      locale === "fr" ? `Conditionnement : ${product.vialSizeMg} mg, format recherche` :
      locale === "de" ? `Packung: ${product.vialSizeMg} mg Forschungsformat` :
      `Pack: ${product.vialSizeMg} mg research format`,
  };
}
