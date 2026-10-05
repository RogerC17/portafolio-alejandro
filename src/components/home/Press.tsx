import { TextLink } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { PressDossier } from "@/components/home/PressDossier"
import { homePressItems } from "@/data/press"

export function Press() {
  return (
    <section
      id="prensa"
      aria-labelledby="prensa-heading"
      className="scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <ScrollReveal className="editorial-shell" distance={52}>
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <h2
            id="prensa-heading"
            className="home-section-display"
          >
            En los medios
          </h2>
        </div>
        <div className="col-span-4 mt-[var(--space-md)] flex items-end md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-9">
          <TextLink href="/prensa">Ver sala de prensa</TextLink>
        </div>
      </ScrollReveal>

      <ScrollReveal
        className="editorial-shell mt-[var(--space-2xl)]"
        delay={0.1}
        distance={64}
      >
        <div className="col-span-4 lg:col-span-12">
          <PressDossier items={homePressItems} />
        </div>
      </ScrollReveal>
    </section>
  )
}
