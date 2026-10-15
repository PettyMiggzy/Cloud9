import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import { MobileDock } from "@/components/mobile-dock"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { clinic, reviews } from "@/lib/content"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://cloud9physicaltherapy.com"),
  title: {
    default: "Cloud 9 Physical Therapy · Indianapolis",
    template: "%s · Cloud 9 Physical Therapy",
  },
  description:
    "One-to-one physical therapy at 5370 E. Thompson Rd, Suite G, Indianapolis. No referral needed. Medicare and most private plans. Saturday hours.",
  openGraph: {
    title: "Cloud 9 Physical Therapy",
    description:
      "Your journey to recovery starts here. Personalized physical therapy on the south side of Indianapolis.",
    siteName: "Cloud 9 Physical Therapy",
    locale: "en_US",
    type: "website",
    images: ["/images/clinic/services.jpg"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["PhysicalTherapy", "MedicalBusiness", "LocalBusiness"],
  name: clinic.name,
  telephone: clinic.phone,
  faxNumber: clinic.fax,
  email: clinic.email,
  url: "https://cloud9physicaltherapy.com",
  image: "https://cloud9physicaltherapy.com/images/clinic/services.jpg",
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
  review: reviews.map((review) => ({
    "@type": "Review",
    author: { "@type": "Person", name: review.name },
    reviewBody: review.text,
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    url: review.url,
  })),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} min-h-screen antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="pb-24 md:pb-0">
          {children}
        </main>
        <SiteFooter />
        <MobileDock />
      </body>
    </html>
  )
}
