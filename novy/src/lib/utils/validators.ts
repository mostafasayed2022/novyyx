import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  institution: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const batchLookupSchema = z.object({
  batchNumber: z
    .string()
    .min(4, "Batch number must be at least 4 characters")
    .regex(/^[A-Z0-9-]+$/i, "Invalid batch format"),
});

export type BatchLookupData = z.infer<typeof batchLookupSchema>;

export const professionalInquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid corporate or institutional email is required"),
  organization: z.string().min(2, "Organization or Lab name is required"),
  licenseOrTaxId: z.string().min(3, "Valid license or institution identifier required"),
  orderVolumeTier: z.enum(["tier_1", "tier_2", "tier_3", "custom"]),
  notes: z.string().optional(),
});

export type ProfessionalInquiryData = z.infer<typeof professionalInquirySchema>;
