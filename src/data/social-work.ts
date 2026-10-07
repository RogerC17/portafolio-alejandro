import { siteContent } from "@/content/load"
export type SocialWorkSource = {
  label: string
  href: string
}

export type SocialWorkImage = {
  src: string
  width: number
  height: number
  alt: string
  layout: "portrait" | "poster" | "wide" | "split"
}

export type SocialWorkItem = {
  id: string
  period: string
  title: string
  place: string
  summary: string
  sources: SocialWorkSource[]
  image?: SocialWorkImage
}

export const socialWorkLead = siteContent.socialWorkLead

export const socialWorkItems: SocialWorkItem[] = siteContent.socialWork as SocialWorkItem[]

export const homeSocialWork = socialWorkItems.slice(0, 3)
