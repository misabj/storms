import type { Project } from "@/types";
import { ImageUpload } from "./image-upload";
import { saveProjectAction } from "@/app/admin/actions";

export function ProjectForm({project}:{project?:Project}){
  return <form action={saveProjectAction} className="mt-10 grid max-w-5xl gap-10">
    <input type="hidden" name="id" value={project?.id||""}/>
    <section className="grid gap-5 border border-black/10 bg-white p-6 md:grid-cols-2 md:p-8">
      <h2 className="col-span-full text-2xl">Osnovno — SR</h2>
      <div className="form-field"><label>Kategorija</label><select name="category" defaultValue={project?.category||"APARTMENT"}><option value="APARTMENT">Prodaja stanova</option><option value="COMMERCIAL">Poslovni prostor</option><option value="LUXURY">Lux stan</option></select></div>
      <div className="form-field"><label>Objavljivanje</label><select name="status" defaultValue={project?.status||"DRAFT"}><option value="DRAFT">Draft / skriven</option><option value="ACTIVE">Aktivan / objavljen</option><option value="COMPLETED">Izvedeni projekat</option></select></div>
      <div className="form-field"><label>Faza projekta</label><select name="phase" defaultValue={project?.phase || (project?.status === "COMPLETED" ? "COMPLETED" : "CONSTRUCTION")}><option value="DESIGN">Projektovanje</option><option value="CONSTRUCTION">Izgradnja</option><option value="COMPLETED">Završen objekat</option></select></div>
      <div className="form-field"><label>H1 / Naziv</label><input name="title" defaultValue={project?.title} required/></div><div className="form-field"><label>H2 / Podnaslov</label><input name="subtitle" defaultValue={project?.subtitle}/></div>
      <div className="form-field col-span-full"><label>Slug</label><input name="slug" defaultValue={project?.slug} pattern="[a-z0-9-]+" required/></div>
      <div className="form-field col-span-full"><label>Kratak opis</label><textarea name="shortDescription" rows={3} defaultValue={project?.shortDescription}/></div>
      <div className="form-field col-span-full"><label>Pun opis</label><textarea name="description" rows={8} defaultValue={project?.description}/></div>
      <div className="col-span-full"><ImageUpload name="heroImage" label="Hero slika" defaultValue={project?.heroImage}/></div>
    </section>
    <section className="grid gap-5 border border-black/10 bg-[#f1ede3] p-6 md:grid-cols-2 md:p-8">
      <div className="col-span-full"><p className="eyebrow mb-2">English</p><h2 className="text-2xl">Engleska verzija</h2></div>
      <div className="form-field"><label>Title</label><input name="titleEn" defaultValue={project?.titleEn}/></div><div className="form-field"><label>Subtitle</label><input name="subtitleEn" defaultValue={project?.subtitleEn}/></div>
      <div className="form-field col-span-full"><label>Short description</label><textarea name="shortDescriptionEn" rows={3} defaultValue={project?.shortDescriptionEn}/></div>
      <div className="form-field col-span-full"><label>Full description</label><textarea name="descriptionEn" rows={7} defaultValue={project?.descriptionEn}/></div>
      <div className="form-field col-span-full"><label>Location description</label><textarea name="locationDescriptionEn" rows={4} defaultValue={project?.locationDescriptionEn}/></div>
      <div className="form-field"><label>SEO title EN</label><input name="seoTitleEn" defaultValue={project?.seoTitleEn}/></div><div className="form-field"><label>SEO description EN</label><input name="seoDescriptionEn" defaultValue={project?.seoDescriptionEn}/></div>
    </section>
    <section className="grid gap-5 border border-black/10 bg-white p-6 md:grid-cols-2 md:p-8">
      <div className="col-span-full">
        <h2 className="text-2xl">Lokacija</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/50">Podaci koje unesete ovde prikazuju se na stranici projekta. Polje za Google mapu određuje tačnu lokaciju ugrađene mape.</p>
      </div>
      <div className="form-field"><label>Adresa</label><input name="address" defaultValue={project?.address} required placeholder="Ulica i broj" /></div>
      <div className="form-field"><label>Grad</label><input name="city" defaultValue={project?.city || "Beograd"} required placeholder="Beograd" /></div>
      <div className="form-field col-span-full">
        <label>Adresa za Google mapu</label>
        <input name="mapAddress" defaultValue={project?.mapAddress} required placeholder="npr. Savski trg, Beograd, Srbija" />
        <p className="mt-2 text-xs leading-relaxed text-black/45">Unesite punu i preciznu adresu. Nakon čuvanja projekta mapa na frontu automatski prikazuje ovu lokaciju.</p>
        {project?.mapAddress && <a className="mt-3 inline-block text-xs font-semibold uppercase tracking-[.12em] underline underline-offset-4" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.mapAddress)}`} target="_blank" rel="noreferrer">Proveri lokaciju na Google Maps ↗</a>}
      </div>
      <div className="form-field col-span-full"><label>Opis lokacije</label><textarea name="locationDescription" rows={4} defaultValue={project?.locationDescription} /></div>
    </section>
    <section className="grid gap-5 border border-black/10 bg-white p-6 md:grid-cols-2 md:p-8"><h2 className="col-span-full text-2xl">SEO i prikaz</h2><div className="form-field"><label>SEO naslov</label><input name="seoTitle" defaultValue={project?.seoTitle}/></div><div className="form-field"><label>SEO opis</label><input name="seoDescription" defaultValue={project?.seoDescription}/></div><label className="flex items-center gap-3"><input type="checkbox" name="featured" defaultChecked={project?.featured}/> Izdvojeno na početnoj</label><label className="flex items-center gap-3"><input type="checkbox" name="showInNavigation" defaultChecked={project?.showInNavigation??true}/> Prikaži u navigaciji</label></section>
    <button className="button justify-self-start">Sačuvaj projekat</button>
  </form>
}
