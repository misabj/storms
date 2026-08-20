import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { ProjectMap } from "@/components/maps/project-map";
import { LuxuryHero } from "./luxury-hero";
import { getActiveProjects } from "@/repositories/projects";
import type { ProjectCategory } from "@/types";
import { dictionary, localizeProject, type Locale } from "@/lib/i18n";

export async function CategoryPage({ category, locale = "sr" }: { category: ProjectCategory; locale?: Locale }) {
  const d = dictionary[locale];
  const projects = (await getActiveProjects(category)).map((project) => localizeProject(project, locale));
  const copy = d.categories[category];
  const luxury = category === "LUXURY";
  const prefix = `/${locale}`;

  return <PublicShell locale={locale} dark={luxury}>
    <main className={luxury ? "lux-theme pt-[var(--header-height)]" : "pt-[var(--header-height)]"}>
      <section className={`category-intro container ${luxury ? "pb-20 pt-20 text-center md:pb-36 md:pt-36" : "pb-20 pt-20 md:pb-32 md:pt-28"}`}><p className="eyebrow mb-8">{copy.eyebrow}</p><h1 className={`display max-w-[1300px] ${luxury ? "mx-auto" : ""}`}>{copy.title}</h1><p className={`mx-auto mt-10 max-w-2xl text-lg leading-relaxed md:mt-12 md:text-xl ${luxury ? "text-[#aaa395]" : "ml-0 text-black/60"}`}>{copy.intro}</p></section>

      {luxury && <LuxuryHero projects={projects} locale={locale} />}

      {!luxury && <section className="category-projects container grid gap-16 pb-24 md:gap-24 md:pb-36">
        {projects.map((project) => <article key={project.id}>
          <div className="grid gap-3 md:grid-cols-2 md:gap-6">
            <Link href={`${prefix}/projekti/${project.slug}`} className="image-shell group aspect-[4/3]"><Image src={project.heroImage} alt={project.title} fill sizes="(max-width:900px) 100vw, 50vw" /></Link>
            <ProjectMap address={project.mapAddress} className="category-project-map aspect-[4/3] md:aspect-auto md:min-h-[360px]" />
          </div>
          <Link href={`${prefix}/projekti/${project.slug}`} className="group mt-4 flex items-start justify-between border-t border-black/15 pt-4">
            <div><p className="eyebrow mb-2 text-black/45">{copy.featured} · {project.address}</p><h2 className="font-[var(--font-editorial)] text-[clamp(2rem,4vw,3.4rem)] leading-none tracking-[-.035em] transition-transform group-hover:translate-x-1">{project.title}</h2></div>
            <ArrowUpRight className="shrink-0" size={22} />
          </Link>
        </article>)}
        {!projects.length && <p className="py-20 text-2xl text-black/50">{locale === "sr" ? "Novi projekti biće uskoro objavljeni." : "New projects will be presented soon."}</p>}
      </section>}

      {luxury && <section className="border-y border-white/15 bg-[#161612]"><div className="container grid md:grid-cols-3">{[[locale === "sr" ? "Retke adrese" : "Rare addresses",locale === "sr" ? "Lokacije birane zbog pogleda, privatnosti i trajne vrednosti." : "Locations chosen for views, privacy and enduring value."],[locale === "sr" ? "Potpuna privatnost" : "Complete privacy",locale === "sr" ? "Diskretan pristup i prostor oblikovan oko vašeg ritma." : "Discreet access and space shaped around your rhythm."],[locale === "sr" ? "Materijali bez kompromisa" : "Materials without compromise",locale === "sr" ? "Prirodni kamen, plemenito drvo i detalji izrađeni po meri." : "Natural stone, fine timber and details made to measure."]].map(([title,copy],index)=><article key={title} className="border-white/15 py-10 md:border-l md:px-8 md:py-14 md:first:border-l-0"><p className="eyebrow text-[#c6aa73]">0{index+1}</p><h3 className="mt-7 font-[var(--font-editorial)] text-3xl leading-tight">{title}</h3><p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">{copy}</p></article>)}</div></section>}

      {luxury && projects[0] && <section id="collection-location" className="lux-category-location scroll-mt-20 border-b border-white/15 md:hidden">
        <div className="container py-20">
          <p className="eyebrow text-[#c6aa73]">{locale === "sr" ? "Beograd · Privatna kolekcija" : "Belgrade · Private collection"}</p>
          <MapPin className="mt-8 text-[#c6aa73]" size={30} strokeWidth={1.4} />
          <h2 className="mt-8 font-[var(--font-editorial)] text-[2.9rem] leading-[.92] tracking-[-.04em]">{projects[0].address}</h2>
          <p className="mt-5 text-[#aaa395]">{projects[0].locationDescription}</p>
          <div className="mt-12 grid grid-cols-2 border-y border-white/15 py-6">
            <div><p className="font-[var(--font-editorial)] text-4xl">03</p><p className="eyebrow mt-2 text-[#c6aa73]">{locale === "sr" ? "Rezidencije" : "Residences"}</p></div>
            <div className="border-l border-white/15 pl-7"><p className="font-[var(--font-editorial)] text-4xl">24/7</p><p className="eyebrow mt-2 text-[#c6aa73]">{locale === "sr" ? "Diskrecija" : "Discretion"}</p></div>
          </div>
          <ProjectMap address={projects[0].mapAddress} dark className="mt-8 aspect-square border border-white/15" />
        </div>
      </section>}

      {luxury && <section className="border-y border-white/15"><div className="container py-24 text-center md:py-40"><p className="eyebrow mb-8">{locale === "sr" ? "Umeće življenja" : "The art of living"}</p><p className="lede mx-auto max-w-5xl">{locale === "sr" ? "Prostori u kojima su arhitektura, svetlo i materijal svedeni na svoju najčistiju meru." : "Spaces where architecture, light and material are distilled to their purest expression."}</p></div></section>}
    </main>
  </PublicShell>;
}
