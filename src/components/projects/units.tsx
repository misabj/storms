import type { Unit } from "@/types";
import type { Locale } from "@/lib/i18n";
import { UnitMedia } from "./unit-media";

const status = {
  sr: { AVAILABLE: "Dostupno", RESERVED: "Rezervisano", SOLD: "Prodato" },
  en: { AVAILABLE: "Available", RESERVED: "Reserved", SOLD: "Sold" },
};

export function Units({ units, locale = "sr", dark = false }: { units: Unit[]; locale?: Locale; dark?: boolean }) {
  if (!units.length) return null;

  const money = (value: number) => new Intl.NumberFormat(locale === "sr" ? "sr-RS" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

  return <section className="units-section container pb-4 pt-24 md:pb-8 md:pt-36">
    <div className={`mb-14 flex justify-between border-t pt-5 ${dark ? "border-white/20" : "border-black/20"}`}>
      <h2 className="section-title">{locale === "sr" ? "Dostupne jedinice" : "Available residences"}</h2>
      <span className="eyebrow">{String(units.length).padStart(2, "0")}</span>
    </div>
    <div>{units.map((unit) => {
      const totalPrice = unit.price ?? (unit.pricePerSquareMeter ? Math.round(unit.pricePerSquareMeter * unit.area) : null);
      const squareMeterPrice = unit.pricePerSquareMeter ?? (unit.price ? Math.round(unit.price / unit.area) : null);

      return <article key={unit.id} className={`grid gap-8 border-t py-9 md:grid-cols-2 md:items-center ${dark ? "border-white/15" : "border-black/15"}`}>
        <UnitMedia unit={unit} locale={locale} dark={dark} />
        <div className="md:px-10">
          <div className="mb-10 flex items-start justify-between gap-5">
            <h3 className="font-[var(--font-editorial)] text-5xl tracking-[-.04em]">{unit.name}</h3>
            <span className="eyebrow shrink-0 opacity-50">{status[locale][unit.status]}</span>
          </div>
          <dl className="grid grid-cols-2 gap-x-6">
            <div className={`border-t py-4 ${dark ? "border-white/15" : "border-black/15"}`}>
              <dt className="eyebrow mb-2 opacity-40">{locale === "sr" ? "Površina" : "Area"}</dt>
              {unit.roomAreas?.length ? <dd><details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">{unit.area} m²<span className="text-[10px] opacity-40 transition group-open:rotate-180">▼</span></summary>
                <table className="mt-3 w-full text-sm"><tbody>
                  {unit.roomAreas.map((room) => <tr key={room.id} className={`border-t ${dark ? "border-white/10" : "border-black/10"}`}><td className="py-1.5 pr-4 opacity-70">{room.name}</td><td className="py-1.5 text-right tabular-nums">{room.area} m²</td></tr>)}
                  <tr className={`border-t ${dark ? "border-white/25" : "border-black/25"}`}><td className="py-1.5 pr-4 font-medium">{locale === "sr" ? "Ukupno" : "Total"}</td><td className="py-1.5 text-right font-medium tabular-nums">{unit.area} m²</td></tr>
                </tbody></table>
              </details></dd> : <dd>{unit.area} m²</dd>}
            </div>
            {[
              [locale === "sr" ? "Sobe" : "Rooms", unit.rooms ?? "—"],
              [locale === "sr" ? "Dostupno na spratovima" : "Available on floors", unit.floor],
              [locale === "sr" ? "Orijentacija" : "Orientation", unit.orientation],
            ].map(([label, value]) => <div key={label} className={`border-t py-4 ${dark ? "border-white/15" : "border-black/15"}`}><dt className="eyebrow mb-2 opacity-40">{label}</dt><dd>{value}</dd></div>)}
          </dl>
          {unit.showPrice && totalPrice && squareMeterPrice ? <div className="mt-8"><p className="text-2xl">{money(totalPrice)}</p><p className="eyebrow mt-2 opacity-45">{money(squareMeterPrice)} / m²</p></div> : <p className="mt-8 text-2xl">{locale === "sr" ? "Cena na upit" : "Price on request"}</p>}
        </div>
      </article>;
    })}</div>
  </section>;
}
