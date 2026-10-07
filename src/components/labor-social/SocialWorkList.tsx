import Link from "next/link"
import type { SocialWorkItem, SocialWorkSource } from "@/data/social-work"

function SourceLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http")

  if (external) {
    return (
      <a href={href} className="social-work-source" rel="noreferrer" target="_blank">
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className="social-work-source">
      {label}
    </Link>
  )
}

function Sources({ sources }: { sources: SocialWorkSource[] }) {
  return (
    <p className="social-work-sources">
      {sources.map((source) => (
        <SourceLink key={source.href} href={source.href} label={source.label} />
      ))}
    </p>
  )
}

function Copy({ item, heading }: { item: SocialWorkItem; heading: "h2" | "h3" }) {
  const Title = heading

  return (
    <div className="social-work-copy">
      <Title className="social-work-title">{item.title}</Title>
      <p className="social-work-meta">
        <span>{item.place}</span>
        <span aria-hidden="true"> · </span>
        <span>{item.period}</span>
      </p>
      <p className="social-work-summary">{item.summary}</p>
      <Sources sources={item.sources} />
    </div>
  )
}

function publicationIndex(index: number) {
  return String(index + 1).padStart(2, "0")
}

export function SocialWorkDossier({ items }: { items: SocialWorkItem[] }) {
  const pictured = items.filter((item) => item.image)

  return (
    <div className="social-work-dossier">
      {pictured.map((item, index) => (
        <article
          key={item.id}
          id={`labor-${item.id}`}
          className={`social-work-plate is-${item.image?.layout}`}
        >
          <p className="social-work-index">{publicationIndex(index)}</p>
          <figure className="social-work-frame">
            <img
              src={item.image?.src}
              width={item.image?.width}
              height={item.image?.height}
              alt={item.image?.alt ?? ""}
            />
          </figure>
          <Copy item={item} heading="h2" />
        </article>
      ))}
    </div>
  )
}

export function SocialWorkRecord({ items }: { items: SocialWorkItem[] }) {
  const pending = items.filter((item) => !item.image)

  if (pending.length === 0) return null

  return (
    <section className="social-work-record" aria-labelledby="labor-social-record-heading">
      <h2 id="labor-social-record-heading" className="social-work-record-title">
        Actividades sin fotografía publicada
      </h2>
      <div className="social-work-record-list">
        {pending.map((item) => (
          <article key={item.id} id={`labor-${item.id}`} className="social-work-line">
            <Copy item={item} heading="h3" />
          </article>
        ))}
      </div>
    </section>
  )
}

export function SocialWorkGallery({ items }: { items: SocialWorkItem[] }) {
  const pictured = items.filter((item) => item.image)

  return (
    <ul className="social-work-gallery">
      {pictured.map((item, index) => (
        <li key={item.id}>
          <Link href={`/labor-social#labor-${item.id}`} className="social-work-gallery-card">
            <span className={`social-work-gallery-frame is-${item.image?.layout}`}>
              <img
                src={item.image?.src}
                width={item.image?.width}
                height={item.image?.height}
                alt=""
              />
            </span>
            <span className="social-work-index">{publicationIndex(index)}</span>
            <span className="social-work-gallery-title">{item.title}</span>
            <span className="social-work-gallery-meta">
              {item.place}
              <span aria-hidden="true"> · </span>
              {item.period}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
