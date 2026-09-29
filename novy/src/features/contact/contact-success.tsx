"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { useLocale } from "@/i18n/locale-provider";

interface ContactSuccessProps {
  firstName: string;
  ticketId: string;
  onReset: () => void;
}

export function ContactSuccess({
  firstName,
  ticketId,
  onReset,
}: ContactSuccessProps) {
  const { tr } = useLocale();

  return (
    <GlassCard
      glow="brand"
      className="p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold font-mono text-foreground">
          {tr("Inquiry Registered Successfully", "Anfrage erfolgreich registriert")}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tr(
            `Thank you, ${firstName}. Your institutional inquiry has been received. A NOVYX representative will review the submitted specifications and follow up using the contact details you provided.`,
            `Vielen Dank, ${firstName}. Ihre institutionelle Anfrage wurde empfangen. Ein NOVYX-Ansprechpartner prüft die übermittelten Spezifikationen und meldet sich über die von Ihnen angegebenen Kontaktdaten.`,
          )}
        </p>
      </div>
      <div className="p-4 rounded-xl bg-surface-elevated border border-border text-xs font-mono text-muted-foreground">
        {ticketId
          ? `${tr("Ticket Ref", "Ticket-Referenz")}: ${ticketId}`
          : tr("Inquiry recorded", "Anfrage erfasst")}
      </div>
      <Button variant="outline" onClick={onReset} className="font-mono text-xs">
        {tr("Submit Another Inquiry", "Weitere Anfrage senden")}
      </Button>
    </GlassCard>
  );
}
