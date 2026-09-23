import {
  careerPeriod,
  careerPositionLabel,
  type CareerEvent,
} from "@/data/career"

type CareerStageProps = {
  event: CareerEvent
  index: number
  total: number
  onPrevious: () => void
  onNext: () => void
}

export function CareerStage({
  event,
  index,
  total,
  onPrevious,
  onNext,
}: CareerStageProps) {
  const period = careerPeriod(event)
  const position = careerPositionLabel(index, total)
  const atStart = index <= 0
  const atEnd = index >= total - 1

  return (
    <article
      id="evento-actual"
      aria-labelledby="evento-actual-titulo"
      className="scroll-mt-[calc(var(--header-offset)+5.75rem)] border-y border-[var(--border)]"
    >
      <div className="relative grid lg:grid-cols-12">
        <div className="flex min-h-[40vh] flex-col justify-between bg-surface px-[var(--page-gutter)] py-[var(--space-xl)] lg:col-span-5 lg:min-h-[56vh]">
          <p className="font-mono text-[clamp(2.75rem,6vw,6rem)] leading-none tracking-[-0.04em] break-words tabular-nums text-foreground">
            {period}
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {event.category}
          </p>
        </div>

        <div className="flex flex-col justify-end gap-[var(--space-md)] px-[var(--page-gutter)] py-[var(--space-xl)] lg:col-span-7 lg:min-h-[56vh]">
          {event.ongoing ? (
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-signal">
              Activo
            </p>
          ) : null}
          <h3
            id="evento-actual-titulo"
            className="max-w-[22ch] text-[clamp(1.75rem,2.4vw+1rem,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-pretty"
          >
            {event.title}
          </h3>
          {event.institution ? (
            <p className="text-[1.0625rem] leading-[1.5] text-muted">
              {event.institution}
            </p>
          ) : null}
          <p className="editorial-measure text-[1.0625rem] leading-[1.5] text-foreground">
            {event.description}
          </p>
          <nav
            aria-label="Evento en el archivo"
            className="flex flex-wrap items-center gap-x-6 gap-y-1"
          >
            <button
              type="button"
              aria-label="Evento anterior"
              aria-controls="evento-actual"
              disabled={atStart}
              onClick={onPrevious}
              className="group/prev relative min-h-11 min-w-11 py-2 text-[0.9375rem] font-medium text-foreground disabled:text-muted"
            >
              Anterior
              <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover/prev:scale-x-100 group-disabled/prev:hidden" />
            </button>
            <p className="font-mono text-[0.75rem] tabular-nums uppercase tracking-[0.16em] text-muted">
              {position}
            </p>
            <button
              type="button"
              aria-label="Evento siguiente"
              aria-controls="evento-actual"
              disabled={atEnd}
              onClick={onNext}
              className="group/next relative min-h-11 min-w-11 py-2 text-[0.9375rem] font-medium text-foreground disabled:text-muted"
            >
              Siguiente
              <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover/next:scale-x-100 group-disabled/next:hidden" />
            </button>
          </nav>
        </div>
      </div>
    </article>
  )
}
