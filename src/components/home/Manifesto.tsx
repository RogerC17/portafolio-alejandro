import { ManifestoBody } from "./ManifestoBody"
import { MANIFESTO_INDEX } from "@/data/home"

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      aria-labelledby="manifiesto-heading"
      className="scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <div className="editorial-shell">
        <p className="col-span-4 font-mono text-[0.6875rem] uppercase leading-[1.3] tracking-[0.16em] text-muted md:col-span-2 lg:col-span-2">
          <span className="block">{MANIFESTO_INDEX}</span>
          <span className="block">Manifiesto</span>
        </p>
        <ManifestoBody />
      </div>
    </section>
  )
}
