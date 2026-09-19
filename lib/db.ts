import mysql from "mysql2/promise"

/**
 * MySQL connection. Configure with either a single connection string
 * (MYSQL_URL / DATABASE_URL) or discrete MYSQL_* variables.
 * When no configuration is present the app falls back to an in-memory
 * seeded store so the preview and admin CRUD remain fully usable.
 */
const connectionString = process.env.MYSQL_URL || process.env.DATABASE_URL || ""
const hasDiscrete = Boolean(process.env.MYSQL_HOST && process.env.MYSQL_DATABASE)

export const isDbConfigured = Boolean(connectionString || hasDiscrete)

let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    if (connectionString) {
      pool = mysql.createPool(connectionString)
    } else {
      pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
      })
    }
  }
  return pool
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const [rows] = await getPool().execute(sql, params)
  return rows as T[]
}
