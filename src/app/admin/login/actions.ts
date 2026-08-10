"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createHash } from "node:crypto";
import { createSession } from "@/lib/auth/session";
import { databaseConfigured, getPool } from "@/lib/db";

const attempts = new Map<string, { count: number; reset: number }>();
export async function loginAction(_state: { error: string }, formData: FormData) {
  const password = String(formData.get("password") || "");
  const requestHeaders=await headers();const ip=requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()||requestHeaders.get("x-real-ip")||"local";const key=createHash("sha256").update(`${ip}:${process.env.SESSION_SECRET||"dev"}`).digest("hex");
  const now = Date.now(); const record = attempts.get(key);
  let blocked=Boolean(record && record.reset > now && record.count >= 5);
  if(databaseConfigured()){const [rows]=await getPool().query("SELECT COUNT(*) AS count FROM login_attempts WHERE ipHash=? AND success=0 AND attemptedAt > DATE_SUB(NOW(), INTERVAL 15 MINUTE)",[key]);blocked=Number((rows as Array<{count:number}>)[0]?.count||0)>=5;}
  if (blocked) return { error: "Previše pokušaja. Pokušajte ponovo za 15 minuta." };
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash || !(await bcrypt.compare(password, hash))) {
    attempts.set(key, { count: record?.reset && record.reset > now ? record.count + 1 : 1, reset: now + 15 * 60 * 1000 });
    if(databaseConfigured())await getPool().execute("INSERT INTO login_attempts(ipHash,success) VALUES(?,0)",[key]);
    return { error: "Pogrešna lozinka." };
  }
  attempts.delete(key);if(databaseConfigured())await getPool().execute("INSERT INTO login_attempts(ipHash,success) VALUES(?,1)",[key]);await createSession(); redirect("/admin");
}
