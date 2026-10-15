import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { ReferralForm } from "@/components/referral-form"
import { clinic } from "@/lib/content"

export const metadata: Metadata = {
  title: "Physician referral",
  description:
    "Send a patient referral to Cloud 9 Physical Therapy by email or fax. Indiana patients can also book without a referral.",
}

export default function ReferPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <PageHeader eyebrow="For a physician’s office" title="Refer a patient to Suite G.">
          <p>
            Send the note by email, or fax it. The form prepares a message to {clinic.email}. It does not register the patient, and the visit is not confirmed until Cloud 9 replies.
          </p>
        </PageHeader>
        <section className="mt-8 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-2xl">Fax</h2>
          <p className="mt-2 font-heading text-3xl">{clinic.fax}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Fax a referral to this number. Include the practice, the provider, the patient, a phone number, and the reason.
          </p>
        </section>
        <section className="mt-4 rounded-2xl bg-foam p-5">
          <h2 className="font-heading text-2xl">Patients can skip this form.</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Indiana is a direct-access state, so a person can see a physical therapist without a referral or a prescription. This form is for an office that wants to send someone. It is not a requirement to be seen.
          </p>
          <p className="mt-4 text-sm">
            <Link href="/book" className="font-medium text-primary hover:underline">
              Book a visit
            </Link>
            {" · "}
            <Link href="/start" className="font-medium text-primary hover:underline">
              Where to start
            </Link>
            {" · "}
            <a href={clinic.phoneHref} className="font-medium text-primary hover:underline">
              Call {clinic.phone}
            </a>
          </p>
        </section>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {clinic.addressLines[0]}
          <br />
          {clinic.addressLines[1]}
        </p>
      </div>
      <ReferralForm />
    </div>
  )
}
