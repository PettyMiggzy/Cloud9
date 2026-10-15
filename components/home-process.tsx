import { Reveal } from "@/components/reveal"
import { processSteps } from "@/lib/content"

export function HomeProcess() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">How it works</p>
          <h2 className="mt-3 text-[1.875rem] leading-tight sm:text-[2.5rem]">From the first hour forward.</h2>
        </Reveal>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
          {processSteps.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal>
                <div className="flex items-center gap-4 md:flex-col md:items-start">
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0F4C5C] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  {index < processSteps.length - 1 ? (
                    <span className="absolute top-6 left-6 hidden h-px w-[calc(100%+1.5rem)] bg-[#0F4C5C]/20 md:block" aria-hidden="true" />
                  ) : null}
                  {index < processSteps.length - 1 ? (
                    <span className="absolute top-12 left-6 h-[calc(100%+1rem)] w-px bg-[#0F4C5C]/20 md:hidden" aria-hidden="true" />
                  ) : null}
                </div>
                <h3 className="mt-4 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
