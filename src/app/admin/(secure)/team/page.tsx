import { getAllTeam } from "@/repositories/projects";
import { TeamManager } from "@/components/admin/team-manager";
export default async function TeamPage(){const team=await getAllTeam();return <><p className="eyebrow mb-4">O nama</p><h1 className="text-5xl tracking-[-.05em]">Naš tim</h1><TeamManager team={team}/></>;}
