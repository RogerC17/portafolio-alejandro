import { ProjectTheater } from "@/components/proyectos/ProjectTheater"
import { projectsLead } from "@/data/projects"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata(
  "Proyectos",
  "/proyectos",
  projectsLead,
)

export default function ProyectosPage() {
  return (
    <main id="contenido" className="project-theater-page flex-1">
      <ProjectTheater />
    </main>
  )
}
