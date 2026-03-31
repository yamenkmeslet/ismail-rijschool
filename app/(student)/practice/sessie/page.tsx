"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Flag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { getLocaleFromPathname } from "@/lib/i18n/path"

type Option = { key: "A" | "B" | "C" | "D"; text: string; correct?: boolean }
type Question = {
  id: string
  category: string
  text: string
  explanation: string
  options: Option[]
}

function getDemoQuestions(locale: string): Question[] {
  if (locale === "ar") {
    return [
      {
        id: "q1",
        category: "voorrang",
        text: "تقترب من تقاطع متساو بدون إشارات من له حق الأولوية",
        explanation: "في التقاطع المتساوي تكون الأولوية للمركبات القادمة من اليمين",
        options: [
          { key: "A", text: "المركبات القادمة من اليسار", correct: false },
          { key: "B", text: "المركبات القادمة من اليمين", correct: true },
          { key: "C", text: "أنت دائما", correct: false },
          { key: "D", text: "المشاة دائما", correct: false },
        ],
      },
      {
        id: "q2",
        category: "verkeersregels",
        text: "ما هي السرعة القصوى داخل المناطق المبنية",
        explanation: "السرعة غالبا 50 كم بالساعة إلا إذا كانت هناك إشارة مختلفة",
        options: [
          { key: "A", text: "30 كم بالساعة", correct: false },
          { key: "B", text: "50 كم بالساعة", correct: true },
          { key: "C", text: "70 كم بالساعة", correct: false },
          { key: "D", text: "100 كم بالساعة", correct: false },
        ],
      },
    ]
  }
  if (locale === "en") {
    return [
      {
        id: "q1",
        category: "voorrang",
        text: "You approach an equal intersection without signs who has right of way",
        explanation: "At an equal intersection traffic from the right has priority",
        options: [
          { key: "A", text: "Traffic from the left", correct: false },
          { key: "B", text: "Traffic from the right", correct: true },
          { key: "C", text: "You always", correct: false },
          { key: "D", text: "Pedestrians always", correct: false },
        ],
      },
      {
        id: "q2",
        category: "verkeersregels",
        text: "What is the maximum speed within built up areas",
        explanation: "Usually 50 km per hour unless indicated otherwise",
        options: [
          { key: "A", text: "30 km per hour", correct: false },
          { key: "B", text: "50 km per hour", correct: true },
          { key: "C", text: "70 km per hour", correct: false },
          { key: "D", text: "100 km per hour", correct: false },
        ],
      },
    ]
  }
  return [
    {
      id: "q1",
      category: "voorrang",
      text: "U nadert een gelijkwaardig kruispunt zonder borden wie heeft voorrang",
      explanation: "Op een gelijkwaardig kruispunt heeft verkeer van rechts voorrang",
      options: [
        { key: "A", text: "Verkeer van links", correct: false },
        { key: "B", text: "Verkeer van rechts", correct: true },
        { key: "C", text: "U altijd", correct: false },
        { key: "D", text: "Voetgangers altijd", correct: false },
      ],
    },
    {
      id: "q2",
      category: "verkeersregels",
      text: "Wat is de maximumsnelheid binnen de bebouwde kom",
      explanation: "Binnen de bebouwde kom is het meestal 50 km per uur tenzij anders aangegeven",
      options: [
        { key: "A", text: "30 km per uur", correct: false },
        { key: "B", text: "50 km per uur", correct: true },
        { key: "C", text: "70 km per uur", correct: false },
        { key: "D", text: "100 km per uur", correct: false },
      ],
    },
  ]
}

