"use client";

import { useActionState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { submitInquiryAction, type InquiryFormState } from "@/app/kontakt/actions";
import type { Locale } from "@/lib/i18n";

const initialState: InquiryFormState = { ok: false, message: "" };

export function ContactForm({ locale }: { locale: Locale }) {
  const action = submitInquiryAction.bind(null, locale);
  const [state, formAction, pending] = useActionState(action, initialState);
  const sr = locale === "sr";
  const fieldError = (name: string) => state.errors?.[name]?.[0];
  return <form action={formAction} className="grid gap-7 bg-[#e3dfd6] p-[var(--gutter)] text-[#171816] md:p-14 lg:p-20">
    <div className="mb-3 flex items-start justify-between gap-6 border-b border-black/20 pb-7"><div><p className="eyebrow mb-4 text-[#a34838]">{sr ? "Pošaljite upit" : "Send an enquiry"}</p><h2 className="font-[var(--font-editorial)] text-[clamp(2.7rem,5vw,5.5rem)] leading-[.9] tracking-[-.045em]">{sr ? "Kako možemo da pomognemo?" : "How can we help?"}</h2></div><ArrowUpRight className="mt-1 shrink-0 text-[#a34838]" size={30} strokeWidth={1.4} /></div>
    <fieldset><legend className="eyebrow mb-4 text-black/50">{sr ? "Interesovanje" : "I am interested in"}</legend><div className="grid gap-2 sm:grid-cols-3">{[["APARTMENT",sr?"Prodaja stanova":"Apartments"],["COMMERCIAL",sr?"Poslovni prostor":"Commercial"],["LUXURY",sr?"Lux stanovi":"Luxury"]].map(([value,label],index)=><label key={value} className="cursor-pointer"><input className="peer sr-only" type="radio" name="category" value={value} defaultChecked={index===0}/><span className="flex min-h-14 items-center justify-center border border-black/20 px-3 text-center text-xs uppercase tracking-[.13em] transition peer-checked:border-[#a34838] peer-checked:bg-[#a34838] peer-checked:text-white">{label}</span></label>)}</div>{fieldError("category")&&<p className="mt-2 text-sm text-[#a34838]">{fieldError("category")}</p>}</fieldset>
    <div className="grid gap-7 sm:grid-cols-2"><label className="grid gap-3"><span className="eyebrow text-black/50">{sr?"Ime i prezime":"Full name"}</span><input name="name" required autoComplete="name" className="border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg outline-none transition placeholder:text-black/30 focus:border-[#a34838]" placeholder={sr?"Vaše ime":"Your name"}/>{fieldError("name")&&<span className="text-sm text-[#a34838]">{fieldError("name")}</span>}</label><label className="grid gap-3"><span className="eyebrow text-black/50">Email</span><input name="email" type="email" required autoComplete="email" className="border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg outline-none transition placeholder:text-black/30 focus:border-[#a34838]" placeholder="ime@email.com"/>{fieldError("email")&&<span className="text-sm text-[#a34838]">{fieldError("email")}</span>}</label></div>
    <label className="grid gap-3"><span className="eyebrow text-black/50">{sr?"Telefon":"Phone"}</span><input name="phone" type="tel" autoComplete="tel" className="border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg outline-none transition placeholder:text-black/30 focus:border-[#a34838]" placeholder="+381"/></label>
    <label className="grid gap-3"><span className="eyebrow text-black/50">{sr?"Poruka":"Message"}</span><textarea name="message" required rows={5} className="resize-none border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg leading-relaxed outline-none transition placeholder:text-black/30 focus:border-[#a34838]" placeholder={sr?"Napišite šta tražite, željenu lokaciju ili kvadraturu...":"Tell us what you are looking for, preferred location or size..."}/>{fieldError("message")&&<span className="text-sm text-[#a34838]">{fieldError("message")}</span>}</label>
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    {state.message&&<p role="status" className={`flex items-center gap-3 border p-4 text-sm ${state.ok?"border-emerald-400/35 bg-emerald-400/10 text-emerald-100":"border-red-300/35 bg-red-300/10 text-red-100"}`}>{state.ok&&<CheckCircle2 size={18}/>} {state.message}</p>}
    <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-md text-xs leading-relaxed text-black/45">{sr?"Slanjem forme saglasni ste da vas kontaktiramo u vezi sa izabranom vrstom nekretnine.":"By submitting, you agree that we may contact you about the selected property category."}</p><button disabled={pending} className="min-h-14 shrink-0 border border-[#a34838] bg-[#a34838] px-8 text-xs uppercase tracking-[.16em] text-white transition hover:bg-transparent hover:text-[#a34838] disabled:opacity-50">{pending?(sr?"Šalje se...":"Sending..."):(sr?"Pošalji upit":"Send enquiry")}</button></div>
  </form>;
}
