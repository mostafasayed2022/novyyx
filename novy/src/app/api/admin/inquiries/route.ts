import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { listInquiries } from "@/lib/server/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await listInquiries(), { headers: { "Cache-Control": "no-store" } });
}
