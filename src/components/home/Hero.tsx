import { TextLink } from "@/components/ui/Button"
import { AnimatedText } from "@/components/ui/AnimatedText"
import { SITE_ROLE } from "@/data/site"
import {
  HERO_ARCHIVE_MARK,
  HERO_INDEX,
  HERO_LEAD,
  HERO_METADATA,
  HERO_NAME_LINES,
  HERO_PRIMARY_CTA,
  HERO_REGISTER,
  HERO_SECONDARY_CTA,
} from "@/data/home"
import { HeroMedia } from "./HeroMedia"

export function Hero() {
  return (
    <section
      aria-labelledby="hero-name"
      className="hero archive-veil relative isolate min-h-svh overflow-x-clip"
    >
      <div className="hero-media-frame">
        <HeroMedia />
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-[var(--space-sm)] right-[max(var(--page-gutter),var(--safe-right))] hidden font-mono text-[0.625rem] uppercase leading-[1.4] tracking-[0.16em] text-foreground/70 lg:block"
        >
          {HERO_ARCHIVE_MARK.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className="editorial-shell pointer-events-none relative z-[2] pt-[calc(56vh+var(--space-md))] pb-[var(--space-2xl)] lg:min-h-svh lg:grid-rows-[auto_1fr_auto] lg:pt-[calc(var(--header-offset)+var(--space-lg))] lg:pb-[var(--space-2xl)]">
        <div className="hero-copy pointer-events-auto col-span-4 md:col-span-8 lg:col-span-8 lg:row-start-1">
          <AnimatedText
            id="hero-name"
            lines={HERO_NAME_LINES}
            className="hero-name font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
          />
          <p className="mt-[var(--space-md)] text-[clamp(1.0625rem,0.3vw+1rem,1.25rem)] leading-normal text-foreground">
            {SITE_ROLE}
          </p>
        </div>

        <div className="hero-copy pointer-events-auto col-span-4 mt-[var(--space-xl)] border-t border-border pt-[var(--space-lg)] md:col-span-8 lg:col-span-8 lg:row-start-2 lg:mt-0 lg:self-center">
          <div className="flex flex-col gap-[var(--space-lg)] sm:flex-row sm:items-start sm:justify-between sm:gap-[var(--space-xl)]">
            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3">
              {HERO_REGISTER.map((item) => (
                <div key={item.key} className="contents">
                  <dt className="font-mono text-[0.6875rem] uppercase leading-[1.4] tracking-[0.16em] text-muted">
                    {item.key}
                  </dt>
                  <dd className="flex items-center gap-2 text-[0.9375rem] leading-[1.4] text-foreground">
                    {"live" in item && item.live ? (
                      <span
                        aria-hidden="true"
                        className="hero-signal size-1.5 shrink-0 bg-signal"
                      />
                    ) : null}
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <nav aria-label="Entrada al archivo">
              <ol className="flex flex-col gap-1">
                {HERO_INDEX.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group relative inline-flex min-h-11 items-baseline gap-3 py-1 text-foreground"
                    >
                      <span className="font-mono text-[0.6875rem] uppercase tabular-nums tracking-[0.16em] text-muted">
                        {item.index}
                      </span>
                      <span className="text-[0.9375rem] font-medium tracking-[-0.02em]">
                        {item.label}
                      </span>
                      <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        <div className="pointer-events-auto col-span-4 mt-[var(--space-lg)] flex flex-col gap-[var(--space-md)] md:col-span-8 lg:col-span-5 lg:row-start-3 lg:mt-0 lg:self-end">
          <p className="editorial-measure text-[clamp(1.0625rem,0.3vw+1rem,1.25rem)] leading-[1.5] text-foreground">
            {HERO_LEAD}
          </p>
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:gap-8">
            <TextLink href={HERO_PRIMARY_CTA.href}>
              {HERO_PRIMARY_CTA.label}
            </TextLink>
            <TextLink href={HERO_SECONDARY_CTA.href} variant="secondary">
              {HERO_SECONDARY_CTA.label}
            </TextLink>
          </div>
          <ul className="flex flex-col gap-1 font-mono text-[0.6875rem] uppercase leading-[1.3] tracking-[0.16em] text-muted">
            {HERO_METADATA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
