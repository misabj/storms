import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export const metadata = { title: "Admin prijava", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[#11110f] lg:grid lg:grid-cols-[1.08fr_.92fr]">
    <section className="relative hidden min-h-screen overflow-hidden lg:block">
      <Image src="/images/about/material-studio.png" alt="STORMS arhitektura i materijali" fill priority quality={95} sizes="55vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />
      <div className="absolute inset-0 flex flex-col justify-between p-12 xl:p-16">
        <Link href="/sr" aria-label="Nazad na STORMS početnu stranu" className="w-40 transition-opacity hover:opacity-75">
          <Image src="/brand/storms-logo.png" alt="STORMS" width={1600} height={616} priority className="h-auto w-full" />
        </Link>
        <div className="max-w-2xl text-white"><p className="eyebrow mb-7 text-white/55">STORMS · Beograd</p><p className="font-[var(--font-editorial)] text-[clamp(3.2rem,5vw,6.4rem)] leading-[.9] tracking-[-.04em]">Prostor oblikovan da traje.</p><div className="mt-9 h-px w-24 bg-[#c6aa73]" /></div>
      </div>
    </section>

    <section className="flex min-h-screen w-full min-w-0 flex-col overflow-hidden bg-[#f2f0eb] p-6 text-[#171816] sm:p-10 lg:p-12 xl:p-16">
      <header className="flex min-w-0 items-center justify-between">
        <Link href="/sr" aria-label="Nazad na STORMS početnu stranu" className="w-32 transition-opacity hover:opacity-75 lg:hidden"><Image src="/brand/storms-logo.png" alt="STORMS" width={1600} height={616} priority className="h-auto w-full" /></Link>
        <Link href="/sr" className="ml-auto inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.16em] text-black/50 transition hover:text-black"><ArrowLeft size={15} strokeWidth={1.5}/><span className="hidden sm:inline">Nazad na sajt</span><span className="sm:hidden">Nazad</span></Link>
      </header>

      <div className="my-auto w-full min-w-0 max-w-lg py-16 lg:mx-auto">
        <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#a34838]/30 text-[#a34838]"><ShieldCheck size={23} strokeWidth={1.35}/></div>
        <p className="eyebrow mb-5 text-[#a34838]">Siguran pristup</p>
        <h1 className="max-w-md font-[var(--font-editorial)] text-[clamp(3.1rem,5vw,5rem)] leading-[.91] tracking-[-.04em]">Prijava u administraciju.</h1>
        <p className="mt-6 max-w-md break-words leading-relaxed text-black/50">Pristup je namenjen ovlašćenim članovima STORMS tima.</p>
        <div className="mt-12 border-t border-black/15 pt-8"><LoginForm /></div>
      </div>

      <footer className="flex items-center justify-between border-t border-black/10 pt-5 text-[9px] font-bold uppercase tracking-[.15em] text-black/35"><span>STORMS Admin</span><span>Zaštićena zona</span></footer>
    </section>
  </main>;
}
