import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { ProjectMap } from "@/components/maps/project-map";
import { Gallery } from "@/components/gallery/gallery";
import { Units } from "@/components/projects/units";
import { FloorPlanViewer } from "@/components/projects/floor-plan-viewer";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjectBySlug, getProjects } from "@/repositories/projects";
import { dictionary, localizeProject, type Locale } from "@/lib/i18n";

export async function LocalizedProjectPage({ slug, locale }: { slug: string; locale: Locale }) {
  const raw = await getProjectBySlug(slug);
  if (!raw) notFound();
  const project = localizeProject(raw, locale);
  const luxury = project.category === "LUXURY";
  const d = dictionary[locale].common;
  const related = (await getProjects()).filter((item) => item.id !== project.id && (project.status === "COMPLETED" ? item.status === "COMPLETED" : item.status === "ACTIVE")).slice(0, 3).map((item) => localizeProject(item, locale));
  const locationLabel = locale === "sr" ? "Lokacija rezidencije" : "Residence location";
  const categoryLabels = { sr: { APARTMENT: "Stan", COMMERCIAL: "Poslovni prostor", LUXURY: "Lux rezidencija" }, en: { APARTMENT: "Apartment", COMMERCIAL: "Commercial", LUXURY: "Luxury residence" } } as const;
  const statusLabels = { sr: { DESIGN: "Projektovanje", CONSTRUCTION: "Izgradnja", COMPLETED: "Završen objekat" }, en: { DESIGN: "Design", CONSTRUCTION: "Construction", COMPLETED: "Completed" } } as const;
  const plansTitle = luxury ? d.plans : locale === "sr" ? "Osnova tipske etaže" : "Typical floor plan";

  return <PublicShell overlay locale={locale} dark={luxury}><main className={luxury ? "lux-theme" : ""}>
    <section className={`project-hero relative text-white ${luxury ? "h-[100svh] min-h-[640px] md:min-h-[760px]" : "h-[90svh] min-h-[600px] md:min-h-[680px]"}`}>
      <Image src={project.heroImage} alt={project.title} fill priority quality={95} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/35" />
      <div className="container relative flex h-full items-end pb-10 md:pb-20"><div className="min-w-0 max-w-full"><p className="eyebrow mb-5 md:mb-6">{luxury ? (locale === "sr" ? "Privatna kolekcija" : "The private collection") : project.category === "COMMERCIAL" ? (locale === "sr" ? "Poslovni prostor" : "Commercial space") : (locale === "sr" ? "Stambeni projekat" : "Residential project")}</p><h1 className="display max-w-[1250px]">{project.title}</h1><div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-8 md:mt-7"><span>{project.subtitle}</span><span className="text-white/60">{project.address}, {project.city}</span></div></div></div>
    </section>

    <section className={`project-about grid border-b md:grid-cols-2 ${luxury ? "border-white/15" : "border-black/15"}`}>
      <div className={`p-[var(--gutter)] py-20 md:p-16 lg:p-24 ${luxury ? "md:py-40" : ""}`}><p className="eyebrow mb-10">{d.projectAbout}</p><p className="lede">{project.description}</p><p className={`mt-10 max-w-xl text-lg leading-relaxed ${luxury ? "text-[#aaa395]" : "text-black/55"}`}>{project.locationDescription}</p></div>
      {luxury ? <div className="relative min-h-[520px] md:min-h-[760px]"><Image src={project.images.find((image) => image.type !== "FLOOR_PLAN")?.imagePath || project.heroImage} alt={project.title} fill quality={92} sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" /></div> : <ProjectMap address={project.mapAddress} className="min-h-[480px] md:min-h-[620px]" />}
    </section>

    {luxury && <section id="location" className="scroll-mt-24 border-b border-white/15">
      <div className="container grid gap-10 py-20 md:grid-cols-[.75fr_1.7fr] md:gap-16 md:py-32">
        <div className="flex flex-col justify-between"><div><p className="eyebrow mb-8">{locationLabel}</p><MapPin className="mb-8 text-[#c6aa73]" size={32} strokeWidth={1.4} /><h2 className="font-[var(--font-editorial)] text-[clamp(2.6rem,5vw,5.5rem)] leading-[.92] tracking-[-.045em]">{project.address}</h2><p className="mt-5 text-[#aaa395]">{project.city}</p></div><p className="eyebrow mt-12 text-white/35">{locale === "sr" ? "Beograd · Srbija" : "Belgrade · Serbia"}</p></div>
        <ProjectMap address={project.mapAddress} dark className="min-h-[380px] border border-white/15 sm:min-h-[500px] md:min-h-[650px]" />
      </div>
    </section>}

    {project.images.length > 0 && <section id="gallery" className={`scroll-mt-24 ${luxury ? "py-24 md:py-40" : "py-20 md:py-32"}`}><div className={`container mb-10 flex items-end justify-between border-t pt-5 md:mb-12 ${luxury ? "border-white/20" : "border-black/20"}`}><h2 className="section-title">{d.gallery}</h2><span className="eyebrow">{String(project.images.length).padStart(2,"0")}</span></div><Gallery images={project.images} /></section>}

    <section className={`project-information container grid gap-12 border-y py-20 md:grid-cols-[1fr_2fr] md:py-28 ${luxury ? "border-white/15" : "border-black/15"}`}><p className="eyebrow">{d.information}</p><dl className="grid gap-x-8 sm:grid-cols-2">{[[d.location,project.address,"location"],[d.city,project.city,"city"],[d.status,statusLabels[locale][project.phase || (project.status === "COMPLETED" ? "COMPLETED" : "CONSTRUCTION")],"status"],[d.type,categoryLabels[locale][project.category],"type"]].map(([label,value,key]) => <div key={label} data-info={key} className={`border-t py-5 ${luxury ? "border-white/15" : "border-black/15"}`}><dt className="eyebrow mb-3 opacity-40">{label}</dt><dd className="break-words font-[var(--font-editorial)] text-3xl">{value}</dd></div>)}</dl></section>

    {project.floorPlans.length > 0 && <section className={`project-plans container py-24 md:py-40 ${luxury ? "project-plans--luxury" : ""}`}><div className="project-plans__heading mb-14 text-center"><p className="eyebrow mb-5">{luxury ? (locale === "sr" ? "Rezidencija" : "The residence") : ""}</p><h2 className="section-title">{plansTitle}</h2></div><FloorPlanViewer plans={project.floorPlans} dark={luxury} /></section>}

    <Units units={project.units} locale={locale} dark={luxury} />
    {related.length > 0 && <section className="related-projects container py-16 md:py-24"><div className={`mb-12 flex items-end justify-between border-t pt-5 ${luxury ? "border-white/20" : "border-black/20"}`}><h2 className="section-title">{project.status === "COMPLETED" ? d.previous : d.other}</h2><Link href={`/${locale}/izvedeni-projekti`} className="text-link">{d.viewAll}<span>→</span></Link></div><div className="grid gap-12 md:grid-cols-3 md:gap-8">{related.map((item) => <ProjectCard project={item} key={item.id} locale={locale} dark={luxury} />)}</div></section>}
  </main></PublicShell>;
}
