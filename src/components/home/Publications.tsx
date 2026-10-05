import { PublicationActions } from "@/components/publicaciones/PublicationActions"
import { TextLink } from "@/components/ui/Button"
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/ScrollReveal"
import { PublicationBook3D } from "@/components/home/PublicationBook3D"
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
      <ScrollReveal className="editorial-shell" distance={52}>
        <div className="col-span-4 lg:col-span-12">
          <h2
            id="publicaciones-heading"
            className="home-section-display"
          >
            Publicaciones
          </h2>
        </div>
        <div className="col-span-4 mt-[var(--space-md)] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:items-end">
          <TextLink href="/publicaciones">Ver publicaciones</TextLink>
        </div>
      </ScrollReveal>

      <div className="mt-[var(--space-2xl)]">
        {publications.map((publication, index) => {
          const provenance = [
            publicationAuthorsLabel(publication.authors),
            publication.publisher,
          ]
            .filter(Boolean)
            .join(" · ")

          return (
            <ScrollRevealItem key={publication.slug} index={index} distance={56}>
              <article className="border-t border-[var(--border)]">
                <div className="editorial-shell items-center py-[var(--space-xl)]">
                  <div className="col-span-4 flex justify-center lg:col-span-3 lg:justify-start">
                    <PublicationBook3D publication={publication} />
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
                    <PublicationActions
                      buyUrl={publication.buyUrl}
                      noteUrl={publication.url}
                    />
                  </div>
                </div>
              </article>
            </ScrollRevealItem>
          )
        })}
      </div>
    </section>
  )
}
