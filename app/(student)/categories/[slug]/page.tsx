"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLocaleFromPathname, withLocalePath } from "@/lib/i18n/path"

export default function CategoryDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug ?? "category"
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isLocalized = pathname ? /^\/(nl|en|ar)(\/|$)/.test(pathname) : false
  const hrefBase = (href: string) => (isLocalized ? withLocalePath(locale, href) : href)

  const title =
    slug === "voorrang"
      ? locale === "ar"
        ? "الأولوية"
        : locale === "en"
          ? "Right of way"
          : "Voorrang"
      : slug === "verkeersborden"
        ? locale === "ar"
          ? "إشارات المرور"
          : locale === "en"
            ? "Traffic signs"
            : "Verkeersborden"
        : slug

  const copy =
    locale === "ar"
      ? {
          label: "القسم",
          subtitle: "تدريب مركز داخل هذا القسم مع شرح بعد كل سؤال",
          start: "ابدأ التدريب",
          back: "رجوع إلى الأقسام",
        }
      : locale === "en"
        ? {
            label: "Category",
            subtitle: "Focused practice with explanation after each question",
            start: "Start practice",
            back: "Back to categories",
          }
        : {
            label: "Categorie",
            subtitle: "Oefen gericht in deze categorie met uitleg na elke vraag",
            start: "Start oefening",
            back: "Terug naar categorieën",
          }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{copy.label}</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">{title}</h1>
        <p className="text-sm text-gray-500 mt-2">{copy.subtitle}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Link href={hrefBase(`/practice/sessie?count=20&category=${encodeURIComponent(slug)}&difficulty=Alle&type=Alle`)}>
              <Play className="h-4 w-4" />
              {copy.start}
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href={hrefBase("/categories")}>
              {copy.back}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

