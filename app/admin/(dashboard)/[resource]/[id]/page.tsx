import { notFound } from "next/navigation"
import { getSettings, programsRepo, mitraRepo, kegiatanRepo, beritaRepo, dokumentasiRepo, dokumenRepo, publikasiRepo, usersRepo } from "@/lib/store"
import { EntityForm } from "@/components/admin/entity-form"
import { FormShell } from "@/components/admin/form-shell"
import { TextField, TextAreaField } from "@/components/admin/fields"
import { saveSettingsAction } from "../../actions"

const repos = { program: programsRepo, mitra: mitraRepo, kegiatan: kegiatanRepo, berita: beritaRepo, dokumentasi: dokumentasiRepo, dokumen: dokumenRepo, publikasi: publikasiRepo, pengguna: usersRepo }

type EntityResource = keyof typeof repos

export default async function AdminEditorPage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await params
  if (resource === "profil" || resource === "pengaturan") {
    const settings = await getSettings()
    return <div className="space-y-6"><h1 className="text-2xl font-bold">{resource === "profil" ? "Profil" : "Pengaturan"}</h1><FormShell action={saveSettingsAction} cancelHref="/admin"><TextField name="site_name" label="Nama situs" defaultValue={settings.site_name} /><TextField name="tagline" label="Tagline" defaultValue={settings.tagline} /><TextAreaField name="about" label="Profil singkat" defaultValue={settings.about} /><TextAreaField name="vision" label="Visi" defaultValue={settings.vision} /><TextAreaField name="mission" label="Misi" defaultValue={settings.mission} /><TextAreaField name="history" label="Sejarah" defaultValue={settings.history} /></FormShell></div>
  }
  const repo = repos[resource as EntityResource]
  if (!repo) notFound()
  const kegiatan = await kegiatanRepo.all()
  const item = id === "baru" ? undefined : await repo.find(Number(id))
  if (id !== "baru" && !item) notFound()
  return <div className="space-y-6"><h1 className="text-2xl font-bold">{id === "baru" ? `Tambah ${resource}` : `Edit ${resource}`}</h1><EntityForm resource={resource as Exclude<EntityResource, never>} item={item as Record<string, any> | undefined} kegiatan={kegiatan} /></div>
}
