import type { Metadata } from "next"
import { clinic } from "@/lib/content"

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this Cloud 9 Physical Therapy website handles the information you send.",
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Privacy</p>
      <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">What this site does with a message.</h1>
      <div className="mt-6 space-y-4 text-[17px] leading-[1.6]">
        <p>
          Appointment requests, insurance questions, and referrals open an email to {clinic.email}. This website does not store those forms in a database, and it does not create an account.
        </p>
        <p>
          Sending a note is not a booking, and it is not a medical record. The clinic confirms by phone or email. Please do not include information you would not put in an ordinary email.
        </p>
        <p>
          Questions about privacy at the practice itself go to the clinic: {clinic.phone} or {clinic.email}.
        </p>
      </div>
    </div>
  )
}
