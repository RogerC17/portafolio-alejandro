import { classifyQuestion, normalizeQuestion } from "@/chat/match"
import { ARCHIVE_REFUSAL } from "@/chat/policy"
import { chatDossier, factById } from "@/chat/dossier"
import type { DossierFact, DossierLink } from "@/chat/types"
import {
  careerCanalHonors,
  careerEvents,
  careerLead,
  careerSeminars,
  type CareerEvent,
} from "@/data/career"
import { contactQuote, contactTitle } from "@/data/contact"
import { focusAreas } from "@/data/focus-areas"
import { HERO_LEAD, MANIFESTO_QUOTE_LINES } from "@/data/home"
import { pressItems } from "@/data/press"
import {
  canalProjects,
  featuredProjects,
  projects,
  treceProjects,
  projectSourceLabels,
} from "@/data/projects"
import { publications, type Publication } from "@/data/publications"
import { SITE_LOCATION, SITE_NAME } from "@/data/site"
import { socialLinks } from "@/data/social"

export type SpokenReply = {
  text: string
  links?: DossierLink[]
}

const STOP = new Set([
  "para",
  "como",
  "esta",
  "este",
  "esto",
  "sobre",
  "desde",
  "entre",
  "cuando",
  "donde",
  "quien",
  "cual",
  "tiene",
  "hacer",
  "puedes",
  "quiero",
  "saber",
  "cuenta",
  "cuentame",
  "hablame",
  "alejandro",
  "linares",
  "favor",
  "dime",
  "decir",
  "hace",
  "hizo",
  "eres",
  "soy",
  "que",
  "con",
  "los",
  "las",
  "una",
  "uno",
  "por",
  "del",
  "sus",
  "tus",
  "mis",
  "fue",
  "fui",
  "hay",
  "mas",
  "pero",
  "tambien",
])

function office(title: string): string {
  const softened = title
    .replace(/\bJunta Directiva\b/g, "junta directiva")
    .replace(/\bAlcalde Municipal\b/g, "alcalde municipal")
    .replace(/\bGerente General\b/g, "gerente general")
    .replace(/\bGerente Provincial\b/g, "gerente provincial")
    .replace(/\bRepresentante Legal\b/g, "representante legal")
  const [first, ...rest] = softened.split(" ")
  const head =
    first === first.toLocaleUpperCase("es") && first.length > 1
      ? first
      : first.toLocaleLowerCase("es")
  return [head, ...rest].join(" ")
}

function contentWords(value: string): string[] {
  return normalizeQuestion(value)
    .split(" ")
    .filter((word) => word.length > 3)
}

function isEcho(sentence: string, event: CareerEvent): boolean {
  if (sentence.includes(":")) return false
  const known = new Set(contentWords(`${event.title} ${event.institution ?? ""}`))
  const extra = contentWords(sentence).filter((word) => !known.has(word))
  return extra.length < 3
}

function asSpoken(sentence: string): string {
  const highlighted = sentence.match(/^Destacado por (.+?) por su (.+)$/i)
  if (highlighted) {
    const who = highlighted[1].trim()
    const what = highlighted[2].trim().replace(/\.$/, "")
    const subject = who.charAt(0).toLocaleUpperCase("es") + who.slice(1)
    return `${subject} me destacó por mi ${what}.`
  }
  if (/^Gestión reconocida por /i.test(sentence)) {
    return sentence.replace(/^Gestión reconocida por /i, "Me la reconocieron ")
  }
  if (/^Reconocido como /i.test(sentence)) {
    return sentence.replace(/^Reconocido como /i, "Me reconocieron como ")
  }
  if (/^Administración pionera\b/i.test(sentence)) {
    return sentence.replace(/^Administración pionera/i, "Fue una administración pionera")
  }
  if (/^Miembro de /i.test(sentence)) {
    return sentence.replace(/^Miembro de /i, "También fui miembro de ")
  }
  if (/^Eximido de preparatorios y becario para especialización\.?$/i.test(sentence)) {
    return "Me eximieron de preparatorios y fui becario para la especialización."
  }
  if (/^Consultorio jurídico atendiendo población desplazada\.?$/i.test(sentence)) {
    return "En el consultorio jurídico atendí a población desplazada."
  }
  return sentence
}

