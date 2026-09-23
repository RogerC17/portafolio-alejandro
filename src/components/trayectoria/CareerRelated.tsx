import { TextLink } from "@/components/ui/Button"
import { careerRelated } from "@/data/career"

export function CareerRelated() {
  return (
    <section
      aria-labelledby="trayectoria-continuar-heading"
      className="border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <div className="editorial-shell">
        <h2
          id="trayectoria-continuar-heading"
          className="col-span-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] md:col-span-8 lg:col-span-8"
        >
          Proyectos, ideas y publicaciones
        </h2>
        <div className="col-span-4 mt-[var(--space-lg)] flex flex-col items-start gap-1 sm:flex-row sm:gap-8 md:col-span-8">
          {careerRelated.map((item) => (
            <TextLink key={item.href} href={item.href}>
              {item.label}
            </TextLink>
          ))}
        </div>
      </div>
    </section>
  )
}
