import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { services } from "@/lib/content"

const featured = [
  services.find((service) => service.slug === "sports-medicine"),
  {
    slug: "acute-chronic",
    name: "Manual therapy",
    short: "Hands-on care for the joint or muscle that is actually limiting you.",
    image: "/images/clinic/services.jpg",
    imageAlt: "Dr. Sakshi Nandal treating a patient at Cloud 9 Physical Therapy",
  },
  services.find((service) => service.slug === "balance-vestibular"),
].filter((service) => service != null)

export function HomeServices() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Services</p>
              <h2 className="mt-3 text-[1.875rem] leading-tight sm:text-[2.5rem]">Where people start.</h2>
            </div>
            <Link href="/services" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:inline-flex">
              View all
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((service) => (
            <li key={service.slug}>
              <Reveal>
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#E8F4F8]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-200 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-4 text-xl">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">{service.short}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="size-4 transition duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#475569]">
          Functional dry needling is part of care here. Dr. Skye is certified in it. Patients also mention red light therapy — ask the clinic whether it belongs in your plan.
        </p>
        <Link href="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary sm:hidden">
          View all services
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
