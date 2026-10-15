"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { services } from "@/lib/content"

export function HomeCareRail() {
  const rail = useRef<HTMLUListElement>(null)
  const go = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * 340, behavior: "smooth" })

  return (
    <section className="overflow-hidden bg-white py-20 md:py-32">
      <div className="mx-auto flex max-w-[1200px] items-end justify-between gap-6 px-5 sm:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">Care</p>
          <h2 className="mt-4 max-w-xl text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-balance text-[#14324f] sm:text-6xl">
            Ten ways in. One clinician.
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => go(-1)} aria-label="Previous services" className="grid size-12 place-items-center rounded-full border border-black/15 text-[#14324f] hover:bg-[#E8F4F8]">
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next services" className="grid size-12 place-items-center rounded-full border border-black/15 text-[#14324f] hover:bg-[#E8F4F8]">
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={rail}
        className="rail mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(2rem,calc((100vw-1200px)/2+2rem))]"
      >
        {services.map((service, index) => (
          <li key={service.slug} className="w-[78vw] shrink-0 snap-start sm:w-80">
            <Link href={`/services/${service.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#E8F4F8]">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 640px) 320px, 78vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
                <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#14324f]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#14324f] group-hover:text-primary">{service.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{service.short}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
