import type { Metadata } from "next"
import type { Article } from "@/data/articles"
import {
  pressItemDescription,
  type PressItem,
} from "@/data/press"
import type { Publication } from "@/data/publications"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site"

function canonicalUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export function createPageMetadata(
  title: string,
  path: string,
  description: string = SITE_DESCRIPTION,
): Metadata {
  const canonical = canonicalUrl(path)

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "es_CO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  }
}

export function createPublicationMetadata(publication: Publication): Metadata {
  const path = `/publicaciones/${publication.slug}`
  const canonical = canonicalUrl(path)
  const imageUrl = publication.cover

  return {
    title: publication.title,
    description: publication.description,
    authors: publication.authors.map((name) =>
      name === SITE_NAME ? { name, url: SITE_URL } : { name },
    ),
    alternates: {
      canonical,
    },
    openGraph: {
      title: publication.title,
      description: publication.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "es_CO",
      type: "book",
      authors: publication.authors,
      releaseDate: publication.datePublished,
      ...(imageUrl ? { images: [{ url: imageUrl, alt: publication.title }] } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: publication.title,
      description: publication.description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  }
}

export function createPressMetadata(item: PressItem): Metadata {
  const path = `/prensa/${item.slug}`
  const canonical = canonicalUrl(path)
  const description = pressItemDescription(item)
  const imageUrl = item.image

  return {
    title: item.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: item.title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "es_CO",
      type: "article",
      ...(item.dateIso ? { publishedTime: item.dateIso } : {}),
      ...(imageUrl ? { images: [{ url: imageUrl, alt: item.title }] } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: item.title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  }
}

export function createArticleMetadata(article: Article): Metadata {
  const path = `/ideas/${article.slug}`
  const canonical = canonicalUrl(path)
  const imageUrl = article.image

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author, url: SITE_URL }],
    alternates: {
      canonical,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonical,
      siteName: SITE_NAME,
      locale: "es_CO",
      type: "article",
      publishedTime: article.dateIso,
      authors: [article.author],
      ...(imageUrl ? { images: [{ url: imageUrl, alt: article.title }] } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: article.title,
      description: article.excerpt,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  }
}
