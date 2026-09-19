"use server"

import { redirect } from "next/navigation"
import { verifyCredentials, createSession, destroySession } from "@/lib/auth"

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: "Email dan kata sandi wajib diisi." }
  }

  const user = await verifyCredentials(email, password)
  if (!user) {
    return { error: "Email atau kata sandi salah." }
  }

  await createSession(user.id)
  redirect("/admin")
}

export async function logoutAction() {
  await destroySession()
  redirect("/admin/login")
}
