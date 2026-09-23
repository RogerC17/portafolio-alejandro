import { SoyAlejoMark } from "@/components/brand/SoyAlejoMark"
import Link from "next/link"
import {
  NAV_ITEMS,
  SITE_ARCHIVE_YEAR,
  SITE_COLOPHON,
  SITE_LOCATION,
  SITE_NAME,
  SITE_STATEMENT,
} from "@/data/site"
import { SocialOrbs } from "@/components/ui/SocialOrbs"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-surface pb-[var(--safe-bottom)]">
      <div className="editorial-shell py-[var(--space-2xl)]">
        <div className="col-span-4 flex flex-col gap-[var(--space-lg)] lg:col-span-12">
          <div className="flex items-start gap-[var(--space-md)]">
            <SoyAlejoMark variant="archivo" className="h-24 w-auto shrink-0 sm:h-28" />
            <div className="flex flex-col gap-1">
              <p className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
                {SITE_NAME}
              </p>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                {SITE_LOCATION}
              </p>
            </div>
          </div>

          <nav aria-label="Pie de página">
            <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative inline-flex min-h-11 items-center py-2 text-[0.875rem] font-medium text-foreground"
                  >
                    {item.label}
                    <span className="nav-underline absolute inset-x-0 bottom-1 h-px group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialOrbs />

          <p className="text-[0.9375rem] text-muted">{SITE_STATEMENT}</p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            {SITE_COLOPHON}
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            © {SITE_ARCHIVE_YEAR} {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  )
}
