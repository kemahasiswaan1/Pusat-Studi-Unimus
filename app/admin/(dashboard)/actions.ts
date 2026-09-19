"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { randomUUID } from "node:crypto"
import { slugify } from "@/lib/format"
import { hashPassword } from "@/lib/auth"
import {
  programsRepo, mitraRepo, kegiatanRepo, beritaRepo, dokumentasiRepo,
  dokumenRepo, publikasiRepo, usersRepo, saveSettings,
} from "@/lib/store"
import type {
  Status, DokumentasiTipe, DokumenJenis, PublikasiJenis, Role, SiteSettings,
} from "@/lib/types"

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim()
}
function num(fd: FormData, key: string): number {
  const v = Number(fd.get(key))
  return Number.isFinite(v) ? v : 0
}
function optNum(fd: FormData, key: string): number | null {
  const raw = str(fd, key)
  if (!raw) return null
  const v = Number(raw)
  return Number.isFinite(v) ? v : null
}
function yearOf(date: string): number {
  const y = new Date(date).getFullYear()
  return Number.isFinite(y) ? y : new Date().getFullYear()
}
function statusOf(fd: FormData): Status {
  const value = str(fd, "status")
  return (["draft", "verifikasi", "dipublikasikan", "arsip"] as Status[]).includes(value as Status)
    ? value as Status
    : "draft"
}
async function fileOrText(fd: FormData, key: string, folder: "images" | "documents", fallbackKey = `${key}_existing`): Promise<string> {
  const value = fd.get(key)
  if (!(value instanceof File) || value.size === 0) return str(fd, fallbackKey) || str(fd, key)
  if (value.size > 10 * 1024 * 1024) throw new Error("Ukuran file maksimal 10 MB.")
  const extension = path.extname(value.name).toLowerCase().replace(/[^a-z0-9.]/g, "") || ".bin"
  const filename = `${randomUUID()}${extension}`
  const directory = path.join(process.cwd(), "public", "uploads", folder)
  await mkdir(directory, { recursive: true })
  await writeFile(path.join(directory, filename), Buffer.from(await value.arrayBuffer()))
  return `/uploads/${folder}/${filename}`
}
function refresh(path: string) {
  revalidatePath(path)
  revalidatePath("/")
}

/* ---------------- Programs ---------------- */
export async function saveProgram(id: number | null, _prev: unknown, fd: FormData) {
  const title = str(fd, "title")
  if (!title) return { error: "Judul wajib diisi." }
  const data = {
    title,
    slug: slugify(title),
    description: str(fd, "description"),
    icon: str(fd, "icon") || "FolderKanban",
    ordering: num(fd, "ordering"),
  }
  if (id) await programsRepo.update(id, data)
  else await programsRepo.insert(data)
  refresh("/program")
  redirect("/admin/program")
}
export async function deleteProgram(id: number) {
  await programsRepo.remove(id)
  refresh("/program")
}

/* ---------------- Mitra ---------------- */
export async function saveMitra(id: number | null, _prev: unknown, fd: FormData) {
  const nama = str(fd, "nama")
  if (!nama) return { error: "Nama mitra wajib diisi." }
  const data = {
    nama,
    kategori: str(fd, "kategori"),
    website: str(fd, "website"),
    logo: str(fd, "logo"),
  }
  if (id) await mitraRepo.update(id, data)
  else await mitraRepo.insert(data)
  refresh("/kegiatan")
  redirect("/admin/mitra")
}
export async function deleteMitra(id: number) {
  await mitraRepo.remove(id)
  refresh("/kegiatan")
}

/* ---------------- Kegiatan ---------------- */
export async function saveKegiatan(id: number | null, _prev: unknown, fd: FormData) {
  const title = str(fd, "title")
  const tanggal = str(fd, "tanggal")
  if (!title) return { error: "Judul wajib diisi." }
  if (!tanggal) return { error: "Tanggal wajib diisi." }
  const data = {
    title,
    slug: slugify(title),
    jenis: str(fd, "jenis"),
    tanggal,
    tahun: yearOf(tanggal),
    wilayah: str(fd, "wilayah"),
    lokasi: str(fd, "lokasi"),
    mitra_id: optNum(fd, "mitra_id"),
    pelaksana: str(fd, "pelaksana"),
    deskripsi: str(fd, "deskripsi"),
    tujuan: str(fd, "tujuan"),
    peserta: str(fd, "peserta"),
    hasil: str(fd, "hasil"),
    foto: await fileOrText(fd, "foto", "images"),
    video_url: str(fd, "video_url"),
    berita_acara: str(fd, "berita_acara"),
    laporan: str(fd, "laporan"),
    proposal: str(fd, "proposal"),
    status: statusOf(fd),
  }
  if (id) await kegiatanRepo.update(id, data)
  else await kegiatanRepo.insert({ ...data, created_at: new Date().toISOString() })
  refresh("/kegiatan")
  redirect("/admin/kegiatan")
}
export async function deleteKegiatan(id: number) {
  await kegiatanRepo.remove(id)
  refresh("/kegiatan")
}

