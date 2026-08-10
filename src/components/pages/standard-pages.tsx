import Image from "next/image";
import { Building2, Compass, Gem, Ruler } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectMap } from "@/components/maps/project-map";
import { ContactForm } from "@/components/contact/contact-form";
import { getCompletedProjects, getSettings } from "@/repositories/projects";
import { dictionary, localizeProject, type Locale } from "@/lib/i18n";

export async function CompletedPage({ locale }: { locale: Locale }) {
  const projects = (await getCompletedProjects()).map((project) => localizeProject(project, locale));
  return <PublicShell locale={locale}><main className="pt-[var(--header-height)]">
    <header className="container grid gap-10 pb-20 pt-20 md:grid-cols-[1.6fr_.7fr] md:items-end md:pb-32 md:pt-28"><div><p className="eyebrow mb-8">{dictionary[locale].common.portfolio}</p><h1 className="display">{locale === "sr" ? <>Izvedeni<br />projekti.</> : <>Completed<br />projects.</>}</h1></div><div className="border-t border-black/20 pt-5"><p className="font-[var(--font-editorial)] text-6xl">{String(projects.length).padStart(2,"0")}</p><p className="mt-4 max-w-sm leading-relaxed text-black/55">{locale === "sr" ? "Realizovane zgrade, rezidencije i poslovni prostori koji potvrđuju naš standard kroz vreme." : "Completed buildings, residences and commercial spaces that demonstrate our standard over time."}</p></div></header>
    <section className="container grid gap-x-8 gap-y-20 pb-36 md:grid-cols-2">{projects.map((project, index) => <div key={project.id} className={index % 3 === 0 ? "md:col-span-2" : ""}><ProjectCard project={project} large={index % 3 === 0} locale={locale} /></div>)}</section>
  </main></PublicShell>;
}

export async function AboutPage({ locale }: { locale: Locale }) {
  const [settings, rawCompleted] = await Promise.all([getSettings(), getCompletedProjects()]);
  const completed = rawCompleted.map((project) => localizeProject(project, locale));
  const sr = locale === "sr";
  const title = sr ? settings.aboutTitle : "We build value that endures";
  const subtitle = sr ? settings.aboutSubtitle : "Precision in every detail";
  const description = sr ? settings.aboutDescription : "STORMS is an investment and construction company dedicated to creating contemporary spaces of exceptional quality. From each location to the final detail, every project is shaped with equal care for architecture, function and lasting value.";
  const process = sr ? [["01","Lokacija","Biramo adrese sa jasnom dugoročnom vrednošću i prirodnim mestom u gradu."],["02","Arhitektura","Razvijamo precizne koncepte u kojima su prostor, svetlo i materijal jedna celina."],["03","Izgradnja","Kontrolišemo kvalitet izvođenja, rokove i svaki vidljiv i nevidljiv detalj."],["04","Život","Projekat završavamo tek kada prostor postane pouzdan okvir za svakodnevni život."]] : [["01","Location","We select addresses with enduring value and a natural place in the city."],["02","Architecture","We develop precise concepts where space, light and material form one whole."],["03","Construction","We control workmanship, timelines and every visible and invisible detail."],["04","Life","A project is complete when the space becomes a dependable setting for daily life."]];
  return <PublicShell locale={locale}><main className="pt-[var(--header-height)]">
    <section className="container pb-20 pt-20 md:pb-32 md:pt-28"><p className="eyebrow mb-8">{dictionary[locale].nav.about}</p><h1 className="display max-w-[1300px]">{title}</h1></section>
    <div className="relative h-[62svh] min-h-[520px] md:h-[76vh]"><Image src="/images/about/material-studio.png" alt={sr?"STORMS studio materijala":"STORMS material studio"} fill priority quality={95} sizes="100vw" className="object-cover" /></div>
    <section className="container grid gap-12 py-24 md:grid-cols-[.7fr_2fr] md:py-40"><p className="eyebrow pt-2">{subtitle}</p><div><p className="lede">{description}</p><div className="mt-16 grid gap-8 border-t border-black/15 pt-8 sm:grid-cols-3">{[["20+",sr?"godina iskustva":"years of experience"],["120k",sr?"m² realizovano":"m² delivered"],["04",sr?"faze kontrole":"control stages"]].map(([number,label])=><div key={label}><p className="font-[var(--font-editorial)] text-5xl">{number}</p><p className="eyebrow mt-3 text-black/40">{label}</p></div>)}</div></div></section>
    <section className="bg-[#171816] text-white"><div className="container grid gap-16 py-24 md:grid-cols-[1fr_1.35fr] md:py-40"><div><p className="eyebrow mb-8 text-[#c5a66d]">{sr?"Naš standard":"Our standard"}</p><h2 className="section-title">{sr?"Vrednost se gradi detaljem.":"Value is built through detail."}</h2></div><div className="grid gap-0">{[[Ruler,sr?"Preciznost":"Precision",sr?"Od projekta do završne obrade, odluke donosimo na osnovu kvaliteta koji se može izmeriti.":"From concept to finish, decisions are grounded in measurable quality."],[Compass,sr?"Kontekst":"Context",sr?"Svaka zgrada odgovara svojoj ulici, susedstvu i načinu života koji podržava.":"Every building responds to its street, neighbourhood and the life it supports."],[Gem,sr?"Materijal":"Material",sr?"Biramo trajne, taktilne materijale koji dostojanstveno stare.":"We select lasting, tactile materials that age with dignity."]].map(([Icon,title,copy])=><article key={String(title)} className="grid grid-cols-[auto_1fr] gap-6 border-t border-white/15 py-7"><Icon className="text-[#c5a66d]" size={26} strokeWidth={1.3}/><div><h3 className="font-[var(--font-editorial)] text-3xl">{String(title)}</h3><p className="mt-3 max-w-lg leading-relaxed text-white/55">{String(copy)}</p></div></article>)}</div></div></section>
    <section className="container py-24 md:py-40"><div className="mb-14 grid gap-8 border-t border-black/20 pt-5 md:grid-cols-2"><p className="eyebrow">{sr?"Kako radimo":"How we work"}</p><h2 className="section-title">{sr?"Od adrese do ključa.":"From address to key."}</h2></div><div className="grid gap-0 md:grid-cols-4">{process.map(([number,name,copy])=><article key={number} className="border-t border-black/15 py-7 md:border-l md:border-t-0 md:px-7"><p className="eyebrow text-[#a34838]">{number}</p><h3 className="mt-8 font-[var(--font-editorial)] text-3xl">{name}</h3><p className="mt-5 leading-relaxed text-black/55">{copy}</p></article>)}</div></section>
    {completed.length > 0 && <section className="container pb-36"><div className="mb-12 flex items-end justify-between border-t border-black/20 pt-5"><div><p className="eyebrow mb-5">{sr?"Dokaz u prostoru":"Built proof"}</p><h2 className="section-title">{dictionary[locale].nav.completed}</h2></div><Building2 className="hidden text-black/20 sm:block" size={44} strokeWidth={1}/></div><div className="grid gap-10 md:grid-cols-2">{completed.slice(0,2).map((project) => <ProjectCard project={project} large key={project.id} locale={locale} />)}</div></section>}
  </main></PublicShell>;
}

