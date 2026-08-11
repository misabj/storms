"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });

  return <form action={action} className="grid min-w-0 max-w-full gap-6">
    <div>
      <label htmlFor="password" className="mb-3 block text-[10px] font-bold uppercase tracking-[.16em] text-black/55">Lozinka</label>
      <div className="group flex min-w-0 max-w-full items-center border border-black/20 bg-white/55 px-5 transition focus-within:border-[#a34838] focus-within:bg-white">
        <LockKeyhole className="shrink-0 text-black/30 transition group-focus-within:text-[#a34838]" size={18} strokeWidth={1.5}/>
        <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus placeholder="Unesite pristupnu lozinku" className="h-16 min-w-0 flex-1 border-0 bg-transparent px-4 text-base outline-none placeholder:text-black/25" />
      </div>
    </div>
    {state.error && <p role="alert" className="border-l-2 border-[#a34838] bg-[#a34838]/5 px-4 py-3 text-sm text-[#8f392c]">{state.error}</p>}
    <button className="group flex h-16 cursor-pointer items-center justify-between bg-[#171816] px-6 text-[10px] font-bold uppercase tracking-[.17em] text-white transition hover:bg-[#a34838] disabled:cursor-wait disabled:opacity-60" disabled={pending}><span>{pending ? "Provera pristupa…" : "Prijavi se"}</span><ArrowRight className="transition-transform group-hover:translate-x-1" size={18} strokeWidth={1.5}/></button>
  </form>;
}
