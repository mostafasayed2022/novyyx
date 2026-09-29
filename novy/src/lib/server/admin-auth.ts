import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "novyx_admin_session";

function getSecret(): string {
  return process.env.AUTH_SECRET?.trim() || "";
}

function sessionToken(): string {
  const secret = getSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update("novyx-admin-v1").digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim() && getSecret().length >= 32);
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD?.trim() || "";
  return Boolean(expected && safeEqual(password, expected));
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE_NAME)?.value || "";
  const expected = sessionToken();
  return Boolean(value && expected && safeEqual(value, expected));
}

export async function setAdminSession(): Promise<void> {
  const token = sessionToken();
  if (!token) throw new Error("AUTH_SECRET is not configured.");
  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
