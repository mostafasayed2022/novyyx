"use client";

import Image from "next/image";
import Link from "next/link";
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
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-brand/7 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-brand/5 blur-[120px]" />
      </div>

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

          <div className="relative min-h-[520px] lg:min-h-[610px]">
            <div className="absolute inset-0 overflow-hidden rounded-[32px] border border-border/70 bg-[radial-gradient(circle_at_64%_26%,rgba(27,77,255,0.14),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.88),rgba(236,244,255,0.62))] dark:bg-[radial-gradient(circle_at_64%_26%,rgba(27,77,255,0.20),transparent_30%),linear-gradient(135deg,rgba(10,17,31,0.96),rgba(7,14,27,0.84))]">
              <div className="absolute right-[-12%] top-[-5%] h-[460px] w-[460px] rounded-full border border-brand/15" />
              <div className="absolute right-[-3%] top-[5%] h-[380px] w-[380px] rounded-full border border-brand/10" />
              <div className="absolute right-[7%] top-[15%] h-[300px] w-[300px] rounded-full border border-brand/10" />

              <div className="absolute right-[15%] top-[12%] h-3 w-3 rounded-full bg-brand/55 shadow-[0_0_24px_rgba(27,77,255,0.45)]" />
              <div className="absolute right-[5%] top-[38%] h-2.5 w-2.5 rounded-full bg-brand/40" />
              <div className="absolute right-[37%] top-[7%] h-2 w-2 rounded-full bg-brand/40" />

              <div className="absolute left-[10%] top-[10%] max-w-[220px]">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-brand">
                  NOVYX Institutional
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tr(
                    "Structured support for professional research supply.",
                    "Strukturierte Unterstützung für professionelle Forschungsversorgung."
                  )}
                </p>
              </div>

              <div className="absolute bottom-[10%] left-1/2 h-16 w-[78%] -translate-x-1/2 rounded-[50%] bg-black/10 blur-2xl dark:bg-black/35" />

              <div className="absolute bottom-[12%] left-1/2 h-[78px] w-[76%] -translate-x-1/2 rounded-[50%] border border-brand/20 bg-gradient-to-b from-white/70 to-white/25 shadow-[0_20px_45px_rgba(15,23,42,0.16)] backdrop-blur-md dark:from-white/10 dark:to-white/[0.02]" />

              <div className="absolute bottom-[19%] left-[18%] h-[210px] w-[150px] rounded-[12px] border border-border/90 bg-gradient-to-br from-white via-slate-50 to-slate-200 shadow-[0_25px_50px_rgba(15,23,42,0.16)] dark:from-slate-200 dark:via-slate-100 dark:to-slate-300">
                <div className="absolute inset-x-0 top-[44%] h-px bg-slate-300" />
                <div className="absolute left-1/2 top-[26%] -translate-x-1/2">
                  <Image
                    src="/logos/novyx_logo_mark.webp"
                    alt="NOVYX"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-12 w-12 object-contain opacity-80"
                  />
                </div>
                <span className="absolute bottom-8 left-0 right-0 text-center font-mono text-[11px] tracking-[0.28em] text-slate-600">
                  NOVYX
                </span>
              </div>

              <div className="absolute bottom-[18%] left-[42%] h-[250px] w-[118px] rounded-[40px_40px_26px_26px] border border-white/70 bg-gradient-to-r from-white/70 via-blue-50/35 to-white/55 shadow-[0_25px_55px_rgba(27,77,255,0.18)] backdrop-blur-md dark:border-white/20 dark:from-white/14 dark:via-brand/10 dark:to-white/8">
                <div className="absolute -top-8 left-1/2 h-12 w-[76px] -translate-x-1/2 rounded-[16px_16px_8px_8px] border border-slate-300 bg-gradient-to-b from-slate-100 to-slate-400 shadow-md" />
                <div className="absolute left-1/2 top-16 -translate-x-1/2">
                  <Image
                    src="/logos/novyx_logo_mark.webp"
                    alt="NOVYX"
                    width={58}
                    height={58}
                    loading="lazy"
                    className="h-11 w-11 object-contain"
                  />
                </div>
                <span className="absolute bottom-16 left-0 right-0 text-center font-mono text-[11px] tracking-[0.3em] text-slate-700 dark:text-white/80">
                  NOVYX
                </span>
              </div>

              <div className="absolute bottom-[19%] right-[12%] h-[150px] w-[155px] rounded-[10px] border border-border/90 bg-gradient-to-br from-white via-slate-50 to-slate-200 shadow-[0_22px_44px_rgba(15,23,42,0.14)] dark:from-slate-200 dark:via-slate-100 dark:to-slate-300">
                <div className="absolute left-1/2 top-8 -translate-x-1/2">
                  <Image
                    src="/logos/novyx_logo_mark.webp"
                    alt="NOVYX"
                    width={52}
                    height={52}
                    loading="lazy"
                    className="h-9 w-9 object-contain opacity-75"
                  />
                </div>
                <span className="absolute bottom-7 left-0 right-0 text-center font-mono text-[10px] tracking-[0.24em] text-slate-600">
                  PEPTIDE SCIENCE
                </span>
              </div>
            </div>
          </div>
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
