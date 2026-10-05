"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { CareerScrollFrames } from "@/components/trayectoria/CareerScrollFrames"
import { careerPeriod, type CareerEvent } from "@/data/career"
import { frameForEvent } from "@/data/career-frames"
import type { CinematicChapter } from "@/data/career-cinematic"

type CareerCineChapterProps = {
  chapter: CinematicChapter
  events: CareerEvent[]
  coda?: ReactNode
}

export function CareerCineChapter({
  chapter,
  events,
  coda,
}: CareerCineChapterProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = events[activeIndex] ?? events[0]
  const frames = events.map((event) => frameForEvent(event))

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.2],
    reduceMotion ? [1, 1, 1] : [1, 1, 0],
  )
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.22],
    reduceMotion ? [0, 0] : [0, -48],
  )

  const syncActive = useEffectEvent((next: number) => {
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  useEffect(() => {
    const root = stepsRef.current
    if (!root) return

    let frame = 0
    const update = () => {
      frame = 0
      const nodes = [...root.querySelectorAll<HTMLElement>("[data-step-index]")]
      const mid = window.innerHeight * 0.46
      let best = 0
      let bestDist = Number.POSITIVE_INFINITY
      for (const node of nodes) {
        const rect = node.getBoundingClientRect()
        if (rect.bottom < mid - window.innerHeight * 0.35) continue
        if (rect.top > mid + window.innerHeight * 0.35) continue
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - mid)
        const index = Number(node.getAttribute("data-step-index"))
        if (!Number.isFinite(index) || dist >= bestDist) continue
        bestDist = dist
        best = index
      }
      if (bestDist < Number.POSITIVE_INFINITY) syncActive(best)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [events, syncActive])

  if (!active) return null

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-heading`}
      className="career-cine-chapter"
      data-side={chapter.side}
    >
      <div ref={trackRef} className="career-cine-track">
        <div className="career-cine-chapter-pin">
          <CareerScrollFrames
            frames={frames}
            activeIndex={activeIndex}
            place={chapter.side === "start" ? "right" : "left"}
          />
          <div className="career-cine-veil career-cine-veil--side" aria-hidden="true" />

          <div className="career-cine-live" aria-live="polite">
            <p className="career-cine-live-year">{careerPeriod(active)}</p>
            <p className="career-cine-live-title">{active.title}</p>
            <p className="career-cine-live-count">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(events.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div ref={stepsRef} className="career-cine-steps">
          <motion.span
            aria-hidden="true"
            className={`career-cine-rail${reduceMotion ? " is-static" : ""}`}
            style={
              reduceMotion
                ? undefined
                : { scaleY: scrollYProgress, transformOrigin: "top center" }
            }
          />
          <motion.header
            style={{ opacity: titleOpacity, y: titleY }}
            className="career-cine-chapter-mast"
          >
            <p className="career-cine-years">{events.length} registros</p>
            <h2 id={`${chapter.id}-heading`} className="career-cine-display">
              {chapter.title}
            </h2>
            <p className="career-cine-lead">{chapter.lead}</p>
          </motion.header>

          {events.map((event, index) => {
            const isActive = index === activeIndex
            return (
              <article
                key={event.id}
                id={event.id}
                data-step-index={index}
                aria-current={isActive ? "true" : undefined}
                className={`career-cine-step${isActive ? " is-active" : ""}`}
              >
                <div className="career-cine-step-panel">
                  <p className="career-cine-step-year">{careerPeriod(event)}</p>
                  <h3 className="career-cine-step-title">{event.title}</h3>
                  {event.institution ? (
                    <p className="career-cine-step-institution">
                      {event.institution}
                    </p>
                  ) : null}
                  <p className="career-cine-step-body">{event.description}</p>
                  {event.ongoing ? (
                    <p className="career-cine-step-live">Activo</p>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {coda}
    </section>
  )
}
