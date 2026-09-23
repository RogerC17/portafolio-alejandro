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

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jhon-alejandro-linares-camberos-58a1a3245",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/alejolinaresca",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/alejolinaresca/",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@AlejandroLinaresCamberos",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/AlejoLinaresC",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@alejo.linares8",
  },
]
