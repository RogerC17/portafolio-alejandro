import { pressItemDescription, type PressItem } from "@/data/press"
import { SITE_NAME, SITE_URL } from "@/data/site"

type NewsArticleStructuredDataProps = {
  item: PressItem
}

export function NewsArticleStructuredData({
  item,
}: NewsArticleStructuredDataProps) {
  const pageUrl = new URL(`/prensa/${item.slug}`, SITE_URL).toString()
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: pressItemDescription(item),
    publisher: {
      "@type": "Organization",
      name: item.media,
    },
    url: item.url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    about: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  if (item.dateIso) {
    data.datePublished = item.dateIso
  }

  if (item.image) {
    data.image = new URL(item.image, SITE_URL).toString()
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
