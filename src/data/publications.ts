import { SITE_NAME } from "@/data/site"

export interface Publication {
  slug: string
  title: string
  description: string
  year: string
  datePublished: string
  cover?: string
  url?: string
  ctaLabel: string
  authors: string[]
  publisher?: string
  content: string[]
}

export const publicationsLead = "Este archivo no es un catálogo."

export function publicationAuthorsLabel(authors: string[]): string {
  if (authors.length <= 1) {
    return authors[0] ?? SITE_NAME
  }

  if (authors.length === 2) {
    return `${authors[0]} y ${authors[1]}`
  }

  return `${authors.slice(0, -1).join(", ")} y ${authors[authors.length - 1]}`
}

export const publications: Publication[] = [
  {
    slug: "tecnologia-real-para-personas-reales",
    title: "Tecnología real para personas reales",
    description:
      "El libro de Alejandro Linares sobre la revolución digital centrada en las personas.",
    year: "2026",
    datePublished: "2026",
    url: "https://www.infobae.com/america/inhouse/2026/08/02/tecnologia-real-para-personas-reales-el-libro-de-alejandro-linares-sobre-la-revolucion-digital-centrada-en-las-personas/",
    ctaLabel: "Leer",
    authors: [SITE_NAME],
    publisher: "Círculo De Lectores",
    content: ["Publicado por Círculo De Lectores."],
  },
  {
    slug: "las-dos-caras-del-liderazgo",
    title: "Las dos caras del liderazgo",
    description: "Libro de Alejandro Linares y Ever Arévalo.",
    year: "2026",
    datePublished: "2026",
    cover: "/images/publications/liderazgo.png",
    url: "https://alejandrolinares.co/las-dos-caras-del-liderazgo/",
    ctaLabel: "Leer",
    authors: [SITE_NAME, "Ever Arévalo"],
    content: [
      "Dos visiones, un mismo propósito: formar líderes.",
      "Un líder no tiene que ser perfecto, pero sí debe estar dispuesto a crecer.",
    ],
  },
]

const publicationsBySlug = new Map(
  publications.map((publication) => [publication.slug, publication]),
)

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publicationsBySlug.get(slug)
}

export function getRelatedPublications(slug: string): Publication[] {
  return publications.filter((publication) => publication.slug !== slug)
}
