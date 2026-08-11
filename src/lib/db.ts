import mysql, { type Pool } from "mysql2/promise";

let pool: Pool | null = null;

const databaseEnv = () => ({
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST || process.env.TIDB_HOST,
  port: process.env.DATABASE_PORT || process.env.TIDB_PORT || "3306",
  database: process.env.DATABASE_NAME || process.env.TIDB_DATABASE,
  user: process.env.DATABASE_USER || process.env.TIDB_USER,
  password: process.env.DATABASE_PASSWORD || process.env.TIDB_PASSWORD,
});

export function databaseConfigured() {
  const env = databaseEnv();
  return Boolean(env.url || (env.host && env.database && env.user));
}

export function getPool() {
  const env = databaseEnv();
  if (!databaseConfigured()) throw new Error("MySQL nije podešen. Popunite DATABASE_* ili TIDB_* promenljive.");
  if (!pool) {
    const sslEnabled = process.env.DATABASE_SSL === "true" || process.env.TIDB_ENABLE_SSL === "true" || Boolean(env.url || process.env.TIDB_HOST);
    const ca = (process.env.DATABASE_CA || process.env.TIDB_CA)?.replace(/\\n/g, "\n");
    pool = mysql.createPool({
      uri: env.url,
      host: env.url ? undefined : env.host,
      port: env.url ? undefined : Number(env.port),
      database: env.database,
      user: env.url ? undefined : env.user,
      password: env.url ? undefined : env.password,
      ssl: sslEnabled ? { minVersion: "TLSv1.2", rejectUnauthorized: true, ca } : undefined,
      waitForConnections: true,
      connectionLimit: 10,
      charset: "utf8mb4",
      timezone: "Z",
      decimalNumbers: true,
    });
  }
  return pool;
}
