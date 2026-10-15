import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { MobileDock } from "@/components/mobile-dock"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { clinic } from "@/lib/content"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})


export const metadata: Metadata = {
  metadataBase: new URL("https://cloud9physicaltherapy.com"),
  title: {
    default: "Cloud 9 Physical Therapy",
    template: "%s · Cloud 9 Physical Therapy",
  },
  description:
    "One-to-one physical therapy at 5370 E. Thompson Rd, Suite G, Indianapolis. No referral needed. Medicare and most private plans. Saturday hours.",
  openGraph: {
    title: "Cloud 9 Physical Therapy",
    description:
      "One-to-one physical therapy on the south side of Indianapolis. The hour belongs to you.",
    siteName: "Cloud 9 Physical Therapy",
    locale: "en_US",
    type: "website",
    images: ["/images/clinic/about-room.jpg"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["PhysicalTherapy", "LocalBusiness"],
  name: clinic.name,
  telephone: clinic.phone,
  faxNumber: clinic.fax,
  email: clinic.email,
  url: "https://cloud9physicaltherapy.com",
  image: "/images/clinic/about-room.jpg",
  hasMap: clinic.mapsUrl,
  areaServed: "Indianapolis, IN",
  paymentAccepted: "Medicare, private insurance, self-pay",
  currenciesAccepted: "USD",
  openingHours: ["Mo-Fr 07:00-19:00", "Sa 08:00-14:00"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "5370 E. Thompson Rd, Ste. G",
    addressLocality: "Indianapolis",
    addressRegion: "IN",
    postalCode: "46237",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "14:00",
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} min-h-screen antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="pb-24 md:pb-0">{children}</main>
        <SiteFooter />
        <MobileDock />
      </body>
    </html>
  )
}
