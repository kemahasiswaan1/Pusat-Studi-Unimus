import Image from "next/image"
import { Video, PlayCircle } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { FilterBar } from "@/components/site/filter-bar"
import { getPublishedDokumentasi, getFilterOptions } from "@/lib/queries"

export const metadata = { title: "Dokumentasi — Pusat Studi UNIMUS" }

export default async function DokumentasiPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  const [items, options] = await Promise.all([
    getPublishedDokumentasi({ tahun: sp.tahun ? Number(sp.tahun) : undefined, tipe: sp.tipe }),
    getFilterOptions(),
  ])

  return (
    <>
      <PageHeader title="Dokumentasi" description="Galeri foto dan video kegiatan Pusat Studi UNIMUS" breadcrumb="Dokumentasi" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <FilterBar
          searchable={false}
          selects={[
            { name: "tipe", label: "Jenis", options: [{ value: "foto", label: "Foto" }, { value: "video", label: "Video" }] },
            { name: "tahun", label: "Tahun", options: options.tahun.map((t) => ({ value: String(t), label: String(t) })) },
          ]}
        />
        <p className="mt-6 text-sm text-muted-foreground">{items.length} dokumentasi ditemukan</p>
        {items.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">Belum ada dokumentasi.</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((d) =>
              d.tipe === "video" ? (
                <a key={d.id} href={d.url} target="_blank" rel="noreferrer" className="group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-secondary transition-colors hover:bg-secondary/70">
                  <PlayCircle className="h-10 w-10 text-primary" />
                  <span className="px-3 text-center text-sm font-medium text-foreground">{d.title}</span>
                  <span className="absolute right-2 top-2 rounded-full bg-primary/10 p-1 text-primary"><Video className="h-4 w-4" /></span>
                </a>
              ) : (
                <div key={d.id} className="group relative aspect-square overflow-hidden rounded-xl">
                  <Image src={d.url || "/placeholder.svg"} alt={d.title} fill className="object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-sm font-medium text-white">{d.title}</span>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </>
  )
}
