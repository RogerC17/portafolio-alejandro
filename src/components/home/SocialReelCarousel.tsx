"use client"

import { useEffect, useId, useRef, useState } from "react"
import { contactReels } from "@/data/contact"
import { archiveLabel, archiveOrdinal } from "@/lib/archive"

const REEL_COUNT = contactReels.length
const REEL_MOVE_MS = 600
const SLOT_PEEK = 46
const SLOT_OFF = 68

function wrapIndex(index: number) {
  return ((index % REEL_COUNT) + REEL_COUNT) % REEL_COUNT
}

function circularDelta(from: number, to: number) {
  let diff = ((to - from) % REEL_COUNT + REEL_COUNT) % REEL_COUNT
  if (diff > REEL_COUNT / 2) diff -= REEL_COUNT
  return diff
}

function slotsFor(active: number, hiddenSide: 1 | -1) {
  return contactReels.map((_, index) => {
    const diff = circularDelta(active, index)
    if (Math.abs(diff) <= 1) return diff
    return hiddenSide * 2
  })
}

function reelStyle(slot: number) {
  const abs = Math.abs(slot)
  if (abs === 0) {
    return { x: 0, scale: 1, opacity: 1, z: 4, offstage: false }
  }
  if (abs === 1) {
    return { x: slot * SLOT_PEEK, scale: 0.86, opacity: 0.72, z: 2, offstage: false }
  }
  return {
    x: Math.sign(slot) * SLOT_OFF,
    scale: 0.8,
    opacity: 0,
    z: 0,
    offstage: true,
  }
}

