"use client"

import Image from "next/image"
import {
  AnimatePresence,
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
import {
  careerPeriod,
  type CareerCategory,
  type CareerEvent,
} from "@/data/career"

type Visual = {
  src: string
  position: string
  alt: string
}

type CareerScrollyChapterProps = {
  id: string
  category: CareerCategory
  events: CareerEvent[]
  fallbackVisual: Visual
  lead?: string
  variant?: "media" | "type" | "marks"
  coda?: ReactNode
}

function resolveVisual(
  events: CareerEvent[],
  activeIndex: number,
  fallback: Visual,
): Visual {
  for (let i = activeIndex; i >= 0; i -= 1) {
    const event = events[i]
    if (event?.image) {
      return {
        src: event.image,
        position: event.imagePosition ?? "center center",
        alt: `${event.title}${event.institution ? ` · ${event.institution}` : ""}`,
      }
    }
  }
  return fallback
}

export function CareerScrollyChapter({
  id,
  category,
  events,
  fallbackVisual,
  lead,
  variant = "media",
  coda,
}: CareerScrollyChapterProps) {
  const trackRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = events[activeIndex] ?? events[0]
  const visual = resolveVisual(events, activeIndex, fallbackVisual)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  })
  const watermarkY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [48, -64],
  )
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-24, 36],
  )
  const mediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.12, 1],
  )
  const progressWidth = useTransform(scrollYProgress, [0.08, 0.92], ["0%", "100%"])

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
        root: null,
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
        rootMargin: "-28% 0px -42% 0px",
      },
    )

    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [events, syncActive])

  if (!active) return null

  return (
    <section
      ref={trackRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`career-scrolly career-scrolly--${variant} scroll-mt-[calc(var(--header-offset)+3.5rem)]`}
    >
      <div className="career-scrolly-layout">
        <div className="career-scrolly-stage">
          <div className="career-scrolly-stage-inner">
            <div className="career-scrolly-progress" aria-hidden="true">
              <motion.span style={{ width: progressWidth }} />
            </div>
            <h2
              id={`${id}-heading`}
              className="mt-[var(--space-sm)] text-[clamp(1.75rem,2vw+1rem,2.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
            >
              {category}
            </h2>
            {lead ? (
              <p className="mt-[var(--space-md)] max-w-[34ch] text-[0.9375rem] leading-snug text-muted">
                {lead}
              </p>
            ) : null}

            <div className="career-scrolly-visual" aria-hidden="true">
              <motion.p
                style={{ y: watermarkY }}
                className="career-scrolly-year"
              >
                {careerPeriod(active)}
              </motion.p>

              {variant !== "marks" ? (
                <div className="career-scrolly-media">
                  <motion.div
                    style={{ y: mediaY, scale: mediaScale }}
                    className="absolute inset-[-8%] origin-center"
                  >
                    <AnimatePresence initial={false} mode="sync">
                      <motion.div
                        key={visual.src}
                        initial={
                          reduceMotion
                            ? { opacity: 1 }
                            : { opacity: 0 }
                        }
                        animate={{ opacity: 1, zIndex: 2 }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, zIndex: 1 }
                        }
                        transition={{
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={visual.src}
                          alt=""
                          fill
                          sizes="(max-width: 1023px) 100vw, 42vw"
                          className="object-cover"
                          style={{ objectPosition: visual.position }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                  <div className="career-scrolly-media-veil" />
                </div>
              ) : (
                <div className="career-scrolly-mark-field" />
              )}
            </div>

            <div className="career-scrolly-active" aria-live="polite">
              {active.ongoing ? (
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-signal">
                  Activo
                </p>
              ) : null}
              <p className="mt-[var(--space-sm)] text-[clamp(1.25rem,1.2vw+0.9rem,1.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-pretty">
                {active.title}
              </p>
              {active.institution ? (
                <p className="mt-[var(--space-sm)] text-[0.9375rem] leading-snug text-muted">
                  {active.institution}
                </p>
              ) : null}
              <p className="mt-[var(--space-md)] font-mono text-[0.6875rem] tabular-nums uppercase tracking-[0.16em] text-muted">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(events.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        <div ref={stepsRef} className="career-scrolly-steps">
          {events.map((event, index) => {
            const isActive = index === activeIndex
            return (
              <article
                key={event.id}
                id={event.id}
                data-step-index={index}
                aria-current={isActive ? "true" : undefined}
                className={`career-scrolly-step${isActive ? " is-active" : ""}`}
              >
                <p className="career-scrolly-step-year font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-primary">
                  {careerPeriod(event)}
                </p>
                <h3 className="mt-[var(--space-sm)] max-w-[22ch] text-[clamp(1.35rem,1.4vw+0.85rem,2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-pretty">
                  {event.title}
                </h3>
                {event.institution ? (
                  <p className="mt-[var(--space-sm)] text-[1rem] leading-snug text-muted">
                    {event.institution}
                  </p>
                ) : null}
                <p className="mt-[var(--space-md)] max-w-[42ch] text-[1.0625rem] leading-[1.5] text-foreground">
                  {event.description}
                </p>
                {event.ongoing ? (
                  <p className="mt-[var(--space-md)] font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-signal">
                    Activo
                  </p>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>

      {coda}
    </section>
  )
}
