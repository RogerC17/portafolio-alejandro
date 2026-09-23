import { CareerArchive } from "@/components/trayectoria/CareerArchive"
import { CareerIntro } from "@/components/trayectoria/CareerIntro"
import {
  CareerCanalHonors,
  CareerSeminars,
} from "@/components/trayectoria/CareerNotes"
import { CareerRelated } from "@/components/trayectoria/CareerRelated"
import { careerLead } from "@/data/career"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata(
  "Trayectoria",
  "/trayectoria",
  careerLead,
)

export default function TrayectoriaPage() {
  return (
    <main id="contenido" className="flex-1">
      <CareerIntro />
      <CareerArchive
        seminars={<CareerSeminars />}
        honors={<CareerCanalHonors />}
      />
      <CareerRelated />
    </main>
  )
}
