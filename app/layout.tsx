import type { Metadata } from "next"
import { Fraunces, Outfit } from "next/font/google"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { clinic } from "@/lib/content"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
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
    images: ["/images/clinic/about-room.jpg"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PhysicalTherapy",
  name: clinic.name,
  telephone: clinic.phone,
  email: clinic.email,
  url: "https://cloud9physicaltherapy.com",
  image: "/images/clinic/about-room.jpg",
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
      <body className={`${outfit.variable} ${fraunces.variable} min-h-screen antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
