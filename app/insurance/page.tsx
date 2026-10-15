import type { Metadata } from "next"
import Link from "next/link"
import { FeeList } from "@/components/fee-list"
import { InsuranceForm } from "@/components/insurance-form"
import { PageHeader } from "@/components/page-header"
import { clinic, fees } from "@/lib/content"

export const metadata: Metadata = {
  title: "Insurance check",
  description:
    "Ask Cloud 9 Physical Therapy to verify Medicare or private insurance before a visit. Self-pay rates are listed. Nothing is confirmed until the clinic replies.",
}

export default function InsurancePage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div>
        <PageHeader eyebrow="Benefits" title="Medicare, a private plan, or self-pay.">
          <p>
            Cloud 9 accepts Medicare and most private insurance. The form asks the clinic to check a plan. It does not confirm coverage, and a visit is not held until they reply.
          </p>
        </PageHeader>
        <ul className="mt-8 space-y-4">
          <li className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-2xl">Medicare</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Medicare is accepted. The self-pay prices on this page do not apply to Medicare beneficiaries. Write “Medicare” as the insurer and the clinic will explain how it applies. This form does not check it for you.
            </p>
          </li>
          <li className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-2xl">Private plans</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Most major insurance plans are accepted. The clinic calls the insurer and explains the benefits before you are guessing at a bill. If a deductible has to be met first, services are paid at the time of the session. A full list of plans is not published — use the name on the card.
            </p>
          </li>
          <li className="rounded-2xl bg-foam p-5">
            <h2 className="font-heading text-2xl">If you are paying yourself</h2>
            <div className="mt-3">
              <FeeList />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{fees.cancellationNote}</p>
          </li>
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Prefer to talk it through? Call{" "}
          <a className="font-medium text-primary hover:underline" href={clinic.phoneHref}>
            {clinic.phone}
          </a>
          . You can also{" "}
          <Link href="/book" className="font-medium text-primary hover:underline">
            request a visit
          </Link>{" "}
          or{" "}
          <Link href="/start" className="font-medium text-primary hover:underline">
            answer two questions
          </Link>{" "}
          if you are not sure which service fits. The{" "}
          <Link href="/first-visit" className="font-medium text-primary hover:underline">
            first-visit guide
          </Link>{" "}
          covers clothes, paperwork, and the hour.
        </p>
      </div>
      <InsuranceForm />
    </div>
  )
}
