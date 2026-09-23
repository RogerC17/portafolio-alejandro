import { notFound } from "next/navigation"
import { PressClipping } from "@/components/prensa/PressClipping"
import { NewsArticleStructuredData } from "@/components/seo/NewsArticleStructuredData"
import {
  getPressItemBySlug,
  getRelatedPressItems,
  pressItems,
} from "@/data/press"
import { createPressMetadata } from "@/lib/seo"

type PressSlugPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return pressItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PressSlugPageProps) {
  const { slug } = await params
  const item = getPressItemBySlug(slug)

  if (!item) {
    return { title: "Prensa" }
  }

  return createPressMetadata(item)
}

export default async function PressSlugPage({ params }: PressSlugPageProps) {
  const { slug } = await params
  const item = getPressItemBySlug(slug)

  if (!item) {
    notFound()
  }

  const related = getRelatedPressItems(item.slug)

  return (
    <main id="contenido" className="flex-1">
      <NewsArticleStructuredData item={item} />
      <PressClipping item={item} related={related} />
    </main>
  )
}