export async function ContactPage({ locale }: { locale: Locale }) {
  const settings = await getSettings();
  const sr = locale === "sr";
  const heading = sr ? settings.contactHeading : "Let us discuss a place made to last.";
  const copy = sr ? settings.contactText : "For information about our projects, available residences and partnerships, our team is at your disposal.";
  return <PublicShell locale={locale}><main className="pt-[var(--header-height)]">
    <section className="container pb-20 pt-20 md:pb-28 md:pt-28"><p className="eyebrow mb-8">{dictionary[locale].nav.contact}</p><h1 className="display max-w-[1200px]">{heading}</h1></section>
    <section className="container grid gap-0 pb-24 md:grid-cols-[.72fr_1.28fr] md:pb-36"><aside className="flex flex-col justify-between border border-black/15 p-[var(--gutter)] md:p-12 lg:p-16"><div><p className="max-w-xl text-lg leading-relaxed text-black/60">{copy}</p><div className="mt-14 grid gap-0 text-xl"><a href={`tel:${settings.phone}`} className="border-t border-black/15 py-5">{settings.phone}</a><a href={`mailto:${settings.email}`} className="border-t border-black/15 py-5">{settings.email}</a><p className="border-y border-black/15 py-5">{settings.address}</p></div></div><p className="eyebrow mt-16 text-black/40">{sr?"Ponedeljak — petak · 09:00 — 17:00":"Monday — Friday · 09:00 — 17:00"}</p></aside><ContactForm locale={locale}/></section>
    <section className="grid border-y border-black/15 md:grid-cols-[.65fr_1.35fr]"><div className="p-[var(--gutter)] py-16 md:p-16 lg:p-24"><p className="eyebrow mb-7">{sr?"Naša kancelarija":"Our office"}</p><h2 className="section-title">{settings.address}</h2><p className="mt-8 max-w-sm leading-relaxed text-black/55">{sr?"Zakažite razgovor sa našim prodajnim ili razvojnim timom.":"Arrange a conversation with our sales or development team."}</p></div><ProjectMap address={settings.address} className="min-h-[480px] md:min-h-[650px]"/></section>
  </main></PublicShell>;
}
