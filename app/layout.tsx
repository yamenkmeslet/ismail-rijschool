import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthSessionProvider } from "@/components/providers/auth-session-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Rijschool Platform — Leer Theorie Online",
    template: "%s | Rijschool Platform",
  },
  description:
    "De beste manier om je rijbewijs theorie te leren. Oefen met echte CBR-vragen, doe oefenexamens en volg je voortgang. Beschikbaar in Nederlands, Arabisch en Engels.",
  keywords: [
    "rijbewijs theorie",
    "CBR theorie",
    "theorie oefenen",
    "rijtheorie",
    "oefenexamen",
    "verkeersvragen",
    "rijles",
    "driving theory Netherlands",
    "نظرية قيادة هولندا",
  ],
  authors: [{ name: "Rijschool Platform" }],
  creator: "Rijschool Platform",
  publisher: "Rijschool Platform",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    alternateLocale: ["ar_SA", "en_US"],
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    siteName: "Rijschool Platform",
    title: "Rijschool Platform — Leer Theorie Online",
    description:
      "De beste manier om je rijbewijs theorie te leren. Oefen met echte CBR-vragen en doe oefenexamens.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rijschool Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rijschool Platform — Leer Theorie Online",
    description:
      "De beste manier om je rijbewijs theorie te leren. Oefen met echte CBR-vragen en doe oefenexamens.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      "nl-NL": "/nl",
      "ar-SA": "/ar",
      "en-US": "/en",
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1d4ed8" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="nl" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthSessionProvider>
            {children}
            <Toaster />
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
