import type { Metadata } from "next"
import Link from "next/link"
import { BookingWizard } from "@/components/booking-wizard"
import { clinic } from "@/lib/content"

export const metadata: Metadata = {
  title: "Book a visit",
  description: "Request a one-to-one physical therapy visit at Cloud 9 in Indianapolis.",
}

export default function BookPage() {
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
        <p className="mt-4 text-sm text-muted-foreground">
          <Link href="/start" className="font-medium text-primary hover:underline">
            Not sure which service?
          </Link>{" "}
          Or ask them to{" "}
          <Link href="/insurance" className="font-medium text-primary hover:underline">
            check a plan
          </Link>
          . Neither one holds a time.
        </p>
      </div>
      <BookingWizard />
    </div>
  )
}
