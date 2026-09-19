import { FileText, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/site/page-header"
import { FilterBar } from "@/components/site/filter-bar"
import { getPublishedDokumen, getFilterOptions } from "@/lib/queries"
import { DOKUMEN_JENIS_LABELS } from "@/lib/types"

export const metadata = { title: "Dokumen — Pusat Studi UNIMUS" }

export default async function DokumenPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  const [items, options] = await Promise.all([
    getPublishedDokumen({ q: sp.q, tahun: sp.tahun ? Number(sp.tahun) : undefined, jenis: sp.jenis }),
    getFilterOptions(),
  ])

  return (
    <>
      <PageHeader title="Dokumen" description="Arsip dokumen: proposal, laporan, berita acara, dan lainnya" breadcrumb="Dokumen" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <FilterBar
          selects={[
            { name: "jenis", label: "Jenis Dokumen", options: Object.entries(DOKUMEN_JENIS_LABELS).map(([value, label]) => ({ value, label })) },
            { name: "tahun", label: "Tahun", options: options.tahun.map((t) => ({ value: String(t), label: String(t) })) },
          ]}
        />
        <p className="mt-6 text-sm text-muted-foreground">{items.length} dokumen ditemukan</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((d) => (
            <Card key={d.id} className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-primary">{DOKUMEN_JENIS_LABELS[d.jenis]} · {d.tahun}</span>
                  <h3 className="mt-1 font-semibold leading-snug text-foreground">{d.title}</h3>
                  <a href={d.file_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    <Download className="h-4 w-4" />Unduh
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {items.length === 0 && <p className="mt-10 text-center text-muted-foreground">Tidak ada dokumen yang sesuai.</p>}
      </div>
    </>
  )
}
