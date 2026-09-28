"use client"

import Image from "next/image"
import { useState } from "react"
import { archiveLabel } from "@/lib/archive"
import { isPendingCopy } from "@/lib/content"
import {
  latestPressSlug,
  type PressItem,
} from "@/data/press"

type PressDossierProps = {
  items: PressItem[]
}

export function PressDossier({ items }: PressDossierProps) {
  const recentSlug = latestPressSlug(items)
  const initial =
    items.find((item) => item.slug === recentSlug) ?? items[0]
  const [activeSlug, setActiveSlug] = useState(initial?.slug ?? "")
  const active =
    items.find((item) => item.slug === activeSlug) ?? items[0]

  if (!active) return null

  const showActiveDate = !isPendingCopy(active.date)

  return (
    <div className="press-dossier">
      <div className="press-dossier-stage" aria-hidden="true">
        {items.map((item) => {
          const isActive = item.slug === active.slug
          return (
            <div
              key={item.slug}
              className="press-dossier-shot"
              data-active={isActive ? "on" : "off"}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-cover"
                  priority={isActive}
                />
              ) : (
                <span className="press-dossier-fallback" />
              )}
            </div>
          )
        })}
        <div className="press-dossier-veil" />
        <div className="press-dossier-caption">
          <p className="press-dossier-media">{active.media}</p>
          <p className="press-dossier-title">{active.title}</p>
          {showActiveDate ? (
            <p className="press-dossier-date">
              <time dateTime={active.dateIso}>{active.date}</time>
            </p>
          ) : null}
        </div>
      </div>

      <ul className="press-dossier-list">
        {items.map((item, index) => {
          const showDate = !isPendingCopy(item.date)
          const recent = item.slug === recentSlug
          const isActive = item.slug === active.slug

          return (
            <li key={item.slug}>
              <a
                href={item.url}
                rel="noreferrer"
                data-active={isActive ? "on" : "off"}
                className="press-dossier-row"
                onPointerEnter={() => setActiveSlug(item.slug)}
                onFocus={() => setActiveSlug(item.slug)}
              >
                <span className="press-dossier-row-meta">
                  <span className="tabular-nums">
                    {archiveLabel("Reg.", index + 1)}
                  </span>
                  {recent ? (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span className="text-signal">Reciente</span>
                    </>
                  ) : null}
                  <span className="press-dossier-row-outlet">{item.media}</span>
                </span>
                <span className="press-dossier-row-title">{item.title}</span>
                <span className="press-dossier-row-date">
                  {showDate ? (
                    <time dateTime={item.dateIso}>{item.date}</time>
                  ) : null}
                </span>
                <span className="press-dossier-row-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
