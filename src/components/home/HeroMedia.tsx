"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { HERO_MEDIA } from "@/data/home"

export function HeroMedia() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const observer = new IntersectionObserver(
      ([entry]) => {
        stage.dataset.depth = entry.isIntersecting ? "live" : "paused"
      },
      { threshold: 0.12 },
    )

    observer.observe(stage)

    const onEnter = () => {
      stage.dataset.pointer = "on"
    }

    const resetPointer = () => {
      stage.dataset.pointer = "off"
      stage.style.setProperty("--hero-px", "0")
      stage.style.setProperty("--hero-py", "0")
    }

    const onMove = (event: PointerEvent) => {
      if (motionQuery.matches || event.pointerType === "touch") return

      stage.dataset.pointer = "on"

      const rect = stage.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      stage.style.setProperty("--hero-px", x.toFixed(4))
      stage.style.setProperty("--hero-py", y.toFixed(4))
    }

    stage.addEventListener("pointerenter", onEnter)
    stage.addEventListener("pointermove", onMove)
    stage.addEventListener("pointerleave", resetPointer)

    return () => {
      observer.disconnect()
      stage.removeEventListener("pointerenter", onEnter)
      stage.removeEventListener("pointermove", onMove)
      stage.removeEventListener("pointerleave", resetPointer)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      data-depth="live"
      className="hero-media relative h-full min-h-full w-full origin-[center_bottom] lg:origin-[right_bottom]"
    >
      <div className="hero-depth-plate">
        <Image
          src={HERO_MEDIA.src}
          alt={HERO_MEDIA.alt}
          fill
          preload
          fetchPriority="high"
          sizes="(max-width: 1023px) 100vw, 46vw"
          className="hero-cutout"
        />
      </div>
    </div>
  )
}
