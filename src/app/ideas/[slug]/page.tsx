import { notFound } from "next/navigation"
import { IdeaArticle } from "@/components/ideas/IdeaArticle"
import { ArticleStructuredData } from "@/components/seo/ArticleStructuredData"
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles"
import { createArticleMetadata } from "@/lib/seo"

type IdeaSlugPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: IdeaSlugPageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return { title: "Idea" }
  }

  return createArticleMetadata(article)
}

export default async function IdeaSlugPage({ params }: IdeaSlugPageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const related = getRelatedArticles(article.slug)

  return (
    <main id="contenido" className="flex-1">
      <ArticleStructuredData article={article} />
      <IdeaArticle article={article} related={related} />
    </main>
  )
}
