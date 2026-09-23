import type { SocialNetwork } from "@/data/social"

type SocialGlyphProps = {
  network: SocialNetwork
}

export function SocialGlyph({ network }: SocialGlyphProps) {
  switch (network) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M6.5 9.5H3V21h3.5V9.5ZM4.75 3A2.12 2.12 0 1 0 4.76 7.24 2.12 2.12 0 0 0 4.75 3ZM21 21h-3.5v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94V21H10V9.5h3.36v1.57h.05c.47-.89 1.61-1.82 3.32-1.82 3.55 0 4.27 2.34 4.27 5.38V21Z"
          />
        </svg>
      )
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M14.5 10.4 21.2 3h-1.6l-5.8 6.4L9.2 3H3.3l7 9.9L3.3 21h1.6l6.1-6.8 4.9 6.8h5.9l-7.3-10.6Zm-2.2 2.4-.7-1-5.6-7.8h2.4l4.5 6.3.7 1 5.9 8.2h-2.4l-4.8-6.7Z"
          />
        </svg>
      )
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 7.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4Zm0 7.6A3 3 0 1 1 15 12a3 3 0 0 1-3 3Zm5.8-8.9a1.08 1.08 0 1 1-1.08-1.08A1.08 1.08 0 0 1 17.8 6.1ZM21.2 6.1a5.4 5.4 0 0 0-1.47-3.83A5.4 5.4 0 0 0 15.9.8C14.07.72 9.93.72 8.1.8A5.42 5.42 0 0 0 4.27 2.27 5.42 5.42 0 0 0 2.8 6.1C2.72 7.93 2.72 12.07 2.8 13.9a5.42 5.42 0 0 0 1.47 3.83 5.42 5.42 0 0 0 3.83 1.47c1.83.08 5.97.08 7.8 0a5.42 5.42 0 0 0 3.83-1.47 5.42 5.42 0 0 0 1.47-3.83c.08-1.83.08-5.97 0-7.8Zm-1.6 9.5a3.2 3.2 0 0 1-1.8 1.8c-1.18.47-4 .36-5.8.36s-4.62.1-5.8-.36a3.2 3.2 0 0 1-1.8-1.8c-.47-1.18-.36-4-.36-5.8s-.1-4.62.36-5.8a3.2 3.2 0 0 1 1.8-1.8c1.18-.47 4-.36 5.8-.36s4.62-.1 5.8.36a3.2 3.2 0 0 1 1.8 1.8c.47 1.18.36 4 .36 5.8s.11 4.62-.36 5.8Z"
          />
        </svg>
      )
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M23.5 7.2a3 3 0 0 0-2.1-2.12C19.4 4.6 12 4.6 12 4.6s-7.4 0-9.4.48A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.12c2 .48 9.4.48 9.4.48s7.4 0 9.4-.48a3 3 0 0 0 2.1-2.12A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z"
          />
        </svg>
      )
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M14.1 8.2h2.7V5H14c-3 0-5 1.9-5 5.3V13H6.2v3.2H9V24h3.5v-7.8h3l.5-3.2h-3.5v-2.3c0-1 .4-1.5 1.6-1.5Z"
          />
        </svg>
      )
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M19.6 7.3a6.7 6.7 0 0 1-3.9-1.3v8.1a5.9 5.9 0 1 1-5.1-5.85v2.7a3.3 3.3 0 1 0 2.3 3.15V2.2h2.5a4.3 4.3 0 0 0 4.2 4.1v1Z"
          />
        </svg>
      )
  }
}
