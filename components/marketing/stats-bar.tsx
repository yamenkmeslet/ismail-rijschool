"use client"

import { Users, TrendingUp, FileQuestion, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/i18n/config"

interface Stat {
  icon: React.ReactNode
  value: string
  label: string
}

function getStats(locale?: Locale): Stat[] {
  const labels =
    locale === "ar"
      ? { students: "طلاب", pass: "نسبة النجاح", questions: "أسئلة تدريب", langs: "لغات" }
      : locale === "en"
        ? { students: "Students", pass: "Pass rate", questions: "Practice questions", langs: "Languages" }
        : { students: "Studenten", pass: "Slagingspercentage", questions: "Oefenvragen", langs: "Talen" }

  return [
    { icon: <Users className="h-5 w-5 text-blue-400" />, value: "50.000+", label: labels.students },
    { icon: <TrendingUp className="h-5 w-5 text-green-400" />, value: "95%", label: labels.pass },
    { icon: <FileQuestion className="h-5 w-5 text-purple-400" />, value: "2.000+", label: labels.questions },
    { icon: <Globe className="h-5 w-5 text-orange-400" />, value: "3", label: labels.langs },
  ]
}

interface StatsBarProps {
  className?: string
  dark?: boolean
  locale?: Locale
}

export function StatsBar({ className, dark = false, locale }: StatsBarProps) {
  const stats = getStats(locale)
  return (
    <div
      className={cn(
        "rounded-2xl border px-6 py-5",
        dark
          ? "border-white/10 bg-white/5 backdrop-blur-sm"
          : "border-slate-200 bg-white shadow-card",
        className
      )}
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center gap-1 text-center",
              index < stats.length - 1 &&
                "sm:border-r sm:border-slate-200 sm:pr-6",
              dark && index < stats.length - 1 && "sm:border-white/10"
            )}
          >
            <div className="mb-1 flex items-center gap-1.5">
              {stat.icon}
            </div>
            <span
              className={cn(
                "text-2xl font-bold tracking-tight",
                dark ? "text-white" : "text-slate-900"
              )}
            >
              {stat.value}
            </span>
            <span
              className={cn(
                "text-sm",
                dark ? "text-blue-200" : "text-slate-500"
              )}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
