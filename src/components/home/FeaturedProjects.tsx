import { TextLink } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { ProjectShelf } from "@/components/home/ProjectShelf"
import {
  canalProjects,
  featuredProjects,
  treceProjects,
} from "@/data/projects"

const TRECE_SHELF = treceProjects.slice(0, 12)
const CANAL_SHELF = canalProjects.slice(0, 12)

export function FeaturedProjects() {
  if (featuredProjects.length === 0) return null

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-heading"
      className="project-rail scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <ScrollReveal className="editorial-shell" distance={52}>
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <h2
            id="proyectos-heading"
            className="home-section-display"
          >
            Proyectos
          </h2>
        </div>
        <div className="col-span-4 mt-[var(--space-md)] flex items-end md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-9">
          <TextLink href="/proyectos">Ver todos los proyectos</TextLink>
        </div>
      </ScrollReveal>

      <div className="project-rail-rows mt-[var(--space-2xl)]">
        <ProjectShelf
          title="Destacados"
          labelId="proyectos-fila-destacados"
          projects={featuredProjects}
        />
        <ProjectShelf
          title="Especiales Enlace Trece"
          labelId="proyectos-fila-trece"
          projects={TRECE_SHELF}
        />
        <ProjectShelf
          title="SoyAlejo4.0"
          labelId="proyectos-fila-soyalejo"
          projects={CANAL_SHELF}
        />
      </div>
    </section>
  )
}
