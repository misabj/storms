import { notFound } from "next/navigation";
import { DocumentLanguage } from "@/components/layout/document-language";
import { isLocale } from "@/lib/i18n";
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();return <><DocumentLanguage locale={locale}/>{children}</>}
