import {
  kegiatanRepo,
  beritaRepo,
  dokumentasiRepo,
  dokumenRepo,
  publikasiRepo,
  programsRepo,
  mitraRepo,
  getSettings,
} from "./store"
import type { Kegiatan, Berita, Dokumentasi, Dokumen, Publikasi } from "./types"

const PUBLISHED = "dipublikasikan"

function byNewest<T extends { created_at?: string; tanggal?: string; id: number }>(a: T, b: T) {
  const av = a.tanggal || a.created_at || ""
  const bv = b.tanggal || b.created_at || ""
  if (av === bv) return b.id - a.id
  return av < bv ? 1 : -1
}

export interface KegiatanFilter {
  q?: string
  tahun?: number
  jenis?: string
  wilayah?: string
}

export async function getPublishedKegiatan(filter: KegiatanFilter = {}): Promise<Kegiatan[]> {
  let items = (await kegiatanRepo.all()).filter((k) => k.status === PUBLISHED)
  if (filter.q) {
    const q = filter.q.toLowerCase()
    items = items.filter(
      (k) =>
        k.title.toLowerCase().includes(q) ||
        k.deskripsi.toLowerCase().includes(q) ||
        k.lokasi.toLowerCase().includes(q),
    )
  }
  if (filter.tahun) items = items.filter((k) => k.tahun === filter.tahun)
  if (filter.jenis) items = items.filter((k) => k.jenis === filter.jenis)
  if (filter.wilayah) items = items.filter((k) => k.wilayah === filter.wilayah)
  return items.sort(byNewest)
}

export async function getKegiatanBySlug(slug: string): Promise<Kegiatan | null> {
  const k = await kegiatanRepo.findBy("slug", slug)
  return k && k.status === PUBLISHED ? k : null
}

export async function getPublishedBerita(filter: { q?: string; tahun?: number } = {}): Promise<Berita[]> {
  let items = (await beritaRepo.all()).filter((b) => b.status === PUBLISHED)
  if (filter.q) {
    const q = filter.q.toLowerCase()
    items = items.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
  }
  if (filter.tahun) items = items.filter((b) => b.tahun === filter.tahun)
  return items.sort(byNewest)
}

export async function getBeritaBySlug(slug: string): Promise<Berita | null> {
  const b = await beritaRepo.findBy("slug", slug)
  return b && b.status === PUBLISHED ? b : null
}

export async function getPublishedDokumentasi(filter: { tahun?: number; tipe?: string } = {}): Promise<Dokumentasi[]> {
  let items = (await dokumentasiRepo.all()).filter((d) => d.status === PUBLISHED)
  if (filter.tahun) items = items.filter((d) => d.tahun === filter.tahun)
  if (filter.tipe) items = items.filter((d) => d.tipe === filter.tipe)
  return items.sort(byNewest)
}

export async function getPublishedDokumen(filter: { q?: string; tahun?: number; jenis?: string } = {}): Promise<Dokumen[]> {
  let items = (await dokumenRepo.all()).filter((d) => d.status === PUBLISHED)
  if (filter.q) {
    const q = filter.q.toLowerCase()
    items = items.filter((d) => d.title.toLowerCase().includes(q))
  }
  if (filter.tahun) items = items.filter((d) => d.tahun === filter.tahun)
  if (filter.jenis) items = items.filter((d) => d.jenis === filter.jenis)
  return items.sort(byNewest)
}

export async function getPublishedPublikasi(filter: { q?: string; tahun?: number; jenis?: string } = {}): Promise<Publikasi[]> {
  let items = (await publikasiRepo.all()).filter((p) => p.status === PUBLISHED)
  if (filter.q) {
    const q = filter.q.toLowerCase()
    items = items.filter((p) => p.title.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q))
  }
  if (filter.tahun) items = items.filter((p) => p.tahun === filter.tahun)
  if (filter.jenis) items = items.filter((p) => p.jenis === filter.jenis)
  return items.sort(byNewest)
}

export async function getPrograms() {
  return (await programsRepo.all()).sort((a, b) => a.ordering - b.ordering)
}

export async function getMitra() {
  return mitraRepo.all()
}

export async function getKegiatanTitle(id: number | null): Promise<string | null> {
  if (!id) return null
  const k = await kegiatanRepo.find(id)
  return k?.title ?? null
}

export async function getPublicStats() {
  const [kegiatan, berita, dokumentasi, publikasi, mitra, dokumen] = await Promise.all([
    kegiatanRepo.all(),
    beritaRepo.all(),
    dokumentasiRepo.all(),
    publikasiRepo.all(),
    mitraRepo.all(),
    dokumenRepo.all(),
  ])
  return {
    kegiatan: kegiatan.filter((k) => k.status === PUBLISHED).length,
    berita: berita.filter((b) => b.status === PUBLISHED).length,
    dokumentasi: dokumentasi.filter((d) => d.status === PUBLISHED).length,
    publikasi: publikasi.filter((p) => p.status === PUBLISHED).length,
    dokumen: dokumen.filter((d) => d.status === PUBLISHED).length,
    mitra: mitra.length,
  }
}

export async function getFilterOptions() {
  const kegiatan = await kegiatanRepo.all()
  const published = kegiatan.filter((k) => k.status === PUBLISHED)
  const tahun = Array.from(new Set(published.map((k) => k.tahun))).sort((a, b) => b - a)
  const jenis = Array.from(new Set(published.map((k) => k.jenis))).filter(Boolean).sort()
  const wilayah = Array.from(new Set(published.map((k) => k.wilayah))).filter(Boolean).sort()
  return { tahun, jenis, wilayah }
}

export { getSettings }
