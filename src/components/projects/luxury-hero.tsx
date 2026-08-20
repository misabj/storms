"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "@/types";
import { dictionary, type Locale } from "@/lib/i18n";

export function LuxuryHero({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const d = dictionary[locale];
  const sr = locale === "sr";

  useEffect(() => {
    if (projects.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % projects.length), 9000);
    return () => window.clearInterval(timer);
  }, [projects.length]);

  if (!projects.length) return null;
  const project = projects[active];
  const move = (direction: number) => setActive((current) => (current + direction + projects.length) % projects.length);

  return (
    <section className="luxury-collection container pb-20 md:pb-28">
      <div className="luxury-collection__frame grid min-h-[720px] min-w-0 overflow-hidden border border-white/15 bg-[#171713] lg:grid-cols-[minmax(0,1.55fr)_minmax(330px,.55fr)]">
        <div className="relative min-h-[560px] min-w-0 overflow-hidden lg:min-h-[720px]">
          {projects.map((item, index) => (
            <Link href={`/${locale}/projekti/${item.slug}`} aria-label={`${d.common.view}: ${item.title}`} key={item.id} className={`absolute inset-0 transition-all duration-[1400ms] ${index === active ? "scale-100 opacity-100" : "pointer-events-none scale-[1.025] opacity-0"}`} aria-hidden={index !== active} tabIndex={index === active ? 0 : -1}>
              <Image src={item.heroImage} alt={item.title} fill priority={index === 0} quality={95} sizes="(max-width: 1024px) 100vw, 72vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/35" />
            </Link>
          ))}

          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-6 md:p-9">
            <p className="eyebrow text-[#d0ad6b]">STORMS · Private Collection</p>
            <p className="eyebrow text-white/60">{String(active + 1).padStart(2, "0")} — {String(projects.length).padStart(2, "0")}</p>
          </div>

          <div key={project.id} className="reveal absolute inset-x-0 bottom-0 z-10 p-6 md:p-10 lg:p-12">
            <div className="mb-6 flex items-center gap-2 text-sm text-white/65"><MapPin size={16} strokeWidth={1.5}/><span>{project.address}, {project.city}</span></div>
            <h2 className="max-w-5xl break-words font-[var(--font-editorial)] text-[clamp(3.1rem,7vw,7.5rem)] font-medium leading-[.86] tracking-[-.045em]">{project.title}</h2>
          </div>
        </div>

        <aside className="luxury-collection__details flex min-w-0 flex-col justify-between border-t border-white/15 bg-[#1c1c18] p-7 lg:border-l lg:border-t-0 lg:p-9">
          <div>
            <div className="flex items-center justify-between border-b border-white/15 pb-6"><p className="eyebrow text-[#d0ad6b]">{sr ? "Odabrana rezidencija" : "Selected residence"}</p><span className="h-1.5 w-1.5 rounded-full bg-[#d0ad6b]" /></div>
            <p className="mt-9 text-lg leading-relaxed text-white/65">{project.shortDescription}</p>
            <p className="mt-6 text-sm leading-relaxed text-white/40">{project.locationDescription}</p>
            <Link href={`/${locale}/projekti/${project.slug}`} className="group mt-9 flex items-center justify-between border border-white/20 px-5 py-4 text-xs uppercase tracking-[.16em] transition hover:border-[#d0ad6b] hover:text-[#d0ad6b]">
              {d.common.view}<ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} strokeWidth={1.4}/>
            </Link>
          </div>

          <div className="luxury-collection__controls mt-12">
            <p className="eyebrow mb-5 text-white/35">{sr ? "Kolekcija" : "Collection"}</p>
            <div className="border-b border-white/15">
              {projects.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} className={`grid w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-t py-4 text-left transition ${index === active ? "border-[#d0ad6b]/60 text-white" : "border-white/15 text-white/40 hover:text-white/75"}`}><span className="eyebrow">0{index+1}</span><span className="truncate text-sm">{item.title}</span><span className={`h-1.5 w-1.5 rounded-full ${index === active ? "bg-[#d0ad6b]" : "bg-white/20"}`} /></button>)}
            </div>
            <div className="mt-6 flex gap-2"><button type="button" onClick={() => move(-1)} aria-label={sr ? "Prethodna rezidencija" : "Previous residence"} className="grid h-12 flex-1 cursor-pointer place-items-center border border-white/15 transition hover:border-[#d0ad6b] hover:text-[#d0ad6b]"><ArrowLeft size={18} strokeWidth={1.4}/></button><button type="button" onClick={() => move(1)} aria-label={sr ? "Sledeća rezidencija" : "Next residence"} className="grid h-12 flex-1 cursor-pointer place-items-center border border-white/15 transition hover:border-[#d0ad6b] hover:text-[#d0ad6b]"><ArrowRight size={18} strokeWidth={1.4}/></button></div>
          </div>
        </aside>
      </div>
    </section>
  );
}