function bodyOf(event: CareerEvent): string {
  const spoken = sentencesOf(event.description)
    .filter((sentence) => !isEcho(sentence, event))
    .map(asSpoken)
    .filter(Boolean)
  return spoken.length > 0 ? ` ${spoken.join(" ")}` : ""
}

export function speakCareerLead(lead: string): string {
  return lead
    .split(/(?<=\.)\s+/)
    .map((sentence) => {
      const text = sentence.trim().replace(/^Gerente General\b/, "gerente general")
      if (!text) return ""
      if (/^soy\b/i.test(text)) return text
      const lowered = text.charAt(0).toLocaleLowerCase("es") + text.slice(1)
      return `Soy ${lowered}`
    })
    .filter(Boolean)
    .join(" ")
}

function inPlace(title: string, institution: string): string {
  if (/^municipio\b/i.test(institution)) return `en el ${institution}`
  if (/^canal\b/i.test(institution)) return `de ${institution}`
  if (/^(congreso|instituto|ministerio|departamento)\b/i.test(institution)) return `en el ${institution}`
  if (/^(universidad|gobernación)\b/i.test(institution)) return `en la ${institution}`
  if (/^(asociación|organización|fundación|comunidad|red)\b/i.test(institution)) return `en la ${institution}`
  if (/^(alcalde|gerente|director|presidente|vicepresidente|consultor|representante|miembro|ceo)\b/i.test(title)) {
    return `de ${institution}`
  }
  return `en ${institution}`
}

function softenLead(lead: string): string {
  const second = lead.charAt(1)
  if (second && second === second.toLocaleUpperCase("es") && second !== second.toLocaleLowerCase("es")) {
    return lead
  }
  return lead.charAt(0).toLocaleLowerCase("es") + lead.slice(1)
}

function fromPlace(institution: string): string {
  if (/^(departamento|ministerio|congreso|instituto)\b/i.test(institution)) return `del ${institution}`
  if (/^(organización|fundación|comunidad|universidad|red|asociación|gobernación)\b/i.test(institution)) {
    return `de la ${institution}`
  }
  return `de ${institution}`
}

function speakPost(event: CareerEvent): string {
  const place = event.institution ? ` ${inPlace(event.title, event.institution)}` : ""
  const title = office(event.title)
  const verb = /^asesor[ií]a/i.test(event.title)
    ? event.ongoing
      ? `estoy en la ${title}`
      : `estuve en la ${title}`
    : event.ongoing
      ? `soy ${title}`
      : `fui ${title}`

  if (event.ongoing) {
    const start = event.period?.split("—")[0] ?? event.year
    return `Desde ${start} ${verb}${place}.${bodyOf(event)}`
  }
  if (event.period?.includes("—")) {
    const [start, end] = event.period.split("—")
    return `De ${start} a ${end} ${verb}${place}.${bodyOf(event)}`
  }
  return `En ${event.year} ${verb}${place}.${bodyOf(event)}`
}

function studyPlace(institution: string): string {
  if (/^universidad\b/i.test(institution)) return `en la ${institution}`
  return `en ${institution}`
}

function speakFormation(event: CareerEvent): string {
  const place = event.institution ? ` ${studyPlace(event.institution)}` : ""
  const when = event.period ?? event.year
  if (event.ongoing || /^doctorando/i.test(event.title)) {
    return `Desde ${event.year} soy ${office(event.title)}${place}.${bodyOf(event)}`
  }
  if (/^(especialización|maestría)/i.test(event.title)) {
    return `En ${when} cursé la ${event.title}${place}.${bodyOf(event)}`
  }
  return `En ${when} obtuve el título de ${office(event.title)}${place}.${bodyOf(event)}`
}

function speakRecognition(event: CareerEvent, full: boolean): string {
  const place = event.institution ? `, ${fromPlace(event.institution)}` : ""
  const detail = full ? bodyOf(event) : ""
  return `En ${event.year} recibí «${event.title}»${place}.${detail}`
}

function speakSeminar(title: string, institution?: string): string {
  return institution ? `Cursé ${title} en ${institution}.` : `Cursé ${title}.`
}

