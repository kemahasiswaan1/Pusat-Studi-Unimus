import { Badge } from "@/components/ui/badge"
import { STATUS_LABELS, type Status } from "@/lib/types"
import { cn } from "@/lib/utils"

const styles: Record<Status, string> = {
  draft: "bg-muted text-muted-foreground border-transparent",
  verifikasi: "bg-amber-100 text-amber-800 border-transparent",
  dipublikasikan: "bg-emerald-100 text-emerald-800 border-transparent",
  arsip: "bg-slate-200 text-slate-700 border-transparent",
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant="outline" className={cn("font-medium", styles[status])}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
