// One-off migration runner. Reads .env.local and applies unit media + rooms schema.
// Usage: node scripts/migrate.mjs
import { readFileSync } from "node:fs";
import mysql from "mysql2/promise";

function loadEnv() {
  try {
    const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!m) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (!(m[1] in process.env)) process.env[m[1]] = v;
    }
  } catch {}
}

loadEnv();

const useUrl = Boolean(process.env.DATABASE_URL);
const sslEnabled = process.env.DATABASE_SSL === "true" || Boolean(process.env.DATABASE_URL);
const ca = (process.env.DATABASE_CA || "").replace(/\\n/g, "\n");

const conn = await mysql.createConnection({
  uri: process.env.DATABASE_URL,
  host: useUrl ? undefined : process.env.DATABASE_HOST,
  port: useUrl ? undefined : Number(process.env.DATABASE_PORT || 3306),
  database: process.env.DATABASE_NAME,
  user: useUrl ? undefined : process.env.DATABASE_USER,
  password: useUrl ? undefined : process.env.DATABASE_PASSWORD,
  ssl: sslEnabled ? { minVersion: "TLSv1.2", rejectUnauthorized: true, ca: ca || undefined } : undefined,
  multipleStatements: true,
});

const [cols] = await conn.query("SHOW COLUMNS FROM units");
const names = cols.map((c) => c.Field);
if (!names.includes("image")) {
  await conn.query("ALTER TABLE units ADD COLUMN image VARCHAR(500) NULL AFTER description");
  console.log("+ added units.image");
}
if (!names.includes("floorPlanImage")) {
  await conn.query("ALTER TABLE units ADD COLUMN floorPlanImage VARCHAR(500) NULL AFTER image");
  console.log("+ added units.floorPlanImage");
}

await conn.query(`CREATE TABLE IF NOT EXISTS unit_rooms (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  unitId BIGINT UNSIGNED NOT NULL,
  name VARCHAR(160) NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  sortOrder INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_unit_rooms_unit FOREIGN KEY (unitId) REFERENCES units(id) ON DELETE CASCADE,
  INDEX idx_unit_rooms_order (unitId, sortOrder)
) ENGINE=InnoDB`);
console.log("+ ensured unit_rooms table");

const [check] = await conn.query("SHOW TABLES LIKE 'unit_rooms'");
console.log("unit_rooms exists:", check.length > 0);
await conn.end();
console.log("Migration done.");
