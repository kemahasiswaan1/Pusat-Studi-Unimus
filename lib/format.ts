export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "-"
  const d = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200)
}
