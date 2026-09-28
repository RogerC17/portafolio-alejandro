"use client"

import Image from "next/image"
import { useEffect, useEffectEvent, useState } from "react"
import { ProjectShelf } from "@/components/home/ProjectShelf"
import {
  canalProjects,
  featuredProjects,
  projectSourceLabels,
  projectsLead,
  treceProjects,
  type Project,
} from "@/data/projects"
import { youtubeEmbedSrc } from "@/lib/youtube"

const TRECE_SHELF = treceProjects
const CANAL_SHELF = canalProjects
const FEATURED_SHELF =
  featuredProjects.length > 0 ? featuredProjects : treceProjects.slice(0, 4)

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M8.2 5.6v12.8L19 12 8.2 5.6Z" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5h.01" />
    </svg>
  )
}

export function ProjectTheater() {
  const initial = FEATURED_SHELF[0] ?? treceProjects[0]
  const [featured, setFeatured] = useState<Project | null>(initial ?? null)
  const [playing, setPlaying] = useState(false)

  const onSelectProject = useEffectEvent((project: Project) => {
    setFeatured(project)
    setPlaying(false)
  })

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && playing) {
        setPlaying(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [playing])

  if (!featured) return null

  const sourceLabel = projectSourceLabels[featured.source]

  return (
    <div className="project-theater">
      <section
        aria-labelledby="proyecto-billboard-titulo"
        className="project-theater-billboard"
        data-playing={playing ? "on" : "off"}
      >
        <div className="project-theater-stage">
          {playing ? (
            <iframe
              key={featured.id}
              className="project-theater-embed"
              src={youtubeEmbedSrc(featured.id, {
                autoplay: true,
                mute: false,
                controls: true,
                loop: false,
              })}
              title={featured.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <Image
              key={featured.id}
              src={featured.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="project-theater-poster object-cover"
            />
          )}
        </div>

        <div className="project-theater-veil" aria-hidden="true" />
        <div className="project-theater-veil-side" aria-hidden="true" />

        <div
          className="project-theater-copy"
          data-hidden={playing ? "on" : "off"}
          aria-hidden={playing ? true : undefined}
          inert={playing}
        >
          <p className="project-theater-kicker font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {sourceLabel}
            <span aria-hidden="true"> · </span>
            {featured.category}
          </p>
          <h1
            id="proyecto-billboard-titulo"
            className="project-theater-title font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
          >
            {featured.title}
          </h1>
          <p className="project-theater-lead editorial-measure text-foreground/90">
            {featured.description}
          </p>
          <div className="project-theater-actions">
            <button
              type="button"
              className="project-theater-btn project-theater-btn--play"
              onClick={() => setPlaying(true)}
              aria-pressed={playing}
            >
              <PlayIcon />
              <span>Reproducir</span>
            </button>
            <a
              href={featured.url}
              rel="noreferrer"
              target="_blank"
              className="project-theater-btn project-theater-btn--ghost"
            >
              <InfoIcon />
              <span>Ver en YouTube</span>
            </a>
          </div>
        </div>

        {playing ? (
          <button
            type="button"
            className="project-theater-close"
            onClick={() => setPlaying(false)}
          >
            Cerrar video
          </button>
        ) : null}
      </section>

      <div className="project-theater-rows">
        <header className="project-theater-rows-intro editorial-shell">
          <div className="col-span-4 md:col-span-8 lg:col-span-10">
            <h2 className="project-theater-rows-heading font-extrabold uppercase tracking-[-0.04em]">
              Proyectos
            </h2>
            <p className="mt-[var(--space-sm)] max-w-[42rem] text-[0.9375rem] leading-[1.45] text-muted md:text-[1.0625rem]">
              {projectsLead}
            </p>
          </div>
        </header>

        <div className="project-theater-shelves">
          <ProjectShelf
            title="Destacados"
            labelId="teatro-fila-destacados"
            projects={FEATURED_SHELF}
            selectedId={featured.id}
            onSelect={onSelectProject}
          />
          <ProjectShelf
            title="Especiales Enlace Trece"
            labelId="teatro-fila-trece"
            projects={TRECE_SHELF}
            selectedId={featured.id}
            onSelect={onSelectProject}
          />
          <ProjectShelf
            title="SoyAlejo4.0"
            labelId="teatro-fila-soyalejo"
            projects={CANAL_SHELF}
            selectedId={featured.id}
            onSelect={onSelectProject}
          />
        </div>
      </div>
    </div>
  )
}
