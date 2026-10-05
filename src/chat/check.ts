import { chatDossier } from "@/chat/dossier"
import { normalizeQuestion } from "@/chat/match"
import { ARCHIVE_REFUSAL } from "@/chat/policy"
import { renderSystemPrompt } from "@/chat/prompt"
import { identityUsesPublishedBio, replyFromArchive } from "@/chat/voice"
import { replyTo } from "@/lib/avatar-reply"

const prompt = renderSystemPrompt(chatDossier)
if (prompt.length < 1000 || prompt.length > 120_000) {
  throw new Error(`El prompt quedó fuera de rango: ${prompt.length} caracteres.`)
}

const labels = new Map<string, string[]>()
for (const fact of chatDossier.facts) {
  if (!fact.label) continue
  const key = normalizeQuestion(fact.label)
  const ids = labels.get(key) ?? []
  ids.push(fact.id)
  labels.set(key, ids)
}
const shared = [...labels.values()].filter((ids) => ids.length > 1)

console.log(
  [
    `Dossier ${chatDossier.version}`,
    `${chatDossier.facts.length} hechos`,
    `${chatDossier.faq.length} respuestas de referencia`,
    `${chatDossier.gaps.length} vacíos`,
    `${prompt.length} caracteres de instrucción`,
    shared.length > 0 ? `${shared.length} rótulos compartidos` : "rótulos únicos",
  ].join(" · "),
)

for (const ids of shared) {
  console.log(`Rótulo compartido: ${ids.join(", ")}`)
}

const samples = [
  replyTo("¿Quién eres?"),
  replyTo("Trayectoria"),
  replyTo("Libros"),
  replyTo("Fui alcalde de Topaipí"),
  replyTo("Canal Trece"),
  replyFromArchive("ciberseguridad"),
  replyTo("¿Cuánto cuesta Tecnología real?"),
  replyTo("¿Cómo se llama tu esposa?"),
]

if (!identityUsesPublishedBio(samples[0]?.text ?? "")) {
  throw new Error("La presentación no usa la biografía publicada.")
}
if (!samples[3]?.text.includes("en el Municipio de Topaipí") || !samples[3]?.text.includes("2012")) {
  throw new Error(`La alcaldía no salió de la ficha: ${samples[3]?.text}`)
}
if (!samples[3]?.text.toLowerCase().includes("fui")) {
  throw new Error("La alcaldía no quedó en primera persona.")
}
if (!samples[4]?.text.toLowerCase().includes("soy") || !samples[4]?.text.includes("Canal Trece")) {
  throw new Error(`Canal Trece no quedó en primera persona: ${samples[4]?.text}`)
}
if (samples[4]?.text.includes("su modelo")) {
  throw new Error(`Canal Trece sigue en tercera persona: ${samples[4]?.text}`)
}
if (!samples[2]?.text.includes("Enlace digital") || !samples[2]?.text.includes("Ever Arévalo")) {
  throw new Error(`Los libros no salieron completos: ${samples[2]?.text}`)
}
if (!samples[5]?.text.toLowerCase().includes("ciberseguridad")) {
  throw new Error(`No encontré el especial de ciberseguridad: ${samples[5]?.text}`)
}
if (samples[6]?.text !== ARCHIVE_REFUSAL || samples[7]?.text !== ARCHIVE_REFUSAL) {
  throw new Error("Una pregunta trampa recibió datos.")
}
if (samples.some((sample) => sample.text.includes("TODO"))) {
  throw new Error("Una respuesta todavía tiene un pendiente interno.")
}

const routed = [
  ["Tecnología real", "escribí", "eje"],
  ["doctorado", "Córdoba", "no lo tengo"],
  ["¿A qué te dedicas?", "Soy abogado", "no lo tengo"],
  ["gerente", "soy gerente general", "Periodismo en Acción"],
  ["¿Fuiste representante a la cámara?", "Cámara", "Congreso de la República. Congreso"],
  ["¿Qué opinas del gobierno?", ARCHIVE_REFUSAL, "Petro"],
  ["¿Qué estudiaste?", "Estudié esto", "no lo tengo"],
  ["Forbes", "recibí «Reconocimiento por liderazgo e innovación en medios públicos»", "Zipa Exiliados"],
] as const

for (const [question, expected, forbidden] of routed) {
  const answer = replyTo(question).text
  if (!answer.includes(expected) || answer.includes(forbidden)) {
    throw new Error(`«${question}» no respondió bien: ${answer}`)
  }
}
