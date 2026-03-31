"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { Locale } from "@/lib/i18n/config"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PricingCard } from "@/components/marketing/pricing-card"
import { cn } from "@/lib/utils"

type Plan = {
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  ctaLabel: string
  popular?: boolean
  badge?: string
  periodLabel: string
  features: { text: string; included: boolean }[]
}

function getCopy(locale: Locale) {
  if (locale === "ar") {
    return {
      tag: "الأسعار",
      titleA: "اختر الباقة",
      titleEmphasis: "المناسبة",
      titleB: "لك",
      sub: "ثلاث باقات واضحة تبدأ بتجربة مجانية",
      monthly: "شهري",
      yearly: "سنوي",
      save: "وفر 20%",
      note1: "كل الباقات تشمل تجربة مجانية",
      note2: "يمكنك الإلغاء في أي وقت",
      ctaTitle: "ابدأ اليوم",
      ctaSub: "اختر باقتك وابدأ التدريب مباشرة",
      ctaBtn: "ابدأ مجانًا",
      period: "شهر",
    }
  }
  if (locale === "en") {
    return {
      tag: "Pricing",
      titleA: "Choose the plan",
      titleEmphasis: "that fits",
      titleB: "your goals",
      sub: "Three clear plans with a free trial",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "Save 20%",
      note1: "All plans include a free trial",
      note2: "Cancel anytime",
      ctaTitle: "Start today",
      ctaSub: "Pick a plan and begin practicing right away",
      ctaBtn: "Start free",
      period: "month",
    }
  }
  return {
    tag: "Prijzen",
    titleA: "Kies het plan",
    titleEmphasis: "dat past",
    titleB: "bij jou",
    sub: "Drie heldere plannen met gratis proefperiode",
    monthly: "Maandelijks",
    yearly: "Jaarlijks",
    save: "Bespaar 20%",
    note1: "Alle plannen inclusief gratis proefperiode",
    note2: "Annuleer op elk moment",
    ctaTitle: "Start vandaag",
    ctaSub: "Kies je plan en begin direct met oefenen",
    ctaBtn: "Start gratis",
    period: "maand",
  }
}

