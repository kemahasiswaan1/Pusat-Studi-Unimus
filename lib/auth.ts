import "server-only"
import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "crypto"
import bcrypt from "bcryptjs"
import { isDbConfigured } from "./db"
import { usersRepo } from "./store"
import type { User } from "./types"

const COOKIE_NAME = "ps_session"
const SECRET = process.env.AUTH_SECRET || "pusat-studi-unimus-dev-secret-change-me"

function sign(value: string): string {
  const sig = createHmac("sha256", SECRET).update(value).digest("hex")
  return `${value}.${sig}`
}

function verify(signed: string): string | null {
  const idx = signed.lastIndexOf(".")
  if (idx < 0) return null
  const value = signed.slice(0, idx)
  const sig = signed.slice(idx + 1)
  const expected = createHmac("sha256", SECRET).update(value).digest("hex")
  try {
    if (sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return value
    }
  } catch {
    return null
  }
  return null
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const user = await usersRepo.findBy("email", email.trim().toLowerCase())
  if (!user) return null

  // In no-DB preview mode the seed stores plain fallback passwords.
  if (!isDbConfigured) {
    if (user.password_hash === password) return user
    // still allow real bcrypt hashes if present
    try {
      if (await bcrypt.compare(password, user.password_hash)) return user
    } catch {
      /* ignore */
    }
    return null
  }

  const ok = await bcrypt.compare(password, user.password_hash)
  return ok ? user : null
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function createSession(userId: number): Promise<void> {
  const store = await cookies()
  store.set(COOKIE_NAME, sign(String(userId)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function getCurrentUser(): Promise<User | null> {
  const store = await cookies()
  const raw = store.get(COOKIE_NAME)?.value
  if (!raw) return null
  const value = verify(raw)
  if (!value) return null
  const user = await usersRepo.find(Number(value))
  return user ?? null
}
