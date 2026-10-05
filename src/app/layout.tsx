import type { Metadata, Viewport } from "next"
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google"
import { ArchiveField } from "@/components/layout/ArchiveField"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { AlejandroChat } from "@/components/avatar/AlejandroChat"
import { SocialDock } from "@/components/layout/SocialDock"
import { StructuredData } from "@/components/seo/StructuredData"
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/data/site"
import "./globals.css"

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
})

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#101112",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-svh flex-col font-sans antialiased">
        <ArchiveField />
        <StructuredData />
        <Header />
        {children}
        <Footer />
        <SocialDock />
        <AlejandroChat />
      </body>
    </html>
  )
}
