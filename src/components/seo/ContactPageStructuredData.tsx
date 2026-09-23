import { contactLead } from "@/data/contact"
import { SITE_NAME, SITE_URL } from "@/data/site"
import { socialLinks } from "@/data/social"

export function ContactPageStructuredData() {
  const url = new URL("/contacto", SITE_URL).toString()
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto",
    description: contactLead,
    url,
    mainEntity: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: socialLinks.map((link) => link.href),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bogotá",
        addressCountry: "CO",
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
