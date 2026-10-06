"use client";

import { useMemo, type ComponentType } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePeptideCalculator } from "@/features/calculator/use-peptide-calculator";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils/cn";
import {
  Calculator,
  Droplets,
  Info,
  RotateCcw,
  Syringe,
  TestTubeDiagonal,
  FlaskConical,
} from "lucide-react";

const SYRINGE_OPTIONS = [0.3, 0.5, 1.0] as const;

function MetricCard({
  label,
  value,
  suffix,
  icon: Icon,
}: {
  label: string;
  value: string;
  suffix?: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.02] px-3 py-3.5 sm:gap-4 sm:px-4 sm:py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/90 sm:h-12 sm:w-12">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 space-y-1">
        <p className="truncate font-mono text-[9px] uppercase tracking-[0.16em] text-white/75 sm:text-[10px] sm:tracking-[0.24em]">{label}</p>
        <div className="flex items-end gap-1.5">
          <span className="break-all text-xl font-semibold text-white sm:text-2xl">{value}</span>
          {suffix ? <span className="pb-1 text-sm text-white/80">{suffix}</span> : null}
        </div>
      </div>
    </div>
  );
}

export function PeptideCalculator() {
  const { tr } = useLocale();
  const {
    vialMassMg,
    bacWaterMl,
    dosePerShotMg,
    syringeSizeMl,
    result,
    setVialMassMg,
    setBacWaterMl,
    setDosePerShotMg,
    setSyringeSizeMl,
    reset,
  } = usePeptideCalculator();

  const syringeTicks = useMemo(() => {
    const capacity = result.syringeCapacityUnits;
    const step = capacity <= 50 ? 5 : 10;
    return Array.from({ length: Math.floor(capacity / step) + 1 }, (_, i) => i * step);
  }, [result.syringeCapacityUnits]);
  const activeWidth = `${result.fillPercent}%`;
  const currentUnits = result.drawUnits ?? 0;

  const formatNumber = (value: number | null, maximumFractionDigits = 3) =>
    value === null
      ? "—"
      : new Intl.NumberFormat("en-US", {
          maximumFractionDigits,
          minimumFractionDigits: 0,
        }).format(value);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-8">
      <div className="overflow-hidden rounded-[24px] border border-black/6 bg-white/80 p-2.5 shadow-[0_24px_60px_-36px_rgba(16,33,71,0.32)] backdrop-blur-none dark:border-white/8 dark:bg-[#0d1424]/78 sm:rounded-[32px] sm:p-8 sm:backdrop-blur">
        <div className="rounded-[20px] border border-brand/10 bg-gradient-to-br from-[#fbfdff] via-[#f4f8ff] to-[#edf4ff] p-4 dark:from-[#0f182d] dark:via-[#111f39] dark:to-[#0d1730] sm:rounded-[28px] sm:p-10">
          <div className="flex flex-col gap-4 border-b border-black/6 pb-5 dark:border-white/8 sm:flex-row sm:items-start sm:justify-between sm:pb-6">
            <div className="space-y-4">
              <Badge variant="brand" className="px-3 py-1 font-mono text-[10px] tracking-[0.22em] uppercase">
                {tr("Dosing Tools", "Dosierungswerkzeuge")}
              </Badge>
              <div className="space-y-3">
                <h3 className="text-[clamp(1.85rem,9vw,3rem)] font-medium leading-[1.02] tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  <span className="font-semibold text-[#0d2d73] dark:text-white">NOVYX</span>{" "}
                  {tr("Reconstitution Calculator", "Rekonstitutionsrechner")}
                </h3>
                <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-relaxed">
                  {tr(
                    "Enter your peptide details below to calculate the concentration and corresponding draw volume on a U-100 insulin syringe.",
                    "Geben Sie unten Ihre Peptidwerte ein, um Konzentration und passendes Aufziehvolumen auf einer U-100-Insulinspritze zu berechnen.",
                  )}
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={reset}
              className="h-10 w-full gap-2 self-start rounded-xl border border-black/6 bg-white/60 px-3 font-mono text-xs sm:w-auto text-slate-600 hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:bg-white/[0.08]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{tr("Reset", "Zurücksetzen")}</span>
            </Button>
          </div>

          <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-[0.22em] text-[#0d2d73] dark:text-[#94baff]">
                {tr("Syringe Size", "Spritzenvolumen")}
              </label>
              <div className="grid w-full grid-cols-3 rounded-2xl border border-[#c8d9ff] bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:inline-flex sm:w-auto sm:p-1.5">
                {SYRINGE_OPTIONS.map((option) => {
                  const active = syringeSizeMl === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSyringeSizeMl(option)}
                      className={cn(
                        "min-w-0 rounded-xl px-2 py-2.5 text-sm font-medium transition-all duration-200 sm:min-w-[104px] sm:px-5 sm:py-3 sm:text-lg",
                        active
                          ? "bg-gradient-to-r from-[#0e53db] to-[#143789] text-white shadow-[0_10px_28px_rgba(21,89,219,0.35)]"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
                      )}
                    >
                      {option.toFixed(1)} <span className="text-[11px] sm:text-sm">mL</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
                  {tr("Material in vial (mg)", "Material im Vial (mg)")}
                </label>
                <div className="flex overflow-hidden rounded-2xl border border-[#c8d9ff] bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                  <div className="flex w-12 shrink-0 items-center justify-center sm:w-16 border-r border-[#dce7ff] bg-[#f7fbff] text-[#3457a5] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#8fb3ff]">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={vialMassMg}
                    onChange={(e) => setVialMassMg(parseFloat(e.target.value) || 0)}
                    className="min-w-0 w-full bg-transparent px-3 py-3.5 text-xl font-medium text-slate-900 outline-none dark:text-white sm:px-4 sm:py-4 sm:text-2xl"
                  />
                  <div className="flex shrink-0 items-center px-3 text-xs text-slate-500 dark:text-slate-300 sm:px-4 sm:text-sm">mg</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
                  {tr("Final solution volume (mL)", "Endvolumen der Lösung (mL)")}
                </label>
                <div className="flex overflow-hidden rounded-2xl border border-[#c8d9ff] bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                  <div className="flex w-12 shrink-0 items-center justify-center sm:w-16 border-r border-[#dce7ff] bg-[#f7fbff] text-[#3457a5] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#8fb3ff]">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={bacWaterMl}
                    onChange={(e) => setBacWaterMl(parseFloat(e.target.value) || 0)}
                    className="min-w-0 w-full bg-transparent px-3 py-3.5 text-xl font-medium text-slate-900 outline-none dark:text-white sm:px-4 sm:py-4 sm:text-2xl"
                  />
                  <div className="flex shrink-0 items-center px-3 text-xs text-slate-500 dark:text-slate-300 sm:px-4 sm:text-sm">mL</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
                  {tr("Target aliquot mass (mg)", "Ziel-Aliquotmasse (mg)")}
                </label>
                <div className="flex overflow-hidden rounded-2xl border border-[#c8d9ff] bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                  <div className="flex w-12 shrink-0 items-center justify-center sm:w-16 border-r border-[#dce7ff] bg-[#f7fbff] text-[#3457a5] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#8fb3ff]">
                    <Syringe className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={dosePerShotMg}
                    onChange={(e) => setDosePerShotMg(parseFloat(e.target.value) || 0)}
                    className="min-w-0 w-full bg-transparent px-3 py-3.5 text-xl font-medium text-slate-900 outline-none dark:text-white sm:px-4 sm:py-4 sm:text-2xl"
                  />
                  <div className="flex shrink-0 items-center px-3 text-xs text-slate-500 dark:text-slate-300 sm:px-4 sm:text-sm">mg</div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[22px] border border-[#78b4ff] bg-gradient-to-br from-[#2f8dff] via-[#1f68dd] to-[#0f47b7] p-[1px] shadow-[0_30px_80px_-35px_rgba(33,101,220,0.55)]">
              <div className="rounded-[21px] bg-gradient-to-br from-[#2f8dff] via-[#1f68dd] to-[#0d47b6] px-4 py-6 text-white sm:px-8 sm:py-10">
                <div className="space-y-2 text-center">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 sm:text-[11px] sm:tracking-[0.36em]">
                    {tr("Calculated U-100 scale position", "Berechnete U-100-Skalenposition")}
                  </p>
                  <div className="flex flex-wrap items-end justify-center gap-x-2 gap-y-0">
                    <span className="text-[clamp(3.25rem,18vw,5rem)] font-semibold leading-none tracking-tight sm:text-7xl">
                      {result.drawUnits !== null ? Number.isInteger(result.drawUnits) ? result.drawUnits.toFixed(0) : result.drawUnits.toFixed(1) : "—"}
                    </span>
                    <span className="pb-1 text-lg text-white/90 sm:pb-2 sm:text-2xl">{tr("marks", "Markierungen")}</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 border-y border-white/15 py-5 sm:mt-8 sm:gap-4 sm:py-6 md:grid-cols-3">
                  <MetricCard
                    label={tr("Concentration", "Konzentration")}
                    value={formatNumber(result.concentrationMgMl)}
                    suffix="mg/mL"
                    icon={TestTubeDiagonal}
                  />
                  <MetricCard
                    label={tr("Volume", "Volumen")}
                    value={formatNumber(result.volumeMl)}
                    suffix="mL"
                    icon={Droplets}
                  />
                  <MetricCard
                    label={tr("Doses / Vial", "Dosen / Vial")}
                    value={formatNumber(result.dosesPerVial, 2)}
                    icon={FlaskConical}
                  />
                </div>

                <div className="mt-6 space-y-3 sm:mt-8">
                  <div className="flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/85 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between sm:text-[11px] sm:tracking-[0.24em]">
                    <span>{tr("On a U-100 insulin syringe", "Auf einer U-100-Insulinspritze")}</span>
                    <span>{syringeSizeMl.toFixed(1)} mL</span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-white/18 bg-white/[0.08] px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-4">
                    <div className="relative h-9 min-w-[280px] overflow-hidden rounded-xl border border-white/25 bg-gradient-to-r from-white/20 to-white/[0.06]">
                      <div
                        className="absolute inset-y-0 left-0 rounded-l-xl bg-gradient-to-r from-[#c9f1ff] via-[#71d1ff] to-[#2da4ff] shadow-[0_0_26px_rgba(160,234,255,0.95)]"
                        style={{ width: activeWidth }}
                      />
                      <div
                        className="absolute top-[-4px] h-[calc(100%+8px)] w-[4px] rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.95)]"
                        style={{ left: `calc(${activeWidth} - 2px)` }}
                      />
                      <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))]">
                        {Array.from({ length: 20 }, (_, i) => (
                          <div key={i} className="relative border-r border-white/18">
                            <div className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-white/45" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="mt-3 min-w-[280px] grid text-center text-[10px] text-white/90 sm:text-sm"
                      style={{ gridTemplateColumns: `repeat(${syringeTicks.length}, minmax(0, 1fr))` }}
                    >
                      {syringeTicks.map((tick) => (
                        <span key={tick}>{tick}</span>
                      ))}
                    </div>
                  </div>

                  {result.exceedsSyringeCapacity ? (
                    <p className="text-sm text-[#fff4a8]">
                      {tr(
                        `Note: ${currentUnits.toFixed(1)} U-100 marks exceeds the selected ${result.syringeCapacityUnits}-mark syringe capacity. The calculated value is unchanged.`,
                        `Hinweis: ${currentUnits.toFixed(1)} U-100-Markierungen überschreiten die gewählte Spritzenkapazität von ${result.syringeCapacityUnits} Markierungen. Der berechnete Wert bleibt unverändert.`,
                      )}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-[#cfe0ff] bg-white/70 px-3 py-3.5 text-xs leading-5 sm:px-4 sm:py-4 sm:text-sm sm:leading-normal text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1556d8] dark:text-[#88b4ff]" />
              <p>
                {tr(
                  "This calculator performs mathematical conversions only and is not medical or dosing advice. Verify medication preparation and dosing instructions with a qualified healthcare professional.",
                  "Dieser Rechner führt nur mathematische Umrechnungen durch und stellt keine medizinische oder therapeutische Beratung dar. Prüfen Sie Vorbereitung und Dosierung stets mit qualifiziertem Fachpersonal.",
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/60 bg-amber-50/80 p-3.5 sm:p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
              <div className="flex items-start gap-3">
                <Calculator className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                <div className="space-y-1 text-xs leading-5 text-amber-900 sm:text-sm sm:leading-normal dark:text-amber-100/90">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">
                    {tr("Research-use disclaimer", "Hinweis nur für Forschungszwecke")}
                  </p>
                  <p>
                    {tr(
                      "Designed exclusively for laboratory calculations and in-vitro research workflows. It does not provide, imply, or replace medical, diagnostic, or clinical dosing instructions.",
                      "Ausschließlich für Laborkalkulationen und In-vitro-Forschungsabläufe entwickelt. Ersetzt keine medizinischen, diagnostischen oder klinischen Dosierungsanweisungen.",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
