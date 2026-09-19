import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export const metadata = { title: "Admin — Pusat Studi UNIMUS" }

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect("/admin/login")

  return (
    <div className="flex min-h-screen flex-col bg-secondary/20 lg:flex-row">
      <AdminSidebar userName={user.name} />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
