# NOVYX — Next.js Dashboard Upgrade

## Included

- Protected `/admin` dashboard inside the existing Next.js app.
- Product CRUD with Draft/Published, Featured, stock status, Peptides/Skin Boosters grouping, and Cloudinary image upload.
- Homepage Hero CMS with Draft/Published slides and Cloudinary image upload.
- Inquiry inbox for contact/partner forms with New, In progress, and Resolved statuses.
- Public product API powered by the same Next.js application.
- Public product pages read dashboard-managed content.
- Dedicated Peptides and Skin Boosters catalog routes.
- CodeCraft server-side AI copy generation.
- Automatic English-to-German product and hero translation on save via CodeCraft.
- Turso persistent production storage with local/VPS JSON fallback.
- Admin session authentication using an HttpOnly cookie.
- Admin/API robots exclusions and dashboard-specific site shell.
- Cloudinary remote image support in `next/image`.
- Footer copyright fixed to 2023.

## Configure before first run

1. Copy `.env.example` to `.env.local`.
2. Set `ADMIN_PASSWORD` and a 32+ character `AUTH_SECRET`.
3. Set the Cloudinary credentials.
4. Set `CODECRAFT_API_KEY` and an active `CODECRAFT_MODEL`.
5. For Vercel production, set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`.
6. Run `npm install`, then `npm run build`.

See `DASHBOARD_SETUP.md` for the full route and environment reference.
