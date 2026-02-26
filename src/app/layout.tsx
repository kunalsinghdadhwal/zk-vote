import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { Instrument_Sans, Instrument_Serif } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

// Primary font - clean, modern sans-serif
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

// Accent font - elegant serif for headings
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
})

const siteUrl = "https://zk.kxnl.in"

export const metadata: Metadata = {
  title: "ZK Vote | Private Voting with Zero-Knowledge Proofs",
  description:
    "Verifiable, anonymous elections using zero-knowledge cryptography. Your vote counts, but no one knows how you voted.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "ZK Vote",
    description: "Private, verifiable voting powered by zero-knowledge proofs.",
    url: siteUrl,
    siteName: "ZK Vote",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZK Vote",
    description: "Private, verifiable voting powered by zero-knowledge proofs.",
    creator: "@0xkun4l",
  },
  authors: [
    { name: "Kunal", url: "https://kxnl.in" },
  ],
  creator: "Kunal",
  keywords: ["zero-knowledge", "voting", "privacy", "zk-proofs", "aadhaar", "blockchain"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
