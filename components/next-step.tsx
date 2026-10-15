import Link from "next/link"
import { clinic } from "@/lib/content"
import { Button } from "@/components/ui/button"

export function NextStep({
  title = "Ready when you are.",
  body = "Book a visit, call the front desk, or answer two questions if you are not sure which service fits. A request is not confirmed until the clinic replies.",
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="mt-16 bg-[var(--sun)] px-6 py-10 text-black sm:px-10">
      <h2 className="font-heading text-4xl text-balance sm:text-5xl">{title}</h2>
      <p className="mt-3 max-w-xl leading-relaxed">{body}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button className="h-11 bg-black px-5 text-white hover:bg-black/80" render={<Link href="/book" />}>
          Book a visit
        </Button>
        <Button variant="outline" className="h-11 border-black bg-transparent px-5 text-black hover:bg-black hover:text-white" render={<a href={clinic.phoneHref} />}>
          Call {clinic.phone}
        </Button>
        <Link href="/start" className="inline-flex h-11 items-center text-sm font-medium underline-offset-4 hover:underline">
          Where to start
        </Link>
      </div>
    </section>
  )
}
