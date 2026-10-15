import { CalendarClock, HeartHandshake, Stethoscope, UserRound } from "lucide-react"
import { pillars } from "@/lib/content"

const icons = [UserRound, Stethoscope, CalendarClock, HeartHandshake]

export function HomeFeatures() {
  return (
    <section className="bg-white py-16 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = icons[index] ?? UserRound
            return (
              <li key={pillar.title} className="bob rounded-3xl bg-[#f4f8fb] p-7" style={{ animationDelay: `${index * 0.9}s` }}>
                <span className="grid size-12 place-items-center rounded-full bg-white text-primary ring-1 ring-black/5">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-[#14324f]">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{pillar.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
