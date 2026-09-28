export interface PressItem {
  slug: string
  media: string
  title: string
  date: string
  dateIso?: string
  image?: string
  url: string
}

export const pressLead = "Este archivo es un registro, no un recorte de logos."

export const HOME_PRESS_LIMIT = 4

export const pressItems: PressItem[] = [
  {
    slug: "television-publica-forbes",
    media: "Forbes",
    title:
      "Televisión pública con propósito: la visión estratégica que convirtió a Canal Trece en referente de innovación social",
    date: "10 de abril de 2026",
    dateIso: "2026-04-10",
    image: "/images/press/forbes.webp",
    url: "https://forbes.co/actualidad/television-publica-con-proposito-la-vision-estrategica-que-convirtio-a-canal-trece-en-referente-de-innovacion-social",
  },
  {
    slug: "tecnologia-real-infobae",
    media: "Infobae",
    title:
      "Tecnología real para personas reales: el libro de Alejandro Linares sobre la revolución digital centrada en las personas",
    date: "2 de agosto de 2026",
    dateIso: "2026-08-02",
    image: "/images/press/infobae.webp",
    url: "https://www.infobae.com/america/inhouse/2026/08/02/tecnologia-real-para-personas-reales-el-libro-de-alejandro-linares-sobre-la-revolucion-digital-centrada-en-las-personas/",
  },
  {
    slug: "tecnologia-real-el-colombiano",
    media: "El Colombiano",
    title: "Tecnología real para personas reales",
    date: "12 de agosto de 2026",
    dateIso: "2026-08-12",
    image: "/images/press/el-colombiano.webp",
    url: "https://www.elcolombiano.com/informes-comerciales/las-marcas-hablan/tecnologia-real-personas-reales-libro-jhon-alejandro-linares-EE39681511",
  },
  {
    slug: "nominacion-latam-digital-2026",
    media: "Canal Trece",
    title:
      "Gerente de Canal Trece, Alejandro Linares, nominado a Líder Digital del Año en Latam Digital 2026",
    date: "27 de abril de 2026",
    dateIso: "2026-04-27",
    image: "/images/press/canal-trece.webp",
    url: "https://canaltrece.com.co/noticias/gerente-de-canal-trece-alejandro-linares-nominado-a-lider-digital-del-ano-en-latam-digital-2026/",
  },
]

export const homePressItems = pressItems.slice(0, HOME_PRESS_LIMIT)

export function latestPressSlug(items: readonly PressItem[]): string | undefined {
  let latest: PressItem | undefined

  for (const item of items) {
    if (!item.dateIso) continue
    if (!latest?.dateIso || item.dateIso > latest.dateIso) {
      latest = item
    }
  }

  return latest?.slug
}

const pressItemsBySlug = new Map(pressItems.map((item) => [item.slug, item]))

export function getPressItemBySlug(slug: string): PressItem | undefined {
  return pressItemsBySlug.get(slug)
}

export function getRelatedPressItems(slug: string): PressItem[] {
  return pressItems.filter((item) => item.slug !== slug)
}

export function pressItemDescription(item: PressItem): string {
  return `${item.title}. ${item.media}.`
}
