import Image from "next/image"
import { RevealImage } from "@/components/ui/RevealImage"
import type { Publication } from "@/data/publications"

type PublicationCoverProps = {
  publication: Publication
  sizes: string
  priority?: boolean
}

export function PublicationCover({
  publication,
  sizes,
  priority = false,
}: PublicationCoverProps) {
  if (!publication.cover) {
    return (
      <div className="absolute inset-0">
        <RevealImage
          alt=""
          year={publication.year}
          sizes={sizes}
          priority={priority}
        />
      </div>
    )
  }

  return (
    <div className="archive-item absolute inset-0">
      <div className="archive-media absolute inset-0 flex origin-center items-center justify-center p-[var(--space-xl)]">
        <Image
          src={publication.cover}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain p-[var(--space-lg)]"
        />
      </div>
    </div>
  )
}
