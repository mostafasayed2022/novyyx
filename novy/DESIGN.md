---
version: alpha
name: "NOVYX"
description: "A precision biotechnology brand site with pearl clinical surfaces, graphite typography and controlled Nexus Blue light."
colors:
  pearl: "#f7f8fa"
  graphite: "#1a1a1a"
  platinum: "#a7adb5"
  nexus-blue: "#1b4dff"
  ice: "#dce6f5"
  dark-background: "#0b0c10"
  dark-surface: "#14161c"
typography:
  display:
    fontFamily: "Montserrat, Avenir Next, Segoe UI, Arial, sans-serif"
  body:
    fontFamily: "Inter, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
  mono:
    fontFamily: "Geist Mono, SFMono-Regular, Consolas, Liberation Mono, monospace"
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  xl: "14px"
components:
  page-wrapper: {}
  container: {}
  button: {}
  surface-card: {}
omitted:
  - section: spacing
    reason: "The existing site uses Tailwind utility spacing rather than a separate authored spacing token scale."
---

# NOVYX Design System

## Overview

NOVYX presents biotechnology as a physical, inspectable discipline: cleanroom light, glass vials, analytic labels and controlled blue illumination. The brand site favors spacious editorial sections; the admin area favors straightforward task clarity. Product imagery is the expressive moment, while supporting content stays quiet and legible. Avoid generic medical stock imagery, unsupported scientific decoration and a second competing palette.

The public site serves English at unprefixed URLs, German at `/de/...`, and French at `/fr/...`. Navigation must keep the active locale in internal links; every indexable page needs a locale-specific canonical URL and reciprocal `hreflang` links. The language control uses a compact globe menu on desktop and a three-option segmented control in the mobile drawer, with visible focus and native language names. Allow room for longer German and French copy. The product page audience includes professional buyers and researchers, so ingredient roles and product specifications must be easy to find. Marketing claims must distinguish ingredient research from results measured on a finished product. Conceptual before/after visuals must carry a visible illustration label and an explicit caption that they are not clinical evidence.

The NOVYX GHK-Cu product is named **Skin Booster** in page copy and **SkinBooster** in the compact navigation label. Its product image uses **SKIN BOOSTER** below GHK-Cu. Keep exact chemical ingredient names where they appear on the package.

`src/app/globals.css` is the canonical runtime token source. This document mirrors accepted values and explains their use; it does not generate CSS. The path is CSS variables in `:root` and `.dark` → Tailwind v4 `@theme inline` aliases → shared components and pages. The NOVYX skin booster page uses these existing tokens and adds no durable brand color.

## Colors

Light mode uses Pearl backgrounds, white surfaces, Graphite text, Platinum secondary detail, and Nexus Blue for actions and scientific emphasis. Dark mode uses `#0b0c10` backgrounds, `#14161c` surfaces, Pearl text and the same controlled blue accent. `--background`, `--surface`, `--foreground`, `--muted-foreground`, `--brand`, `--border` and `--ring` are semantic CSS values in `src/app/globals.css`; consumers use the mapped Tailwind colors rather than copying hex values. Blue is for active meaning and focal light, not every decorative edge.

## Typography

Montserrat carries product titles and editorial headings, Inter handles paragraphs and controls, and Geist Mono or its fallback carries measurements, small technical labels and product identifiers. Large headlines are tightly tracked; body text uses comfortable line height. Preserve exact product names, ingredient names and units in both locales.

## Layout

Use the shared `Container` widths (up to `max-w-7xl`) and `PageWrapper` when a standard interior page is sufficient. A product landing page may use a custom full-width hero inside `SiteShell`, while retaining the same container, section rhythm, colors and navigation. The product visual and headline form a two-column desktop composition that stacks on narrow screens. Media gets a reserved aspect ratio before it loads. The language menu aligns to the right edge of its trigger and stays inside the viewport at desktop widths.

## Elevation & Depth

Use tonal surfaces, faint borders and the existing `--card-shadow` / `--card-hover-shadow` before adding glow. Strong glow belongs around a product hero or primary action only. Use the supplied NOVYX GHK-Cu vial image as the product visual in the hero, catalog card and professional specifications; the image already carries its label and logo. The image floats gently within its reserved space and stops moving when reduced motion is requested.

## Shapes

The runtime radii are 4, 6, 10 and 14 px. Use precise panels and modest rounding for cards and actions; reserve pills for badges and compact metadata. Hairline separators organize specifications and ingredient sequences.

## Motion

On the Skin Booster page, sections entering the viewport reveal once with a 12 px upward movement and a 480 ms fade. Keep the interaction scoped to section content so the hero vial and before/after control retain their own behavior. Content remains visible when JavaScript is unavailable or reduced motion is requested.

## Components

`SiteShell` owns public navigation, skip link and footer. `Container`, `PageWrapper`, `Button`, `.surface-card` and `.surface-elevated` are the established visual primitives. Links and buttons need visible keyboard focus and useful hover feedback. Native disclosure controls are appropriate for short FAQs. Respect the global reduced-motion rule in `src/app/globals.css` and the visual-activity gate in `src/hooks/use-visual-capabilities.ts` for expensive effects.

## Do's and Don'ts

- Do use authentic product imagery and specific technical information to earn the visual interest of a page.
- Do preserve the public site's English/German/French and light/dark behavior.
- Don't treat ingredient studies as proof of finished-product clinical outcomes.
- Don't invent laboratory certifications, lot results, medical instructions or a new color system for a single product page.
