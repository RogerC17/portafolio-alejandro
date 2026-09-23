import Image from "next/image"
import { TextLink } from "@/components/ui/Button"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { isPendingCopy } from "@/lib/content"
import { archiveLabel } from "@/lib/archive"
import { homePressItems, latestPressSlug } from "@/data/press"

export function Press() {
  const recentSlug = latestPressSlug(homePressItems)

  return (
    <section
      id="prensa"
      aria-labelledby="prensa-heading"
      className="scroll-mt-[var(--header-offset)] border-t border-[var(--border)] py-[var(--space-3xl)]"
    >
      <div className="editorial-shell">
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <SectionLabel index="[06]" />
          <h2
            id="prensa-heading"
            className="mt-[var(--space-sm)] text-[clamp(2rem,2.4vw+1rem,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
          >
            En los medios
          </h2>
        </div>
        <div className="col-span-4 mt-[var(--space-md)] flex items-end md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-9">
          <TextLink href="/prensa">Ver sala de prensa</TextLink>
        </div>
      </div>

      <div className="editorial-shell mt-[var(--space-2xl)]">
        <ul className="col-span-4 lg:col-span-12">
          {homePressItems.map((item, index) => {
            const showDate = !isPendingCopy(item.date)
            const recent = item.slug === recentSlug

            return (
              <li key={item.slug} className="border-t border-[var(--border)] last:border-b">
                <a
                  href={item.url}
                  rel="noreferrer"
                  className="press-row group relative grid min-h-11 grid-cols-4 items-center gap-[var(--grid-gutter)] py-[var(--space-md)] focus-visible:outline-offset-4 md:grid-cols-8 lg:grid-cols-12"
                >
                  {item.image ? (
                    <span className="relative hidden h-20 w-20 overflow-hidden bg-surface lg:col-span-1 lg:block">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </span>
                  ) : (
                    <span className="hidden lg:col-span-1 lg:block" />
                  )}
                  <span className="col-span-4 font-mono text-[0.6875rem] uppercase tabular-nums tracking-[0.16em] text-muted md:col-span-2 lg:col-span-2">
                    {archiveLabel("Reg.", index + 1)}
                    {recent ? (
                      <>
                        <span aria-hidden="true"> · </span>
                        <span className="text-signal">Reciente</span>
                      </>
                    ) : null}
                    <span className="mt-1 block tracking-[0.16em]">{item.media}</span>
                  </span>
                  <span className="col-span-4 text-[1.0625rem] font-medium leading-snug md:col-span-4 lg:col-span-7">
                    {item.title}
                  </span>
                  <span className="col-span-3 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-muted md:col-span-1 lg:col-span-1">
                    {showDate ? (
                      <time dateTime={item.dateIso}>{item.date}</time>
                    ) : (
                      ""
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className="col-span-1 text-right text-foreground md:col-span-1 lg:col-span-1"
                  >
                    →
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
