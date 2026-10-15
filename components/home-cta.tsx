import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

export function HomeCta() {
  return (
    <section className="relative overflow-hidden bg-[#d7eef8] py-16 md:py-24">
      <Image src="/images/sky.jpg" alt="" fill sizes="100vw" className="object-cover object-top" />
      <div className="absolute inset-0 bg-white/62" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="max-w-xl text-[1.875rem] leading-tight text-[#174E86] sm:text-[2.5rem]">Ready to start your recovery?</h2>
        <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-[#334155]">
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
