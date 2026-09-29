# NOVYX — Phase 2 German/English i18n Completion

This phase extends the EN/DE language system introduced in the rebrand build.

## Completed

- English/German UI coverage for the product catalog:
  - category labels
  - search placeholder and accessibility labels
  - loading/error/empty states
  - product specification labels and CTAs
- German product copy fallback for the bundled mock catalog:
  - scientific names where appropriate
  - taglines
  - descriptions
  - storage/form/reconstitution copy
  - specification label translations
- English/German coverage for the reconstitution calculator:
  - disclaimer
  - inputs and solvent choices
  - result labels
  - aseptic protocol guidance
- English/German coverage for the contact journey:
  - page copy
  - form labels/placeholders/options
  - validation messages
  - submit state
  - success state
  - social/network descriptions
- English/German coverage for product detail UI and technical labels.
- English/German coverage for loading, error, and 404 states.
- Localized metadata for Home, About, Products, Calculator, Contact, and product-not-found cases.
- Localized accessibility labels for the language switcher and hero slider navigation.
- Product 3D/fallback telemetry labels localized.

## Locale behavior

- Supported locales: `en`, `de`
- Locale is persisted in the `novyx-locale` cookie.
- Switching language updates `<html lang>` and triggers a router refresh so Server Components/metadata use the selected locale.

## Backend note

The bundled mock product catalog has German display copy in `src/i18n/product-localization.ts`.
When the Django/API backend becomes the content source, German product fields should ideally be returned by the API/CMS. Unknown product slugs intentionally fall back to the backend English copy rather than displaying invented translations.

## Validation in this environment

- TypeScript parse/syntax scan: no parse-level errors detected in the changed files.
- Full `npm ci`, Next production build, and ESLint still require dependencies to be installed from the package registry; this execution environment does not currently contain the project `node_modules` tree.
