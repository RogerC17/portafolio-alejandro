import { IdeasArchive } from "@/components/ideas/IdeasArchive"
import { IdeasIntro } from "@/components/ideas/IdeasIntro"
import { ideasLead } from "@/data/articles"
import { createPageMetadata } from "@/lib/seo"

export const dynamic = "force-static"

export const metadata = createPageMetadata("Ideas", "/ideas", ideasLead)

export default function IdeasPage() {
  return (
    <main id="contenido" className="flex-1">
      <IdeasIntro />
      <IdeasArchive />
    </main>
  )
}
