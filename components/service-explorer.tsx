"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { services } from "@/lib/content"
import { cn } from "cn"

export function ServiceExplorer() {
  const [active, setActive] = useState(0)
  const service = services[active]

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <ul className="border-y border-border" role="listbox" aria-label="Services">
        {services.map((item, index) => {
          const selected = index === active
          return (
            <li key={item.slug} className="border-b border-border last:border-b-0">
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={cn(
                  "grid w-full grid-cols-[2.25rem_1fr] gap-3 border-l-4 py-3.5 pr-3 text-left transition-colors",
                  selected ? "border-primary bg-foam pl-3" : "border-transparent pl-4 hover:bg-foam/70"
                )}
              >
                <span className="pt-1 text-xs text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className={cn("block font-heading text-xl font-semibold sm:text-2xl", selected ? "text-foreground" : "text-foreground/70")}>
                    {item.name}
                  </span>
                  <span className={cn("mt-1 block text-sm leading-relaxed text-muted-foreground", selected ? "block" : "hidden sm:block")}>
                    {item.short}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <Link href={`/services/${service.slug}`} className="group lg:sticky lg:top-28">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            key={service.slug}
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="stage-photo object-cover"
          />
        </div>
        <p className="mt-4 font-heading text-2xl font-semibold">{service.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{service.short}</p>
        <p className="mt-3 text-sm font-medium text-primary">Open this page</p>
      </Link>
    </div>
  )
}
