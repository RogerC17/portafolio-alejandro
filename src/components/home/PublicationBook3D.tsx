"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { SoyAlejoMark } from "@/components/brand/SoyAlejoMark"
import type { Publication } from "@/data/publications"

type PublicationBook3DProps = {
  publication: Publication
  className?: string
  /** Dentro de un enlace la escena no debe ser otro control. */
  focusable?: boolean
}

const REST_Y = -18
const REST_X = 6
const TURN_MS = 7000
const SPIN = 360 / TURN_MS
const RETURN = SPIN * 3.4
const BRAKE_MS = 200
const SETTLE_BRAKE_MS = 70
const EASE_ZONE = 22

type SpinMode = "idle" | "spin" | "settle"

export function PublicationBook3D({
  publication,
  className,
  focusable = true,
}: PublicationBook3DProps) {
  const cover = publication.cover
  const coverBack = publication.coverBack
  const coverSpine = publication.coverSpine
  const spineTitle = publication.spineTitle ?? publication.title
  const coverStyle = {
    ...(cover ? { "--book-cover": `url("${cover}")` } : {}),
    ...(coverBack ? { "--book-back": `url("${coverBack}")` } : {}),
    ...(coverSpine ? { "--book-spine-art": `url("${coverSpine}")` } : {}),
  } as CSSProperties

  const sceneRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef(REST_Y)
  const velocityRef = useRef(0)
  const targetRef = useRef(REST_Y)
  const modeRef = useRef<SpinMode>("idle")
  const rafRef = useRef(0)
  const lastRef = useRef(0)
  const reducedRef = useRef(false)
  const hotRef = useRef({ hover: false, focus: false })

  useEffect(() => {
    const scene = sceneRef.current
    const book = bookRef.current
    if (!scene || !book) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")

    const apply = (angle: number) => {
      book.style.transform = `rotateY(${angle}deg) rotateX(${REST_X}deg)`
    }

    const rest = () => {
      angleRef.current = REST_Y
      velocityRef.current = 0
      modeRef.current = "idle"
      book.style.transform = ""
    }

    const stop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      lastRef.current = 0
    }

    const tick = (now: number) => {
      const last = lastRef.current
      lastRef.current = now
      const dt = last === 0 ? 16 : Math.min(40, now - last)
      let angle = angleRef.current
      let velocity = velocityRef.current
      const mode = modeRef.current

      if (mode === "spin") {
        const blend = Math.min(1, dt / BRAKE_MS)
        velocity += (SPIN - velocity) * blend
        angle += velocity * dt
      } else if (mode === "settle") {
        const remaining = targetRef.current - angle
        const distance = Math.abs(remaining)
        if (distance < 0.2) {
          rest()
          stop()
          return
        }
        const sign = Math.sign(remaining)
        const taper = distance > EASE_ZONE ? 1 : Math.max(0.28, distance / EASE_ZONE)
        const desired = sign * RETURN * taper
        const blend = Math.min(1, dt / SETTLE_BRAKE_MS)
        velocity += (desired - velocity) * blend
        const step = velocity * dt
        const towardTarget = Math.sign(step) === sign && Math.abs(step) > distance
        angle += towardTarget ? sign * distance : step
      }

      angleRef.current = angle
      velocityRef.current = velocity
      apply(angle)
      rafRef.current = requestAnimationFrame(tick)
    }

    const start = () => {
      if (rafRef.current) return
      lastRef.current = 0
      rafRef.current = requestAnimationFrame(tick)
    }

    const sync = () => {
      if (reducedRef.current) return
      const hot = hotRef.current.hover || hotRef.current.focus
      if (hot) {
        modeRef.current = "spin"
        start()
        return
      }
      if (modeRef.current === "idle") return
      const angle = angleRef.current
      const turn = ((angle - REST_Y) % 360 + 360) % 360
      targetRef.current = turn >= 180 ? angle + (360 - turn) : angle - turn
      modeRef.current = "settle"
      start()
    }

    const updateMotion = () => {
      reducedRef.current = motion.matches || !fine.matches
      if (!reducedRef.current) return
      hotRef.current.hover = false
      hotRef.current.focus = false
      rest()
      stop()
    }

    const onEnter = () => {
      hotRef.current.hover = true
      sync()
    }
    const onLeave = () => {
      hotRef.current.hover = false
      hotRef.current.focus = false
      sync()
    }
    const onFocus = () => {
      if (!scene.matches(":focus-visible")) return
      hotRef.current.focus = true
      sync()
    }
    const onBlur = () => {
      hotRef.current.focus = false
      sync()
    }

    updateMotion()
    motion.addEventListener("change", updateMotion)
    fine.addEventListener("change", updateMotion)
    scene.addEventListener("pointerenter", onEnter)
    scene.addEventListener("pointerleave", onLeave)
    scene.addEventListener("focusin", onFocus)
    scene.addEventListener("focusout", onBlur)

    return () => {
      motion.removeEventListener("change", updateMotion)
      fine.removeEventListener("change", updateMotion)
      scene.removeEventListener("pointerenter", onEnter)
      scene.removeEventListener("pointerleave", onLeave)
      scene.removeEventListener("focusin", onFocus)
      scene.removeEventListener("focusout", onBlur)
      stop()
    }
  }, [])

  return (
    <div
      ref={sceneRef}
      className={`book-3d-scene ${className ?? ""}`}
      tabIndex={focusable ? 0 : undefined}
    >
      <div
        ref={bookRef}
        className="book-3d"
        style={coverStyle}
        aria-hidden="true"
      >
        <div className="book-3d-face book-3d-face--front" />
        <div className="book-3d-face book-3d-face--back">
          {coverBack ? null : (
            <SoyAlejoMark variant="mark" className="book-3d-logo" />
          )}
        </div>
        <div className="book-3d-face book-3d-face--spine">
          {coverSpine ? null : (
            <span className="book-3d-spine-title">{spineTitle}</span>
          )}
        </div>
        <div className="book-3d-face book-3d-face--pages" />
        <div className="book-3d-face book-3d-face--top" />
        <div className="book-3d-face book-3d-face--bottom" />
      </div>
      <span className="sr-only">Portada de {publication.title}</span>
    </div>
  )
}
