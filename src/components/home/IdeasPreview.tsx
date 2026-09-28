import Link from "next/link"
import { TextLink } from "@/components/ui/Button"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { isPendingCopy } from "@/lib/content"
import { archiveLabel } from "@/lib/archive"
import { articles } from "@/data/articles"

const HOME_IDEAS_LIMIT = 3

export function IdeasPreview() {
  const preview = articles.slice(0, HOME_IDEAS_LIMIT)

  if (preview.length === 0) return null

  return (
    <section
      id="ideas"
      aria-labelledby="ideas-heading"
      className="scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <ScrollReveal className="editorial-shell" distance={52}>
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <SectionLabel index="[04]" />
          <h2
            id="ideas-heading"
            className="home-section-display mt-[var(--space-sm)]"
          >
            Ideas
          </h2>
        </div>
        <div className="col-span-4 mt-[var(--space-md)] flex items-end md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-9">
          <TextLink href="/ideas">Explorar ideas</TextLink>
        </div>
      </ScrollReveal>

      <div className="editorial-shell mt-[var(--space-2xl)]">
        <ol className="ideas-essay col-span-4 lg:col-span-12">
          {preview.map((article, index) => {
            const showReadingTime = !isPendingCopy(article.readingTime)

            return (
              <li key={article.slug} className="ideas-essay-item">
                <ScrollReveal
                  delay={Math.min(index * 0.08, 0.32)}
                  distance={48}
                >
                  <Link
                    href={`/ideas/${article.slug}`}
                    className="ideas-essay-link"
                  >
                    <p className="ideas-essay-meta">
                      <span className="tabular-nums">
                        {archiveLabel("Idea", index + 1)}
                      </span>
                      <span aria-hidden="true"> · </span>
                      <span>{article.category}</span>
                      <span aria-hidden="true"> · </span>
                      <time dateTime={article.dateIso}>{article.date}</time>
                      {showReadingTime ? (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span>{article.readingTime}</span>
                        </>
                      ) : null}
                    </p>
                    <h3 className="ideas-essay-title">{article.title}</h3>
                    <p className="ideas-essay-excerpt">{article.excerpt}</p>
                    <span className="ideas-essay-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </ScrollReveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
