"use client"

import { motion, useReducedMotion } from "framer-motion"
import { focusAreas, type FocusArea } from "@/data/focus-areas"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

const EASE = [0.16, 1, 0.3, 1] as const

export function FocusAreas() {
  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="scroll-mt-[var(--header-offset)]"
    >
      <div className="border-t border-[var(--border)] py-[var(--space-lg)] lg:py-[var(--space-xl)]">
        <div className="editorial-shell">
          <ScrollReveal className="col-span-4 md:col-span-8" distance={48}>
            <h2 id="areas-heading" className="home-section-display">
              Áreas de trabajo
            </h2>
          </ScrollReveal>
        </div>
      </div>

      <div className="relative border-t border-[var(--border)]">
        <div className="focus-disc-grid">
          {focusAreas.map((area, index) => (
            <FocusDisc key={area.id} area={area} index={index} />
          ))}
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-primary"
        />
      </div>
    </section>
  )
}

function FocusDisc({ area, index }: { area: FocusArea; index: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      id={area.id}
      className="focus-disc scroll-mt-[var(--header-offset)]"
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 48, filter: "blur(8px)" }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.7,
        delay: reduceMotion ? 0 : Math.min(index * 0.08, 0.32),
        ease: EASE,
      }}
    >
      <div
        className="focus-disc-orb outline-none"
        tabIndex={0}
        role="img"
        aria-label={area.alt}
        style={{
          backgroundImage: `url(${area.image})`,
          backgroundPosition: area.objectPosition,
        }}
      >
        <span className="focus-disc-label">
          <span className="focus-disc-index tabular-nums">{area.index}</span>
          <span className="focus-disc-title">{area.title}</span>
        </span>
      </div>
      <div className="focus-disc-copy">
        <p className="focus-disc-meta">{area.register}</p>
        <p className="focus-disc-lead">{area.lead}</p>
      </div>
    </motion.article>
  )
}
