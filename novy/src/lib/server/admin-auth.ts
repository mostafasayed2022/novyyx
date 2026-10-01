import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "novyx_admin_session";

function getSecret(): string {
  return process.env.AUTH_SECRET?.trim() || "";
}

const SESSION_SECONDS = 60 * 60 * 12;

function signSession(payload: string): string {
  return createHmac("sha256", getSecret()).update(`novyx-admin-v2:${payload}`).digest("hex");
}

function sessionToken(): string {
  if (!isAdminAuthConfigured()) return "";
  const payload = `${Math.floor(Date.now() / 1000) + SESSION_SECONDS}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${signSession(payload)}`;
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
  if (!isAdminAuthConfigured()) return false;
  const [expiry, nonce, signature, extra] = value.split(".");
  if (extra || !/^\d+$/.test(expiry || "") || !/^[a-f0-9]{32}$/.test(nonce || "") || !/^[a-f0-9]{64}$/.test(signature || "")) return false;
  const expiresAt = Number(expiry);
  const now = Math.floor(Date.now() / 1000);
  return expiresAt > now && expiresAt <= now + SESSION_SECONDS && safeEqual(signature, signSession(`${expiry}.${nonce}`));
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
    maxAge: SESSION_SECONDS,
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
