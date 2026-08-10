import Link from "next/link";
import { getProjects } from "@/repositories/projects";
import { getInquiries } from "@/repositories/inquiries";

export default async function Dashboard() {
  const [projects, inquiries] = await Promise.all([getProjects(), getInquiries()]);
  const count = (status: string) => projects.filter((project) => project.status === status).length;
  return <><p className="eyebrow mb-4">Administracija</p><h1 className="text-5xl tracking-[-.05em]">Pregled</h1><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Novi upiti",inquiries.filter((item)=>item.status==="NEW").length],["Aktivni",count("ACTIVE")],["Završeni",count("COMPLETED")],["Draft",count("DRAFT")]].map(([label,number],index)=><div key={label} className={`border p-7 ${index===0?"border-[#a34838] bg-[#a34838] text-white":"border-black/10 bg-white"}`}><p className="eyebrow opacity-55">{label}</p><p className="mt-6 text-5xl">{number}</p></div>)}</div><div className="mt-12 flex flex-wrap gap-3"><Link href="/admin/inquiries" className="button">Pregledaj upite</Link><Link href="/admin/projects/new" className="button ghost">+ Novi projekat</Link></div></>;
}
