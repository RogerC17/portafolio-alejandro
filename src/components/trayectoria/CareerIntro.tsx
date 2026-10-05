import Image from "next/image"
import { careerLead, careerYearSpan } from "@/data/career"
import { HERO_IMAGE } from "@/data/home"

export function CareerIntro() {
  return (
    <section
      aria-labelledby="trayectoria-heading"
      className="archive-veil pt-[calc(var(--header-offset)+var(--space-2xl))] pb-[var(--space-2xl)]"
    >
      <div className="editorial-shell">
        <div className="col-span-4 md:col-span-5 lg:col-span-7">
          <h1
            id="trayectoria-heading"
            className="text-[clamp(2rem,2.4vw+1rem,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
          >
            Trayectoria
          </h1>
          <p className="editorial-measure mt-[var(--space-lg)] text-[1.0625rem] leading-[1.5] text-foreground">
            {careerLead}
          </p>
          <p className="mt-[var(--space-md)] font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {careerYearSpan}
          </p>
        </div>

        <div className="archive-item relative col-span-4 mt-[var(--space-xl)] aspect-[4/5] overflow-hidden bg-surface md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-9">
          <div className="archive-media absolute inset-0 origin-center">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 33vw"
              className="object-cover object-[center_12%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
