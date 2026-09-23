import Image from "next/image"

type RevealImageProps = {
  src?: string
  alt: string
  sizes: string
  year?: string
  priority?: boolean
  pendingLabel?: string | null
}

export function RevealImage({
  src,
  alt,
  sizes,
  year,
  priority = false,
  pendingLabel = "Contenido pendiente",
}: RevealImageProps) {
  if (!src) {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-surface p-[var(--space-md)]">
        {year ? (
          <p className="font-mono text-[clamp(1.5rem,4vw,3rem)] leading-none tracking-[-0.04em] text-muted">
            {year}
          </p>
        ) : (
          <span />
        )}
        {pendingLabel ? (
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {pendingLabel}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover object-center"
    />
  )
}
