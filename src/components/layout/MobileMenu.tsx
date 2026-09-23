"use client"

import Link from "next/link"
import { useEffect, useRef, type CSSProperties, type RefObject } from "react"
import type { NavItem } from "@/data/site"
import { isActivePath } from "@/lib/nav"

type MobileMenuProps = {
  id: string
  open: boolean
  items: NavItem[]
  pathname: string
  triggerRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
}

export function MobileMenu({
  id,
  open,
  items,
  pathname,
  triggerRef,
  onClose,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    firstLinkRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const dialog = dialogRef.current
      const trigger = triggerRef.current
      if (!dialog) return

      const links = [...dialog.querySelectorAll<HTMLElement>("a[href]")]
      const focusables = trigger ? [trigger, ...links] : links
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose, triggerRef])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden={!open}
        className={`menu-scrim ${open ? "is-open" : ""}`}
        aria-label="Cerrar menú"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Índice del archivo"
        aria-hidden={!open}
        inert={!open}
        className={`menu-panel ${open ? "is-open" : ""}`}
      >
        <nav aria-label="Móvil">
          <p className="menu-panel-kicker">Índice</p>
          <ul>
            {items.map((item, index) => {
              const active = isActivePath(pathname, item.href)

              return (
                <li
                  key={item.href}
                  style={{ "--i": index } as CSSProperties}
                >
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    tabIndex={open ? undefined : -1}
                    onClick={onClose}
                  >
                    <span className="menu-item-copy font-mono text-[0.6875rem] uppercase tabular-nums tracking-[0.16em] text-muted">
                      [{item.index}]
                    </span>
                    <span className="menu-item-copy text-[clamp(1.75rem,8vw,2.35rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
