"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop({ label, className = "" }: { label: string; className?: string }) {
  return <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`group inline-flex items-center gap-2 ${className}`}>
    <span>{label}</span><ArrowUp size={15} strokeWidth={1.8} className="transition-transform group-hover:-translate-y-0.5" />
  </button>;
}
