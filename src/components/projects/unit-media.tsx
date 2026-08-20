"use client";

import Image from "next/image";
import { useState } from "react";
import type { Unit } from "@/types";
import type { Locale } from "@/lib/i18n";

const unavailableLabel = { sr: { RESERVED: "Rezervisano", SOLD: "Prodato" }, en: { RESERVED: "Reserved", SOLD: "Sold" } } as const;

export function UnitMedia({ unit, locale = "sr", dark = false }: { unit: Unit; locale?: Locale; dark?: boolean }) {
  const views = [
    { key: "2D", src: unit.floorPlanImage },
    { key: "3D", src: unit.image },
  ];
  const [active, setActive] = useState(() => (unit.floorPlanImage ? 0 : 1));
  const current = views[active];
  const sold = unit.status === "SOLD";
  const reserved = unit.status === "RESERVED";
  const unavailable = sold || reserved;

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-[#dedbd4]">
        {current.src ? (
          <Image src={current.src} alt={unit.name} fill sizes="(max-width:900px) 100vw, 45vw" className={`object-cover ${unavailable ? "opacity-65" : ""}`} />
        ) : (
          <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#d4d1c9_0,#d4d1c9_16px,#cecbc2_16px,#cecbc2_32px)]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="pointer-events-none absolute bottom-5 left-6 font-[var(--font-editorial)] text-3xl text-white/95 drop-shadow-md md:text-4xl">{unit.name}</span>
        {unavailable && (
          <div className={`pointer-events-none absolute inset-0 grid place-items-center ${sold ? "bg-black/35" : "bg-[#8b6a2b]/30"}`}>
            <span className={`rotate-[-8deg] border-[3px] px-6 py-3 text-2xl font-bold uppercase tracking-[.2em] md:px-8 md:text-4xl ${sold ? "border-[#cf5442] text-[#cf5442]" : "border-[#f0c46e] text-[#f0c46e]"}`}>{unavailableLabel[locale][sold ? "SOLD" : "RESERVED"]}</span>
          </div>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {views.map((view, index) => (
          <button
            key={view.key}
            type="button"
            onClick={() => setActive(index)}
            className={`py-3 text-xs uppercase tracking-[.24em] transition ${
              index === active
                ? dark ? "bg-white text-black" : "bg-black text-white"
                : dark ? "border border-white/25 text-white/70 hover:border-white/60" : "border border-black/20 text-black/60 hover:border-black/60"
            }`}
          >
            {view.key}
          </button>
        ))}
      </div>
    </div>
  );
}
