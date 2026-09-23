import { ProjectArchive } from "@/components/proyectos/ProjectArchive"
import { ProjectsIntro } from "@/components/proyectos/ProjectsIntro"
import { projectsLead } from "@/data/projects"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata(
  "Proyectos",
  "/proyectos",
  projectsLead,
)

export default function ProyectosPage() {
  return (
    <main id="contenido" className="flex-1">
      <ProjectsIntro />
      <ProjectArchive />
    </main>
  )
}
