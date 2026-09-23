"use client"

import { useId } from "react"

type SoyAlejoMarkProps = {
  variant?: "archivo" | "lineal" | "sello" | "marca"
  className?: string
}

const BLOB =
  "M0 20C6 8 24 6 32 16C38 24 34 32 28 38C22 44 30 50 34 60C39 72 30 86 16 90C6 93 0 86 0 74V20Z"

export function SoyAlejoMark({
  variant = "archivo",
  className,
}: SoyAlejoMarkProps) {
  const clipId = useId().replace(/:/g, "")
  const compact = variant === "marca"

  return (
    <svg
      viewBox="0 0 80 96"
      className={`soyalejo-mark soyalejo-mark-${variant} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="80" height="96" rx="16" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect className="soyalejo-plate" width="80" height="96" rx="16" />
        <path className="soyalejo-blob" d={BLOB} />
      </g>
      {compact ? (
        <>
          <text className="soyalejo-word soyalejo-word-compact" x="28" y="46">
            Aje
          </text>
          <text className="soyalejo-word soyalejo-word-compact" x="28" y="72">
            Jo
          </text>
        </>
      ) : (
        <>
          <text className="soyalejo-meta" x="56" y="22">
            SOY
          </text>
          <text className="soyalejo-word" x="28" y="48">
            Aje
          </text>
          <text className="soyalejo-word" x="28" y="72">
            Jo
          </text>
          <text className="soyalejo-meta" x="54" y="88">
            4.0
          </text>
        </>
      )}
    </svg>
  )
}
