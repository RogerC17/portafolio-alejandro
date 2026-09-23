import Image from "next/image"
import Link from "next/link"
import { RevealImage } from "@/components/ui/RevealImage"
import { isPendingCopy } from "@/lib/content"
import type { PressItem } from "@/data/press"

type PressClippingProps = {
  item: PressItem
  related: PressItem[]
}

export function PressClipping({ item, related }: PressClippingProps) {
  const showDate = !isPendingCopy(item.date)
  const year = item.dateIso?.slice(0, 4)

  return (
    <article>
      <header className="pt-[calc(var(--header-offset)+var(--space-2xl))]">
        <div className="editorial-shell">
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
            <p>
              <Link
                href="/prensa"
                className="group relative inline-flex min-h-11 items-center py-2 text-[0.9375rem] font-medium text-foreground"
              >
                En los medios
                <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
              </Link>
            </p>
            <p className="mt-[var(--space-lg)] font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              {item.media}
              {showDate ? (
                <>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={item.dateIso}>{item.date}</time>
                </>
              ) : null}
            </p>
            <h1 className="mt-[var(--space-lg)] max-w-[22ch] text-[clamp(2rem,3vw+1rem,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              {item.title}
            </h1>
          </div>
        </div>
      </header>

      <figure className="mt-[var(--space-2xl)]">
        <div className="relative aspect-video overflow-hidden bg-surface lg:aspect-[21/9]">
          {item.image ? (
            <div className="archive-item absolute inset-0">
              <div className="archive-media absolute inset-0 origin-center">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0">
              <RevealImage
                alt=""
                year={year}
                sizes="100vw"
                priority
              />
            </div>
          )}
        </div>
      </figure>

      <div className="editorial-shell py-[var(--space-2xl)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
          <a
            href={item.url}
            rel="noreferrer"
            className="group relative inline-flex min-h-11 items-center gap-2 py-2 text-[0.9375rem] font-medium text-foreground"
          >
            {`Leer en ${item.media}`}
            <span aria-hidden="true" className="text-foreground">
              →
            </span>
            <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
          </a>
        </div>
      </div>

      {related.length > 0 ? (
        <section
          aria-labelledby="prensa-relacionada-heading"
          className="border-t border-[var(--border)] py-[var(--space-3xl)]"
        >
          <div className="editorial-shell">
            <h2
              id="prensa-relacionada-heading"
              className="col-span-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] md:col-span-8 lg:col-span-8"
            >
              También en los medios
            </h2>
            <ul className="col-span-4 mt-[var(--space-xl)] flex flex-col gap-[var(--space-lg)] md:col-span-8 lg:col-span-8">
              {related.map((relatedItem) => {
                const relatedDate = !isPendingCopy(relatedItem.date)

                return (
                  <li
                    key={relatedItem.slug}
                    className="border-t border-[var(--border)] pt-[var(--space-md)]"
                  >
                    <Link
                      href={`/prensa/${relatedItem.slug}`}
                      className="group block min-h-11 focus-visible:outline-offset-4"
                    >
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                        {relatedItem.media}
                        {relatedDate ? (
                          <>
                            <span aria-hidden="true"> · </span>
                            <time dateTime={relatedItem.dateIso}>
                              {relatedItem.date}
                            </time>
                          </>
                        ) : null}
                      </p>
                      <p className="mt-[var(--space-sm)] max-w-[28ch] text-[1.25rem] font-semibold leading-snug tracking-[-0.02em]">
                        {relatedItem.title}
                      </p>
                      <p className="mt-[var(--space-sm)] text-[0.9375rem] font-medium text-foreground">
                        Leer
                        <span aria-hidden="true" className="text-foreground">
                          {" "}
                          →
                        </span>
                      </p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  )
}
