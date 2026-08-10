import { Mail, Phone } from "lucide-react";
import { getInquiries } from "@/repositories/inquiries";
import { updateInquiryStatusAction } from "../../actions";

const categoryLabels = { APARTMENT: "Prodaja stanova", COMMERCIAL: "Poslovni prostor", LUXURY: "Lux stanovi" } as const;
const categoryStyles = { APARTMENT: "bg-[#e7e0d2]", COMMERCIAL: "bg-[#dbe4e6]", LUXURY: "bg-[#171816] text-[#d8bb81]" } as const;

export default async function InquiriesPage() {
  const inquiries = await getInquiries();
  const count = (category: keyof typeof categoryLabels) => inquiries.filter((item) => item.category === category).length;
  return <><p className="eyebrow mb-4">Kontakt forma</p><div className="flex flex-wrap items-end justify-between gap-5"><h1 className="text-5xl tracking-[-.05em]">Upiti klijenata</h1><p className="text-sm text-black/45">{inquiries.filter((item)=>item.status==="NEW").length} novih · {inquiries.length} ukupno</p></div>
    <div className="mt-10 grid gap-4 sm:grid-cols-3">{(["APARTMENT","COMMERCIAL","LUXURY"] as const).map((category)=><div key={category} className={`p-6 ${categoryStyles[category]}`}><p className="eyebrow opacity-55">{categoryLabels[category]}</p><p className="mt-5 text-4xl">{count(category)}</p></div>)}</div>
    <div className="mt-10 grid gap-4">{inquiries.map((item)=><article key={item.id} className={`border bg-white p-6 md:p-8 ${item.status==="NEW"?"border-[#a34838]":"border-black/10"}`}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="mb-4 flex flex-wrap items-center gap-3"><span className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] ${categoryStyles[item.category]}`}>{categoryLabels[item.category]}</span><span className="eyebrow text-black/35">{item.status}</span></div><h2 className="text-2xl">{item.name}</h2><div className="mt-3 flex flex-wrap gap-5 text-sm text-black/55"><a className="flex items-center gap-2" href={`mailto:${item.email}`}><Mail size={15}/>{item.email}</a>{item.phone&&<a className="flex items-center gap-2" href={`tel:${item.phone}`}><Phone size={15}/>{item.phone}</a>}</div></div><time className="text-xs text-black/40">{new Intl.DateTimeFormat("sr-RS",{dateStyle:"medium",timeStyle:"short"}).format(new Date(item.createdAt))}</time></div><p className="mt-7 max-w-3xl whitespace-pre-wrap border-t border-black/10 pt-6 leading-relaxed text-black/70">{item.message}</p><form action={updateInquiryStatusAction} className="mt-7 flex flex-wrap gap-2"><input type="hidden" name="id" value={item.id}/>{item.status!=="READ"&&<button name="status" value="READ" className="button">Označi kao pročitano</button>}<button name="status" value="ARCHIVED" className="button ghost">Arhiviraj</button></form></article>)}{!inquiries.length&&<div className="border border-dashed border-black/20 bg-white p-12 text-center text-black/45">Još nema sačuvanih upita. Kada baza bude povezana, novi upiti sa kontakt forme pojaviće se ovde.</div>}</div>
  </>;
}
