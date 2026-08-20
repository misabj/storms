"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Project } from "@/types";
import { dictionary, type Locale } from "@/lib/i18n";

export function Header({ projects, overlay = false, locale = "sr", dark = false }: { projects: Project[]; overlay?: boolean; locale?: Locale; dark?: boolean }) {
  const d=dictionary[locale];const prefix=`/${locale}`;const pathname=usePathname();
  const categories = [
    { label: d.nav.apartments, href: `${prefix}/prodaja-stanova`, value: "APARTMENT" },
    { label: d.nav.commercial, href: `${prefix}/poslovni-prostori`, value: "COMMERCIAL" },
    { label: d.nav.luxury, href: `${prefix}/lux-stanovi`, value: "LUXURY" },
  ] as const;
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<Project["category"] | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const solid = scrolled || open || !overlay || !!activeMenu;const alternate=pathname.replace(/^\/(sr|en)/,locale==="sr"?"/en":"/sr");

  const menuProjects=projects.filter(project=>project.category===activeMenu&&project.showInNavigation).slice(0,3);
  const activeCategory=categories.find(category=>category.value===activeMenu);

  return <header onMouseLeave={()=>setActiveMenu(null)} className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? dark ? "bg-[#11110f] text-[#eee9df] border-b border-white/10" : "bg-[#f2f0eb] text-[#171816] border-b border-black/10" : "text-white"}`}>
    <div className="container flex h-[var(--header-height)] items-center justify-between gap-8">
      <Link href={prefix} aria-label="STORMS početna" className="relative z-50 block w-[104px] shrink-0 translate-y-[3px] md:w-[128px] md:translate-y-[4px]">
        <Image src="/brand/storms-logo.png" alt="STORMS" width={1600} height={616} priority className="h-auto w-full" />
      </Link>
      <nav className="hidden flex-1 items-center justify-end gap-[clamp(12px,1.25vw,26px)] lg:flex">
        {categories.map((cat) => <Link key={cat.value} onMouseEnter={()=>setActiveMenu(cat.value)} className={`eyebrow whitespace-nowrap py-8 transition-opacity ${activeMenu&&activeMenu!==cat.value?"opacity-35":""}`} href={cat.href}>{cat.label}</Link>)}
        <Link onMouseEnter={()=>setActiveMenu(null)} className="eyebrow whitespace-nowrap py-8" href={`${prefix}/izvedeni-projekti`}>{d.nav.completed}</Link>
        <Link onMouseEnter={()=>setActiveMenu(null)} className="eyebrow whitespace-nowrap py-8" href={`${prefix}/o-nama`}>{d.nav.about}</Link>
        <Link onMouseEnter={()=>setActiveMenu(null)} className="eyebrow whitespace-nowrap py-8" href={`${prefix}/kontakt`}>{d.nav.contact}</Link>
        <Link onMouseEnter={()=>setActiveMenu(null)} className="eyebrow whitespace-nowrap border-l border-current/20 py-8 pl-4 opacity-65 hover:opacity-100" href={alternate}>{locale === "sr" ? "EN" : "SR"}</Link>
      </nav>
      <button aria-label={open ? "Zatvori meni" : "Otvori meni"} aria-expanded={open} onClick={() => setOpen(!open)} className={`relative z-50 grid h-12 w-12 shrink-0 place-items-center rounded-full lg:hidden ${solid ? dark ? "bg-white/10 text-white" : "bg-black/5 text-[#171816]" : "bg-[#171816]/75 text-white"}`}>{open ? <X /> : <Menu />}</button>
    </div>
    <div className={`absolute inset-x-0 top-full hidden overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,.14)] transition-all duration-300 lg:block ${dark ? "bg-[#11110f] text-white" : "bg-[#f2f0eb] text-[#171816]"} ${activeMenu?"pointer-events-auto translate-y-0 opacity-100":"pointer-events-none -translate-y-3 opacity-0"}`}>
      <div className="container grid grid-cols-[.72fr_2.28fr] gap-12 py-9">
        <div className={`flex flex-col justify-between border-r pr-10 ${dark ? "border-white/15" : "border-black/15"}`}>
          <div><p className={`eyebrow ${dark ? "text-[#bca16f]" : "text-[#a34838]"}`}>{d.nav.active}</p><h2 className="mt-5 font-[var(--font-editorial)] text-5xl leading-[.9]">{activeCategory?.label}</h2></div>
          {activeCategory&&<Link href={activeCategory.href} className="text-link self-start">{locale==="sr"?"Pogledaj kolekciju":"View collection"}<span>→</span></Link>}
        </div>
        <div className="grid grid-cols-3 gap-5">
          {menuProjects.map((project,index)=><Link key={project.id} href={`${prefix}/projekti/${project.slug}`} className="group/card block">
            <div className="relative aspect-[16/10] overflow-hidden bg-white/5"><Image src={project.heroImage} alt="" fill sizes="26vw" className="object-cover transition duration-700 group-hover/card:scale-[1.035]"/><span className="absolute left-3 top-3 grid h-7 w-7 place-items-center bg-black/55 text-[9px] tracking-wider backdrop-blur">0{index+1}</span></div>
            <div className={`mt-3 flex items-start justify-between border-t pt-3 ${dark ? "border-white/15" : "border-black/15"}`}><div><h3 className="font-[var(--font-editorial)] text-2xl leading-none">{project.title}</h3><p className={`mt-2 text-[9px] uppercase tracking-[.16em] ${dark ? "text-white/45" : "text-black/45"}`}>{project.address}</p></div><span className="transition-transform group-hover/card:translate-x-1">↗</span></div>
          </Link>)}
        </div>
      </div>
    </div>
    <div className={`absolute inset-x-0 top-full z-40 h-[calc(100svh-var(--header-height))] overflow-y-auto overscroll-contain transition duration-300 lg:hidden ${dark ? "bg-[#11110f] text-[#eee9df]" : "bg-[#f2f0eb] text-[#171816]"} ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`}>
      <nav className="container flex min-h-full flex-col py-6 sm:py-8">
        <div className="grid">
          {categories.map((cat, index) => <Link onClick={() => setOpen(false)} key={cat.value} href={cat.href} className={`group flex min-w-0 items-center justify-between gap-5 border-t py-5 sm:py-6 ${dark ? "border-white/15" : "border-black/15"}`}>
            <span className="min-w-0 break-words font-[var(--font-editorial)] text-[clamp(2.15rem,7vw,4.4rem)] leading-[.9] tracking-[-.045em]">{cat.label}</span><span className={`eyebrow shrink-0 ${dark ? "text-white/35" : "text-black/35"}`}>0{index + 1} ↗</span>
          </Link>)}
          {[ [d.nav.completed,`${prefix}/izvedeni-projekti`], [d.nav.about,`${prefix}/o-nama`], [d.nav.contact,`${prefix}/kontakt`] ].map(([label, href], index) => <Link onClick={() => setOpen(false)} key={href} href={href} className={`group flex min-w-0 items-center justify-between gap-5 border-t py-4 sm:py-5 ${dark ? "border-white/15" : "border-black/15"}`}><span className="min-w-0 break-words text-xl tracking-[-.025em] sm:text-2xl">{label}</span><span className={`eyebrow shrink-0 ${dark ? "text-white/35" : "text-black/35"}`}>0{index + 4} ↗</span></Link>)}
        </div>
        <div className={`mt-auto flex items-end justify-between gap-6 border-t pb-2 pt-7 ${dark ? "border-white/15" : "border-black/15"}`}><div><p className={`eyebrow mb-2 ${dark ? "text-white/35" : "text-black/35"}`}>STORMS</p><p className={`max-w-[240px] text-sm ${dark ? "text-white/55" : "text-black/55"}`}>{locale === "sr" ? "Arhitektura. Izgradnja. Vrednost." : "Architecture. Construction. Value."}</p></div><div className="flex shrink-0 gap-2"><Link onClick={() => setOpen(false)} href={alternate} className={`eyebrow rounded-full border px-5 py-4 ${dark ? "border-white/20" : "border-black/20"}`}>{locale === "sr" ? "EN" : "SR"}</Link></div></div>
      </nav>
    </div>
  </header>;
}
