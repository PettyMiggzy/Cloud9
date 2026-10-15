"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
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
            className={cn(
              "text-sm font-medium tracking-wide",
              active ? "text-primary" : "text-foreground/80 hover:text-primary"
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
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="bg-deep text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs sm:text-sm">
          <p className="truncate">{clinic.address}</p>
          <p className="hidden shrink-0 md:block">Mon–Fri 7–7 · Sat 8–2</p>
          <a href={clinic.phoneHref} className="shrink-0 font-medium underline-offset-4 hover:underline">
            {clinic.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="Cloud 9 Physical Therapy"
            width={220}
            height={204}
            priority
            className="h-14 w-auto"
          />
        </Link>
        <NavLinks className="hidden items-center gap-7 md:flex" />
        <div className="flex items-center gap-2">
          <Button
            render={<Link href="/book" />}
            className="hidden h-10 px-4 md:inline-flex"
          >
            Book a visit
          </Button>
          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger
              render={<Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu" />}
            >
              <MenuIcon />
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Cloud 9</DialogTitle>
                <DialogDescription>Southside Indianapolis physical therapy.</DialogDescription>
              </DialogHeader>
              <NavLinks
                className="flex flex-col gap-4 py-2 text-lg"
                onNavigate={() => setMenuOpen(false)}
              />
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
