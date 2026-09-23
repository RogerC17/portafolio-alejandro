import Image from "next/image"
import Link from "next/link"
import { articles, type Article, type ArticleBlock } from "@/data/articles"
import { IdeaMeta } from "@/components/ideas/IdeaMeta"
import { archiveLabel } from "@/lib/archive"

type IdeaArticleProps = {
  article: Article
  related: Article[]
}

export function IdeaArticle({ article, related }: IdeaArticleProps) {
  const ideaNumber = articles.findIndex((item) => item.slug === article.slug) + 1

  return (
    <article>
      <header className="pt-[calc(var(--header-offset)+var(--space-2xl))]">
        <div className="editorial-shell">
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
            <p>
              <Link
                href="/ideas"
                className="group relative inline-flex min-h-11 items-center py-2 text-[0.9375rem] font-medium text-foreground"
              >
                Ideas
                <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
              </Link>
            </p>
            <div className="mt-[var(--space-lg)]">
              <IdeaMeta
                record={ideaNumber > 0 ? archiveLabel("Idea", ideaNumber) : undefined}
                category={article.category}
                date={article.date}
                dateIso={article.dateIso}
                readingTime={article.readingTime}
                author={article.author}
              />
            </div>
            <h1 className="mt-[var(--space-lg)] max-w-[22ch] text-[clamp(2rem,3vw+1rem,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              {article.title}
            </h1>
            <p className="editorial-measure mt-[var(--space-lg)] font-serif text-[clamp(1.25rem,1vw+1rem,1.5rem)] italic leading-[1.4] text-foreground">
              {article.excerpt}
            </p>
          </div>
        </div>
      </header>

      <figure className="mt-[var(--space-2xl)]">
        <div className="archive-item relative aspect-[16/9] overflow-hidden bg-surface lg:aspect-[21/9]">
          {article.image ? (
            <div className="archive-media absolute inset-0 origin-center">
              <Image
                src={article.image}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </figure>

      <div className="editorial-shell py-[var(--space-2xl)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
          <IdeaBody content={article.content} />
        </div>
      </div>

      {related.length > 0 ? (
        <section
          aria-labelledby="ideas-relacionadas-heading"
          className="border-t border-[var(--border)] py-[var(--space-3xl)]"
        >
          <div className="editorial-shell">
            <h2
              id="ideas-relacionadas-heading"
              className="col-span-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] md:col-span-8 lg:col-span-8"
            >
              Ideas relacionadas
            </h2>
            <ul className="col-span-4 mt-[var(--space-xl)] flex flex-col gap-[var(--space-lg)] md:col-span-8 lg:col-span-8">
              {related.map((item) => (
                <li key={item.slug} className="border-t border-[var(--border)] pt-[var(--space-md)]">
                  <Link
                    href={`/ideas/${item.slug}`}
                    className="group block min-h-11 focus-visible:outline-offset-4"
                  >
                    <IdeaMeta
                      category={item.category}
                      date={item.date}
                      dateIso={item.dateIso}
                      readingTime={item.readingTime}
                    />
                    <p className="mt-[var(--space-sm)] max-w-[28ch] text-[1.25rem] font-semibold leading-snug tracking-[-0.02em]">
                      {item.title}
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
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  )
}

function IdeaBody({ content }: { content: ArticleBlock[] }) {
  return (
    <div className="flex flex-col">
      {content.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p
                key={index}
                className="editorial-measure mt-[var(--space-md)] text-[1.125rem] leading-[1.65] text-foreground first:mt-0"
              >
                {block.text}
              </p>
            )
          case "h2":
            return (
              <h2
                key={index}
                className="mt-[var(--space-xl)] max-w-[22ch] text-[clamp(1.5rem,1.4vw+1rem,2rem)] font-extrabold leading-[1.15] tracking-[-0.03em]"
              >
                {block.text}
              </h2>
            )
          case "h3":
            return (
              <h3
                key={index}
                className="mt-[var(--space-lg)] max-w-[28ch] text-[1.25rem] font-semibold leading-snug tracking-[-0.02em]"
              >
                {block.text}
              </h3>
            )
          case "ul":
            return (
              <ul
                key={index}
                className="editorial-measure mt-[var(--space-md)] list-disc space-y-2 pl-6 text-[1.125rem] leading-[1.65] text-foreground"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
        }
      })}
    </div>
  )
}
