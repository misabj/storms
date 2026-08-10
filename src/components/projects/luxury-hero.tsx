"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/types";
import { dictionary, type Locale } from "@/lib/i18n";

export function LuxuryHero({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const d = dictionary[locale];

  useEffect(() => {
    if (projects.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % projects.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [projects.length]);

  if (!projects.length) return null;
  const project = projects[active];

  return (
    <section className="relative h-[78svh] min-h-[600px] overflow-hidden bg-black md:min-h-[720px]">
      {projects.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={index !== active}
        >
          <Image src={item.heroImage} alt={item.title} fill priority={index === 0} quality={95} sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/30" />
        </div>
      ))}

      <div className="container relative z-10 flex h-full items-end pb-10 md:pb-16">
        <div className="w-full min-w-0">
          <div key={project.id} className="reveal grid min-w-0 items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0">
              <p className="eyebrow mb-5">STORMS Private Collection · {String(active + 1).padStart(2, "0")}</p>
              <h2 className="section-title max-w-4xl">{project.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{project.shortDescription}</p>
            </div>
            <Link href={`/${locale}/projekti/${project.slug}`} className="text-link mb-2 justify-self-start">
              {d.common.view} <span>→</span>
            </Link>
          </div>

          <div className="mt-9 flex items-center gap-5 border-t border-white/30 pt-5">
            <span className="eyebrow whitespace-nowrap">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            <div className="h-px flex-1 bg-white/30"><div key={active} className="h-px origin-left animate-[progress_7.5s_linear] bg-[#d0ad6b]" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
