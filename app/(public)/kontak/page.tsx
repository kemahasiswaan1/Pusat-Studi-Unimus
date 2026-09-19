import { MapPin, Mail, Phone, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/site/page-header"
import { getSettings } from "@/lib/queries"

export const metadata = { title: "Kontak — Pusat Studi UNIMUS" }

export default async function KontakPage() {
  const settings = await getSettings()
  const items = [
    { icon: MapPin, label: "Alamat", value: settings.address },
    { icon: Mail, label: "Email", value: settings.email },
    { icon: Phone, label: "Telepon", value: settings.phone },
  ]
  return (
    <>
      <PageHeader title="Kontak" description="Hubungi Pusat Studi UNIMUS" breadcrumb="Kontak" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {items.map((i) => (
              <Card key={i.label}>
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><i.icon className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">{i.label}</p>
                    <p className="font-medium text-foreground">{i.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground">Kirim Pesan</h2>
              <form className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="nama">Nama</Label>
                    <Input id="nama" name="nama" placeholder="Nama lengkap" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="email@contoh.com" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subjek">Subjek</Label>
                  <Input id="subjek" name="subjek" placeholder="Subjek pesan" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pesan">Pesan</Label>
                  <Textarea id="pesan" name="pesan" rows={5} placeholder="Tulis pesan Anda..." required />
                </div>
                <Button type="submit" className="w-full"><Send className="mr-1 h-4 w-4" />Kirim Pesan</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
