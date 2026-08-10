import Image from "next/image";
import type { Unit } from "@/types";
import type { Locale } from "@/lib/i18n";

const status = { sr:{ AVAILABLE: "Dostupno", RESERVED: "Rezervisano", SOLD: "Prodato" },en:{AVAILABLE:"Available",RESERVED:"Reserved",SOLD:"Sold"} };
export function Units({ units, locale = "sr", dark = false }: { units: Unit[]; locale?: Locale; dark?: boolean }) {
  if (!units.length) return null;
  return <section className="container py-24 md:py-36"><div className={`mb-14 flex justify-between border-t pt-5 ${dark?"border-white/20":"border-black/20"}`}><h2 className="section-title">{locale==="sr"?"Dostupne jedinice":"Available residences"}</h2><span className="eyebrow">{String(units.length).padStart(2,"0")}</span></div><div>{units.map((unit) => <article key={unit.id} className={`grid gap-8 border-t py-9 md:grid-cols-[1.2fr_1fr] md:items-center ${dark?"border-white/15":"border-black/15"}`}>
    <div className="relative aspect-[16/9] bg-[#dedbd4]">{unit.image && <Image src={unit.image} alt={unit.name} fill sizes="(max-width:900px) 100vw, 55vw" className="object-cover" />}</div>
    <div className="md:px-10"><div className="mb-10 flex items-start justify-between"><h3 className="font-[var(--font-editorial)] text-5xl tracking-[-.04em]">{unit.name}</h3><span className="eyebrow opacity-50">{status[locale][unit.status]}</span></div><dl className="grid grid-cols-2 gap-x-6">{[[locale==="sr"?"Površina":"Area",`${unit.area} m²`],[locale==="sr"?"Sobe":"Rooms",unit.rooms ?? "—"],[locale==="sr"?"Sprat":"Floor",unit.floor],[locale==="sr"?"Orijentacija":"Orientation",unit.orientation]].map(([label,value]) => <div key={label} className={`border-t py-4 ${dark?"border-white/15":"border-black/15"}`}><dt className="eyebrow mb-2 opacity-40">{label}</dt><dd>{value}</dd></div>)}</dl><p className="mt-8 text-2xl">{unit.showPrice && unit.price ? new Intl.NumberFormat(locale==="sr"?"sr-RS":"en-GB",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(unit.price) : locale==="sr"?"Cena na upit":"Price on request"}</p></div>
  </article>)}</div></section>;
}
