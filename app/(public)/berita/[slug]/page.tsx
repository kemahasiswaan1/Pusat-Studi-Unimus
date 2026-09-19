import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { CalendarDays, ArrowLeft, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBeritaBySlug } from "@/lib/queries"
import { kegiatanRepo } from "@/lib/store"
import { formatDate } from "@/lib/format"

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const b = await getBeritaBySlug(slug)
  if (!b) notFound()

  const kegiatan = b.kegiatan_id ? await kegiatanRepo.find(b.kegiatan_id) : null

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Button asChild variant="ghost" className="mb-6"><Link href="/berita"><ArrowLeft className="mr-1 h-4 w-4" />Kembali ke Berita</Link></Button>
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{formatDate(b.tanggal)}</p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground md:text-4xl">{b.title}</h1>
      <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl">
        <Image src={b.cover || "/placeholder.svg"} alt={b.title} fill priority className="object-cover" />
      </div>
      <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
        {b.content.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {kegiatan && kegiatan.status === "dipublikasikan" && (
        <div className="mt-10 rounded-xl border border-border bg-secondary/40 p-5">
          <p className="text-sm font-medium text-muted-foreground">Kegiatan terkait</p>
          <Link href={`/kegiatan/${kegiatan.slug}`} className="mt-1 inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline">
            <LinkIcon className="h-4 w-4" />{kegiatan.title}
          </Link>
        </div>
      )}
    </article>
  )
}
