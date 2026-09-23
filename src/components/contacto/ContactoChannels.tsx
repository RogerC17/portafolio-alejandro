import { SocialReelCarousel } from "@/components/home/SocialReelCarousel"
import { SocialOrbs } from "@/components/ui/SocialOrbs"

export function ContactoChannels() {
  return (
    <section
      aria-labelledby="contacto-canales-heading"
      className="pb-[var(--space-3xl)]"
    >
      <div className="editorial-shell">
        <h2
          id="contacto-canales-heading"
          className="col-span-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] md:col-span-8 lg:col-span-8"
        >
          Canales
        </h2>
        <div className="col-span-4 mt-[var(--space-xl)] lg:col-span-12">
          <SocialReelCarousel />
        </div>
        <div className="col-span-4 mt-[var(--space-xl)] lg:col-span-12">
          <SocialOrbs size="lg" labeled />
        </div>
      </div>
    </section>
  )
}
