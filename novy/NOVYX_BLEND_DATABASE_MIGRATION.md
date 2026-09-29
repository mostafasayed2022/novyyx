# NOVYX Blend Series — database-only migration

The 16 NOVYX Blend Series records are seeded directly into the persistent content store.

## What happens

- Store schema version is `4`.
- On the first request after deployment/startup, `content-store.ts` normalizes the existing store.
- Any missing Blend Series records are appended to the database store.
- Existing products and dashboard edits are preserved.
- The migration is idempotent: matching product IDs/slugs are not duplicated.
- Old local `/products/blends/*` image references are cleared.
- Cloudinary or other external image URLs are preserved.
- Blend seed records have `imageUrl: ""`; artwork can be uploaded later from `/admin`.
- No generated Blend Series images are shipped in `public/products/blends`.

## Turso

When `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are configured, the migration is persisted to the `novyx_content_store` record in Turso automatically.

Opening `/admin/products`, `/products/peptides`, or any route that reads the content store is enough to trigger the migration.