function sentencesOf(value: string): string[] {
  return value
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function bookSentence(sentence: string): string | undefined {
  if (/^libro de /i.test(sentence)) return undefined
  const about = sentence.match(/^El libro de Alejandro Linares sobre (.+)$/i)
  if (about) {
    const rest = about[1].trim()
    return `Trata de ${rest.charAt(0).toLocaleLowerCase("es")}${rest.slice(1)}`
  }
  return sentence
}

function speakBook(book: Publication): string {
  const others = book.authors.filter((author) => author !== SITE_NAME)
  const opener =
    others.length > 0
      ? `En ${book.year} escribí «${book.title}» junto con ${others.join(" y ")}.`
      : `En ${book.year} escribí «${book.title}».`
  const publisher = book.publisher ? ` Lo publicó ${book.publisher}.` : ""
  const spoken = `${opener}${publisher}`
  const lines: string[] = []
  let accumulated = spoken.toLowerCase()

  for (const part of [book.description, ...book.content]) {
    for (const sentence of sentencesOf(part)) {
      const spokenSentence = bookSentence(sentence)
      if (!spokenSentence) continue
      const key = spokenSentence.replace(/[.!?]+$/u, "").trim().toLowerCase()
      if (!key || accumulated.includes(key)) continue
      if (book.publisher && key === `publicado por ${book.publisher.toLowerCase()}`) continue
      lines.push(spokenSentence)
      accumulated = `${accumulated} ${key}`
    }
  }

  return `${spoken} ${lines.join(" ")}`.trim()
}

function bookLinks(slug: string): DossierLink[] {
  const note = factById(`libro.${slug}.nota`)
  const buy = factById(`libro.${slug}.compra`)
  return [
    note?.href ? { href: note.href, label: "Ver la nota" } : undefined,
    buy?.href ? { href: buy.href, label: "Comprar" } : undefined,
  ].filter((link): link is DossierLink => Boolean(link))
}

function speakPress(slug: string): string {
  const item = pressItems.find((press) => press.slug === slug)
  if (!item) return ""
  if (item.date) return `El ${item.date} salió en ${item.media}: «${item.title}».`
  return `En ${item.media} salió esta nota: «${item.title}».`
}

function speakProject(id: string): string {
  const project = projects.find((item) => item.id === id)
  if (!project) return ""
  return `En ${projectSourceLabels[project.source]} hay «${project.title}», sobre ${office(project.category)}.`
}

function projectOf(fact: DossierFact) {
  return projects.find((item) => fact.id === `proyecto.${item.id}`)
}

function speakProjectGroup(facts: DossierFact[]): string {
  const items = facts.flatMap((fact) => {
    const project = projectOf(fact)
    return project ? [project] : []
  })
  if (items.length !== facts.length || items.length === 0) {
    return facts.map((fact) => speakFact(fact)).join(" ")
  }
  const source = items[0].source
  const category = items[0].category
  if (!items.every((item) => item.source === source && item.category === category)) {
    return facts.map((fact) => speakFact(fact)).join(" ")
  }
  const titles = items.map((item) => `«${item.title}»`)
  const list =
    titles.length === 1
      ? titles[0]
      : `${titles.slice(0, -1).join(", ")} y ${titles[titles.length - 1]}`
  return `En ${projectSourceLabels[source]} hay ${list}, sobre ${office(category)}.`
}

function speakFact(fact: DossierFact, full = true): string {
  if (fact.id === "reconocimiento.canal-trece-conjunto") {
    return careerCanalHonors.replace("Bajo su liderazgo", "Bajo mi liderazgo")
  }

  const eventId = fact.id.split(".").slice(1).join(".")
  const event = careerEvents.find((item) => item.id === eventId)
  if (event && fact.topic === "trayectoria") return speakPost(event)
  if (event && fact.topic === "formacion") return speakFormation(event)
  if (event && fact.topic === "reconocimiento") return speakRecognition(event, full)

  const seminar = careerSeminars.find((item) => fact.label === item.title)
  if (fact.topic === "seminario" && seminar) {
    return speakSeminar(seminar.title, seminar.institution)
  }

  if (fact.topic === "libro" && fact.id.startsWith("libro.")) {
    const slug = fact.id.slice("libro.".length)
    const book = publications.find((item) => item.slug === slug)
    if (book) return speakBook(book)
  }

  if (fact.topic === "prensa" && fact.id.startsWith("prensa.")) {
    return speakPress(fact.id.slice("prensa.".length))
  }

  if (fact.topic === "proyecto" && fact.id.startsWith("proyecto.")) {
    return speakProject(fact.id.slice("proyecto.".length))
  }

  if (fact.topic === "eje") {
    const area = focusAreas.find((item) => fact.id === `eje.${item.id}`)
    if (area) return `En ${office(area.title)} trabajo ${softenLead(area.lead)}`
  }

  return fact.text
}

function linksFor(fact: DossierFact): DossierLink[] {
  if (fact.topic === "libro") return bookLinks(fact.id.slice("libro.".length))
  if (!fact.href) return []
  if (fact.topic === "prensa") return [{ href: fact.href, label: "Ver la nota" }]
  if (fact.topic === "proyecto") return [{ href: fact.href, label: "Ver el video" }]
  if (fact.topic === "contacto") return [{ href: fact.href, label: "Abrir LinkedIn" }]
  if (fact.href.startsWith("/")) return [{ href: fact.href, label: "Ver en el archivo" }]
  return [{ href: fact.href, label: "Abrir" }]
}

function speakFaq(id: string): SpokenReply {
  if (id === "quien-es") {
    return {
      text: `Soy ${SITE_NAME}. ${speakCareerLead(careerLead)} Estoy en ${SITE_LOCATION.replace(" / ", ", ")}.`,
      links: [{ href: "/", label: "Ir al inicio" }],
    }
  }

  if (id === "frase") {
    return { text: `Lo digo así: “${HERO_LEAD}”` }
  }

  if (id === "manifiesto") {
    return {
      text: `Lo digo así: “${MANIFESTO_QUOTE_LINES[0]} ${MANIFESTO_QUOTE_LINES[1]}”`,
    }
  }

  if (id === "libros") {
    const titles = publications.map((book) => `«${book.title}» (${book.year})`).join(", ")
    const sharedBook = publications.find((book) => book.authors.some((author) => author !== SITE_NAME))
    const others = sharedBook?.authors.filter((author) => author !== SITE_NAME) ?? []
    const shared =
      sharedBook && others.length > 0
        ? ` «${sharedBook.title}» lo escribí junto con ${others.join(" y ")}.`
        : ""
    return {
      text: `He publicado ${titles}.${shared}`,
      links: [{ href: "/publicaciones", label: "Ver publicaciones" }],
    }
  }

  if (id.startsWith("libro-")) {
    const slug = id.slice("libro-".length)
    const book = publications.find((item) => item.slug === slug)
    return {
      text: book ? speakBook(book) : ARCHIVE_REFUSAL,
      links: book ? bookLinks(slug) : undefined,
    }
  }

  if (id === "trayectoria") {
    return {
      text: `Soy ${SITE_NAME}. ${speakCareerLead(careerLead)}`,
      links: [{ href: "/trayectoria", label: "Ver trayectoria" }],
    }
  }

  if (id === "formacion") {
    const lines = careerEvents
      .filter((event) => event.category === "Formación")
      .map((event) => speakFormation(event))
    return {
      text: `Estudié esto. ${lines.join(" ")}`,
      links: [{ href: "/trayectoria", label: "Ver trayectoria" }],
    }
  }

  if (id === "reconocimientos") {
    const lines = careerEvents
      .filter((event) => event.category === "Reconocimientos")
      .map((event) => speakRecognition(event, false))
    const honors = careerCanalHonors.replace("Bajo su liderazgo", "Bajo mi liderazgo")
    return {
      text: `${honors} A mi nombre están estos. ${lines.join(" ")}`,
      links: [{ href: "/trayectoria", label: "Ver reconocimientos" }],
    }
  }

  if (id === "ejes") {
    const lines = focusAreas.map(
      (area) => `En ${office(area.title)}, ${softenLead(area.lead)}`,
    )
    return {
      text: `Trabajo en estos ejes. ${lines.join(" ")}`,
      links: [{ href: "/#areas", label: "Ver los ejes" }],
    }
  }

  if (id === "proyectos") {
    const featured = featuredProjects.map((project) => `«${project.title}»`).join(", ")
    return {
      text: `Hay ${treceProjects.length} especiales de Enlace Trece y ${canalProjects.length} piezas de SoyAlejo4.0. En la portada están ${featured}.`,
      links: [{ href: "/proyectos", label: "Ver proyectos" }],
    }
  }

  if (id === "prensa") {
    const dated = pressItems
      .filter((item) => item.dateIso)
      .toSorted((a, b) => (b.dateIso ?? "").localeCompare(a.dateIso ?? ""))
    const latest = dated[0]
    const latestLine = latest
      ? ` La más reciente es la de ${latest.media}${latest.date ? `, el ${latest.date}` : ""}: «${latest.title}».`
      : ""
    return {
      text: `Tengo ${pressItems.length} notas en prensa.${latestLine}`,
      links: [{ href: "/prensa", label: "Abrir la portada" }],
    }
  }

  if (id === "contacto") {
    const names = socialLinks.map((link) => link.label).join(", ")
    const linkedIn = socialLinks.find((link) => link.id === "linkedin")
    return {
      text: `${contactTitle} «${contactQuote}» No hay formulario: escríbeme por ${names}.`,
      links: linkedIn ? [{ href: linkedIn.href, label: "Abrir LinkedIn" }] : undefined,
    }
  }

  return { text: ARCHIVE_REFUSAL }
}

function isSearchable(fact: DossierFact): boolean {
  if (!fact.label) return false
  if (fact.id.endsWith(".indice") || fact.id.endsWith(".nota") || fact.id.endsWith(".compra")) {
    return false
  }
  return fact.topic !== "identidad" && fact.topic !== "voz" && fact.topic !== "contacto"
}

function retrieveFacts(question: string): DossierFact[] {
  const tokens = normalizeQuestion(question)
    .split(" ")
    .filter((token) => token.length > 3 && !STOP.has(token))
  if (tokens.length === 0) return []

  const scored: { fact: DossierFact; score: number }[] = []
  for (const fact of chatDossier.facts) {
    if (!isSearchable(fact)) continue
    const label = normalizeQuestion(fact.label ?? "")
    const hay = normalizeQuestion(`${fact.label ?? ""} ${fact.text}`)
    let score = 0
    for (const token of tokens) {
      if (!hay.includes(token)) continue
      score += label.includes(token) ? 3 : 1
      if (token.length >= 7) score += 1
    }
    if (score > 0) scored.push({ fact, score })
  }

  scored.sort(
    (a, b) => b.score - a.score || (b.fact.date ?? "").localeCompare(a.fact.date ?? ""),
  )
  const best = scored[0]
  if (!best || best.score < 2) return []
  return scored
    .filter((item) => item.score >= best.score - 1)
    .slice(0, 3)
    .map((item) => item.fact)
}

export function replyFromArchive(question: string): SpokenReply {
  const hit = classifyQuestion(question, chatDossier)
  if (hit.kind === "refusal") return { text: ARCHIVE_REFUSAL }
  if (hit.kind === "faq") return speakFaq(hit.faqId)
  if (hit.kind === "fact") {
    const fact = factById(hit.factId)
    if (!fact) return { text: ARCHIVE_REFUSAL }
    return { text: speakFact(fact), links: linksFor(fact) }
  }

  const facts = retrieveFacts(question)
  if (facts.length === 0) return { text: ARCHIVE_REFUSAL }
  const links = facts.flatMap((fact) => linksFor(fact)).slice(0, 3)
  return {
    text: speakRetrieved(facts),
    links,
  }
}

function speakRetrieved(facts: DossierFact[]): string {
  const chunks: string[] = []
  let index = 0
  while (index < facts.length) {
    const fact = facts[index]
    if (!fact || fact.topic !== "proyecto") {
      if (fact) chunks.push(speakFact(fact))
      index += 1
      continue
    }
    const group = [fact]
    while (facts[index + group.length]?.topic === "proyecto") {
      const next = facts[index + group.length]
      if (next) group.push(next)
    }
    chunks.push(group.length === 1 ? speakFact(fact) : speakProjectGroup(group))
    index += group.length
  }
  return chunks.join(" ")
}

export function identityUsesPublishedBio(text: string): boolean {
  return text.includes(speakCareerLead(careerLead))
}
