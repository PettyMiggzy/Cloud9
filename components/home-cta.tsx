import Link from "next/link"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

export function HomeCta() {
  return (
    <section className="bg-[#E8F4F8] py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="max-w-xl text-[1.875rem] leading-snug text-[#174E86] sm:text-[2.5rem]">Ready to start your recovery?</h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#334155]">
          Ask for a visit, or call the front desk. A request is not confirmed until the clinic replies by phone or email.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button className="h-12 px-6 text-base" render={<Link href="/book" />}>
            Book appointment
          </Button>
          <a href={clinic.phoneHref} className="inline-flex h-12 items-center text-base font-semibold text-[#174E86] underline-offset-4 hover:underline">
            {clinic.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
