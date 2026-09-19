import {
  LayoutDashboard, Info, FolderKanban, CalendarDays, Newspaper, Images,
  FileText, BookOpen, Building2, Users, Settings,
} from "lucide-react"

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profil", label: "Profil", icon: Info },
  { href: "/admin/program", label: "Program", icon: FolderKanban },
  { href: "/admin/kegiatan", label: "Kegiatan", icon: CalendarDays },
  { href: "/admin/berita", label: "Berita", icon: Newspaper },
  { href: "/admin/dokumentasi", label: "Dokumentasi", icon: Images },
  { href: "/admin/dokumen", label: "Dokumen", icon: FileText },
  { href: "/admin/publikasi", label: "Publikasi", icon: BookOpen },
  { href: "/admin/mitra", label: "Mitra", icon: Building2 },
  { href: "/admin/pengguna", label: "Pengguna", icon: Users },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: Settings },
] as const
