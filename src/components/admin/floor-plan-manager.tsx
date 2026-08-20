import { ImageUpload } from "./image-upload";
import { ConfirmSubmitButton } from "./confirm-submit-button";
import { addFloorPlanAction, deleteFloorPlanAction, updateFloorPlanAction } from "@/app/admin/actions";
import type { Project } from "@/types";

export function FloorPlanManager({ project }: { project: Project }) {
  return (
    <section className="mt-16 max-w-5xl border-t border-black/15 pt-10">
      <h2 className="text-3xl">Osnove</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/50">Osnove (2D i 3D prikazi) prikazuju se sa prekidačem na stranici projekta. Ovde možete da izmenite naziv, sliku i opis, ili da obrišete postojeću osnovu.</p>

      <div className="mt-8 grid gap-4">
        {project.floorPlans.map((plan) => (
          <details key={plan.id} className="border border-black/10 bg-white">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4">
              <span className="font-medium">{plan.title}</span>
              <span className="text-xs uppercase tracking-[.14em] text-black/45">Uredi ▾</span>
            </summary>
            <div className="border-t border-black/10 p-5">
              <form action={updateFloorPlanAction} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={plan.id} />
                <input type="hidden" name="projectId" value={project.id} />
                <div className="form-field"><label>Naziv</label><input name="title" defaultValue={plan.title} required /></div>
                <ImageUpload name="image" label="Slika osnove" defaultValue={plan.image} />
                <div className="form-field md:col-span-2"><label>Opis</label><textarea name="description" rows={2} defaultValue={plan.description} /></div>
                <button className="button justify-self-start">Sačuvaj izmene</button>
              </form>
              <form action={deleteFloorPlanAction} className="mt-5">
                <input type="hidden" name="id" value={plan.id} />
                <input type="hidden" name="projectId" value={project.id} />
                <ConfirmSubmitButton title="Brisanje osnove" message={`Obrisati osnovu „${plan.title}“?`} confirmLabel="Obriši osnovu" className="text-sm text-red-700">Obriši osnovu</ConfirmSubmitButton>
              </form>
            </div>
          </details>
        ))}
        {!project.floorPlans.length && <p className="text-sm text-black/40">Još nema dodatih osnova.</p>}
      </div>

      <div className="mt-10 border-t border-black/15 pt-8">
        <h3 className="text-xl">Dodaj novu osnovu</h3>
        <form action={addFloorPlanAction} className="mt-4 grid gap-4 bg-white p-6 md:grid-cols-2">
          <input type="hidden" name="projectId" value={project.id} />
          <div className="form-field"><label>Naziv</label><input name="title" required placeholder="npr. 2D osnova ili 3D prikaz" /></div>
          <ImageUpload name="image" label="Slika osnove" />
          <div className="form-field md:col-span-2"><label>Opis</label><textarea name="description" rows={2} /></div>
          <button className="button justify-self-start">Dodaj osnovu</button>
        </form>
      </div>
    </section>
  );
}
