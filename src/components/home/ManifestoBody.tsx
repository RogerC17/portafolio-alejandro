"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef } from "react"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import {
  MANIFESTO_AXES,
  MANIFESTO_QUOTE_LINES,
  MANIFESTO_SUPPORT,
} from "@/data/home"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

export function ManifestoBody() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const quoteY = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    reduceMotion ? [0, 0] : [36, -16],
  )

  return (
    <div
      ref={ref}
      className="col-span-4 mt-[var(--space-md)] flex flex-col gap-[var(--space-lg)] md:col-span-6 md:mt-0 lg:col-span-10 lg:col-start-3"
    >
      <ScrollReveal distance={64}>
        <motion.h2
          id="manifiesto-heading"
          style={{ y: quoteY }}
          className="font-serif text-[clamp(1.85rem,2.6vw+1rem,3.5rem)] font-normal italic leading-[1.15] text-foreground"
        >
          {MANIFESTO_QUOTE_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h2>
      </ScrollReveal>

      <ScrollReveal delay={0.12} distance={40}>
        <p className="editorial-measure text-[1rem] leading-[1.6] text-foreground">
          {MANIFESTO_SUPPORT}
        </p>
      </ScrollReveal>

      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {MANIFESTO_AXES.map((axis, index) => {
          const className =
            "group relative inline-flex min-h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted"

          const label = (
            <motion.span
              className="relative"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: reduceMotion ? 0.15 : 0.55,
                delay: reduceMotion ? 0 : 0.15 + index * 0.06,
                ease: EASE_OUT,
              }}
            >
              {axis.label}
              <span className="nav-underline absolute inset-x-0 bottom-0 h-px group-hover:scale-x-100" />
            </motion.span>
          )

          return (
            <li key={axis.label}>
              {"href" in axis && axis.href ? (
                <a href={axis.href} className={`${className} hover:text-foreground`}>
                  {label}
                </a>
              ) : (
                <span className={className}>{label}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
