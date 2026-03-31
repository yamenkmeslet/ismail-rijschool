"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Search, ChevronRight, Grid3x3, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getLocaleFromPathname, withLocalePath } from "@/lib/i18n/path"

type Category = {
  id: string
  slug: string
  title: string
  description?: string | null
}

export default function CategoriesPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isLocalized = pathname ? /^\/(nl|en|ar)(\/|$)/.test(pathname) : false
  const hrefBase = (href: string) => (isLocalized ? withLocalePath(locale, href) : href)

  const copy =
    locale === "ar"
      ? {
          title: "تدريب حسب القسم",
          subtitle: "اختر قسما وابدأ التدريب مباشرة",
          search: "ابحث عن قسم",
          start: "ابدأ",
          details: "تفاصيل",
        }
      : locale === "en"
        ? {
            title: "Practice by category",
            subtitle: "Choose a category and start practicing",
            search: "Search category",
            start: "Start",
            details: "Details",
          }
        : {
            title: "Per categorie oefenen",
            subtitle: "Kies een onderwerp en start direct met oefenen",
            search: "Zoek categorie",
            start: "Start",
            details: "Details",
          }

  const [q, setQ] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function run() {
      try {
        const res = await fetch("/api/categories")
        const raw = (await res.json()) as any[] | { categories?: any[] }
        const data = Array.isArray(raw) ? raw : raw.categories ?? []
        if (!mounted) return
        setCategories(
          data.map((c) => ({
            id: String(c.id),
            slug: String(c.slug),
            title: String(c.title ?? c.slug),
            description: c.description ?? null,
          }))
        )
      } catch {
        if (!mounted) return
        setCategories([
          { id: "voorrang", slug: "voorrang", title: "Voorrang", description: "Wie heeft voorrang in welke situatie" },
          { id: "verkeersborden", slug: "verkeersborden", title: "Verkeersborden", description: "Borden herkennen en toepassen" },
        ])
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return categories
    return categories.filter((c) => `${c.title} ${c.description ?? ""}`.toLowerCase().includes(s))
  }, [q, categories])

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
          <Grid3x3 className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{copy.title}</h1>
          <p className="text-sm text-gray-500">{copy.subtitle}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={copy.search}
          className="border-0 focus-visible:ring-0 px-0"
        />
      </div>

      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", loading && "opacity-80")}>
        {(loading ? Array.from({ length: 6 }) : filtered).map((c: any, idx: number) => {
          const key = loading ? idx : c.id
          if (loading) {
            return (
              <div key={key} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="h-4 w-36 bg-gray-100 rounded mb-2" />
                <div className="h-3 w-full bg-gray-100 rounded mb-1" />
                <div className="h-3 w-2/3 bg-gray-100 rounded" />
              </div>
            )
          }

          return (
            <div key={key} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{c.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.description ?? ""}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0 mt-0.5" />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Link href={hrefBase(`/practice/sessie?count=20&category=${encodeURIComponent(c.slug)}&difficulty=Alle&type=Alle`)}>
                    <Play className="h-4 w-4" />
                    {copy.start}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={hrefBase(`/categories/${encodeURIComponent(c.slug)}`)}>{copy.details}</Link>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