function getPlans(locale: Locale): Plan[] {
  const c = getCopy(locale)
  if (locale === "ar") {
    return [
      {
        name: "أساسي",
        monthlyPrice: 9.99,
        annualPrice: 7.99,
        description: "للبداية والتدريب المنظم",
        ctaLabel: "ابدأ بالأساسي",
        periodLabel: c.period,
        features: [
          { text: "500 سؤال تدريب", included: true },
          { text: "3 امتحانات تجريبية شهريًا", included: true },
          { text: "لوحة تقدم أساسية", included: true },
          { text: "لغة واحدة", included: true },
          { text: "تدريب ذكي متقدم", included: false },
          { text: "امتحانات غير محدودة", included: false },
          { text: "كل اللغات", included: false },
        ],
      },
      {
        name: "قياسي",
        monthlyPrice: 14.99,
        annualPrice: 11.99,
        description: "الأفضل لمعظم الطلاب",
        ctaLabel: "ابدأ بالقياسي",
        popular: true,
        badge: "الأكثر اختيارا",
        periodLabel: c.period,
        features: [
          { text: "2000+ سؤال تدريب", included: true },
          { text: "امتحانات غير محدودة", included: true },
          { text: "تحليل تقدم متقدم", included: true },
          { text: "كل اللغات", included: true },
          { text: "تدريب ذكي", included: true },
          { text: "شرح لكل سؤال", included: true },
          { text: "خطة تدريب", included: true },
        ],
      },
      {
        name: "بريميوم",
        monthlyPrice: 24.99,
        annualPrice: 19.99,
        description: "كل شيء مع ميزات متقدمة",
        ctaLabel: "ابدأ بالبريميوم",
        periodLabel: c.period,
        features: [
          { text: "2000+ سؤال تدريب", included: true },
          { text: "امتحانات غير محدودة", included: true },
          { text: "تحليل متقدم", included: true },
          { text: "كل اللغات", included: true },
          { text: "تدريب ذكي", included: true },
          { text: "شرح لكل سؤال", included: true },
          { text: "نصائح متقدمة", included: true },
          { text: "دعم أولوية", included: true },
        ],
      },
    ]
  }

  if (locale === "en") {
    return [
      {
        name: "Basic",
        monthlyPrice: 9.99,
        annualPrice: 7.99,
        description: "A solid start to build confidence",
        ctaLabel: "Start Basic",
        periodLabel: c.period,
        features: [
          { text: "500 practice questions", included: true },
          { text: "3 mock exams per month", included: true },
          { text: "Basic progress dashboard", included: true },
          { text: "1 language", included: true },
          { text: "Adaptive learning", included: false },
          { text: "Unlimited mock exams", included: false },
          { text: "All 3 languages", included: false },
        ],
      },
      {
        name: "Standard",
        monthlyPrice: 14.99,
        annualPrice: 11.99,
        description: "Best for most students",
        ctaLabel: "Start Standard",
        popular: true,
        badge: "Most popular",
        periodLabel: c.period,
        features: [
          { text: "2,000+ practice questions", included: true },
          { text: "Unlimited mock exams", included: true },
          { text: "Advanced progress analytics", included: true },
          { text: "All 3 languages", included: true },
          { text: "Adaptive learning", included: true },
          { text: "Explanations per question", included: true },
          { text: "Personal study plan", included: true },
        ],
      },
      {
        name: "Premium",
        monthlyPrice: 24.99,
        annualPrice: 19.99,
        description: "Everything plus advanced insights",
        ctaLabel: "Start Premium",
        periodLabel: c.period,
        features: [
          { text: "2,000+ practice questions", included: true },
          { text: "Unlimited mock exams", included: true },
          { text: "Advanced analytics", included: true },
          { text: "All 3 languages", included: true },
          { text: "Adaptive learning", included: true },
          { text: "Explanations per question", included: true },
          { text: "Advanced tips", included: true },
          { text: "Priority support", included: true },
        ],
      },
    ]
  }

  // nl
  return [
    {
      name: "Basis",
      monthlyPrice: 9.99,
      annualPrice: 7.99,
      description: "Perfect om te beginnen met oefenen",
      ctaLabel: "Begin met Basis",
      periodLabel: c.period,
      features: [
        { text: "500 oefenvragen", included: true },
        { text: "3 oefenexamens per maand", included: true },
        { text: "Basisvoortgangsoverzicht", included: true },
        { text: "1 taal naar keuze", included: true },
        { text: "Adaptief leersysteem", included: false },
        { text: "Onbeperkte oefenexamens", included: false },
        { text: "Alle 3 talen", included: false },
      ],
    },
    {
      name: "Standaard",
      monthlyPrice: 14.99,
      annualPrice: 11.99,
      description: "Onze meest gekozen optie voor slagen",
      ctaLabel: "Begin met Standaard",
      popular: true,
      badge: "Meest populair",
      periodLabel: c.period,
      features: [
        { text: "2.000+ oefenvragen", included: true },
        { text: "Onbeperkte oefenexamens", included: true },
        { text: "Uitgebreide voortgangsanalyse", included: true },
        { text: "Alle 3 talen", included: true },
        { text: "Adaptief leersysteem", included: true },
        { text: "Expertuitleg per vraag", included: true },
        { text: "Studieplan op maat", included: true },
      ],
    },
    {
      name: "Premium",
      monthlyPrice: 24.99,
      annualPrice: 19.99,
      description: "Alles wat je nodig hebt plus meer",
      ctaLabel: "Begin met Premium",
      periodLabel: c.period,
      features: [
        { text: "2.000+ oefenvragen", included: true },
        { text: "Onbeperkte oefenexamens", included: true },
        { text: "Uitgebreide voortgangsanalyse", included: true },
        { text: "Alle 3 talen", included: true },
        { text: "Adaptief leersysteem", included: true },
        { text: "Expertuitleg per vraag", included: true },
        { text: "Studieplan op maat", included: true },
        { text: "Geavanceerde tips", included: true },
      ],
    },
  ]
}

export default function LocalizedPricingPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale
  const dir = locale === "ar" ? "rtl" : "ltr"
  const c = useMemo(() => getCopy(locale), [locale])
  const plans = useMemo(() => getPlans(locale), [locale])
  const [annual, setAnnual] = useState(false)

  return (
    <div dir={dir}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pb-14 pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-blue-100/55 blur-3xl" />
          <div className="absolute -bottom-16 -left-32 h-[420px] w-[420px] rounded-full bg-indigo-100/45 blur-3xl" />
        </div>

        <div className="container relative text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            {c.tag}
          </span>
          <h1 className="mx-auto mb-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {c.titleA}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {c.titleEmphasis}
            </span>{" "}
            {c.titleB}
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-slate-600">{c.sub}</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-100 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-xl px-5 py-2 text-sm font-semibold transition-colors",
                !annual ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {c.monthly}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-colors",
                annual ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {c.yearly}
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                {c.save}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-white pb-16 pt-6">
        <div className="container">
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
            {plans.map((p) => (
              <PricingCard
                key={p.name}
                name={p.name}
                price={p.monthlyPrice}
                annualPrice={p.annualPrice}
                period={p.periodLabel}
                description={p.description}
                features={p.features}
                ctaLabel={p.ctaLabel}
                ctaHref={`/${locale}/register`}
                popular={!!p.popular}
                badge={p.badge}
                annual={annual}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 text-center text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>{c.note1}</span>
            </div>
            <p>{c.note2}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800" aria-hidden="true" />
        <div className="container relative text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">{c.ctaTitle}</h2>
          <p className="mb-10 text-lg text-blue-200">{c.ctaSub}</p>
          <Button asChild size="xl" className="bg-white text-blue-700 hover:bg-blue-50">
            <Link href={`/${locale}/register`}>
              {c.ctaBtn}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

