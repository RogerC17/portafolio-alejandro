import { notFound } from "next/navigation"
import { PublicationArticle } from "@/components/publicaciones/PublicationArticle"
import { BookStructuredData } from "@/components/seo/BookStructuredData"
import {
  getPublicationBySlug,
  getRelatedPublications,
  publications,
} from "@/data/publications"
import { createPublicationMetadata } from "@/lib/seo"

type PublicationSlugPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }))
}

export async function generateMetadata({ params }: PublicationSlugPageProps) {
  const { slug } = await params
  const publication = getPublicationBySlug(slug)

  if (!publication) {
    return { title: "Publicación" }
  }

  return createPublicationMetadata(publication)
}

export default async function PublicationSlugPage({
  params,
}: PublicationSlugPageProps) {
  const { slug } = await params
  const publication = getPublicationBySlug(slug)

  if (!publication) {
    notFound()
  }

  const related = getRelatedPublications(publication.slug)

  return (
    <main id="contenido" className="flex-1">
      <BookStructuredData publication={publication} />
      <PublicationArticle publication={publication} related={related} />
    </main>
  )
}