export function SocialReelCarousel() {
  const headingId = useId()
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const hiddenSideRef = useRef<1 | -1>(1)
  const movingRef = useRef(false)
  const moveTimerRef = useRef<number>(0)
  const [active, setActive] = useState(0)
  const [slots, setSlots] = useState(() => slotsFor(0, 1))
  const [instant, setInstant] = useState(false)
  const [inView, setInView] = useState(false)
  const [muted, setMuted] = useState(true)
  const [paused, setPaused] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const reel = contactReels[active] ?? contactReels[0]
  const position = `${archiveOrdinal(active + 1)} / ${archiveOrdinal(REEL_COUNT)}`

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      const reduced = media.matches
      setReduceMotion(reduced)
      if (reduced) setPaused(true)
    }
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const node = stageRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => window.clearTimeout(moveTimerRef.current)
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      video.muted = muted
      const isActive = index === active
      if (!isActive) {
        video.pause()
        return
      }
      if (!inView) {
        video.pause()
        return
      }
      if (paused) {
        video.pause()
        return
      }
      if (reduceMotion) return
      void video.play().catch(() => {
        setPaused(true)
      })
    })
  }, [active, inView, muted, paused, reduceMotion])

  function settleMove() {
    window.clearTimeout(moveTimerRef.current)
    moveTimerRef.current = window.setTimeout(() => {
      movingRef.current = false
    }, REEL_MOVE_MS)
  }

  function goTo(index: number) {
    const next = wrapIndex(index)
    const delta = circularDelta(active, next)
    if (delta === 0 || movingRef.current) return

    setPlaying(false)
    setPaused(reduceMotion)

    if (reduceMotion || Math.abs(delta) > 1) {
      hiddenSideRef.current = 1
      setInstant(true)
      setActive(next)
      setSlots(slotsFor(next, 1))
      requestAnimationFrame(() => setInstant(false))
      return
    }

    const dir: 1 | -1 = delta > 0 ? 1 : -1
    const startHidden = dir
    const endHidden: 1 | -1 = dir === 1 ? -1 : 1
    movingRef.current = true

    const applyMove = () => {
      setInstant(false)
      setActive(next)
      setSlots(slotsFor(next, endHidden))
      hiddenSideRef.current = endHidden
      settleMove()
    }

    if (hiddenSideRef.current !== startHidden) {
      setInstant(true)
      setSlots(slotsFor(active, startHidden))
      requestAnimationFrame(() => {
        requestAnimationFrame(applyMove)
      })
      return
    }

    applyMove()
  }

  function togglePlayback() {
    const video = videoRefs.current[active]
    if (!video) return
    if (video.paused) {
      setPaused(false)
      void video.play().catch(() => setPaused(true))
      return
    }
    video.pause()
    setPaused(true)
  }

  return (
    <div className="reel-carousel">
      <h3 id={headingId} className="sr-only">
        Piezas en redes
      </h3>
      <div
        ref={stageRef}
        className="reel-stage"
        data-instant={instant ? "on" : "off"}
        role="group"
        aria-labelledby={headingId}
        aria-roledescription="carrusel"
      >
        {contactReels.map((item, index) => {
          const slot = slots[index] ?? circularDelta(active, index)
          const style = reelStyle(slot)
          const selected = index === active
          const piece = archiveLabel("Pieza", index + 1)

          return (
            <article
              key={item.id}
              className="reel-card"
              data-active={selected ? "on" : "off"}
              data-offstage={style.offstage ? "on" : "off"}
              aria-hidden={style.offstage ? true : undefined}
              style={{
                zIndex: style.z,
                opacity: style.opacity,
                transform: `translateX(${style.x}%) scale(${style.scale})`,
              }}
            >
              <img
                src={item.poster}
                alt=""
                className="reel-poster"
                hidden={selected && playing}
              />
              <video
                ref={(node) => {
                  videoRefs.current[index] = node
                }}
                className="reel-video"
                poster={item.poster}
                preload={Math.abs(slot) <= 1 ? "metadata" : "none"}
                playsInline
                loop
                muted={muted}
                controls={false}
                onPlaying={() => {
                  if (index === active) setPlaying(true)
                }}
                onPause={() => {
                  if (index === active) setPlaying(false)
                }}
              >
                <source src={item.src} type="video/mp4" />
              </video>
              {!style.offstage && selected ? (
                <button
                  type="button"
                  className="reel-play"
                  aria-label={
                    paused ? `Reproducir ${piece}` : `Pausar ${piece}`
                  }
                  onClick={togglePlayback}
                >
                  {paused ? (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path fill="currentColor" d="M8 5.5v13l11-6.5L8 5.5Z" />
                    </svg>
                  ) : null}
                </button>
              ) : null}
              {!style.offstage && !selected ? (
                <button
                  type="button"
                  className="reel-select"
                  aria-label={`Ver ${piece}, ${item.label}`}
                  onClick={() => goTo(index)}
                />
              ) : null}
            </article>
          )
        })}
      </div>

      <div className="reel-meta">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          {archiveLabel("Pieza", active + 1)}
          <span aria-hidden="true"> · </span>
          {reel?.label}
        </p>
        <nav
          aria-label="Piezas en redes"
          className="mt-[var(--space-sm)] flex flex-wrap items-center justify-center gap-x-6 gap-y-1 lg:justify-end"
        >
          <button
            type="button"
            aria-label="Pieza anterior"
            onClick={() => goTo(active - 1)}
            className="group relative min-h-11 py-2 text-[0.9375rem] font-medium text-foreground"
          >
            Anterior
            <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
          </button>
          <p className="font-mono text-[0.75rem] tabular-nums uppercase tracking-[0.16em] text-muted">
            {position}
          </p>
          <button
            type="button"
            aria-label="Pieza siguiente"
            onClick={() => goTo(active + 1)}
            className="group relative min-h-11 py-2 text-[0.9375rem] font-medium text-foreground"
          >
            Siguiente
            <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
          </button>
          <button
            type="button"
            aria-pressed={!muted}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
            onClick={() => setMuted((current) => !current)}
            className="group relative min-h-11 py-2 text-[0.9375rem] font-medium text-foreground"
          >
            {muted ? "Sonido" : "Silencio"}
            <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
          </button>
        </nav>
        <ol className="reel-dots" aria-label="Índice de piezas">
          {contactReels.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                aria-label={`${archiveLabel("Pieza", index + 1)}, ${item.label}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => goTo(index)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
