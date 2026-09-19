export type Status = "draft" | "verifikasi" | "dipublikasikan" | "arsip"

export const STATUS_LABELS: Record<Status, string> = {
  draft: "Draft",
  verifikasi: "Verifikasi",
  dipublikasikan: "Dipublikasikan",
  arsip: "Arsip",
}

export const STATUS_ORDER: Status[] = ["draft", "verifikasi", "dipublikasikan", "arsip"]

export type Role = "admin" | "editor"

export interface User {
  id: number
  name: string
  email: string
  password_hash: string
  role: Role
  created_at: string
}

export interface Program {
  id: number
  title: string
  slug: string
  description: string
  icon: string
  ordering: number
}

export interface Mitra {
  id: number
  nama: string
  kategori: string
  website: string
  logo: string
}

export interface Kegiatan {
  id: number
  title: string
  slug: string
  jenis: string
  tanggal: string
  tahun: number
  wilayah: string
  lokasi: string
  mitra_id: number | null
  pelaksana: string
  deskripsi: string
  tujuan: string
  peserta: string
  hasil: string
  foto: string
  video_url: string
  berita_acara: string
  laporan: string
  proposal: string
  status: Status
  created_at: string
}

export interface AnggotaKegiatan {
  id: number
  kegiatan_id: number
  nama: string
  peran: string
}

export interface Berita {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  cover: string
  kegiatan_id: number | null
  tanggal: string
  tahun: number
  status: Status
  created_at: string
}

export type DokumentasiTipe = "foto" | "video"

export interface Dokumentasi {
  id: number
  title: string
  tipe: DokumentasiTipe
  url: string
  kegiatan_id: number | null
  tanggal: string
  tahun: number
  status: Status
}

export type DokumenJenis = "proposal" | "laporan" | "berita_acara" | "sertifikat" | "surat" | "lainnya"

export const DOKUMEN_JENIS_LABELS: Record<DokumenJenis, string> = {
  proposal: "Proposal",
  laporan: "Laporan",
  berita_acara: "Berita Acara",
  sertifikat: "Sertifikat",
  surat: "Surat",
  lainnya: "Lainnya",
}

export interface Dokumen {
  id: number
  title: string
  jenis: DokumenJenis
  file_url: string
  kegiatan_id: number | null
  tahun: number
  status: Status
  created_at: string
}

export type PublikasiJenis = "jurnal" | "prosiding" | "buku" | "artikel" | "haki"

export const PUBLIKASI_JENIS_LABELS: Record<PublikasiJenis, string> = {
  jurnal: "Jurnal",
  prosiding: "Prosiding",
  buku: "Buku",
  artikel: "Artikel",
  haki: "HaKI",
}

export interface Publikasi {
  id: number
  title: string
  jenis: PublikasiJenis
  authors: string
  tahun: number
  link: string
  abstract: string
  kegiatan_id: number | null
  status: Status
  created_at: string
}

export interface SiteSettings {
  site_name: string
  tagline: string
  about: string
  vision: string
  mission: string
  history: string
  address: string
  email: string
  phone: string
  facebook: string
  instagram: string
  youtube: string
}
