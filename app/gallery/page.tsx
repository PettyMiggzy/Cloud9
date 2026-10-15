import type { Metadata } from "next"
import { GalleryGrid } from "@/components/gallery-grid"
import { NextStep } from "@/components/next-step"

export const metadata: Metadata = {
  title: "The clinic",
  description: "Photos of Cloud 9 Physical Therapy at 5370 E. Thompson Road in Indianapolis.",
}

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Thompson Road</p>
      <h1 className="mt-3 max-w-3xl font-heading text-5xl leading-tight">The room, before you are in it.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Photographs from the clinic itself: Suite G, the gym, the treatment tables, and Dr. Skye. No stock stand-ins.
      </p>
      <div className="mt-10">
        <GalleryGrid />
      </div>
      <NextStep title="See it in person." body="The photographs are the clinic’s own. Book a visit, call, or start with two questions if you are matching a service." />
    </div>
  )
}
