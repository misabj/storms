import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "storms_admin_session";
const secret = () => new TextEncoder().encode(process.env.SESSION_SECRET || "development-only-change-this-secret");

export async function createSession() {
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const token = await new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(secret());
  (await cookies()).set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires: expiresAt });
}

export async function verifySessionToken(token?: string) {
  if (!token) return false;
  try { const { payload } = await jwtVerify(token, secret()); return payload.role === "admin"; } catch { return false; }
}

export async function isAuthenticated() { return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value); }
export async function destroySession() { (await cookies()).delete(SESSION_COOKIE); }
