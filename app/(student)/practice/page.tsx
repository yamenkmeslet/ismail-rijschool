"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  Dumbbell,
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Settings2,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getLocaleFromPathname, withLocalePath } from "@/lib/i18n/path"

const questionCounts = [10, 20, 30, 50]

const recentSessions = [
  { id: 1, category: "Verkeerstekens", count: 20, score: 18, date: "Vandaag, 09:14", passed: true, time: "8 min" },
  { id: 2, category: "Gevaarherkenning", count: 15, score: 9, date: "Gisteren, 15:22", passed: false, time: "6 min" },
  { id: 3, category: "Voorrang regels", count: 20, score: 14, date: "2 dagen geleden", passed: true, time: "9 min" },
  { id: 4, category: "Alle categorieën", count: 30, score: 22, date: "3 dagen geleden", passed: true, time: "14 min" },
]

export default function PracticePage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isLocalized = pathname ? /^\/(nl|en|ar)(\/|$)/.test(pathname) : false
  const hrefBase = (href: string) => (isLocalized ? withLocalePath(locale, href) : href)

  const copy =
    locale === "ar"
      ? {
          title: "تدريب سريع",
          subtitle: "اضبط الجلسة وابدأ مباشرة",
          setup: "إعداد الجلسة",
          questions: "عدد الأسئلة",
          category: "القسم",
          difficulty: "مستوى الصعوبة",
          type: "نوع السؤال",
          summaryMode: "وضع التدريب شرح بعد كل إجابة",
          start: "ابدأ التدريب",
          recent: "جلسات حديثة",
          sessions: "جلسات",
          all: "كل الأقسام",
          diffAll: "الكل",
          diffEasy: "سهل",
          diffMed: "متوسط",
          diffHard: "صعب",
          typeAll: "الكل",
          typeText: "نص فقط",
          typeImage: "مع صورة",
          typeVideo: "مع فيديو",
          minutes: "دقيقة",
        }
      : locale === "en"
        ? {
            title: "Quick practice",
            subtitle: "Configure your session and start",
            setup: "Session setup",
            questions: "Questions",
            category: "Category",
            difficulty: "Difficulty",
            type: "Question type",
            summaryMode: "Mode instant explanation after each answer",
            start: "Start practice",
            recent: "Recent sessions",
            sessions: "sessions",
            all: "All categories",
            diffAll: "All",
            diffEasy: "Easy",
            diffMed: "Medium",
            diffHard: "Hard",
            typeAll: "All",
            typeText: "Text only",
            typeImage: "With image",
            typeVideo: "With video",
            minutes: "min",
          }
        : {
            title: "Snel oefenen",
            subtitle: "Stel je oefensessie in en begin meteen",
            setup: "Oefening instellen",
            questions: "Aantal vragen",
            category: "Categorie",
            difficulty: "Moeilijkheidsgraad",
            type: "Vraagtype",
            summaryMode: "Oefenmodus uitleg direct na elk antwoord",
            start: "Start oefening",
            recent: "Recente sessies",
            sessions: "sessies",
            all: "Alle categorieën",
            diffAll: "Alle",
            diffEasy: "Makkelijk",
            diffMed: "Gemiddeld",
            diffHard: "Moeilijk",
            typeAll: "Alle",
            typeText: "Alleen tekst",
            typeImage: "Met afbeelding",
            typeVideo: "Met video",
            minutes: "min",
          }

  const categories = [
    {
      value: "all",
      label:
        locale === "ar" ? copy.all : locale === "en" ? "All categories" : "Alle categorieën",
    },
    { value: "verkeerstekens", label: locale === "ar" ? "إشارات المرور" : "Verkeerstekens" },
    { value: "voorrang", label: locale === "ar" ? "الأولوية" : "Voorrang regels" },
    { value: "gevaarherkenning", label: locale === "ar" ? "إدراك المخاطر" : "Gevaarherkenning" },
    { value: "rijvaardigheid", label: locale === "ar" ? "مهارات القيادة" : "Rijvaardigheid" },
    { value: "milieu", label: locale === "ar" ? "البيئة والاقتصاد" : "Milieu & economie" },
    { value: "veiligheid", label: locale === "ar" ? "السلامة" : "Veilig rijgedrag" },
    { value: "rijstroken", label: locale === "ar" ? "المسارات" : "Rijstroken" },
  ]

  const difficulties =
    locale === "ar"
      ? [copy.diffAll, copy.diffEasy, copy.diffMed, copy.diffHard]
      : locale === "en"
        ? ["All", "Easy", "Medium", "Hard"]
        : ["Alle", "Makkelijk", "Gemiddeld", "Moeilijk"]

  const types =
    locale === "ar"
      ? [copy.typeAll, copy.typeText, copy.typeImage, copy.typeVideo]
      : locale === "en"
        ? [copy.typeAll, copy.typeText, copy.typeImage, copy.typeVideo]
        : ["Alle", "Alleen tekst", "Met afbeelding", "Met video"]

  const [questionCount, setQuestionCount] = useState(20)
  const [category, setCategory] = useState("all")
  const [difficulty, setDifficulty] = useState(difficulties[0])
  const [type, setType] = useState(types[0])

  const selectedCategory = categories.find((c) => c.value === category)

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8" dir={locale === "ar" ? "rtl" : "ltr"}>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{copy.title}</h1>
        </div>
        <p className={cn("text-gray-500 text-sm", locale === "ar" ? "mr-12" : "ml-12")}>
          {copy.subtitle}
        </p>
      </div>

      {/* Configuration card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50">
          <Settings2 className="h-4 w-4 text-gray-500" />
          <h2 className="font-semibold text-gray-700 text-sm">{copy.setup}</h2>
        </div>

        <div className="p-6 space-y-7">
          {/* Number of questions */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">{copy.questions}</label>
            <div className="flex gap-3 flex-wrap">
              {questionCounts.map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={cn(
                    "flex flex-col items-center justify-center w-20 h-16 rounded-xl border-2 text-sm font-semibold transition-all",
                    questionCount === n
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50/50"
                  )}
                >
                  <span className="text-2xl font-bold">{n}</span>
                  <span className="text-xs opacity-70 mt-0.5">
                    {n === 10 ? `~4 ${copy.minutes}` : n === 20 ? `~8 ${copy.minutes}` : n === 30 ? `~12 ${copy.minutes}` : `~20 ${copy.minutes}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">{copy.category}</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                    category === cat.value
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-gray-50"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty + Type in a row */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">{copy.difficulty}</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg border text-sm font-medium transition-all",
                      difficulty === d
                        ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                        : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">{copy.type}</label>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg border text-sm font-medium transition-all",
                      type === t
                        ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                        : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary + Start button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-gray-500 space-y-0.5">
            <p>
              <span className="font-semibold text-gray-900">{questionCount} {locale === "ar" ? "سؤال" : locale === "en" ? "questions" : "vragen"}</span>{" "}
              <span className="font-semibold text-gray-900">{selectedCategory?.label}</span> ·{" "}
              <span>{difficulty}</span> · <span>{type}</span>
            </p>
            <p className="text-xs text-gray-400">{copy.summaryMode}</p>
          </div>
          <Link href={hrefBase(`/practice/sessie?count=${questionCount}&category=${category}&difficulty=${difficulty}&type=${type}`)}>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2 px-6 font-semibold">
              <Play className="h-4 w-4" />
              {copy.start}
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">{copy.recent}</h2>
          <Badge variant="outline" className="text-xs">{recentSessions.length} {copy.sessions}</Badge>
        </div>
        <div className="space-y-3">
          {recentSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0",
                  session.passed ? "bg-green-50" : "bg-red-50"
                )}
              >
                {session.passed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{session.category}</p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      session.passed
                        ? "border-green-200 text-green-700 bg-green-50"
                        : "border-red-200 text-red-700 bg-red-50"
                    )}
                  >
                    {session.score}/{session.count}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {session.time}
                  </span>
                  <span>{session.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p
                    className={cn(
                      "text-sm font-bold",
                      session.passed ? "text-green-600" : "text-red-500"
                    )}
                  >
                    {Math.round((session.score / session.count) * 100)}%
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
