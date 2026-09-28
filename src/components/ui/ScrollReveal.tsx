"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  once?: boolean
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "initial" | "animate" | "whileInView" | "transition" | "viewport"
>

/**
 * Entrada marcada al scrollear: sube, gana opacidad y enfoca.
 * Respeta prefers-reduced-motion (solo opacidad).
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 56,
  once = true,
  ...rest
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: distance }
      }
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.22, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.75,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type ScrollRevealItemProps = {
  children: ReactNode
  className?: string
  index?: number
  distance?: number
}

/** Ítem con stagger relativo al índice (listas / rejillas). */
export function ScrollRevealItem({
  children,
  className,
  index = 0,
  distance = 40,
}: ScrollRevealItemProps) {
  return (
    <ScrollReveal
      className={className}
      delay={Math.min(index * 0.08, 0.4)}
      distance={distance}
    >
      {children}
    </ScrollReveal>
  )
}
