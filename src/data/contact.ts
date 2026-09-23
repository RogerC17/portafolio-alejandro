import { SITE_LOCATION } from "@/data/site"
import { socialLinks } from "@/data/social"

const linkedIn = socialLinks.find((link) => link.label === "LinkedIn")

export const contactLead = "Este archivo usa canales reales, no un formulario."

export const contactQuote =
  "Un mejor futuro es posible cuando las ideas se convierten en acciones."

export const contactTitle = "Conversemos sobre lo que viene."

export const contactCta = {
  label: "Trabajemos juntos",
  href:
    linkedIn?.href ??
    "https://www.linkedin.com/in/jhon-alejandro-linares-camberos-58a1a3245",
} as const

export const contactLocation = SITE_LOCATION

export const contactChannelNote = `${SITE_LOCATION} · Canales abiertos`

export interface ContactReel {
  id: string
  label: string
  src: string
  poster: string
}

export const contactReels: ContactReel[] = [
  {
    id: "seguridad",
    label: "Seguridad",
    src: "https://alejandrolinares.co/wp-content/uploads/2025/01/Alejandro-linares-Seguridad.mp4",
    poster: "/images/contact/seguridad.webp",
  },
  {
    id: "super",
    label: "Super",
    src: "https://alejandrolinares.co/wp-content/uploads/2025/01/Alejandro-linares-supersofinal.mp4",
    poster: "/images/contact/super.webp",
  },
  {
    id: "energia",
    label: "Energía",
    src: "https://alejandrolinares.co/wp-content/uploads/2025/01/Alejandro-linares-China.mp4",
    poster: "/images/contact/energia.webp",
  },
  {
    id: "nubes",
    label: "Nubes",
    src: "https://alejandrolinares.co/wp-content/uploads/2025/01/Alejandro-linares-nubes.mp4",
    poster: "/images/contact/nubes.webp",
  },
]
