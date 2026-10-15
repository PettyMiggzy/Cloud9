"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { areas, recommend, stories, type AreaId, type StoryId } from "@/lib/recommend"
import { getService } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

function Choice({
  name,
  checked,
  label,
  detail,
  onChange,
}: {
  name: string
  checked: boolean
  label: string
  detail: string
  onChange: () => void
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
        checked ? "border-primary bg-foam" : "border-border hover:border-primary/40"
      )}
    >
      <input type="radio" name={name} className="mt-1" checked={checked} onChange={onChange} />
      <span>
        <span className="block font-medium">{label}</span>
        <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{detail}</span>
      </span>
    </label>
  )
}

export function StartMatcher() {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [area, setArea] = useState<AreaId | "">("")
  const [story, setStory] = useState<StoryId | "">("")
  const [error, setError] = useState("")

  function chooseArea(id: AreaId) {
    setArea(id)
    setError("")
  }

  function chooseStory(id: StoryId) {
    setStory(id)
    setError("")
  }

  function next() {
    if (step === 0 && !area) {
      setError("Choose the closest place. If it is not one spot, pick the last answer.")
      return
    }
    if (step === 1 && !story) {
      setError("Choose the closest story. The last answer is there if none of them fit.")
      return
    }
    setError("")
    setStep((current) => (current === 0 ? 1 : 2))
  }

  const areaChoice = areas.find((item) => item.id === area)
  const storyChoice = stories.find((item) => item.id === story)
  const match = area && story ? recommend(area, story) : null
  const service = match ? getService(match.service) : undefined
  const alternate = match?.alternate ? getService(match.alternate) : undefined

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-8">
      <ol className="mb-8 grid grid-cols-2 gap-2">
        {["Where", "What happened"].map((label, index) => (
          <li key={label}>
            <button
              type="button"
              disabled={index > step || step === 2}
              onClick={() => {
                if (index < step && step !== 2) {
                  setError("")
                  setStep(index as 0 | 1)
                }
              }}
              className={cn(
                "w-full border-b-2 pb-2 text-left text-xs font-medium tracking-wide uppercase sm:text-sm",
                index === step ? "border-primary text-primary" : "border-border text-muted-foreground",
                index < step && step !== 2 && "cursor-pointer"
              )}
            >
              {index + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <fieldset>
          <legend className="font-heading text-3xl text-balance">Where does it bother you most?</legend>
          <p className="mt-2 text-muted-foreground">Pick the closest answer. It does not have to be perfect, and it is not a diagnosis.</p>
          <div className="mt-6 grid gap-2">
            {areas.map((item) => (
              <Choice
                key={item.id}
                name="area"
                checked={area === item.id}
                label={item.label}
                detail={item.detail}
                onChange={() => chooseArea(item.id)}
              />
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset>
          <legend className="font-heading text-3xl text-balance">What happened?</legend>
          <p className="mt-2 text-muted-foreground">Again, the closest story. The evaluation is what actually decides the plan.</p>
          <div className="mt-6 grid gap-2">
            {stories.map((item) => (
              <Choice
                key={item.id}
                name="story"
                checked={story === item.id}
                label={item.label}
                detail={item.detail}
                onChange={() => chooseStory(item.id)}
              />
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 2 && service && match ? (
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">A starting point</p>
          <div className="mt-3 sm:grid sm:grid-cols-[1fr_11rem] sm:items-start sm:gap-6">
            <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-2xl sm:order-2 sm:mb-0 sm:aspect-[4/5]">
              <Image src={service.image} alt={service.imageAlt} fill className="object-cover" sizes="200px" />
            </div>
            <div>
              <h2 className="font-heading text-3xl text-balance">{service.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You said: {areaChoice?.label}. {storyChoice?.label}.
              </p>
              <p className="mt-3 leading-relaxed">{match.because}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-foam p-4 text-sm leading-relaxed">
            This is a starting point, not medical advice, and not a diagnosis. It only points at a service the clinic already lists. The evaluation decides the plan. Requesting the visit opens an email. It does not hold a time.
          </div>
          {alternate ? (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Part of what you said also lines up with{" "}
              <Link href={`/services/${alternate.slug}`} className="font-medium text-primary hover:underline">
                {alternate.name}
              </Link>
              . You can{" "}
              <Link href={`/book?service=${alternate.slug}`} className="font-medium text-primary hover:underline">
                request that visit
              </Link>{" "}
              instead. That is still not a diagnosis.
            </p>
          ) : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button className="h-11 px-5" render={<Link href={`/book?service=${service.slug}`} />}>
              Request this visit
            </Button>
            <Button variant="outline" className="h-11 px-5" render={<Link href={`/services/${service.slug}`} />}>
              Read about this care
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="h-11 px-5"
              onClick={() => {
                setStep(0)
                setError("")
              }}
            >
              Change answers
            </Button>
          </div>
        </div>
      ) : null}

      {step === 2 && !service ? (
        <p role="alert" className="text-sm text-destructive">
          That match is not on the service list.{" "}
          <Link href="/services" className="font-medium underline">
            Browse the care pages
          </Link>{" "}
          instead.
        </p>
      ) : null}

      {error ? (
        <p role="alert" className="mt-5 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {step < 2 ? (
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step === 0 ? (
            <Button variant="ghost" render={<Link href="/services" />}>
              Browse all services
            </Button>
          ) : (
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                setError("")
                setStep(0)
              }}
            >
              Back
            </Button>
          )}
          <Button type="button" className="h-11 px-5" onClick={next}>
            Continue
          </Button>
        </div>
      ) : null}
    </div>
  )
}
