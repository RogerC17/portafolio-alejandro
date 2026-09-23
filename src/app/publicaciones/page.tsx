import { PublicacionesArchive } from "@/components/publicaciones/PublicacionesArchive"
import { PublicacionesIntro } from "@/components/publicaciones/PublicacionesIntro"
import { BookStructuredData } from "@/components/seo/BookStructuredData"
import { publications, publicationsLead } from "@/data/publications"
import { createPageMetadata } from "@/lib/seo"

export const dynamic = "force-static"

export const metadata = createPageMetadata(
  "Publicaciones",
  "/publicaciones",
  publicationsLead,
)

export default function PublicacionesPage() {
  return (
    <main id="contenido" className="flex-1">
      {publications.map((publication) => (
        <BookStructuredData key={publication.slug} publication={publication} />
      ))}
      <PublicacionesIntro />
      <PublicacionesArchive />
    </main>
  )
}
