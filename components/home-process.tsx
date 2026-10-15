import { processSteps } from "@/lib/content"

export function HomeProcess() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="text-[1.875rem] leading-snug sm:text-[2.5rem]">From the first hour forward.</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={step.title} className="border-t border-black/10 pt-6">
              <p className="text-sm font-semibold text-[#0F4C5C]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
