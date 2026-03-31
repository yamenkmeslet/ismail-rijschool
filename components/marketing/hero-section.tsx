"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Play, ShieldCheck, Globe, Award, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsBar } from "@/components/marketing/stats-bar"
import type { Locale } from "@/lib/i18n/config"
import { LocaleSwitcherGlobe } from "@/components/i18n/locale-switcher-globe"
import { getMessages } from "@/lib/i18n/messages"

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const visualReveal = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
  },
}

export function HeroSection({ locale }: { locale: Locale | string | undefined }) {
  const m = getMessages(locale)
  const l = locale === "ar" ? "ar" : locale === "en" ? "en" : "nl"
  const dir = l === "ar" ? "rtl" : "ltr"

  const dash =
    l === "ar"
      ? {
          welcome: "مرحبا بعودتك أحمد",
          title: "تقدمك في الدراسة",
          ready: "جاهزية",
          cards: [
            { label: "أسئلة مجابة", value: "1,240" },
            { label: "نسبة صحيحة", value: "87%" },
            { label: "امتحانات تدريب", value: "12" },
            { label: "أيام دراسة", value: "21" },
          ],
          current: "السؤال الحالي القسم الأولوية",
          qBadge: "سؤال 24 / 65",
          qText: "تقترب من تقاطع توجد إشارة شكل معين أصفر ماذا تعني هذه الإشارة",
          options: ["لديك حق الأولوية", "يجب التوقف", "تحذير خطر", "ممنوع المرور"],
        }
      : l === "en"
        ? {
            welcome: "Welcome back Ahmed",
            title: "Your study progress",
            ready: "Ready",
            cards: [
              { label: "Answered", value: "1,240" },
              { label: "Accuracy", value: "87%" },
              { label: "Mock exams", value: "12" },
              { label: "Study days", value: "21" },
            ],
            current: "Current question category right of way",
            qBadge: "Question 24 / 65",
            qText: "You approach an intersection there is a yellow diamond sign what does it mean",
            options: ["You have priority", "You must stop", "Danger warning", "No entry"],
          }
        : {
            welcome: "Welkom terug, Ahmed",
            title: "Jouw studievoortgang",
            ready: "Gereed",
            cards: [
              { label: "Vragen beantwoord", value: "1.240" },
              { label: "Correct percentage", value: "87%" },
              { label: "Oefenexamens", value: "12" },
              { label: "Studiedagen", value: "21" },
            ],
            current: "Huidige vraag — Categorie: Voorrang",
            qBadge: "Vraag 24 / 65",
            qText: "U nadert een kruispunt. Er staat een bord met een gele ruit. Wat betekent dit bord?",
            options: ["U heeft voorrang", "U moet stoppen", "Waarschuwing gevaar", "Geen doorgang"],
          }

  const trustBadges = [
    { icon: <ShieldCheck className="h-4 w-4 text-green-600" />, label: m.hero.trust1 },
    { icon: <Globe className="h-4 w-4 text-blue-600" />, label: m.hero.trust2 },
    { icon: <Award className="h-4 w-4 text-amber-600" />, label: m.hero.trust3 },
  ]

  const heroShot =
    l === "ar"
      ? "/marketing/dashboard-ar.svg"
      : l === "en"
        ? "/marketing/dashboard-ar.svg"
        : "/marketing/dashboard-ar.svg"

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-white/40 via-blue-50/25 to-transparent pt-24 pb-14 md:pt-28 md:pb-16"
      dir={dir}
    >
      {/* Local accents — blend with global marketing mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute -bottom-28 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-400/12 blur-3xl" />
      </div>

      <div className="container relative">
        {/* Language globe (hero) */}
        <div className="absolute right-4 top-6 z-10 sm:right-6 sm:top-8">
          <LocaleSwitcherGlobe locale={locale} label={m.language.switch} />
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Copy */}
          <motion.div
            className="lg:col-span-6"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Pill badge */}
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/90 px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              {m.hero.pill}
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            >
              {m.hero.titleA}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {m.hero.titleEmphasis}
              </span>{" "}
              {m.hero.titleB}
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {m.hero.subtitle}
            </motion.p>

            {/* Social proof strip */}
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/75 px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200/60 backdrop-blur-md transition-shadow duration-300 hover:shadow-md">
                <span className="font-extrabold">4.9</span>
                <span className="text-slate-500">/5</span>
                <span className="mx-1 h-4 w-px bg-slate-200" />
                <span className="inline-flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </span>
              </div>
              {trustBadges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/70 px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {badge.icon}
                  <span>{badge.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="xl" variant="brand" className="w-full sm:w-auto">
                <Link
                  href={`/${locale}/register`}
                  className="inline-flex items-center gap-2 transition-[gap] duration-300 group-hover:gap-3"
                >
                  {m.hero.ctaPrimary}
                  <ArrowRight className="h-5 w-5 shrink-0 rtl:rotate-180" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="glass" className="w-full sm:w-auto">
                <Link href={`#${m.hero.demoAnchor}`} className="inline-flex items-center">
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  {m.hero.ctaSecondary}
                </Link>
              </Button>
            </motion.div>

            {/* Stats bar */}
            <motion.div variants={fadeUp}>
              <StatsBar className="mt-8 max-w-xl" locale={l as any} />
            </motion.div>
          </motion.div>

          {/* Visual hook */}
          <motion.div
            className="lg:col-span-6"
            variants={visualReveal}
            initial="hidden"
            animate="show"
          >
            <div id={m.hero.demoAnchor} className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-blue-200/45 via-indigo-200/25 to-white/80 blur-2xl motion-safe:animate-mesh-drift-b [animation-duration:32s]" />
              <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <div className="mx-auto w-64 rounded-md bg-white px-3 py-1 text-center text-xs text-slate-400 shadow-inner">
                    {m.hero.dashboardUrl}
                  </div>
                </div>
                <div className="bg-white p-3 sm:p-4">
                  <Image
                    src={heroShot}
                    alt={l === "ar" ? "واجهة التطبيق" : "App preview"}
                    width={1600}
                    height={1000}
                    className="h-auto w-full rounded-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Floating mini card: example question */}
              <div className="absolute -bottom-7 left-4 right-4 hidden sm:block">
                <div className="rounded-2xl border border-white/60 bg-white/85 p-4 shadow-xl backdrop-blur-xl motion-safe:animate-float-soft">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>{l === "ar" ? "سؤال مثال" : l === "en" ? "Example question" : "Voorbeeldvraag"}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                      {dash.qBadge}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{dash.qText}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {dash.options.slice(0, 2).map((opt, i) => (
                      <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                        <span className={l === "ar" ? "ml-1.5" : "mr-1.5"}>
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
