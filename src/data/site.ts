import { siteContent } from "@/content/load"

export const SITE_URL = "https://alejandrolinares.co"

export const SITE_NAME = siteContent.site.name

export const SITE_TITLE = siteContent.site.title

export const SITE_DESCRIPTION = siteContent.site.description

export const SITE_LOCATION = siteContent.site.location

export const SITE_STATEMENT = siteContent.site.statement

export const SITE_ARCHIVE_YEAR = "2026"

export const SITE_COLOPHON = `Archivo personal · ${SITE_LOCATION} · ${SITE_ARCHIVE_YEAR}`

export const SITE_ROLE = siteContent.site.role

export type NavItem = {
  href: string
  label: string
  index: string
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Alejandro", index: "01" },
  { href: "/trayectoria", label: "Trayectoria", index: "02" },
  { href: "/labor-social", label: "Labor social", index: "03" },
  { href: "/proyectos", label: "Proyectos", index: "04" },
  { href: "/publicaciones", label: "Publicaciones", index: "05" },
  { href: "/prensa", label: "Prensa", index: "06" },
  { href: "/contacto", label: "Contacto", index: "07" },
]
