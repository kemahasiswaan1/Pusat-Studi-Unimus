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

// Password hash for "admin123" is generated at runtime in auth when DB is not configured.
export const seedUsers: User[] = [
  {
    id: 1,
    name: "Administrator",
    email: "admin@unimus.ac.id",
    password_hash: "admin123", // plain fallback only used in no-DB preview mode
    role: "admin",
    created_at: "2025-01-05T08:00:00Z",
  },
  {
    id: 2,
    name: "Editor Konten",
    email: "editor@unimus.ac.id",
    password_hash: "editor123",
    role: "editor",
    created_at: "2025-02-10T08:00:00Z",
  },
]

export const seedSettings: SiteSettings = {
  site_name: "Pusat Studi UNIMUS",
  tagline: "Pusat Informasi, Dokumentasi, dan Publikasi Kegiatan",
  about:
    "Pusat Studi UNIMUS merupakan unit di lingkungan Universitas Muhammadiyah Semarang yang mengoordinasikan kegiatan riset, pengabdian, dan kajian strategis lintas bidang. Kami menghadirkan wadah informasi, dokumentasi, serta publikasi kegiatan agar dampak akademik dan sosial dapat diakses oleh masyarakat luas.",
  vision:
    "Menjadi pusat studi unggul yang menghasilkan riset dan kajian berdampak bagi pengembangan ilmu pengetahuan serta kesejahteraan masyarakat.",
  mission:
    "Menyelenggarakan riset multidisiplin yang berkualitas.\nMendokumentasikan dan mempublikasikan hasil kegiatan secara terbuka.\nMembangun kemitraan strategis dengan pemerintah, industri, dan komunitas.\nMeningkatkan kapasitas peneliti dan mahasiswa.",
  history:
    "Didirikan sebagai bagian dari komitmen UNIMUS terhadap tridarma perguruan tinggi, Pusat Studi terus berkembang menjadi simpul kolaborasi riset dan pengabdian masyarakat.",
  address: "Jl. Kedungmundu Raya No. 18, Semarang, Jawa Tengah 50273",
  email: "pusatstudi@unimus.ac.id",
  phone: "(024) 76740296",
  facebook: "https://facebook.com/unimus",
  instagram: "https://instagram.com/unimus.official",
  youtube: "https://youtube.com/@unimus",
}

export const seedPrograms: Program[] = [
  {
    id: 1,
    title: "Riset Multidisiplin",
    slug: "riset-multidisiplin",
    description: "Penelitian lintas bidang yang menjawab tantangan kesehatan, sosial, dan teknologi.",
    icon: "flask",
    ordering: 1,
  },
  {
    id: 2,
    title: "Pengabdian Masyarakat",
    slug: "pengabdian-masyarakat",
    description: "Program pemberdayaan komunitas dan penerapan hasil riset di tengah masyarakat.",
    icon: "users",
    ordering: 2,
  },
  {
    id: 3,
    title: "Kajian Strategis",
    slug: "kajian-strategis",
    description: "Analisis kebijakan dan kajian isu strategis untuk mendukung pengambilan keputusan.",
    icon: "book",
    ordering: 3,
  },
  {
    id: 4,
    title: "Pelatihan & Sertifikasi",
    slug: "pelatihan-sertifikasi",
    description: "Peningkatan kapasitas peneliti, dosen, dan mahasiswa melalui pelatihan tematik.",
    icon: "graduation",
    ordering: 4,
  },
]

export const seedMitra: Mitra[] = [
  { id: 1, nama: "Dinas Kesehatan Kota Semarang", kategori: "Pemerintah", website: "https://dinkes.semarangkota.go.id", logo: "/placeholder.svg?height=80&width=160" },
  { id: 2, nama: "BRIN", kategori: "Lembaga Riset", website: "https://brin.go.id", logo: "/placeholder.svg?height=80&width=160" },
  { id: 3, nama: "PT Sinergi Farma", kategori: "Industri", website: "https://example.com", logo: "/placeholder.svg?height=80&width=160" },
  { id: 4, nama: "Pemerintah Desa Wonolopo", kategori: "Pemerintah", website: "https://example.com", logo: "/placeholder.svg?height=80&width=160" },
]

