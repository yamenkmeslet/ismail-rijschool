"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Bookmark, Search, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getLocaleFromPathname, withLocalePath } from "@/lib/i18n/path"

type SavedItem = {
  id: string
  questionId: string
  preview: string
  category: string
}

export default function SavedPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isLocalized = pathname ? /^\/(nl|en|ar)(\/|$)/.test(pathname) : false
  const hrefBase = (href: string) => (isLocalized ? withLocalePath(locale, href) : href)

  const copy =
    locale === "ar"
      ? {
          title: "الأسئلة المحفوظة",
          subtitle: "احفظ الأسئلة لتراجعها لاحقا بسرعة",
          search: "ابحث في المحفوظات",
          emptyTitle: "لا توجد أسئلة محفوظة",
          emptySubtitle: "احفظ الأسئلة أثناء التدريب وستظهر هنا",
          startPractice: "ابدأ التدريب",
          repeat: "راجع",
          remove: "حذف",
          items: "عنصر",
        }
      : locale === "en"
        ? {
            title: "Saved questions",
            subtitle: "Save questions to review later",
            search: "Search saved",
            emptyTitle: "No saved questions",
            emptySubtitle: "Save questions while practicing and they will appear here",
            startPractice: "Start practice",
            repeat: "Review",
            remove: "Remove",
            items: "items",
          }
        : {
            title: "Opgeslagen vragen",
            subtitle: "Bewaar vragen om later snel te herhalen",
            search: "Zoek opgeslagen vraag",
            emptyTitle: "Geen opgeslagen vragen",
            emptySubtitle: "Sla vragen op tijdens het oefenen en bekijk ze hier",
            startPractice: "Begin met oefenen",
            repeat: "Herhaal",
            remove: "Verwijder",
            items: "items",
          }

  const [q, setQ] = useState("")
  const [items, setItems] = useState<SavedItem[]>([])

  useEffect(() => {
    // Demo data for now
    setItems([
      {
        id: "1",
        questionId: "q1",
        preview:
          locale === "ar"
            ? "من له حق الأولوية عند تقاطع متساو"
            : "Wie heeft voorrang op een gelijkwaardig kruispunt",
        category: locale === "ar" ? "الأولوية" : "Voorrang",
      },
      {
        id: "2",
        questionId: "q2",
        preview:
          locale === "ar"
            ? "ماذا تعني إشارة مرور بحافة حمراء"
            : "Wat betekent dit verkeersbord met rode rand",
        category: locale === "ar" ? "إشارات المرور" : "Verkeersborden",
      },
    ])
  }, [locale])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter((i) => `${i.preview} ${i.category}`.toLowerCase().includes(s))
  }, [q, items])

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
          <Bookmark className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{copy.title}</h1>
          <p className="text-sm text-gray-500">{copy.subtitle}</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {filtered.length} {locale === "ar" ? copy.items : copy.items}
        </Badge>
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

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
            <p className="font-semibold text-gray-900">{copy.emptyTitle}</p>
            <p className="text-sm text-gray-500 mt-1">{copy.emptySubtitle}</p>
            <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
              <Link href={hrefBase("/practice")}>{copy.startPractice}</Link>
            </Button>
          </div>
        ) : (
          filtered.map((it) => (
            <div key={it.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{it.preview}</p>
                <p className="text-xs text-gray-500 mt-1">{it.category}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Link href={hrefBase(`/practice/sessie?count=10&category=${encodeURIComponent(it.category.toLowerCase())}&difficulty=Alle&type=Alle`)}>
                      {copy.repeat}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    onClick={() => setItems((prev) => prev.filter((x) => x.id !== it.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                    {copy.remove}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

