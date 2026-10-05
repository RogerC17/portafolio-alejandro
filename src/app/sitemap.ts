import type { MetadataRoute } from "next"
import { pressItems } from "@/data/press"
import { publications } from "@/data/publications"
import { NAV_ITEMS, SITE_URL } from "@/data/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const navEntries = NAV_ITEMS.map((item) => ({
    url: new URL(item.href, SITE_URL).toString(),
    lastModified,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  })) satisfies MetadataRoute.Sitemap

  const publicationEntries = publications.map((publication) => ({
    url: new URL(`/publicaciones/${publication.slug}`, SITE_URL).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const pressEntries = pressItems.map((item) => ({
    url: new URL(`/prensa/${item.slug}`, SITE_URL).toString(),
    lastModified: item.dateIso ? new Date(item.dateIso) : lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...navEntries, ...publicationEntries, ...pressEntries]
}
