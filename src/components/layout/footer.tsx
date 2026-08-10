import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/types";
import { dictionary, type Locale } from "@/lib/i18n";

export function Footer({ settings, locale = "sr", dark = false }: { settings: SiteSettings; locale?: Locale; dark?: boolean }) {
  const d=dictionary[locale];const prefix=`/${locale}`;
  return <footer className={`pb-8 pt-20 md:pt-28 ${dark ? "border-t border-white/15 bg-[#0e0e0c] text-[#eee9df]" : "border-t border-black/10 bg-[#e3dfd6] text-[#171816]"}`}>
    <div className="container">
      <div className="grid gap-16 pb-24 md:grid-cols-[1.5fr_1fr_1fr]">
        <div><Image src="/brand/storms-logo.png" alt="STORMS" width={1600} height={616} className="w-48" /><p className={`mt-8 max-w-sm text-lg ${dark ? "text-white/55" : "text-black/55"}`}>{settings.footerText}</p></div>
        <div className="grid content-start gap-3 text-sm"><p className={`eyebrow mb-3 ${dark ? "text-white/35" : "text-black/40"}`}>{locale==="sr"?"Navigacija":"Navigation"}</p><Link href={`${prefix}/prodaja-stanova`}>{d.nav.apartments}</Link><Link href={`${prefix}/poslovni-prostori`}>{d.nav.commercial}</Link><Link href={`${prefix}/lux-stanovi`}>{d.nav.luxury}</Link><Link href={`${prefix}/izvedeni-projekti`}>{d.nav.completed}</Link><Link href={`${prefix}/o-nama`}>{d.nav.about}</Link></div>
        <div className="grid content-start gap-3 text-sm"><p className={`eyebrow mb-3 ${dark ? "text-white/35" : "text-black/40"}`}>{d.nav.contact}</p><a href={`tel:${settings.phone}`}>{settings.phone}</a><a href={`mailto:${settings.email}`}>{settings.email}</a><p>{settings.address}</p></div>
      </div>
      <div className={`flex flex-wrap justify-between gap-4 border-t pt-6 text-[10px] uppercase tracking-[.14em] ${dark ? "border-white/15 text-white/45" : "border-black/15 text-black/45"}`}><span>© {new Date().getFullYear()} STORMS</span><span>{locale==="sr"?"Beograd · Srbija":"Belgrade · Serbia"}</span><Link href="/admin/login">{locale==="sr"?"Administracija":"Administration"}</Link></div>
    </div>
  </footer>;
}
