import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/contact/contact-form";
import { getServerLocale } from "@/i18n/server";
import { tr } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return {
    title: tr(locale, "Contact NOVYX Sciences", "NOVYX Sciences kontaktieren"),
    description: tr(
      locale,
      "Contact NOVYX Sciences through our secure inquiry form.",
      "Kontaktieren Sie NOVYX Sciences über unser sicheres Anfrageformular.",
    ),
  };
}

export default async function ContactPage() {
  const locale = await getServerLocale();

  return (
    <PageWrapper
      badge={tr(locale, "Direct Inquiries", "Direkte Anfragen")}
      title={tr(locale, "Contact NOVYX Sciences", "NOVYX Sciences kontaktieren")}
      subtitle={tr(
        locale,
        "Have questions about chromatographic lot certificates, custom synthesis feasibility, or institutional procurement? Our scientific team is available.",
        "Fragen zu chromatographischen Chargenzertifikaten, individueller Synthese oder institutioneller Beschaffung? Unser wissenschaftliches Team steht zur Verfügung.",
      )}
      visualSection="contact"
    >
      <Container size="md">
        <ContactForm />
      </Container>
    </PageWrapper>
  );
}
