import bcrypt from "bcryptjs"
import mysql from "mysql2/promise"

const email = (process.env.ADMIN_EMAIL || "admin@unimus.ac.id").trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD || "admin123"
const name = process.env.ADMIN_NAME || "Administrator Pusat Studi"

if (password.length < 8) {
  throw new Error("ADMIN_PASSWORD minimal 8 karakter.")
}

const connectionString = process.env.MYSQL_URL || process.env.DATABASE_URL
const pool = connectionString
  ? mysql.createPool(connectionString)
  : mysql.createPool({
      host: process.env.MYSQL_HOST || "127.0.0.1",
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "pusat_studi_unimus",
      waitForConnections: true,
      connectionLimit: 2,
    })

try {
  const passwordHash = await bcrypt.hash(password, 12)
  await pool.execute(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES (?, ?, ?, 'admin')
     ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       password_hash = VALUES(password_hash),
       role = 'admin'`,
    [name, email, passwordHash],
  )
  console.log(`Admin seeded: ${email}`)
} finally {
  await pool.end()
}
