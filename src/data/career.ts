import { siteContent } from "@/content/load"
export type CareerCategory = "Cargos" | "Formación" | "Reconocimientos"

/** Foto verificada de un hecho. No sustituye el texto de la ficha. */
export interface CareerPhoto {
  src: string
  alt: string
  /** Qué muestra la imagen, aparte del cargo o el premio. */
  caption: string
  width: number
  height: number
  /** Encuadre si la vista recorta (tarjetas de portada). */
  position?: string
}

export interface CareerEvent {
  id: string
  year: string
  period?: string
  title: string
  institution?: string
  description: string
  image?: string
  /** CSS object/background position for portrait framing */
  imagePosition?: string
  photo?: CareerPhoto
  category: CareerCategory
  ongoing?: boolean
  featured?: boolean
}

export interface CareerSeminar {
  title: string
  institution?: string
}

export const careerEvents: CareerEvent[] = siteContent.career as CareerEvent[]

export const careerSeminars: CareerSeminar[] = [
  {
    title: "Senior Management Program",
    institution:
      "Judge Business School, University of Cambridge. Strategy, Disruption, Organization and Digital Transformation.",
  },
  {
    title: "Medios Públicos en América Latina",
    institution: "Universidad de Buenos Aires (UBA), Argentina",
  },
  {
    title: "Derecho Administrativo Contemporáneo",
    institution: "Universidad de Salamanca, España",
  },
  {
    title: "Medios de Comunicación y Democracia",
    institution: "Bogotá",
  },
  {
    title: "Pedagogía de la Paz y Gestión del Postconflicto",
    institution: "Instituto de Altos Estudios Europeos (IAEE), Madrid, España",
  },
  {
    title: "Universidad y Televisión Étnica",
  },
  {
    title: "Derechos Fundamentales, Derechos Humanos y Biopolítica",
  },
  {
    title: "Sistema Penal Acusatorio e Investigación Criminal",
  },
  {
    title: "Gestión Pública y Gestión Presupuestal",
    institution: "E.S.A.P.",
  },
  {
    title: "Conciliación",
    institution: "Universidad Autónoma de Colombia",
  },
]

export const careerCanalHonors =
  "Bajo su liderazgo, Canal Trece ha obtenido más de cincuenta premios y reconocimientos nacionales e internacionales en innovación, televisión pública, transformación digital, inclusión social, educación y producción audiovisual."

export const homeCareerEvents = careerEvents.filter((event) => event.featured)

function eventEndYear(event: CareerEvent) {
  const end = event.period?.split("—")[1]
  return end ?? event.year
}

function yearSpan(events: CareerEvent[]) {
  const first = events[0]
  if (!first) return ""
  let latest = eventEndYear(first)
  for (const event of events) {
    const end = eventEndYear(event)
    if (end > latest) latest = end
  }
  return `${first.year}—${latest}`
}

export const homeCareerYearSpan = yearSpan(homeCareerEvents)

export const careerByCategory: Record<CareerCategory, CareerEvent[]> = {
  Cargos: careerEvents.filter((event) => event.category === "Cargos"),
  Formación: careerEvents.filter((event) => event.category === "Formación"),
  Reconocimientos: careerEvents.filter(
    (event) => event.category === "Reconocimientos",
  ),
}

export const careerYears = [...new Set(homeCareerEvents.map((event) => event.year))]

export const careerYearSpan = yearSpan(careerEvents)

export const careerLead = siteContent.careerLead

export const careerCategories: CareerCategory[] = [
  "Cargos",
  "Formación",
  "Reconocimientos",
]

export const careerRelated = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/publicaciones", label: "Publicaciones" },
] as const

export function careerPeriod(event: CareerEvent) {
  return event.period ?? event.year
}

export function careerPositionLabel(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
}
