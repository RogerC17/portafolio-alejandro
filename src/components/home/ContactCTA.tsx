import { SocialReelCarousel } from "@/components/home/SocialReelCarousel"
import { TextLink } from "@/components/ui/Button"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { SocialOrbs } from "@/components/ui/SocialOrbs"
import { contactChannelNote } from "@/data/contact"
import { CONTACT_CTA, CONTACT_QUOTE, CONTACT_TITLE } from "@/data/home"

type ContactCTAProps = {
  asPage?: boolean
}

export function ContactCTA({ asPage = false }: ContactCTAProps) {
  const Heading = asPage ? "h1" : "h2"

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className={`archive-veil scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)] ${
        asPage ? "pt-[calc(var(--header-offset)+var(--space-3xl))]" : ""
      }`}
    >
      <div className="editorial-shell items-start">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          {asPage ? null : <SectionLabel index="[07]" />}
          <blockquote className="mt-[var(--space-sm)] font-serif text-[clamp(1.5rem,1.6vw+1rem,2.5rem)] font-normal italic leading-[1.2] text-foreground">
            {CONTACT_QUOTE}
          </blockquote>
          <Heading
            id="contacto-heading"
            className="mt-[var(--space-xl)] max-w-[16ch] text-[clamp(2rem,2.2vw+1rem,3rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
          >
            {CONTACT_TITLE}
          </Heading>
          <p className="mt-[var(--space-md)] font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {contactChannelNote}
          </p>
          <div className="mt-[var(--space-lg)]">
            <TextLink href={CONTACT_CTA.href}>{CONTACT_CTA.label}</TextLink>
          </div>
          <div className="mt-[var(--space-xl)]">
            <SocialOrbs size="lg" labeled />
          </div>
        </div>
        <div className="col-span-4 mt-[var(--space-2xl)] md:col-span-8 lg:col-span-7 lg:mt-0">
          <SocialReelCarousel />
        </div>
      </div>
    </section>
  )
}
