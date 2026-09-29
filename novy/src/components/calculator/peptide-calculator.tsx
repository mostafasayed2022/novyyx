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
    <div className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.02] px-4 py-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/90">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/75">{label}</p>
        <div className="flex items-end gap-1.5">
          <span className="text-2xl font-semibold text-white">{value}</span>
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
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-[32px] border border-black/6 bg-white/75 p-5 shadow-[0_30px_80px_-40px_rgba(16,33,71,0.35)] backdrop-blur dark:border-white/8 dark:bg-[#0d1424]/70 sm:p-8">
        <div className="rounded-[28px] border border-brand/10 bg-gradient-to-br from-[#fbfdff] via-[#f4f8ff] to-[#edf4ff] p-6 dark:from-[#0f182d] dark:via-[#111f39] dark:to-[#0d1730] sm:p-10">
          <div className="flex flex-col gap-4 border-b border-black/6 pb-6 dark:border-white/8 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              <Badge variant="brand" className="px-3 py-1 font-mono text-[10px] tracking-[0.22em] uppercase">
                {tr("Dosing Tools", "Dosierungswerkzeuge")}
              </Badge>
              <div className="space-y-3">
                <h3 className="text-3xl font-medium tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  <span className="font-semibold text-[#0d2d73] dark:text-white">NOVYX</span>{" "}
                  {tr("Reconstitution Calculator", "Rekonstitutionsrechner")}
                </h3>
                <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
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
              className="h-10 gap-2 self-start rounded-xl border border-black/6 bg-white/60 px-3 font-mono text-xs text-slate-600 hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:bg-white/[0.08]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{tr("Reset", "Zurücksetzen")}</span>
            </Button>
          </div>

          <div className="mt-8 space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-[0.22em] text-[#0d2d73] dark:text-[#94baff]">
                {tr("Syringe Size", "Spritzenvolumen")}
              </label>
              <div className="inline-flex rounded-2xl border border-[#c8d9ff] bg-white/80 p-1.5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                {SYRINGE_OPTIONS.map((option) => {
                  const active = syringeSizeMl === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSyringeSizeMl(option)}
                      className={cn(
                        "min-w-[104px] rounded-xl px-5 py-3 text-lg font-medium transition-all duration-200",
                        active
                          ? "bg-gradient-to-r from-[#0e53db] to-[#143789] text-white shadow-[0_10px_28px_rgba(21,89,219,0.35)]"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
                      )}
                    >
                      {option.toFixed(1)} <span className="text-sm">mL</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
                  {tr("Material in vial (mg)", "Material im Vial (mg)")}
                </label>
                <div className="flex overflow-hidden rounded-2xl border border-[#c8d9ff] bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                  <div className="flex w-16 items-center justify-center border-r border-[#dce7ff] bg-[#f7fbff] text-[#3457a5] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#8fb3ff]">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={vialMassMg}
                    onChange={(e) => setVialMassMg(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent px-4 py-4 text-2xl font-medium text-slate-900 outline-none dark:text-white"
                  />
                  <div className="flex items-center px-4 text-sm text-slate-500 dark:text-slate-300">mg</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
                  {tr("Final solution volume (mL)", "Endvolumen der Lösung (mL)")}
                </label>
                <div className="flex overflow-hidden rounded-2xl border border-[#c8d9ff] bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                  <div className="flex w-16 items-center justify-center border-r border-[#dce7ff] bg-[#f7fbff] text-[#3457a5] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#8fb3ff]">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={bacWaterMl}
                    onChange={(e) => setBacWaterMl(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent px-4 py-4 text-2xl font-medium text-slate-900 outline-none dark:text-white"
                  />
                  <div className="flex items-center px-4 text-sm text-slate-500 dark:text-slate-300">mL</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
                  {tr("Target aliquot mass (mg)", "Ziel-Aliquotmasse (mg)")}
                </label>
                <div className="flex overflow-hidden rounded-2xl border border-[#c8d9ff] bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                  <div className="flex w-16 items-center justify-center border-r border-[#dce7ff] bg-[#f7fbff] text-[#3457a5] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#8fb3ff]">
                    <Syringe className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={dosePerShotMg}
                    onChange={(e) => setDosePerShotMg(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent px-4 py-4 text-2xl font-medium text-slate-900 outline-none dark:text-white"
                  />
                  <div className="flex items-center px-4 text-sm text-slate-500 dark:text-slate-300">mg</div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-[#78b4ff] bg-gradient-to-br from-[#2f8dff] via-[#1f68dd] to-[#0f47b7] p-[1px] shadow-[0_30px_80px_-35px_rgba(33,101,220,0.55)]">
              <div className="rounded-[27px] bg-gradient-to-br from-[#2f8dff] via-[#1f68dd] to-[#0d47b6] px-6 py-8 text-white sm:px-8 sm:py-10">
                <div className="space-y-2 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-[0.36em] text-white/85">
                    {tr("Calculated U-100 scale position", "Berechnete U-100-Skalenposition")}
                  </p>
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-6xl font-semibold tracking-tight sm:text-7xl">
                      {result.drawUnits !== null ? Number.isInteger(result.drawUnits) ? result.drawUnits.toFixed(0) : result.drawUnits.toFixed(1) : "—"}
                    </span>
                    <span className="pb-2 text-2xl text-white/90">{tr("marks", "Markierungen")}</span>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 border-y border-white/15 py-6 md:grid-cols-3">
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

                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.24em] text-white/85">
                    <span>{tr("On a U-100 insulin syringe", "Auf einer U-100-Insulinspritze")}</span>
                    <span>{syringeSizeMl.toFixed(1)} mL</span>
                  </div>

                  <div className="rounded-2xl border border-white/18 bg-white/[0.08] px-4 py-4">
                    <div className="relative h-9 overflow-hidden rounded-xl border border-white/25 bg-gradient-to-r from-white/20 to-white/[0.06]">
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
                      className="mt-3 grid text-center text-sm text-white/90"
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

            <div className="flex items-start gap-3 rounded-2xl border border-[#cfe0ff] bg-white/70 px-4 py-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1556d8] dark:text-[#88b4ff]" />
              <p>
                {tr(
                  "This calculator performs mathematical conversions only and is not medical or dosing advice. Verify medication preparation and dosing instructions with a qualified healthcare professional.",
                  "Dieser Rechner führt nur mathematische Umrechnungen durch und stellt keine medizinische oder therapeutische Beratung dar. Prüfen Sie Vorbereitung und Dosierung stets mit qualifiziertem Fachpersonal.",
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/60 bg-amber-50/80 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
              <div className="flex items-start gap-3">
                <Calculator className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                <div className="space-y-1 text-sm text-amber-900 dark:text-amber-100/90">
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
