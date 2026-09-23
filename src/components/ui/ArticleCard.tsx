import Link from "next/link"
import Image from "next/image"
import { isPendingCopy } from "@/lib/content"
import { archiveLabel } from "@/lib/archive"
import type { Article } from "@/data/articles"

type ArticleCardProps = {
  article: Article
  variant?: "featured" | "index"
  index?: number
}

export function ArticleCard({
  article,
  variant = "index",
  index,
}: ArticleCardProps) {
  const featured = variant === "featured"
  const href = `/ideas/${article.slug}`
  const showReadingTime = !isPendingCopy(article.readingTime)

  return (
    <article className={featured ? "col-span-4 lg:col-span-8" : "block"}>
      <Link
        href={href}
        className="group block min-h-11 focus-visible:outline-offset-4"
      >
        {featured && article.image ? (
          <figure className="flex flex-col gap-[var(--space-md)]">
            <div className="archive-item relative aspect-video overflow-hidden bg-surface">
              <div className="archive-media absolute inset-0 origin-center">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="flex flex-col gap-[var(--space-sm)]">
              <ArticleMeta
                category={article.category}
                date={article.date}
                readingTime={showReadingTime ? article.readingTime : undefined}
                index={index}
              />
              <h3 className="max-w-[22ch] text-[clamp(1.5rem,2vw+1rem,2.35rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                {article.title}
              </h3>
              <p className="editorial-measure text-[1.0625rem] leading-[1.5] text-foreground">
                {article.excerpt}
              </p>
            </figcaption>
          </figure>
        ) : (
          <div className="flex flex-col gap-[var(--space-sm)] border-t border-[var(--border)] pt-[var(--space-md)]">
            <ArticleMeta
              category={article.category}
              date={article.date}
              readingTime={showReadingTime ? article.readingTime : undefined}
              index={index}
            />
            <h3 className="text-[1.125rem] font-semibold leading-snug tracking-[-0.02em]">
              {article.title}
            </h3>
          </div>
        )}
      </Link>
    </article>
  )
}

function ArticleMeta({
  category,
  date,
  readingTime,
  index,
}: {
  category: string
  date: string
  readingTime?: string
  index?: number
}) {
  return (
    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
      {index ? (
        <>
          <span className="tabular-nums">{archiveLabel("Idea", index)}</span>
          <span aria-hidden="true"> · </span>
        </>
      ) : null}
      {category}
      <span aria-hidden="true"> · </span>
      <time>{date}</time>
      {readingTime ? (
        <>
          <span aria-hidden="true"> · </span>
          <span>{readingTime}</span>
        </>
      ) : null}
    </p>
  )
}
