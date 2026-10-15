import { Star } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { reviews } from "@/lib/content"

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function HomeTestimonials() {
  return (
    <section className="bg-[#FAFBFC] py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Google reviews</p>
          <h2 className="mt-3 max-w-xl text-[1.875rem] leading-tight sm:text-[2.5rem]">In their words, as written.</h2>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.url}>
              <Reveal>
                <figure className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5">
                  <div className="flex gap-1 text-primary" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[17px] leading-[1.6] text-[#1E293B]">
                    <p>{review.text}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#E8F4F8] text-sm font-semibold text-[#0F4C5C]">
                      {initials(review.name)}
                    </span>
                    <span>
                      <a href={review.url} target="_blank" rel="noreferrer" className="font-semibold text-[#1E293B] hover:text-primary">
                        {review.name}
                      </a>
                      <span className="mt-0.5 block text-xs tracking-wide text-[#475569] uppercase">via Google</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
