import type { CSSProperties } from "react"
import { SoyAlejoMark } from "@/components/brand/SoyAlejoMark"
import type { Publication } from "@/data/publications"

type PublicationBook3DProps = {
  publication: Publication
  className?: string
}

export function PublicationBook3D({
  publication,
  className,
}: PublicationBook3DProps) {
  const cover = publication.cover
  const spineTitle = publication.spineTitle ?? publication.title
  const coverStyle = cover
    ? ({ "--book-cover": `url("${cover}")` } as CSSProperties)
    : undefined

  return (
    <div className={`book-3d-scene ${className ?? ""}`} tabIndex={0}>
      <div className="book-3d" style={coverStyle} aria-hidden="true">
        <div className="book-3d-face book-3d-face--front" />
        <div className="book-3d-face book-3d-face--back">
          <SoyAlejoMark variant="archivo" className="book-3d-logo" />
        </div>
        <div className="book-3d-face book-3d-face--spine">
          <span className="book-3d-spine-title">{spineTitle}</span>
        </div>
        <div className="book-3d-face book-3d-face--pages" />
        <div className="book-3d-face book-3d-face--top" />
        <div className="book-3d-face book-3d-face--bottom" />
      </div>
      <span className="sr-only">Portada de {publication.title}</span>
    </div>
  )
}
