"use client"

import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import {
  TrendingUp,
  Target,
  Award,
  Flame,
  Zap,
  ClipboardCheck,
  XCircle,
  Grid3x3,
  ArrowRight,
  BarChart3,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import StatsCard from "@/components/student/stats-card"

export default function LocalizedDashboardPage({ params }: { params: { locale: Locale } }) {
  const t =
    params.locale === "ar"
      ? {
          hello: "مرحبا",
          quick: "تدريب سريع",
          streak: "سلسلة 7 أيام",
          answered: "أسئلة مجابة",
          accuracy: "الدقة",
          readiness: "جاهزية الامتحان",
          progress: "التقدم",
          actions: "إجراءات سريعة",
          practiceByCat: "تدريب حسب القسم",
          exam: "امتحان تجريبي",
          wrong: "مراجعة الأخطاء",
          saved: "المحفوظات",
          focus: "نقاط تحتاج تركيز",
          practice: "تدريب",
          continueTitle: "أكمل التدريب",
          continueBtn: "متابعة",
        }
      : params.locale === "en"
        ? {
            hello: "Welcome",
            quick: "Quick practice",
            streak: "7 day streak",
            answered: "Answered",
            accuracy: "Accuracy",
            readiness: "Exam readiness",
            progress: "Progress",
            actions: "Quick actions",
            practiceByCat: "Practice by category",
            exam: "Mock exam",
            wrong: "Review mistakes",
            saved: "Saved",
            focus: "Weak areas",
            practice: "Practice",
            continueTitle: "Continue learning",
            continueBtn: "Continue",
          }
        : {
            hello: "Welkom",
            quick: "Snel oefenen",
            streak: "7 dagen streak",
            answered: "Vragen beantwoord",
            accuracy: "Nauwkeurigheid",
            readiness: "Examengereedheid",
            progress: "Voortgang",
            actions: "Snelle acties",
            practiceByCat: "Per categorie",
            exam: "Nep examen",
            wrong: "Fouten herhalen",
            saved: "Opgeslagen",
            focus: "Zwakke punten",
            practice: "Oefen",
            continueTitle: "Verder leren",
            continueBtn: "Ga verder",
          }

  const localePrefix = `/${params.locale}`

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8" dir={params.locale === "ar" ? "rtl" : "ltr"}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {t.hello}{" "}
            {params.locale === "ar" ? "يا Jan" : "Jan"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">{params.locale === "ar" ? "جاهز للتدريب اليوم" : params.locale === "en" ? "Ready to practice today" : "Klaar om te oefenen vandaag"}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50 gap-1.5 text-sm px-3 py-1.5">
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            {t.streak}
          </Badge>
          <Link href={`${localePrefix}/practice`}>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Zap className="h-4 w-4" />
              {t.quick}
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={TrendingUp} title={t.answered} value={params.locale === "ar" ? "1847" : "1,847"} description={params.locale === "ar" ? "الإجمالي" : params.locale === "en" ? "Total" : "Totaal"} />
        <StatsCard icon={Target} title={t.accuracy} value="74%" description={params.locale === "ar" ? "معدل صحيح" : params.locale === "en" ? "Average correct" : "Gemiddeld correct"} />
        <StatsCard icon={Award} title={t.readiness} value="73%" description={params.locale === "ar" ? "مستوى الجاهزية" : params.locale === "en" ? "Readiness" : "Gereed"} />
        <StatsCard icon={BarChart3} title={t.progress} value={params.locale === "ar" ? "تصاعدي" : params.locale === "en" ? "Upward" : "Stijgend"} description={params.locale === "ar" ? "آخر 30 يوم" : params.locale === "en" ? "Last 30 days" : "Laatste 30 dagen"} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">{t.continueTitle}</h2>
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-900">{params.locale === "ar" ? "قسم الأولوية" : params.locale === "en" ? "Right of way" : "Voorrang"}</p>
            <p className="text-xs text-gray-500">{params.locale === "ar" ? "استكمل من حيث توقفت" : params.locale === "en" ? "Pick up where you left off" : "Ga verder waar je stopte"}</p>
            <Progress value={40} className="h-1.5" />
          </div>
          <Link href={`${localePrefix}/categories/voorrang`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
              {t.continueBtn}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">{t.actions}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: t.quick, href: `${localePrefix}/practice`, icon: Zap, color: "from-blue-500 to-blue-600" },
              { label: t.exam, href: `${localePrefix}/exam`, icon: ClipboardCheck, color: "from-indigo-500 to-indigo-600" },
              { label: t.wrong, href: `${localePrefix}/wrong-answers`, icon: XCircle, color: "from-orange-500 to-orange-600" },
              { label: t.practiceByCat, href: `${localePrefix}/categories`, icon: Grid3x3, color: "from-violet-500 to-violet-600" },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="block">
                <div className={`rounded-xl bg-gradient-to-br ${a.color} p-5 text-white hover:shadow-lg transition-shadow`}>
                  <a.icon className="h-7 w-7 mb-3 opacity-90" />
                  <p className="font-semibold text-sm">{a.label}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Link href={`${localePrefix}/saved`} className="block">
              <div className="rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow bg-white">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-gray-700" />
                  <p className="font-semibold text-gray-900 text-sm">{t.saved}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">{params.locale === "ar" ? "راجع الأسئلة المحفوظة" : params.locale === "en" ? "Review saved questions" : "Bekijk opgeslagen vragen"}</p>
              </div>
            </Link>
            <Link href={`${localePrefix}/progress`} className="block">
              <div className="rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow bg-white">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-gray-700" />
                  <p className="font-semibold text-gray-900 text-sm">{t.progress}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">{params.locale === "ar" ? "تفاصيل الأداء حسب الأقسام" : params.locale === "en" ? "Detailed analytics by category" : "Details per categorie"}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900">{t.focus}</h2>
        <p className="text-sm text-gray-500 mt-1">{params.locale === "ar" ? "ابدأ بهذه الأقسام لتحسين نتيجتك" : params.locale === "en" ? "Start here to improve faster" : "Start hier om sneller te verbeteren"}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { slug: "voorrang", label: params.locale === "ar" ? "الأولوية" : params.locale === "en" ? "Right of way" : "Voorrang" },
            { slug: "gevaarherkenning", label: params.locale === "ar" ? "إدراك المخاطر" : params.locale === "en" ? "Hazard perception" : "Gevaarherkenning" },
          ].map((c) => (
            <Link key={c.slug} href={`${localePrefix}/categories/${c.slug}`}>
              <Button variant="outline" className="gap-2">
                {c.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

