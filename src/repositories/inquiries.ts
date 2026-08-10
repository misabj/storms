import { unstable_cache } from "next/cache";
import { databaseConfigured, getPool } from "@/lib/db";
import type { Inquiry } from "@/types";

type Row = Record<string, unknown>;

async function readInquiries(): Promise<Inquiry[]> {
  if (!databaseConfigured()) return [];
  const [rows] = await getPool().query("SELECT id,category,name,email,phone,message,locale,sourcePath,status,createdAt FROM inquiries ORDER BY createdAt DESC");
  return (rows as Row[]).map((row) => ({
    id: Number(row.id), category: String(row.category) as Inquiry["category"], name: String(row.name), email: String(row.email), phone: String(row.phone || ""), message: String(row.message), locale: String(row.locale) as Inquiry["locale"], sourcePath: String(row.sourcePath || "/kontakt"), status: String(row.status) as Inquiry["status"], createdAt: row.createdAt instanceof Date ? row.createdAt : String(row.createdAt),
  }));
}

export const getInquiries = unstable_cache(readInquiries, ["inquiries"], { tags: ["inquiries"], revalidate: 30 });
