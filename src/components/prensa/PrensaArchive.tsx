import Image from "next/image"
import Link from "next/link"
import { isPendingCopy } from "@/lib/content"
import { archiveLabel } from "@/lib/archive"
import { latestPressSlug, pressItems } from "@/data/press"

export function PrensaArchive() {
  const recentSlug = latestPressSlug(pressItems)

  return (
    <section
      aria-labelledby="prensa-archivo-heading"
      className="pb-[var(--space-3xl)]"
    >
      <h2 id="prensa-archivo-heading" className="sr-only">
        Archivo de prensa
      </h2>
      <div className="editorial-shell">
        <ul className="col-span-4 lg:col-span-12">
          {pressItems.map((item, index) => {
            const showDate = !isPendingCopy(item.date)
            const recent = item.slug === recentSlug

            return (
              <li
                key={item.slug}
                className="border-t border-[var(--border)] last:border-b"
              >
                <Link
                  href={`/prensa/${item.slug}`}
                  className="press-row group relative grid min-h-11 grid-cols-4 items-center gap-[var(--grid-gutter)] py-[var(--space-md)] focus-visible:outline-offset-4 md:grid-cols-8 lg:grid-cols-12"
                >
                  {item.image ? (
                    <span className="relative hidden h-20 w-20 overflow-hidden bg-surface lg:col-span-1 lg:block">
                      <span className="archive-item absolute inset-0">
                        <span className="archive-media absolute inset-0 origin-center">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </span>
                      </span>
                    </span>
                  ) : (
                    <span className="hidden bg-surface lg:col-span-1 lg:block lg:h-20 lg:w-20" />
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
                    ) : null}
                  </span>
                  <span
                    aria-hidden="true"
                    className="col-span-1 text-right text-foreground md:col-span-1 lg:col-span-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
