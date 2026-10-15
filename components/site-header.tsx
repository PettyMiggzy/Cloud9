"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { Logo } from "@/components/logo"
import { OpenNow } from "@/components/open-now"
import { PatientToolLinks, PatientsMenu } from "@/components/patient-menu"
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

function NavLinks({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname()
  return (
    <nav className={className}>
      {nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-sm font-medium",
              active ? "text-primary" : "text-foreground/75 hover:text-primary"
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-md">
      <div className={cn("overflow-hidden bg-foam text-foreground transition-all duration-300", scrolled ? "max-h-0" : "max-h-12")}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs sm:text-sm">
          <p className="truncate">{clinic.address}</p>
          <OpenNow className="shrink-0" />
          <a href={clinic.phoneHref} className="shrink-0 font-medium underline-offset-4 hover:underline">
            {clinic.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Cloud 9 Physical Therapy" className="flex items-center">
          <Logo markClassName={cn("transition-all duration-300", scrolled ? "h-9 w-10" : "h-11 w-12")} />
        </Link>
        <NavLinks className="hidden items-center gap-5 lg:flex xl:gap-7" />
        <div className="flex items-center gap-3">
          <PatientsMenu />
          <OpenNow className={cn("shrink-0", scrolled ? "inline-flex" : "hidden")} />
          <Button
            render={<Link href="/book" />}
            className="hidden h-10 px-4 md:inline-flex"
          >
            Book a visit
          </Button>
          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger
              render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu" />}
            >
              <MenuIcon />
            </DialogTrigger>
            <DialogContent className="max-h-[min(40rem,calc(100dvh-6rem))] overflow-y-auto sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Cloud 9</DialogTitle>
                <DialogDescription>South side Indianapolis physical therapy.</DialogDescription>
              </DialogHeader>
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Around the clinic</p>
              <NavLinks
                className="flex flex-col gap-3 text-lg"
                onNavigate={() => setMenuOpen(false)}
              />
              <p className="pt-2 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">For patients</p>
              <PatientToolLinks className="flex flex-col gap-4" onNavigate={() => setMenuOpen(false)} />
              <Button
                render={<Link href="/book" onClick={() => setMenuOpen(false)} />}
                className="h-11"
              >
                Book a visit
              </Button>
              <a href={clinic.phoneHref} className="text-center text-sm text-primary">
                Or call {clinic.phone}
              </a>
              <p className="sr-only">Current page {pathname}</p>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
