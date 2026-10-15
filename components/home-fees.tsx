import Link from "next/link"
import { fees } from "@/lib/content"

export function HomeFees() {
  return (
    <section className="bg-[#f4f8fb] py-16 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="max-w-xl text-[1.875rem] leading-snug sm:text-[2.5rem]">Self-pay, stated up front.</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#475569]">
          {fees.medicareNote} Most private plans are accepted, and the clinic verifies benefits before you come in.
        </p>
        <dl className="mt-8 divide-y divide-black/10 border-y border-black/10">
          <div className="flex items-baseline justify-between gap-6 py-4">
            <dt className="text-[#1E293B]">{fees.evaluation.label}</dt>
            <dd className="text-lg font-semibold text-[#0F4C5C]">{fees.evaluation.amount}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-6 py-4">
            <dt className="text-[#1E293B]">{fees.treatment.label}</dt>
            <dd className="text-lg font-semibold text-[#0F4C5C]">{fees.treatment.amount}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-[#475569]">{fees.cancellationNote}</p>
        <div className="mt-6 flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:gap-6">
          <Link href="/insurance" className="text-primary underline-offset-4 hover:underline">
            Insurance and Medicare
          </Link>
          <Link href="/first-visit" className="text-primary underline-offset-4 hover:underline">
            What the first visit is like
          </Link>
        </div>
      </div>
    </section>
  )
}
