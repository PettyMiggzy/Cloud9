import Link from "next/link"
import { fees } from "@/lib/content"

export function HomeFees() {
  const tiles = [fees.evaluation, fees.treatment]
  return (
    <section className="bg-[#E8F4F8] py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">Self-pay</p>
        <h2 className="mt-4 max-w-2xl text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-balance text-[#14324f] sm:text-6xl">
          The price, before you ask.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#334155]">
          {fees.medicareNote} Most private plans are accepted, and the clinic verifies benefits before you come in.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {tiles.map((tile) => (
            <div key={tile.label} className="rounded-3xl bg-white p-8 ring-1 ring-black/5">
              <p className="text-6xl font-semibold tracking-tight text-[#14324f] sm:text-7xl">{tile.amount}</p>
              <p className="mt-3 text-lg text-[#334155]">{tile.label}</p>
            </div>
          ))}
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {fees.packages.map((pkg) => (
            <li key={pkg.label} className="flex items-baseline justify-between rounded-2xl bg-white/70 px-6 py-4 ring-1 ring-black/5">
              <span className="text-[#334155]">{pkg.label}</span>
              <span className="text-xl font-semibold text-[#14324f]">{pkg.amount}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[#334155]">{fees.cancellationNote}</p>
        <div className="mt-4 flex flex-col gap-3 font-semibold sm:flex-row sm:gap-8">
          <Link href="/insurance" className="text-primary underline-offset-4 hover:underline">Insurance and Medicare</Link>
          <Link href="/first-visit" className="text-primary underline-offset-4 hover:underline">What the first visit is like</Link>
        </div>
      </div>
    </section>
  )
}
