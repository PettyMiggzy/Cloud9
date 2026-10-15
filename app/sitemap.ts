import type { MetadataRoute } from "next"
import { services } from "@/lib/content"

export const dynamic = "force-static"

const base = "https://cloud9physicaltherapy.com"

const paths = [
  "",
  "/about",
  "/services",
  "/book",
  "/booking",
  "/visit",
  "/gallery",
  "/start",
  "/first-visit",
  "/insurance",
  "/refer",
  "/southside",
  "/privacy",
  "/accessibility",
  ...services.map((service) => `/services/${service.slug}`),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-10-15"),
  }))
}
