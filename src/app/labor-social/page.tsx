import { SocialWorkArchive } from "@/components/labor-social/SocialWorkArchive"
import { socialWorkLead } from "@/data/social-work"
import { createPageMetadata } from "@/lib/seo"

export const dynamic = "force-static"

export const metadata = createPageMetadata("Labor social", "/labor-social", socialWorkLead)

export default function LaborSocialPage() {
  return (
    <main id="contenido" className="flex-1">
      <SocialWorkArchive />
    </main>
  )
}