/* ---------------- Berita ---------------- */
export async function saveBerita(id: number | null, _prev: unknown, fd: FormData) {
  const title = str(fd, "title")
  const tanggal = str(fd, "tanggal")
  if (!title) return { error: "Judul wajib diisi." }
  if (!tanggal) return { error: "Tanggal wajib diisi." }
  const data = {
    title,
    slug: slugify(title),
    excerpt: str(fd, "excerpt"),
    content: str(fd, "content"),
    cover: await fileOrText(fd, "cover", "images"),
    kegiatan_id: optNum(fd, "kegiatan_id"),
    tanggal,
    tahun: yearOf(tanggal),
    status: statusOf(fd),
  }
  if (id) await beritaRepo.update(id, data)
  else await beritaRepo.insert({ ...data, created_at: new Date().toISOString() })
  refresh("/berita")
  redirect("/admin/berita")
}
export async function deleteBerita(id: number) {
  await beritaRepo.remove(id)
  refresh("/berita")
}

/* ---------------- Dokumentasi ---------------- */
export async function saveDokumentasi(id: number | null, _prev: unknown, fd: FormData) {
  const title = str(fd, "title")
  const tanggal = str(fd, "tanggal")
  if (!title) return { error: "Judul wajib diisi." }
  const data = {
    title,
    tipe: (str(fd, "tipe") || "foto") as DokumentasiTipe,
    url: await fileOrText(fd, "url", "images"),
    kegiatan_id: optNum(fd, "kegiatan_id"),
    tanggal,
    tahun: yearOf(tanggal || new Date().toISOString()),
    status: statusOf(fd),
  }
  if (id) await dokumentasiRepo.update(id, data)
  else await dokumentasiRepo.insert(data)
  refresh("/dokumentasi")
  redirect("/admin/dokumentasi")
}
export async function deleteDokumentasi(id: number) {
  await dokumentasiRepo.remove(id)
  refresh("/dokumentasi")
}

/* ---------------- Dokumen ---------------- */
export async function saveDokumen(id: number | null, _prev: unknown, fd: FormData) {
  const title = str(fd, "title")
  if (!title) return { error: "Judul wajib diisi." }
  const data = {
    title,
    jenis: (str(fd, "jenis") || "lainnya") as DokumenJenis,
    file_url: await fileOrText(fd, "file_url", "documents"),
    kegiatan_id: optNum(fd, "kegiatan_id"),
    tahun: num(fd, "tahun") || new Date().getFullYear(),
    status: statusOf(fd),
  }
  if (id) await dokumenRepo.update(id, data)
  else await dokumenRepo.insert({ ...data, created_at: new Date().toISOString() })
  refresh("/dokumen")
  redirect("/admin/dokumen")
}
export async function deleteDokumen(id: number) {
  await dokumenRepo.remove(id)
  refresh("/dokumen")
}

/* ---------------- Publikasi ---------------- */
export async function savePublikasi(id: number | null, _prev: unknown, fd: FormData) {
  const title = str(fd, "title")
  if (!title) return { error: "Judul wajib diisi." }
  const data = {
    title,
    jenis: (str(fd, "jenis") || "artikel") as PublikasiJenis,
    authors: str(fd, "authors"),
    tahun: num(fd, "tahun") || new Date().getFullYear(),
    link: str(fd, "link"),
    abstract: str(fd, "abstract"),
    kegiatan_id: optNum(fd, "kegiatan_id"),
    status: statusOf(fd),
  }
  if (id) await publikasiRepo.update(id, data)
  else await publikasiRepo.insert({ ...data, created_at: new Date().toISOString() })
  refresh("/publikasi")
  redirect("/admin/publikasi")
}
export async function deletePublikasi(id: number) {
  await publikasiRepo.remove(id)
  refresh("/publikasi")
}

/* ---------------- Pengguna ---------------- */
export async function saveUser(id: number | null, _prev: unknown, fd: FormData) {
  const name = str(fd, "name")
  const email = str(fd, "email").toLowerCase()
  const password = str(fd, "password")
  if (!name || !email) return { error: "Nama dan email wajib diisi." }

  const existing = await usersRepo.findBy("email", email)
  if (existing && existing.id !== id) return { error: "Email sudah digunakan." }

  const base = { name, email, role: str(fd, "role") as Role }
  if (id) {
    const data: Record<string, unknown> = { ...base }
    if (password) data.password_hash = await hashPassword(password)
    await usersRepo.update(id, data)
  } else {
    if (!password) return { error: "Kata sandi wajib untuk pengguna baru." }
    await usersRepo.insert({
      ...base,
      password_hash: await hashPassword(password),
      created_at: new Date().toISOString(),
    })
  }
  redirect("/admin/pengguna")
}
export async function deleteUser(id: number) {
  await usersRepo.remove(id)
  revalidatePath("/admin/pengguna")
}

/* ---------------- Pengaturan ---------------- */
export async function saveSettingsAction(_prev: unknown, fd: FormData) {
  const data: SiteSettings = {
    site_name: str(fd, "site_name"),
    tagline: str(fd, "tagline"),
    about: str(fd, "about"),
    vision: str(fd, "vision"),
    mission: str(fd, "mission"),
    history: str(fd, "history"),
    address: str(fd, "address"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    facebook: str(fd, "facebook"),
    instagram: str(fd, "instagram"),
    youtube: str(fd, "youtube"),
  }
  await saveSettings(data)
  refresh("/profil")
  return { ok: true }
}
