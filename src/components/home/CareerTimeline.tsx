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
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import {
  careerPeriod,
  homeCareerEvents,
  homeCareerYearSpan,
  type CareerEvent,
} from "@/data/career"

const FIRST_ID = homeCareerEvents[0]?.id ?? ""
const VISIBLE_MAX = 4
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function remap(value: number, oldMax: number, newMax: number) {
  const next = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax
  return Math.min(Math.max(next, -newMax), newMax)
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function headerOffsetPx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-offset")
    .trim()
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 72
}

function resolveCssLength(host: HTMLElement, expression: string, fallback: number) {
  const probe = document.createElement("div")
  probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${expression}`
  host.appendChild(probe)
  const width = probe.offsetWidth
  probe.remove()
  return width > 0 ? width : fallback
}

type PlateMotion = {
  x: number
  scale: number
  opacity: number
  z: number
  rotateY: number
  depth: number
}

/**
 * Ventana fija de `visible` huecos. En cada paso:
 * - la tarjeta que sale se mete detrás del pack (z bajo) y se desvanece
 * - las del medio se deslizan al hueco anterior
 * - la que entra emerge desde detrás de la última
 * Opacidades de salida/entrada son complementarias → siempre ~4 a la vista.
 */
function motionForWindow(
  index: number,
  base: number,
  stepT: number,
  stride: number,
  visible: number,
  reduceMotion: boolean,
): PlateMotion | null {
  const last = visible - 1
  const relative = index - base
  const t = easeInOut(clamp(stepT, 0, 1))

  // Fuera de la ventana activa de este paso.
  if (relative < 0 || relative > visible) return null

  // Sale: se esconde detrás de la primera y desaparece.
  if (relative === 0) {
    return {
      x: lerp(0, stride * 0.28, t),
      scale: lerp(1, 0.8, t),
      opacity: 1 - t,
      z: Math.round(lerp(18, 1, t)),
      rotateY: reduceMotion ? 0 : lerp(0, 11, t),
      depth: lerp(0, -72, t),
    }
  }

  // Entra: aparece desde detrás de la última.
  if (relative === visible) {
    return {
      x: last * stride - (1 - t) * stride * 0.28,
      scale: lerp(0.8, 1, t),
      opacity: t,
      z: Math.round(lerp(1, 18 + last, t)),
      rotateY: reduceMotion ? 0 : lerp(-11, 0, t),
      depth: lerp(-72, 0, t),
    }
  }

  // Medio: se desplaza un hueco a la izquierda.
  const fromSlot = relative
  const toSlot = relative - 1
  const slot = lerp(fromSlot, toSlot, t)
  return {
    x: slot * stride,
    scale: 1,
    opacity: 1,
    z: Math.round(20 + slot),
    rotateY: 0,
    depth: 0,
  }
}

export function CareerTimeline() {
  const reduceMotion = useReducedMotion()
  const pinRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const plateRefs = useRef(new Map<string, HTMLElement>())
  const layoutRef = useRef({
    visible: VISIBLE_MAX,
    stride: 0,
    travel: 0,
    steps: 0,
  })

  const [activeId, setActiveId] = useState(FIRST_ID)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [pinHeight, setPinHeight] = useState<number | undefined>(undefined)

  const focusId = hoveredId ?? activeId
  const focusEvent =
    homeCareerEvents.find((event) => event.id === focusId) ??
    homeCareerEvents[0]

  const measureLayout = useCallback(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const sticky = stickyRef.current
    if (!track || !stage || !sticky) return

    const trackStyles = getComputedStyle(track)
    const padL = Number.parseFloat(trackStyles.paddingLeft) || 0
    const padR = Number.parseFloat(trackStyles.paddingRight) || 0
    const viewWidth = Math.max(0, track.clientWidth - padL - padR)
    const cardW = resolveCssLength(sticky, "var(--career-card-w)", 304)
    const gap = resolveCssLength(sticky, "var(--career-gap)", 36)
    const visible = clamp(
      Math.floor((viewWidth + gap) / (cardW + gap)),
      1,
      VISIBLE_MAX,
    )
    const stride = cardW + gap
    const stageWidth = visible * cardW + (visible - 1) * gap
    const steps = Math.max(0, homeCareerEvents.length - visible)
    const travel = steps * Math.round(sticky.offsetHeight * 0.72)

    stage.style.width = `${stageWidth}px`
    stage.style.setProperty("--career-visible", String(visible))
    layoutRef.current = { visible, stride, travel, steps }
    setPinHeight(sticky.offsetHeight + travel)
  }, [])

  const syncFromScroll = useEffectEvent(() => {
    const pin = pinRef.current
    const { visible, stride, travel, steps } = layoutRef.current
    if (!pin || stride <= 0) return

    let next = 0
    if (travel > 0) {
      const top = headerOffsetPx()
      const scrolled = clamp(top - pin.getBoundingClientRect().top, 0, travel)
      next = scrolled / travel
    }

    pin.style.setProperty("--career-progress", String(next))
    setProgress(next)

    const progressIndex = next * steps
    const base =
      steps <= 0 ? 0 : clamp(Math.floor(progressIndex), 0, Math.max(0, steps - 1))
    const stepT =
      steps <= 0 ? 0 : clamp(progressIndex - base, 0, 1)
    // Tope final: ventana asentada (t=0) en el último índice.
    const atEnd = steps > 0 && next >= 0.999
    const windowBase = atEnd ? steps : base
    const windowT = atEnd ? 0 : stepT
    const reduce = Boolean(reduceMotion)
    let bestId = homeCareerEvents[0]?.id ?? ""
    let bestScore = Number.POSITIVE_INFINITY
    const centerSlot = (visible - 1) / 2

    homeCareerEvents.forEach((event, index) => {
      const node = plateRefs.current.get(event.id)
      if (!node) return

      const motion = motionForWindow(
        index,
        windowBase,
        windowT,
        stride,
        visible,
        reduce,
      )

      if (!motion || motion.opacity <= 0.02) {
        node.style.opacity = "0"
        node.style.pointerEvents = "none"
        node.style.visibility = "hidden"
        node.setAttribute("aria-hidden", "true")
        return
      }

      node.style.visibility = "visible"
      node.style.opacity = String(motion.opacity)
      node.style.zIndex = String(motion.z)
      node.style.pointerEvents = motion.opacity < 0.35 ? "none" : ""
      node.style.transform = `translate3d(${motion.x}px, -50%, ${motion.depth}px) scale(${motion.scale}) rotateY(${motion.rotateY}deg)`
      node.removeAttribute("aria-hidden")

      const relative = index - windowBase
      const visualSlot =
        relative === 0
          ? lerp(0, 0.28, windowT)
          : relative === visible
            ? visible - 1 - (1 - windowT) * 0.28
            : lerp(relative, relative - 1, windowT)
      const score = Math.abs(visualSlot - centerSlot)
      if (score < bestScore) {
        bestScore = score
        bestId = event.id
      }
    })

    if (!hoveredId && bestId) setActiveId(bestId)
  })

  useEffect(() => {
    measureLayout()
    syncFromScroll()

    const onScroll = () => syncFromScroll()
    const onResize = () => {
      measureLayout()
      syncFromScroll()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    const track = trackRef.current
    const sticky = stickyRef.current
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measureLayout()
            syncFromScroll()
          })
        : null
    if (track) resizeObserver?.observe(track)
    if (sticky) resizeObserver?.observe(sticky)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      resizeObserver?.disconnect()
    }
  }, [measureLayout])

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
          <ScrollReveal className="editorial-shell" distance={48}>
            <div className="col-span-4 md:col-span-5 lg:col-span-7">
              <SectionLabel index="[02]" />
              <h2
                id="trayectoria-heading"
                className="home-section-display mt-[var(--space-sm)]"
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
          </ScrollReveal>
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
            <div ref={stageRef} className="career-gallery-stage">
              <ol className="career-gallery-list">
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
                      borderClass={
                        BORDER_VARIANTS[index % BORDER_VARIANTS.length]!
                      }
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
  const imageFocus = event.imagePosition ?? "center 30%"

  return (
    <article
      ref={cardRef}
      className={`career-card ${borderClass} ${active ? "is-active" : ""}`}
      style={
        {
          "--url": imageUrl,
          "--career-focus": imageFocus,
        } as CSSProperties
      }
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
