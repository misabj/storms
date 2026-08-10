import mysql, { type Pool } from "mysql2/promise";

let pool: Pool | null = null;

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_HOST && process.env.DATABASE_NAME && process.env.DATABASE_USER);
}

export function getPool() {
  if (!databaseConfigured()) throw new Error("MySQL nije podešen. Popunite DATABASE_* promenljive.");
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT || 3306),
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      charset: "utf8mb4",
      timezone: "Z",
      decimalNumbers: true,
    });
  }
  return pool;
}
