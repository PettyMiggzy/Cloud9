import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { clinic, team, values } from "@/lib/content"

export const metadata: Metadata = {
  title: "The team",
  description: "Meet Dr. Sakshi Nandal and the Cloud 9 Physical Therapy team in Indianapolis.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">The practice</p>
      <h1 className="mt-3 max-w-3xl font-heading text-5xl leading-tight">
        A clinic built around the person on the table.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Cloud 9 exists so people can live without the pain and the limits that shrink a week. The work is
        evidence-based, and it is aimed at the cause, not only the spot that hurts today. Everyone on the team is
        part of that, including the people who answer the phone.
      </p>

      <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/clinic/about.jpg"
            alt="The gym wall that reads Movement is medicine"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-heading text-3xl">Painted where patients can see it.</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {values.map((value) => (
              <li key={value} className="rounded-full bg-foam px-3 py-1 text-sm font-medium text-foreground">
                {value}
              </li>
            ))}
          </ul>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Years of practice, and the habit of keeping up with the techniques that actually change a session:
            manual therapy, dry needling, vestibular work, and the unglamorous business of teaching someone how to
            move when they get home.
          </p>
        </div>
      </div>

      <h2 className="mt-16 font-heading text-4xl">The team</h2>
      <ul className="mt-8 space-y-12">
        {team.map((person, index) => (
          <li
            id={person.image.split("/").pop()?.replace(".jpg", "")}
            key={person.name}
            className="lift-in scroll-mt-28 grid items-center gap-6 md:grid-cols-[220px_1fr]"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover object-top"
                sizes="220px"
                priority={index === 0}
              />
            </div>
            <div>
              <h3 className="font-heading text-3xl">{person.name}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{person.role}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{person.bio}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-16 rounded-[2rem] bg-foam px-6 py-10 sm:px-10">
        <h2 className="font-heading text-4xl">Come meet them in the room.</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          The first visit is an hour. Bring the story of what stopped working, and clothes that can be moved out of the way.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button className="h-11 px-5" render={<Link href="/book" />}>
            Book a visit
          </Button>
          <Button variant="outline" className="h-11 bg-white px-5" render={<a href={clinic.phoneHref} />}>
            Call {clinic.phone}
          </Button>
          <Link href="/first-visit" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            What the first visit is like
          </Link>
        </div>
      </div>
    </div>
  )
}
