"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const nav = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/program", label: "Program" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/berita", label: "Berita" },
  { href: "/dokumentasi", label: "Dokumentasi" },
  { href: "/dokumen", label: "Dokumen" },
  { href: "/publikasi", label: "Publikasi" },
  { href: "/kontak", label: "Kontak" },
]

export function SiteHeader({ siteName }: { siteName: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-[#102a56]/95 text-white shadow-lg shadow-[#102a56]/10 backdrop-blur supports-[backdrop-filter]:bg-[#102a56]/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-pusat-studi.png" alt={siteName} width={44} height={44} className="h-11 w-11 rounded-xl bg-white object-contain p-1" />
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-white sm:text-base">{siteName}</span>
            <span className="hidden text-xs text-white/60 sm:block">Universitas Muhammadiyah Semarang</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white",
                isActive(item.href) ? "bg-white/10 text-white" : "text-white/70",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/admin">Login Admin</Link>
          </Button>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#102a56] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  isActive(item.href) ? "bg-white/10 text-white" : "text-white/75",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" className="mt-2 w-full">
              <Link href="/admin">Login Admin</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
