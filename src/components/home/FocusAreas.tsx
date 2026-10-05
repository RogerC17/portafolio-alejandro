"use client"

import { useState } from "react"
import { focusAreas, type FocusArea } from "@/data/focus-areas"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

export function FocusAreas() {
  const [activeId, setActiveId] = useState(focusAreas[0]?.id ?? "")
  const active =
    focusAreas.find((area) => area.id === activeId) ?? focusAreas[0]

  if (!active) return null

  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="scroll-mt-[var(--header-offset)]"
    >
      <div className="border-t border-[var(--border)] py-[var(--space-lg)] lg:py-[var(--space-xl)]">
        <div className="editorial-shell">
          <ScrollReveal className="col-span-4 md:col-span-8" distance={32}>
            <h2 id="areas-heading" className="home-section-display">
              Áreas de trabajo
            </h2>
          </ScrollReveal>
        </div>
      </div>

      <div
        className="focus-band"
        role="radiogroup"
        aria-labelledby="areas-heading"
        onKeyDown={(event) => {
          const forward = event.key === "ArrowDown" || event.key === "ArrowRight"
          const back = event.key === "ArrowUp" || event.key === "ArrowLeft"
          if (!forward && !back) return
          event.preventDefault()
          const index = focusAreas.findIndex((area) => area.id === active.id)
          const next =
            focusAreas[
              (index + (forward ? 1 : -1) + focusAreas.length) %
                focusAreas.length
            ]
          if (!next) return
          setActiveId(next.id)
          document.getElementById(next.id)?.focus()
        }}
      >
        {focusAreas.map((area) => (
          <FocusPanel
            key={area.id}
            area={area}
            pressed={area.id === active.id}
            onSelect={() => setActiveId(area.id)}
          />
        ))}
      </div>
    </section>
  )
}

function FocusPanel({
  area,
  pressed,
  onSelect,
}: {
  area: FocusArea
  pressed: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      id={area.id}
      role="radio"
      aria-checked={pressed}
      tabIndex={pressed ? 0 : -1}
      className="focus-panel"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={area.image}
        alt=""
        width={1800}
        height={1400}
        draggable={false}
        style={{ objectPosition: area.objectPosition }}
      />
      <span className="focus-panel-veil" aria-hidden="true" />
      <span className="focus-panel-copy">
        <span className="focus-panel-index tabular-nums">{area.index}</span>
        <span className="focus-panel-title">{area.title}</span>
        <span className="focus-panel-lead">{area.lead}</span>
        <span className="focus-panel-meta">{area.register}</span>
      </span>
    </button>
  )
}
