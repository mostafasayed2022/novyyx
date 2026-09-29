"use client";

import * as React from "react";
import { calculateReconstitution } from "./calculate-reconstitution";

const DEFAULT_VIAL_MASS_MG = 10;
const DEFAULT_BAC_WATER_ML = 2;
const DEFAULT_DOSE_PER_SHOT_MG = 1;
const DEFAULT_SYRINGE_SIZE_ML = 1.0;

export function usePeptideCalculator() {
  const [vialMassMg, setVialMassMg] = React.useState(DEFAULT_VIAL_MASS_MG);
  const [bacWaterMl, setBacWaterMl] = React.useState(DEFAULT_BAC_WATER_ML);
  const [dosePerShotMg, setDosePerShotMg] = React.useState(DEFAULT_DOSE_PER_SHOT_MG);
  const [syringeSizeMl, setSyringeSizeMl] = React.useState(DEFAULT_SYRINGE_SIZE_ML);

  const result = React.useMemo(
    () =>
      calculateReconstitution({
        vialMassMg,
        bacWaterMl,
        dosePerShotMg,
        syringeSizeMl,
      }),
    [vialMassMg, bacWaterMl, dosePerShotMg, syringeSizeMl],
  );

  const reset = React.useCallback(() => {
    setVialMassMg(DEFAULT_VIAL_MASS_MG);
    setBacWaterMl(DEFAULT_BAC_WATER_ML);
    setDosePerShotMg(DEFAULT_DOSE_PER_SHOT_MG);
    setSyringeSizeMl(DEFAULT_SYRINGE_SIZE_ML);
  }, []);

  return {
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
  };
}
