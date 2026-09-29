# NOVYX local API fallback fix

The frontend still targets Django at `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000/api/`).

For local UI development, read-only GET requests automatically fall back to bundled mock data when the API is unreachable. This behavior is disabled in production and can be disabled locally with:

```env
NEXT_PUBLIC_API_FALLBACK_TO_MOCK=false
```

Mutating requests such as contact and partner inquiries do **not** use automatic fallback, so the UI cannot report a fake successful submission. To run the entire app explicitly in mock mode during development, use:

```env
NEXT_PUBLIC_USE_MOCK_API=true
```

For real Django integration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_FALLBACK_TO_MOCK=false
```
