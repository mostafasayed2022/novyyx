"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/locale-provider";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { tr } = useLocale();

  React.useEffect(() => {
    console.error("NOVYX Laboratory Telemetry Caught Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 biotech-grid bg-background text-foreground">
      <Container size="sm" className="text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/25 mx-auto flex items-center justify-center text-red-500">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="micro-label text-red-500">
            {tr("Telemetry Interruption", "Telemetrie-Unterbrechung")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
            {tr("Analytical Procedure Interrupted", "Analytischer Vorgang unterbrochen")}
          </h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed font-mono">
            {error.message || tr(
              "An unanticipated analytical interruption occurred in the client state.",
              "Im Client-Zustand ist eine unerwartete analytische Unterbrechung aufgetreten.",
            )}
          </p>
        </div>

        <div className="pt-2">
          <Button onClick={() => reset()} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4 text-brand" />
            <span>{tr("Reset Laboratory Session", "Laborsitzung zurücksetzen")}</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}
