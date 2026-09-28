"use client"

import Image from "next/image"
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type MouseEvent,
} from "react"
import type { Project } from "@/data/projects"
import { projectSourceLabels } from "@/data/projects"
import { youtubeEmbedSrc } from "@/lib/youtube"

const PREVIEW_DELAY_MS = 480
const FLOAT_SCALE = 1.22

type ProjectPreviewCardProps = {
  project: Project
  edge?: "start" | "middle" | "end"
  selected?: boolean
  onSelect?: (project: Project) => void
}

type FloatRect = {
  top: number
  left: number
  width: number
  origin: "left top" | "center top" | "right top"
  meta: "below" | "above"
}

function measureFloatRect(rect: DOMRect): FloatRect {
  const margin = 16
  const scaled = rect.width * FLOAT_SCALE
  const grow = (scaled - rect.width) / 2
  const overflowLeft = rect.left - grow < margin
  const overflowRight = rect.right + grow > window.innerWidth - margin
  let origin: FloatRect["origin"] = "center top"

  if (overflowLeft && !overflowRight) {
    origin = "left top"
  } else if (overflowRight && !overflowLeft) {
    origin = "right top"
  } else if (overflowLeft && overflowRight) {
    origin =
      rect.left <= window.innerWidth - rect.right ? "left top" : "right top"
  }

  const metaRoom = 132
  const roomBelow = window.innerHeight - rect.bottom
  const roomAbove = rect.top
  const meta: FloatRect["meta"] =
    roomBelow < metaRoom && roomAbove > roomBelow ? "above" : "below"

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    origin,
    meta,
  }
}

export function ProjectPreviewCard({
  project,
  edge = "middle",
  selected = false,
  onSelect,
}: ProjectPreviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [previewing, setPreviewing] = useState(false)
  const [floatRect, setFloatRect] = useState<FloatRect | null>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | null>(null)
  const theaterMode = typeof onSelect === "function"

  const clearPreviewTimer = useEffectEvent(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  })

  const syncFloatRect = useEffectEvent(() => {
    const anchor = anchorRef.current
    if (!anchor) return
    setFloatRect(measureFloatRect(anchor.getBoundingClientRect()))
  })

  useEffect(() => {
    return () => clearPreviewTimer()
  }, [])

  useEffect(() => {
    function onClosePreviews() {
      clearPreviewTimer()
      setExpanded(false)
      setPreviewing(false)
      setFloatRect(null)
    }

    window.addEventListener("project-shelf:close-previews", onClosePreviews)
    return () => {
      window.removeEventListener("project-shelf:close-previews", onClosePreviews)
    }
  }, [])

  useEffect(() => {
    if (!expanded) return

    syncFloatRect()
    const onMove = () => syncFloatRect()
    window.addEventListener("scroll", onMove, true)
    window.addEventListener("resize", onMove)

    return () => {
      window.removeEventListener("scroll", onMove, true)
      window.removeEventListener("resize", onMove)
    }
  }, [expanded, edge])

  function canHoverExpand() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches
  }

  function canAutoPreview() {
    return (
      canHoverExpand() &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  }

  function openCard() {
    if (!canHoverExpand()) return

    syncFloatRect()
    setExpanded(true)
    clearPreviewTimer()
    if (!canAutoPreview()) return
    timerRef.current = window.setTimeout(() => {
      setPreviewing(true)
    }, PREVIEW_DELAY_MS)
  }

  function closeCard() {
    clearPreviewTimer()
    setExpanded(false)
    setPreviewing(false)
    setFloatRect(null)
  }

  function handleActivate(event: MouseEvent<HTMLAnchorElement>) {
    if (!theaterMode || !onSelect) return
    event.preventDefault()
    onSelect(project)
    closeCard()
    document
      .getElementById("proyecto-billboard-titulo")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div ref={anchorRef} className="project-shelf-anchor">
      <div className="project-shelf-spacer" aria-hidden="true" />
      <article
        className="project-shelf-card"
        data-edge={edge}
        data-active={expanded || selected ? "on" : "off"}
        data-selected={selected ? "on" : "off"}
        data-float={expanded && floatRect ? "on" : "off"}
        data-preview={previewing ? "on" : "off"}
        data-meta={expanded && floatRect ? floatRect.meta : "below"}
        style={
          expanded && floatRect
            ? {
                top: floatRect.top,
                left: floatRect.left,
                width: floatRect.width,
                transformOrigin: floatRect.origin,
              }
            : undefined
        }
        onMouseEnter={openCard}
        onMouseLeave={closeCard}
        onFocusCapture={openCard}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            closeCard()
          }
        }}
      >
        <a
          href={project.url}
          rel="noreferrer"
          target={theaterMode ? undefined : "_blank"}
          className="project-shelf-hit"
          aria-label={
            theaterMode
              ? `${project.title}. Mostrar en cartelera`
              : `${project.title}. Ver en YouTube`
          }
          aria-current={selected ? "true" : undefined}
          onClick={handleActivate}
        >
          <div className="project-shelf-thumb">
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(max-width: 767px) 70vw, (max-width: 1279px) 32vw, 18rem"
              className="object-cover"
            />
            {previewing ? (
              <iframe
                className="project-shelf-preview"
                src={youtubeEmbedSrc(project.id)}
                title={`Vista previa: ${project.title}`}
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
                tabIndex={-1}
                aria-hidden="true"
              />
            ) : null}
            <span className="project-shelf-play" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
              >
                <path d="M8.2 5.6v12.8L19 12 8.2 5.6Z" />
              </svg>
            </span>
          </div>
          <div className="project-shelf-meta">
            <p className="project-shelf-kicker">
              {projectSourceLabels[project.source]}
              <span aria-hidden="true"> · </span>
              {project.category}
            </p>
            <h3 className="project-shelf-title">{project.title}</h3>
          </div>
        </a>
      </article>
    </div>
  )
}
