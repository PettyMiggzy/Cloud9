import { CalendarClock, HeartHandshake, Stethoscope, UserRound } from "lucide-react"
import { pillars } from "@/lib/content"

const icons = [UserRound, Stethoscope, CalendarClock, HeartHandshake]

export function HomeFeatures() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="max-w-xl text-[1.875rem] leading-snug sm:text-[2.5rem]">Care that stays with one person.</h2>
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = icons[index] ?? UserRound
            return (
              <li key={pillar.title} className="border-t border-black/10 pt-6">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg leading-snug">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{pillar.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
