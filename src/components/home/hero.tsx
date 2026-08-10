"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/types";
import { dictionary, type Locale } from "@/lib/i18n";

export function Hero({ projects, locale = "sr" }: { projects: Project[]; locale?: Locale }) {
  const d=dictionary[locale].home;
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (projects.length < 2) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % projects.length), 7500);
    return () => window.clearInterval(timer);
  }, [projects.length]);
  if (!projects.length) return null;
  return <section className="relative h-[100svh] min-h-[720px] overflow-hidden bg-black text-white">
    {projects.map((project, index) => <div key={project.id} className={`absolute inset-0 transition-opacity duration-[1600ms] ${index === active ? "opacity-100" : "opacity-0"}`} aria-hidden={index !== active}>
      <Image src={project.heroImage} alt={project.title} fill priority={index === 0} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/30" />
    </div>)}
    <div className="container relative z-10 flex h-full items-end pb-14 md:pb-20">
      <div className="w-full">
        <div key={projects[active].id} className="reveal grid min-w-0 items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0"><p className="eyebrow mb-5">{projects[active].category === "LUXURY" ? d.luxuryType : projects[active].category === "COMMERCIAL" ? d.commercialType : d.type}</p><h1 className="display max-w-[1100px]">{projects[active].title}</h1><p className="mt-6 max-w-xl whitespace-normal break-words pr-2 text-base leading-relaxed text-white/75 md:text-lg">{projects[active].shortDescription}</p></div>
          <Link className="text-link mb-2 justify-self-start" href={`/${locale}/projekti/${projects[active].slug}`}>{d.view} <span>→</span></Link>
        </div>
        <div className="mt-10 flex items-center gap-5 border-t border-white/30 pt-5"><span className="eyebrow">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span><div className="h-px flex-1 bg-white/30"><div key={active} className="h-px origin-left animate-[progress_7.5s_linear] bg-white" /></div></div>
      </div>
    </div>
  </section>;
}
