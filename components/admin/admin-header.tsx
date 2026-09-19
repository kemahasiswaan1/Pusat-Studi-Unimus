import Link from "next/link"
import type { ReactNode } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminHeader({
  title,
  description,
  actionHref,
  actionLabel,
  children,
}: {
  title: string
  description?: string
  actionHref?: string
  actionLabel?: string
  children?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {actionHref && (
          <Button asChild>
            <Link href={actionHref}>
              <Plus className="mr-1 h-4 w-4" />
              {actionLabel ?? "Tambah"}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
