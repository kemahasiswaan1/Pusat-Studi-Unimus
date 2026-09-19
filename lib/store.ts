import { isDbConfigured, query } from "./db"
import {
  seedUsers,
  seedPrograms,
  seedMitra,
  seedKegiatan,
  seedAnggota,
  seedBerita,
  seedDokumentasi,
  seedDokumen,
  seedPublikasi,
  seedSettings,
} from "./seed-data"
import type {
  User,
  Program,
  Mitra,
  Kegiatan,
  AnggotaKegiatan,
  Berita,
  Dokumentasi,
  Dokumen,
  Publikasi,
  SiteSettings,
} from "./types"

/**
 * Generic repository that works against MySQL when configured, and against an
 * in-memory seeded array otherwise (preview / no-DB mode). Column lists are
 * whitelisted so only known fields reach the SQL statements.
 */
class Repo<T extends { id: number }> {
  private mem: T[]
  constructor(
    private table: string,
    private columns: (keyof T)[],
    seed: T[],
  ) {
    // clone so mutations don't corrupt the original seed arrays
    this.mem = seed.map((r) => ({ ...r }))
  }

  async all(): Promise<T[]> {
    if (isDbConfigured) return query<T>(`SELECT * FROM \`${this.table}\``)
    return this.mem.map((r) => ({ ...r }))
  }

  async find(id: number): Promise<T | null> {
    if (isDbConfigured) {
      const rows = await query<T>(`SELECT * FROM \`${this.table}\` WHERE id = ? LIMIT 1`, [id])
      return rows[0] ?? null
    }
    const row = this.mem.find((r) => r.id === Number(id))
    return row ? { ...row } : null
  }

  async findBy<K extends keyof T>(field: K, value: T[K]): Promise<T | null> {
    if (isDbConfigured) {
      const rows = await query<T>(`SELECT * FROM \`${this.table}\` WHERE \`${String(field)}\` = ? LIMIT 1`, [
        value as any,
      ])
      return rows[0] ?? null
    }
    const row = this.mem.find((r) => r[field] === value)
    return row ? { ...row } : null
  }

  async insert(data: Partial<T>): Promise<number> {
    const cols = this.columns.filter((c) => c !== "id" && data[c] !== undefined)
    if (isDbConfigured) {
      const placeholders = cols.map(() => "?").join(", ")
      const colNames = cols.map((c) => `\`${String(c)}\``).join(", ")
      const values = cols.map((c) => data[c] as any)
      const result: any = await query(
        `INSERT INTO \`${this.table}\` (${colNames}) VALUES (${placeholders})`,
        values,
      )
      return result.insertId as number
    }
    const id = this.mem.reduce((max, r) => Math.max(max, r.id), 0) + 1
    const row = { id } as T
    for (const c of cols) (row as any)[c] = data[c]
    this.mem.push(row)
    return id
  }

  async update(id: number, data: Partial<T>): Promise<void> {
    const cols = this.columns.filter((c) => c !== "id" && data[c] !== undefined)
    if (cols.length === 0) return
    if (isDbConfigured) {
      const setClause = cols.map((c) => `\`${String(c)}\` = ?`).join(", ")
      const values = cols.map((c) => data[c] as any)
      await query(`UPDATE \`${this.table}\` SET ${setClause} WHERE id = ?`, [...values, id])
      return
    }
    const row = this.mem.find((r) => r.id === Number(id))
    if (row) for (const c of cols) (row as any)[c] = data[c]
  }

  async remove(id: number): Promise<void> {
    if (isDbConfigured) {
      await query(`DELETE FROM \`${this.table}\` WHERE id = ?`, [id])
      return
    }
    this.mem = this.mem.filter((r) => r.id !== Number(id))
  }
}

export const usersRepo = new Repo<User>("users", ["id", "name", "email", "password_hash", "role", "created_at"], seedUsers)

export const programsRepo = new Repo<Program>(
  "programs",
  ["id", "title", "slug", "description", "icon", "ordering"],
  seedPrograms,
)

export const mitraRepo = new Repo<Mitra>("mitra", ["id", "nama", "kategori", "website", "logo"], seedMitra)

export const kegiatanRepo = new Repo<Kegiatan>(
  "kegiatan",
  [
    "id", "title", "slug", "jenis", "tanggal", "tahun", "wilayah", "lokasi", "mitra_id", "pelaksana",
    "deskripsi", "tujuan", "peserta", "hasil", "foto", "video_url", "berita_acara", "laporan", "proposal",
    "status", "created_at",
  ],
  seedKegiatan,
)

export const anggotaRepo = new Repo<AnggotaKegiatan>(
  "anggota_kegiatan",
  ["id", "kegiatan_id", "nama", "peran"],
  seedAnggota,
)

export const beritaRepo = new Repo<Berita>(
  "berita",
  ["id", "title", "slug", "excerpt", "content", "cover", "kegiatan_id", "tanggal", "tahun", "status", "created_at"],
  seedBerita,
)

export const dokumentasiRepo = new Repo<Dokumentasi>(
  "dokumentasi",
  ["id", "title", "tipe", "url", "kegiatan_id", "tanggal", "tahun", "status"],
  seedDokumentasi,
)

export const dokumenRepo = new Repo<Dokumen>(
  "dokumen",
  ["id", "title", "jenis", "file_url", "kegiatan_id", "tahun", "status", "created_at"],
  seedDokumen,
)

export const publikasiRepo = new Repo<Publikasi>(
  "publikasi",
  ["id", "title", "jenis", "authors", "tahun", "link", "abstract", "kegiatan_id", "status", "created_at"],
  seedPublikasi,
)

// Settings is a single record. Stored in a key/value table when DB is configured.
let memSettings: SiteSettings = { ...seedSettings }

export async function getSettings(): Promise<SiteSettings> {
  if (isDbConfigured) {
    const rows = await query<{ k: string; v: string }>("SELECT `k`, `v` FROM settings")
    const map = Object.fromEntries(rows.map((r) => [r.k, r.v]))
    return { ...seedSettings, ...map } as SiteSettings
  }
  return { ...memSettings }
}

export async function saveSettings(data: SiteSettings): Promise<void> {
  if (isDbConfigured) {
    for (const [k, v] of Object.entries(data)) {
      await query("INSERT INTO settings (`k`, `v`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `v` = ?", [k, v, v])
    }
    return
  }
  memSettings = { ...data }
}
