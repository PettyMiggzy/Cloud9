"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MenuIcon, PhoneIcon } from "lucide-react"
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
              "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
              active ? "bg-[#E8F4F8] text-primary" : "text-[#1E293B] hover:bg-[#f1f7fb] hover:text-primary"
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const onHome = pathname === "/"

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-3 rounded-full bg-white pr-2 pl-4 ring-1 ring-black/5 transition-shadow duration-300 sm:h-16 sm:pl-6 sm:pr-3",
            scrolled && "shadow-[0_10px_30px_-14px_rgba(15,50,80,0.45)]"
          )}
        >
          <Link href="/" aria-label="Cloud 9 Physical Therapy" className="flex shrink-0 items-center">
            <Logo priority />
          </Link>
          <NavLinks className="hidden items-center gap-1 lg:flex" />
          <div className="flex items-center gap-2 sm:gap-3">
            <OpenNow className="hidden 2xl:inline-flex" />
            <a
              href={clinic.phoneHref}
              aria-label={`Call ${clinic.phone}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#14324f] hover:bg-[#E8F4F8] xl:inline-flex"
            >
              <PhoneIcon className="size-4 text-primary" aria-hidden="true" />
              {clinic.phone}
            </a>
            <Button render={<Link href="/book" />} className="hidden h-10 rounded-full px-5 sm:h-11 md:inline-flex">
              Book appointment
            </Button>
            <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
              <DialogTrigger
                render={<Button variant="outline" size="icon" className="size-10 rounded-full lg:hidden" aria-label="Open menu" />}
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
      {onHome ? null : <div className="h-20 sm:h-24" aria-hidden="true" />}
    </>
  )
}
