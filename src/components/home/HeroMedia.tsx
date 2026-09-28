"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { HERO_MEDIA } from "@/data/home"

/** Media del Hero: solo parallax de scroll (sin seguimiento del cursor). */
export function HeroMedia() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const section = stage.closest<HTMLElement>(".hero")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    let raf = 0
    const syncScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!section) return
        if (motionQuery.matches) {
          section.style.setProperty("--hero-scroll", "0")
          return
        }
        const rect = section.getBoundingClientRect()
        const travel = Math.max(1, rect.height - window.innerHeight * 0.35)
        const raw = Math.min(1, Math.max(0, -rect.top / travel))
        section.style.setProperty("--hero-scroll", raw.toFixed(4))
      })
    }

    window.addEventListener("scroll", syncScroll, { passive: true })
    window.addEventListener("resize", syncScroll, { passive: true })
    syncScroll()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", syncScroll)
      window.removeEventListener("resize", syncScroll)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className="hero-media relative h-full min-h-full w-full origin-center lg:origin-center"
    >
      <div className="hero-depth-plate">
        <Image
          src={HERO_MEDIA.src}
          alt={HERO_MEDIA.alt}
          fill
          preload
          fetchPriority="high"
          sizes="(max-width: 1023px) 100vw, 54vw"
          className="hero-cutout"
        />
      </div>
      <div className="hero-cine-veil" aria-hidden="true" />
    </div>
  )
}
