"use client"

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

type CareerScrollVideoProps = {
  src: string
  poster: string
  label: string
  /** Progress 0–1 from parent scroll, or local if omitted */
  progress?: number
  className?: string
  mode?: "scrub" | "loop"
}

/**
 * Video full-bleed: scrub con scroll (estilo Rockstar) o loop ambiental.
 * Sin scroll-jacking: solo lee progreso; el scroll nativo sigue libre.
 */
export function CareerScrollVideo({
  src,
  poster,
  label,
  progress,
  className = "",
  mode = "scrub",
}: CareerScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const rafRef = useRef(0)
  const targetTime = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onMeta = () => setReady(true)
    const onError = () => setFailed(true)
    video.addEventListener("loadedmetadata", onMeta)
    video.addEventListener("error", onError)
    if (video.readyState >= 1) setReady(true)

    return () => {
      video.removeEventListener("loadedmetadata", onMeta)
      video.removeEventListener("error", onError)
    }
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !ready || failed || reduceMotion) return

    if (mode === "loop") {
      video.loop = true
      void video.play().catch(() => {})
      return () => {
        video.pause()
      }
    }

    video.loop = false
    video.pause()
  }, [mode, ready, failed, reduceMotion, src])

  useEffect(() => {
    if (mode !== "scrub" || reduceMotion || !ready || progress == null) return
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return

    targetTime.current = Math.min(
      video.duration - 0.05,
      Math.max(0, progress * video.duration),
    )

    const tick = () => {
      const node = videoRef.current
      if (!node) return
      const delta = targetTime.current - node.currentTime
      if (Math.abs(delta) > 0.04) {
        // Seeking suave para no saturar el decoder
        if (Math.abs(delta) > 0.35) {
          node.currentTime = targetTime.current
        } else {
          node.currentTime += delta * 0.35
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mode, progress, ready, reduceMotion])

  return (
    <div className={`career-cine-video ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className={`career-cine-video-poster${ready && !failed && !reduceMotion ? " is-hidden" : ""}`}
        draggable={false}
      />
      {!reduceMotion && !failed ? (
        <video
          ref={videoRef}
          className="career-cine-video-el"
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-label={label}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  )
}

type CareerCineHeroProps = {
  src: string
  poster: string
  label: string
  title: string
  years: string
  lead: string
}

export function CareerCineHero({
  src,
  poster,
  label,
  title,
  years,
  lead,
}: CareerCineHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value)
  })

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -120],
  )
  const titleScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 0.72],
  )
  const veil = useTransform(
    scrollYProgress,
    [0, 0.85],
    reduceMotion ? [0.35, 0.35] : [0.28, 0.72],
  )
  const hintOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    reduceMotion ? [1, 1] : [1, 0],
  )

  return (
    <section
      ref={ref}
      aria-labelledby="trayectoria-heading"
      className="career-cine-hero"
    >
      <div className="career-cine-hero-sticky">
        <CareerScrollVideo
          src={src}
          poster={poster}
          label={label}
          mode="scrub"
          progress={reduceMotion ? 0 : Math.min(1, progress * 1.15)}
        />
        <motion.div
          style={{ opacity: veil }}
          className="career-cine-veil"
          aria-hidden="true"
        />
        <div className="career-cine-hero-copy">
          <motion.div style={{ y: titleY, scale: titleScale }}>
            <p className="career-cine-years">{years}</p>
            <h1 id="trayectoria-heading" className="career-cine-display">
              {title}
            </h1>
            <p className="career-cine-lead">{lead}</p>
          </motion.div>
          <motion.p
            style={{ opacity: hintOpacity }}
            className="career-cine-hint"
          >
            Desplázate
          </motion.p>
        </div>
      </div>
    </section>
  )
}
