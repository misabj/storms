"use client";

import { useFormStatus } from "react-dom";

export function DeleteProjectButton({ title, compact = false }: { title: string; compact?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(`Da li sigurno želite da obrišete projekat „${title}“? Biće obrisane i njegove slike, osnove i jedinice.`)) {
          event.preventDefault();
        }
      }}
      className={compact ? "text-xs font-semibold uppercase tracking-[.1em] text-red-700 underline underline-offset-4 disabled:opacity-40" : "button border-red-800 bg-red-800 text-white disabled:opacity-40"}
    >
      {pending ? "Brisanje..." : "Obriši"}
    </button>
  );
}
