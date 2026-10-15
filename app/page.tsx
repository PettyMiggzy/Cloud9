import { FaqList } from "@/components/faq-list"
import { HomeAbout } from "@/components/home-about"
import { HomeCta } from "@/components/home-cta"
import { HomeFeatures } from "@/components/home-features"
import { HomeHero } from "@/components/home-hero"
import { HomeProcess } from "@/components/home-process"
import { HomeServices } from "@/components/home-services"
import { HomeTestimonials } from "@/components/home-testimonials"
import { PartnerRail } from "@/components/partner-rail"
import { Reveal } from "@/components/reveal"

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeatures />
      <HomeAbout />
      <HomeServices />
      <HomeTestimonials />
      <section className="border-y border-border bg-white py-24 md:py-32">
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
      <section id="faq" className="scroll-mt-24 bg-white py-24 md:py-32">
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
      <HomeProcess />
      <HomeCta />
    </>
  )
}
