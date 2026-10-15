"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronDownIcon } from "lucide-react"
import { patientTools } from "@/lib/content"
import { cn } from "cn"

export function PatientToolLinks({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname()
  return (
    <nav className={className} aria-label="For patients">
      {patientTools.map((tool) => {
        const active = pathname === tool.href
        return (
          <Link
            key={tool.href}
            href={tool.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn("block rounded-xl", active && "text-primary")}
          >
            <span className="block text-base font-medium">{tool.label}</span>
            <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{tool.detail}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export function PatientsMenu({ className }: { className?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const active = patientTools.some((tool) => tool.href === pathname)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative hidden lg:block">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="patient-tools"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium",
          active || open ? "text-primary" : "text-foreground/80 hover:text-primary",
          className
        )}
      >
        Patients
        <ChevronDownIcon className={cn("size-4 transition", open && "rotate-180")} aria-hidden />
      </button>
      {open ? (
        <div
          id="patient-tools"
          className="absolute right-0 z-50 mt-3 w-80 rounded-2xl border border-border bg-card p-2 shadow-lg"
        >
          {patientTools.map((tool) => {
            const current = pathname === tool.href
            return (
              <Link
                key={tool.href}
                href={tool.href}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn("block rounded-xl px-3 py-2.5 hover:bg-foam", current && "bg-foam")}
              >
                <span className="block text-sm font-medium">{tool.label}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{tool.detail}</span>
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
