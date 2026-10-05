import { careerLead } from "@/data/career"
import { contactLead, contactQuote, contactTitle } from "@/data/contact"
import {
  HERO_LEAD,
  MANIFESTO_QUOTE_LINES,
  MANIFESTO_SUPPORT,
} from "@/data/home"
import { SITE_LOCATION, SITE_NAME, SITE_ROLE } from "@/data/site"
import type { DossierFact, DossierLink, FaqEntry } from "@/chat/types"

function factById(facts: readonly DossierFact[], id: string): DossierFact {
  const fact = facts.find((item) => item.id === id)
  if (!fact) {
    throw new Error(`La pregunta frecuente cita un hecho que no existe: ${id}`)
  }
  return fact
}

function linkFrom(fact: DossierFact | undefined, label: string): DossierLink | undefined {
  if (!fact?.href) return undefined
  return { href: fact.href, label }
}

export function createFaq(facts: readonly DossierFact[]): FaqEntry[] {
  const resumen = factById(facts, "identidad.resumen")
  const programa = factById(facts, "identidad.programa")
  const prensa = factById(facts, "prensa.indice")
  const proyectos = factById(facts, "proyecto.indice")
  const redes = factById(facts, "contacto.redes")
  const manifiesto = factById(facts, "voz.manifiesto")
  const hero = factById(facts, "voz.hero")

  const datedPress = facts
    .filter((fact) => fact.topic === "prensa" && fact.date)
    .toSorted((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
  const latestPress = datedPress[0]
  if (!latestPress) {
    throw new Error("El archivo de prensa no tiene ninguna nota con fecha.")
  }

  const formacion = facts.filter((fact) => fact.topic === "formacion")
  const reconocimientos = facts.filter((fact) => fact.topic === "reconocimiento")

  const bookSlugs = [
    "tecnologia-real-para-personas-reales",
    "las-dos-caras-del-liderazgo",
    "enlace-digital",
  ] as const

  const bookPrompts: Record<(typeof bookSlugs)[number], string[]> = {
    "tecnologia-real-para-personas-reales": [
      "revolución digital centrada en las personas",
    ],
    "las-dos-caras-del-liderazgo": ["Ever Arévalo"],
    "enlace-digital": ["Tecnología sin tecnicismos"],
  }

  const bookEntries: FaqEntry[] = bookSlugs.map((slug) => {
    const ficha = factById(facts, `libro.${slug}`)
    const nota = facts.find((fact) => fact.id === `libro.${slug}.nota`)
    const compra = factById(facts, `libro.${slug}.compra`)
    const cited = [ficha, nota, compra].filter((fact): fact is DossierFact => Boolean(fact))
    const links = [linkFrom(nota, "Ver la nota"), linkFrom(compra, "Comprar")].filter(
      (link): link is DossierLink => Boolean(link),
    )
    const title = ficha.label ?? ficha.text

    return {
      id: `libro-${slug}`,
      prompts: [title, ...bookPrompts[slug]],
      answer: cited.map((fact) => fact.text).join(" "),
      factIds: cited.map((fact) => fact.id),
      groundedIn: [...cited.map((fact) => fact.text), ...bookPrompts[slug]],
      links,
    }
  })

  return [
    {
      id: "quien-es",
      prompts: [
        "quién es Alejandro Linares",
        "quién eres",
        "quién es Alejandro",
        "a qué te dedicas",
        "de dónde eres",
        "cuéntame de ti",
        "háblame de ti",
        "qué haces",
      ],
      answer: `Soy ${SITE_NAME}. ${SITE_ROLE}. El archivo está en ${SITE_LOCATION}. ${careerLead}`,
      factIds: [
        "identidad.nombre",
        "identidad.rol",
        "identidad.lugar",
        "identidad.resumen",
      ],
      groundedIn: [SITE_NAME, SITE_ROLE, SITE_LOCATION, careerLead],
      links: [{ href: "/", label: "Ir al inicio" }],
    },
    {
      id: "frase",
      prompts: ["tecnología y las instituciones", "frase sobre la tecnología"],
      answer: `“${HERO_LEAD}”`,
      factIds: [hero.id],
      groundedIn: [HERO_LEAD],
    },
    {
      id: "manifiesto",
      prompts: ["la tecnología no transforma sociedades", "manifiesto"],
      answer: `${manifiesto.text} ${programa.text}`,
      factIds: [manifiesto.id, programa.id],
      groundedIn: [MANIFESTO_QUOTE_LINES[0], MANIFESTO_QUOTE_LINES[1], MANIFESTO_SUPPORT],
    },
    {
      id: "libros",
      prompts: ["qué libros", "qué ha publicado", "publicaciones", "libros"],
      answer: bookSlugs
        .map((slug) => factById(facts, `libro.${slug}`).text)
        .join(" "),
      factIds: bookSlugs.map((slug) => `libro.${slug}`),
      groundedIn: bookSlugs.map((slug) => factById(facts, `libro.${slug}`).text),
      links: [{ href: "/publicaciones", label: "Ver publicaciones" }],
    },
    ...bookEntries,
    {
      id: "trayectoria",
      prompts: ["su trayectoria", "trayectoria", "hoja de vida"],
      answer: resumen.text,
      factIds: [resumen.id],
      groundedIn: [careerLead],
      links: [{ href: "/trayectoria", label: "Ver trayectoria" }],
    },
    {
      id: "formacion",
      prompts: ["formación académica", "qué estudió", "qué estudiaste", "estudios"],
      answer: formacion.map((fact) => fact.text).join(" "),
      factIds: formacion.map((fact) => fact.id),
      groundedIn: formacion.map((fact) => fact.text),
      links: [{ href: "/trayectoria", label: "Ver trayectoria" }],
    },
    {
      id: "reconocimientos",
      prompts: ["reconocimientos", "premios"],
      answer: reconocimientos.map((fact) => fact.text).join(" "),
      factIds: reconocimientos.map((fact) => fact.id),
      groundedIn: reconocimientos.map((fact) => fact.text),
      links: [{ href: "/trayectoria", label: "Ver reconocimientos" }],
    },
    {
      id: "ejes",
      prompts: ["ejes de trabajo", "gobernanza digital", "en qué trabaja"],
      answer: facts
        .filter((fact) => fact.topic === "eje")
        .map((fact) => fact.text)
        .join(" "),
      factIds: facts.filter((fact) => fact.topic === "eje").map((fact) => fact.id),
      groundedIn: facts.filter((fact) => fact.topic === "eje").map((fact) => fact.text),
      links: [{ href: "/#areas", label: "Ver los ejes" }],
    },
    {
      id: "proyectos",
      prompts: ["proyectos", "Enlace Trece", "SoyAlejo"],
      answer: proyectos.text,
      factIds: [proyectos.id],
      groundedIn: [proyectos.text],
      links: [{ href: "/proyectos", label: "Ver proyectos" }],
    },
    {
      id: "prensa",
      prompts: ["prensa", "notas de prensa"],
      answer: `${prensa.text} La más reciente con fecha es: ${latestPress.text}`,
      factIds: [prensa.id, latestPress.id],
      groundedIn: [prensa.text, latestPress.text],
      links: [{ href: "/prensa", label: "Abrir la portada" }],
    },
    {
      id: "contacto",
      prompts: ["cómo contactar", "contacto", "LinkedIn"],
      answer: `${contactTitle} ${contactQuote} ${contactLead} ${redes.text}`,
      factIds: [
        "contacto.invitacion",
        "voz.contacto",
        "contacto.nota",
        "contacto.redes",
      ],
      groundedIn: [contactTitle, contactQuote, contactLead, redes.text],
      links: [{ href: redes.href ?? "/contacto", label: "Abrir LinkedIn" }],
    },
  ]
}
