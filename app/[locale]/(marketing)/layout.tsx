"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { CircleDot, Menu, X, ArrowRight, Instagram, Phone, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"
import { LocaleSwitcherGlobe } from "@/components/i18n/locale-switcher-globe"
import { MarketingBackground } from "@/components/marketing/marketing-background"

function Navbar({ locale }: { locale: Locale }) {
  const m = getMessages(locale)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [mobileOpen])

  const navLinks = [
    { label: m.nav.features, href: `/${locale}/features` },
    { label: m.nav.pricing, href: `/${locale}/pricing` },
    { label: m.nav.faq, href: `/${locale}/faq` },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-white/80 shadow-sm backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between md:h-18">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-extrabold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-brand-sm">
              <CircleDot className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              RijPro
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm motion-safe:hover:-translate-y-px after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-blue-600 after:to-indigo-600 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LocaleSwitcherGlobe locale={locale} label={m.language.switch} variant="ghost" />
            <Button asChild variant="ghost" size="sm" className="text-slate-600">
              <Link href={`/${locale}/login`}>{m.nav.login}</Link>
            </Button>
            <Button asChild variant="brand" size="sm">
              <Link
                href={`/${locale}/register`}
                className="inline-flex items-center gap-1.5 transition-[gap] duration-300 group-hover:gap-2"
              >
                {m.nav.register}
                <ArrowRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" />
              </Link>
            </Button>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <div className="container py-4">
          <div className="mb-3 flex justify-end">
            <LocaleSwitcherGlobe locale={locale} label={m.language.switch} variant="outline" />
          </div>
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
              <Link href={`/${locale}/login`}>{m.nav.login}</Link>
            </Button>
            <Button asChild variant="brand" size="sm" className="w-full">
              <Link href={`/${locale}/register`}>{m.nav.register}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer({ locale }: { locale: Locale }) {
  const m = getMessages(locale)
  const copy =
    locale === "ar"
      ? {
          blurb: "منصة تدريب نظرية هولندا بتجربة حديثة وشروحات واضحة",
          rights: "جميع الحقوق محفوظة.",
          product: "المنتج",
          company: "الشركة",
          legal: "قانوني",
          features: "الميزات",
          pricing: "الأسعار",
          faq: "الأسئلة الشائعة",
          about: "عن المنصة",
          contact: "تواصل",
          privacy: "سياسة الخصوصية",
          terms: "الشروط والأحكام",
          follow: "تابعنا",
          phone: "رقم الهاتف",
        }
      : locale === "en"
        ? {
            blurb: "Modern Dutch theory practice with clear explanations",
            rights: "All rights reserved.",
            product: "Product",
            company: "Company",
            legal: "Legal",
            features: "Features",
            pricing: "Pricing",
            faq: "FAQ",
            about: "About",
            contact: "Contact",
            privacy: "Privacy policy",
            terms: "Terms",
            follow: "Follow",
            phone: "Phone",
          }
        : {
            blurb: "Moderne theorie training met duidelijke uitleg",
            rights: "Alle rechten voorbehouden.",
            product: "Product",
            company: "Bedrijf",
            legal: "Juridisch",
            features: "Functies",
            pricing: "Prijzen",
            faq: "FAQ",
            about: "Over",
            contact: "Contact",
            privacy: "Privacy",
            terms: "Voorwaarden",
            follow: "Volg ons",
            phone: "Telefoon",
          }

  const instagramHref = "https://instagram.com/rijpro"
  const tiktokHref = "https://tiktok.com/@rijpro"
  const linkedinHref = "https://linkedin.com"
  const twitterHref = "https://x.com"
  const phoneNumber = "+31612345678"
  const phoneLabel = "+31 6 1234 5678"

  return (
    <footer className="border-t border-slate-800 bg-[#0B1220] text-slate-400">
      <div className="container py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-brand-sm">
                  <CircleDot className="h-5 w-5 text-white" />
                </div>
                <p className="text-base font-extrabold text-slate-100">RijPro</p>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-400">
                {copy.blurb}
              </p>
              <div className="pt-1">
                <LocaleSwitcherGlobe
                  locale={locale}
                  label={m.language.switch}
                  variant="outline"
                  className="border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                />
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-200">{copy.product}</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link className="hover:text-slate-200" href={`/${locale}/features`}>
                    {copy.features}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-200" href={`/${locale}/pricing`}>
                    {copy.pricing}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-200" href={`/${locale}/faq`}>
                    {copy.faq}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-200">{copy.company}</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="hover:text-slate-200" href={`tel:${phoneNumber}`}>
                    {copy.contact}
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-200" href={instagramHref} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-200" href={tiktokHref} target="_blank" rel="noreferrer">
                    TikTok
                  </a>
                </li>
              </ul>
              <div className="pt-1">
                <a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-slate-300">{copy.phone}</span>
                  <span className="text-slate-200">{phoneLabel}</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-200">{copy.legal}</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link className="hover:text-slate-200" href={`/${locale}/faq`}>
                    {copy.privacy}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-200" href={`/${locale}/faq`}>
                    {copy.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} RijPro. {copy.rights}
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-slate-300">
            <a href={linkedinHref} target="_blank" rel="noreferrer" className="hover:text-slate-100" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={twitterHref} target="_blank" rel="noreferrer" className="hover:text-slate-100" aria-label="X">
              <Twitter className="h-5 w-5" />
            </a>
            <a href={instagramHref} target="_blank" rel="noreferrer" className="hover:text-slate-100" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <MarketingBackground />
      <Navbar locale={params.locale} />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer locale={params.locale} />
    </div>
  )
}

