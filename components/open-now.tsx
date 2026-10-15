"use client"

import { useEffect, useState } from "react"
import { clinicStatus } from "@/lib/hours"
import { cn } from "cn"

export function OpenNow({ className, tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  const [status, setStatus] = useState(() => clinicStatus())

  useEffect(() => {
    const tick = () => setStatus(clinicStatus())
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-medium", className)}>
      <span className="relative flex size-2">
        <span
          className={cn(
            "absolute inline-flex size-full rounded-full opacity-60 motion-safe:animate-ping",
            status.open ? "bg-emerald-500" : "bg-foreground/40"
          )}
        />
        <span className={cn("relative inline-flex size-2 rounded-full", status.open ? "bg-emerald-500" : "bg-foreground/40")} />
      </span>
      <span>{status.label}</span>
      <span className={tone === "inverse" ? "hidden text-white/75 sm:inline" : "hidden text-muted-foreground sm:inline"}>
        {status.detail}
      </span>
    </span>
  )
}
