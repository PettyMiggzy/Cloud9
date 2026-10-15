"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { services } from "@/lib/content"
import { cn } from "cn"

export function ServiceExplorer() {
  const [active, setActive] = useState(0)
  const service = services[active]

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="order-2 lg:order-1">
        <ul className="divide-y divide-border border-y border-border" role="listbox" aria-label="Services">
          {services.map((item, index) => {
            const selected = index === active
            return (
              <li key={item.slug}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={cn(
                    "grid w-full grid-cols-[2.5rem_1fr] items-center gap-3 py-3 text-left transition-colors",
                    selected ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  <span className="text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-heading text-xl sm:text-2xl">{item.name}</span>
                    <span className={cn("mt-0.5 block text-sm text-muted-foreground transition-all", selected ? "max-h-16 opacity-100" : "max-h-0 overflow-hidden opacity-0 sm:max-h-16 sm:opacity-100")}>
                      {item.short}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="order-1 lg:sticky lg:top-28 lg:order-2">
        <Link href={`/services/${service.slug}`} className="group block overflow-hidden rounded-[1.75rem] border border-border bg-card">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              key={service.slug}
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="stage-photo object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
              <p className="text-xs tracking-[0.16em] uppercase text-white/70">{String(active + 1).padStart(2, "0")} / 10</p>
              <p className="mt-1 font-heading text-3xl">{service.name}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <p className="text-sm text-muted-foreground">{service.short}</p>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
              Open <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
