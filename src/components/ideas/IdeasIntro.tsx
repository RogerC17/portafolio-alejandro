import { SectionLabel } from "@/components/ui/SectionLabel"
import { ideasLead } from "@/data/articles"

export function IdeasIntro() {
  return (
    <section
      aria-labelledby="ideas-heading"
      className="archive-veil pt-[calc(var(--header-offset)+var(--space-2xl))] pb-[var(--space-xl)]"
    >
      <div className="editorial-shell">
        <div className="col-span-4 md:col-span-6 lg:col-span-8">
          <SectionLabel index="[04]" />
          <h1
            id="ideas-heading"
            className="mt-[var(--space-sm)] text-[clamp(2rem,2.4vw+1rem,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
          >
            Ideas
          </h1>
          <p className="editorial-measure mt-[var(--space-lg)] text-[1.0625rem] leading-[1.5] text-foreground">
            {ideasLead}
          </p>
        </div>
      </div>
    </section>
  )
}
