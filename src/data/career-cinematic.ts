import type { CareerCategory } from "@/data/career"
import { heroFrame, type CareerFrame } from "@/data/career-frames"

export type CinematicChapter = {
  id: string
  category: CareerCategory
  title: string
  lead: string
  /** Columna de texto: start = izquierda, end = derecha. La foto ocupa el lado libre. */
  side: "start" | "end"
}

export const cinematicHero: {
  frame: CareerFrame
  title: string
  kicker: string
  lead: string
} = {
  frame: heroFrame,
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
    side: "start",
  },
  {
    id: "formacion",
    category: "Formación",
    title: "Formación",
    lead: "Derecho, políticas públicas y gobierno digital.",
    side: "end",
  },
  {
    id: "reconocimientos",
    category: "Reconocimientos",
    title: "Reconocimientos",
    lead: "Premios y galardones a la gestión, los medios y el liderazgo.",
    side: "start",
  },
]
