import { CareerChapterNav } from "@/components/trayectoria/CareerChapterNav"
import { CareerCineChapter } from "@/components/trayectoria/CareerCineChapter"
import { CareerCineHero } from "@/components/trayectoria/CareerScrollVideo"
import {
  CareerCanalHonors,
  CareerSeminars,
} from "@/components/trayectoria/CareerNotes"
import { CareerRelated } from "@/components/trayectoria/CareerRelated"
import {
  cinematicChapters,
  cinematicHero,
} from "@/data/career-cinematic"
import { careerByCategory } from "@/data/career"

export function CareerCinematic() {
  return (
    <div className="career-cine">
      <CareerCineHero
        src={cinematicHero.video.src}
        poster={cinematicHero.video.poster}
        label={cinematicHero.video.label}
        title={cinematicHero.title}
        years={cinematicHero.kicker}
        lead={cinematicHero.lead}
      />
      <CareerChapterNav />
      {cinematicChapters.map((chapter) => (
        <CareerCineChapter
          key={chapter.id}
          chapter={chapter}
          events={careerByCategory[chapter.category]}
          coda={
            chapter.category === "Formación" ? (
              <CareerSeminars />
            ) : chapter.category === "Reconocimientos" ? (
              <CareerCanalHonors />
            ) : undefined
          }
        />
      ))}
      <CareerRelated />
    </div>
  )
}
