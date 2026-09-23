"use client"

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { useReducedMotion } from "framer-motion"
import { TextLink } from "@/components/ui/Button"
import { SectionLabel } from "@/components/ui/SectionLabel"
import {
  careerPeriod,
  homeCareerEvents,
  homeCareerYearSpan,
  type CareerEvent,
} from "@/data/career"

const FIRST_ID = homeCareerEvents[0]?.id ?? ""
const TILT_ANGLE = 14
const BORDER_VARIANTS = [
  "border-left-behind",
  "border-right-behind border-bottom-behind",
  "border-left-behind",
  "border-right-behind",
  "border-left-behind border-bottom-behind",
  "border-right-behind",
] as const

function lerp(start: number, end: number, amount: number) {
  return (1 - amount) * start + amount * end
}

function remap(value: number, oldMax: number, newMax: number) {
  const next = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax
  return Math.min(Math.max(next, -newMax), newMax)
}

function headerOffsetPx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-offset")
    .trim()
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 72
}

export function CareerTimeline() {
  const reduceMotion = useReducedMotion()
  const pinRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const plateRefs = useRef(new Map<string, HTMLElement>())
  const travelRef = useRef(0)

  const [activeId, setActiveId] = useState(FIRST_ID)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [pinHeight, setPinHeight] = useState<number | undefined>(undefined)

  const focusId = hoveredId ?? activeId
  const focusEvent =
    homeCareerEvents.find((event) => event.id === focusId) ??
    homeCareerEvents[0]

  const measureTravel = useCallback(() => {
    const track = trackRef.current
    const list = listRef.current
    const sticky = stickyRef.current
    if (!track || !list || !sticky) return 0

    // 1:1 con el overflow real: el pin dura exactamente lo que tardan las cards.
    const overflow = Math.max(0, list.scrollWidth - track.clientWidth)
    travelRef.current = overflow
    setPinHeight(sticky.offsetHeight + overflow)
    return overflow
  }, [])

  const syncFromScroll = useEffectEvent(() => {
    const pin = pinRef.current
    const list = listRef.current
    if (!pin || !list) return

    const travel = travelRef.current
    if (travel <= 0) {
      list.style.transform = "translate3d(0,0,0)"
      pin.style.setProperty("--career-progress", "0")
      setProgress(0)
      return
    }

    const top = headerOffsetPx()
    const scrolled = Math.min(
      travel,
      Math.max(0, top - pin.getBoundingClientRect().top),
    )
    const next = scrolled / travel
    list.style.transform = `translate3d(${-scrolled}px,0,0)`
    pin.style.setProperty("--career-progress", String(next))
    setProgress(next)

    const plates = [...plateRefs.current.entries()]
    if (plates.length === 0) return

    const viewportCenter = window.innerWidth / 2
    let bestId = plates[0]![0]
    let bestDist = Number.POSITIVE_INFINITY
    for (const [id, node] of plates) {
      const rect = node.getBoundingClientRect()
      const center = rect.left + rect.width / 2
      const dist = Math.abs(center - viewportCenter)
      if (dist < bestDist) {
        bestDist = dist
        bestId = id
      }
    }
    if (!hoveredId) setActiveId(bestId)
  })

  useEffect(() => {
    measureTravel()
    syncFromScroll()

    const onScroll = () => syncFromScroll()
    const onResize = () => {
      measureTravel()
      syncFromScroll()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    const track = trackRef.current
    const list = listRef.current
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measureTravel()
            syncFromScroll()
          })
        : null
    if (track) resizeObserver?.observe(track)
    if (list) resizeObserver?.observe(list)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      resizeObserver?.disconnect()
    }
  }, [measureTravel])

  if (!focusEvent) return null

  return (
    <section
      ref={pinRef}
      id="trayectoria"
      aria-labelledby="trayectoria-heading"
      className="career-scroll scroll-mt-[var(--header-offset)] border-t border-[var(--border)]"
      style={
        {
          "--career-progress": String(progress),
          height: pinHeight ? `${pinHeight}px` : undefined,
        } as CSSProperties
      }
    >
      <div ref={stickyRef} className="career-gallery">
        <div className="career-gallery-chrome">
          <div className="editorial-shell">
            <div className="col-span-4 md:col-span-5 lg:col-span-7">
              <SectionLabel index="[02]" />
              <h2
                id="trayectoria-heading"
                className="mt-[var(--space-sm)] text-[clamp(1.75rem,2vw+0.9rem,3rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
              >
                Trayectoria
              </h2>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {[
                  careerPeriod(focusEvent),
                  focusEvent.title,
                  focusEvent.institution,
                  focusEvent.ongoing ? "Activo" : null,
                  focusEvent.description,
                ]
                  .filter(Boolean)
                  .join(". ")}
              </p>
              <div className="mt-[var(--space-sm)] lg:mt-[var(--space-md)]">
                <TextLink href="/trayectoria">Ver trayectoria completa</TextLink>
              </div>
            </div>
            <div className="col-span-4 mt-[var(--space-sm)] flex flex-col items-start justify-end gap-1 md:col-span-3 md:col-start-6 md:mt-0 md:items-end lg:col-span-5 lg:col-start-8">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                {homeCareerYearSpan}
              </p>
              <p
                key={careerPeriod(focusEvent)}
                aria-hidden="true"
                className="career-gallery-year hidden font-mono text-[clamp(2rem,3.8vw,3.75rem)] leading-none tracking-[-0.04em] tabular-nums text-muted lg:block"
              >
                {careerPeriod(focusEvent)}
              </p>
            </div>
          </div>
        </div>

        <div className="career-gallery-shell">
          <p className="career-gallery-hint" aria-hidden="true">
            <ScrollHintMark />
            <span>Desplaza para avanzar</span>
          </p>

          <div
            ref={trackRef}
            className="career-gallery-track"
            role="region"
            aria-label="Línea de tiempo de trayectoria. Continúa el scroll de la página para avanzar."
          >
            <ol ref={listRef} className="career-gallery-list">
              {homeCareerEvents.map((event, index) => (
                <li
                  key={event.id}
                  data-career-event={event.id}
                  data-active={event.id === focusId ? "true" : "false"}
                  className="career-plate"
                  ref={(node) => {
                    if (node) plateRefs.current.set(event.id, node)
                    else plateRefs.current.delete(event.id)
                  }}
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocusCapture={() => setHoveredId(event.id)}
                  onBlurCapture={(eventBlur) => {
                    if (
                      !eventBlur.currentTarget.contains(
                        eventBlur.relatedTarget as Node,
                      )
                    ) {
                      setHoveredId(null)
                    }
                  }}
                >
                  <CareerCard
                    event={event}
                    active={event.id === focusId}
                    borderClass={BORDER_VARIANTS[index % BORDER_VARIANTS.length]!}
                    reduceMotion={Boolean(reduceMotion)}
                    onSelect={() => {
                      setActiveId(event.id)
                      setHoveredId(event.id)
                    }}
                  />
                </li>
              ))}
            </ol>
          </div>

          <div className="career-gallery-progress" aria-hidden="true">
            <span className="career-gallery-progress-fill" />
          </div>
        </div>
      </div>
    </section>
  )
}

