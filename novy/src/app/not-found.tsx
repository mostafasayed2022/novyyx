import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { getServerLocale } from "@/i18n/server";
import { tr } from "@/i18n/config";
import { Atom, ArrowLeft } from "lucide-react";

export default async function NotFound() {
  const locale = await getServerLocale();

  return (
    <div className="min-h-[80vh] flex items-center justify-center biotech-grid py-20 bg-background text-foreground">
      <Container size="sm" className="text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/25 mx-auto flex items-center justify-center text-brand shadow-sm">
          <Atom className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="micro-label text-brand">
            {tr(locale, "Error 404 • Coordinate Unresolved", "Fehler 404 • Koordinate nicht aufgelöst")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-foreground">
            {tr(locale, "Biological Sequence Not Found", "Biologische Sequenz nicht gefunden")}
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed font-light">
            {tr(
              locale,
              "The requested molecular record, research dossier, or laboratory endpoint does not exist or has been relocated.",
              "Der angeforderte molekulare Datensatz, das Forschungsdossier oder der Labor-Endpunkt existiert nicht oder wurde verschoben.",
            )}
          </p>
        </div>

        <div className="pt-4">
          <Link href={ROUTES.home}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>{tr(locale, "Return to NOVYX Home", "Zur NOVYX-Startseite")}</span>
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
