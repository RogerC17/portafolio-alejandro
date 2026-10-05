import Image from "next/image"
import Link from "next/link"
import { RevealImage } from "@/components/ui/RevealImage"
import { isPendingCopy } from "@/lib/content"
import { pressItemsByDate, type PressItem } from "@/data/press"

type PressClippingProps = {
  item: PressItem
  related: PressItem[]
}

export function PressClipping({ item, related }: PressClippingProps) {
  const showDate = !isPendingCopy(item.date)
  const year = item.dateIso?.slice(0, 4)
  const also = pressItemsByDate(related).slice(0, 6)

  return (
    <article className="press-clip pb-[var(--space-3xl)] pt-[calc(var(--header-offset)+var(--space-lg))]">
      <div className="editorial-shell">
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
          <p>
            <Link href="/prensa" className="press-back">
              Volver a la portada
            </Link>
          </p>

          <header className="press-clip-head">
            <div className="press-rules" aria-hidden="true">
              <span />
              <span />
            </div>
            <h1 className="press-clip-title">{item.title}</h1>
            <p className="press-byline">
              <span>{item.media}</span>
              {showDate ? (
                <>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={item.dateIso}>{item.date}</time>
                </>
              ) : null}
            </p>
          </header>

          <figure className="press-clip-figure">
            <div className="press-clip-photo">
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 52rem, 100vw"
                  className="object-cover"
                />
              ) : (
                <RevealImage alt="" year={year} sizes="(min-width: 1024px) 52rem, 100vw" priority />
              )}
            </div>
            <figcaption className="press-caption">
              Publicado en {item.media}
              {showDate ? (
                <>
                  <span aria-hidden="true">, </span>
                  <time dateTime={item.dateIso}>{item.date}</time>
                </>
              ) : null}
              .
            </figcaption>
          </figure>

          <p className="press-clip-action">
            <a
              href={item.url}
              rel="noreferrer"
              className="press-external"
            >
              {`Leer en ${item.media}`}
              <span aria-hidden="true"> →</span>
            </a>
          </p>
        </div>
      </div>

      {also.length > 0 ? (
        <section
          aria-labelledby="prensa-relacionada-heading"
          className="press-also"
        >
          <div className="editorial-shell">
            <div className="col-span-4 md:col-span-8 lg:col-span-12">
              <h2 id="prensa-relacionada-heading" className="press-rail-label">
                También en esta edición
              </h2>
              <ul className="press-also-list">
                {also.map((relatedItem) => {
                  const relatedDate = !isPendingCopy(relatedItem.date)

                  return (
                    <li key={relatedItem.slug}>
                      <Link
                        href={`/prensa/${relatedItem.slug}`}
                        className="press-hit group"
                      >
                        <p className="press-byline">
                          <span>{relatedItem.media}</span>
                          {relatedDate ? (
                            <>
                              <span aria-hidden="true"> · </span>
                              <time dateTime={relatedItem.dateIso}>
                                {relatedItem.date}
                              </time>
                            </>
                          ) : null}
                        </p>
                        <p className="press-also-title press-story-title">
                          {relatedItem.title}
                        </p>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </section>
      ) : null}
    </article>
  )
}
