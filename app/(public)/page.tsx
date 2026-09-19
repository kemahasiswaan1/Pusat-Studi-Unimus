import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight, CalendarDays, MapPin, Newspaper, FileText, Images, BookOpen, Users, FolderKanban,
  FlaskConical, GraduationCap, Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  getPublishedKegiatan, getPublishedBerita, getPublishedDokumentasi, getPrograms, getMitra,
  getPublicStats, getSettings,
} from "@/lib/queries"
import { formatDate } from "@/lib/format"

const programIcons: Record<string, any> = {
  flask: FlaskConical, users: Users, book: BookOpen, graduation: GraduationCap,
}

export default async function HomePage() {
  const [settings, kegiatan, berita, dokumentasi, programs, mitra, stats] = await Promise.all([
    getSettings(),
    getPublishedKegiatan(),
    getPublishedBerita(),
    getPublishedDokumentasi(),
    getPrograms(),
    getMitra(),
    getPublicStats(),
  ])

  const latestKegiatan = kegiatan.slice(0, 3)
  const latestBerita = berita.slice(0, 3)
  const latestFoto = dokumentasi.filter((d) => d.tipe === "foto").slice(0, 6)

  const statItems = [
    { label: "Kegiatan", value: stats.kegiatan, icon: CalendarDays },
    { label: "Berita", value: stats.berita, icon: Newspaper },
    { label: "Dokumentasi", value: stats.dokumentasi, icon: Images },
    { label: "Publikasi", value: stats.publikasi, icon: BookOpen },
    { label: "Dokumen", value: stats.dokumen, icon: FileText },
    { label: "Mitra", value: stats.mitra, icon: Building2 },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[620px] overflow-hidden bg-[#102a56]">
        <Image src="/hero-campus.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,29,65,.98)_0%,rgba(16,61,116,.9)_48%,rgba(9,122,145,.5)_100%)]" />
        <div className="absolute -right-32 top-16 h-80 w-80 rounded-full border border-cyan-200/20 bg-cyan-300/10 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-center gap-6 px-4 py-28 text-primary-foreground md:min-h-[620px] md:py-32">
          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,.9)]" />
            Universitas Muhammadiyah Semarang
          </div>
          <div className="max-w-3xl">
            <h1 className="max-w-3xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">{settings.site_name}</h1>
            <p className="mt-5 max-w-2xl text-pretty text-xl leading-relaxed text-primary-foreground/90">{settings.tagline}</p>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/70">{settings.about.slice(0, 220)}…</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="shadow-xl shadow-black/10">
              <Link href="/profil">Informasi Selengkapnya <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link href="/kegiatan">Lihat Kegiatan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-16 max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_24px_60px_-30px_rgba(16,42,86,.65)] backdrop-blur sm:grid-cols-3 lg:grid-cols-6">
          {statItems.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 rounded-xl px-2 py-4 text-center transition-colors hover:bg-secondary/70">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Profil singkat */}
      <section className="public-section mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Tentang Kami</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Profil Singkat</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{settings.about}</p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/profil">Selengkapnya <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="public-card">
              <CardContent className="p-5">
                <h3 className="font-semibold text-primary">Visi</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{settings.vision}</p>
              </CardContent>
            </Card>
            <Card className="public-card">
              <CardContent className="p-5">
                <h3 className="font-semibold text-primary">Misi</h3>
                <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
                  {settings.mission.split("\n").filter(Boolean).slice(0, 4).map((m, i) => (
                    <li key={i} className="flex gap-2"><span className="text-primary">•</span>{m}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program */}
      <section className="public-section section-wash">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Program</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Program Unggulan</h2>
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link href="/program">Semua Program <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p) => {
              const Icon = programIcons[p.icon] ?? FolderKanban
              return (
                <Card key={p.id} className="public-card transition-all hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div>
                    <h3 className="mt-4 font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Berita terbaru */}
      <section className="public-section mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Berita</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Berita Terbaru</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link href="/berita">Semua Berita <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {latestBerita.map((b) => (
            <Link key={b.id} href={`/berita/${b.slug}`} className="group">
              <Card className="public-card h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={b.cover || "/placeholder.svg"} alt={b.title} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground">{formatDate(b.tanggal)}</p>
                  <h3 className="mt-1 font-semibold leading-snug text-foreground group-hover:text-primary">{b.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{b.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Kegiatan terbaru */}
      <section className="public-section section-wash">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Kegiatan</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Kegiatan Terbaru</h2>
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link href="/kegiatan">Semua Kegiatan <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latestKegiatan.map((k) => (
              <Link key={k.id} href={`/kegiatan/${k.slug}`} className="group">
                <Card className="public-card h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={k.foto || "/placeholder.svg"} alt={k.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">{k.jenis}</span>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold leading-snug text-foreground group-hover:text-primary">{k.title}</h3>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(k.tanggal)}</p>
                      <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{k.lokasi}, {k.wilayah}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dokumentasi */}
      <section className="public-section mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Galeri</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Dokumentasi Kegiatan</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link href="/dokumentasi">Semua Dokumentasi <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {latestFoto.map((d) => (
            <div key={d.id} className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm ring-1 ring-white/80">
              <Image src={d.url || "/placeholder.svg"} alt={d.title} fill className="object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs font-medium text-white">{d.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mitra */}
      <section className="border-t border-primary/10 bg-white/55 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">Didukung oleh Mitra</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {mitra.map((m) => (
              <div key={m.id} className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{m.nama}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#102a56,#0d6387_65%,#0d8c91)] px-6 py-14 text-center text-primary-foreground shadow-2xl shadow-primary/20 md:py-20">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-cyan-200/20 bg-cyan-200/10 blur-2xl" />
          <h2 className="text-balance text-3xl font-bold">Ingin tahu lebih banyak tentang kegiatan kami?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/85">Jelajahi dokumentasi, dokumen, dan publikasi hasil kegiatan Pusat Studi UNIMUS.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary"><Link href="/publikasi">Lihat Publikasi</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"><Link href="/kontak">Hubungi Kami</Link></Button>
          </div>
        </div>
      </section>
    </>
  )
}
