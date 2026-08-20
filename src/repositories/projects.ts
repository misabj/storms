import { unstable_cache } from "next/cache";
import { databaseConfigured, getPool } from "@/lib/db";
import { demoProjects, demoSettings, demoTeam } from "@/lib/demo-data";
import type { FloorPlan, Project, ProjectCategory, ProjectImage, ProjectPhase, ProjectStatus, SiteSettings, TeamMember, Unit } from "@/types";

type Row = Record<string, unknown>;
const bool = (value: unknown) => Boolean(Number(value));

function baseProject(row: Row): Project {
  return {
    id: Number(row.id), category: String(row.category) as ProjectCategory, status: String(row.status) as ProjectStatus, phase: (row.phase ? String(row.phase) : (String(row.status) === "COMPLETED" ? "COMPLETED" : "CONSTRUCTION")) as ProjectPhase,
    title: String(row.title), subtitle: String(row.subtitle || ""), slug: String(row.slug), shortDescription: String(row.shortDescription || ""), description: String(row.description || ""),
    address: String(row.address || ""), city: String(row.city || ""), locationDescription: String(row.locationDescription || ""), heroImage: String(row.heroImage || ""), mapAddress: String(row.mapAddress || row.address || ""),
    latitude: row.latitude == null ? null : Number(row.latitude), longitude: row.longitude == null ? null : Number(row.longitude), featured: bool(row.featured), showInNavigation: bool(row.showInNavigation), sortOrder: Number(row.sortOrder || 0),
    seoTitle: row.seoTitle ? String(row.seoTitle) : undefined, seoDescription: row.seoDescription ? String(row.seoDescription) : undefined,
    titleEn: row.titleEn ? String(row.titleEn) : undefined, subtitleEn: row.subtitleEn ? String(row.subtitleEn) : undefined, shortDescriptionEn: row.shortDescriptionEn ? String(row.shortDescriptionEn) : undefined, descriptionEn: row.descriptionEn ? String(row.descriptionEn) : undefined, locationDescriptionEn: row.locationDescriptionEn ? String(row.locationDescriptionEn) : undefined, seoTitleEn: row.seoTitleEn ? String(row.seoTitleEn) : undefined, seoDescriptionEn: row.seoDescriptionEn ? String(row.seoDescriptionEn) : undefined, images: [], units: [], floorPlans: [],
  };
}

async function attachRelations(projects: Project[]) {
  if (!projects.length) return projects;
  const ids = projects.map((p) => p.id);
  const pool = getPool();
  const [imageRows] = await pool.query("SELECT * FROM project_images WHERE projectId IN (?) ORDER BY sortOrder, id", [ids]);
  const [unitRows] = await pool.query("SELECT * FROM units WHERE projectId IN (?) ORDER BY sortOrder, id", [ids]);
  const [planRows] = await pool.query("SELECT * FROM project_floor_plans WHERE projectId IN (?) ORDER BY sortOrder, id", [ids]);
  const unitIds = (unitRows as Row[]).map((r) => Number(r.id));
  let roomRows: Row[] = [];
  if (unitIds.length) {
    try {
      const [rows] = await pool.query("SELECT * FROM unit_rooms WHERE unitId IN (?) ORDER BY sortOrder, id", [unitIds]);
      roomRows = rows as Row[];
    } catch {
      roomRows = [];
    }
  }
  for (const project of projects) {
    project.images = (imageRows as Row[]).filter((r) => Number(r.projectId) === project.id).map((r) => ({ id: Number(r.id), imagePath: String(r.imagePath), altText: String(r.altText || project.title), type: String(r.type) as ProjectImage["type"], sortOrder: Number(r.sortOrder) }));
    project.units = (unitRows as Row[]).filter((r) => Number(r.projectId) === project.id).map((r) => ({ id: Number(r.id), name: String(r.name), unitNumber: String(r.unitNumber || ""), floor: String(r.floor || ""), rooms: r.rooms == null ? null : Number(r.rooms), area: Number(r.area), orientation: String(r.orientation || ""), price: r.price == null ? null : Number(r.price), pricePerSquareMeter: r.pricePerSquareMeter == null ? null : Number(r.pricePerSquareMeter), showPrice: bool(r.showPrice), status: String(r.status) as Unit["status"], description: r.description ? String(r.description) : undefined, image: r.image ? String(r.image) : undefined, floorPlanImage: r.floorPlanImage ? String(r.floorPlanImage) : undefined, roomAreas: roomRows.filter((room) => Number(room.unitId) === Number(r.id)).map((room) => ({ id: Number(room.id), name: String(room.name), area: Number(room.area) })) }));
    project.floorPlans = (planRows as Row[]).filter((r) => Number(r.projectId) === project.id).map((r) => ({ id: Number(r.id), title: String(r.title), image: String(r.image), description: r.description ? String(r.description) : undefined, sortOrder: Number(r.sortOrder) } as FloorPlan));
  }
  return projects;
}

async function readProjects(): Promise<Project[]> {
  if (!databaseConfigured()) return demoProjects;
  const [rows] = await getPool().query("SELECT * FROM projects ORDER BY sortOrder, createdAt DESC");
  return attachRelations((rows as Row[]).map(baseProject));
}

export const getProjects = unstable_cache(readProjects, ["projects"], { tags: ["projects"], revalidate: 60 });
export async function getActiveProjects(category?: ProjectCategory) { return (await getProjects()).filter((p) => p.status === "ACTIVE" && (!category || p.category === category)); }
export async function getFeaturedProjects() { return (await getProjects()).filter((p) => p.status === "ACTIVE" && p.featured); }
export async function getCompletedProjects() { return (await getProjects()).filter((p) => p.status === "COMPLETED"); }
export async function getProjectBySlug(slug: string) { return (await getProjects()).find((p) => p.slug === slug) ?? null; }

function mapTeam(rows: Row[]): TeamMember[] {
  return rows.map((r) => ({ id: Number(r.id), name: String(r.name), role: String(r.role), department: (r.department ? String(r.department) : "ADMINISTRATION") as TeamMember["department"], photo: String(r.photo), description: r.description ? String(r.description) : undefined, sortOrder: Number(r.sortOrder), active: bool(r.active) }));
}
export async function getTeam(): Promise<TeamMember[]> {
  if (!databaseConfigured()) return demoTeam;
  const [rows] = await getPool().query("SELECT * FROM team_members WHERE active = 1 ORDER BY sortOrder, id");
  return mapTeam(rows as Row[]);
}
export async function getAllTeam(): Promise<TeamMember[]> {
  if (!databaseConfigured()) return demoTeam;
  const [rows] = await getPool().query("SELECT * FROM team_members ORDER BY sortOrder, id");
  return mapTeam(rows as Row[]);
}

export async function getSettings(): Promise<SiteSettings> {
  if (!databaseConfigured()) return demoSettings;
  const [rows] = await getPool().query("SELECT settingKey, settingValue FROM site_settings");
  const values = Object.fromEntries((rows as Row[]).map((r) => [String(r.settingKey), String(r.settingValue || "")]));
  return { ...demoSettings, ...values };
}
