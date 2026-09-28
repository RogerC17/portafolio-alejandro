"use client"

import { useEffect, useRef, useState } from "react"
import type { Project } from "@/data/projects"
import { ProjectPreviewCard } from "@/components/home/ProjectPreviewCard"

export const PROJECT_SHELF_CLOSE_PREVIEWS = "project-shelf:close-previews"

type ProjectShelfProps = {
  title: string
  projects: Project[]
  labelId: string
  selectedId?: string
  onSelect?: (project: Project) => void
}

function ShelfChevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      className="project-shelf-nav-icon"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "prev" ? (
        <path d="M14.5 5.5 8 12l6.5 6.5" />
      ) : (
        <path d="M9.5 5.5 16 12l-6.5 6.5" />
      )}
    </svg>
  )
}

export function ProjectShelf({
  title,
  projects,
  labelId,
  selectedId,
  onSelect,
}: ProjectShelfProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(projects.length > 4)

  function syncScrollState() {
    const track = trackRef.current
    if (!track) return
    const max = Math.max(0, track.scrollWidth - track.clientWidth)
    setCanPrev(track.scrollLeft > 4)
    setCanNext(max > 4 && track.scrollLeft < max - 4)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    syncScrollState()
    const frame = window.requestAnimationFrame(syncScrollState)
    const timeout = window.setTimeout(syncScrollState, 200)

    track.addEventListener("scroll", syncScrollState, { passive: true })
    const observer = new ResizeObserver(syncScrollState)
    observer.observe(track)

    const images = track.querySelectorAll("img")
    images.forEach((image) => {
      image.addEventListener("load", syncScrollState)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      track.removeEventListener("scroll", syncScrollState)
      observer.disconnect()
      images.forEach((image) => {
        image.removeEventListener("load", syncScrollState)
      })
    }
  }, [projects])

  function closePreviews() {
    window.dispatchEvent(new Event(PROJECT_SHELF_CLOSE_PREVIEWS))
  }

  function scrollByPage(direction: -1 | 1) {
    const track = trackRef.current
    if (!track) return
    closePreviews()
    const amount = Math.max(track.clientWidth * 0.82, 260)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    track.scrollBy({
      left: amount * direction,
      behavior: reduce ? "auto" : "smooth",
    })
  }

  if (projects.length === 0) return null

  return (
    <div className="project-shelf">
      <div className="project-shelf-head">
        <h3 id={labelId} className="project-shelf-heading">
          {title}
        </h3>
      </div>

      <div className="project-shelf-frame">
        <button
          type="button"
          className="project-shelf-nav project-shelf-nav--prev"
          aria-label={`Anterior: ${title}`}
          disabled={!canPrev}
          onPointerEnter={closePreviews}
          onPointerDown={closePreviews}
          onClick={() => scrollByPage(-1)}
        >
          <span className="project-shelf-nav-hit">
            <ShelfChevron direction="prev" />
          </span>
        </button>

        <div
          ref={trackRef}
          className="project-shelf-track"
          role="list"
          aria-labelledby={labelId}
        >
          {projects.map((project, index) => {
            const edge =
              index === 0
                ? "start"
                : index === projects.length - 1
                  ? "end"
                  : "middle"
            return (
              <div
                key={project.id}
                role="listitem"
                className="project-shelf-slot"
              >
                <ProjectPreviewCard
                  project={project}
                  edge={edge}
                  selected={selectedId === project.id}
                  onSelect={onSelect}
                />
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className="project-shelf-nav project-shelf-nav--next"
          aria-label={`Siguiente: ${title}`}
          disabled={!canNext}
          onPointerEnter={closePreviews}
          onPointerDown={closePreviews}
          onClick={() => scrollByPage(1)}
        >
          <span className="project-shelf-nav-hit">
            <ShelfChevron direction="next" />
          </span>
        </button>
      </div>
    </div>
  )
}
