"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { databaseConfigured, getPool } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

export type InquiryFormState = { ok: boolean; message: string; errors?: Record<string, string[]> };

const schema = z.object({
  category: z.enum(["APARTMENT", "COMMERCIAL", "LUXURY"]),
  name: z.string().trim().min(2).max(160),
  email: z.email().max(190),
  phone: z.string().trim().max(80),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0),
});

export async function submitInquiryAction(locale: Locale, _previous: InquiryFormState, formData: FormData): Promise<InquiryFormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: locale === "sr" ? "Proverite označena polja." : "Please check the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  if (!databaseConfigured()) return { ok: false, message: locale === "sr" ? "Forma trenutno nije povezana sa bazom. Podesite DATABASE_* promenljive." : "The form is not connected to the database yet. Configure the DATABASE_* variables." };
  const data = parsed.data;
  try {
    await getPool().execute("INSERT INTO inquiries(category,name,email,phone,message,locale,sourcePath,status) VALUES(?,?,?,?,?,?,?,'NEW')", [data.category, data.name, data.email, data.phone, data.message, locale, `/${locale}/kontakt`]);
    revalidateTag("inquiries", "max");
    return { ok: true, message: locale === "sr" ? "Hvala. Vaš upit je uspešno poslat." : "Thank you. Your enquiry has been sent." };
  } catch {
    return { ok: false, message: locale === "sr" ? "Upit trenutno nije moguće poslati. Pokušajte ponovo ili nas kontaktirajte telefonom." : "The enquiry could not be sent. Please try again or contact us by phone." };
  }
}
