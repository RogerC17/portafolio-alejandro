import { siteContent } from "@/content/load"
export interface PressItem {
  slug: string
  media: string
  title: string
  date: string
  dateIso?: string
  image?: string
  url: string
}

export const pressLead = siteContent.pressLead

export const HOME_PRESS_LIMIT = 4

export const pressItems: PressItem[] = siteContent.press as PressItem[]

export const homePressItems = pressItems.slice(0, HOME_PRESS_LIMIT)

export function pressItemsByDate(
  items: readonly PressItem[] = pressItems,
): PressItem[] {
  return items.toSorted((a, b) => (b.dateIso ?? "").localeCompare(a.dateIso ?? ""))
}

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
