import { SITE_URL } from "@/data/site"
import { DOSSIER_TOPICS, type ChatDossier, type DossierFact } from "@/chat/types"

function hrefOf(href: string): string {
  return href.startsWith("/") ? `${SITE_URL}${href}` : href
}

function factLine(fact: DossierFact): string {
  const link = fact.href ? ` (${hrefOf(fact.href)})` : ""
  return `- [${fact.id}] ${fact.text}${link}`
}

/** Instrucción que recibirá el modelo. No incluye claves ni datos fuera del archivo. */
export function renderSystemPrompt(dossier: ChatDossier): string {
  const sections = [
    dossier.policy.role,
    "",
    "Reglas:",
    ...dossier.policy.rules.map((rule, index) => `${index + 1}. ${rule}`),
    "",
    `Si el dato no está, responde exactamente: ${dossier.policy.refusal}`,
    "",
    "Estos temas no tienen ficha. Usa la negativa:",
    ...dossier.gaps.map((gap) => `- ${gap.missing}`),
    "",
    "Hechos del archivo:",
  ]

  for (const topic of DOSSIER_TOPICS) {
    const facts = dossier.facts.filter((fact) => fact.topic === topic)
    if (facts.length === 0) continue
    sections.push("", topic.toUpperCase())
    for (const fact of facts) sections.push(factLine(fact))
  }

  sections.push("", "Respuestas de referencia. Puedes acortarlas. No les añadas datos:")
  for (const entry of dossier.faq) {
    const links = entry.links?.map((link) => `${link.label}: ${hrefOf(link.href)}`).join(" | ")
    sections.push(`- ${entry.answer}${links ? ` [${links}]` : ""}`)
  }

  return sections.join("\n")
}
