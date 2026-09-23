"use client"

import { useEffect, useState, type ReactNode } from "react"
import { CareerIndex } from "@/components/trayectoria/CareerIndex"
import { CareerStage } from "@/components/trayectoria/CareerStage"
import {
  careerByCategory,
  careerCategories,
  careerPeriod,
  type CareerCategory,
} from "@/data/career"

const CHAPTER_LEGEND: Record<CareerCategory, (count: number) => string> = {
  Cargos: (count) => `${count} cargos`,
  Formación: (count) => `${count} títulos`,
  Reconocimientos: (count) => `${count} reconocimientos`,
}

function defaultId(category: CareerCategory) {
  const items = careerByCategory[category]
  return (
    items.findLast((event) => event.featured)?.id ?? items.at(-1)?.id ?? ""
  )
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function scrollFeaturedIntoView() {
  document.getElementById("evento-actual")?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  })
}

function scrollIndexItemIntoView(id: string) {
  const node = document.getElementById(`trayectoria-indice-${id}`)
  const scroller = node?.closest(".project-index")
  if (!(node instanceof HTMLElement) || !(scroller instanceof HTMLElement)) {
    return
  }

  const nodeRect = node.getBoundingClientRect()
  const scrollerRect = scroller.getBoundingClientRect()
  const delta =
    nodeRect.top -
    scrollerRect.top -
    scrollerRect.height / 2 +
    nodeRect.height / 2
  scroller.scrollTop += delta
}

type CareerArchiveProps = {
  seminars: ReactNode
  honors: ReactNode
}

export function CareerArchive({ seminars, honors }: CareerArchiveProps) {
  const [chapter, setChapter] = useState<CareerCategory>("Cargos")
  const items = careerByCategory[chapter]
  const [selectedId, setSelectedId] = useState(defaultId("Cargos"))
  const selectedIndex = Math.max(
    0,
    items.findIndex((event) => event.id === selectedId),
  )
  const selected = items[selectedIndex] ?? items[0]
  const indexLegend = CHAPTER_LEGEND[chapter](items.length)

  useEffect(() => {
    scrollIndexItemIntoView(selectedId)
  }, [chapter, selectedId])

  if (!selected) return null

  function selectChapter(nextChapter: CareerCategory) {
    const nextId = defaultId(nextChapter)
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

  const liveStatus = [
    chapter,
    careerPeriod(selected),
    selected.title,
    selected.institution,
    selected.ongoing ? "Activo" : null,
    selected.description,
    `${selectedIndex + 1} de ${items.length}`,
  ]
    .filter(Boolean)
    .join(". ")

  return (
    <section aria-labelledby="archivo-trayectoria-heading">
      <h2 id="archivo-trayectoria-heading" className="sr-only">
        Archivo de trayectoria
      </h2>

      <div className="sticky top-[var(--header-offset)] z-[15] border-y border-[var(--border)] bg-background">
        <div className="editorial-shell py-[var(--space-sm)]">
          <fieldset className="col-span-4 md:col-span-8 lg:col-span-12">
            <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              Archivo
            </legend>
            <div className="mt-[var(--space-sm)] flex flex-wrap gap-x-6 gap-y-1">
              {careerCategories.map((entry) => (
                <label
                  key={entry}
                  className="relative inline-flex min-h-11 cursor-pointer items-center py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted has-[:checked]:font-bold has-[:checked]:text-foreground has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-[var(--ring)]"
                >
                  <input
                    type="radio"
                    name="trayectoria-archivo"
                    value={entry}
                    checked={chapter === entry}
                    onChange={() => selectChapter(entry)}
                    className="absolute inset-0 cursor-pointer appearance-none focus-visible:outline-none"
                  />
                  <span className="pointer-events-none relative">{entry}</span>
                  <span
                    aria-hidden="true"
                    className={`nav-underline pointer-events-none absolute inset-x-0 bottom-1 h-px ${
                      chapter === entry ? "scale-x-100" : ""
                    }`}
                  />
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveStatus}
      </p>

      <CareerStage
        key={chapter}
        event={selected}
        index={selectedIndex}
        total={items.length}
        onPrevious={() => goTo(selectedIndex - 1)}
        onNext={() => goTo(selectedIndex + 1)}
      />

      <div className="py-[var(--space-2xl)]">
        <div className="editorial-shell">
          <CareerIndex
            events={items}
            selectedId={selected.id}
            name="trayectoria-indice"
            legend={indexLegend}
            onSelect={selectFromIndex}
          />
        </div>
      </div>

      {chapter === "Formación" ? seminars : null}
      {chapter === "Reconocimientos" ? honors : null}
    </section>
  )
}
