import Link from "next/link"
import { CalendarDays, Newspaper, Images, FileText, BookOpen, Building2, ArrowRight, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import {
  kegiatanRepo, beritaRepo, dokumentasiRepo, dokumenRepo, publikasiRepo, mitraRepo,
} from "@/lib/store"
import { formatDate } from "@/lib/format"

export default async function AdminDashboard() {
  const [kegiatan, berita, dokumentasi, dokumen, publikasi, mitra] = await Promise.all([
    kegiatanRepo.all(), beritaRepo.all(), dokumentasiRepo.all(),
    dokumenRepo.all(), publikasiRepo.all(), mitraRepo.all(),
  ])

  const stats = [
    { label: "Kegiatan", value: kegiatan.length, icon: CalendarDays, href: "/admin/kegiatan" },
    { label: "Berita", value: berita.length, icon: Newspaper, href: "/admin/berita" },
    { label: "Dokumentasi", value: dokumentasi.length, icon: Images, href: "/admin/dokumentasi" },
    { label: "Dokumen", value: dokumen.length, icon: FileText, href: "/admin/dokumen" },
    { label: "Publikasi", value: publikasi.length, icon: BookOpen, href: "/admin/publikasi" },
    { label: "Mitra", value: mitra.length, icon: Building2, href: "/admin/mitra" },
  ]

  const needsReview = kegiatan.filter((k) => k.status === "draft" || k.status === "verifikasi")
  const recentKegiatan = [...kegiatan].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ringkasan data Pusat Studi UNIMUS</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{s.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Menunggu Verifikasi / Publikasi</h2>
            </div>
            <div className="mt-4 space-y-2">
              {needsReview.length === 0 ? (
                <p className="text-sm text-muted-foreground">Tidak ada yang menunggu.</p>
              ) : (
                needsReview.map((k) => (
                  <Link key={k.id} href={`/admin/kegiatan/${k.id}`} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 hover:bg-secondary">
                    <span className="truncate text-sm font-medium text-foreground">{k.title}</span>
                    <StatusBadge status={k.status} />
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Kegiatan Terbaru</h2>
              <Link href="/admin/kegiatan" className="flex items-center gap-1 text-sm text-primary hover:underline">
                Semua <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              {recentKegiatan.map((k) => (
                <Link key={k.id} href={`/admin/kegiatan/${k.id}`} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 hover:bg-secondary">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{k.title}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(k.tanggal)}</p>
                  </div>
                  <StatusBadge status={k.status} />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
