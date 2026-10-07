import { SocialWorkGallery } from "@/components/labor-social/SocialWorkList"
import { TextLink } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { socialWorkItems } from "@/data/social-work"

export function SocialWork() {
  return (
    <section
      id="labor-social"
      aria-labelledby="labor-social-heading"
      className="scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <ScrollReveal className="editorial-shell" distance={52}>
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <h2 id="labor-social-heading" className="home-section-display">
            Labor social
          </h2>
        </div>
        <div className="col-span-4 mt-[var(--space-md)] flex items-end md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-9">
          <TextLink href="/labor-social">Ver labor social</TextLink>
        </div>
      </ScrollReveal>

      <ScrollReveal className="editorial-shell mt-[var(--space-2xl)]" delay={0.08} distance={48}>
        <div className="col-span-4 lg:col-span-12">
          <SocialWorkGallery items={socialWorkItems} />
        </div>
      </ScrollReveal>
    </section>
  )
}
