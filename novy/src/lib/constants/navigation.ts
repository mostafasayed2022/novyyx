import { NavItem, NavSection } from "@/types/navigation";
import { ROUTES } from "./routes";

export const MAIN_NAVIGATION: NavItem[] = [
  { title: "Home", titleDe: "Start", href: ROUTES.home, description: "NOVYX molecular biotechnology and pure-state peptide engineering.", descriptionDe: "NOVYX Molekularbiotechnologie und präzise Peptidentwicklung." },
  { title: "About", titleDe: "Über uns", href: ROUTES.about, description: "Our philosophy, standards, analytical verification, and quality process.", descriptionDe: "Unsere Philosophie, Standards, analytische Verifizierung und Qualitätsprozesse." },
  { title: "Peptides", titleDe: "Peptides", href: ROUTES.peptides, description: "Ultra-pure research peptides with individual batch HPLC/MS verification.", descriptionDe: "Hochreine Forschungspeptide mit chargenspezifischer HPLC/MS-Verifizierung." },
  { title: "Skin Boosters", titleDe: "Skin Boosters", href: ROUTES.skinBoosters, description: "NOVYX skin booster formulations and research-focused aesthetic biotechnology.", descriptionDe: "NOVYX Skin-Booster-Formulierungen und forschungsorientierte ästhetische Biotechnologie." },
  { title: "Calculator", titleDe: "Rechner", href: ROUTES.calculator, description: "Precision volumetric peptide reconstitution and dilution calculator.", descriptionDe: "Präziser Rechner für Rekonstitution und Verdünnung von Peptiden." },
  { title: "Contact", titleDe: "Kontakt", href: ROUTES.contact, description: "Reach our scientific advisory, quality assurance, and inquiry teams.", descriptionDe: "Kontakt zu wissenschaftlicher Beratung, Qualitätssicherung und Anfragen." },
];

export const FOOTER_SECTIONS: NavSection[] = [
  {
    title: "Platform", titleDe: "Plattform",
    items: [
      { title: "Home", titleDe: "Start", href: ROUTES.home },
      { title: "About NOVYX", titleDe: "Über NOVYX", href: ROUTES.about },
      { title: "Product Catalog", titleDe: "Produktkatalog", href: ROUTES.products },
      { title: "Peptides", titleDe: "Peptide", href: ROUTES.peptides },
      { title: "Skin Boosters", titleDe: "Skin Booster", href: ROUTES.skinBoosters },
      { title: "Reconstitution Calculator", titleDe: "Rekonstitutionsrechner", href: ROUTES.calculator },
      { title: "Contact Advisory", titleDe: "Beratung kontaktieren", href: ROUTES.contact },
    ],
  },
  {
    title: "Research Catalog", titleDe: "Forschungskatalog",
    items: [
      { title: "Longevity & Cellular", titleDe: "Langlebigkeit & Zellbiologie", href: "/products?cat=longevity" },
      { title: "Metabolic Research", titleDe: "Stoffwechselforschung", href: "/products?cat=metabolic" },
      { title: "Tissue Regeneration", titleDe: "Geweberegeneration", href: "/products?cat=cellular-repair" },
      { title: "Neuro-Cognitive", titleDe: "Neurokognitiv", href: "/products?cat=cognitive" },
      { title: "NOVYX CUTIS™ Flagship", titleDe: "NOVYX CUTIS™ Flaggschiff", href: "/products/novax-cutis" },
    ],
  },
  {
    title: "Quality & Standards", titleDe: "Qualität & Standards",
    items: [
      { title: "The NOVYX Standard", titleDe: "Der NOVYX Standard", href: "/about#standard" },
      { title: "Tested & Documented", titleDe: "Geprüft & dokumentiert", href: "/about#verification" },
      { title: "Quality & Process", titleDe: "Qualität & Prozess", href: "/about#process" },
      { title: "Partners & Alliances", titleDe: "Partner & Allianzen", href: "/about#partners" },
      { title: "Institutional Inquiries", titleDe: "Institutionelle Anfragen", href: "/contact" },
    ],
  },
];
