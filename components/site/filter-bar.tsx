"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface FilterSelect {
  name: string
  label: string
  options: { value: string; label: string }[]
}

export function FilterBar({
  searchable = true,
  selects = [],
}: {
  searchable?: boolean
  selects?: FilterSelect[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  function update(name: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(name, value)
    else next.delete(name)
    router.push(`${pathname}?${next.toString()}`)
  }

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    update("q", String(form.get("q") || ""))
  }

  const hasFilters = Array.from(params.keys()).length > 0

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:flex-wrap sm:items-end">
      {searchable && (
        <form onSubmit={onSearch} className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="q" defaultValue={params.get("q") ?? ""} placeholder="Cari kata kunci..." className="pl-9" />
        </form>
      )}
      {selects.map((s) => (
        <div key={s.name} className="min-w-[150px]">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">{s.label}</label>
          <select
            value={params.get(s.name) ?? ""}
            onChange={(e) => update(s.name, e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Semua</option>
            {s.options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      ))}
      {hasFilters && (
        <Button variant="ghost" onClick={() => router.push(pathname)}>Reset</Button>
      )}
    </div>
  )
}
