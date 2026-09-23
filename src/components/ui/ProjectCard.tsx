import Image from "next/image"
import { isPendingCopy } from "@/lib/content"
import type { Project } from "@/data/projects"

type ProjectCardProps = {
  project: Project
  variant?: "featured" | "compact"
}

export function ProjectCard({
  project,
  variant = "compact",
}: ProjectCardProps) {
  const featured = variant === "featured"
  const showYear = !isPendingCopy(project.year)

  return (
    <article
      className={`archive-item ${
        featured ? "col-span-4 lg:col-span-12" : "col-span-4"
      }`}
    >
      <a
        href={project.url}
        rel="noreferrer"
        className="group block min-h-11 focus-visible:outline-offset-4"
      >
        <figure
          className={
            featured
              ? "grid gap-[var(--space-md)] lg:grid-cols-12 lg:gap-[var(--grid-gutter)]"
              : "flex flex-col gap-[var(--space-md)]"
          }
        >
          <div
            className={`relative overflow-hidden bg-surface ${
              featured
                ? "aspect-[16/9] min-h-[40vh] lg:col-span-8 lg:min-h-[52vh]"
                : "aspect-[4/3]"
            }`}
          >
            <div className="archive-media absolute inset-0 origin-center">
              <Image
                src={project.image}
                alt=""
                fill
                sizes={
                  featured
                    ? "(max-width: 1023px) 100vw, 66vw"
                    : "(max-width: 767px) 100vw, 33vw"
                }
                className="object-cover"
              />
            </div>
          </div>
          <figcaption
            className={`flex flex-col justify-end gap-[var(--space-sm)] ${
              featured ? "lg:col-span-4" : ""
            }`}
          >
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              {project.category}
              {showYear ? ` · ${project.year}` : ""}
            </p>
            <h3
              className={
                featured
                  ? "max-w-[18ch] text-[clamp(1.5rem,2vw+1rem,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]"
                  : "text-[1.125rem] font-semibold leading-snug tracking-[-0.02em]"
              }
            >
              {project.title}
            </h3>
            {featured ? (
              <p className="editorial-measure text-[1.0625rem] leading-[1.5] text-foreground">
                {project.description}
              </p>
            ) : null}
          </figcaption>
        </figure>
      </a>
    </article>
  )
}
