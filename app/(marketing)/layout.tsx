"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  CircleDot,
  Menu,
  X,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Functies", href: "/features" },
  { label: "Prijzen", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change / outside click
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [mobileOpen])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-white/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-brand-sm">
              <CircleDot className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              RijPro
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost" size="sm" className="text-slate-600">
              <Link href="/login">Inloggen</Link>
            </Button>
            <Button asChild variant="brand" size="sm">
              <Link href="/register">
                Gratis starten
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <div className="container py-4">
          <nav className="mb-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/login">Inloggen</Link>
            </Button>
            <Button asChild variant="brand" size="sm" className="w-full">
              <Link href="/register">Gratis starten</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                <CircleDot className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">RijPro</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              De slimste manier om je rijtheorie te leren. Haal je CBR-examen op
              de eerste poging.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: <Twitter className="h-4 w-4" />, href: "#", label: "Twitter" },
                { icon: <Instagram className="h-4 w-4" />, href: "#", label: "Instagram" },
                { icon: <Facebook className="h-4 w-4" />, href: "#", label: "Facebook" },
                { icon: <Linkedin className="h-4 w-4" />, href: "#", label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Product
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Functies", href: "/features" },
                { label: "Prijzen", href: "/pricing" },
                { label: "FAQ", href: "/faq" },
                { label: "Oefenvragen", href: "/questions" },
                { label: "Oefenexamens", href: "/exams" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Ondersteuning
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Help Center", href: "/help" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy", href: "/privacy" },
                { label: "Nieuwsbrief", href: "/newsletter" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Juridisch
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Privacybeleid", href: "/privacy-policy" },
                { label: "Gebruiksvoorwaarden", href: "/terms" },
                { label: "Cookie-instellingen", href: "/cookies" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language switcher */}
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
                Taal
              </h3>
              <div className="flex gap-2">
                {[
                  { code: "NL", label: "Nederlands" },
                  { code: "EN", label: "English" },
                  { code: "AR", label: "العربية" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    aria-label={lang.label}
                    className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-blue-600 hover:text-white first:bg-blue-600 first:text-white"
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} RijPro. Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-slate-600">
            Niet gelieerd aan het CBR. Uitsluitend voor studieleerdoeleinden.
          </p>
        </div>
      </div>
    </footer>
  )
}

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
