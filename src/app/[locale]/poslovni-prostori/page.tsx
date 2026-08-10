import { notFound } from "next/navigation";import { CategoryPage } from "@/components/projects/category-page";import { isLocale } from "@/lib/i18n";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <CategoryPage category="COMMERCIAL" locale={locale}/>}
