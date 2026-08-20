"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/types";

export function Gallery({ images }: { images: ProjectImage[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const touchStart = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const previous = useCallback(() => setActive((value) => (value - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((value) => (value + 1) % images.length), [images.length]);

  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const child = container.children[active] as HTMLElement | undefined;
    if (!child) return;
    const left = child.offsetLeft - (container.clientWidth - child.clientWidth) / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, previous]);

  if (!images.length) return null;

  const controls = (fullscreen = false) => <>
    <button type="button" onClick={previous} aria-label="Prethodna slika" className={`absolute left-3 top-1/2 z-10 grid -translate-y-1/2 place-items-center rounded-full border backdrop-blur-md transition hover:scale-105 md:left-8 ${fullscreen ? "h-12 w-12 border-white/30 bg-black/30 text-white md:h-14 md:w-14" : "h-11 w-11 border-white/50 bg-black/35 text-white md:h-12 md:w-12"}`}><ArrowLeft size={20} /></button>
    <button type="button" onClick={next} aria-label="Sledeća slika" className={`absolute right-3 top-1/2 z-10 grid -translate-y-1/2 place-items-center rounded-full border backdrop-blur-md transition hover:scale-105 md:right-8 ${fullscreen ? "h-12 w-12 border-white/30 bg-black/30 text-white md:h-14 md:w-14" : "h-11 w-11 border-white/50 bg-black/35 text-white md:h-12 md:w-12"}`}><ArrowRight size={20} /></button>
  </>;
  const dots = <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/45 px-4 py-3 backdrop-blur-md md:bottom-5">{images.map((image, index) => <button type="button" key={image.id} onClick={() => setActive(index)} aria-label={`Slika ${index + 1}`} aria-current={index === active} className={`h-1.5 rounded-full transition-all duration-300 ${index === active ? "w-8 bg-white" : "w-1.5 bg-white/45 hover:bg-white/75"}`} />)}</div>;

  return <>
    <div className="project-gallery container">
      <div className="group relative aspect-[3/2] w-full overflow-hidden bg-[#181816] md:aspect-auto md:h-[72svh] md:min-h-[620px] md:max-h-[820px]" onTouchStart={(event) => touchStart.current = event.touches[0].clientX} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) (delta > 0 ? previous : next)(); touchStart.current = null; }}>
        {images.map((image, index) => <Image key={image.id} src={image.imagePath} alt={image.altText} fill priority={index === 0} quality={100} sizes="(max-width: 900px) calc(100vw - 40px), min(1540px, calc(100vw - 104px))" className={`object-contain ${image.type === "FLOOR_PLAN" ? "p-3 md:p-8" : ""} transition-opacity duration-300 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`} />)}
        <button type="button" onClick={() => setOpen(true)} aria-label="Otvori galeriju preko celog ekrana" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/45 bg-black/30 text-white opacity-80 backdrop-blur-md transition hover:opacity-100 md:right-5 md:top-5"><Expand size={18} /></button>
        {images.length > 1 && <div className="absolute right-[68px] top-4 z-10 grid h-11 place-items-center rounded-full border border-white/45 bg-black/30 px-4 text-[11px] tracking-[.18em] text-white backdrop-blur-md md:right-[76px] md:top-5">{String(active + 1).padStart(2,"0")} / {String(images.length).padStart(2,"0")}</div>}
        {images.length > 1 && controls()}{images.length > 1 && dots}
      </div>
      <div ref={thumbsRef} className="mt-3 flex snap-x gap-2 overflow-x-auto pb-1 md:mt-4 md:gap-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{images.map((image, index) => <button type="button" key={image.id} onClick={() => setActive(index)} className={`relative aspect-[16/9] shrink-0 basis-[calc(33.333%-0.5rem)] snap-center overflow-hidden bg-[#181816] transition ${index === active ? "opacity-100" : "opacity-45 hover:opacity-75"}`}><Image src={image.imagePath} alt="" fill quality={95} sizes="(max-width: 900px) 33vw, 340px" className={`object-contain ${image.type === "FLOOR_PLAN" ? "p-1" : ""}`} /><span className="absolute left-2 top-2 bg-black/55 px-1.5 py-0.5 text-[10px] tracking-wider text-white backdrop-blur">{String(index + 1).padStart(2,"0")}</span><span className={`absolute inset-x-0 bottom-0 h-0.5 ${index === active ? "bg-[#bca16f]" : "bg-transparent"}`} /></button>)}</div>
    </div>
    {open && <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] grid place-items-center bg-black/97 p-3 md:p-10"><button type="button" onClick={() => setOpen(false)} aria-label="Zatvori galeriju" className="absolute right-4 top-4 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white md:right-5 md:top-5"><X size={24} /></button><div className="relative h-full w-full">{images.map((image, index) => <Image key={image.id} src={image.imagePath} alt={image.altText} fill quality={100} sizes="100vw" className={`object-contain transition-opacity duration-500 ${index === active ? "opacity-100" : "opacity-0"}`} />)}{images.length > 1 && controls(true)}{images.length > 1 && dots}</div></div>}
  </>;
}
