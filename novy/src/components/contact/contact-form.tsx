"use client";

import { AlertCircle, ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { ContactSuccess } from "@/features/contact/contact-success";
import { useContactForm } from "@/features/contact/use-contact-form";
import { useLocale } from "@/i18n/locale-provider";

interface FieldErrorProps {
  id: string;
  message?: string;
}

const germanValidationMessages: Record<string, string> = {
  "First name must be at least 2 characters": "Der Vorname muss mindestens 2 Zeichen lang sein.",
  "Last name must be at least 2 characters": "Der Nachname muss mindestens 2 Zeichen lang sein.",
  "Please enter a valid institutional email address": "Bitte geben Sie eine gültige institutionelle E-Mail-Adresse ein.",
  "Organization name is required": "Der Name der Organisation ist erforderlich.",
  "Valid phone number is required": "Eine gültige Telefonnummer ist erforderlich.",
  "Country is required": "Das Land ist erforderlich.",
  "Message must be at least 10 characters": "Die Nachricht muss mindestens 10 Zeichen lang sein.",
  "The inquiry could not be recorded.": "Die Anfrage konnte nicht gespeichert werden.",
  "An unexpected error occurred. Please try again.": "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
};

function translateValidationMessage(message: string | undefined, locale: "en" | "de") {
  if (!message || locale !== "de") return message;
  return germanValidationMessages[message] || message;
}

function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-xs text-rose-500">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

const fieldClassName =
  "w-full rounded-2xl border border-border/80 bg-background/65 px-4 py-3.5 text-[14px] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-all duration-300 placeholder:text-muted-foreground/45 hover:border-border focus:border-brand/55 focus:bg-background focus:ring-4 focus:ring-brand/[0.08] disabled:cursor-not-allowed disabled:opacity-60";

const labelClassName =
  "mb-2.5 block text-[12px] font-medium tracking-[0.035em] text-foreground/85";

export function ContactForm() {
  const { locale, tr } = useLocale();
  const {
    formData,
    errors,
    generalError,
    ticketId,
    isSuccess,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useContactForm();

  if (isSuccess) {
    return (
      <ContactSuccess
        firstName={formData.firstName}
        ticketId={ticketId}
        onReset={resetForm}
      />
    );
  }

  const fieldError = (key: keyof typeof errors) =>
    translateValidationMessage(errors[key], locale);
  const localizedGeneralError = translateValidationMessage(generalError || undefined, locale);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative overflow-hidden rounded-[28px] border border-border/75 bg-surface/55 p-5 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-8 lg:p-10"
      >
        <div
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand/45 to-transparent"
          aria-hidden="true"
        />

        {localizedGeneralError && (
          <div
            role="alert"
            className="mb-7 flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/[0.06] px-4 py-3.5 text-sm text-rose-500"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{localizedGeneralError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-first-name" className={labelClassName}>
              {tr("First name", "Vorname")} <span className="text-brand">*</span>
            </label>
            <input
              id="contact-first-name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={tr("Your first name", "Ihr Vorname")}
              autoComplete="given-name"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "contact-first-name-error" : undefined}
              className={`${fieldClassName} ${errors.firstName ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
            />
            <FieldError id="contact-first-name-error" message={fieldError("firstName")} />
          </div>

          <div>
            <label htmlFor="contact-last-name" className={labelClassName}>
              {tr("Last name", "Nachname")} <span className="text-brand">*</span>
            </label>
            <input
              id="contact-last-name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={tr("Your last name", "Ihr Nachname")}
              autoComplete="family-name"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "contact-last-name-error" : undefined}
              className={`${fieldClassName} ${errors.lastName ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
            />
            <FieldError id="contact-last-name-error" message={fieldError("lastName")} />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClassName}>
              {tr("Work email", "Geschäftliche E-Mail")} <span className="text-brand">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={`${fieldClassName} ${errors.email ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
            />
            <FieldError id="contact-email-error" message={fieldError("email")} />
          </div>

          <div>
            <label htmlFor="contact-phone" className={labelClassName}>
              {tr("Phone", "Telefon")} <span className="text-brand">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 000 000 0000"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              className={`${fieldClassName} ${errors.phone ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
            />
            <FieldError id="contact-phone-error" message={fieldError("phone")} />
          </div>

          <div>
            <label htmlFor="contact-company" className={labelClassName}>
              {tr("Company / institution", "Unternehmen / Institution")} <span className="text-brand">*</span>
            </label>
            <input
              id="contact-company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder={tr("Organization name", "Name der Organisation")}
              autoComplete="organization"
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "contact-company-error" : undefined}
              className={`${fieldClassName} ${errors.company ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
            />
            <FieldError id="contact-company-error" message={fieldError("company")} />
          </div>

          <div>
            <label htmlFor="contact-country" className={labelClassName}>
              {tr("Country", "Land")} <span className="text-brand">*</span>
            </label>
            <input
              id="contact-country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder={tr("Country", "Land")}
              autoComplete="country-name"
              aria-invalid={Boolean(errors.country)}
              aria-describedby={errors.country ? "contact-country-error" : undefined}
              className={`${fieldClassName} ${errors.country ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
            />
            <FieldError id="contact-country-error" message={fieldError("country")} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact-representation" className={labelClassName}>
              {tr("Organization type", "Organisationstyp")} <span className="text-brand">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-representation"
                name="representation"
                value={formData.representation}
                onChange={handleChange}
                aria-invalid={Boolean(errors.representation)}
                aria-describedby={errors.representation ? "contact-representation-error" : undefined}
                className={`${fieldClassName} cursor-pointer appearance-none pr-12 ${errors.representation ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
              >
                <option value="Clinic">{tr("Medical / aesthetic clinic", "Medizinische / ästhetische Klinik")}</option>
                <option value="Laboratory">{tr("Academic or corporate laboratory", "Akademisches oder Unternehmenslabor")}</option>
                <option value="Distributor">{tr("Institutional distributor", "Institutioneller Distributor")}</option>
                <option value="Research organization">{tr("Research organization (CRO)", "Forschungsorganisation (CRO)")}</option>
                <option value="Other">{tr("Other", "Andere")}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            </div>
            <FieldError id="contact-representation-error" message={fieldError("representation")} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact-message" className={labelClassName}>
              {tr("How can we help?", "Wie können wir helfen?")} <span className="text-brand">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder={tr(
                "Tell us what you are looking for, including any product, quantity, specification, or delivery requirements.",
                "Beschreiben Sie kurz, wonach Sie suchen, einschließlich Produkt, Menge, Spezifikation oder Lieferanforderungen.",
              )}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={`${fieldClassName} min-h-40 resize-y leading-6 ${errors.message ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
            />
            <FieldError id="contact-message-error" message={fieldError("message")} />
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-5 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[11px] leading-5 text-muted-foreground">
            {tr(
              "By submitting this form, you agree that NOVYX may use the information provided to respond to your inquiry.",
              "Mit dem Absenden dieses Formulars stimmen Sie zu, dass NOVYX die angegebenen Informationen zur Bearbeitung Ihrer Anfrage verwendet.",
            )}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative group overflow-hidden inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-brand to-[#2257ff] px-5 py-2 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-white shadow-[0_0_20px_rgba(27,77,255,0.35)] transition-all duration-300 hover:scale-[1.02] hover:from-[#2257ff] hover:to-brand hover:shadow-[0_0_28px_rgba(27,77,255,0.55)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:scale-100"
          >
            <span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" aria-hidden="true" />
            {isSubmitting ? (
              <>
                <Loader2 className="relative z-10 h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                <span className="relative z-10">{tr("Sending...", "Wird gesendet...")}</span>
              </>
            ) : (
              <>
                <span className="relative z-10">{tr("Send inquiry", "Anfrage senden")}</span>
                <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
