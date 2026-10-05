import { TextLink } from "@/components/ui/Button"
import { AnimatedText } from "@/components/ui/AnimatedText"
import { SITE_ROLE } from "@/data/site"
import {
  HERO_LEAD,
  HERO_METADATA,
  HERO_NAME_LINES,
  HERO_PRIMARY_CTA,
} from "@/data/home"
import { HeroMedia } from "./HeroMedia"

export function Hero() {
  return (
    <section
      aria-labelledby="hero-name"
      className="hero archive-veil home-cine-hero relative isolate h-svh max-h-svh overflow-hidden"
    >
      <div className="hero-media-frame">
        <HeroMedia />
      </div>

      <div className="hero-cover editorial-shell pointer-events-none relative z-[2]">
        <div className="hero-cover-main pointer-events-auto col-span-4 flex flex-col gap-[var(--space-sm)] md:col-span-8 lg:col-span-6 lg:col-start-1">
          <AnimatedText
            id="hero-name"
            lines={HERO_NAME_LINES}
            className="hero-name font-extrabold uppercase leading-[0.88] tracking-[-0.04em]"
          />
          <p className="hero-cover-role text-[clamp(0.9375rem,0.2vw+0.9rem,1.0625rem)] leading-snug text-foreground">
            {SITE_ROLE}
          </p>
          <p className="hero-cover-lead editorial-measure">
            “{HERO_LEAD}”
          </p>
          <div className="hero-cover-ctas flex flex-col items-start gap-1 pt-[var(--space-xs)] sm:flex-row sm:gap-8">
            <TextLink href={HERO_PRIMARY_CTA.href}>
              {HERO_PRIMARY_CTA.label}
            </TextLink>
          </div>
        </div>

        <ul
          aria-label="Señales"
          className="hero-cover-folio pointer-events-none col-span-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted md:col-span-8 lg:col-span-6"
        >
          {HERO_METADATA.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
