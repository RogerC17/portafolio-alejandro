import Link from "next/link"
import { PublicationActions } from "@/components/publicaciones/PublicationActions"
import { PublicationBook3D } from "@/components/home/PublicationBook3D"
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
          const detailHref = `/publicaciones/${publication.slug}`

          return (
            <article
              key={publication.slug}
              className="border-t border-[var(--border)]"
            >
              <div className="editorial-shell">
                <Link
                  href={detailHref}
                  className={`relative col-span-4 flex items-center justify-center py-[var(--space-xl)] focus-visible:outline-offset-4 lg:col-span-5 lg:min-h-[min(45vh,28rem)] ${
                    imageLeft ? "" : "lg:col-start-8"
                  }`}
                >
                  <PublicationBook3D
                    publication={publication}
                    focusable={false}
                  />
                </Link>
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
                    <Link
                      href={detailHref}
                      className="focus-visible:outline-offset-4"
                    >
                      {publication.title}
                    </Link>
                  </h3>
                  <p className="editorial-measure text-[1.0625rem] leading-[1.5] text-foreground">
                    {publication.description}
                  </p>
                  <PublicationActions
                    buyUrl={publication.buyUrl}
                    noteUrl={publication.url}
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
