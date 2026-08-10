import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { Hero } from "@/components/home/hero";
import { ProjectCard } from "@/components/projects/project-card";
import { getActiveProjects, getFeaturedProjects } from "@/repositories/projects";
import { dictionary, localizeProject, type Locale } from "@/lib/i18n";

export async function HomePage({ locale }: { locale: Locale }) {
  const [featuredRaw, projectsRaw] = await Promise.all([getFeaturedProjects(), getActiveProjects()]);
  const featured = featuredRaw.map((project) => localizeProject(project, locale));
  const projects = projectsRaw.map((project) => localizeProject(project, locale));
  const d = dictionary[locale].home;
  const prefix = `/${locale}`;

  return <PublicShell overlay locale={locale}>
    <main>
      <Hero projects={featured.length ? featured : projects} locale={locale} />
      <section className="container grid gap-12 py-28 md:grid-cols-[1fr_2fr] md:py-44">
        <p className="eyebrow pt-2">{d.statement}</p>
        <div><h2 className="lede max-w-5xl">{d.intro}</h2><Link className="text-link mt-10" href={`${prefix}/o-nama`}>{d.meet} <span>→</span></Link></div>
      </section>
      <section id="projects" className="container scroll-mt-28 pb-32 md:pb-48">
        <div className="mb-12 flex items-end justify-between border-t border-black/20 pt-5"><h2 className="section-title">{d.projects}</h2><span className="eyebrow">{String(projects.length).padStart(2,"0")}</span></div>
        <div className="grid gap-x-7 gap-y-16 md:grid-cols-3 md:gap-y-24">
          {projects.map((project, index) => <div key={project.id} className={index % 3 === 1 ? "md:pt-24" : ""}><ProjectCard project={project} locale={locale} /></div>)}
        </div>
      </section>
      <section className="bg-[#a34838] text-white">
        <div className="grid min-h-[720px] md:grid-cols-2">
          <div className="relative min-h-[420px]"><Image src={projects[0]?.heroImage} alt="STORMS" fill sizes="(max-width:900px) 100vw, 50vw" className="object-cover" /></div>
          <div className="flex flex-col justify-between p-[var(--gutter)] md:p-16 lg:p-24"><p className="eyebrow">{d.follow}</p><h2 className="section-title max-w-2xl py-16">{d.find}</h2><div className="grid gap-0">{[[d.apartments,`${prefix}/prodaja-stanova`],[d.shops,`${prefix}/poslovni-prostori`],[d.luxury,`${prefix}/lux-stanovi`]].map(([label,href])=><Link href={href} key={href} className="group flex items-center justify-between border-t border-white/35 py-5 text-2xl"><span>{label}</span><span className="transition-transform group-hover:translate-x-2">→</span></Link>)}</div></div>
        </div>
      </section>
    </main>
  </PublicShell>;
}
