import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/session";

const allowed=new Map([["image/jpeg","jpg"],["image/png","png"],["image/webp","webp"],["image/avif","avif"]]);
export async function POST(request:Request){if(!(await isAuthenticated()))return NextResponse.json({error:"Niste prijavljeni."},{status:401});const data=await request.formData();const file=data.get("file");if(!(file instanceof File))return NextResponse.json({error:"Fajl nije pronađen."},{status:400});const ext=allowed.get(file.type);if(!ext)return NextResponse.json({error:"Dozvoljeni su JPG, PNG, WebP i AVIF."},{status:400});const max=Number(process.env.MAX_UPLOAD_SIZE_MB||12)*1024*1024;if(file.size>max)return NextResponse.json({error:"Fajl je prevelik."},{status:400});const dir=path.join(process.cwd(),"public","uploads","projects");await mkdir(dir,{recursive:true});const filename=`${Date.now()}-${randomUUID()}.${ext}`;await writeFile(path.join(dir,filename),Buffer.from(await file.arrayBuffer()));return NextResponse.json({path:`/uploads/projects/${filename}`});}
