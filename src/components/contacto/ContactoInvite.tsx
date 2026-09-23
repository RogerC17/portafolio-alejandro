import { SocialReelCarousel } from "@/components/home/SocialReelCarousel"
import { SocialOrbs } from "@/components/ui/SocialOrbs"
import { contactCta, contactQuote, contactTitle } from "@/data/contact"

export function ContactoInvite() {
  return (
    <section aria-labelledby="contacto-invitar-heading" className="archive-veil">
      <div className="editorial-shell items-start pb-[var(--space-3xl)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <blockquote className="font-serif text-[clamp(1.5rem,1.6vw+1rem,2.5rem)] font-normal italic leading-[1.2] text-foreground">
            {contactQuote}
          </blockquote>
          <h2
            id="contacto-invitar-heading"
            className="mt-[var(--space-xl)] max-w-[16ch] text-[clamp(2rem,2.2vw+1rem,3rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
          >
            {contactTitle}
          </h2>
          <p className="mt-[var(--space-lg)]">
            <a
              href={contactCta.href}
              rel="noreferrer"
              className="group relative inline-flex min-h-11 items-center gap-2 py-2 text-[0.9375rem] font-medium text-foreground"
            >
              {contactCta.label}
              <span aria-hidden="true" className="text-foreground">
                {" "}
                →
              </span>
              <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
            </a>
          </p>
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
