import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { getSettings } from "@/lib/store"

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings()
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader siteName={settings.site_name} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
    </div>
  )
}
