import { readFileSync } from "node:fs";

export async function importClientContent(connection) {
  const content = JSON.parse(readFileSync(new URL("../src/lib/client-content.json", import.meta.url), "utf8"));
  const migration = "005_client_project_list";
  await connection.query("CREATE TABLE IF NOT EXISTS content_migrations (name VARCHAR(190) PRIMARY KEY, appliedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
  const [applied] = await connection.execute("SELECT name FROM content_migrations WHERE name = ?", [migration]);
  if (applied.length) {
    console.log("Client content already imported; preserving administrator edits.");
    return;
  }
  await connection.beginTransaction();
  try {
    const slugs = content.projects.map((project) => project.slug);
    await connection.query("UPDATE projects SET status = 'DRAFT', featured = FALSE, showInNavigation = FALSE WHERE status = 'COMPLETED' AND slug NOT IN (?)", [slugs]);
    for (const [index, project] of content.projects.entries()) {
      const heroImage = `/images/projects/${project.slug}/hero.webp`;
      const values = {
        category: project.category, status: "COMPLETED", phase: "COMPLETED", title: project.title,
        subtitle: "", slug: project.slug, shortDescription: project.description, description: project.description,
        address: project.address, city: project.city, locationDescription: project.locationDescription,
        heroImage, mapAddress: `${project.address}, ${project.city}, Srbija`, mapUrl: project.mapUrl,
        occupancyPermit: project.occupancyPermit, completedYear: project.completedYear,
        featured: false, showInNavigation: false, sortOrder: 100 + index,
        titleEn: project.titleEn || project.title, shortDescriptionEn: project.descriptionEn,
        descriptionEn: project.descriptionEn, locationDescriptionEn: project.locationDescriptionEn,
      };
      const columns = Object.keys(values);
      await connection.execute(`INSERT INTO projects (${columns.join(",")}) VALUES (${columns.map(() => "?").join(",")}) ON DUPLICATE KEY UPDATE ${columns.filter((column) => column !== "slug").map((column) => `${column}=VALUES(${column})`).join(",")}`, Object.values(values));
      const [[saved]] = await connection.execute("SELECT id FROM projects WHERE slug = ?", [project.slug]);
      await connection.execute("INSERT INTO project_images (projectId,imagePath,altText,type,sortOrder) SELECT ?,?,?,?,1 WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE projectId=? AND imagePath=?)", [saved.id, heroImage, project.title, project.category === "COMMERCIAL" ? "INTERIOR" : "EXTERIOR", saved.id, heroImage]);
    }
    await connection.query("UPDATE team_members SET active = FALSE");
    for (const [index, member] of content.team.entries()) {
      const [existing] = await connection.execute("SELECT id FROM team_members WHERE name = ? ORDER BY id LIMIT 1", [member.name]);
      if (existing.length) {
        await connection.execute("UPDATE team_members SET role=?,department=?,sortOrder=?,active=TRUE WHERE id=?", [member.role, member.department, index + 1, existing[0].id]);
      } else {
        await connection.execute("INSERT INTO team_members (name,role,department,photo,sortOrder,active) VALUES (?,?,?,?,?,TRUE)", [member.name, member.role, member.department, member.photo, index + 1]);
      }
    }
    for (const [key, value] of Object.entries(content.settings)) {
      await connection.execute("INSERT INTO site_settings (settingKey,settingValue) VALUES (?,?) ON DUPLICATE KEY UPDATE settingValue=VALUES(settingValue)", [key, value]);
    }
    await connection.execute("INSERT INTO content_migrations (name) VALUES (?)", [migration]);
    await connection.commit();
    console.log(`Imported ${content.projects.length} completed projects, ${content.team.length} team members and contact settings. Active projects preserved.`);
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}