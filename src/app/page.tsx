import { CareerTimeline } from "@/components/home/CareerTimeline"
import { ContactCTA } from "@/components/home/ContactCTA"
import { FeaturedProjects } from "@/components/home/FeaturedProjects"
import { FocusAreas } from "@/components/home/FocusAreas"
import { Hero } from "@/components/home/Hero"
import { Manifesto } from "@/components/home/Manifesto"
import { Press } from "@/components/home/Press"
import { Publications } from "@/components/home/Publications"

export default function Home() {
  return (
    <main id="contenido" className="flex-1">
      <Hero />
      <Manifesto />
      <Publications />
      <Press />
      <FeaturedProjects />
      <CareerTimeline />
      <FocusAreas />
      <ContactCTA />
    </main>
  )
}
