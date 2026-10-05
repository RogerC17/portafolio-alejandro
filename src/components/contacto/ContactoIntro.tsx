import { contactLead, contactChannelNote } from "@/data/contact"

export function ContactoIntro() {
  return (
    <section
      aria-labelledby="contacto-heading"
      className="archive-veil pt-[calc(var(--header-offset)+var(--space-2xl))] pb-[var(--space-xl)]"
    >
      <div className="editorial-shell">
        <div className="col-span-4 md:col-span-6 lg:col-span-8">
          <h1
            id="contacto-heading"
            className="text-[clamp(2rem,2.4vw+1rem,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
          >
            Contacto
          </h1>
          <p className="editorial-measure mt-[var(--space-lg)] text-[1.0625rem] leading-[1.5] text-foreground">
            {contactLead}
          </p>
          <p className="mt-[var(--space-md)] font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {contactChannelNote}
          </p>
        </div>
      </div>
    </section>
  )
}
