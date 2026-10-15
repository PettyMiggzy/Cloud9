"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { clinic } from "@/lib/content"
import { Button } from "@/components/ui/button"

export function MobileDock() {
  const pathname = usePathname()
  if (pathname === "/book") return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden print:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-11" render={<a href={clinic.phoneHref} />}>
          Call
        </Button>
        <Button className="h-11" render={<Link href="/book" />}>
          Book a visit
        </Button>
      </div>
    </div>
  )
}
