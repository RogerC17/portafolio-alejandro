import {
  careerCanalHonors,
  careerSeminars,
} from "@/data/career"

export function CareerSeminars() {
  return (
    <section
      aria-labelledby="formacion-complementaria-heading"
      className="border-t border-[var(--border)] py-[var(--space-2xl)]"
    >
      <div className="editorial-shell">
        <h3
          id="formacion-complementaria-heading"
          className="col-span-4 text-[clamp(1.5rem,1.6vw+1rem,2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] md:col-span-8 lg:col-span-4"
        >
          Diplomados y seminarios
        </h3>
        <ul className="col-span-4 mt-[var(--space-lg)] flex flex-col border-t border-[var(--border)] md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
          {careerSeminars.map((seminar) => (
            <li
              key={seminar.title}
              className="border-b border-[var(--border)] py-[var(--space-md)]"
            >
              <p className="text-[1.0625rem] leading-snug font-medium">
                {seminar.title}
              </p>
              {seminar.institution ? (
                <p className="mt-[var(--space-sm)] font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                  {seminar.institution}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function CareerCanalHonors() {
  return (
    <section
      aria-labelledby="canal-reconocimientos-heading"
      className="border-t border-[var(--border)] py-[var(--space-2xl)]"
    >
      <div className="editorial-shell">
        <h3
          id="canal-reconocimientos-heading"
          className="col-span-4 text-[clamp(1.5rem,1.6vw+1rem,2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] md:col-span-8 lg:col-span-4"
        >
          Canal Trece
        </h3>
        <p className="editorial-measure col-span-4 mt-[var(--space-lg)] text-[1.0625rem] leading-[1.5] text-foreground md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
          {careerCanalHonors}
        </p>
      </div>
    </section>
  )
}
