import { NextResponse } from "next/server";
import {
  clearAdminSession,
  isAdminAuthConfigured,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/server/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { detail: "Admin authentication is not configured. Set ADMIN_PASSWORD and AUTH_SECRET." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || !verifyAdminPassword(body.password)) {
    return NextResponse.json({ detail: "Invalid password." }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true });
}
