"use client";

import { useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function ConfirmSubmitButton({
  children,
  message,
  title = "Potvrda brisanja",
  confirmLabel = "Obriši",
  className,
  pendingLabel = "Brisanje...",
}: {
  children: ReactNode;
  message: string;
  title?: string;
  confirmLabel?: string;
  className?: string;
  pendingLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();

  return (
    <>
      <button type="button" disabled={pending} onClick={() => setOpen(true)} className={className}>
        {pending ? pendingLabel : children}
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="w-full max-w-md border border-black/10 bg-white p-7 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <h3 className="text-xl font-medium tracking-tight">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-black/60">{message}</p>
            <div className="mt-7 flex justify-end gap-3">
              <button type="button" onClick={() => setOpen(false)} className="button border-black/15 bg-white text-black">Odustani</button>
              <button type="submit" className="button border-red-800 bg-red-800 text-white">{confirmLabel}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
