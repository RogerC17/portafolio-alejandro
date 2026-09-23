import Image from "next/image"
import Link from "next/link"
import { IdeaMeta } from "@/components/ideas/IdeaMeta"
import { articles } from "@/data/articles"
import { archiveLabel } from "@/lib/archive"

export function IdeasArchive() {
  return (
    <section aria-labelledby="ideas-archivo-heading" className="pb-[var(--space-3xl)]">
      <h2 id="ideas-archivo-heading" className="sr-only">
        Archivo de ideas
      </h2>
      <div className="flex flex-col">
        {articles.map((article, index) => (
          <article
            key={article.slug}
            className="border-t border-[var(--border)]"
          >
            <Link
              href={`/ideas/${article.slug}`}
              className="archive-item group grid min-h-11 focus-visible:outline-offset-4 lg:grid-cols-12"
            >
              <div className="relative aspect-video overflow-hidden bg-surface lg:col-span-5 lg:aspect-auto lg:min-h-[22rem]">
                {article.image ? (
                  <div className="archive-media absolute inset-0 origin-center">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1023px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col justify-end gap-[var(--space-md)] px-[var(--page-gutter)] py-[var(--space-xl)] lg:col-span-7">
                <IdeaMeta
                  record={archiveLabel("Idea", index + 1)}
                  category={article.category}
                  date={article.date}
                  dateIso={article.dateIso}
                  readingTime={article.readingTime}
                />
                <h3 className="max-w-[22ch] text-[clamp(1.5rem,2vw+1rem,2.35rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                  {article.title}
                </h3>
                <p className="editorial-measure text-[1.0625rem] leading-[1.5] text-foreground">
                  {article.excerpt}
                </p>
                <p className="text-[0.9375rem] font-medium text-foreground">
                  Leer
                  <span aria-hidden="true" className="text-foreground">
                    {" "}
                    →
                  </span>
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
