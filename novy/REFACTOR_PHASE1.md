# NOVYX Refactor — Phase 1 + Initial Phase 2

This copy keeps the existing visual direction while stabilizing production behavior and starting the logic/UI split.

## Completed

- Repaired the 16 background registry paths to use the existing WebP assets.
- Removed the runtime `/api/save-logo` filesystem writer and switched the NOVYX logo to pre-generated transparent assets.
- Added a real favicon and base Open Graph image.
- Stopped `robots.txt` from blocking `/_next/` rendering assets.
- Made mock API usage explicit and production-safe unless a deliberate override is provided.
- Pinned Node/npm expectations and repaired the picomatch lock layout that caused clean-install peer resolution issues.
- Fixed missing CUTIS and DNA visual references without adding runtime 404s.
- Split contact form state/validation/submission/success UI and improved field accessibility/error mapping.
- Split product catalog state/filtering into a feature hook and synchronized `?cat=` with the URL.
- Moved calculator math into a pure function and state into a feature hook; invalid inputs no longer return a misleading zero result.
- Paused the hero canvas when it is off-screen/hidden and respected reduced-motion.
- Removed React state updates from GlassCard pointer tracking; spotlight/tilt now use CSS variables + requestAnimationFrame.
- Added the base OG/Twitter image metadata and shortened page titles so the root NOVYX title template does not duplicate the brand.

## Validation in this environment

- TypeScript syntax transpilation over every `src/**/*.ts(x)` file: passed.
- Local `@/` and relative import existence scan: passed.
- Static public asset reference scan: passed with no missing file references.
- `npm ci --offline` now passes the prior picomatch peer-resolution point and stops only because package tarballs are not cached in this environment.

A full `npm ci`, ESLint, and Next production build should be run on a machine/CI runner with npm registry access before deployment.
