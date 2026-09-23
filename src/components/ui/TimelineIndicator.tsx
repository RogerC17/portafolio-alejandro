type TimelineIndicatorProps = {
  years: string[]
  activeYear: string
  signal?: boolean
}

export function GlobalTimelineIndicator({
  years,
  activeYear,
  signal = false,
}: TimelineIndicatorProps) {
  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed top-1/2 right-[max(0.5rem,var(--safe-right))] z-[var(--z-timeline)] hidden -translate-y-1/2 xl:block"
    >
      <ol className="flex flex-col items-end font-mono text-[0.6875rem] leading-none tracking-[0.08em] text-muted">
        {years.map((year, index) => {
          const active = year === activeYear

          return (
            <li key={year} className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span
                  className={`tabular-nums ${
                    active ? "font-medium text-foreground" : ""
                  }`}
                >
                  {year}
                </span>
                <span
                  className={`block size-1 rounded-full ${
                    active
                      ? signal
                        ? "bg-signal"
                        : "bg-primary"
                      : "bg-[var(--border)]"
                  }`}
                />
              </div>
              {index < years.length - 1 ? (
                <span className="mr-[3px] block h-6 w-px bg-[var(--border)]" />
              ) : null}
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
