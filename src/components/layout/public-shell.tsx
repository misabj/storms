import { Header } from "./header";
import { Footer } from "./footer";
import { getActiveProjects, getSettings } from "@/repositories/projects";
import { localizeProject, type Locale } from "@/lib/i18n";

export async function PublicShell({ children, overlay = false, locale = "sr", dark = false }: { children: React.ReactNode; overlay?: boolean; locale?: Locale; dark?: boolean }) {
  const [projects, settings] = await Promise.all([getActiveProjects(), getSettings()]);
  return <><Header projects={projects.map(p=>localizeProject(p,locale))} overlay={overlay} locale={locale} dark={dark} />{children}<Footer settings={settings} locale={locale} dark={dark} /></>;
}
