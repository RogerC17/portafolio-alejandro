import { SectionLabel } from "@/components/ui/SectionLabel"
import { pressLead } from "@/data/press"

export function PrensaIntro() {
  return (
    <section
      aria-labelledby="prensa-heading"
      className="archive-veil pt-[calc(var(--header-offset)+var(--space-2xl))] pb-[var(--space-xl)]"
    >
      <div className="editorial-shell">
        <div className="col-span-4 md:col-span-6 lg:col-span-8">
          <SectionLabel index="[06]" />
          <h1
            id="prensa-heading"
            className="mt-[var(--space-sm)] text-[clamp(2rem,2.4vw+1rem,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
          >
            En los medios
          </h1>
          <p className="editorial-measure mt-[var(--space-lg)] text-[1.0625rem] leading-[1.5] text-foreground">
            {pressLead}
          </p>
        </div>
      </div>
    </section>
  )
}
