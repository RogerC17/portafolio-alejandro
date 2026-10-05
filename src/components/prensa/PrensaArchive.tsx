import Image from "next/image"
import Link from "next/link"
import { isPendingCopy } from "@/lib/content"
import { pressItemsByDate, pressLead, type PressItem } from "@/data/press"
import { SITE_LOCATION } from "@/data/site"

function PressByline({
  item,
  className,
}: {
  item: PressItem
  className?: string
}) {
  const showDate = !isPendingCopy(item.date)

  return (
    <p className={className ? `press-byline ${className}` : "press-byline"}>
      <span>{item.media}</span>
      {showDate ? (
        <>
          <span aria-hidden="true"> · </span>
          <time dateTime={item.dateIso}>{item.date}</time>
        </>
      ) : null}
    </p>
  )
}

function PressPhoto({
  item,
  sizes,
  priority = false,
}: {
  item: PressItem
  sizes: string
  priority?: boolean
}) {
  if (!item.image) {
    return <span className="press-photo-fallback" aria-hidden="true" />
  }

  return (
    <Image
      src={item.image}
      alt=""
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  )
}

const COMPANION_COUNT = 3

export function PrensaArchive() {
  const ordered = pressItemsByDate()
  const [lead, ...rest] = ordered
  const companions = rest.slice(0, COMPANION_COUNT)
  const index = rest.slice(COMPANION_COUNT)
  const edition = lead && !isPendingCopy(lead.date) ? lead.date : null

  return (
    <section
      aria-labelledby="prensa-heading"
      className="press-front pb-[var(--space-3xl)] pt-[calc(var(--header-offset)+var(--space-xl))]"
    >
      <div className="editorial-shell">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <header className="press-mast">
            <div className="press-rules" aria-hidden="true">
              <span />
              <span />
            </div>
            <h1 id="prensa-heading" className="press-name">
              En los medios
            </h1>
            <p className="press-motto">{pressLead}</p>
            <div className="press-rules" aria-hidden="true">
              <span />
              <span />
            </div>
            <p className="press-dateline">
              <span>{SITE_LOCATION}</span>
              {edition ? (
                <span>
                  Edición del <time dateTime={lead?.dateIso}>{edition}</time>
                </span>
              ) : (
                <span>Archivo</span>
              )}
              <span>
                {ordered.length === 1 ? "1 nota" : `${ordered.length} notas`}
              </span>
            </p>
          </header>

          {lead ? (
            <div className="press-edition">
              <article className="press-lead">
                <Link
                  href={`/prensa/${lead.slug}`}
                  className="press-hit press-lead-hit group"
                >
                  <span className="press-lead-copy">
                    <h2 className="press-lead-title press-story-title">
                      {lead.title}
                    </h2>
                    <PressByline item={lead} />
                    <span className="press-read">
                      Abrir la nota
                      <span aria-hidden="true"> →</span>
                    </span>
                  </span>
                  <span className="press-lead-photo archive-item">
                    <span className="archive-media">
                      <PressPhoto
                        item={lead}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        priority
                      />
                    </span>
                  </span>
                </Link>
              </article>

              {companions.length > 0 ? (
                <ul className="press-companions">
                  {companions.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/prensa/${item.slug}`}
                        className="press-hit press-companion group"
                      >
                        <span className="press-companion-photo">
                          <PressPhoto
                            item={item}
                            sizes="(min-width: 1024px) 28vw, 100vw"
                          />
                        </span>
                        <PressByline item={item} />
                        <h3 className="press-companion-title press-story-title">
                          {item.title}
                        </h3>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}

              {index.length > 0 ? (
                <section className="press-index" aria-labelledby="prensa-indice">
                  <h2 id="prensa-indice" className="press-index-title">
                    El resto de la edición
                  </h2>
                  <ul>
                    {index.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/prensa/${item.slug}`}
                          className="press-hit press-index-hit group"
                        >
                          <span className="press-index-photo">
                            <PressPhoto item={item} sizes="88px" />
                          </span>
                          <span>
                            <PressByline item={item} />
                            <h3 className="press-index-name press-story-title">
                              {item.title}
                            </h3>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          ) : (
            <p className="press-empty">Aún no hay notas en el archivo.</p>
          )}
        </div>
      </div>
    </section>
  )
}
