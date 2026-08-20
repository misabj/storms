"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/types";
import type { Locale } from "@/lib/i18n";

export function HomeProjects({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const [expanded, setExpanded] = useState(false);
  const initial = 3;
  const visible = expanded ? projects : projects.slice(0, initial);
  const hasMore = projects.length > initial;
  return <>
    <div className="home-projects grid gap-x-7 gap-y-16 md:grid-cols-3 md:gap-y-24">
      {visible.map((project, index) => <div key={project.id} className={index % 3 === 1 ? "md:pt-24" : ""}><ProjectCard project={project} locale={locale} /></div>)}
    </div>
    {hasMore && !expanded && <div className="mt-16 flex items-center gap-6 md:mt-24">
      <span className="h-px flex-1 bg-black/20" />
      <button type="button" onClick={() => setExpanded(true)} className="group flex items-center gap-3 rounded-full border border-black/25 px-8 py-3 text-[11px] font-bold uppercase tracking-[.18em] transition hover:border-[#a34838] hover:bg-[#a34838] hover:text-white">
        {locale === "sr" ? "Prikaži još" : "More"}<span className="transition-transform group-hover:translate-y-0.5">↓</span>
      </button>
      <span className="h-px flex-1 bg-black/20" />
    </div>}
  </>;
}
