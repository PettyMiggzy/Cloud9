import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
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
  const [lead, ...rest] = featured

  return (
    <section className="bg-white py-16 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[1.875rem] leading-snug sm:text-[2.5rem]">Where people start.</h2>
          <Link href="/services" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:inline-flex">
            View all
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 divide-y divide-black/10 border-y border-black/10 lg:hidden">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="flex items-center gap-4 py-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#E8F4F8]">
                  <Image src={service.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <span>
                  <span className="block font-semibold text-[#1E293B]">{service.name}</span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-snug text-[#475569]">{service.short}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <BentoGrid className="mt-12 hidden lg:grid lg:grid-rows-2">
          {lead ? (
            <BentoCard className="lg:col-span-4 lg:row-span-2">
              <Link href={`/services/${lead.slug}`} className="group flex h-full flex-col">
                <div className="relative min-h-64 flex-1">
                  <Image src={lead.image} alt={lead.imageAlt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl">{lead.name}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#475569]">{lead.short}</p>
                </div>
              </Link>
            </BentoCard>
          ) : null}
          {rest.map((service) => (
            <BentoCard key={service.slug} className="lg:col-span-2">
              <Link href={`/services/${service.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[16/10]">
                  <Image src={service.image} alt={service.imageAlt} fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">{service.short}</p>
                </div>
              </Link>
            </BentoCard>
          ))}
        </BentoGrid>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#475569]">
          Functional dry needling is part of care here. Dr. Skye is certified in it. Patients also mention red light therapy — ask the clinic whether it belongs in your plan.
        </p>
        <Link href="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary sm:hidden">
          View all services
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