export const seedKegiatan: Kegiatan[] = [
  {
    id: 1,
    title: "Riset Ketahanan Pangan Berbasis Komunitas",
    slug: "riset-ketahanan-pangan-berbasis-komunitas",
    jenis: "Penelitian",
    tanggal: "2025-08-12",
    tahun: 2025,
    wilayah: "Kota Semarang",
    lokasi: "Kelurahan Wonolopo, Mijen",
    mitra_id: 4,
    pelaksana: "Tim Riset Pusat Studi UNIMUS",
    deskripsi:
      "Kegiatan riset untuk memetakan potensi pangan lokal dan menyusun model ketahanan pangan berbasis komunitas di wilayah pinggiran kota.",
    tujuan: "Menyusun rekomendasi kebijakan ketahanan pangan dan memberdayakan kelompok tani lokal.",
    peserta: "45 peserta",
    hasil: "Terbentuknya peta potensi pangan dan modul pemberdayaan kelompok tani.",
    foto: "/placeholder.svg?height=480&width=800",
    video_url: "",
    berita_acara: "/placeholder-document.pdf",
    laporan: "/placeholder-document.pdf",
    proposal: "/placeholder-document.pdf",
    status: "dipublikasikan",
    created_at: "2025-08-01T08:00:00Z",
  },
  {
    id: 2,
    title: "Pengabdian: Edukasi Gizi Keluarga",
    slug: "pengabdian-edukasi-gizi-keluarga",
    jenis: "Pengabdian",
    tanggal: "2025-07-03",
    tahun: 2025,
    wilayah: "Kab. Demak",
    lokasi: "Puskesmas Karangtengah",
    mitra_id: 1,
    pelaksana: "Tim Pengabdian & Mahasiswa",
    deskripsi:
      "Program edukasi gizi keluarga untuk menurunkan angka stunting melalui penyuluhan dan pendampingan kader posyandu.",
    tujuan: "Meningkatkan pengetahuan gizi keluarga dan kapasitas kader posyandu.",
    peserta: "120 peserta",
    hasil: "Peningkatan skor pengetahuan gizi peserta sebesar 32%.",
    foto: "/placeholder.svg?height=480&width=800",
    video_url: "",
    berita_acara: "/placeholder-document.pdf",
    laporan: "/placeholder-document.pdf",
    proposal: "",
    status: "dipublikasikan",
    created_at: "2025-06-20T08:00:00Z",
  },
  {
    id: 3,
    title: "Seminar Nasional Inovasi Kesehatan Masyarakat",
    slug: "seminar-nasional-inovasi-kesehatan-masyarakat",
    jenis: "Seminar",
    tanggal: "2025-05-21",
    tahun: 2025,
    wilayah: "Kota Semarang",
    lokasi: "Auditorium UNIMUS",
    mitra_id: 2,
    pelaksana: "Panitia Seminar Pusat Studi",
    deskripsi:
      "Seminar nasional yang mempertemukan akademisi, praktisi, dan pemangku kebijakan membahas inovasi kesehatan masyarakat.",
    tujuan: "Diseminasi hasil riset dan penguatan jejaring akademik.",
    peserta: "300 peserta",
    hasil: "Terkumpul 40 artikel prosiding dan 6 nota kesepahaman kerja sama.",
    foto: "/placeholder.svg?height=480&width=800",
    video_url: "",
    berita_acara: "/placeholder-document.pdf",
    laporan: "",
    proposal: "/placeholder-document.pdf",
    status: "dipublikasikan",
    created_at: "2025-05-01T08:00:00Z",
  },
  {
    id: 4,
    title: "Pelatihan Penulisan Artikel Ilmiah Bereputasi",
    slug: "pelatihan-penulisan-artikel-ilmiah-bereputasi",
    jenis: "Pelatihan",
    tanggal: "2025-09-15",
    tahun: 2025,
    wilayah: "Kota Semarang",
    lokasi: "Laboratorium Komputer UNIMUS",
    mitra_id: 3,
    pelaksana: "Tim Pengembangan SDM",
    deskripsi: "Pelatihan intensif penulisan artikel untuk jurnal internasional bereputasi.",
    tujuan: "Meningkatkan jumlah publikasi peneliti pada jurnal terindeks.",
    peserta: "60 peserta",
    hasil: "Draf artikel siap submit dari 24 peserta.",
    foto: "/placeholder.svg?height=480&width=800",
    video_url: "",
    berita_acara: "",
    laporan: "",
    proposal: "/placeholder-document.pdf",
    status: "verifikasi",
    created_at: "2025-09-01T08:00:00Z",
  },
]

export const seedAnggota: AnggotaKegiatan[] = [
  { id: 1, kegiatan_id: 1, nama: "Dr. Andi Prasetyo", peran: "Ketua Peneliti" },
  { id: 2, kegiatan_id: 1, nama: "Siti Rahma, M.Kes", peran: "Anggota" },
  { id: 3, kegiatan_id: 2, nama: "Budi Santoso, M.Gz", peran: "Ketua Pelaksana" },
  { id: 4, kegiatan_id: 3, nama: "Prof. Hendra Wijaya", peran: "Ketua Panitia" },
]

