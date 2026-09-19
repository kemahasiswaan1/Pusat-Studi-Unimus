import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  CalendarDays, MapPin, Users, Building2, Target, Award, FileText, Video, ArrowLeft, Download,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getKegiatanBySlug, getKegiatanTitle } from "@/lib/queries"
import { anggotaRepo, dokumentasiRepo, dokumenRepo, mitraRepo } from "@/lib/store"
import { formatDate } from "@/lib/format"

export default async function KegiatanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const k = await getKegiatanBySlug(slug)
  if (!k) notFound()

  const [anggota, allDok, allDocs, mitra] = await Promise.all([
    anggotaRepo.all(),
    dokumentasiRepo.all(),
    dokumenRepo.all(),
    k.mitra_id ? mitraRepo.find(k.mitra_id) : Promise.resolve(null),
  ])
  const anggotaKegiatan = anggota.filter((a) => a.kegiatan_id === k.id)
  const galeri = allDok.filter((d) => d.kegiatan_id === k.id && d.status === "dipublikasikan")
  const dokumen = allDocs.filter((d) => d.kegiatan_id === k.id && d.status === "dipublikasikan")

  const info = [
    { icon: CalendarDays, label: "Tanggal", value: formatDate(k.tanggal) },
    { icon: MapPin, label: "Lokasi / Wilayah", value: `${k.lokasi}, ${k.wilayah}` },
    { icon: Building2, label: "Mitra", value: mitra?.nama ?? "-" },
    { icon: Users, label: "Pelaksana", value: k.pelaksana },
    { icon: Users, label: "Peserta", value: k.peserta },
  ]

  const docLinks = [
    { label: "Proposal", url: k.proposal },
    { label: "Berita Acara", url: k.berita_acara },
    { label: "Laporan", url: k.laporan },
  ].filter((d) => d.url)

  return (
    <article>
      <div className="relative h-64 w-full md:h-96">
        <Image src={k.foto || "/placeholder.svg"} alt={k.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-8 text-white">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium">{k.jenis}</span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{k.title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <Button asChild variant="ghost" className="mb-6"><Link href="/kegiatan"><ArrowLeft className="mr-1 h-4 w-4" />Kembali ke Kegiatan</Link></Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="text-xl font-semibold text-foreground">Deskripsi</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{k.deskripsi}</p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground"><Target className="h-5 w-5 text-primary" />Tujuan</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{k.tujuan}</p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground"><Award className="h-5 w-5 text-primary" />Hasil Kegiatan</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{k.hasil}</p>
            </section>

            {anggotaKegiatan.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground">Anggota / Tim Pelaksana</h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {anggotaKegiatan.map((a) => (
                    <div key={a.id} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2">
                      <span className="font-medium text-foreground">{a.nama}</span>
                      <span className="text-xs text-muted-foreground">{a.peran}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {galeri.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground">Dokumentasi</h2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {galeri.map((d) =>
                    d.tipe === "video" ? (
                      <a key={d.id} href={d.url} target="_blank" rel="noreferrer" className="group relative flex aspect-video items-center justify-center rounded-lg bg-secondary">
                        <Video className="h-8 w-8 text-primary" />
                        <span className="absolute bottom-2 left-2 text-xs font-medium">{d.title}</span>
                      </a>
                    ) : (
                      <div key={d.id} className="relative aspect-square overflow-hidden rounded-lg">
                        <Image src={d.url || "/placeholder.svg"} alt={d.title} fill className="object-cover" />
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground">Informasi Kegiatan</h3>
                <dl className="mt-4 space-y-3">
                  {info.map((i) => (
                    <div key={i.label} className="flex gap-3">
                      <i.icon className="h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <dt className="text-xs text-muted-foreground">{i.label}</dt>
                        <dd className="text-sm font-medium text-foreground">{i.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>

            {(docLinks.length > 0 || dokumen.length > 0) && (
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground">Dokumen Terkait</h3>
                  <div className="mt-4 space-y-2">
                    {docLinks.map((d) => (
                      <a key={d.label} href={d.url!} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary">
                        <FileText className="h-4 w-4 text-primary" /><span className="flex-1">{d.label}</span><Download className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                    {dokumen.map((d) => (
                      <a key={d.id} href={d.file_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary">
                        <FileText className="h-4 w-4 text-primary" /><span className="flex-1">{d.title}</span><Download className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </article>
  )
}
