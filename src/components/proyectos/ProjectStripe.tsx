import Image from "next/image"
import { isPendingCopy } from "@/lib/content"
import {
  projectLinkLabel,
  projectPositionLabel,
  projectSourceLabels,
  type Project,
} from "@/data/projects"

type ProjectStripeProps = {
  project: Project
  index: number
  total: number
  priority?: boolean
  onPrevious: () => void
  onNext: () => void
}

export function ProjectStripe({
  project,
  index,
  total,
  priority = false,
  onPrevious,
  onNext,
}: ProjectStripeProps) {
  const sourceLabel = projectSourceLabels[project.source]
  const yearLabel = isPendingCopy(project.year) ? null : project.year
  const linkLabel = projectLinkLabel(project.url)
  const position = projectPositionLabel(index, total)
  const atStart = index <= 0
  const atEnd = index >= total - 1

  return (
    <article
      id="proyecto-actual"
      aria-labelledby="proyecto-actual-titulo"
      className="scroll-mt-[var(--header-offset)] border-y border-[var(--border)]"
    >
      <div className="archive-item group relative grid lg:grid-cols-12">
        <div className="relative h-[40vh] overflow-hidden bg-surface lg:col-span-6 lg:h-auto lg:min-h-[56vh]">
          <div className="archive-media absolute inset-0 origin-center">
            <Image
              key={project.id}
              src={project.image}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-end gap-[var(--space-md)] px-[var(--page-gutter)] py-[var(--space-xl)] lg:col-span-6 lg:min-h-[56vh]">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {project.category}
            <span aria-hidden="true"> · </span>
            {sourceLabel}
            {yearLabel ? (
              <>
                <span aria-hidden="true"> · </span>
                {yearLabel}
              </>
            ) : null}
          </p>
          <h2
            id="proyecto-actual-titulo"
            className="max-w-[22ch] text-[clamp(1.75rem,2.4vw+1rem,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
          >
            {project.title}
          </h2>
          <p className="editorial-measure text-[1.0625rem] leading-[1.5] text-foreground">
            {project.description}
          </p>
          <a
            href={project.url}
            rel="noreferrer"
            className="group/cta relative inline-flex min-h-11 w-fit items-center gap-2 py-2 text-[0.9375rem] font-medium text-foreground"
          >
            {linkLabel}
            <span aria-hidden="true" className="text-foreground">
              →
            </span>
            <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover/cta:scale-x-100 group-hover:scale-x-100" />
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <button
              type="button"
              aria-label="Especial anterior"
              aria-controls="proyecto-actual"
              disabled={atStart}
              onClick={onPrevious}
              className="group/prev relative min-h-11 py-2 text-[0.9375rem] font-medium text-foreground disabled:text-muted"
            >
              Anterior
              <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover/prev:scale-x-100 group-disabled/prev:hidden" />
            </button>
            <p
              className="font-mono text-[0.75rem] tabular-nums uppercase tracking-[0.16em] text-muted"
              aria-hidden="true"
            >
              {position}
            </p>
            <button
              type="button"
              aria-label="Especial siguiente"
              aria-controls="proyecto-actual"
              disabled={atEnd}
              onClick={onNext}
              className="group/next relative min-h-11 py-2 text-[0.9375rem] font-medium text-foreground disabled:text-muted"
            >
              Siguiente
              <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover/next:scale-x-100 group-disabled/next:hidden" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
