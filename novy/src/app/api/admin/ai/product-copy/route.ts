import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { codeCraftJson } from "@/lib/server/codecraft";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: string; category?: string; productType?: string; scientificName?: string; description?: string; vialSizeMg?: number }
    | null;
  if (!body?.name?.trim()) {
    return NextResponse.json({ detail: "Product name is required." }, { status: 400 });
  }

  try {
    const result = await codeCraftJson(
      `You are writing concise website copy for NOVYX, a premium biotechnology research brand.\n\nProduct: ${body.name}\nProduct group: ${body.productType || "peptide"}\nCategory: ${body.category || "research"}\nScientific name/current context: ${body.scientificName || ""}\nExisting description: ${body.description || ""}\nVial size: ${body.vialSizeMg || 0} mg\n\nReturn ONLY valid JSON with these string keys: scientificName, tagline, description, storageConditions, reconstitutionNotes. Keep the tone premium, technical, concise, original, and suitable for a professional research website. Do not make medical, therapeutic, diagnostic, efficacy, weight-loss, treatment, or human-use claims. Use research-only language.`,
      900,
    );

    return NextResponse.json({
      scientificName: typeof result.scientificName === "string" ? result.scientificName : undefined,
      tagline: typeof result.tagline === "string" ? result.tagline : undefined,
      description: typeof result.description === "string" ? result.description : undefined,
      storageConditions: typeof result.storageConditions === "string" ? result.storageConditions : undefined,
      reconstitutionNotes: typeof result.reconstitutionNotes === "string" ? result.reconstitutionNotes : undefined,
    });
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "CodeCraft request failed." },
      { status: 502 },
    );
  }
}
