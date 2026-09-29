import { NextResponse } from "next/server";
import { contactPayloadSchema } from "@/lib/api/types";
import { createInquiry } from "@/lib/server/content-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { detail: "Please review the submitted fields.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const inquiry = await createInquiry("contact", parsed.data);
  return NextResponse.json({
    success: true,
    ticketId: inquiry.id,
    message: "Thank you. Your inquiry has been received.",
  });
}
