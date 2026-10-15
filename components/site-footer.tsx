import Link from "next/link"
import { Logo } from "@/components/logo"
import { clinic, nav, patientTools, services } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white pb-24 text-[#475569] md:pb-0">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <Logo alt="Cloud 9 Physical Therapy" className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            One-to-one physical therapy on Thompson Road. The hour belongs to you, and so does the clinician.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="hover:text-primary">
                Book appointment
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-primary">
                Clinic photos
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-primary uppercase">For patients</p>
          <ul className="mt-4 space-y-2 text-sm">
            {patientTools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href} className="hover:text-primary">
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-primary">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={clinic.phoneHref} className="font-semibold text-[#1E293B] hover:text-primary">
                {clinic.phone}
              </a>
            </li>
            <li>Fax {clinic.fax}</li>
            <li>
              <a href={`mailto:${clinic.email}`} className="hover:text-primary">
                {clinic.email}
              </a>
            </li>
            <li>
              {clinic.addressLines[0]}
              <br />
              {clinic.addressLines[1]}
            </li>
          </ul>
          <ul className="mt-4 space-y-1 text-sm">
            {clinic.hours.map((row) => (
              <li key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span className="text-[#1E293B]">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <iframe
          title="Map of Cloud 9 Physical Therapy at 5370 E. Thompson Rd, Suite G, Indianapolis"
          src={clinic.mapEmbed}
          className="h-56 w-full rounded-xl border border-border"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-10 border-t border-border">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Cloud 9 Physical Therapy.</p>
          <p className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/accessibility" className="hover:text-primary">
              Accessibility
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
