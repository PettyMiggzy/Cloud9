import { ReviewButton } from "@/components/review-button"
import { reviews } from "@/lib/content"

function Card({ review }: { review: (typeof reviews)[number] }) {
  return (
    <li className="w-[19rem] shrink-0 rounded-3xl bg-white p-7 ring-1 ring-black/5 sm:w-96">
      <p aria-hidden="true" className="text-amber-400">★★★★★</p>
      <p className="mt-3 text-[17px] leading-relaxed text-[#1E293B]">“{review.text}”</p>
      <a href={review.url} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-[#14324f] hover:text-primary">
        {review.name} · Google review
      </a>
    </li>
  )
}

export function HomeTestimonials() {
  return (
    <section className="overflow-hidden bg-[#f4f8fb] py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">Reviews</p>
        <h2 className="mt-4 text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-balance text-[#14324f] sm:text-6xl">
          In their words, as written.
        </h2>
        <ReviewButton className="mt-6 h-11 rounded-full px-5" />
      </div>
      <div className="marquee mt-12 overflow-hidden">
        <ul className="marquee-track flex w-max gap-5 px-5">
          {[...reviews, ...reviews].map((review, index) => (
            <Card key={`${review.url}-${index}`} review={review} />
          ))}
        </ul>
      </div>
    </section>
  )
}
