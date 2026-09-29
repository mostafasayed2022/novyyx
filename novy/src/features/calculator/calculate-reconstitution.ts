export interface ReconstitutionInput {
  vialMassMg: number;
  bacWaterMl: number;
  dosePerShotMg: number;
  syringeSizeMl: number;
}

export interface ReconstitutionResult {
  isValid: boolean;
  concentrationMgMl: number | null;
  volumeMl: number | null;
  drawUnits: number | null;
  dosesPerVial: number | null;
  completeDosesPerVial: number | null;
  syringeCapacityUnits: number;
  fillPercent: number;
  exceedsSyringeCapacity: boolean;
}

/**
 * NOVYX reconstitution math.
 *
 * All calculations use the unrounded intermediate values. Rounding is a
 * presentation concern only and must not feed back into later equations.
 *
 * concentration (mg/mL) = vial mass (mg) / final solution volume (mL)
 * dose volume (mL)      = target aliquot mass (mg) / concentration (mg/mL)
 *                       = target aliquot mass * final solution volume / vial mass
 * U-100 scale position  = dose volume (mL) * 100
 * theoretical doses     = vial mass / target aliquot mass
 * complete doses        = floor(theoretical doses)
 */
export function calculateReconstitution({
  vialMassMg,
  bacWaterMl,
  dosePerShotMg,
  syringeSizeMl,
}: ReconstitutionInput): ReconstitutionResult {
  const syringeCapacityUnits = Number.isFinite(syringeSizeMl)
    ? Math.max(0, syringeSizeMl * 100)
    : 0;

  const isValid =
    Number.isFinite(vialMassMg) &&
    Number.isFinite(bacWaterMl) &&
    Number.isFinite(dosePerShotMg) &&
    Number.isFinite(syringeSizeMl) &&
    vialMassMg > 0 &&
    bacWaterMl > 0 &&
    dosePerShotMg > 0 &&
    syringeSizeMl > 0;

  if (!isValid) {
    return {
      isValid: false,
      concentrationMgMl: null,
      volumeMl: null,
      drawUnits: null,
      dosesPerVial: null,
      completeDosesPerVial: null,
      syringeCapacityUnits,
      fillPercent: 0,
      exceedsSyringeCapacity: false,
    };
  }

  // IMPORTANT: do not round any intermediate value here.
  const concentrationMgMl = vialMassMg / bacWaterMl;
  const volumeMl = dosePerShotMg / concentrationMgMl;
  const drawUnits = volumeMl * 100;
  const dosesPerVial = vialMassMg / dosePerShotMg;
  const completeDosesPerVial = Math.floor(dosesPerVial);
  const exceedsSyringeCapacity = drawUnits > syringeCapacityUnits;

  // The visual ruler is relative to the selected syringe: 30 / 50 / 100 units.
  // Clamp only the visual fill; never alter the mathematical result.
  const fillPercent = Math.max(
    0,
    Math.min(100, (drawUnits / syringeCapacityUnits) * 100),
  );

  return {
    isValid: true,
    concentrationMgMl,
    volumeMl,
    drawUnits,
    dosesPerVial,
    completeDosesPerVial,
    syringeCapacityUnits,
    fillPercent,
    exceedsSyringeCapacity,
  };
}
