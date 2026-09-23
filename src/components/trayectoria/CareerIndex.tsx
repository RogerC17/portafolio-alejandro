import { careerPeriod, type CareerEvent } from "@/data/career"

type CareerIndexProps = {
  events: CareerEvent[]
  selectedId: string
  name: string
  legend: string
  onSelect: (id: string) => void
}

export function CareerIndex({
  events,
  selectedId,
  name,
  legend,
  onSelect,
}: CareerIndexProps) {
  return (
    <fieldset className="col-span-4 min-w-0 lg:col-span-12">
      <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
        {legend}
      </legend>
      <ul className="project-index mt-[var(--space-md)] max-h-[min(28rem,52vh)] overflow-y-auto border-y border-[var(--border)]">
        {events.map((event) => {
          const selected = event.id === selectedId
          const period = careerPeriod(event)

          return (
            <li key={event.id} className="border-b border-[var(--border)] last:border-b-0">
              <label
                id={`trayectoria-indice-${event.id}`}
                className="press-row group relative grid min-h-11 min-w-0 cursor-pointer grid-cols-4 items-center gap-[var(--grid-gutter)] py-[var(--space-md)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-4px] has-[:focus-visible]:outline-[var(--ring)] md:grid-cols-8 lg:grid-cols-12"
              >
                <input
                  type="radio"
                  name={name}
                  value={event.id}
                  checked={selected}
                  onChange={() => onSelect(event.id)}
                  aria-controls="evento-actual"
                  className="absolute inset-0 cursor-pointer appearance-none focus-visible:outline-none"
                />
                <span
                  className={`pointer-events-none relative col-span-2 min-w-0 font-mono text-[0.6875rem] break-words tabular-nums tracking-[0.16em] ${
                    selected ? "font-bold text-foreground" : "text-muted"
                  }`}
                >
                  {period}
                </span>
                <span
                  className={`pointer-events-none relative col-span-2 min-w-0 text-[1.0625rem] leading-snug break-words md:col-span-3 lg:col-span-5 ${
                    selected
                      ? "font-semibold text-foreground"
                      : "font-medium text-foreground"
                  }`}
                >
                  {event.title}
                </span>
                <span
                  className={`pointer-events-none relative col-span-4 min-w-0 font-mono text-[0.6875rem] break-words tracking-[0.16em] uppercase md:col-span-3 lg:col-span-5 ${
                    selected ? "text-foreground" : "text-muted"
                  }`}
                >
                  {event.institution ?? event.category}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}
