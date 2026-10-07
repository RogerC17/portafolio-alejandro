"use client"

import { useEffect, useId, useRef, useState, type CSSProperties } from "react"
import { SocialGlyph } from "@/components/brand/SocialGlyph"
import { socialLinks } from "@/data/social"

function DockMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="7.2" cy="12" r="1.7" />
      <circle cx="16.6" cy="6.6" r="1.7" />
      <circle cx="16.6" cy="17.4" r="1.7" />
      <path d="M8.8 11.2 14.8 7.6M8.8 12.8 14.8 16.4" />
    </svg>
  )
}

export function SocialDock() {
  const labelId = useId()
  const rootRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [focused, setFocused] = useState(false)
  const open = hovered || pinned || focused

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setPinned(false)
      setFocused(false)
      const trigger = rootRef.current?.querySelector("button")
      trigger?.focus()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <nav
      ref={rootRef}
      className="social-dock"
      data-open={open ? "on" : "off"}
      aria-labelledby={labelId}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false)
        }
      }}
    >
      <ul className="social-dock-list">
        <li className="social-dock-item social-dock-trigger">
          <button
            type="button"
            className="social-dock-chip"
            aria-labelledby={labelId}
            aria-expanded={open}
            onClick={() => setPinned((current) => !current)}
          >
            <span>
              <DockMark />
              <span id={labelId}>Redes</span>
            </span>
          </button>
        </li>
        {socialLinks.map((link, index) => (
          <li
            key={link.id}
            className="social-dock-item"
            style={{ "--index": index + 1 } as CSSProperties}
          >
            <a
              href={link.href}
              rel="noreferrer noopener"
              target="_blank"
              className="social-dock-chip"
              data-network={link.id}
              aria-label={link.label}
              tabIndex={open ? 0 : -1}
            >
              <SocialGlyph network={link.id} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
