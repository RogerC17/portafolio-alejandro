import type { ChatDossier, QuestionClassification } from "@/chat/types"
import { refusalIntents } from "@/chat/refusals"

export function normalizeQuestion(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[¿?¡!.,;:()"“”«»]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

type Candidate = {
  kind: "faq" | "fact"
  id: string
  length: number
}

export function classifyQuestion(
  question: string,
  dossier: ChatDossier,
): QuestionClassification {
  const text = normalizeQuestion(question)
  if (!text) return { kind: "unknown" }

  let refusal: { id: string; length: number } | undefined
  for (const intent of refusalIntents) {
    for (const phrase of intent.phrases) {
      const normalized = normalizeQuestion(phrase)
      if (!normalized || !text.includes(normalized)) continue
      if (!refusal || normalized.length > refusal.length) {
        refusal = { id: intent.id, length: normalized.length }
      }
    }
  }
  if (refusal) return { kind: "refusal", refusalId: refusal.id }

  const candidates: Candidate[] = []

  for (const entry of dossier.faq) {
    for (const prompt of entry.prompts) {
      const normalized = normalizeQuestion(prompt)
      if (!normalized || !text.includes(normalized)) continue
      candidates.push({ kind: "faq", id: entry.id, length: normalized.length })
    }
  }

  for (const fact of dossier.facts) {
    const names = [fact.label, ...(fact.aliases ?? [])]
    for (const name of names) {
      if (!name) continue
      const normalized = normalizeQuestion(name)
      if (!normalized || !text.includes(normalized)) continue
      candidates.push({ kind: "fact", id: fact.id, length: normalized.length })
    }
  }

  let best: Candidate | undefined
  for (const candidate of candidates) {
    if (!best || candidate.length > best.length) {
      best = candidate
      continue
    }
    if (candidate.length === best.length && candidate.kind === "faq" && best.kind === "fact") {
      best = candidate
    }
  }

  if (!best) return { kind: "unknown" }
  if (best.kind === "faq") return { kind: "faq", faqId: best.id }
  return { kind: "fact", factId: best.id }
}
