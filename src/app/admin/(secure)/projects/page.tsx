import Image from "next/image";
import Link from "next/link";
import { deleteProjectAction } from "@/app/admin/actions";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";
import { getProjects } from "@/repositories/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <>
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div><p className="eyebrow mb-4">Sadržaj</p><h1 className="text-5xl tracking-[-.05em]">Projekti</h1></div>
      <Link className="button" href="/admin/projects/new">+ Novi projekat</Link>
    </div>

    <div className="mt-12 bg-white">
      <table className="w-full table-fixed border-collapse text-left text-sm">
        <thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-widest text-black/45">
          <th className="w-24 p-4">Slika</th><th className="p-4">Naziv</th><th className="hidden w-36 p-4 md:table-cell">Kategorija</th><th className="hidden w-28 p-4 sm:table-cell">Status</th><th className="w-36 p-4 text-right">Akcije</th>
        </tr></thead>
        <tbody>{projects.map((project) => <tr key={project.id} className="border-b border-black/10 align-middle">
          <td className="p-4"><div className="relative h-14 w-20 overflow-hidden bg-black/5">{project.heroImage && <Image src={project.heroImage} alt="" fill sizes="80px" className="object-cover" />}</div></td>
          <td className="p-4"><Link href={`/admin/projects/${project.id}`} className="font-medium underline-offset-4 hover:underline">{project.title}</Link><p className="mt-1 text-xs text-black/40 sm:hidden">{project.status}</p></td>
          <td className="hidden p-4 md:table-cell">{project.category}</td>
          <td className="hidden p-4 sm:table-cell">{project.status}</td>
          <td className="p-4"><div className="flex flex-col items-end gap-3 sm:flex-row sm:justify-end">
            <Link className="text-xs font-semibold uppercase tracking-[.1em] underline underline-offset-4" href={`/admin/projects/${project.id}`}>Uredi</Link>
            <form action={deleteProjectAction}><input type="hidden" name="id" value={project.id} /><DeleteProjectButton title={project.title} compact /></form>
          </div></td>
        </tr>)}</tbody>
      </table>
    </div>
  </>;
}
