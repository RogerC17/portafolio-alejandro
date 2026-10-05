"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { startTransition, useCallback, useEffect, useId, useRef, useState } from "react"
import { SoyAlejoMark } from "@/components/brand/SoyAlejoMark"
import { MobileMenu } from "@/components/layout/MobileMenu"
import { NAV_ITEMS, SITE_NAME, type NavItem } from "@/data/site"
import { isActivePath } from "@/lib/nav"

const SCROLL_THRESHOLD = 8

function MenuBars() {
  return (
    <span aria-hidden="true" className="menu-bars">
      <span />
      <span />
      <span />
    </span>
  )
}

function DesktopNav({
  items,
  pathname,
}: {
  items: NavItem[]
  pathname: string
}) {
  return (
    <ul className="hidden items-center lg:flex">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href)

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="nav-frame relative inline-flex min-h-11 items-center text-foreground"
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function Header() {
  const pathname = usePathname()
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const wasMenuOpen = useRef(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > SCROLL_THRESHOLD
      startTransition(() => {
        setScrolled(next)
      })

      const progress = progressRef.current
      if (!progress) return
      if (pathname !== "/") {
        progress.style.transform = "scaleX(0)"
        return
      }

      const max =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const value = max > 0 ? Math.min(1, window.scrollY / max) : 0
      progress.style.transform = `scaleX(${value})`
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    if (wasMenuOpen.current && !menuOpen) {
      menuButtonRef.current?.focus()
    }
    wasMenuOpen.current = menuOpen
  }, [menuOpen])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    const onChange = () => {
      if (media.matches) {
        setMenuOpen(false)
      }
    }

    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  const transparentTop = pathname === "/" || pathname === "/proyectos"

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-[var(--z-header)] pt-[var(--safe-top)] border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
          scrolled || menuOpen || !transparentTop
            ? "border-[var(--border)] bg-[var(--header-scrolled)] backdrop-blur-[6px]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="editorial-shell relative h-[var(--header-height)] items-center">
          <div className="col-span-3 flex items-center gap-1 md:col-span-4 lg:col-span-3">
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-trigger lg:hidden"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuBars />
            </button>
            <Link
              href="/"
              className="flex min-h-11 items-center"
              aria-current={pathname === "/" ? "page" : undefined}
              onClick={closeMenu}
            >
              <SoyAlejoMark
                variant="lockup"
                alt={SITE_NAME}
                className="h-10 w-auto shrink-0 sm:h-11"
              />
            </Link>
          </div>
          <nav
            className="col-span-1 hidden items-center justify-end lg:col-span-9 lg:flex"
            aria-label="Principal"
          >
            <DesktopNav items={NAV_ITEMS} pathname={pathname} />
          </nav>
        </div>
        {pathname === "/" ? (
          <span
            ref={progressRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary"
          />
        ) : null}
      </header>
      <MobileMenu
        id={menuId}
        open={menuOpen}
        items={NAV_ITEMS}
        pathname={pathname}
        triggerRef={menuButtonRef}
        onClose={closeMenu}
      />
    </>
  )
}
