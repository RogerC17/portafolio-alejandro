import { classifyQuestion, normalizeQuestion } from "@/chat/match"
import { createFaq } from "@/chat/faq"
import { dossierGaps } from "@/chat/gaps"
import { chatPolicy } from "@/chat/policy"
import { refusalCases } from "@/chat/refusals"
import {
  DOSSIER_VERSION,
  type ChatDossier,
  type DossierFact,
  type DossierTopic,
} from "@/chat/types"
import {
  careerCanalHonors,
  careerEvents,
  careerLead,
  careerSeminars,
  type CareerCategory,
  type CareerEvent,
} from "@/data/career"
import { contactLead, contactQuote, contactTitle } from "@/data/contact"
import { focusAreas } from "@/data/focus-areas"
import {
  HERO_LEAD,
  HERO_REGISTER,
  MANIFESTO_QUOTE_LINES,
  MANIFESTO_SUPPORT,
} from "@/data/home"
import { pressItems } from "@/data/press"
import {
  featuredProjects,
  projectCategories,
  projectSourceLabels,
  projects,
  projectsLead,
  canalProjects,
  treceProjects,
} from "@/data/projects"
import {
  publicationAuthorsLabel,
  publications,
  type Publication,
} from "@/data/publications"
import { SITE_LOCATION, SITE_NAME, SITE_ROLE, SITE_STATEMENT } from "@/data/site"
import { socialLinks } from "@/data/social"

const PRESS_NAME = "Jhon Alejandro Linares Camberos"

function registerValue(key: string): string {
  const row = HERO_REGISTER.find((item) => item.key === key)
  if (!row) throw new Error(`Falta el registro del hero: ${key}`)
  return row.value
}

function slug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function shortPlace(value: string | undefined, fallback: string): string {
  if (!value) return fallback
  return value.split("·")[0]?.trim() || fallback
}

function disambiguateLabels(facts: DossierFact[], notes: ReadonlyMap<string, string>) {
  const groups = new Map<string, DossierFact[]>()
  for (const fact of facts) {
    if (!fact.label) continue
    const key = normalizeQuestion(fact.label)
    const group = groups.get(key) ?? []
    group.push(fact)
    groups.set(key, group)
  }

  for (const group of groups.values()) {
    if (group.length < 2) continue
    const bare = group.find(
      (fact) => fact.id.startsWith("libro.") && !fact.id.endsWith(".nota") && !fact.id.endsWith(".compra"),
    )
    for (const fact of group) {
      if (fact === bare) continue
      const note = notes.get(fact.id)
      if (!note) throw new Error(`Rótulo duplicado sin contexto: ${fact.id}`)
      fact.label = `${fact.label} · ${note}`
    }
  }
}

function uniqueParts(parts: string[]): string[] {
  const seen = new Set<string>()
  const unique: string[] = []
  for (const part of parts) {
    const clean = part.trim()
    const key = clean.toLowerCase()
    if (!clean || seen.has(key)) continue
    seen.add(key)
    unique.push(clean)
  }
  return unique
}

function aliasesFor(event: CareerEvent): string[] | undefined {
  if (event.id === "2022-canal-trece") return ["Canal Trece", "gerente"]
  if (event.id === "2012-alcalde") return ["Topaipí", "alcalde"]
  if (event.id === "2023-doctorado") return ["doctorado"]
  if (event.id === "2026-forbes") return ["Forbes"]
  return undefined
}

function topicFor(category: CareerCategory): DossierTopic {
  if (category === "Cargos") return "trayectoria"
  if (category === "Formación") return "formacion"
  return "reconocimiento"
}

function careerText(event: CareerEvent): string {
  const when = event.period ?? event.year
  const place = event.institution ? ` ${event.institution}.` : ""
  const repeated =
    event.description === event.title || event.description === `${event.title}.`
  const body = !repeated && event.description ? ` ${event.description}` : ""
  return `${when}: ${event.title}.${place}${body}`.replace(/\s+/g, " ").trim()
}

function bookText(book: Publication): string {
  return uniqueParts([
    `«${book.title}» (${book.year}), de ${publicationAuthorsLabel(book.authors)}.`,
    book.publisher ? `Editorial: ${book.publisher}.` : "",
    book.description,
    ...book.content,
  ]).join(" ")
}

