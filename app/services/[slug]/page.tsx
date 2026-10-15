import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { clinic, getService, services } from "@/lib/content"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: "Care" }
  return { title: service.name, description: service.short }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <article className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
        <Link href="/services" className="hover:underline">
          Care
        </Link>
      </p>
      <div className="mt-4 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="font-heading text-4xl leading-tight text-balance sm:text-5xl">{service.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{service.lead}</p>
          <h2 className="mt-8 font-heading text-2xl">Who it is for</h2>
          <ul className="mt-3 space-y-2">
            {service.forWhom.map((item) => (
              <li key={item} className="border-l-2 border-primary pl-3 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-heading text-2xl">A visit</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{service.visit}</p>
          <h2 className="mt-8 font-heading text-2xl">How long it tends to take</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{service.timeline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-11 px-5" render={<Link href={`/book?service=${service.slug}`} />}>
              Request this visit
            </Button>
            <Button variant="outline" className="h-11 px-5" render={<Link href="/visit" />}>
              Fees and hours
            </Button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            <Link href={`/insurance?service=${service.slug}`} className="font-medium text-primary hover:underline">
              Check insurance for this visit
            </Link>
            {" · "}
            <Link href="/start" className="font-medium text-primary hover:underline">
              Not sure this is the one?
            </Link>
            {" · "}
            <a href={clinic.phoneHref} className="font-medium text-primary hover:underline">
              Call {clinic.phone}
            </a>
            . The evaluation decides the plan.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:sticky lg:top-28">
          <Image src={service.image} alt={service.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" priority />
        </div>
      </div>

      <h2 className="mt-16 font-heading text-3xl">Other care</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {others.map((item) => (
          <li key={item.slug}>
            <Link href={`/services/${item.slug}`} className="block rounded-2xl border border-border p-4 hover:border-primary">
              <span className="font-heading text-xl">{item.name}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{item.short}</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
