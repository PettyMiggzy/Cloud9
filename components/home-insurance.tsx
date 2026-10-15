import { InsuranceForm } from "@/components/insurance-form"

export function HomeInsurance() {
  return (
    <section id="insurance-check" className="scroll-mt-24 bg-white py-20 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">Insurance</p>
          <h2 className="mt-4 text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-balance text-[#14324f] sm:text-6xl">
            Not sure what your plan covers?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#334155]">
            Tell the clinic your plan. They look at your benefits and explain them before you are guessing at a bill. Medicare is accepted, and so are most private plans.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#475569]">
            This sends a request. It does not confirm coverage, and a visit is not held until the clinic replies.
          </p>
        </div>
        <div>
          <InsuranceForm />
        </div>
      </div>
    </section>
  )
}
