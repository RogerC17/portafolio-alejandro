"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import type { CareerFrame } from "@/data/career-frames"

type CareerScrollFramesProps = {
  frames: CareerFrame[]
  activeIndex: number
  /** Lado libre del encuadre, opuesto a la columna de texto. */
  place?: "left" | "right"
  /** Acercamiento suave del héroe. No recorta el retrato. */
  zoom?: MotionValue<number>
}

/**
 * El retrato ocupa el alto de la ventana y el fondo difuminado llena el resto.
 * Así el rostro se mantiene entero en cualquier proporción de pantalla.
 */
export function CareerScrollFrames({
  frames,
  activeIndex,
  place,
  zoom,
}: CareerScrollFramesProps) {
  const safeIndex = Math.min(
    Math.max(activeIndex, 0),
    Math.max(frames.length - 1, 0),
  )
  const previousIndex = useRef(safeIndex)
  const [holdIndex, setHoldIndex] = useState(safeIndex)

  useEffect(() => {
    const previous = previousIndex.current
    previousIndex.current = safeIndex
    setHoldIndex(previous)
    const timeout = window.setTimeout(() => setHoldIndex(safeIndex), 760)
    return () => window.clearTimeout(timeout)
  }, [safeIndex])

  return (
    <div className="career-cine-frames" data-place={place}>
      {frames.map((frame, index) => {
        const isOn = index === safeIndex
        const isHold = index === holdIndex && !isOn
        const showWash = isOn || isHold
        const alt = isOn ? (frame.alt ?? "") : ""
        const scene = Boolean(frame.alt)
        return (
          <div
            key={`${frame.src}-${index}`}
            className={`career-frame${isOn ? " is-on" : ""}${isHold ? " is-hold" : ""}`}
            aria-hidden={alt ? undefined : true}
          >
            <div className="career-frame-fit">
              {showWash ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={frame.src}
                  alt=""
                  draggable={false}
                  className="career-frame-wash"
                  width={frame.width}
                  height={frame.height}
                />
              ) : null}
              {zoom && isOn ? (
                <motion.img
                  src={frame.src}
                  alt={alt}
                  draggable={false}
                  width={frame.width}
                  height={frame.height}
                  className={`career-frame-img is-scrub${scene ? " is-scene" : ""}`}
                  style={{ scale: zoom }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={frame.src}
                  alt={alt}
                  draggable={false}
                  width={frame.width}
                  height={frame.height}
                  className={`career-frame-img${scene ? " is-scene" : ""}`}
                  loading={index <= safeIndex + 1 ? "eager" : "lazy"}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

type CareerCineHeroProps = {
  frame: CareerFrame
  title: string
  years: string
  lead: string
}

export function CareerCineHero({
  frame,
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

  const zoom = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.04],
  )
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -96],
  )
  const titleScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 0.78],
  )
  const veil = useTransform(
    scrollYProgress,
    [0, 0.85],
    reduceMotion ? [0.42, 0.42] : [0.34, 0.7],
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
        <CareerScrollFrames
          frames={[frame]}
          activeIndex={0}
          zoom={reduceMotion ? undefined : zoom}
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
