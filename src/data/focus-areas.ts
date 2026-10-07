import { siteContent } from "@/content/load"

export interface FocusArea {
  id: string
  index: string
  title: string
  lead: string
  image: string
  alt: string
  register: string
  objectPosition: string
}

export const focusAreas: FocusArea[] = siteContent.focus as FocusArea[]
