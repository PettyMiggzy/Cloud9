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
    <div className="grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <ul role="listbox" aria-label="Services">
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
                className="flex w-full items-baseline gap-4 py-1.5 text-left"
              >
                <span className={cn("w-8 shrink-0 font-heading text-sm", selected ? "text-primary" : "text-foreground/25")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-heading text-3xl leading-none tracking-tight transition-colors sm:text-5xl",
                    selected ? "bg-[var(--sun)] text-black" : "text-foreground/35 hover:text-foreground"
                  )}
                >
                  {item.name}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <Link href={`/services/${service.slug}`} className="group relative block min-h-[28rem] overflow-hidden bg-deep lg:sticky lg:top-24 lg:min-h-[36rem]">
        <Image
          key={service.slug}
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="stage-photo object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-xs tracking-[0.2em] text-[var(--sun)] uppercase">{String(active + 1).padStart(2, "0")} / 10</p>
          <p className="mt-2 font-heading text-4xl leading-none">{service.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">{service.short}</p>
          <p className="mt-4 text-sm font-medium text-[var(--sun)]">Open this care</p>
        </div>
      </Link>
    </div>
  )
}