export const seedBerita: Berita[] = [
  {
    id: 1,
    title: "Pusat Studi UNIMUS Petakan Potensi Pangan Wonolopo",
    slug: "petakan-potensi-pangan-wonolopo",
    excerpt: "Tim riset menyusun peta potensi pangan lokal bersama kelompok tani setempat.",
    content:
      "Pusat Studi UNIMUS menuntaskan riset ketahanan pangan berbasis komunitas di Kelurahan Wonolopo. Hasil riset berupa peta potensi pangan dan modul pemberdayaan diserahkan kepada pemerintah desa untuk ditindaklanjuti.",
    cover: "/placeholder.svg?height=480&width=800",
    kegiatan_id: 1,
    tanggal: "2025-08-20",
    tahun: 2025,
    status: "dipublikasikan",
    created_at: "2025-08-20T08:00:00Z",
  },
  {
    id: 2,
    title: "Edukasi Gizi Turunkan Risiko Stunting di Demak",
    slug: "edukasi-gizi-turunkan-risiko-stunting-demak",
    excerpt: "Program pengabdian meningkatkan pengetahuan gizi keluarga hingga 32%.",
    content:
      "Melalui penyuluhan dan pendampingan kader posyandu, program edukasi gizi keluarga di Kabupaten Demak berhasil meningkatkan pemahaman peserta terhadap pola makan sehat.",
    cover: "/placeholder.svg?height=480&width=800",
    kegiatan_id: 2,
    tanggal: "2025-07-10",
    tahun: 2025,
    status: "dipublikasikan",
    created_at: "2025-07-10T08:00:00Z",
  },
  {
    id: 3,
    title: "Seminar Nasional Hasilkan 6 Kerja Sama Baru",
    slug: "seminar-nasional-hasilkan-6-kerja-sama-baru",
    excerpt: "Seminar mempertemukan akademisi dan pemangku kebijakan lintas daerah.",
    content:
      "Seminar Nasional Inovasi Kesehatan Masyarakat menghasilkan 40 artikel prosiding dan penandatanganan enam nota kesepahaman kerja sama riset.",
    cover: "/placeholder.svg?height=480&width=800",
    kegiatan_id: 3,
    tanggal: "2025-05-25",
    tahun: 2025,
    status: "dipublikasikan",
    created_at: "2025-05-25T08:00:00Z",
  },
]

export const seedDokumentasi: Dokumentasi[] = [
  { id: 1, title: "Pemetaan lapangan Wonolopo", tipe: "foto", url: "/placeholder.svg?height=400&width=600", kegiatan_id: 1, tanggal: "2025-08-12", tahun: 2025, status: "dipublikasikan" },
  { id: 2, title: "Penyuluhan gizi posyandu", tipe: "foto", url: "/placeholder.svg?height=400&width=600", kegiatan_id: 2, tanggal: "2025-07-03", tahun: 2025, status: "dipublikasikan" },
  { id: 3, title: "Dokumentasi seminar nasional", tipe: "foto", url: "/placeholder.svg?height=400&width=600", kegiatan_id: 3, tanggal: "2025-05-21", tahun: 2025, status: "dipublikasikan" },
  { id: 4, title: "Rekap video seminar", tipe: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", kegiatan_id: 3, tanggal: "2025-05-21", tahun: 2025, status: "dipublikasikan" },
  { id: 5, title: "Cuplikan pelatihan penulisan", tipe: "foto", url: "/placeholder.svg?height=400&width=600", kegiatan_id: 4, tanggal: "2025-09-15", tahun: 2025, status: "verifikasi" },
]

export const seedDokumen: Dokumen[] = [
  { id: 1, title: "Laporan Akhir Riset Ketahanan Pangan", jenis: "laporan", file_url: "/placeholder-document.pdf", kegiatan_id: 1, tahun: 2025, status: "dipublikasikan", created_at: "2025-08-25T08:00:00Z" },
  { id: 2, title: "Proposal Edukasi Gizi Keluarga", jenis: "proposal", file_url: "/placeholder-document.pdf", kegiatan_id: 2, tahun: 2025, status: "dipublikasikan", created_at: "2025-06-15T08:00:00Z" },
  { id: 3, title: "Berita Acara Seminar Nasional", jenis: "berita_acara", file_url: "/placeholder-document.pdf", kegiatan_id: 3, tahun: 2025, status: "dipublikasikan", created_at: "2025-05-22T08:00:00Z" },
  { id: 4, title: "Proposal Pelatihan Penulisan Artikel", jenis: "proposal", file_url: "/placeholder-document.pdf", kegiatan_id: 4, tahun: 2025, status: "verifikasi", created_at: "2025-09-02T08:00:00Z" },
]

export const seedPublikasi: Publikasi[] = [
  {
    id: 1,
    title: "Community-Based Food Security Model in Urban Fringe Areas",
    jenis: "jurnal",
    authors: "A. Prasetyo, S. Rahma",
    tahun: 2025,
    link: "https://example.com/jurnal-1",
    abstract: "Studi ini mengembangkan model ketahanan pangan berbasis komunitas di wilayah pinggiran kota.",
    kegiatan_id: 1,
    status: "dipublikasikan",
    created_at: "2025-09-01T08:00:00Z",
  },
  {
    id: 2,
    title: "Efektivitas Edukasi Gizi terhadap Pencegahan Stunting",
    jenis: "prosiding",
    authors: "B. Santoso, dkk",
    tahun: 2025,
    link: "https://example.com/prosiding-1",
    abstract: "Artikel prosiding yang membahas dampak program edukasi gizi keluarga.",
    kegiatan_id: 2,
    status: "dipublikasikan",
    created_at: "2025-07-15T08:00:00Z",
  },
]
