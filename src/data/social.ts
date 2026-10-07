import { siteContent } from "@/content/load"

export type SocialNetwork =
  | "linkedin"
  | "x"
  | "instagram"
  | "youtube"
  | "facebook"
  | "tiktok"

export interface SocialLink {
  id: SocialNetwork
  label: string
  href: string
}

export const socialLinks: SocialLink[] = siteContent.social as SocialLink[]
