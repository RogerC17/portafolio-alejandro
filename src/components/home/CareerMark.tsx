type CareerMarkId =
  | "2008-abogado"
  | "2012-alcalde"
  | "2021-camara"
  | "2022-maestria"
  | "2022-canal-trece"
  | "2023-doctorado"

type CareerMarkProps = {
  id: string
  className?: string
}

export function CareerMark({ id, className }: CareerMarkProps) {
  const markId = id as CareerMarkId

  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <MarkPaths id={markId} />
    </svg>
  )
}

function MarkPaths({ id }: { id: CareerMarkId }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }

  switch (id) {
    case "2008-abogado":
      return (
        <g {...stroke}>
          <path d="M36 38 L60 52 L84 38" />
          <path d="M60 52 V78" />
          <circle cx="60" cy="52" r="2.2" fill="currentColor" stroke="none" />
          <path d="M44 78 H76" />
        </g>
      )
    case "2012-alcalde":
      return (
        <g {...stroke}>
          <path d="M60 28 V86" />
          <path d="M60 40 L68 48 L60 56 L52 48 Z" />
          <path d="M42 58 Q60 70 78 58" />
        </g>
      )
    case "2021-camara":
      return (
        <g {...stroke}>
          <path d="M30 72 Q60 36 90 72" />
          <path d="M42 72 V62" />
          <path d="M60 72 V54" />
          <path d="M78 72 V62" />
          <path d="M34 78 H86" />
        </g>
      )
    case "2022-maestria":
      return (
        <g {...stroke}>
          <path d="M34 70 L60 58 L86 70" />
          <path d="M34 70 V78 L60 68 L86 78 V70" />
          <circle cx="60" cy="44" r="2.4" fill="currentColor" stroke="none" />
        </g>
      )
    case "2022-canal-trece":
      return (
        <g {...stroke}>
          <rect x="44" y="46" width="22" height="28" rx="1.5" />
          <path d="M74 52 Q86 60 74 68" />
          <path d="M82 46 Q98 60 82 74" />
        </g>
      )
    case "2023-doctorado":
      return (
        <g {...stroke}>
          <path d="M60 28 V52" strokeDasharray="2.5 3.5" />
          <path d="M60 70 V90" strokeDasharray="2.5 3.5" />
          <path d="M52 60 L68 60" />
          <path d="M60 48 L70 60 L60 72 L50 60 Z" />
        </g>
      )
    default:
      return (
        <g {...stroke}>
          <circle cx="60" cy="60" r="18" />
        </g>
      )
  }
}
