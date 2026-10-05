import { PrensaArchive } from "@/components/prensa/PrensaArchive"
import { NewsArticleStructuredData } from "@/components/seo/NewsArticleStructuredData"
import { pressItems, pressLead } from "@/data/press"
import { createPageMetadata } from "@/lib/seo"

export const dynamic = "force-static"

export const metadata = createPageMetadata("Prensa", "/prensa", pressLead)

export default function PrensaPage() {
  return (
    <main id="contenido" className="flex-1">
      {pressItems.map((item) => (
        <NewsArticleStructuredData key={item.slug} item={item} />
      ))}
      <PrensaArchive />
    </main>
  )
}
