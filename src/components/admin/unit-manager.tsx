import { ImageUpload } from "./image-upload";
import { ConfirmSubmitButton } from "./confirm-submit-button";
import { addUnitAction, addUnitRoomAction, deleteUnitAction, deleteUnitRoomAction, updateUnitAction } from "@/app/admin/actions";
import type { Project } from "@/types";

const statusOptions = ["AVAILABLE", "RESERVED", "SOLD"];

export function UnitManager({ project }: { project: Project }) {
  return (
    <section className="mt-16 max-w-5xl border-t border-black/15 pt-10">
      <h2 className="text-3xl">Stanovi / lokali</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/50">Za svaki stan dodajte sliku (3D / foto), osnovu (2D), opis i tabelu prostorija sa pojedinačnim površinama. Slika i osnova prikazuju se preko 2D / 3D tastera na stranici projekta.</p>

      <div className="mt-8 grid gap-4">
        {project.units.map((unit) => (
          <details key={unit.id} className="border border-black/10 bg-white">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4">
              <span className="font-medium">{unit.name} · {unit.area} m² · {unit.status}</span>
              <span className="text-xs uppercase tracking-[.14em] text-black/45">Uredi ▾</span>
            </summary>
            <div className="border-t border-black/10 p-5">
              <form action={updateUnitAction} className="grid gap-4 md:grid-cols-3">
                <input type="hidden" name="id" value={unit.id} />
                <input type="hidden" name="projectId" value={project.id} />
                <div className="form-field"><label>Naziv</label><input name="name" defaultValue={unit.name} required /></div>
                <div className="form-field"><label>Broj jedinice</label><input name="unitNumber" defaultValue={unit.unitNumber} /></div>
                <div className="form-field"><label>Dostupno na spratovima</label><input name="floor" defaultValue={unit.floor} /></div>
                <div className="form-field"><label>Broj soba</label><input name="rooms" type="number" step="any" defaultValue={unit.rooms ?? ""} /></div>
                <div className="form-field"><label>Ukupna površina m²</label><input name="area" type="number" step="any" defaultValue={unit.area} required /></div>
                <div className="form-field"><label>Orijentacija</label><input name="orientation" defaultValue={unit.orientation} /></div>
                <div className="form-field"><label>Ukupna cena (€)</label><input name="price" type="number" step="any" defaultValue={unit.price ?? ""} /><p className="mt-1 text-xs text-black/40">Ako unesete obe cene, ukupna cena ima prednost.</p></div>
                <div className="form-field"><label>Cena po m² (€)</label><input name="pricePerSquareMeter" type="number" step="any" defaultValue={unit.pricePerSquareMeter ?? (unit.price && unit.area ? Math.round(unit.price / unit.area) : "")} /></div>
                <div className="form-field"><label>Status</label><select name="status" defaultValue={unit.status}>{statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                <label className="flex items-center gap-2 self-end"><input type="checkbox" name="showPrice" defaultChecked={unit.showPrice} /> Prikaži cenu</label>
                <div className="md:col-span-3"><ImageUpload name="image" label="Slika stana (3D / foto)" defaultValue={unit.image} /></div>
                <div className="md:col-span-3"><ImageUpload name="floorPlanImage" label="Osnova stana (2D)" defaultValue={unit.floorPlanImage} /></div>
                <div className="form-field md:col-span-3"><label>Opis</label><textarea name="description" rows={3} defaultValue={unit.description} /></div>
                <button className="button justify-self-start">Sačuvaj izmene</button>
              </form>

              <div className="mt-8 border-t border-black/10 pt-5">
                <h4 className="text-sm font-semibold uppercase tracking-[.12em] text-black/60">Prostorije i površine</h4>
                <div className="mt-3 grid gap-2">
                  {(unit.roomAreas ?? []).map((room) => (
                    <div key={room.id} className="flex items-center justify-between bg-[#f6f3ec] px-4 py-2 text-sm">
                      <span>{room.name} — {room.area} m²</span>
                      <form action={deleteUnitRoomAction}><input type="hidden" name="id" value={room.id} /><input type="hidden" name="projectId" value={project.id} /><ConfirmSubmitButton message={`Obrisati prostoriju „${room.name}“?`} confirmLabel="Obriši prostoriju" className="text-red-700">Obriši</ConfirmSubmitButton></form>
                    </div>
                  ))}
                  {!(unit.roomAreas?.length) && <p className="text-sm text-black/40">Još nema unetih prostorija.</p>}
                  {(unit.roomAreas?.length ?? 0) > 0 && <p className="mt-1 text-sm text-black/55">Zbir prostorija: {(unit.roomAreas ?? []).reduce((sum, room) => sum + room.area, 0).toFixed(1)} m²</p>}
                </div>
                <form action={addUnitRoomAction} className="mt-4 flex flex-wrap items-end gap-3">
                  <input type="hidden" name="projectId" value={project.id} />
                  <input type="hidden" name="unitId" value={unit.id} />
                  <input type="hidden" name="sortOrder" value={unit.roomAreas?.length ?? 0} />
                  <div className="form-field"><label>Prostorija</label><input name="roomName" placeholder="npr. Dnevna soba" required /></div>
                  <div className="form-field"><label>Površina m²</label><input name="roomArea" type="number" step="any" required /></div>
                  <button className="button">Dodaj prostoriju</button>
                </form>
              </div>

              <form action={deleteUnitAction} className="mt-6">
                <input type="hidden" name="id" value={unit.id} />
                <input type="hidden" name="projectId" value={project.id} />
                <ConfirmSubmitButton title="Brisanje stana" message={`Obrisati stan „${unit.name}“ i sve njegove prostorije?`} confirmLabel="Obriši stan" className="text-sm text-red-700">Obriši ceo stan</ConfirmSubmitButton>
              </form>
            </div>
          </details>
        ))}
        {!project.units.length && <p className="text-sm text-black/40">Još nema dodatih stanova.</p>}
      </div>

      <div className="mt-10 border-t border-black/15 pt-8">
        <h3 className="text-xl">Dodaj novi stan</h3>
        <form action={addUnitAction} className="mt-4 grid gap-4 bg-white p-6 md:grid-cols-3">
          <input type="hidden" name="projectId" value={project.id} />
          <div className="form-field"><label>Naziv</label><input name="name" required /></div>
          <div className="form-field"><label>Broj jedinice</label><input name="unitNumber" /></div>
          <div className="form-field"><label>Dostupno na spratovima</label><input name="floor" /></div>
          <div className="form-field"><label>Broj soba</label><input name="rooms" type="number" step="any" /></div>
          <div className="form-field"><label>Ukupna površina m²</label><input name="area" type="number" step="any" required /></div>
          <div className="form-field"><label>Orijentacija</label><input name="orientation" /></div>
          <div className="form-field"><label>Ukupna cena (€)</label><input name="price" type="number" step="any" /><p className="mt-1 text-xs text-black/40">Unesite ukupnu cenu ili cenu po m².</p></div>
          <div className="form-field"><label>Cena po m² (€)</label><input name="pricePerSquareMeter" type="number" step="any" /></div>
          <div className="form-field"><label>Status</label><select name="status">{statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
          <label className="flex items-center gap-2 self-end"><input type="checkbox" name="showPrice" defaultChecked /> Prikaži cenu</label>
          <div className="md:col-span-3"><ImageUpload name="image" label="Slika stana (3D / foto)" /></div>
          <div className="md:col-span-3"><ImageUpload name="floorPlanImage" label="Osnova stana (2D)" /></div>
          <div className="form-field md:col-span-3"><label>Opis</label><textarea name="description" rows={3} /></div>
          <button className="button justify-self-start">Dodaj stan</button>
        </form>
      </div>
    </section>
  );
}
