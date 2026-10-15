import type { Metadata } from "next"
import Link from "next/link"
import { PrintButton } from "@/components/print-button"
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
      <div className="no-print">
        <PageHeader eyebrow="For a physician’s office" title="Refer a patient to Suite G." art="/images/art-ref.jpg">
          <p>
            Send the note by email, or fax it. The form prepares a message to {clinic.email}. It does not register the patient, and the visit is not confirmed until Cloud 9 replies.
          </p>
        </PageHeader>
        <PrintButton className="no-print mt-6 h-11 rounded-full px-5">Print a one-page referral sheet</PrintButton>
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
      <div className="no-print">
        <ReferralForm />
      </div>
      <section className="print-only" aria-hidden="true">
        <h1 style={{ fontSize: "28px", fontWeight: 700 }}>Cloud 9 Physical Therapy</h1>
        <p style={{ marginTop: 4, fontSize: "16px" }}>Physician referral sheet</p>
        <hr style={{ margin: "16px 0" }} />
        <p style={{ fontSize: "16px", lineHeight: 1.6 }}>
          {clinic.address}
          <br />
          Phone {clinic.phone} · Fax {clinic.fax}
          <br />
          {clinic.email}
        </p>
        <h2 style={{ marginTop: 20, fontSize: "20px", fontWeight: 700 }}>How to refer</h2>
        <ol style={{ marginTop: 8, paddingLeft: 20, fontSize: "16px", lineHeight: 1.7 }}>
          <li>Fax this sheet and your referral note to {clinic.fax}, or email it to {clinic.email}.</li>
          <li>Include the practice, the provider, the patient, a phone number, and the reason for the referral.</li>
          <li>Cloud 9 replies to the patient to set the first visit. A referral is not a confirmed appointment.</li>
        </ol>
        <p style={{ marginTop: 16, fontSize: "16px", lineHeight: 1.6 }}>
          Indiana is a direct-access state, so patients can also book without a referral.
        </p>
        <h2 style={{ marginTop: 20, fontSize: "20px", fontWeight: 700 }}>Hours</h2>
        <p style={{ marginTop: 8, fontSize: "16px", lineHeight: 1.7 }}>
          {clinic.hours.map((row) => `${row.days}: ${row.time}`).join(" · ")}
        </p>
      </section>
    </div>
  )
}
