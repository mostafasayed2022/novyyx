import { imageSourceSchema } from "./media-schema";
import { z } from "zod";

const translationSchema = z.object({
  scientificName: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  form: z.string().optional(),
  storageConditions: z.string().optional(),
  reconstitutionNotes: z.string().optional(),
});

export const productSchema = z.object({
  id: z.preprocess((value) => value === "" ? undefined : value, z.string().min(1).optional()),
  slug: z.string().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only.").refine((value) => !["peptides", "skin-boosters", "novyx"].includes(value), "This slug is reserved for a dedicated page."),
  name: z.string().min(2),
  scientificName: z.string().min(2),
  category: z.enum(["longevity", "metabolic", "cellular-repair", "cognitive", "immunology", "custom-synthesis"]),
  productType: z.enum(["peptide", "skin-booster"]).default("peptide"),
  published: z.boolean().default(true),
  tagline: z.string().min(2),
  description: z.string().min(10),
  sequence: z.string().default("—"),
  casNumber: z.string().default("—"),
  molecularFormula: z.string().default("—"),
  molecularWeight: z.coerce.number().min(0).default(0),
  purity: z.coerce.number().min(0).max(100),
  form: z.enum(["Lyophilized Powder", "Solution", "Sublingual Matrix"]),
  storageConditions: z.string().min(2),
  reconstitutionNotes: z.string().min(2),
  price: z.coerce.number().min(0).default(0),
  vialSizeMg: z.coerce.number().min(0).default(0),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  model3dUrl: z.string().optional(),
  imageUrl: imageSourceSchema.default(""),
  certificates: z.array(z.any()).default([]),
  specifications: z.record(z.string(), z.string()).default({}),
  translations: z.object({ de: translationSchema.optional(), fr: translationSchema.optional() }).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
