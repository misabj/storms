"use client";

import { ConfirmSubmitButton } from "./confirm-submit-button";

export function DeleteProjectButton({ title, compact = false }: { title: string; compact?: boolean }) {
  return (
    <ConfirmSubmitButton
      title="Brisanje projekta"
      message={`Da li sigurno želite da obrišete projekat „${title}“? Biće obrisane i njegove slike, osnove i jedinice.`}
      confirmLabel="Obriši projekat"
      className={compact ? "text-xs font-semibold uppercase tracking-[.1em] text-red-700 underline underline-offset-4 disabled:opacity-40" : "button border-red-800 bg-red-800 text-white disabled:opacity-40"}
    >
      Obriši
    </ConfirmSubmitButton>
  );
}
