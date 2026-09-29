"use client";

import * as React from "react";
import { useSubmitContact } from "@/lib/api/hooks";
import {
  contactSchema,
  initialContactFormData,
  type ContactFormData,
} from "./contact.schema";

type ContactField = keyof ContactFormData;
type ContactErrors = Partial<Record<ContactField, string>>;

const backendFieldMap: Record<string, ContactField> = {
  first_name: "firstName",
  last_name: "lastName",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  company: "company",
  phone: "phone",
  country: "country",
  representation: "representation",
  message: "message",
};

function mapApiFieldErrors(
  fieldErrors?: Record<string, string[]>,
): ContactErrors {
  if (!fieldErrors) return {};

  const mapped: ContactErrors = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    const formField = backendFieldMap[field];
    if (formField && messages.length > 0) {
      mapped[formField] = messages.join(", ");
    }
  }
  return mapped;
}

export function useContactForm() {
  const [formData, setFormData] = React.useState<ContactFormData>(
    initialContactFormData,
  );
  const [errors, setErrors] = React.useState<ContactErrors>({});
  const [generalError, setGeneralError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [ticketId, setTicketId] = React.useState("");

  const submitContactMutation = useSubmitContact();

  const handleChange = React.useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const field = event.target.name as ContactField;
      const value = event.target.value;

      setFormData((current) => ({ ...current, [field]: value }) as ContactFormData);
      setErrors((current) => {
        if (!current[field]) return current;
        return { ...current, [field]: undefined };
      });
      setGeneralError(null);
    },
    [],
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrors({});
      setGeneralError(null);

      const result = contactSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: ContactErrors = {};
        for (const issue of result.error.issues) {
          const field = issue.path[0] as ContactField;
          if (field && !fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        }
        setErrors(fieldErrors);
        return;
      }

      try {
        const response = await submitContactMutation.mutateAsync(result.data);
        if (!response.success) {
          throw new Error(response.message || "The inquiry could not be recorded.");
        }

        setTicketId(response.ticketId || "");
        setIsSuccess(true);
      } catch (error: unknown) {
        const apiError = error as {
          message?: string;
          fieldErrors?: Record<string, string[]>;
        };
        const mappedErrors = mapApiFieldErrors(apiError?.fieldErrors);

        if (Object.keys(mappedErrors).length > 0) {
          setErrors(mappedErrors);
        } else {
          setGeneralError(
            apiError?.message ||
              "An unexpected error occurred. Please try again.",
          );
        }
      }
    },
    [formData, submitContactMutation],
  );

  const resetForm = React.useCallback(() => {
    setFormData(initialContactFormData);
    setErrors({});
    setGeneralError(null);
    setTicketId("");
    setIsSuccess(false);
    submitContactMutation.reset();
  }, [submitContactMutation]);

  return {
    formData,
    errors,
    generalError,
    ticketId,
    isSuccess,
    isSubmitting: submitContactMutation.isPending,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
