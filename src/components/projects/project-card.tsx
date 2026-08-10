import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import type { Locale } from "@/lib/i18n";

const labels = { APARTMENT: "Stanovanje", COMMERCIAL: "Poslovni prostor", LUXURY: "Lux rezidencija" };

export function ProjectCard({ project, large = false, locale = "sr", dark = false }: { project: Project; large?: boolean; locale?: Locale; dark?: boolean }) {
  return <Link href={`/${locale}/projekti/${project.slug}`} className="group block min-w-0">
    <div className={`image-shell ${large ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
      <Image src={project.heroImage} alt={project.title} fill quality={90} sizes={large ? "(max-width: 900px) calc(100vw - 40px), 50vw" : "(max-width: 900px) calc(100vw - 40px), 33vw"} />
    </div>
    <div className={`mt-4 flex items-start justify-between border-t pt-4 ${dark ? "border-white/20" : "border-black/15"}`}>
      <div className="min-w-0 pr-4"><p className={`eyebrow mb-2 break-words leading-[1.45] ${dark ? "text-[#bca16f]" : "text-black/45"}`}>{labels[project.category]} · {project.address}</p><h3 className="break-words font-[var(--font-editorial)] text-[clamp(1.75rem,3vw,2.35rem)] leading-[.98] tracking-[-.035em] transition-transform duration-300 group-hover:translate-x-1">{project.title}</h3></div>
      <ArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
    </div>
  </Link>;
}
