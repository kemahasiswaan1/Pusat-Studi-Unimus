import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function PageHeader({
  title,
  description,
  breadcrumb,
}: {
  title: string
  description?: string
  breadcrumb?: string
}) {
  return (
    <div className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          {breadcrumb && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{breadcrumb}</span>
            </>
          )}
        </nav>
        <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
