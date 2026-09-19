"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LogOut, ExternalLink, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { adminNav } from "./admin-nav"
import { logoutAction } from "@/app/admin/auth-actions"

export function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <Image src="/logo-pusat-studi.png" alt="" width={28} height={28} className="rounded" />
          <span className="font-semibold">Admin</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Image src="/logo-pusat-studi.png" alt="Logo" width={36} height={36} className="rounded-lg" />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">Pusat Studi</p>
            <p className="text-xs text-muted-foreground">Dashboard Admin</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {adminNav.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-3">
          <Link href="/" target="_blank" className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
            <ExternalLink className="h-4 w-4" />Lihat Website
          </Link>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-secondary px-3 py-2">
            <span className="truncate text-sm font-medium text-foreground">{userName}</span>
            <form action={logoutAction}>
              <button type="submit" className="text-muted-foreground hover:text-destructive" aria-label="Keluar">
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} aria-hidden />}
    </>
  )
}
