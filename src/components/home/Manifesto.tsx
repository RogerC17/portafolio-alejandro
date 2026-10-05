import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { ManifestoBody } from "./ManifestoBody"
export function Manifesto() {
  return (
    <section
      id="manifiesto"
      aria-labelledby="manifiesto-heading"
      className="scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <div className="editorial-shell">
        <ScrollReveal
          className="col-span-4 md:col-span-2 lg:col-span-2"
          distance={32}
        >
          <p className="font-mono text-[0.6875rem] uppercase leading-[1.3] tracking-[0.16em] text-muted">
            Manifiesto
          </p>
        </ScrollReveal>
        <ManifestoBody />
      </div>
    </section>
  )
}
