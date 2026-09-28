"use client"

import Image from "next/image"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef } from "react"
import { careerLead, careerYearSpan } from "@/data/career"
import { HERO_IMAGE } from "@/data/home"

export function CareerPrologue() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 72],
  )
  const mediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.08],
  )
  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -28],
  )
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    reduceMotion ? [1, 1] : [1, 0.35],
  )

  return (
    <section
      ref={ref}
      aria-labelledby="trayectoria-heading"
      className="career-prologue archive-veil pt-[calc(var(--header-offset)+var(--space-2xl))] pb-[var(--space-3xl)]"
    >
      <div className="editorial-shell items-end">
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="col-span-4 md:col-span-5 lg:col-span-6"
        >
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            [02]
          </p>
          <h1
            id="trayectoria-heading"
            className="mt-[var(--space-sm)] text-[clamp(2.5rem,4vw+1rem,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
          >
            Trayectoria
          </h1>
          <p className="editorial-measure mt-[var(--space-lg)] text-[1.0625rem] leading-[1.5] text-foreground">
            {careerLead}
          </p>
          <p className="mt-[var(--space-md)] font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-primary">
            {careerYearSpan}
          </p>
          <p className="mt-[var(--space-xl)] max-w-[28ch] text-[0.9375rem] leading-snug text-muted">
            Tres capítulos. Desplázate para recorrer cargos, formación y
            reconocimientos.
          </p>
        </motion.div>

        <div className="relative col-span-4 mt-[var(--space-xl)] aspect-[4/5] overflow-hidden bg-surface md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-5 lg:col-start-8">
          <motion.div
            style={{ y: mediaY, scale: mediaScale }}
            className="absolute inset-[-8%] origin-center"
          >
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 40vw"
              className="object-cover object-[center_12%]"
            />
          </motion.div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,color-mix(in_srgb,var(--background)_72%,transparent)_100%)]"
          />
        </div>
      </div>
    </section>
  )
}
