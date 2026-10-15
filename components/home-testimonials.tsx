import { reviews } from "@/lib/content"

export function HomeTestimonials() {
  const ordered = [reviews[1], reviews[4], reviews[3], reviews[2], reviews[0]].filter((review) => review != null)
  const [featured, ...rest] = ordered
  if (!featured) return null

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="text-[1.875rem] leading-snug sm:text-[2.5rem]">In their words, as written.</h2>
        <figure className="mt-12 max-w-3xl">
          <blockquote className="text-2xl leading-snug text-[#1E293B] sm:text-3xl">
            <p>“{featured.text}”</p>
          </blockquote>
          <figcaption className="mt-6 text-sm text-[#475569]">
            <a href={featured.url} target="_blank" rel="noreferrer" className="font-semibold text-[#1E293B] hover:text-primary">
              {featured.name}
            </a>
            <span> · 5-star review via Google</span>
          </figcaption>
        </figure>
        <ul className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {rest.map((review) => (
            <li key={review.url} className="grid gap-3 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
              <a href={review.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#1E293B] hover:text-primary">
                {review.name}
              </a>
              <p className="text-[17px] leading-relaxed text-[#334155]">“{review.text}”</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
