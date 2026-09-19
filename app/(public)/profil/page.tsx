import { Target, Compass, History, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/site/page-header"
import { getSettings, getMitra } from "@/lib/queries"

export const metadata = { title: "Profil — Pusat Studi UNIMUS" }

export default async function ProfilPage() {
  const [settings, mitra] = await Promise.all([getSettings(), getMitra()])
  const misiItems = settings.mission.split("\n").filter(Boolean)

  return (
    <>
      <PageHeader title="Profil" description="Mengenal lebih dekat Pusat Studi UNIMUS" breadcrumb="Profil" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <section className="prose-none max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">Tentang Kami</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{settings.about}</p>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3"><Compass className="h-6 w-6 text-primary" /><h3 className="text-lg font-semibold">Visi</h3></div>
              <p className="mt-3 leading-relaxed text-muted-foreground">{settings.vision}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3"><Target className="h-6 w-6 text-primary" /><h3 className="text-lg font-semibold">Misi</h3></div>
              <ul className="mt-3 space-y-2 leading-relaxed text-muted-foreground">
                {misiItems.map((m, i) => (
                  <li key={i} className="flex gap-2"><span className="mt-1 text-primary">•</span>{m}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <section className="mt-10">
          <div className="flex items-center gap-3"><History className="h-6 w-6 text-primary" /><h3 className="text-xl font-semibold">Sejarah</h3></div>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{settings.history}</p>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3"><Building2 className="h-6 w-6 text-primary" /><h3 className="text-xl font-semibold">Mitra Kerja Sama</h3></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mitra.map((m) => (
              <Card key={m.id}>
                <CardContent className="flex flex-col gap-1 p-5">
                  <span className="text-xs font-medium uppercase tracking-wide text-primary">{m.kategori}</span>
                  <span className="font-semibold text-foreground">{m.nama}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
