import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { updateInquiryStatus } from "@/lib/server/content-store";
import type { InquiryStatus } from "@/lib/api/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedStatuses = new Set<InquiryStatus>(["new", "in-progress", "resolved"]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => null)) as { status?: InquiryStatus } | null;
  if (!body?.status || !allowedStatuses.has(body.status)) {
    return NextResponse.json({ detail: "Invalid inquiry status." }, { status: 400 });
  }

  const inquiry = await updateInquiryStatus(id, body.status);
  if (!inquiry) return NextResponse.json({ detail: "Inquiry not found." }, { status: 404 });
  return NextResponse.json(inquiry, { headers: { "Cache-Control": "no-store" } });
}
