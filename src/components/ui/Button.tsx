"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

type TextLinkProps = {
  href: string
  children: string
  variant?: "primary" | "secondary"
}

export function TextLink({
  href,
  children,
  variant = "primary",
}: TextLinkProps) {
  const reduceMotion = useReducedMotion()
  const isPrimary = variant === "primary"

  return (
    <motion.span
      className="inline-flex"
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? "rest" : "hover"}
    >
      <Link
        href={href}
        className={`group relative inline-flex min-h-11 items-center gap-2 py-2 text-[0.9375rem] font-medium ${
          isPrimary ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
        <span>{children}</span>
        <motion.span
          aria-hidden="true"
          className="inline-block text-foreground"
          variants={{
            rest: { x: 0 },
            hover: { x: 4 },
          }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          →
        </motion.span>
        <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
      </Link>
    </motion.span>
  )
}
