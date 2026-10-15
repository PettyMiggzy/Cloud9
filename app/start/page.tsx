import type { Metadata } from "next"
import Link from "next/link"
import { StartMatcher } from "@/components/start-matcher"
import { PageHeader } from "@/components/page-header"
import { clinic } from "@/lib/content"

export const metadata: Metadata = {
  title: "Where to start",
  description:
    "Two questions that point to a Cloud 9 service in Indianapolis. A starting point, not medical advice. The evaluation decides the plan.",
}

export default function StartPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
      <PageHeader eyebrow="New patients" title="Where should you start?">
        <p>
          Two questions match your words to one service this clinic already offers. This is a starting point, not medical advice, and not a diagnosis. The evaluation decides the plan.
        </p>
        <p>If this is an emergency, call 911.</p>
      </PageHeader>
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/book" className="font-medium text-primary hover:underline">
          Book without the questions
        </Link>
        {" · "}
        <a href={clinic.phoneHref} className="font-medium text-primary hover:underline">
          Call {clinic.phone}
        </a>
        {" · "}
        <Link href="/services" className="font-medium text-primary hover:underline">
          All services
        </Link>
      </p>
      <div className="mt-8">
        <StartMatcher />
      </div>
      <noscript>
        <p className="mt-6 text-sm text-muted-foreground">
          The questions need JavaScript. You can still read the services, call {clinic.phone}, or email {clinic.email}.
        </p>
      </noscript>
    </div>
  )
}
