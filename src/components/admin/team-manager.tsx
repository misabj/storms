import Image from "next/image";
import { ImageUpload } from "./image-upload";
import { ConfirmSubmitButton } from "./confirm-submit-button";
import { deleteTeamMemberAction, saveTeamMemberAction } from "@/app/admin/actions";
import type { TeamMember } from "@/types";

export function TeamManager({ team }: { team: TeamMember[] }) {
  const departments = [
    ["DIRECTORS", "Direktori"],
    ["ARCHITECTS", "Arhitekte"],
    ["CONSTRUCTION", "Građevina"],
    ["ADMINISTRATION", "Administracija"],
  ] as const;
  return (
    <section className="mt-12 max-w-5xl">
      <p className="max-w-2xl text-sm leading-relaxed text-black/50">Članovi tima prikazuju se na stranici &bdquo;O nama&ldquo;. Ovde možete da izmenite ime, poziciju, grupu, fotografiju i opis, da uključite/isključite prikaz, ili da obrišete člana.</p>

      <div className="mt-8 grid gap-4">
        {team.map((member) => (
          <details key={member.id} className="border border-black/10 bg-white">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4">
              <span className="flex items-center gap-3">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-black/10 text-xs text-black/40">—</span>
                )}
                <span className="font-medium">{member.name}</span>
                <span className="text-sm text-black/45">{member.role}</span>
                {!member.active && <span className="text-xs uppercase tracking-[.14em] text-red-700">Skriven</span>}
              </span>
              <span className="text-xs uppercase tracking-[.14em] text-black/45">Uredi ▾</span>
            </summary>
            <div className="border-t border-black/10 p-5">
              <form action={saveTeamMemberAction} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={member.id} />
                <div className="form-field"><label>Ime i prezime</label><input name="name" defaultValue={member.name} required /></div>
                <div className="form-field"><label>Pozicija</label><input name="role" defaultValue={member.role} required /></div>
                <div className="form-field"><label>Grupa</label><select name="department" defaultValue={member.department || "ADMINISTRATION"}>{departments.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></div>
                <div className="md:col-span-2"><ImageUpload name="photo" label="Fotografija" defaultValue={member.photo} /></div>
                <div className="form-field md:col-span-2"><label>Opis</label><textarea name="description" rows={2} defaultValue={member.description} /></div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" defaultChecked={member.active} /> Aktivan (prikazan na sajtu)</label>
                <button className="button justify-self-start md:col-start-1">Sačuvaj izmene</button>
              </form>
              <form action={deleteTeamMemberAction} className="mt-5">
                <input type="hidden" name="id" value={member.id} />
                <ConfirmSubmitButton title="Brisanje člana tima" message={`Obrisati člana „${member.name}“?`} confirmLabel="Obriši člana" className="text-sm text-red-700">Obriši člana</ConfirmSubmitButton>
              </form>
            </div>
          </details>
        ))}
        {!team.length && <p className="text-sm text-black/40">Još nema dodatih članova tima.</p>}
      </div>

      <div className="mt-10 border-t border-black/15 pt-8">
        <h3 className="text-xl">Dodaj novog člana</h3>
        <form action={saveTeamMemberAction} className="mt-4 grid gap-4 bg-white p-6 md:grid-cols-2">
          <div className="form-field"><label>Ime i prezime</label><input name="name" required /></div>
          <div className="form-field"><label>Pozicija</label><input name="role" required /></div>
          <div className="form-field"><label>Grupa</label><select name="department" defaultValue="ADMINISTRATION">{departments.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></div>
          <div className="md:col-span-2"><ImageUpload name="photo" label="Fotografija" /></div>
          <div className="form-field md:col-span-2"><label>Opis</label><textarea name="description" rows={2} /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" defaultChecked /> Aktivan (prikazan na sajtu)</label>
          <button className="button justify-self-start md:col-start-1">Dodaj člana</button>
        </form>
      </div>
    </section>
  );
}
