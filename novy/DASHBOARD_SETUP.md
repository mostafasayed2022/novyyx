# NOVYX Next.js Dashboard Setup

## Routes

- `/admin/login` — dashboard login
- `/admin` — overview
- `/admin/products` — product CRUD (Peptides + Skin Boosters)
- `/admin/hero` — homepage hero CRUD with Draft/Published status
- `/admin/inquiries` — website inquiry inbox with New / In progress / Resolved workflow
- `/products/peptides` — public Peptides catalog
- `/products/skin-boosters` — public Skin Boosters catalog
- `/api/products` — public product API
- `/api/contact` — public contact endpoint

## Environment

Copy `.env.example` to `.env.local` and set the real values.

### Admin

- `ADMIN_PASSWORD`: dashboard password.
- `AUTH_SECRET`: long random secret, 32+ characters.

### Cloudinary

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_FOLDER=novyx/products`

The browser uploads the image to the protected Next.js route `/api/admin/upload`. The Cloudinary API secret stays server-side and is never sent to the browser.

### CodeCraft API

- `CODECRAFT_API_KEY=cc_...`
- `CODECRAFT_BASE_URL=https://codecraftapi.com/v1`
- `CODECRAFT_MODEL=<active model id from /v1/models>`

The dashboard's **CodeCraft AI** button sends the request through `/api/admin/ai/product-copy`, so the API key remains server-side. Product and hero saves also generate and store the German copy server-side; the admin editor stays English-only.

## Content persistence

### Production / Vercel — Turso

Set:

```env
TURSO_DATABASE_URL=libsql://YOUR_DATABASE.turso.io
TURSO_AUTH_TOKEN=YOUR_TOKEN
```

The Next.js server uses the libSQL HTTP protocol directly, so no extra database package is required. Products, hero slides, translations, and inquiries are stored persistently in Turso.

### Local / self-hosted fallback

If Turso is not configured, the dashboard uses `.novyx-data/content.json`. On a VPS you can move it to a persistent backed-up path:

```env
NOVYX_DATA_DIR=/var/lib/novyx
```

Vercel filesystem storage is temporary, so configure Turso before using the dashboard in production.

## Production commands

```bash
npm install
npm run build
npm run start
```
