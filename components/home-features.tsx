import { CalendarClock, HeartHandshake, Stethoscope, UserRound } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { pillars } from "@/lib/content"

const icons = [UserRound, Stethoscope, CalendarClock, HeartHandshake]

export function HomeFeatures() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Why choose us</p>
          <h2 className="mt-3 max-w-xl text-[1.875rem] leading-tight sm:text-[2.5rem]">Care that stays with one person.</h2>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = icons[index] ?? UserRound
            return (
              <li key={pillar.title}>
                <Reveal>
                  <article className="h-full rounded-2xl bg-white p-6 ring-1 ring-black/5">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-4 text-lg leading-snug">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">{pillar.body}</p>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
