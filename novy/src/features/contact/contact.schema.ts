import {
  contactPayloadSchema,
  type ContactPayload,
} from "@/lib/api/types";

export const contactSchema = contactPayloadSchema;
export type ContactFormData = ContactPayload;

export const initialContactFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  representation: "Clinic",
  message: "",
};
