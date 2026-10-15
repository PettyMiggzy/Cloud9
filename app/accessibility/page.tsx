import type { Metadata } from "next"
import { clinic } from "@/lib/content"

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility notes for the Cloud 9 Physical Therapy website.",
}

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 md:py-32">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Accessibility</p>
      <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Using this website.</h1>
      <div className="mt-6 space-y-4 text-[17px] leading-[1.6]">
        <p>
          Pages use headings in order, a skip link, visible keyboard focus, and text meant to stay readable on a phone or a large screen. Motion eases off when your device asks for reduced motion.
        </p>
        <p>
          If a page, form, or photo gets in the way, call {clinic.phone} or email {clinic.email} and say what you were trying to do. The clinic can take an appointment request by phone.
        </p>
      </div>
    </div>
  )
}
