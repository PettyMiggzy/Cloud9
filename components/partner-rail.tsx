import Image from "next/image"
import { partners } from "@/lib/content"

export function PartnerRail() {
  const loop = [...partners, ...partners]
  return (
    <div className="marquee relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <ul className="marquee-track flex w-max items-center gap-4 py-2">
        {loop.map((partner, index) => (
          <li key={`${partner.name}-${index}`} className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-border bg-white px-4">
            <Image src={partner.image} alt={index < partners.length ? partner.name : ""} width={160} height={72} className="partner-logo max-h-14 w-auto object-contain" />
          </li>
        ))}
      </ul>
    </div>
  )
}
