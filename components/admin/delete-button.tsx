"use client"

import { useState, useTransition } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DeleteButton({
  action,
  label = "Hapus item ini?",
}: {
  action: () => Promise<void>
  label?: string
}) {
  const [confirming, setConfirming] = useState(false)
  const [pending, startTransition] = useTransition()

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="destructive"
          disabled={pending}
          onClick={() => startTransition(async () => { await action() })}
        >
          {pending ? "..." : "Ya, hapus"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirming(false)} disabled={pending}>
          Batal
        </Button>
      </div>
    )
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="text-muted-foreground hover:text-destructive"
      onClick={() => setConfirming(true)}
      aria-label={label}
      title={label}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
