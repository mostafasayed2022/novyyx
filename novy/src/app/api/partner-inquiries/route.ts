import { NextResponse } from "next/server";
import { partnerInquiryPayloadSchema } from "@/lib/api/types";
import { createInquiry } from "@/lib/server/content-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = partnerInquiryPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ detail: "Invalid inquiry payload." }, { status: 400 });
  }

  const inquiry = await createInquiry("partner", parsed.data);
  return NextResponse.json({
    success: true,
    inquiryId: inquiry.id,
    message: "Partnership inquiry received.",
  });
}
