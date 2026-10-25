"use client";

import * as React from "react";
import Link from "@/components/layout/localized-link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { ROUTES } from "@/lib/constants/routes";
import { useLocale } from "@/i18n/locale-provider";
import { ShieldCheck, ArrowUpRight, Lock } from "lucide-react";

export function CtaSection() {
  const { tr } = useLocale();
  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-brand/15 via-cyan-500/10 to-brand/15 blur-[160px] rounded-full pointer-events-none" />
      <Container size="xl" className="relative z-10">
        <GlassCard glow="brand" className="p-10 sm:p-16 text-center max-w-4xl mx-auto space-y-8 relative overflow-hidden border-brand/40">
          <div className="absolute inset-0 biotech-grid opacity-30 pointer-events-none" />
          <div className="inline-flex items-center gap-2 relative z-10"><Badge variant="brand" className="font-mono text-xs">{tr("─ Let’s Collaborate", "Zugang für Unternehmenskooperationen")}</Badge></div>
          <div className="space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground font-sans editorial-headline">
              {tr("PARTNER WITH", "PARTNERSCHAFT MIT")} <br /><span className="text-brand">NŌVYX LABS</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
              {tr("For product specifications, wholesale enquiries, distribution opportunities and analytical documentation,contact your Peptigen representative", "Ob zertifizierte Produktionschargen reserviert, individuelle Peptide entwickelt oder institutionelle Vertriebskanäle aufgebaut werden — unser wissenschaftliches Beratungsteam steht bereit.")}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative z-10">
            <Link href={ROUTES.contact}><Button size="lg" variant="glow" className="gap-2 font-mono text-xs"><span>{tr("CONTACT US", "Wissenschaftliche Anfrage starten")}</span><ArrowUpRight className="w-4 h-4" /></Button></Link>
            <Link href={ROUTES.products}><Button size="lg" variant="outline" className="gap-2 font-mono text-xs"><span>{tr("Explore Peptide Library", "Peptidbibliothek entdecken")}</span></Button></Link>
          </div>
          <div className="pt-8 border-t border-border/80 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-muted-foreground relative z-10">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand" /><span>{tr("ISO 9001:2015 & cGMP Protocol", "ISO 9001:2015 & cGMP-Protokoll")}</span></div>
            <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-brand" /><span>{tr("Full NDA & IP Protection", "Vollständiger NDA- & IP-Schutz")}</span></div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /><span>{tr("Response < 4 Hours (Geneva Core)", "Antwort < 4 Stunden (Genfer Kernteam)")}</span></div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
