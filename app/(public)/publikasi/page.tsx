import { BookOpen, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/site/page-header"
import { FilterBar } from "@/components/site/filter-bar"
import { getPublishedPublikasi, getFilterOptions } from "@/lib/queries"
import { PUBLIKASI_JENIS_LABELS } from "@/lib/types"

export const metadata = { title: "Publikasi — Pusat Studi UNIMUS" }

export default async function PublikasiPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  const [items, options] = await Promise.all([
    getPublishedPublikasi({ q: sp.q, tahun: sp.tahun ? Number(sp.tahun) : undefined, jenis: sp.jenis }),
    getFilterOptions(),
  ])

  return (
    <>
      <PageHeader title="Publikasi" description="Karya ilmiah, jurnal, prosiding, dan buku hasil kegiatan" breadcrumb="Publikasi" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <FilterBar
          selects={[
            { name: "jenis", label: "Jenis Publikasi", options: Object.entries(PUBLIKASI_JENIS_LABELS).map(([value, label]) => ({ value, label })) },
            { name: "tahun", label: "Tahun", options: options.tahun.map((t) => ({ value: String(t), label: String(t) })) },
          ]}
        />
        <p className="mt-6 text-sm text-muted-foreground">{items.length} publikasi ditemukan</p>
        <div className="mt-4 space-y-4">
          {items.map((p) => (
            <Card key={p.id} className="transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><BookOpen className="h-5 w-5" /></div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{PUBLIKASI_JENIS_LABELS[p.jenis]}</Badge>
                    <span className="text-xs text-muted-foreground">{p.tahun}</span>
                  </div>
                  <h3 className="mt-2 font-semibold leading-snug text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.authors}</p>
                  {p.abstract && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.abstract}</p>}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      <ExternalLink className="h-4 w-4" />Lihat Publikasi
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {items.length === 0 && <p className="mt-10 text-center text-muted-foreground">Tidak ada publikasi yang sesuai.</p>}
      </div>
    </>
  )
}
