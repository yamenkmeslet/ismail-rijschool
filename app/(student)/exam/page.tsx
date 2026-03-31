"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { ClipboardCheck, Play, Clock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getLocaleFromPathname, withLocalePath } from "@/lib/i18n/path"

export default function ExamPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isLocalized = pathname ? /^\/(nl|en|ar)(\/|$)/.test(pathname) : false
  const hrefBase = (href: string) => (isLocalized ? withLocalePath(locale, href) : href)

  const copy =
    locale === "ar"
      ? {
          title: "امتحان تجريبي",
          subtitle: "تجربة واقعية مع مؤقت ونتيجة",
          badge: "نمط الامتحان",
          qCount: "عدد الأسئلة",
          time: "الوقت",
          min: "دقيقة",
          summary: "سؤال مع مؤقت لمدة",
          start: "ابدأ الامتحان",
        }
      : locale === "en"
        ? {
            title: "Mock exam",
            subtitle: "Realistic exam flow with timer and score",
            badge: "Exam style",
            qCount: "Questions",
            time: "Time",
            min: "min",
            summary: "questions with timer",
            start: "Start exam",
          }
        : {
            title: "Nep examen",
            subtitle: "Realistische examenomgeving met timer en score",
            badge: "Exam style",
            qCount: "Aantal vragen",
            time: "Tijd",
            min: "min",
            summary: "vragen minuten timer",
            start: "Start examen",
          }

  const [count, setCount] = useState(40)
  const [minutes, setMinutes] = useState(45)

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
          <ClipboardCheck className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{copy.title}</h1>
          <p className="text-sm text-gray-500">{copy.subtitle}</p>
        </div>
        <Badge variant="outline" className="text-xs flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          {copy.badge}
        </Badge>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{copy.qCount}</p>
            <div className="mt-3 flex gap-2">
              {[25, 40, 65].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    count === n ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{copy.time}</p>
            <div className="mt-3 flex gap-2">
              {[30, 45, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => setMinutes(m)}
                  className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    minutes === m ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {m} {copy.min}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            {locale === "ar"
              ? `${count} سؤال مع مؤقت لمدة ${minutes} ${copy.min}`
              : locale === "en"
                ? `${count} questions ${minutes} ${copy.min}`
                : `${count} vragen ${minutes} minuten timer`}
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Link href={hrefBase(`/practice/sessie?count=${count}&category=all&difficulty=Alle&type=Alle&mode=exam&minutes=${minutes}`)}>
              <Play className="h-4 w-4" />
              {copy.start}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