function buildFacts(): DossierFact[] {
  if (!pressItems.some((item) => item.title.includes(PRESS_NAME))) {
    throw new Error("Ningún titular de prensa usa el nombre extendido del archivo.")
  }

  const linkedIn = socialLinks.find((link) => link.id === "linkedin")
  const labelNotes = new Map<string, string>()
  const facts: DossierFact[] = [
    {
      id: "identidad.nombre",
      topic: "identidad",
      text: SITE_NAME,
      source: "src/data/site.ts",
      href: "/",
    },
    {
      id: "identidad.nombre-en-prensa",
      topic: "identidad",
      text: `En titulares de prensa del archivo el nombre figura como ${PRESS_NAME}.`,
      source: "src/data/press.ts",
    },
    {
      id: "identidad.rol",
      topic: "identidad",
      text: SITE_ROLE,
      source: "src/data/site.ts",
    },
    {
      id: "identidad.lugar",
      topic: "identidad",
      text: SITE_LOCATION,
      source: "src/data/site.ts",
      href: "/contacto",
    },
    {
      id: "identidad.resumen",
      topic: "identidad",
      text: careerLead,
      source: "src/data/career.ts",
      href: "/trayectoria",
    },
    {
      id: "identidad.tramo",
      topic: "identidad",
      text: `Tramo: ${registerValue("Tramo")}.`,
      source: "src/data/home.ts",
    },
    {
      id: "identidad.tesis",
      topic: "identidad",
      text: `Tesis: ${registerValue("Tesis")}.`,
      source: "src/data/home.ts",
      label: registerValue("Tesis"),
    },
    {
      id: "identidad.senal",
      topic: "identidad",
      text: `Señal: ${registerValue("Señal")}.`,
      source: "src/data/home.ts",
      label: registerValue("Señal"),
    },
    {
      id: "identidad.programa",
      topic: "identidad",
      text: MANIFESTO_SUPPORT,
      source: "src/data/home.ts",
    },
    {
      id: "voz.hero",
      topic: "voz",
      text: HERO_LEAD,
      source: "src/data/home.ts",
    },
    {
      id: "voz.manifiesto",
      topic: "voz",
      text: MANIFESTO_QUOTE_LINES.join(" "),
      source: "src/data/home.ts",
    },
    {
      id: "voz.contacto",
      topic: "voz",
      text: contactQuote,
      source: "src/data/contact.ts",
    },
    {
      id: "voz.archivo",
      topic: "voz",
      text: SITE_STATEMENT,
      source: "src/data/site.ts",
    },
  ]

  for (const area of focusAreas) {
    facts.push({
      id: `eje.${area.id}`,
      topic: "eje",
      text: `${area.title}. ${area.lead}`,
      label: area.title,
      href: `/#${area.id}`,
      source: "src/data/focus-areas.ts",
    })
  }

  for (const book of publications) {
    facts.push({
      id: `libro.${book.slug}`,
      topic: "libro",
      text: bookText(book),
      label: book.title,
      aliases: book.spineTitle !== book.title ? [book.spineTitle] : undefined,
      href: `/publicaciones/${book.slug}`,
      source: "src/data/publications.ts",
    })
    if (book.url) {
      facts.push({
        id: `libro.${book.slug}.nota`,
        topic: "libro",
        text: `Nota de «${book.title}»: ${book.url}`,
        href: book.url,
        source: "src/data/publications.ts",
      })
    }
    facts.push({
      id: `libro.${book.slug}.compra`,
      topic: "libro",
      text: `Compra de «${book.title}»: ${book.buyUrl}`,
      href: book.buyUrl,
      source: "src/data/publications.ts",
    })
  }

  for (const event of careerEvents) {
    const topic = topicFor(event.category)
    const id = `${topic}.${event.id}`
    labelNotes.set(id, shortPlace(event.institution, event.year))
    facts.push({
      id,
      topic,
      text: careerText(event),
      label: event.title,
      aliases: aliasesFor(event),
      href: "/trayectoria",
      source: "src/data/career.ts",
    })
  }

  facts.push({
    id: "reconocimiento.canal-trece-conjunto",
    topic: "reconocimiento",
    text: careerCanalHonors,
    href: "/trayectoria",
    source: "src/data/career.ts",
  })

  for (const seminar of careerSeminars) {
    facts.push({
      id: `seminario.${slug(seminar.title)}`,
      topic: "seminario",
      text: seminar.institution
        ? `${seminar.title}. ${seminar.institution}.`
        : `${seminar.title}.`,
      label: seminar.title,
      href: "/trayectoria",
      source: "src/data/career.ts",
    })
  }

  const featured = featuredProjects.map((project) => project.title).join("; ")
  facts.push({
    id: "proyecto.indice",
    topic: "proyecto",
    text: `${projectsLead} En el archivo hay ${treceProjects.length} especiales de Enlace Trece y ${canalProjects.length} piezas de SoyAlejo4.0. Categorías: ${projectCategories.join(", ")}. En portada: ${featured}.`,
    href: "/proyectos",
    source: "src/data/projects.ts",
  })

  for (const project of projects) {
    facts.push({
      id: `proyecto.${project.id}`,
      topic: "proyecto",
      text: `${projectSourceLabels[project.source]}. ${project.category}: ${project.title}.`,
      label: project.title,
      href: project.url,
      source: "src/data/projects.ts",
    })
  }

  facts.push({
    id: "prensa.indice",
    topic: "prensa",
    text: `El archivo registra ${pressItems.length} notas. Cada ficha trae medio, titular, fecha cuando consta, y enlace.`,
    href: "/prensa",
    source: "src/data/press.ts",
  })

  for (const item of pressItems) {
    const id = `prensa.${item.slug}`
    labelNotes.set(id, item.media)
    facts.push({
      id,
      topic: "prensa",
      text: item.date ? `${item.date} · ${item.media}: ${item.title}` : `${item.media}: ${item.title}`,
      date: item.dateIso,
      label: item.title,
      href: item.url,
      source: "src/data/press.ts",
    })
  }

  facts.push(
    {
      id: "contacto.invitacion",
      topic: "contacto",
      text: contactTitle,
      href: "/contacto",
      source: "src/data/contact.ts",
    },
    {
      id: "contacto.nota",
      topic: "contacto",
      text: contactLead,
      href: "/contacto",
      source: "src/data/contact.ts",
    },
    {
      id: "contacto.redes",
      topic: "contacto",
      text: socialLinks.map((link) => `${link.label}: ${link.href}`).join(" "),
      href: linkedIn?.href ?? "/contacto",
      source: "src/data/social.ts",
    },
  )

  disambiguateLabels(facts, labelNotes)
  return facts
}

