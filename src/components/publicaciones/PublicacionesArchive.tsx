import Link from "next/link"
import { PublicationCover } from "@/components/publicaciones/PublicationCover"
import {
  publicationAuthorsLabel,
  publications,
} from "@/data/publications"
import { archiveLabel } from "@/lib/archive"

export function PublicacionesArchive() {
  return (
    <section
      aria-labelledby="publicaciones-archivo-heading"
      className="pb-[var(--space-3xl)]"
    >
      <h2 id="publicaciones-archivo-heading" className="sr-only">
        Archivo de publicaciones
      </h2>
      <div className="flex flex-col">
        {publications.map((publication, index) => {
          const imageLeft = index % 2 === 0

          return (
            <article
              key={publication.slug}
              className="border-t border-[var(--border)]"
            >
              <Link
                href={`/publicaciones/${publication.slug}`}
                className="group grid min-h-11 focus-visible:outline-offset-4"
              >
                <div className="editorial-shell">
                  <div
                    className={`relative col-span-4 min-h-[40vh] overflow-hidden bg-surface lg:col-span-5 lg:min-h-[min(45vh,28rem)] ${
                      imageLeft ? "" : "lg:col-start-8"
                    }`}
                  >
                    <PublicationCover
                      publication={publication}
                      priority={index === 0}
                      sizes="(max-width: 1023px) 100vw, 42vw"
                    />
                  </div>
                  <div
                    className={`col-span-4 flex flex-col justify-end gap-[var(--space-sm)] py-[var(--space-xl)] lg:col-span-6 lg:min-h-[min(45vh,28rem)] ${
                      imageLeft
                        ? "lg:col-start-7"
                        : "lg:col-start-1 lg:row-start-1"
                    }`}
                  >
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                      <span className="tabular-nums">
                        {archiveLabel("Obra", index + 1)}
                      </span>
                      <span aria-hidden="true"> · </span>
                      {publication.year}
                      <span aria-hidden="true"> · </span>
                      {publicationAuthorsLabel(publication.authors)}
                      {publication.publisher ? (
                        <>
                          <span aria-hidden="true"> · </span>
                          {publication.publisher}
                        </>
                      ) : null}
                    </p>
                    <h3 className="max-w-[16ch] text-[clamp(1.75rem,2.2vw+1rem,2.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
                      {publication.title}
                    </h3>
                    <p className="editorial-measure text-[1.0625rem] leading-[1.5] text-foreground">
                      {publication.description}
                    </p>
                    <p className="mt-[var(--space-sm)] text-[0.9375rem] font-medium text-foreground">
                      {publication.ctaLabel}
                      <span aria-hidden="true" className="text-foreground">
                        {" "}
                        →
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
