export interface LabTestingStandard {
  standardCode: string;
  name: string;
  accreditationBody: string;
  description: string;
}

export interface BatchAnalysisResult {
  batchNumber: string;
  productId: string;
  productName: string;
  testedPurity: number;
  residualSolventsPpm: number;
  endotoxinLevelEuMg: number;
  heavyMetalsPpm: number;
  testDate: string;
  status: "PASSED" | "FLAGGED" | "PENDING";
  certifiedLab: string;
  pdfUrl?: string;
}

export interface QualityPillar {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  metric: string;
  metricLabel: string;
}
