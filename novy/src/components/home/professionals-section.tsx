"use client";

import Image from "next/image";
import Link from "@/components/layout/localized-link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { useLocale } from "@/i18n/locale-provider";
import {
  Building2,
  Microscope,
  Truck,
  FlaskConical,
  ArrowUpRight,
  Globe2,
  Settings2,
  ShieldCheck,
  Users2,
} from "lucide-react";

export function ProfessionalsSection() {
  const { tr } = useLocale();

  const partnerRows = [
    {
      title: tr("Clinics & Aesthetic Centers", "Kliniken & Ästhetikzentren"),
      desc: tr(
        "Reserved batch access, pre-delivery documentation, and dependable replenishment for professional research programs.",
        "Reservierter Chargenzugang, Dokumentation vor der Lieferung und zuverlässige Nachversorgung für professionelle Forschungsprogramme."
      ),
      icon: Building2,
    },
    {
      title: tr("Academic & Corporate Labs", "Akademische & Unternehmenslabore"),
      desc: tr(
        "Custom peptide synthesis, scalable production support, and direct collaboration with analytical specialists.",
        "Individuelle Peptidsynthese, skalierbare Produktionsunterstützung und direkte Zusammenarbeit mit Analytikspezialisten."
      ),
      icon: Microscope,
    },
    {
      title: tr("Institutional Distributors", "Institutionelle Distributoren"),
      desc: tr(
        "Structured distributor access, volume supply planning, and documentation support for regional operations.",
        "Strukturierter Distributorenzugang, Mengenplanung und Dokumentationsunterstützung für regionale Aktivitäten."
      ),
      icon: Truck,
    },
    {
      title: tr("Biotech Research Alliances", "Biotech-Forschungsallianzen"),
      desc: tr(
        "Collaborative development, pilot synthesis access, and consultation for specialized research requirements.",
        "Gemeinsame Entwicklung, Zugang zur Pilotsynthese und Beratung für spezialisierte Forschungsanforderungen."
      ),
      icon: FlaskConical,
    },
  ];

  const supplySignals = [
    {
      label: tr("Global", "Global"),
      sublabel: tr("Distribution capability", "Distributionsfähigkeit"),
      icon: Globe2,
    },
    {
      label: tr("Reliable", "Zuverlässig"),
      sublabel: tr("Supply planning", "Versorgungsplanung"),
      icon: Settings2,
    },
    {
      label: tr("Compliant", "Konform"),
      sublabel: tr("Documentation support", "Dokumentationsunterstützung"),
      icon: ShieldCheck,
    },
    {
      label: tr("Trusted", "Vertrauenswürdig"),
      sublabel: tr("Professional partnerships", "Professionelle Partnerschaften"),
      icon: Users2,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(27,77,255,0.05),transparent_55%)]" />

      <Container size="xl" className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-2xl">
            <Badge variant="brand">{tr("Partnerships", "Partnerschaften")}</Badge>

            <h2 className="editorial-headline mt-5 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {tr("INSTITUTIONAL &", "INSTITUTIONELLE &")}
              <br />
              <span className="text-brand">
                {tr("ENTERPRISE SUPPLY", "UNTERNEHMENSVERSORGUNG")}
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
              {tr(
                "NOVYX supports clinics, laboratories, distributors, and biotechnology organizations with structured access, reliable supply planning, and clear documentation.",
                "NOVYX unterstützt Kliniken, Labore, Distributoren und Biotechnologieunternehmen mit strukturiertem Zugang, zuverlässiger Versorgungsplanung und klarer Dokumentation."
              )}
            </p>

            <div className="mt-9 divide-y divide-border/80 border-y border-border/80">
              {partnerRows.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group grid grid-cols-[44px_1fr] gap-4 py-5 sm:grid-cols-[52px_1fr] sm:gap-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/15 bg-brand/5 text-brand transition-all duration-300 group-hover:border-brand/35 group-hover:bg-brand/10 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-foreground sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href={ROUTES.contact} className="mt-8 inline-flex">
              <Button variant="glow" className="gap-2 font-mono text-xs">
                <span>{tr("Discuss Partnership", "Partnerschaft besprechen")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <figure
            data-product-showcase
            className="relative isolate flex aspect-[4/5] w-full flex-col overflow-hidden rounded-[28px] border border-border/70 bg-[radial-gradient(ellipse_at_50%_52%,#d7e6ff_0%,#edf3fb_48%,#f8fafc_85%)] text-slate-900 dark:bg-[radial-gradient(ellipse_at_50%_52%,#142b50_0%,#0a172a_48%,#060d19_85%)] dark:text-white sm:rounded-[32px] lg:aspect-auto lg:min-h-[610px]"
          >
            <div className="relative z-10 px-6 pt-8 text-center sm:pt-10">
              <p className="text-xl font-semibold tracking-[0.35em] sm:text-2xl">NOVYX</p>
              <p className="mx-auto mt-3 max-w-[28em] font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-slate-500 dark:text-blue-100/55 sm:text-[10px]">
                {tr("Engineered for longevity", "Entwickelt für Langlebigkeit")}
              </p>
            </div>

            <div className="relative mx-auto min-h-0 w-full flex-1" aria-hidden="true">
              <div className="absolute inset-x-[13%] bottom-[5%] h-[17%] rounded-[3px] border-t border-slate-400/50 bg-[linear-gradient(155deg,#48515f,#202833_55%,#101720)] shadow-[0_18px_28px_rgba(0,0,0,0.22)] dark:border-blue-100/20 dark:bg-[linear-gradient(155deg,#303b4d,#172132_55%,#0b111c)]" />
              <div className="absolute inset-x-[13%] bottom-[22%] h-[7%] origin-bottom [transform:skewX(-14deg)] rounded-t-[3px] border-t border-slate-400/60 bg-[linear-gradient(135deg,#596474,#2b3645)] dark:border-blue-100/25 dark:bg-[linear-gradient(135deg,#455267,#263347)]" />
              <div className="absolute inset-x-[14%] bottom-[21%] top-[2%]">
                <Image
                  src="/products/Novyx Labs GHK-Cu Product Set.png"
                  alt=""
                  fill
                  sizes="(max-width: 639px) 72vw, (max-width: 1023px) 60vw, 480px"
                  loading="lazy"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            <figcaption className="relative z-10 px-5 pb-8 pt-4 text-center sm:pb-10">
              <p className="font-mono text-sm font-medium tracking-[0.22em] sm:text-base">NOVYX LABS</p>
              <p className="mt-2 text-xs tracking-wide text-slate-500 dark:text-blue-100/55 sm:text-sm">
                {tr("Precision. Purity. Confidence.", "Präzision. Reinheit. Vertrauen.")}
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 overflow-hidden rounded-[24px] border border-brand/20 bg-[#071426] shadow-[0_18px_60px_rgba(7,20,38,0.20)]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {supplySignals.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex min-h-[132px] flex-col items-center justify-center px-5 py-6 text-center ${
                    index !== supplySignals.length - 1
                      ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <Icon className="h-6 w-6 text-[#67A6FF]" strokeWidth={1.8} />
                  <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/50">
                    {item.sublabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