function CareerCard({
  event,
  active,
  borderClass,
  reduceMotion,
  onSelect,
}: {
  event: CareerEvent
  active: boolean
  borderClass: string
  reduceMotion: boolean
  onSelect: () => void
}) {
  const cardRef = useRef<HTMLElement>(null)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (reduceMotion) return
    const card = cardRef.current
    if (!card) return

    const tick = () => {
      currentX.current = lerp(currentX.current, targetX.current, 0.08)
      currentY.current = lerp(currentY.current, targetY.current, 0.08)
      card.style.setProperty("--rotateY", `${currentX.current}deg`)
      card.style.setProperty("--rotateX", `${currentY.current}deg`)
      rafRef.current = window.requestAnimationFrame(tick)
    }
    rafRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [reduceMotion])

  function handlePointerMove(eventPointer: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const centerX = (rect.left + rect.right) / 2
    const centerY = (rect.top + rect.bottom) / 2
    const posX = eventPointer.clientX - centerX
    const posY = eventPointer.clientY - centerY
    targetX.current = remap(posX, rect.width / 2, TILT_ANGLE)
    targetY.current = -remap(posY, rect.height / 2, TILT_ANGLE)
  }

  function handlePointerLeave() {
    targetX.current = 0
    targetY.current = 0
  }

  const imageUrl = event.image ? `url('${event.image}')` : "none"

  return (
    <article
      ref={cardRef}
      className={`career-card ${borderClass} ${active ? "is-active" : ""}`}
      style={{ "--url": imageUrl } as CSSProperties}
      onClick={onSelect}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="career-card-shadow" aria-hidden="true" />
      <div className="career-card-image" aria-hidden="true" />
      <div className="career-card-content">
        <p className="career-card-meta">
          <span className="tabular-nums">{careerPeriod(event)}</span>
          {event.ongoing ? (
            <>
              <span aria-hidden="true"> · </span>
              <span className="text-signal">Activo</span>
            </>
          ) : null}
          <span aria-hidden="true"> · </span>
          <span>{event.category}</span>
        </p>
        <h3 className="career-card-title">{event.title}</h3>
        {event.institution ? (
          <p className="career-card-institution">{event.institution}</p>
        ) : null}
        <p className="career-card-lead">{event.description}</p>
      </div>
    </article>
  )
}

function ScrollHintMark() {
  return (
    <svg
      className="career-gallery-hint-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d="M12 4v14M7 14l5 5 5-5"
      />
    </svg>
  )
}