function PracticeSessionContent() {
  const sp = useSearchParams()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const count = Number(sp.get("count") ?? "10")
  const category = (sp.get("category") ?? "all").toLowerCase()
  const mode = sp.get("mode") ?? "practice"
  const minutes = Number(sp.get("minutes") ?? "0")

  const copy =
    locale === "ar"
      ? {
          exam: "امتحان",
          practice: "تدريب",
          question: "سؤال",
          of: "من",
          category: "القسم",
          flag: "تحديد",
          check: "تحقق من الإجابة",
          correct: "صحيح",
          wrong: "خطأ",
          prev: "السابق",
          next: "التالي",
        }
      : locale === "en"
        ? {
            exam: "Exam",
            practice: "Practice",
            question: "Question",
            of: "of",
            category: "Category",
            flag: "Flag",
            check: "Check answer",
            correct: "Correct",
            wrong: "Incorrect",
            prev: "Previous",
            next: "Next",
          }
        : {
            exam: "Exam",
            practice: "Oefenen",
            question: "Vraag",
            of: "van",
            category: "Categorie",
            flag: "Markeren",
            check: "Antwoord controleren",
            correct: "Correct",
            wrong: "Onjuist",
            prev: "Vorige",
            next: "Volgende",
          }

  const questions = useMemo(() => {
    const demo = getDemoQuestions(locale)
    const base = category === "all" ? demo : demo.filter((q) => q.category === category)
    const arr = base.length ? base : demo
    return Array.from({ length: Math.max(1, Math.min(count, 25)) }, (_, i) => arr[i % arr.length])
  }, [count, category, locale])

  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<Record<number, Option["key"] | null>>({})
  const [showResult, setShowResult] = useState<Record<number, boolean>>({})
  const [flagged, setFlagged] = useState<Record<number, boolean>>({})
  const [secondsLeft, setSecondsLeft] = useState(minutes > 0 ? minutes * 60 : 0)

  useEffect(() => {
    if (mode !== "exam" || secondsLeft <= 0) return
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [mode, secondsLeft])

  const q = questions[idx]
  const picked = selected[idx] ?? null
  const isAnswered = showResult[idx] ?? false
  const correctKey = q.options.find((o) => o.correct)?.key
  const isCorrect = picked && correctKey ? picked === correctKey : false

  const pct = Math.round(((idx + 1) / questions.length) * 100)
  const timeLabel =
    secondsLeft > 0 ? `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}` : null

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {mode === "exam" ? copy.exam : copy.practice}
          </p>
          <h1 className="text-xl font-bold text-gray-900">
            {copy.question} {idx + 1} {copy.of} {questions.length}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {copy.category} {q.category}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {mode === "exam" && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {timeLabel ?? "0:00"}
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-2", flagged[idx] && "border-orange-300 text-orange-700 bg-orange-50")}
            onClick={() => setFlagged((p) => ({ ...p, [idx]: !p[idx] }))}
          >
            <Flag className="h-4 w-4" />
            {copy.flag}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <Progress value={pct} className="h-2" />
        <p className="text-base font-semibold text-gray-900">{q.text}</p>

        <div className="grid gap-2">
          {q.options.map((o) => {
            const active = picked === o.key
            const correct = isAnswered && o.key === correctKey
            const wrong = isAnswered && active && o.key !== correctKey
            return (
              <button
                key={o.key}
                disabled={isAnswered}
                onClick={() => setSelected((p) => ({ ...p, [idx]: o.key }))}
                className={cn(
                  "text-left rounded-xl border p-4 transition-colors",
                  "bg-white hover:bg-gray-50",
                  active && "border-blue-500 bg-blue-50",
                  correct && "border-green-400 bg-green-50",
                  wrong && "border-red-400 bg-red-50",
                  isAnswered && "cursor-not-allowed"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-gray-900 text-white text-xs font-bold">
                    {o.key}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{o.text}</span>
                </div>
              </button>
            )
          })}
        </div>

        {!isAnswered ? (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!picked}
            onClick={() => setShowResult((p) => ({ ...p, [idx]: true }))}
          >
            {copy.check}
          </Button>
        ) : (
          <div className={cn("rounded-xl p-4 border", isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50")}>
            <p className={cn("text-sm font-semibold", isCorrect ? "text-green-700" : "text-red-700")}>
              {isCorrect ? copy.correct : copy.wrong}
            </p>
            <p className="text-sm text-gray-700 mt-2">{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" className="gap-2" onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}>
          <ArrowLeft className="h-4 w-4" />
          {copy.prev}
        </Button>
        <Button
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={() => setIdx((i) => Math.min(questions.length - 1, i + 1))}
          disabled={idx >= questions.length - 1}
        >
          {copy.next}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function PracticeSessionFallback() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6 lg:p-8">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="h-64 animate-pulse rounded-xl bg-gray-100" />
    </div>
  )
}

export default function PracticeSessionPage() {
  return (
    <Suspense fallback={<PracticeSessionFallback />}>
      <PracticeSessionContent />
    </Suspense>
  )
}
