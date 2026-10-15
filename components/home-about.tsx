import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "12+", label: "Years in practice for Dr. Skye" },
  { value: "1:1", label: "The clinician stays the whole hour" },
  { value: "Sat", label: "Open until 2:00 pm" },
]

export function HomeAbout() {
  return (
    <section className="bg-[#E8F4F8] py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <Image
              src="/images/clinic/services.jpg"
              alt="Dr. Sakshi Nandal treating a patient at Cloud 9 Physical Therapy"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-[30%_center]"
            />
          </div>
        </Reveal>
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">The practice</p>
          <h2 className="mt-3 text-[1.875rem] leading-tight text-balance sm:text-[2.5rem]">
            Restoring strength. Reviving motion. Enhancing life.
          </h2>
          <div className="mt-5 space-y-4 text-[17px] leading-[1.6]">
            <p>
              Cloud 9 is compassionate, evidence-based physical therapy for the person in the room — from a new injury to pain that has been there for years. Dr. Sakshi Nandal, who patients call Dr. Skye, leads the clinic.
            </p>
            <p>
              The work runs from recovery after an injury through longer-term pain. Manual therapy, dry needling, and exercise happen with the clinician who stays. No referral is required.
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-[#0F4C5C]/15 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-heading text-2xl font-semibold text-[#0F4C5C] sm:text-3xl">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-[#475569] sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
          <Button variant="outline" className="mt-8 h-11 bg-white px-5" render={<Link href="/about" />}>
            Meet the team
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
