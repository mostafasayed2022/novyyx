const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://novyx.com";

export const siteConfig = {
  name: "NŌVYX",
  legalName: "NŌVYX Biotherapeutics & Peptide Sciences Inc.",
  tagline: "Engineered for Longevity",
  description:
    "Clean Science. Timeless Performance. Precision peptide biotechnology engineered for longevity, clinical purity, and German-quality standards.",
  url: siteUrl,
  ogImage: `${siteUrl}/og-novyx.webp`,
  contact: {
    email: "inquiries@novyx-labs.com",
    complianceEmail: "quality@novyx-labs.com",
    phone: "+1 (800) 892-NŌVYX",
    headquarters: "Cambridge Innovation Center, Kendall Square, Cambridge, MA",
    laboratory: "NŌVYX Analytical Facilities, Research Triangle Park, NC",
  },
  accreditations: ["ISO 9001:2015", "cGMP Compliant", "Independent 3rd-Party Verified", "HPLC & LC-MS Certified"],
  social: {
    twitter: "https://x.com/novyxbiotech",
    linkedin: "https://linkedin.com/company/novyx-biotech",
    github: "https://github.com/novyx-biotech",
  },
};
