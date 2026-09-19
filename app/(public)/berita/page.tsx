import Link from "next/link"
import Image from "next/image"
import { CalendarDays } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/site/page-header"
import { FilterBar } from "@/components/site/filter-bar"
import { getPublishedBerita, getFilterOptions } from "@/lib/queries"
import { formatDate } from "@/lib/format"

export const metadata = { title: "Berita — Pusat Studi UNIMUS" }

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  const [items, options] = await Promise.all([
    getPublishedBerita({ q: sp.q, tahun: sp.tahun ? Number(sp.tahun) : undefined }),
    getFilterOptions(),
  ])

  return (
    <>
      <PageHeader title="Berita" description="Kabar terbaru dari Pusat Studi UNIMUS" breadcrumb="Berita" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <FilterBar selects={[{ name: "tahun", label: "Tahun", options: options.tahun.map((t) => ({ value: String(t), label: String(t) })) }]} />
        <p className="mt-6 text-sm text-muted-foreground">{items.length} berita ditemukan</p>
        {items.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">Tidak ada berita yang sesuai.</p>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((b) => (
              <Link key={b.id} href={`/berita/${b.slug}`} className="group">
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={b.cover || "/placeholder.svg"} alt={b.title} fill className="object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <CardContent className="p-5">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{formatDate(b.tanggal)}</p>
                    <h3 className="mt-1 font-semibold leading-snug text-foreground group-hover:text-primary">{b.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{b.excerpt}</p>
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
