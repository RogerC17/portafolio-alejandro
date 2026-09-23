import type { Article } from "@/data/articles"
import { SITE_URL } from "@/data/site"

type ArticleStructuredDataProps = {
  article: Article
}

export function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const url = new URL(`/ideas/${article.slug}`, SITE_URL).toString()
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.dateIso,
    author: {
      "@type": "Person",
      name: article.author,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  }

  if (article.image) {
    data.image = new URL(article.image, SITE_URL).toString()
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
