import type { Publication } from "@/data/publications"
import { SITE_NAME, SITE_URL } from "@/data/site"

type BookStructuredDataProps = {
  publication: Publication
}

export function BookStructuredData({ publication }: BookStructuredDataProps) {
  const url = new URL(
    `/publicaciones/${publication.slug}`,
    SITE_URL,
  ).toString()

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: publication.title,
    description: publication.description,
    datePublished: publication.datePublished,
    author: publication.authors.map((name) =>
      name === SITE_NAME
        ? { "@type": "Person", name, url: SITE_URL }
        : { "@type": "Person", name },
    ),
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  if (publication.cover) {
    data.image = new URL(publication.cover, SITE_URL).toString()
  }

  if (publication.publisher) {
    data.publisher = {
      "@type": "Organization",
      name: publication.publisher,
    }
  }

  if (publication.url) {
    data.sameAs = publication.url
  }

  if (publication.buyUrl) {
    data.offers = {
      "@type": "Offer",
      url: publication.buyUrl,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
