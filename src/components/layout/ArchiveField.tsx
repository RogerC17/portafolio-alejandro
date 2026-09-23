"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const TRIANGLE_BASE = 24

type TriangleCell = {
  id: string
  offset: boolean
}

function layoutGrid(width: number, height: number) {
  const columns = Math.min(56, Math.ceil(width / (TRIANGLE_BASE * 2)) + 1)
  const rows = Math.min(40, Math.ceil(height / (TRIANGLE_BASE * 1.733)))
  const cells: TriangleCell[] = []

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      cells.push({
        id: `${column}-${row}`,
        offset: row % 2 === 0,
      })
    }
  }

  return { columns, cells }
}

export function ArchiveField() {
  const pathname = usePathname()
  const fieldRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(true)
  const [active, setActive] = useState(true)
  const [grid, setGrid] = useState<{ columns: number; cells: TriangleCell[] }>({
    columns: 1,
    cells: [],
  })

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const field = fieldRef.current
    if (!field) return

    const syncGrid = () => {
      const next = layoutGrid(field.clientWidth, field.clientHeight)
      setGrid(next)
    }

    syncGrid()

    const resizeObserver = new ResizeObserver(syncGrid)
    resizeObserver.observe(field)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const veils = document.querySelectorAll(".archive-veil")
    if (veils.length === 0) {
      setActive(false)
      return
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const seen = new Map<Element, boolean>()

    const syncActive = () => {
      let visible = false
      seen.forEach((value) => {
        if (value) visible = true
      })
      setActive(visible)
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target, entry.isIntersecting)
        }
        syncActive()
      },
      { rootMargin: "12% 0px" },
    )

    veils.forEach((veil) => {
      seen.set(veil, false)
      intersectionObserver.observe(veil)
    })

    const onMove = (event: PointerEvent) => {
      if (!activeRef.current || motionQuery.matches || event.pointerType === "touch") {
        return
      }
      const glow = glowRef.current
      if (!glow) return
      glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }

    window.addEventListener("pointermove", onMove, { passive: true })

    return () => {
      intersectionObserver.disconnect()
      window.removeEventListener("pointermove", onMove)
    }
  }, [pathname])

  return (
    <div
      ref={fieldRef}
      className="archive-field"
      data-active={active ? "on" : "off"}
      aria-hidden="true"
    >
      <div ref={glowRef} className="archive-field-glow" />
      <div
        className="archive-triangle-grid"
        style={{ ["--archive-triangle-columns" as string]: String(grid.columns) }}
      >
        {grid.cells.map((cell) => (
          <div
            key={cell.id}
            className={
              cell.offset
                ? "archive-triangle-set archive-triangle-set-offset"
                : "archive-triangle-set"
            }
          />
        ))}
      </div>
    </div>
  )
}
