"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { BarChart3, TrendingUp, Target, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getLocaleFromPathname } from "@/lib/i18n/path"

export default function ProgressPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)

  const copy =
    locale === "ar"
      ? {
          title: "التقدم",
          subtitle: "نظرة على أدائك وجاهزيتك للامتحان",
          range: "آخر 30 يوم",
          answered: "تمت الإجابة",
          accuracy: "الدقة",
          readiness: "جاهزية الامتحان",
          mistakes: "الأخطاء",
          byCat: "الأداء حسب القسم",
        }
      : locale === "en"
        ? {
            title: "Progress",
            subtitle: "Overview of performance and readiness",
            range: "Last 30 days",
            answered: "Answered",
            accuracy: "Accuracy",
            readiness: "Exam readiness",
            mistakes: "Mistakes",
            byCat: "Performance by category",
          }
        : {
            title: "Voortgang",
            subtitle: "Overzicht van je prestaties en klaarheid voor het examen",
            range: "Laatste 30 dagen",
            answered: "Beantwoord",
            accuracy: "Nauwkeurigheid",
            readiness: "Examengereedheid",
            mistakes: "Fouten",
            byCat: "Prestaties per categorie",
          }

  const stats = useMemo(
    () => ({
      answered: 1847,
      correct: 1368,
      incorrect: 479,
      accuracy: 74,
      readiness: 73,
      categories: [
        {
          name:
            locale === "ar"
              ? "قواعد المرور"
              : locale === "en"
                ? "Traffic rules"
                : "Verkeersregels",
          accuracy: 82,
        },
        {
          name: locale === "ar" ? "الأولوية" : locale === "en" ? "Right of way" : "Voorrang",
          accuracy: 68,
        },
        {
          name: locale === "ar" ? "إشارات المرور" : locale === "en" ? "Traffic signs" : "Verkeersborden",
          accuracy: 77,
        },
        {
          name: locale === "ar" ? "إدراك المخاطر" : locale === "en" ? "Hazard perception" : "Gevaarherkenning",
          accuracy: 61,
        },
      ],
    }),
    [locale]
  )

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{copy.title}</h1>
          <p className="text-sm text-gray-500">{copy.subtitle}</p>
        </div>
        <Badge variant="outline" className="text-xs">{copy.range}</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: copy.answered, value: stats.answered.toLocaleString(locale === "ar" ? "ar" : "nl-NL"), icon: TrendingUp },
          { label: copy.accuracy, value: `${stats.accuracy}%`, icon: Target },
          { label: copy.readiness, value: `${stats.readiness}%`, icon: Award },
          { label: copy.mistakes, value: stats.incorrect.toLocaleString(locale === "ar" ? "ar" : "nl-NL"), icon: TrendingUp },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{c.label}</p>
              <c.icon className="h-4 w-4 text-gray-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900">{copy.byCat}</h2>
        <div className="mt-4 space-y-4">
          {stats.categories.map((c) => (
            <div key={c.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{c.name}</span>
                <span className="font-semibold text-gray-900">{c.accuracy}%</span>
              </div>
              <Progress value={c.accuracy} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

