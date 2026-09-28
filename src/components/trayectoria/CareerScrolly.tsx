import { CareerChapterNav } from "@/components/trayectoria/CareerChapterNav"
import { CareerPrologue } from "@/components/trayectoria/CareerPrologue"
import {
  CareerCanalHonors,
  CareerSeminars,
} from "@/components/trayectoria/CareerNotes"
import { CareerRelated } from "@/components/trayectoria/CareerRelated"
import { CareerScrollyChapter } from "@/components/trayectoria/CareerScrollyChapter"
import { careerByCategory } from "@/data/career"
import { HERO_IMAGE } from "@/data/home"

const CARGOS_FALLBACK = {
  src: HERO_IMAGE.src,
  position: "center 12%",
  alt: HERO_IMAGE.alt,
}

const FORMACION_FALLBACK = {
  src: "/images/career/2022-maestria.webp",
  position: "center 24%",
  alt: "Maestría en Gobierno y Políticas Públicas",
}

const RECONOCIMIENTOS_FALLBACK = {
  src: "/images/career/2022-trece.webp",
  position: "center 24%",
  alt: "Canal Trece Colombia",
}

export function CareerScrolly() {
  return (
    <>
      <CareerPrologue />
      <CareerChapterNav />
      <CareerScrollyChapter
        id="cargos"
        category="Cargos"
        events={careerByCategory.Cargos}
        fallbackVisual={CARGOS_FALLBACK}
        variant="media"
        lead="Responsabilidades públicas, dirección y liderazgo institucional."
      />
      <CareerScrollyChapter
        id="formacion"
        category="Formación"
        events={careerByCategory.Formación}
        fallbackVisual={FORMACION_FALLBACK}
        variant="type"
        lead="Derecho, políticas públicas y gobierno digital."
        coda={<CareerSeminars />}
      />
      <CareerScrollyChapter
        id="reconocimientos"
        category="Reconocimientos"
        events={careerByCategory.Reconocimientos}
        fallbackVisual={RECONOCIMIENTOS_FALLBACK}
        variant="marks"
        lead="Premios y galardones a la gestión, los medios y el liderazgo."
        coda={<CareerCanalHonors />}
      />
      <CareerRelated />
    </>
  )
}
