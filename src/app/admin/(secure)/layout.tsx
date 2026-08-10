import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/session";
import { logoutAction } from "../actions";
export default async function AdminLayout({children}:{children:React.ReactNode}){if(!(await isAuthenticated()))redirect("/admin/login");return <div className="min-h-screen bg-[#f4f3ef]"><aside className="border-b border-black/10 bg-white p-5 md:fixed md:inset-y-0 md:w-64 md:border-b-0 md:border-r md:p-8"><Image src="/brand/storms-logo.png" alt="STORMS" width={1600} height={616} className="w-32"/><nav className="mt-10 flex flex-wrap gap-5 text-sm md:grid"><Link href="/admin">Pregled</Link><Link href="/admin/inquiries">Upiti</Link><Link href="/admin/projects">Projekti</Link><Link href="/admin/team">Tim</Link><Link href="/admin/settings">Podešavanja</Link><Link href="/" target="_blank">Otvori sajt ↗</Link></nav><form action={logoutAction} className="mt-10"><button className="text-xs uppercase tracking-widest text-black/45">Odjavi se</button></form></aside><main className="p-5 md:ml-64 md:p-12 lg:p-16">{children}</main></div>}
