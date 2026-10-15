import { FaqList } from "@/components/faq-list"
import { faqs } from "@/lib/content"
import { HomeAbout } from "@/components/home-about"
import { HomeCta } from "@/components/home-cta"
import { HomeFees } from "@/components/home-fees"
import { HomeFeatures } from "@/components/home-features"
import { HomeHero } from "@/components/home-hero"
import { HomeInsurance } from "@/components/home-insurance"
import { HomeHour } from "@/components/home-hour"
import { HomeCareRail } from "@/components/home-care-rail"
import { HomeTeam } from "@/components/home-team"
import { HomeTestimonials } from "@/components/home-testimonials"
import { PartnerRail } from "@/components/partner-rail"
import { Reveal } from "@/components/reveal"

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomeHero />
      <HomeFeatures />
      <HomeHour />
      <HomeCareRail />
      <HomeAbout />
      <HomeTeam />
      <HomeFees />
      <HomeInsurance />
      <HomeTestimonials />
      <section className="border-y border-border bg-white py-16 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Community</p>
            <h2 className="mt-3 text-[1.875rem] leading-tight sm:text-[2.5rem]">Neighbors they show up for.</h2>
          </Reveal>
          <div className="mt-8">
            <PartnerRail />
          </div>
        </div>
      </section>
      <section id="faq" className="scroll-mt-24 bg-white py-16 md:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">FAQ</p>
            <h2 className="mt-3 text-[1.875rem] leading-tight sm:text-[2.5rem]">Before you come in.</h2>
          </Reveal>
          <div className="mt-8">
            <FaqList />
          </div>
        </div>
      </section>
      <HomeCta />
    </>
  )
}
