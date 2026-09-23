import { TextLink } from "@/components/ui/Button"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionLabel } from "@/components/ui/SectionLabel"
import {
  featuredProjects,
  projectSourceLabels,
} from "@/data/projects"
import { archiveLabel, archiveOrdinal } from "@/lib/archive"

export function FeaturedProjects() {
  const [featured, ...rest] = featuredProjects

  if (!featured) return null

  const total = featuredProjects.length

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-heading"
      className="scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <div className="editorial-shell">
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <SectionLabel index="[03]" />
          <h2
            id="proyectos-heading"
            className="mt-[var(--space-sm)] text-[clamp(2rem,2.4vw+1rem,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
          >
            Proyectos
          </h2>
        </div>
        <div className="col-span-4 mt-[var(--space-md)] flex items-end md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-9">
          <TextLink href="/proyectos">Ver todos los proyectos</TextLink>
        </div>
      </div>

      <div className="editorial-shell mt-[var(--space-2xl)]">
        <div className="col-span-4 lg:col-span-12">
          <p className="mb-[var(--space-md)] font-mono text-[0.6875rem] uppercase tabular-nums tracking-[0.16em] text-muted">
            {archiveLabel("Pieza", 1)}
            <span aria-hidden="true"> · </span>
            {projectSourceLabels[featured.source]}
            <span aria-hidden="true"> / </span>
            {archiveOrdinal(total)}
          </p>
          <ProjectCard project={featured} variant="featured" />
        </div>
      </div>

      {rest.length > 0 ? (
        <div className="editorial-shell mt-[var(--space-2xl)]">
          <ol className="col-span-4 lg:col-span-12">
            {rest.map((project, index) => (
              <li
                key={project.id}
                className="border-t border-[var(--border)] last:border-b"
              >
                <a
                  href={project.url}
                  rel="noreferrer"
                  className="press-row group relative grid min-h-11 grid-cols-4 items-center gap-[var(--grid-gutter)] py-[var(--space-md)] focus-visible:outline-offset-4 md:grid-cols-8 lg:grid-cols-12"
                >
                  <span className="col-span-1 font-mono text-[0.6875rem] uppercase tabular-nums tracking-[0.16em] text-muted">
                    {archiveOrdinal(index + 2)}
                  </span>
                  <span className="col-span-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted md:col-span-2 lg:col-span-2">
                    {projectSourceLabels[project.source]}
                  </span>
                  <span className="col-span-4 text-[1.0625rem] font-medium leading-snug md:col-span-5 lg:col-span-8">
                    {project.title}
                  </span>
                  <span className="col-span-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted md:col-span-8 lg:col-span-1 lg:text-right">
                    {project.category}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  )
}
