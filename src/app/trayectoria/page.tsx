import { CareerCinematic } from "@/components/trayectoria/CareerCinematic"
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
      <CareerCinematic />
    </main>
  )
}
