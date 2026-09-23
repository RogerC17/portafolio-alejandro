export const SITE_URL = "https://alejandrolinares.co"

export const SITE_NAME = "Alejandro Linares"

export const SITE_TITLE =
  "Alejandro Linares | Gobernanza digital, tecnología y liderazgo"

export const SITE_DESCRIPTION =
  "Alejandro Linares es abogado y experto en gobernanza digital, tecnología y políticas públicas. Conoce su trayectoria, proyectos, publicaciones e ideas."

export const SITE_LOCATION = "Bogotá / Colombia"

export const SITE_STATEMENT = "Ideas para un futuro más humano y digital."

export const SITE_ARCHIVE_YEAR = "2026"

export const SITE_COLOPHON = `Archivo personal · ${SITE_LOCATION} · ${SITE_ARCHIVE_YEAR}`

export const SITE_ROLE = "Abogado · Gobernanza digital · Tecnología · Liderazgo"

export type NavItem = {
  href: string
  label: string
  index: string
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Alejandro", index: "01" },
  { href: "/trayectoria", label: "Trayectoria", index: "02" },
  { href: "/proyectos", label: "Proyectos", index: "03" },
  { href: "/ideas", label: "Ideas", index: "04" },
  { href: "/publicaciones", label: "Publicaciones", index: "05" },
  { href: "/prensa", label: "Prensa", index: "06" },
  { href: "/contacto", label: "Contacto", index: "07" },
]
