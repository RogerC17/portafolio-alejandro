import Link from "next/link"

type PublicationActionsProps = {
  buyUrl: string
  noteUrl?: string
}

function Action({
  href,
  label,
  tone,
}: {
  href: string
  label: string
  tone: "buy" | "quiet"
}) {
  const className = `pub-action pub-action--${tone}`
  const external = href.startsWith("http")
  const content = (
    <>
      <span>{label}</span>
      {external ? <span className="sr-only">, se abre en otra pestaña</span> : null}
      <span className="pub-action-arrow" aria-hidden="true">
        →
      </span>
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
}

export function PublicationActions({ buyUrl, noteUrl }: PublicationActionsProps) {
  return (
    <div className="pub-actions">
      <Action href={buyUrl} label="Comprar" tone="buy" />
      {noteUrl ? <Action href={noteUrl} label="Ver la nota" tone="quiet" /> : null}
    </div>
  )
}
