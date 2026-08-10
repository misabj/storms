import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { ProjectCard } from "./project-card";
import { ProjectMap } from "@/components/maps/project-map";
import { LuxuryHero } from "./luxury-hero";
import { getActiveProjects } from "@/repositories/projects";
import type { ProjectCategory } from "@/types";
import { dictionary, localizeProject, type Locale } from "@/lib/i18n";

export async function CategoryPage({ category, locale = "sr" }: { category: ProjectCategory; locale?: Locale }) {
  const d = dictionary[locale];
  const projects = (await getActiveProjects(category)).map((project) => localizeProject(project, locale));
  const copy = d.categories[category];
  const selected = projects[0];
  const luxury = category === "LUXURY";
  const prefix = `/${locale}`;

  return <PublicShell locale={locale} dark={luxury}>
    <main className={luxury ? "lux-theme pt-[var(--header-height)]" : "pt-[var(--header-height)]"}>
      <section className={`container ${luxury ? "pb-20 pt-20 text-center md:pb-36 md:pt-36" : "pb-20 pt-20 md:pb-32 md:pt-28"}`}><p className="eyebrow mb-8">{copy.eyebrow}</p><h1 className={`display max-w-[1300px] ${luxury ? "mx-auto" : ""}`}>{copy.title}</h1><p className={`mx-auto mt-10 max-w-2xl text-lg leading-relaxed md:mt-12 md:text-xl ${luxury ? "text-[#aaa395]" : "ml-0 text-black/60"}`}>{copy.intro}</p></section>

      {luxury && <LuxuryHero projects={projects} locale={locale} />}

      {selected && <section className={`grid border-y md:grid-cols-2 ${luxury ? "border-white/15" : "border-black/15"}`}><div className="flex flex-col justify-between p-[var(--gutter)] py-20 md:p-16 lg:p-24"><div><p className="eyebrow mb-6">{copy.featured}</p><h2 className="section-title">{selected.title}</h2><p className={`mt-5 ${luxury ? "text-white/50" : "text-black/55"}`}>{selected.address}, {selected.city}</p><p className={`mt-10 max-w-lg text-lg leading-relaxed ${luxury ? "text-[#aaa395]" : ""}`}>{selected.locationDescription}</p></div><Link href={`${prefix}/projekti/${selected.slug}`} className="text-link mt-16 self-start">{d.common.view} <span>→</span></Link></div>{luxury ? <div className="relative min-h-[520px] md:min-h-[720px]"><Image src={projects[1]?.heroImage || selected.heroImage} alt={projects[1]?.title || selected.title} fill quality={92} sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" /></div> : <ProjectMap address={selected.mapAddress} className="min-h-[480px] md:min-h-[580px]" />}</section>}

      {luxury && selected && <section className="container grid min-w-0 gap-10 py-24 md:grid-cols-[.7fr_1.6fr] md:gap-16 md:py-36"><div className="flex flex-col justify-between"><div><p className="eyebrow mb-8">{locale === "sr" ? "Odabrana lokacija" : "Selected location"}</p><MapPin className="mb-8 text-[#c6aa73]" size={32} strokeWidth={1.4} /><h2 className="font-[var(--font-editorial)] text-[clamp(2.6rem,5vw,5.5rem)] leading-[.92] tracking-[-.045em]">{selected.address}</h2><p className="mt-6 max-w-sm leading-relaxed text-[#aaa395]">{selected.locationDescription}</p></div><p className="eyebrow mt-12 text-white/35">{projects.length} {locale === "sr" ? "privatne rezidencije" : "private residences"}</p></div><ProjectMap address={selected.mapAddress} dark className="min-h-[380px] border border-white/15 sm:min-h-[500px] md:min-h-[650px]" /></section>}

      {luxury && <section className="border-y border-white/15"><div className="container py-24 text-center md:py-40"><p className="eyebrow mb-8">{locale === "sr" ? "Umeće življenja" : "The art of living"}</p><p className="lede mx-auto max-w-5xl">{locale === "sr" ? "Prostori u kojima su arhitektura, svetlo i materijal svedeni na svoju najčistiju meru." : "Spaces where architecture, light and material are distilled to their purest expression."}</p></div></section>}

      <section className="container py-24 md:py-36"><div className="grid gap-16 md:grid-cols-2 md:gap-14">{projects.map((project, index) => <div key={project.id} className={index % 2 ? "md:pt-28" : ""}><ProjectCard project={project} large locale={locale} dark={luxury} /></div>)}</div>{!projects.length && <p className={`py-20 text-2xl ${luxury ? "text-white/50" : "text-black/50"}`}>{locale === "sr" ? "Novi projekti biće uskoro objavljeni." : "New projects will be presented soon."}</p>}</section>
    </main>
  </PublicShell>;
}
