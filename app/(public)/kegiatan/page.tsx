import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/site/page-header"
import { FilterBar } from "@/components/site/filter-bar"
import { getPublishedKegiatan, getFilterOptions } from "@/lib/queries"
import { formatDate } from "@/lib/format"

export const metadata = { title: "Kegiatan — Pusat Studi UNIMUS" }

export default async function KegiatanPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  const [items, options] = await Promise.all([
    getPublishedKegiatan({
      q: sp.q,
      tahun: sp.tahun ? Number(sp.tahun) : undefined,
      jenis: sp.jenis,
      wilayah: sp.wilayah,
    }),
    getFilterOptions(),
  ])

  return (
    <>
      <PageHeader title="Kegiatan" description="Dokumentasi kegiatan yang telah dilaksanakan Pusat Studi UNIMUS" breadcrumb="Kegiatan" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <FilterBar
          selects={[
            { name: "tahun", label: "Tahun", options: options.tahun.map((t) => ({ value: String(t), label: String(t) })) },
            { name: "jenis", label: "Jenis Kegiatan", options: options.jenis.map((j) => ({ value: j, label: j })) },
            { name: "wilayah", label: "Wilayah", options: options.wilayah.map((w) => ({ value: w, label: w })) },
          ]}
        />

        <p className="mt-6 text-sm text-muted-foreground">{items.length} kegiatan ditemukan</p>

        {items.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">Tidak ada kegiatan yang sesuai.</p>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((k) => (
              <Link key={k.id} href={`/kegiatan/${k.slug}`} className="group">
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={k.foto || "/placeholder.svg"} alt={k.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">{k.jenis}</span>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold leading-snug text-foreground group-hover:text-primary">{k.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{k.deskripsi}</p>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(k.tanggal)}</p>
                      <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{k.lokasi}, {k.wilayah}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
