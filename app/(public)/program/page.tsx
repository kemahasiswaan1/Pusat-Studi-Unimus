import { FlaskConical, Users, BookOpen, GraduationCap, FolderKanban } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/site/page-header"
import { getPrograms } from "@/lib/queries"

export const metadata = { title: "Program — Pusat Studi UNIMUS" }

const icons: Record<string, any> = { flask: FlaskConical, users: Users, book: BookOpen, graduation: GraduationCap }

export default async function ProgramPage() {
  const programs = await getPrograms()
  return (
    <>
      <PageHeader title="Program" description="Program kerja dan bidang fokus Pusat Studi UNIMUS" breadcrumb="Program" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((p) => {
            const Icon = icons[p.icon] ?? FolderKanban
            return (
              <Card key={p.id} className="transition-shadow hover:shadow-md">
                <CardContent className="flex gap-5 p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-7 w-7" /></div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}
