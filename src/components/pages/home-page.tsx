import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { Hero } from "@/components/home/hero";
import { HomeProjects } from "@/components/home/home-projects";
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
      <section className="home-intro container grid gap-12 py-28 md:grid-cols-[1fr_2fr] md:py-44">
        <p className="eyebrow pt-2">{d.statement}</p>
        <div><h2 className="lede max-w-5xl">{d.intro}</h2><Link className="text-link mt-10" href={`${prefix}/o-nama`}>{d.meet} <span>→</span></Link></div>
      </section>
      <section id="projects" className="home-project-list container scroll-mt-28 pb-32 md:pb-48">
        <div className="mb-12 flex items-end justify-between border-t border-black/20 pt-5"><h2 className="section-title">{d.projects}</h2><span className="eyebrow">{String(projects.length).padStart(2,"0")}</span></div>
        <HomeProjects projects={projects} locale={locale} />
      </section>
      <section className="home-offer border-y border-black/15 bg-[#ded9cf] text-[#171816]">
        <div className="grid min-h-[720px] md:grid-cols-[1.08fr_.92fr]">
          <div className="relative min-h-[420px] overflow-hidden"><Image src={projects[0]?.heroImage} alt="STORMS" fill sizes="(max-width:900px) 100vw, 54vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" /></div>
          <div className="flex flex-col justify-between border-black/15 p-[var(--gutter)] md:border-l md:p-16 lg:p-24"><div><p className="eyebrow text-[#a34838]">{d.follow}</p><h2 className="section-title max-w-2xl py-14 md:py-16">{d.find}</h2></div><div className="grid gap-0 border-b border-black/20">{[[d.apartments,`${prefix}/prodaja-stanova`],[d.shops,`${prefix}/poslovni-prostori`],[d.luxury,`${prefix}/lux-stanovi`]].map(([label,href],index)=><Link href={href} key={href} className="group -mx-4 grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-black/20 px-4 py-5 text-2xl transition-colors hover:bg-[#c8c1b6]"><span className="eyebrow text-black/35 transition-colors group-hover:text-black/55">0{index+1}</span><span>{label}</span><span className="justify-self-end text-2xl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span></Link>)}</div></div>
        </div>
      </section>
    </main>
  </PublicShell>;
}
