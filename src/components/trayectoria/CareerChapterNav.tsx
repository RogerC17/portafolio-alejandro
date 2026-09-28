"use client"

import { useEffect, useState } from "react"
import {
  careerByCategory,
  careerCategories,
  type CareerCategory,
} from "@/data/career"

const CHAPTER_HREF: Record<CareerCategory, string> = {
  Cargos: "#cargos",
  Formación: "#formacion",
  Reconocimientos: "#reconocimientos",
}

function activeFromScroll(): CareerCategory {
  const header =
    Number.parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--header-offset")
        .trim(),
    ) || 72
  const probe = header + 96
  let current: CareerCategory = "Cargos"

  for (const category of careerCategories) {
    const id = CHAPTER_HREF[category].slice(1)
    const node = document.getElementById(id)
    if (!node) continue
    const top = node.getBoundingClientRect().top
    if (top <= probe) current = category
  }

  return current
}

export function CareerChapterNav() {
  const [active, setActive] = useState<CareerCategory>("Cargos")

  useEffect(() => {
    const onScroll = () => setActive(activeFromScroll())
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      aria-label="Capítulos de trayectoria"
      className="career-chapter-nav sticky top-[var(--header-offset)] z-[15] border-y border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,transparent)] backdrop-blur-[8px]"
    >
      <div className="editorial-shell py-[var(--space-sm)]">
        <ol className="col-span-4 flex flex-wrap items-end gap-x-6 gap-y-2 md:col-span-8 lg:col-span-12">
          {careerCategories.map((category) => {
            const count = careerByCategory[category].length
            const isActive = active === category
            return (
              <li key={category}>
                <a
                  href={CHAPTER_HREF[category]}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative inline-flex min-h-11 flex-col justify-center py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-[var(--motion-micro)] ease-[var(--ease-out)] ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  <span className="flex items-baseline gap-2">
                    <span className={isActive ? "font-bold" : undefined}>
                      {category}
                    </span>
                    <span className="tabular-nums text-muted">{count}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`nav-underline absolute inset-x-0 bottom-1 h-px ${
                      isActive ? "scale-x-100" : "group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
