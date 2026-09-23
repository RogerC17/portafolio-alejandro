"use client"

import { useState } from "react"
import { ProjectIndex } from "@/components/proyectos/ProjectIndex"
import { ProjectStripe } from "@/components/proyectos/ProjectStripe"
import {
  canalProjects,
  projectSourceLabels,
  treceProjects,
  type ProjectSource,
} from "@/data/projects"

const CHAPTERS: { id: ProjectSource; items: typeof treceProjects }[] = [
  { id: "enlace-trece", items: treceProjects },
  { id: "soyalejo", items: canalProjects },
]

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function scrollFeaturedIntoView() {
  document.getElementById("proyecto-actual")?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  })
}

function scrollIndexItemIntoView(id: string) {
  document.getElementById(`proyecto-indice-${id}`)?.scrollIntoView({
    block: "nearest",
  })
}

export function ProjectArchive() {
  const [chapter, setChapter] = useState<ProjectSource>("enlace-trece")
  const items =
    CHAPTERS.find((entry) => entry.id === chapter)?.items ?? treceProjects
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "")
  const selectedIndex = Math.max(
    0,
    items.findIndex((project) => project.id === selectedId),
  )
  const selected = items[selectedIndex] ?? items[0]
  const chapterLabel = projectSourceLabels[chapter]
  const indexLegend =
    chapter === "enlace-trece"
      ? `${items.length} especiales`
      : `${items.length} videos`

  if (!selected) return null

  function selectChapter(nextChapter: ProjectSource) {
    const nextItems =
      CHAPTERS.find((entry) => entry.id === nextChapter)?.items ?? treceProjects
    const nextId = nextItems[0]?.id ?? ""
    setChapter(nextChapter)
    setSelectedId(nextId)
  }

  function selectFromIndex(id: string) {
    setSelectedId(id)
    scrollFeaturedIntoView()
  }

  function goTo(index: number) {
    const next = items[index]
    if (!next) return
    setSelectedId(next.id)
    scrollIndexItemIntoView(next.id)
  }

  return (
    <div>
      <div className="editorial-shell pb-[var(--space-xl)]">
        <fieldset className="col-span-4 md:col-span-8 lg:col-span-12">
          <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            Archivo
          </legend>
          <div className="mt-[var(--space-sm)] flex flex-wrap gap-x-6 gap-y-1">
            {CHAPTERS.map((entry) => (
              <label
                key={entry.id}
                className="relative inline-flex min-h-11 cursor-pointer items-center py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted has-[:checked]:font-bold has-[:checked]:text-foreground has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-[var(--ring)]"
              >
                <input
                  type="radio"
                  name="proyectos-archivo"
                  value={entry.id}
                  checked={chapter === entry.id}
                  onChange={() => selectChapter(entry.id)}
                  className="sr-only"
                />
                <span>{projectSourceLabels[entry.id]}</span>
                <span
                  aria-hidden="true"
                  className={`nav-underline absolute inset-x-0 bottom-1 h-px ${
                    chapter === entry.id ? "scale-x-100" : ""
                  }`}
                />
              </label>
            ))}
          </div>
        </fieldset>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {chapterLabel}. {selectedIndex + 1} de {items.length}. {selected.title}.
        </p>
      </div>

      <ProjectStripe
        key={chapter}
        project={selected}
        index={selectedIndex}
        total={items.length}
        priority
        onPrevious={() => goTo(selectedIndex - 1)}
        onNext={() => goTo(selectedIndex + 1)}
      />

      <section className="py-[var(--space-2xl)]">
        <div className="editorial-shell">
          <ProjectIndex
            projects={items}
            selectedId={selected.id}
            name="proyectos-indice"
            legend={indexLegend}
            onSelect={selectFromIndex}
          />
        </div>
      </section>
    </div>
  )
}
