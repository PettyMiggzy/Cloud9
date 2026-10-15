import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/content"

export function HomeCta() {
  return (
    <section className="relative isolate overflow-hidden bg-[#14324f] py-28 md:py-44">
      <Image src="/images/sky-night.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[#0a1c30]/35" />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="max-w-2xl text-[2.5rem] leading-[1.02] font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Ready when you are.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
          Ask for a visit, or call the front desk. A request is not confirmed until the clinic replies by phone or email.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button className="h-13 w-full bg-white px-7 text-base text-[#14324f] hover:bg-white/90 sm:w-auto" render={<Link href="/book" />}>
            Book appointment
          </Button>
          <a href={clinic.phoneHref} className="inline-flex h-13 items-center text-lg font-semibold text-white underline-offset-4 hover:underline">
            {clinic.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
