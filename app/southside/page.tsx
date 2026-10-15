import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { HoursList } from "@/components/hours-list"
import { NextStep } from "@/components/next-step"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { clinic, services } from "@/lib/content"

export const metadata: Metadata = {
  title: "Physical therapy in Indianapolis",
  description:
    "Cloud 9 Physical Therapy at 5370 E. Thompson Rd, Suite G, Indianapolis, IN 46237. Weekdays 7–7, Saturday 8–2. No referral required.",
}

export default function SouthsidePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
      <PageHeader eyebrow="Indianapolis" title="Physical therapy on the south side of Indianapolis.">
        <p>
          Cloud 9 Physical Therapy sees people at {clinic.address}. Suite G is the clinic, on Thompson Road. Weekday hours run 7:00 am to 7:00 pm. Saturday is open 8:00 am to 2:00 pm. Sunday the clinic is closed.
        </p>
      </PageHeader>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl">The address</h2>
            <address className="mt-3 text-lg not-italic leading-relaxed">
              {clinic.addressLines[0]}
              <br />
              {clinic.addressLines[1]}
            </address>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The front door in the clinic’s own photograph is marked 5370-G.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button className="h-11 px-5" render={<a href={clinic.mapsUrl} />}>
                Open in Google Maps
              </Button>
              <Button variant="outline" className="h-11 px-5" render={<a href={clinic.phoneHref} />}>
                Call {clinic.phone}
              </Button>
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl">Hours</h2>
            <HoursList className="mt-3" />
          </section>
          <section className="rounded-3xl bg-foam p-6">
            <h2 className="font-heading text-2xl">You can start without a referral.</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Indiana is a direct-access state, so you can book physical therapy without a prescription. Medicare is accepted, and so are most private plans. The clinic will check benefits if you ask. A self-pay evaluation is $160 for 60 minutes, and a treatment is $120 for 55 minutes. Those self-pay fees do not apply to Medicare beneficiaries.
            </p>
            <p className="mt-4 text-sm">
              <Link href="/start" className="font-medium text-primary hover:underline">
                Where to start
              </Link>
              {" · "}
              <Link href="/first-visit" className="font-medium text-primary hover:underline">
                First visit
              </Link>
              {" · "}
              <Link href="/insurance" className="font-medium text-primary hover:underline">
                Insurance check
              </Link>
            </p>
          </section>
        </div>
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/clinic/about-room.jpg"
              alt="Front of Cloud 9 Physical Therapy, with the glass door marked 5370-G"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card">
            <iframe
              title="Map to Cloud 9 Physical Therapy on Thompson Road"
              src={clinic.mapEmbed}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <section className="mt-16">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Care at this clinic</p>
        <h2 className="mt-2 font-heading text-4xl">What they treat on Thompson Road.</h2>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="group grid gap-1 py-4 sm:grid-cols-[16rem_1fr] sm:items-baseline sm:gap-6">
                <span className="font-heading text-2xl group-hover:text-primary">{service.name}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{service.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <NextStep
        title="Come to Suite G."
        body="Request a time, call the clinic, or match a concern to one of the services above. A request is not confirmed until Cloud 9 replies."
      />
    </div>
  )
}
