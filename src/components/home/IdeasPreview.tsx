import { ArticleCard } from "@/components/ui/ArticleCard"
import { TextLink } from "@/components/ui/Button"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { articles } from "@/data/articles"

export function IdeasPreview() {
  const [featured, ...rest] = articles

  if (!featured) return null

  return (
    <section
      id="ideas"
      aria-labelledby="ideas-heading"
      className="scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <div className="editorial-shell">
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <SectionLabel index="[04]" />
          <h2
            id="ideas-heading"
            className="mt-[var(--space-sm)] text-[clamp(2rem,2.4vw+1rem,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
          >
            Ideas
          </h2>
        </div>
        <div className="col-span-4 mt-[var(--space-md)] flex items-end md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-9">
          <TextLink href="/ideas">Explorar ideas</TextLink>
        </div>
      </div>

      <div className="editorial-shell mt-[var(--space-2xl)] items-start gap-y-[var(--space-xl)]">
        <ArticleCard article={featured} variant="featured" index={1} />
        <div className="col-span-4 flex flex-col gap-[var(--space-lg)] lg:col-span-4">
          {rest.map((article, index) => (
            <ArticleCard
              key={article.slug}
              article={article}
              index={index + 2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
