"use client"

import {
  motion,
  useMotionValueEvent,
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
import { CareerScrollVideo } from "@/components/trayectoria/CareerScrollVideo"
import {
  careerPeriod,
  type CareerEvent,
} from "@/data/career"
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
  const trackRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = events[activeIndex] ?? events[0]

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value)
  })

  // Primera mitad del pin: scrub del video; segunda: se mantiene al final
  const scrubProgress = reduceMotion
    ? 0
    : Math.min(1, Math.max(0, progress / 0.42))

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.32, 0.48],
    reduceMotion ? [1, 1, 1, 1] : [1, 1, 0.85, 0],
  )
  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.4],
    reduceMotion ? [1, 1] : [1.06, 0.94],
  )
  const stageDim = useTransform(
    scrollYProgress,
    [0.28, 0.5],
    reduceMotion ? [0.45, 0.72] : [0.28, 0.82],
  )

  const syncActive = useEffectEvent((next: number) => {
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  useEffect(() => {
    const root = stepsRef.current
    if (!root) return
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-step-index]")]
    if (nodes.length === 0) return

    const ratios = new Map<number, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(entry.target.getAttribute("data-step-index"))
          if (!Number.isFinite(index)) continue
          ratios.set(index, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = 0
        let bestRatio = -1
        for (const [index, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = index
          }
        }
        if (bestRatio > 0) syncActive(best)
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: "-30% 0px -40% 0px",
      },
    )

    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [events, syncActive])

  if (!active) return null

  return (
    <section
      ref={trackRef}
      id={chapter.id}
      aria-labelledby={`${chapter.id}-heading`}
      className="career-cine-chapter"
    >
      <div className="career-cine-chapter-pin">
        <CareerScrollVideo
          src={chapter.video.src}
          poster={chapter.video.poster}
          label={chapter.video.label}
          mode="scrub"
          progress={scrubProgress}
        />
        <motion.div
          style={{ opacity: stageDim }}
          className="career-cine-veil career-cine-veil--heavy"
          aria-hidden="true"
        />

        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="career-cine-chapter-mast"
        >
          <p className="career-cine-years">{events.length} registros</p>
          <h2 id={`${chapter.id}-heading`} className="career-cine-display">
            {chapter.title}
          </h2>
          <p className="career-cine-lead">{chapter.lead}</p>
        </motion.div>

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
            </article>
          )
        })}
      </div>

      {coda}
    </section>
  )
}
