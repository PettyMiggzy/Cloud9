import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { NextStep } from "@/components/next-step"
import { services } from "@/lib/content"

export const metadata: Metadata = {
  title: "Care",
  description: "Physical therapy services at Cloud 9, from dry needling and back pain to concussion care and sports rehab.",
}

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Care</p>
      <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-tight text-balance sm:text-5xl">What they treat, and how a visit is shaped.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Every plan is built for one person. These are the problems the clinic sees most, and the way each one is approached. If you are not sure which one,{" "}
        <Link href="/start" className="font-medium text-primary hover:underline">
          answer two questions
        </Link>
        . That match is a starting point, not a diagnosis.
      </p>
      <ul className="mt-12 border-y border-border">
        {services.map((service, index) => (
          <li key={service.slug} className="border-b border-border last:border-b-0">
            <Link href={`/services/${service.slug}`} className="group grid gap-4 py-6 sm:grid-cols-[4rem_1fr_14rem] sm:items-center">
              <span className="font-heading text-2xl text-primary">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <h2 className="font-heading text-2xl font-semibold group-hover:text-primary sm:text-3xl">{service.name}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{service.short}</p>
              </span>
              <span className="relative hidden h-24 overflow-hidden sm:block">
                <Image src={service.image} alt="" fill className="object-cover" sizes="220px" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <NextStep />
    </div>
  )
}
