import { tr, type Locale } from "./config";

interface ProductGermanCopy {
  scientificName?: string;
  tagline?: string;
  description?: string;
  form?: string;
  storageConditions?: string;
  reconstitutionNotes?: string;
}

const GERMAN_PRODUCTS: Record<string, ProductGermanCopy> = {
  "novax-cutis": {
    scientificName: "Professionelles Peptid-Hautforschungssystem",
    tagline: "NOVYX Flaggschiff-Präsentation für professionelle Forschungsumgebungen.",
    description:
      "Eine fokussierte NOVYX Forschungspräsentation, die Premium-Produktdesign mit einem klaren professionellen Laborformat verbindet.",
    form: "Lyophilisiertes Pulver",
    storageConditions: "Gemäß der validierten Produktspezifikation der Forschungscharge lagern.",
    reconstitutionNotes: "Ausschließlich für kontrollierte Laborforschung.",
  },
  "tirzepatide-pen-24mg": {
    scientificName: "Tirzepatide Forschungs-Pen",
    tagline: "Präzise 24-mg-Forschungspräsentation für kontrollierte Laborabläufe.",
    description:
      "Eine klare Tirzepatide-Forschungspräsentation mit 24 mg für analytische, Formulierungs- und kontrollierte Laborstudien.",
    form: "Lösung",
    storageConditions: "Gekühlt und lichtgeschützt gemäß der mitgelieferten Forschungsspezifikation lagern.",
    reconstitutionNotes: "Vorformulierte Forschungspräsentation; Labor-Handhabungsspezifikation beachten.",
  },
  retatrutide: {
    scientificName: "Forschungspeptid für Triple-Rezeptor-Signalwege",
    tagline: "30-mg-Forschungs-Vial für fortgeschrittene metabolische Signalwegstudien.",
    description:
      "Ein 30-mg-Forschungs-Vial für kontrollierte Untersuchungen von Multi-Rezeptor-Signalwegen und metabolischen Wechselwirkungen.",
    form: "Lyophilisiertes Pulver",
    storageConditions: "Gekühlt oder gefroren gemäß der validierten Forschungsspezifikation lagern.",
    reconstitutionNotes: "Ausschließlich für kontrollierte Laborforschung.",
  },
  tirzepatide: {
    scientificName: "Forschungspeptid für duale Inkretin-Rezeptorsysteme",
    tagline: "20-mg-Forschungs-Vial für kontrollierte Dual-Rezeptor-Studien.",
    description:
      "Ein 20-mg-Tirzepatide-Forschungs-Vial für analytische und kontrollierte Untersuchungen dualer Inkretin-Rezeptorsysteme.",
    form: "Lyophilisiertes Pulver",
    storageConditions: "Gekühlt oder gefroren gemäß der validierten Forschungsspezifikation lagern.",
    reconstitutionNotes: "Ausschließlich für kontrollierte Laborforschung.",
  },
  "tb-500": {
    scientificName: "Thymosin-beta-4-bezogenes Forschungspeptid",
    tagline: "10-mg-Forschungs-Vial für zelluläre Signal- und Regenerationsstudien.",
    description:
      "Ein 10-mg-Forschungs-Vial für In-vitro-Arbeiten zu aktinbezogener Peptidsignalgebung und zellulären Regenerationswegen.",
    form: "Lyophilisiertes Pulver",
    storageConditions: "Gekühlt oder gefroren gemäß der validierten Forschungsspezifikation lagern.",
    reconstitutionNotes: "Ausschließlich für kontrollierte Laborforschung.",
  },
  "ghk-cu-crystal": {
    scientificName: "Kupfertripeptid-Forschungskomplex",
    tagline: "50-mg-Kupfertripeptid-Vial für Studien der extrazellulären Matrix.",
    description:
      "Ein 50-mg-GHK-Cu-Forschungs-Vial für kontrollierte Untersuchungen von Kupfertripeptid-Komplexen, Peptidstabilität und Matrix-Signalwegen.",
    form: "Lyophilisiertes Pulver",
    storageConditions: "Trocken bei 2 °C bis 8 °C lagern; für Langzeitlagerung -20 °C verwenden.",
    reconstitutionNotes: "Ausschließlich für kontrollierte Laborforschung.",
  },
  "bpc-157-ultra": {
    scientificName: "Pentadecapeptid-Forschungsverbindung",
    tagline: "10-mg-Forschungs-Vial für Studien peptidvermittelter zellulärer Reparaturwege.",
    description:
      "Ein 10-mg-BPC-157-Forschungs-Vial für In-vitro-Untersuchungen peptidvermittelter Signalgebung und zellulärer Reparaturwege.",
    form: "Lyophilisiertes Pulver",
    storageConditions: "Bei -20 °C lagern und vor Licht sowie Feuchtigkeit schützen.",
    reconstitutionNotes: "Ausschließlich für kontrollierte Laborforschung.",
  },
};

const SPECIFICATION_LABELS_DE: Record<string, string> = {
  "Purity (HPLC)": "Reinheit (HPLC)",
  Appearance: "Aussehen",
  Storage: "Lagerung",
  Format: "Format",
};

const SPECIFICATION_LABELS_FR: Record<string, string> = {
  "Purity (HPLC)": "Pureté (HPLC)",
  Appearance: "Aspect",
  Storage: "Conservation",
  Format: "Format",
};

export function localizeProductField(
  locale: Locale,
  slug: string,
  field: keyof ProductGermanCopy,
  fallback: string,
  dynamicGerman?: string,
  dynamicFrench?: string,
) {
  if (locale === "de") return dynamicGerman || GERMAN_PRODUCTS[slug]?.[field] || fallback;
  if (locale === "fr") return dynamicFrench || tr(locale, fallback, fallback);
  return fallback;
}

export function localizeSpecificationLabel(locale: Locale, label: string) {
  if (locale === "de") return SPECIFICATION_LABELS_DE[label] || label;
  if (locale === "fr") return SPECIFICATION_LABELS_FR[label] || label;
  return label;
}
