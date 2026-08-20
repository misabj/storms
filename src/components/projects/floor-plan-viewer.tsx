"use client";

import Image from "next/image";
import { useState } from "react";
import type { FloorPlan } from "@/types";

const shortLabel = (title: string) => (/3\s*d/i.test(title) ? "3D" : /2\s*d/i.test(title) ? "2D" : title);

export function FloorPlanViewer({ plans, dark = false }: { plans: FloorPlan[]; dark?: boolean }) {
  const [active, setActive] = useState(0);
  if (!plans.length) return null;
  const plan = plans[active];
  return <div className="floor-plan-viewer mx-auto max-w-5xl">
    <div className={`relative aspect-[16/10] overflow-hidden ${dark ? "bg-[#191815]" : "bg-[#e5e2db]"}`}>
      {plans.map((item, index) => <Image key={item.id} src={item.image} alt={item.title} fill quality={95} sizes="(max-width: 900px) calc(100vw - 40px), 1000px" className={`object-contain p-4 transition-opacity duration-300 md:p-10 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`} />)}
    </div>
    {plans.length > 1 && <div className="mt-4 flex gap-2">
      {plans.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} className={`flex-1 truncate border px-5 py-3 text-xs uppercase tracking-[.16em] transition ${index === active ? (dark ? "border-[#b99a63] bg-[#b99a63] text-black" : "border-[#a34838] bg-[#a34838] text-white") : (dark ? "border-white/20 text-white/60 hover:border-white/40" : "border-black/20 text-black/55 hover:border-black/40")}`}>{shortLabel(item.title)}</button>)}
    </div>}
    <h3 className={`mt-5 font-[var(--font-editorial)] text-3xl ${dark ? "text-white" : ""}`}>{plan.title}</h3>
  </div>;
}
