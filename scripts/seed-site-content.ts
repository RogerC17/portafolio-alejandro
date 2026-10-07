import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { careerEvents, careerLead } from "../src/data/career"
import { contactLead, contactQuote, contactTitle, contactCta } from "../src/data/contact"
import { focusAreas } from "../src/data/focus-areas"
import { HERO_LEAD, MANIFESTO_QUOTE_LINES, MANIFESTO_SUPPORT } from "../src/data/home"
import { pressItems, pressLead } from "../src/data/press"
import { projects, projectsLead } from "../src/data/projects"
import { publications, publicationsLead } from "../src/data/publications"
import { SITE_DESCRIPTION, SITE_LOCATION, SITE_NAME, SITE_ROLE, SITE_STATEMENT, SITE_TITLE } from "../src/data/site"
import { socialLinks } from "../src/data/social"
import { socialWorkItems, socialWorkLead } from "../src/data/social-work"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const target = join(root, "content", "site.json")

const document = {
  site: {
    name: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    location: SITE_LOCATION,
    statement: SITE_STATEMENT,
    role: SITE_ROLE,
  },
  home: {
    heroLead: HERO_LEAD,
    manifestoLines: [...MANIFESTO_QUOTE_LINES],
    manifestoSupport: MANIFESTO_SUPPORT,
  },
  contact: {
    lead: contactLead,
    quote: contactQuote,
    title: contactTitle,
    ctaLabel: contactCta.label,
  },
  social: socialLinks,
  focus: focusAreas,
  pressLead,
  press: pressItems,
  publicationsLead,
  publications,
  careerLead,
  career: careerEvents,
  projectsLead,
  projects,
  socialWorkLead,
  socialWork: socialWorkItems,
}

mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, `${JSON.stringify(document, null, 2)}\n`, "utf8")
console.log(target)
