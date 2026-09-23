import { ContactoIntro } from "@/components/contacto/ContactoIntro"
import { ContactoInvite } from "@/components/contacto/ContactoInvite"
import { ContactPageStructuredData } from "@/components/seo/ContactPageStructuredData"
import { contactLead } from "@/data/contact"
import { createPageMetadata } from "@/lib/seo"

export const dynamic = "force-static"

export const metadata = createPageMetadata("Contacto", "/contacto", contactLead)

export default function ContactoPage() {
  return (
    <main id="contenido" className="flex-1">
      <ContactPageStructuredData />
      <ContactoIntro />
      <ContactoInvite />
    </main>
  )
}
