import { replyFromArchive } from "@/chat/voice"
import type { DossierLink } from "@/chat/types"

export type AvatarReply = {
  text: string
  href?: string
  hrefLabel?: string
  links?: DossierLink[]
}

const GREETING =
  "Hola. Soy Alejandro. Pregúntame por la trayectoria, los libros, los proyectos o lo que ha salido en prensa."

const GREETINGS = new Set([
  "hola",
  "buenos dias",
  "buenas tardes",
  "buenas noches",
  "buen dia",
  "que tal",
  "hey",
  "saludos",
])

const THANKS = new Set(["gracias", "te agradezco", "muchas gracias"])
const GOODBYES = new Set(["adios", "chao", "hasta luego", "nos vemos", "bye"])
const MOODS = new Set(["como estas", "como vas", "que mas"])

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[¿?¡!.,;:()]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function replyTo(question: string): AvatarReply {
  const text = normalize(question)
  if (!text) {
    return { text: "Escríbeme una pregunta y te respondo." }
  }
  if (GREETINGS.has(text)) return { text: GREETING }
  if (THANKS.has(text)) {
    return { text: "Con gusto. Si quieres, seguimos con otra cosa de mi trabajo." }
  }
  if (GOODBYES.has(text)) {
    return { text: "Hasta luego. Aquí sigo cuando quieras volver." }
  }
  if (MOODS.has(text)) {
    return {
      text: "Bien, gracias. Si quieres, seguimos por la trayectoria, los libros, los proyectos o la prensa.",
    }
  }

  const spoken = replyFromArchive(question)
  return {
    text: spoken.text,
    links: spoken.links,
    href: spoken.links?.[0]?.href,
    hrefLabel: spoken.links?.[0]?.label,
  }
}

export const AVATAR_GREETING = GREETING

export const AVATAR_PROMPTS = [
  "¿Quién eres?",
  "Trayectoria",
  "Libros",
  "Prensa",
] as const
