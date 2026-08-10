import Image from "next/image";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/session";
import { LoginForm } from "./login-form";
export const metadata={title:"Admin prijava",robots:{index:false,follow:false}};
export default async function LoginPage(){if(await isAuthenticated())redirect("/admin");return <main className="grid min-h-screen place-items-center bg-[#e8e5de] p-5"><div className="w-full max-w-md bg-[#f2f0eb] p-8 md:p-12"><Image src="/brand/storms-logo.png" alt="STORMS" width={1600} height={616} className="mb-12 w-40"/><p className="eyebrow mb-3">Administracija</p><h1 className="mb-10 text-4xl tracking-[-.04em]">Dobro došli.</h1><LoginForm/></div></main>}
