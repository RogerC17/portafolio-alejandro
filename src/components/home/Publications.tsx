import Image from "next/image"
import { TextLink } from "@/components/ui/Button"
import { RevealImage } from "@/components/ui/RevealImage"
import { SectionLabel } from "@/components/ui/SectionLabel"
import {
  publicationAuthorsLabel,
  publications,
} from "@/data/publications"
import { archiveLabel } from "@/lib/archive"

export function Publications() {
  return (
    <section
      id="publicaciones"
      aria-labelledby="publicaciones-heading"
      className="scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <div className="editorial-shell">
        <div className="col-span-4 lg:col-span-12">
          <SectionLabel index="[05]" />
          <h2
            id="publicaciones-heading"
            className="mt-[var(--space-sm)] text-[clamp(2rem,2.4vw+1rem,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
          >
            Publicaciones
          </h2>
        </div>
        <div className="col-span-4 mt-[var(--space-md)] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:items-end">
          <TextLink href="/publicaciones">Ver publicaciones</TextLink>
        </div>
      </div>

      <div className="mt-[var(--space-2xl)]">
        {publications.map((publication, index) => {
          const cover = publication.cover
          const provenance = [
            publicationAuthorsLabel(publication.authors),
            publication.publisher,
          ]
            .filter(Boolean)
            .join(" · ")

          return (
            <article
              key={publication.slug}
              className="border-t border-[var(--border)]"
            >
              <div className="editorial-shell items-center py-[var(--space-xl)]">
                <div className="relative col-span-4 min-h-[14rem] overflow-hidden bg-surface lg:col-span-3 lg:min-h-[16rem]">
                  {cover ? (
                    <div className="archive-item absolute inset-0">
                      <div className="archive-media absolute inset-0 flex origin-center items-center justify-center p-[var(--space-md)]">
                        <Image
                          src={cover}
                          alt=""
                          fill
                          sizes="(max-width: 1023px) 100vw, 25vw"
                          className="object-contain p-[var(--space-md)]"
                        />
                      </div>
                    </div>
                  ) : (
                    <RevealImage
                      alt=""
                      year={publication.year}
                      sizes="(max-width: 1023px) 100vw, 25vw"
                    />
                  )}
                </div>

                <div className="col-span-4 flex flex-col justify-center gap-[var(--space-sm)] pt-[var(--space-lg)] lg:col-span-8 lg:col-start-5 lg:pt-0">
                  <p className="font-mono text-[0.6875rem] uppercase tabular-nums tracking-[0.16em] text-muted">
                    {archiveLabel("Obra", index + 1)}
                    <span aria-hidden="true"> · </span>
                    {publication.year}
                  </p>
                  <h3 className="max-w-[16ch] text-[clamp(1.5rem,2vw+1rem,2.35rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                    {publication.title}
                  </h3>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                    {provenance}
                  </p>
                  <p className="editorial-measure text-[1.0625rem] leading-[1.5] text-foreground">
                    {publication.description}
                  </p>
                  {publication.url ? (
                    <div className="mt-[var(--space-sm)]">
                      <TextLink href={publication.url}>
                        {publication.ctaLabel}
                      </TextLink>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
