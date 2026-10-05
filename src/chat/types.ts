export const DOSSIER_VERSION = "2026-10-05"

export const DOSSIER_TOPICS = [
  "identidad",
  "voz",
  "eje",
  "libro",
  "trayectoria",
  "formacion",
  "reconocimiento",
  "seminario",
  "proyecto",
  "prensa",
  "contacto",
] as const

export type DossierTopic = (typeof DOSSIER_TOPICS)[number]

export type DossierLink = {
  href: string
  label: string
}

/** Hecho publicable. El texto sale de los datos del sitio, sin paráfrasis nueva. */
export type DossierFact = {
  id: string
  topic: DossierTopic
  text: string
  source: string
  href?: string
  /** Fecha ISO cuando el archivo la tiene. Sirve para ordenar prensa. */
  date?: string
  /** Título corto para enrutar una pregunta al hecho. */
  label?: string
  /** Otras formas de preguntar por el mismo hecho. */
  aliases?: string[]
}

export type DossierGap = {
  id: string
  topic: string
  missing: string
}

export type FaqEntry = {
  id: string
  prompts: string[]
  answer: string
  factIds: string[]
  /** Fragmentos que tienen que existir, tal cual, en los hechos citados. */
  groundedIn: string[]
  links?: DossierLink[]
}

export type ChatPolicy = {
  role: string
  rules: string[]
  refusal: string
}

export type ChatDossier = {
  version: string
  facts: DossierFact[]
  gaps: DossierGap[]
  faq: FaqEntry[]
  policy: ChatPolicy
}

export type QuestionClassification =
  | { kind: "faq"; faqId: string }
  | { kind: "fact"; factId: string }
  | { kind: "refusal"; refusalId: string }
  | { kind: "unknown" }
