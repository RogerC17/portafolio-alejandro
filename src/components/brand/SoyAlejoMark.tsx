type SoyAlejoMarkProps = {
  variant?: "mark" | "lockup"
  className?: string
  alt?: string
}

const ASSETS = {
  mark: { src: "/brand/soyalejo-mark.svg", width: 220, height: 280 },
  lockup: { src: "/brand/soyalejo-lockup.svg", width: 297, height: 102 },
} as const

export function SoyAlejoMark({
  variant = "mark",
  className,
  alt = "",
}: SoyAlejoMarkProps) {
  const asset = ASSETS[variant]

  return (
    <img
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      draggable={false}
      className={`soyalejo-asset ${className ?? ""}`}
    />
  )
}
