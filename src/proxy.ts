import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth/session";
export async function proxy(request:NextRequest){const token=request.cookies.get(SESSION_COOKIE)?.value;if(!token)return NextResponse.redirect(new URL("/admin/login",request.url));try{await jwtVerify(token,new TextEncoder().encode(process.env.SESSION_SECRET||"development-only-change-this-secret"));return NextResponse.next();}catch{return NextResponse.redirect(new URL("/admin/login",request.url));}}
export const config={matcher:["/admin/((?!login).*)"]};
