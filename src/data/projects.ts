import { siteContent } from "@/content/load"
export type ProjectSource = "enlace-trece" | "soyalejo"

export interface Project {
  id: string
  source: ProjectSource
  category: string
  title: string
  description: string
  image: string
  year: string
  url: string
  featured?: boolean
}

export const PROJECTS_FILTER_ALL = "todos"

export const projectSourceLabels: Record<ProjectSource, string> = {
  "enlace-trece": "Enlace Trece",
  soyalejo: "SoyAlejo4.0",
}

export const projectsLead = siteContent.projectsLead

export function youtubeThumb(videoId: string) {
  // maxresdefault is 1280×720 when available; hqdefault is only 480×360.
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
}

export const projects: Project[] = siteContent.projects as Project[]

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 4)

export const treceProjects = projects.filter(
  (project) => project.source === "enlace-trece",
)

export const canalProjects = projects.filter(
  (project) => project.source === "soyalejo",
)

export function projectPositionLabel(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
}

const CATEGORY_ORDER = [
  "Ciberseguridad",
  "Inteligencia artificial",
  "Transformación digital",
  "Ciudadanía digital",
  "Democracia",
  "Empleabilidad / sostenibilidad",
  "Medios",
  "Tecnología",
]

export const projectCategories = CATEGORY_ORDER.filter((category) =>
  projects.some((project) => project.category === category),
)

export function projectMatchesFilter(project: Project, selected: string) {
  if (selected === PROJECTS_FILTER_ALL) {
    return true
  }

  if (selected === project.source) {
    return true
  }

  return projectCategoryId(project.category) === selected
}

export function projectCategoryId(category: string) {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function projectLinkLabel(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "Ver en YouTube"
  }

  return "Ver proyecto"
}
