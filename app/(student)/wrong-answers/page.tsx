"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { XCircle, Filter, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getLocaleFromPathname, withLocalePath } from "@/lib/i18n/path"

type Wrong = { id: string; preview: string; category: string; difficulty: "easy" | "medium" | "hard" }

const seed: Wrong[] = [
  { id: "w1", preview: "Gevaarherkenning in druk stadsverkeer", category: "Gevaarherkenning", difficulty: "hard" },
  { id: "w2", preview: "Voorrang op een gelijkwaardig kruispunt", category: "Voorrang", difficulty: "medium" },
  { id: "w3", preview: "Parkeren binnen vijf meter van een kruispunt", category: "Parkeren", difficulty: "easy" },
]

export default function WrongAnswersPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isLocalized = pathname ? /^\/(nl|en|ar)(\/|$)/.test(pathname) : false
  const hrefBase = (href: string) => (isLocalized ? withLocalePath(locale, href) : href)

  const copy =
    locale === "ar"
      ? {
          title: "مراجعة الأخطاء",
          subtitle: "راجع أخطاءك وحسن نتيجتك",
          questions: "سؤال",
          all: "الكل",
          easy: "سهل",
          medium: "متوسط",
          hard: "صعب",
          repeat: "إعادة التدريب",
        }
      : locale === "en"
        ? {
            title: "Wrong answers",
            subtitle: "Review mistakes and improve faster",
            questions: "questions",
            all: "All",
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",
            repeat: "Retry",
          }
        : {
            title: "Foute antwoorden",
            subtitle: "Herhaal je fouten en verbeter je score",
            questions: "vragen",
            all: "Alle",
            easy: "Makkelijk",
            medium: "Gemiddeld",
            hard: "Moeilijk",
            repeat: "Herhalen",
          }

  const [difficulty, setDifficulty] = useState<"all" | Wrong["difficulty"]>("all")

  const items = useMemo(() => {
    if (difficulty === "all") return seed
    return seed.filter((x) => x.difficulty === difficulty)
  }, [difficulty])

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600">
          <XCircle className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{copy.title}</h1>
          <p className="text-sm text-gray-500">{copy.subtitle}</p>
        </div>
        <Badge variant="outline" className="text-xs">{items.length} {copy.questions}</Badge>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
        <Filter className="h-4 w-4 text-gray-400" />
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: copy.all },
            { id: "easy", label: copy.easy },
            { id: "medium", label: copy.medium },
            { id: "hard", label: copy.hard },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id as any)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                difficulty === d.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{it.preview}</p>
              <p className="text-xs text-gray-500 mt-1">{it.category}</p>
              <div className="mt-3">
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Link href={hrefBase(`/practice/sessie?count=10&category=${encodeURIComponent(it.category.toLowerCase())}&difficulty=Alle&type=Alle`)}>
                    {copy.repeat}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

