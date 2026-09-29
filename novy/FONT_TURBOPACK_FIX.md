# Turbopack / next/font build fix

The project no longer imports fonts from `next/font/google` in `src/app/layout.tsx`.
Typography is defined with resilient CSS stacks in `src/app/globals.css`.

This avoids the Turbopack internal font resolver failure:

`Module not found: Can\'t resolve '@Vercel/turbopack-next/internal/font/google/font'`

## Clean local restart

From the actual Next.js app folder (`Novax_3d/novax`):

```bash
rm -rf .next node_modules
npm cache verify
npm ci
npm run dev
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .next,node_modules -ErrorAction SilentlyContinue
npm cache verify
npm ci
npm run dev
```

Node 22.16.0 and npm 10.9.2 are the intended versions for this snapshot.
