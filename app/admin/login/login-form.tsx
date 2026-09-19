"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { LogIn } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { loginAction } from "../auth-actions"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      <LogIn className="mr-1 h-4 w-4" />
      {pending ? "Memproses..." : "Masuk"}
    </Button>
  )
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null)
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="admin@unimus.ac.id" required autoComplete="email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required autoComplete="current-password" />
          </div>
          {state?.error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
          )}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
