export const HERO_NAME_LINES = ["ALEJANDRO", "LINARES"] as const

export const HERO_LEAD =
  "Creo en el poder de la tecnología y las instituciones para generar oportunidades reales en la vida de las personas."

export const HERO_METADATA = [
  "BOGOTÁ / COLOMBIA",
  "GOBERNANZA DIGITAL",
  "POLÍTICAS PÚBLICAS",
  "TECNOLOGÍA",
] as const

export const HERO_ARCHIVE_MARK = ["ARCHIVO PERSONAL"] as const

export const HERO_REGISTER = [
  { key: "Eje", value: "Gobernanza digital" },
  { key: "Señal", value: "Especiales Enlace Trece", live: true },
  { key: "Tesis", value: "Camino a la gobernanza digital" },
  { key: "Tramo", value: "2008—2026" },
] as const

export const HERO_INDEX = [
  { index: "02", label: "Trayectoria", href: "#trayectoria" },
  { index: "03", label: "Proyectos", href: "/proyectos" },
  { index: "04", label: "Ideas", href: "/ideas" },
] as const

export const HERO_PRIMARY_CTA = {
  href: "#trayectoria",
  label: "Explorar trayectoria",
} as const

export const HERO_SECONDARY_CTA = {
  href: "/ideas",
  label: "Conocer mis ideas",
} as const

export const HERO_IMAGE = {
  src: "/images/alejandro/alejandro-linares.webp",
  alt: "Alejandro Linares",
  width: 1600,
  height: 2200,
} as const

export const HERO_MEDIA = {
  alt: "Alejandro Linares",
  src: "/images/alejandro/alejandro-hero-cutout.webp",
  width: 2266,
  height: 3200,
} as const

export const MANIFESTO_INDEX = "[01]"

export const MANIFESTO_QUOTE_LINES = [
  "La tecnología no transforma sociedades.",
  "Las personas que saben utilizarla, sí.",
] as const

export const MANIFESTO_AXES = [
  { label: "ESTADO", href: "#areas" },
  { label: "CIUDADANÍA", href: "#areas" },
  { label: "TECNOLOGÍA", href: "#eje-tecnologia" },
  { label: "LIDERAZGO", href: "#eje-liderazgo" },
  { label: "COMUNICACIÓN", href: "#eje-medios" },
  { label: "TRANSFORMACIÓN" },
] as const

export const MANIFESTO_SUPPORT =
  "Cuenta con una sólida formación académica que incluye un doctorando en Gobierno y una maestría en Políticas Públicas. Es director del programa de tecnología más visto en formatos digitales, Especiales Enlace Trece, ha entrevistado destacados expertos del universo tecnológico, acercando la tecnología a los ciudadanos."

export {
  contactCta as CONTACT_CTA,
  contactQuote as CONTACT_QUOTE,
  contactTitle as CONTACT_TITLE,
} from "@/data/contact"
