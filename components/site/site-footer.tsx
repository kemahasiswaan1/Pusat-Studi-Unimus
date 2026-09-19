import Link from "next/link"
import Image from "next/image"
import { MapPin, Mail, Phone } from "lucide-react"
import type { SiteSettings } from "@/lib/types"

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0b2042] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo-pusat-studi.png" alt={settings.site_name} width={48} height={48} className="h-12 w-12 rounded bg-white/90 object-contain p-1" />
            <div>
              <p className="font-bold">{settings.site_name}</p>
              <p className="text-sm text-white/60">{settings.tagline}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            {settings.about.slice(0, 180)}
            {settings.about.length > 180 ? "…" : ""}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cyan-300">Tautan</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-white/70">
            <li><Link href="/profil" className="hover:text-sidebar-primary">Profil</Link></li>
            <li><Link href="/program" className="hover:text-sidebar-primary">Program</Link></li>
            <li><Link href="/kegiatan" className="hover:text-sidebar-primary">Kegiatan</Link></li>
            <li><Link href="/berita" className="hover:text-sidebar-primary">Berita</Link></li>
            <li><Link href="/dokumentasi" className="hover:text-sidebar-primary">Dokumentasi</Link></li>
            <li><Link href="/dokumen" className="hover:text-sidebar-primary">Dokumen</Link></li>
            <li><Link href="/publikasi" className="hover:text-sidebar-primary">Publikasi</Link></li>
            <li><Link href="/kontak" className="hover:text-sidebar-primary">Kontak</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cyan-300">Kontak</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-cyan-300" /><span>{settings.address}</span></li>
            <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-cyan-300" /><span>{settings.email}</span></li>
            <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-cyan-300" /><span>{settings.phone}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-white/45">
          &copy; {new Date().getFullYear()} {settings.site_name} — Universitas Muhammadiyah Semarang. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  )
}
