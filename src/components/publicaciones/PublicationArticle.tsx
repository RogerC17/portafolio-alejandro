import Link from "next/link"
import { PublicationActions } from "@/components/publicaciones/PublicationActions"
import { PublicationCover } from "@/components/publicaciones/PublicationCover"
import {
  publicationAuthorsLabel,
  publications,
  type Publication,
} from "@/data/publications"
import { archiveLabel } from "@/lib/archive"

type PublicationArticleProps = {
  publication: Publication
  related: Publication[]
}

export function PublicationArticle({
  publication,
  related,
}: PublicationArticleProps) {
  const authorsLabel = publicationAuthorsLabel(publication.authors)
  const obraNumber =
    publications.findIndex((item) => item.slug === publication.slug) + 1

  return (
    <article>
      <header className="pt-[calc(var(--header-offset)+var(--space-2xl))]">
        <div className="editorial-shell">
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
            <p>
              <Link
                href="/publicaciones"
                className="group relative inline-flex min-h-11 items-center py-2 text-[0.9375rem] font-medium text-foreground"
              >
                Publicaciones
                <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
              </Link>
            </p>
            <p className="mt-[var(--space-lg)] font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              {obraNumber > 0 ? (
                <>
                  <span className="tabular-nums">
                    {archiveLabel("Obra", obraNumber)}
                  </span>
                  <span aria-hidden="true"> · </span>
                </>
              ) : null}
              <time dateTime={publication.datePublished}>{publication.year}</time>
              <span aria-hidden="true"> · </span>
              {authorsLabel}
              {publication.publisher ? (
                <>
                  <span aria-hidden="true"> · </span>
                  {publication.publisher}
                </>
              ) : null}
            </p>
            <h1 className="mt-[var(--space-lg)] max-w-[16ch] text-[clamp(2rem,3vw+1rem,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              {publication.title}
            </h1>
            <p className="editorial-measure mt-[var(--space-lg)] font-serif text-[clamp(1.25rem,1vw+1rem,1.5rem)] italic leading-[1.4] text-foreground">
              {publication.description}
            </p>
          </div>
        </div>
      </header>

      <figure className="mt-[var(--space-2xl)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[21/9]">
          <PublicationCover
            publication={publication}
            priority
            sizes="100vw"
          />
        </div>
      </figure>

      <div className="editorial-shell py-[var(--space-2xl)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
          {publication.content.map((paragraph) => (
            <p
              key={paragraph}
              className="editorial-measure mt-[var(--space-md)] text-[1.125rem] leading-[1.65] text-foreground first:mt-0"
            >
              {paragraph}
            </p>
          ))}
          <PublicationActions
            buyUrl={publication.buyUrl}
            noteUrl={publication.url}
          />
        </div>
      </div>

      {related.length > 0 ? (
        <section
          aria-labelledby="publicaciones-relacionadas-heading"
          className="border-t border-[var(--border)] py-[var(--space-3xl)]"
        >
          <div className="editorial-shell">
            <h2
              id="publicaciones-relacionadas-heading"
              className="col-span-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] md:col-span-8 lg:col-span-8"
            >
              Publicaciones relacionadas
            </h2>
            <ul className="col-span-4 mt-[var(--space-xl)] flex flex-col gap-[var(--space-lg)] md:col-span-8 lg:col-span-8">
              {related.map((item) => (
                <li
                  key={item.slug}
                  className="border-t border-[var(--border)] pt-[var(--space-md)]"
                >
                  <Link
                    href={`/publicaciones/${item.slug}`}
                    className="group block min-h-11 focus-visible:outline-offset-4"
                  >
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                      <time dateTime={item.datePublished}>{item.year}</time>
                      <span aria-hidden="true"> · </span>
                      {publicationAuthorsLabel(item.authors)}
                    </p>
                    <p className="mt-[var(--space-sm)] max-w-[28ch] text-[1.25rem] font-semibold leading-snug tracking-[-0.02em]">
                      {item.title}
                    </p>
                  </Link>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-[var(--space-sm)] inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-foreground focus-visible:outline-offset-4"
                    >
                      Ver la nota
                      <span className="sr-only">, se abre en otra pestaña</span>
                      <span aria-hidden="true"> →</span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  )
}
