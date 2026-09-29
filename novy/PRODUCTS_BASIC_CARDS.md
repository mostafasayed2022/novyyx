# Products page — basic card redesign

The product catalog cards were simplified to prioritize the product visual and content.

## Card structure

- Product image / branded fallback visual
- Product title
- Short localized description
- Single `View details` link

Price, CAS number, purity badges, molecular formula, molecular weight, vial size and the technical dossier button were intentionally removed from the catalog card. Detailed technical information remains on the product detail route.

## Product image mapping

Only semantically matching local assets are used:

- NOVYX CUTIS -> `/products/novyx_cutis_box_vial.webp`
- BPC-157 -> `/products/novyx_bpc157_transparent.webp`
- GHK-Cu -> `/products/novyx_ghk_cu_transparent.webp`
- TB-500 -> `/products/novyx_tb500_transparent.webp`
- Retatrutide -> `/products/novyx_retatrutide_transparent.webp`
- Tirzepatide -> `/products/novyx_tirzepatide_vial_transparent.webp`

Products without a matching image use a neutral NOVYX branded placeholder. This prevents incorrect images such as Epithalon being represented by a TB-500 vial or Semaglutide by a Retatrutide vial.

English/German switching, dark mode, filters, search and the local API fallback remain intact.
