import type { Metadata } from "next"
import { BookingWizard } from "@/components/booking-wizard"
import { clinic, services } from "@/lib/content"

export const metadata: Metadata = {
  title: "Book a visit",
  description: "Request a one-to-one physical therapy visit at Cloud 9 in Indianapolis.",
}

type Props = { searchParams: Promise<{ service?: string }> }

export default async function BookPage({ searchParams }: Props) {
  const params = await searchParams
  const initial = services.some((service) => service.slug === params.service) ? params.service : ""

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.75fr_1.25fr]">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Request</p>
        <h1 className="mt-3 font-heading text-5xl leading-tight">Ask for an hour.</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          This sends a note to {clinic.email}. It does not lock the time. Someone at the clinic confirms by phone or email. If you need today, call {clinic.phone}.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Closed Sunday. Saturday requests should land between 8:00 am and 1:00 pm so the visit finishes before 2:00.
        </p>
      </div>
      <BookingWizard initialService={initial} />
    </div>
  )
}