export function validateDossier(dossier: ChatDossier): void {
  const ids = new Set<string>()
  for (const fact of dossier.facts) {
    if (ids.has(fact.id)) throw new Error(`Hecho duplicado: ${fact.id}`)
    ids.add(fact.id)
    if (!fact.text.trim()) throw new Error(`Hecho vacío: ${fact.id}`)
    if (fact.text.includes("TODO")) {
      throw new Error(`El hecho ${fact.id} todavía tiene un pendiente interno.`)
    }
  }

  const faqIds = new Set<string>()
  for (const entry of dossier.faq) {
    if (faqIds.has(entry.id)) throw new Error(`Pregunta duplicada: ${entry.id}`)
    faqIds.add(entry.id)
    if (entry.prompts.length === 0) throw new Error(`Sin fórmulas: ${entry.id}`)
    const cited = entry.factIds.map((id) => {
      const fact = dossier.facts.find((item) => item.id === id)
      if (!fact) throw new Error(`${entry.id} cita un hecho inexistente: ${id}`)
      return fact.text
    })
    const corpus = cited.join("\n")
    for (const phrase of entry.groundedIn) {
      if (!corpus.includes(phrase)) {
        throw new Error(`«${entry.id}» apoya una frase que no está en sus hechos.`)
      }
      if (!entry.answer.includes(phrase)) {
        throw new Error(`La respuesta de «${entry.id}» no contiene uno de sus hechos.`)
      }
    }
  }

  for (const entry of dossier.faq) {
    for (const prompt of entry.prompts) {
      const hit = classifyQuestion(prompt, dossier)
      if (hit.kind !== "faq" || hit.faqId !== entry.id) {
        throw new Error(
          `«${prompt}» no llega a ${entry.id}. Llegó a ${JSON.stringify(hit)}.`,
        )
      }
    }
  }

  const refusedLabels: string[] = []
  for (const fact of dossier.facts) {
    const names = [fact.label, ...(fact.aliases ?? [])].filter((name): name is string => Boolean(name))
    for (const name of names) {
      const hit = classifyQuestion(name, dossier)
      if (hit.kind === "refusal") {
        refusedLabels.push(`«${name}» (${hit.refusalId})`)
        continue
      }
      if (fact.aliases?.includes(name) && hit.kind === "fact" && hit.factId !== fact.id) {
        refusedLabels.push(`«${name}» llega a ${hit.factId} y no a ${fact.id}`)
      }
    }
  }
  if (refusedLabels.length > 0) {
    throw new Error(`Hay rótulos que caen en una negativa: ${refusedLabels.join("; ")}`)
  }

  for (const item of refusalCases) {
    const hit = classifyQuestion(item.question, dossier)
    if (hit.kind !== "refusal" || hit.refusalId !== item.refusalId) {
      throw new Error(
        `«${item.question}» debía rechazarse como ${item.refusalId}. Llegó a ${JSON.stringify(hit)}.`,
      )
    }
  }
}

function buildDossier(): ChatDossier {
  const facts = buildFacts()
  const dossier: ChatDossier = {
    version: DOSSIER_VERSION,
    facts,
    gaps: dossierGaps,
    faq: createFaq(facts),
    policy: chatPolicy,
  }
  validateDossier(dossier)
  return dossier
}

export const chatDossier = buildDossier()

const factsById = new Map(chatDossier.facts.map((fact) => [fact.id, fact]))

export function factById(id: string): DossierFact | undefined {
  return factsById.get(id)
}
