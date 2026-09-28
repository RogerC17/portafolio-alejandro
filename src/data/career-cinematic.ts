import type { CareerCategory } from "@/data/career"
import { contactReels } from "@/data/contact"

function reel(id: (typeof contactReels)[number]["id"]) {
  const match = contactReels.find((entry) => entry.id === id)
  if (!match) {
    throw new Error(`Missing contact reel: ${id}`)
  }
  return match
}

export type CinematicChapter = {
  id: string
  category: CareerCategory
  title: string
  lead: string
  video: {
    src: string
    poster: string
    label: string
  }
}

/** Capítulos cinemáticos: técnica tipo Rockstar, identidad Archivo Vivo. */
export const cinematicHero = {
  video: reel("nubes"),
  title: "Trayectoria",
  kicker: "2003—2026",
  lead:
    "Tres actos. El archivo se despliega con el scroll: cargos, formación y reconocimientos.",
}

export const cinematicChapters: CinematicChapter[] = [
  {
    id: "cargos",
    category: "Cargos",
    title: "Cargos",
    lead: "Responsabilidades públicas, dirección y liderazgo institucional.",
    video: reel("super"),
  },
  {
    id: "formacion",
    category: "Formación",
    title: "Formación",
    lead: "Derecho, políticas públicas y gobierno digital.",
    video: reel("seguridad"),
  },
  {
    id: "reconocimientos",
    category: "Reconocimientos",
    title: "Reconocimientos",
    lead: "Premios y galardones a la gestión, los medios y el liderazgo.",
    video: reel("energia"),
  },
]
