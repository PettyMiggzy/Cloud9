"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { Logo } from "@/components/logo"
import { OpenNow } from "@/components/open-now"
import { PatientToolLinks } from "@/components/patient-menu"
import { clinic, nav } from "@/lib/content"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "cn"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  if (href.startsWith("/#")) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLinks({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname()
  return (
    <nav className={className} aria-label="Primary">
      {nav.map((item) => {
        const active = isActive(pathname, item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-sm font-medium transition-colors duration-200",
              active ? "text-primary" : "text-[#1E293B] hover:text-primary"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const home = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 h-[4.5rem] border-b transition-shadow duration-200",
          scrolled
            ? "border-border bg-white shadow-[0_8px_24px_-18px_rgba(15,76,92,0.45)]"
            : "border-border bg-white"
        )}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" aria-label="Cloud 9 Physical Therapy" className="flex shrink-0 items-center">
            <Logo priority />
          </Link>
          <NavLinks className="hidden items-center gap-6 lg:flex" />
          <div className="flex items-center gap-3 sm:gap-4">
            <OpenNow className="hidden xl:inline-flex" />
            <a href={clinic.phoneHref} className="hidden text-sm font-semibold text-[#1E293B] hover:text-primary sm:inline">
              {clinic.phone}
            </a>
            <Button render={<Link href="/book" />} className="hidden h-10 px-4 md:inline-flex">
              Book appointment
            </Button>
            <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
              <DialogTrigger
                render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu" />}
              >
                <MenuIcon />
              </DialogTrigger>
              <DialogContent className="max-h-[min(40rem,calc(100dvh-6rem))] overflow-y-auto sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Cloud 9 Physical Therapy</DialogTitle>
                  <DialogDescription>South side Indianapolis.</DialogDescription>
                </DialogHeader>
                <NavLinks className="flex flex-col gap-3 text-lg" onNavigate={() => setMenuOpen(false)} />
                <p className="pt-2 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">For patients</p>
                <PatientToolLinks className="flex flex-col gap-4" onNavigate={() => setMenuOpen(false)} />
                <Button render={<Link href="/book" onClick={() => setMenuOpen(false)} />} className="h-11">
                  Book appointment
                </Button>
                <a href={clinic.phoneHref} className="text-center text-sm font-semibold text-primary">
                  Call {clinic.phone}
                </a>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      {home ? null : <div className="h-[4.5rem]" aria-hidden="true" />}
    </>
  )
}
