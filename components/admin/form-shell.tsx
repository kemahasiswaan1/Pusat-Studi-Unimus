"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type ActionFn = (prev: unknown, fd: FormData) => Promise<{ error?: string; ok?: boolean } | void>

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      <Save className="mr-1 h-4 w-4" />
      {pending ? "Menyimpan..." : label}
    </Button>
  )
}

export function FormShell({
  action,
  children,
  cancelHref,
  submitLabel = "Simpan",
  successMessage,
}: {
  action: ActionFn
  children: ReactNode
  cancelHref: string
  submitLabel?: string
  successMessage?: string
}) {
  const [state, formAction] = useActionState(action, null)
  return (
    <Card>
      <CardContent className="p-6">
        <form action={formAction} className="space-y-5">
          {children}
          {state?.error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
          )}
          {state?.ok && successMessage && (
            <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">{successMessage}</p>
          )}
          <div className="flex items-center gap-2 pt-2">
            <SubmitButton label={submitLabel} />
            <Button asChild variant="ghost">
              <Link href={cancelHref}>Batal</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
