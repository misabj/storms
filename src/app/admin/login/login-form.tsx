"use client";
import { useActionState } from "react";
import { loginAction } from "./actions";
export function LoginForm() { const [state, action, pending] = useActionState(loginAction, { error: "" }); return <form action={action} className="grid gap-5"><div className="form-field"><label htmlFor="password">Lozinka</label><input id="password" name="password" type="password" autoComplete="current-password" required autoFocus /></div>{state.error&&<p className="text-sm text-red-700">{state.error}</p>}<button className="button" disabled={pending}>{pending?"Provera…":"Prijavi se"}</button></form>; }
