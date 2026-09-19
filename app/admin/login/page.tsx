import Image from "next/image"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { LoginForm } from "./login-form"

export const metadata = { title: "Login Admin — Pusat Studi UNIMUS" }

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) redirect("/admin")

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo-pusat-studi.png" alt="Logo Pusat Studi UNIMUS" width={64} height={64} className="rounded-xl" />
          <h1 className="mt-4 text-xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pusat Studi UNIMUS</p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo: admin@unimus.ac.id / admin123
        </p>
      </div>
    </div>
  )
}
