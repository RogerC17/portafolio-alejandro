import Image from "next/image"
import { focusAreas, type FocusArea } from "@/data/focus-areas"

export function FocusAreas() {
  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="scroll-mt-[var(--header-offset)]"
    >
      <div className="border-t border-[var(--border)] py-[var(--space-lg)] lg:py-[var(--space-xl)]">
        <div className="editorial-shell">
          <div className="col-span-4 md:col-span-8">
            <h2
              id="areas-heading"
              className="text-[clamp(2rem,2.4vw+1rem,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
            >
              Áreas de trabajo
            </h2>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[var(--border)]">
        <div className="editorial-shell items-start gap-y-[var(--space-2xl)] py-[var(--space-2xl)] lg:gap-y-[var(--space-3xl)] lg:py-[var(--space-3xl)]">
          {focusAreas.map((area) => (
            <FocusCard
              key={area.id}
              area={area}
              className="col-span-4 md:col-span-4 lg:col-span-3"
            />
          ))}
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-primary"
        />
      </div>
    </section>
  )
}

function FocusCard({
  area,
  className,
}: {
  area: FocusArea
  className: string
}) {
  return (
    <article
      id={area.id}
      tabIndex={0}
      className={`focus-card scroll-mt-[var(--header-offset)] outline-none ${className}`}
    >
      <div className="focus-card-slide focus-card-slide--media">
        <div className="focus-card-media focus-stripe-media relative h-full w-full overflow-hidden bg-surface">
          <Image
            src={area.image}
            alt={area.alt}
            fill
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 22vw"
            className="object-cover"
            style={{ objectPosition: area.objectPosition }}
          />
          <span
            aria-hidden="true"
            className="focus-card-index pointer-events-none absolute left-[0.85rem] top-[0.85rem] z-[2] font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-signal"
          >
            {area.index}
          </span>
        </div>
      </div>

      <div className="focus-card-slide focus-card-slide--copy">
        <div className="focus-card-copy">
          <p className="font-mono text-[0.6875rem] uppercase tabular-nums tracking-[0.16em] text-muted">
            {area.index}
            <span aria-hidden="true"> · </span>
            {area.register}
          </p>
          <h3 className="text-[clamp(1.35rem,1.4vw+0.7rem,1.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
            {area.title}
          </h3>
          <p className="text-[0.875rem] leading-[1.45] text-muted">{area.lead}</p>
        </div>
      </div>
    </article>
  )
}
