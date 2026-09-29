import "server-only";

import type { Product, ProductTranslation } from "@/lib/api/types";

function getConfig() {
  const apiKey = process.env.CODECRAFT_API_KEY?.trim();
  const baseUrl = (process.env.CODECRAFT_BASE_URL?.trim() || "https://codecraftapi.com/v1").replace(/\/$/, "");
  const model = process.env.CODECRAFT_MODEL?.trim() || "claude-opus-4.8";
  if (!apiKey) throw new Error("CODECRAFT_API_KEY is not configured.");
  return { apiKey, baseUrl, model };
}

function extractJson(text: string): Record<string, unknown> {
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const candidates = [cleaned, cleaned.match(/\{[\s\S]*\}/)?.[0]].filter(Boolean) as string[];
  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as Record<string, unknown>;
    } catch {
      // try the next candidate
    }
  }
  throw new Error("CodeCraft returned an unexpected non-JSON response.");
}

export async function codeCraftJson(prompt: string, maxTokens = 900): Promise<Record<string, unknown>> {
  const { apiKey, baseUrl, model } = getConfig();
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "Return only valid JSON. Do not use markdown fences." },
        { role: "user", content: prompt },
      ],
      temperature: 0.25,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
    }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as
    | { choices?: Array<{ message?: { content?: string } }>; error?: { message?: string } }
    | null;
// اعمل كده عشان الـ status يتمرر صح:
if (!response.ok) {
  const msg = data?.error?.message || `CodeCraft request failed with HTTP ${response.status}.`;
  const err = new Error(msg) as Error & { status: number };
  err.status = response.status;
  throw err;
}  const content = data?.choices?.[0]?.message?.content || "";
  return extractJson(content);
}

export async function translateProductToGerman(product: Product): Promise<ProductTranslation> {
  const result = await codeCraftJson(
    `Translate the following NOVYX product website fields from English to professional German. Preserve product names, chemical identifiers, units, trademarks, and scientific notation. Do not add medical, therapeutic, diagnostic, efficacy, weight-loss, treatment, or human-use claims. Keep the wording suitable for a research-only biotechnology website.\n\nReturn ONLY this JSON shape:\n{\n  "scientificName": "...",\n  "tagline": "...",\n  "description": "...",\n  "form": "...",\n  "storageConditions": "...",\n  "reconstitutionNotes": "..."\n}\n\nEnglish source:\n${JSON.stringify({
      scientificName: product.scientificName,
      tagline: product.tagline,
      description: product.description,
      form: product.form,
      storageConditions: product.storageConditions,
      reconstitutionNotes: product.reconstitutionNotes,
    })}`,
    1100,
  );

  return {
    scientificName: String(result.scientificName || product.scientificName),
    tagline: String(result.tagline || product.tagline),
    description: String(result.description || product.description),
    form: String(result.form || product.form),
    storageConditions: String(result.storageConditions || product.storageConditions),
    reconstitutionNotes: String(result.reconstitutionNotes || product.reconstitutionNotes),
  };
}

export async function translateHeroSlideToGerman(slide: {
  eyebrow: string;
  headlineSub: string;
  category: string;
  description: string;
  badge: string;
}) {
  const result = await codeCraftJson(
    `Translate the following NOVYX hero-slide website copy from English to premium, concise German. Preserve product names, scientific abbreviations, chemical terms, units, percentages, and trademarks. Do not add medical, therapeutic, diagnostic, efficacy, weight-loss, treatment, or human-use claims.\n\nReturn ONLY this JSON shape:\n{\n  "eyebrowDe": "...",\n  "headlineSubDe": "...",\n  "categoryDe": "...",\n  "descriptionDe": "...",\n  "badgeDe": "..."\n}\n\nEnglish source:\n${JSON.stringify(slide)}`,
    900,
  );

  return {
    eyebrowDe: String(result.eyebrowDe || slide.eyebrow),
    headlineSubDe: String(result.headlineSubDe || slide.headlineSub),
    categoryDe: String(result.categoryDe || slide.category),
    descriptionDe: String(result.descriptionDe || slide.description),
    badgeDe: String(result.badgeDe || slide.badge),
  };
}
