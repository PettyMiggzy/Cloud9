import type { Metadata } from "next"
import { GalleryGrid } from "@/components/gallery-grid"

export const metadata: Metadata = {
  title: "The clinic",
  description: "Photos of Cloud 9 Physical Therapy at 5370 E. Thompson Road in Indianapolis.",
}

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Thompson Road</p>
      <h1 className="mt-3 max-w-3xl font-heading text-5xl leading-tight">The room, before you are in it.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        These are the clinic’s own photographs: the front door at Suite G, the gym, the treatment tables, and the people who work there.
      </p>
      <div className="mt-10">
        <GalleryGrid />
      </div>
    </div>
  )
}
