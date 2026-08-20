import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/types";
import { dictionary, type Locale } from "@/lib/i18n";
import { BackToTop } from "./back-to-top";
import { Instagram, Linkedin, Facebook } from "./social-icons";

export function Footer({ settings, locale = "sr", dark = false }: { settings: SiteSettings; locale?: Locale; dark?: boolean }) {
  const d = dictionary[locale]; const prefix = `/${locale}`;
  const line = dark ? "border-white/12" : "border-black/12";
  const muted = dark ? "text-white/45" : "text-black/45";
  const socials = [
    settings.instagram && { Icon: Instagram, href: settings.instagram, label: "Instagram" },
    settings.linkedin && { Icon: Linkedin, href: settings.linkedin, label: "LinkedIn" },
    settings.facebook && { Icon: Facebook, href: settings.facebook, label: "Facebook" },
  ].filter(Boolean) as { Icon: typeof Instagram; href: string; label: string }[];
  const nav: [string, string][] = [
    [d.nav.apartments, `${prefix}/prodaja-stanova`],
    [d.nav.commercial, `${prefix}/poslovni-prostori`],
    [d.nav.luxury, `${prefix}/lux-stanovi`],
    [d.nav.completed, `${prefix}/izvedeni-projekti`],
    [d.nav.about, `${prefix}/o-nama`],
    [d.nav.contact, `${prefix}/kontakt`],
  ];

  return <footer className={`site-footer ${dark ? "bg-[#0e0e0c] text-[#eee9df]" : "bg-[#e3dfd6] text-[#171816]"}`}>
    <div className={`site-footer__main container flex flex-col gap-6 border-t py-7 md:flex-row md:items-center md:justify-between ${line}`}>
      <div className="site-footer__brand flex items-center gap-6">
        <Link href={prefix} aria-label="STORMS"><Image src="/brand/storms-logo.png" alt="STORMS" width={1600} height={616} className="site-footer__logo w-28" /></Link>
        <p className={`site-footer__tagline hidden text-sm sm:block ${muted}`}>{settings.footerText}</p>
      </div>
      <nav className="site-footer__nav flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[.16em]">
        {nav.map(([label, href], index) => <Link key={href} href={href} className={`opacity-70 transition hover:opacity-100 ${index === nav.length - 1 ? "site-footer__contact-link" : ""}`}>{label}</Link>)}
      </nav>
      <div className="site-footer__contact md:hidden">
        <p className={`eyebrow ${muted}`}>{locale === "sr" ? "Kontakt" : "Contact"}</p>
        <div className="mt-8 grid gap-4 text-lg">
          <a href={`tel:${settings.phone}`}>{settings.phone}</a>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          <p>{settings.address}</p>
        </div>
      </div>
      <div className="site-footer__socials flex items-center gap-4">
        {socials.map(({ Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="opacity-65 transition hover:text-[#a34838] hover:opacity-100"><Icon size={18} strokeWidth={1.6} /></a>)}
        <BackToTop label={locale === "sr" ? "Vrh" : "Top"} className={`text-[11px] font-bold uppercase tracking-[.16em] opacity-70 transition hover:opacity-100 ${socials.length ? "border-l pl-4 " + line : ""}`} />
      </div>
    </div>
    <div className={`site-footer__bottom container flex flex-wrap items-center justify-between gap-3 border-t py-4 text-[10px] uppercase tracking-[.14em] ${line} ${muted}`}>
      <span>© {new Date().getFullYear()} STORMS</span>
      <span>{locale === "sr" ? "Beograd · Srbija" : "Belgrade · Serbia"}</span>
      <div className="flex gap-5">
        <a href={`tel:${settings.phone}`} className="transition hover:text-[#a34838]">{settings.phone}</a>
        <Link href="/admin/login" className="transition hover:text-[#a34838]">{locale === "sr" ? "Administracija" : "Administration"}</Link>
      </div>
    </div>
  </footer>;
}
