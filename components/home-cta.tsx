import Link from "next/link"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

export function HomeCta() {
  return (
    <section className="bg-[#0F4C5C] py-16 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="max-w-xl text-[1.875rem] leading-snug text-white sm:text-[2.5rem]">Ready to start your recovery?</h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/80">
          Ask for a visit, or call the front desk. A request is not confirmed until the clinic replies by phone or email.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button className="h-12 w-full bg-white px-6 text-base text-[#0F4C5C] hover:bg-white/90 sm:w-auto" render={<Link href="/book" />}>
            Book appointment
          </Button>
          <a href={clinic.phoneHref} className="inline-flex h-12 items-center text-base font-semibold text-white underline-offset-4 hover:underline">
            {clinic.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
