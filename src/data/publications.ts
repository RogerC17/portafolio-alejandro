import { siteContent } from "@/content/load"
import { SITE_NAME } from "@/data/site"

export interface Publication {
  slug: string
  title: string
  description: string
  year: string
  datePublished: string
  cover?: string
  coverBack?: string
  coverSpine?: string
  spineTitle?: string
  url?: string
  buyUrl: string
  authors: string[]
  publisher?: string
  content: string[]
}

export const publicationsLead = siteContent.publicationsLead

export function publicationAuthorsLabel(authors: string[]): string {
  if (authors.length <= 1) {
    return authors[0] ?? SITE_NAME
  }

  if (authors.length === 2) {
    return `${authors[0]} y ${authors[1]}`
  }

  return `${authors.slice(0, -1).join(", ")} y ${authors[authors.length - 1]}`
}

export const publications: Publication[] = siteContent.publications as Publication[]

const publicationsBySlug = new Map(
  publications.map((publication) => [publication.slug, publication]),
)

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publicationsBySlug.get(slug)
}

export function getRelatedPublications(slug: string): Publication[] {
  return publications.filter((publication) => publication.slug !== slug)
}
