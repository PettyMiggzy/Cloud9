import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { services } from "@/lib/content"

export const metadata: Metadata = {
  title: "Care",
  description: "Physical therapy services at Cloud 9, from dry needling and back pain to concussion care and sports rehab.",
}

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Care</p>
      <h1 className="mt-3 max-w-3xl font-heading text-5xl leading-tight">What they treat, and how a visit is shaped.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Every plan is built for one person. These are the problems the clinic sees most, and the way each one is approached.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`} className="group block overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-[16/9]">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-5">
                <h2 className="font-heading text-2xl group-hover:text-primary">{service.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
