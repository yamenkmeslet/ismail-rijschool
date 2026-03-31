import { HeroSection } from "@/components/marketing/hero-section"
import type { Locale } from "@/lib/i18n/config"
import { FeatureCard } from "@/components/marketing/feature-card"
import { TestimonialCard } from "@/components/marketing/testimonial-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Sparkles, Timer, Layers3, CheckCircle2, ArrowRight, Check, X as XIcon, Info } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingCard } from "@/components/marketing/pricing-card"

export default function LocalizedHomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale

  const copy =
    locale === "ar"
      ? {
          h2Value: "ماذا نقدم لك",
          pValue:
            "منصة نظرية هولندا مصممة لتخليك تتدرب بذكاء وتفهم السبب مو بس تحفظ الإجابات",
          valueCards: [
            {
              icon: <BookOpen className="h-6 w-6" />,
              title: "أسئلة مرئية وشروحات واضحة",
              desc: "تتدرب على نمط قريب من الامتحان مع شرح مختصر بعد كل سؤال",
            },
            {
              icon: <Timer className="h-6 w-6" />,
              title: "امتحان تجريبي مع مؤقت",
              desc: "حاكي تجربة الامتحان بالكامل وتابع نتيجتك وجاهزيتك",
            },
            {
              icon: <Layers3 className="h-6 w-6" />,
              title: "تدريب حسب القسم",
              desc: "ركز على قسم معين مثل الأولوية أو الإشارات وارجع للأقسام الضعيفة",
            },
          ],
          h2How: "كيف تعمل المنصة",
          steps: [
            { title: "اختر أسلوب التدريب", desc: "تدريب سريع أو حسب القسم أو امتحان تجريبي" },
            { title: "جاوب وتعلم", desc: "إجابات فورية مع شرح يساعدك تفهم القاعدة" },
            { title: "تابع تقدمك", desc: "لوحة تقدم ومراجعة أخطاء ومحفوظات للعودة لاحقا" },
          ],
          h2Screens: "صور وواجهة التطبيق",
          pScreens:
            "هذه معاينة شكلية للواجهة داخل التطبيق الهدف أن تكون واضحة وسريعة مع دعم كامل للعربية",
          screenCards: [
            { title: "لوحة الطالب", desc: "نظرة سريعة على الجاهزية والنتائج والأنشطة" },
            { title: "جلسة التدريب", desc: "سؤال خيارات شرح وتحديد أسئلة للمراجعة" },
            { title: "التقدم والأخطاء", desc: "تصنيف الأداء حسب الأقسام مع إعادة التدريب" },
          ],
          h2Social: "آراء الطلاب",
          ctaTitle: "ابدأ الآن واستعد للنجاح",
          ctaDesc: "جرب مجانا وابدأ التدريب مباشرة بالعربية",
          ctaBtn: "ابدأ مجانًا",
        }
      : locale === "en"
        ? {
            h2Value: "What we offer",
            pValue:
              "A Dutch theory platform built for understanding not memorizing with clear explanations and realistic practice",
            valueCards: [
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "Visual questions and explanations",
                desc: "Practice in an exam-like format with quick explanations",
              },
              {
                icon: <Timer className="h-6 w-6" />,
                title: "Mock exam with timer",
                desc: "Simulate the exam and track your readiness",
              },
              {
                icon: <Layers3 className="h-6 w-6" />,
                title: "Practice by category",
                desc: "Focus on weak areas like right of way and signs",
              },
            ],
            h2How: "How it works",
            steps: [
              { title: "Pick a mode", desc: "Quick practice, categories, or mock exam" },
              { title: "Answer and learn", desc: "Instant feedback with clear explanations" },
              { title: "Track progress", desc: "Progress dashboard, mistakes review, saved questions" },
            ],
            h2Screens: "Screens and UI",
            pScreens: "A clean fast UI built for focused study with full Arabic support",
            screenCards: [
              { title: "Student dashboard", desc: "Readiness scores and daily progress" },
              { title: "Practice session", desc: "Question options explanation and flags" },
              { title: "Progress and mistakes", desc: "Category insights and retries" },
            ],
            h2Social: "Student feedback",
            ctaTitle: "Start now and get ready",
            ctaDesc: "Try free and begin practicing right away",
            ctaBtn: "Get started",
          }
        : {
            h2Value: "Wat je krijgt",
            pValue:
              "Een moderne theorieplatform met duidelijke uitleg en realistische oefening zodat je begrijpt in plaats van gokt",
            valueCards: [
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "Visuele vragen en uitleg",
                desc: "Oefen in examenvorm met directe uitleg",
              },
              {
                icon: <Timer className="h-6 w-6" />,
                title: "Nep-examen met timer",
                desc: "Simuleer het examen en check je gereedheid",
              },
              {
                icon: <Layers3 className="h-6 w-6" />,
                title: "Oefenen per categorie",
                desc: "Focus op zwakke punten zoals voorrang en borden",
              },
            ],
            h2How: "Hoe het werkt",
            steps: [
              { title: "Kies modus", desc: "Snel oefenen, per categorie, of nep-examen" },
              { title: "Beantwoord", desc: "Direct resultaat met uitleg" },
              { title: "Volg voortgang", desc: "Dashboard, fouten, opgeslagen vragen" },
            ],
            h2Screens: "Screens en UI",
            pScreens: "Een snelle duidelijke interface ontworpen voor focus",
            screenCards: [
              { title: "Dashboard", desc: "Gereedheid en voortgang per dag" },
              { title: "Oefensessie", desc: "Vraag opties uitleg en markeren" },
              { title: "Voortgang", desc: "Inzichten per categorie en herhalen" },
            ],
            h2Social: "Wat studenten zeggen",
            ctaTitle: "Start vandaag",
            ctaDesc: "Probeer gratis en begin meteen",
            ctaBtn: "Gratis starten",
          }

  return (
    <>
      <HeroSection locale={locale} />

      {/* Example Question */}
      <section id="demo" className="relative border-b border-white/40 bg-white/55 py-14 backdrop-blur-xl">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  {locale === "ar" ? "حقيقي وواقعي" : locale === "en" ? "Realistic" : "Realistisch"}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {locale === "ar"
                    ? "سؤال مثال يشبه الامتحان"
                    : locale === "en"
                      ? "Example question that feels real"
                      : "Voorbeeldvraag zoals op het examen"}
                </h2>
                <p className="mt-4 text-slate-600">
                  {locale === "ar"
                    ? "شوف كيف تكون الأسئلة الخيارات والشرح بعد الإجابة نفس أسلوب التدريب داخل التطبيق"
                    : locale === "en"
                      ? "See the question flow options and explanation exactly like inside the app"
                      : "Bekijk de vraagflow opties en uitleg zoals in de app"}
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    locale === "ar" ? "إجابات فورية مع شرح" : locale === "en" ? "Instant feedback" : "Direct feedback",
                    locale === "ar" ? "تحديد الأسئلة للمراجعة" : locale === "en" ? "Flag for review" : "Markeren",
                    locale === "ar" ? "تدريب بسرعة أو حسب القسم" : locale === "en" ? "Quick or by category" : "Snel of per categorie",
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="font-semibold">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" variant="brand" className="w-full sm:w-auto">
                    <Link href={`/${locale}/register`}>
                      {copy.ctaBtn}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href={`/${locale}/features`}>
                      {locale === "ar" ? "اعرف أكثر" : locale === "en" ? "Learn more" : "Meer info"}
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Card className="overflow-hidden rounded-3xl border-slate-200 shadow-card">
                  <CardHeader className="border-b border-slate-200 bg-slate-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <CardTitle className="text-xl">
                          {locale === "ar" ? "ماذا تعني هذه الإشارة" : locale === "en" ? "What does this sign mean" : "Wat betekent dit bord"}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {locale === "ar"
                            ? "اختر الإجابة ثم شاهد الشرح"
                            : locale === "en"
                              ? "Pick an answer then view the explanation"
                              : "Kies een antwoord en bekijk de uitleg"}
                        </CardDescription>
                      </div>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {locale === "ar" ? "سؤال 3 من 10" : locale === "en" ? "Question 3 of 10" : "Vraag 3 van 10"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-500">
                            {locale === "ar" ? "صورة السؤال" : locale === "en" ? "Question image" : "Vraag afbeelding"}
                          </p>
                          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                            <Info className="h-3.5 w-3.5 text-slate-400" />
                            {locale === "ar" ? "مرئي" : locale === "en" ? "Visual" : "Visueel"}
                          </span>
                        </div>
                        <div className="mt-4 grid place-items-center rounded-xl border border-slate-200 bg-white p-6">
                          <div className="h-16 w-16 rounded-2xl bg-blue-600/10 ring-1 ring-blue-200" />
                          <p className="mt-3 text-xs font-semibold text-slate-500">
                            {locale === "ar" ? "مثال توضيحي" : locale === "en" ? "Illustrative sample" : "Illustratief voorbeeld"}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { key: "A", text: locale === "ar" ? "لديك حق الأولوية" : locale === "en" ? "You have priority" : "U heeft voorrang", ok: true },
                          { key: "B", text: locale === "ar" ? "يجب التوقف" : locale === "en" ? "You must stop" : "U moet stoppen", ok: false },
                          { key: "C", text: locale === "ar" ? "تحذير خطر" : locale === "en" ? "Danger warning" : "Waarschuwing gevaar", ok: false },
                          { key: "D", text: locale === "ar" ? "ممنوع المرور" : locale === "en" ? "No entry" : "Geen doorgang", ok: false },
                        ].map((o) => (
                          <div
                            key={o.key}
                            className={`rounded-2xl border p-4 transition-colors ${
                              o.ok ? "border-green-200 bg-green-50" : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-xl text-xs font-extrabold ${
                                o.ok ? "bg-green-600 text-white" : "bg-slate-900 text-white"
                              }`}>
                                {o.key}
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-900">{o.text}</p>
                                <p className="mt-1 text-xs text-slate-500">
                                  {o.ok
                                    ? locale === "ar"
                                      ? "إجابة صحيحة"
                                      : locale === "en"
                                        ? "Correct"
                                        : "Correct"
                                    : locale === "ar"
                                      ? "اضغط للاختيار"
                                      : locale === "en"
                                        ? "Tap to select"
                                        : "Klik om te kiezen"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-xs font-semibold text-slate-500">
                          {locale === "ar" ? "شرح مختصر" : locale === "en" ? "Explanation preview" : "Uitleg"}
                        </p>
                        <p className="mt-2 text-sm text-slate-700">
                          {locale === "ar"
                            ? "في التقاطع المتساوي تكون الأولوية للمركبات القادمة من اليمين"
                            : locale === "en"
                              ? "At an equal intersection traffic from the right has priority"
                              : "Op een gelijkwaardig kruispunt heeft verkeer van rechts voorrang"}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                            <Check className="h-3.5 w-3.5 text-green-600" />
                            {locale === "ar" ? "تصحيح فوري" : locale === "en" ? "Instant check" : "Direct check"}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                            <XIcon className="h-3.5 w-3.5 text-slate-400" />
                            {locale === "ar" ? "بدون تعقيد" : locale === "en" ? "No clutter" : "Geen rommel"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="relative border-b border-white/40 bg-white/45 py-14 backdrop-blur-xl">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {copy.h2Value}
            </h2>
            <p className="mt-4 text-slate-600">{copy.pValue}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {copy.valueCards.map((c, idx) => (
              <FeatureCard
                key={idx}
                icon={c.icon}
                title={c.title}
                description={c.desc}
                highlighted={idx === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="relative border-b border-white/30 bg-slate-50/65 py-14 backdrop-blur-xl">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              {locale === "ar" ? "الأسعار" : locale === "en" ? "Pricing" : "Prijzen"}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {locale === "ar"
                ? "3 باقات واضحة"
                : locale === "en"
                  ? "3 clear plans"
                  : "3 duidelijke pakketten"}
            </h2>
            <p className="mt-4 text-slate-600">
              {locale === "ar"
                ? "اختر الباقة المناسبة وابدأ التدريب مباشرة"
                : locale === "en"
                  ? "Pick the right plan and start practicing"
                  : "Kies het juiste plan en begin met oefenen"}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
            {locale === "ar" ? (
              <>
                <PricingCard
                  name="أساسي"
                  price={9.99}
                  annualPrice={7.99}
                  period="شهر"
                  description="للبداية والتدريب المنظم"
                  ctaLabel="ابدأ بالأساسي"
                  ctaHref={`/${locale}/register`}
                  features={[
                    { text: "500 سؤال تدريب", included: true },
                    { text: "3 امتحانات تجريبية شهريًا", included: true },
                    { text: "لوحة تقدم أساسية", included: true },
                    { text: "لغة واحدة", included: true },
                    { text: "امتحانات غير محدودة", included: false },
                    { text: "كل اللغات", included: false },
                  ]}
                />
                <PricingCard
                  name="قياسي"
                  price={14.99}
                  annualPrice={11.99}
                  period="شهر"
                  description="الأفضل لمعظم الطلاب"
                  ctaLabel="ابدأ بالقياسي"
                  ctaHref={`/${locale}/register`}
                  popular
                  badge="الأكثر اختيارا"
                  features={[
                    { text: "2000+ سؤال تدريب", included: true },
                    { text: "امتحانات غير محدودة", included: true },
                    { text: "تحليل تقدم متقدم", included: true },
                    { text: "كل اللغات", included: true },
                    { text: "شرح لكل سؤال", included: true },
                    { text: "خطة تدريب", included: true },
                  ]}
                />
                <PricingCard
                  name="بريميوم"
                  price={24.99}
                  annualPrice={19.99}
                  period="شهر"
                  description="كل شيء مع ميزات متقدمة"
                  ctaLabel="ابدأ بالبريميوم"
                  ctaHref={`/${locale}/register`}
                  features={[
                    { text: "2000+ سؤال تدريب", included: true },
                    { text: "امتحانات غير محدودة", included: true },
                    { text: "تحليل متقدم", included: true },
                    { text: "كل اللغات", included: true },
                    { text: "نصائح متقدمة", included: true },
                    { text: "دعم أولوية", included: true },
                  ]}
                />
              </>
            ) : locale === "en" ? (
              <>
                <PricingCard
                  name="Basic"
                  price={9.99}
                  annualPrice={7.99}
                  period="month"
                  description="A solid start to build confidence"
                  ctaLabel="Start Basic"
                  ctaHref={`/${locale}/register`}
                  features={[
                    { text: "500 practice questions", included: true },
                    { text: "3 mock exams per month", included: true },
                    { text: "Basic progress dashboard", included: true },
                    { text: "1 language", included: true },
                    { text: "Unlimited mock exams", included: false },
                    { text: "All 3 languages", included: false },
                  ]}
                />
                <PricingCard
                  name="Standard"
                  price={14.99}
                  annualPrice={11.99}
                  period="month"
                  description="Best for most students"
                  ctaLabel="Start Standard"
                  ctaHref={`/${locale}/register`}
                  popular
                  badge="Most popular"
                  features={[
                    { text: "2,000+ practice questions", included: true },
                    { text: "Unlimited mock exams", included: true },
                    { text: "Advanced progress analytics", included: true },
                    { text: "All 3 languages", included: true },
                    { text: "Explanations per question", included: true },
                    { text: "Personal study plan", included: true },
                  ]}
                />
                <PricingCard
                  name="Premium"
                  price={24.99}
                  annualPrice={19.99}
                  period="month"
                  description="Everything plus advanced insights"
                  ctaLabel="Start Premium"
                  ctaHref={`/${locale}/register`}
                  features={[
                    { text: "2,000+ practice questions", included: true },
                    { text: "Unlimited mock exams", included: true },
                    { text: "Advanced analytics", included: true },
                    { text: "All 3 languages", included: true },
                    { text: "Advanced tips", included: true },
                    { text: "Priority support", included: true },
                  ]}
                />
              </>
            ) : (
              <>
                <PricingCard
                  name="Basis"
                  price={9.99}
                  annualPrice={7.99}
                  period="maand"
                  description="Perfect om te beginnen met oefenen"
                  ctaLabel="Begin met Basis"
                  ctaHref={`/${locale}/register`}
                  features={[
                    { text: "500 oefenvragen", included: true },
                    { text: "3 oefenexamens per maand", included: true },
                    { text: "Basisvoortgangsoverzicht", included: true },
                    { text: "1 taal naar keuze", included: true },
                    { text: "Onbeperkte oefenexamens", included: false },
                    { text: "Alle 3 talen", included: false },
                  ]}
                />
                <PricingCard
                  name="Standaard"
                  price={14.99}
                  annualPrice={11.99}
                  period="maand"
                  description="Onze meest gekozen optie voor slagen"
                  ctaLabel="Begin met Standaard"
                  ctaHref={`/${locale}/register`}
                  popular
                  badge="Meest populair"
                  features={[
                    { text: "2.000+ oefenvragen", included: true },
                    { text: "Onbeperkte oefenexamens", included: true },
                    { text: "Uitgebreide voortgangsanalyse", included: true },
                    { text: "Alle 3 talen", included: true },
                    { text: "Expertuitleg per vraag", included: true },
                    { text: "Studieplan op maat", included: true },
                  ]}
                />
                <PricingCard
                  name="Premium"
                  price={24.99}
                  annualPrice={19.99}
                  period="maand"
                  description="Alles wat je nodig hebt plus meer"
                  ctaLabel="Begin met Premium"
                  ctaHref={`/${locale}/register`}
                  features={[
                    { text: "2.000+ oefenvragen", included: true },
                    { text: "Onbeperkte oefenexamens", included: true },
                    { text: "Uitgebreide voortgangsanalyse", included: true },
                    { text: "Alle 3 talen", included: true },
                    { text: "Geavanceerde tips", included: true },
                    { text: "Prioriteitsondersteuning", included: true },
                  ]}
                />
              </>
            )}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <Button asChild size="lg" variant="outline" className="bg-white">
              <Link href={`/${locale}/pricing`}>
                {locale === "ar" ? "شاهد التفاصيل" : locale === "en" ? "See full pricing" : "Bekijk alle prijzen"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-sm text-slate-500">
              {locale === "ar"
                ? "يمكنك التغيير أو الإلغاء في أي وقت"
                : locale === "en"
                  ? "Upgrade downgrade or cancel anytime"
                  : "Je kunt altijd wisselen of opzeggen"}
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden border-b border-white/35 bg-gradient-to-b from-white/50 via-slate-50/40 to-white/30 py-16 backdrop-blur-xl">
        <div className="container">
          {/* background accents — soft, mesh-aligned */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-blue-400/14 blur-3xl" />
            <div className="absolute -bottom-24 left-[-140px] h-[420px] w-[420px] rounded-full bg-indigo-400/12 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  {locale === "ar" ? "خطوات بسيطة" : locale === "en" ? "Simple steps" : "Eenvoudige stappen"}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {copy.h2How}
                </h2>
                <p className="mt-4 text-slate-600">
                  {locale === "ar"
                    ? "من أول جلسة راح تعرف مستواك وتتحسن بسرعة لأن كل خطوة مصممة تقلل التخمين وتزيد الفهم"
                    : locale === "en"
                      ? "From your first session you will know your level and improve faster because every step reduces guessing and boosts understanding"
                      : "Vanaf je eerste sessie weet je je niveau en verbeter je sneller omdat elke stap gokken vermindert en begrip verhoogt"}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" variant="brand" className="w-full sm:w-auto">
                    <Link href={`/${locale}/register`}>
                      {copy.ctaBtn}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full bg-white sm:w-auto">
                    <Link href={`/${locale}/pricing`}>
                      {locale === "ar" ? "شاهد الأسعار" : locale === "en" ? "View pricing" : "Bekijk prijzen"}
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-card overflow-hidden">
                  <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {locale === "ar"
                        ? "سير العمل داخل التطبيق"
                        : locale === "en"
                          ? "Inside the app flow"
                          : "Flow in de app"}
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="relative">
                      {/* connector */}
                      <div className="absolute inset-y-0 left-5 hidden w-px bg-gradient-to-b from-blue-200 via-indigo-200 to-slate-200 sm:block" />

                      <div className="space-y-5">
                        {copy.steps.map((s, i) => (
                          <div
                            key={i}
                            className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                          >
                            <div className="flex gap-4">
                              <div className="relative">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-brand-sm ring-4 ring-white">
                                  <span className="text-sm font-extrabold">{i + 1}</span>
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                  {i === 0 && (
                                    <>
                                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                                        {locale === "ar" ? "تدريب سريع" : locale === "en" ? "Quick practice" : "Snel oefenen"}
                                      </span>
                                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                                        {locale === "ar" ? "حسب القسم" : locale === "en" ? "By category" : "Per categorie"}
                                      </span>
                                      <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                                        {locale === "ar" ? "امتحان تجريبي" : locale === "en" ? "Mock exam" : "Nep examen"}
                                      </span>
                                    </>
                                  )}
                                  {i === 1 && (
                                    <>
                                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                                        {locale === "ar" ? "شرح واضح" : locale === "en" ? "Clear explanation" : "Duidelijke uitleg"}
                                      </span>
                                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                                        {locale === "ar" ? "تصحيح فوري" : locale === "en" ? "Instant feedback" : "Direct feedback"}
                                      </span>
                                    </>
                                  )}
                                  {i === 2 && (
                                    <>
                                      <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                                        {locale === "ar" ? "التقدم" : locale === "en" ? "Progress" : "Voortgang"}
                                      </span>
                                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-100">
                                        {locale === "ar" ? "مراجعة الأخطاء" : locale === "en" ? "Mistakes review" : "Fouten"}
                                      </span>
                                      <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                                        {locale === "ar" ? "محفوظات" : locale === "en" ? "Saved" : "Opgeslagen"}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
                      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {locale === "ar"
                              ? "جرّب خطوة واحدة الآن"
                              : locale === "en"
                                ? "Try one step now"
                                : "Probeer één stap nu"}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            {locale === "ar"
                              ? "ابدأ بجلسة تدريب سريعة وشوف الشرح مباشرة"
                              : locale === "en"
                                ? "Start a quick practice session and see explanations instantly"
                                : "Start een snelle oefensessie en zie direct uitleg"}
                          </p>
                        </div>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                          <Link href={`/${locale}/register`}>
                            {copy.ctaBtn}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="relative border-b border-white/40 bg-white/50 py-20 backdrop-blur-xl">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="sticky top-24">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                    {locale === "ar" ? "واجهة واضحة" : locale === "en" ? "Clean UI" : "Duidelijke UI"}
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {copy.h2Screens}
                  </h2>
                  <p className="mt-4 text-slate-600">{copy.pScreens}</p>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-9 w-9 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          {locale === "ar"
                            ? "متناسق مع الداشبورد"
                            : locale === "en"
                              ? "Matches the dashboard style"
                              : "Past bij de dashboard stijl"}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {locale === "ar"
                            ? "نفس المكونات نفس الألوان نفس الإيقاع البصري"
                            : locale === "en"
                              ? "Same components same colors same rhythm"
                              : "Zelfde componenten zelfde kleuren zelfde ritme"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Tabs defaultValue="dash" className="w-full">
                  <TabsList className="w-full justify-between rounded-2xl bg-slate-100 p-1">
                    <TabsTrigger value="dash" className="flex-1 rounded-xl">
                      {copy.screenCards[0].title}
                    </TabsTrigger>
                    <TabsTrigger value="session" className="flex-1 rounded-xl">
                      {copy.screenCards[1].title}
                    </TabsTrigger>
                    <TabsTrigger value="progress" className="flex-1 rounded-xl">
                      {copy.screenCards[2].title}
                    </TabsTrigger>
                  </TabsList>

                  {[
                    {
                      key: "dash",
                      src: "/marketing/dashboard-ar.svg",
                      title: copy.screenCards[0].title,
                      desc: copy.screenCards[0].desc,
                    },
                    {
                      key: "session",
                      src: "/marketing/practice-session-ar.svg",
                      title: copy.screenCards[1].title,
                      desc: copy.screenCards[1].desc,
                    },
                    {
                      key: "progress",
                      src: "/marketing/progress-ar.svg",
                      title: copy.screenCards[2].title,
                      desc: copy.screenCards[2].desc,
                    },
                  ].map((s, idx) => (
                    <TabsContent key={s.key} value={s.key} className="mt-6">
                      <div className="rounded-3xl border border-slate-200 bg-white shadow-card overflow-hidden">
                        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                          <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                          <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-b from-white to-slate-50">
                          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <Image
                              src={s.src}
                              alt={s.title}
                              width={1600}
                              height={1000}
                              className="h-auto w-full"
                              priority={idx === 0}
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative border-b border-white/30 bg-slate-50/70 py-16 backdrop-blur-xl">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{copy.h2Social}</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {locale === "ar" ? (
              <>
                <TestimonialCard name="سارة" initials="س" flag="🇸🇦" nationality="Saudi" rating={5} quote="الشرح واضح والواجهة مرتبة قدرت أركز على الأقسام الضعيفة" />
                <TestimonialCard name="محمد" initials="م" flag="🇳🇱" nationality="Dutch" rating={5} quote="الامتحان التجريبي مع المؤقت ساعدني أعرف مستواي قبل الامتحان" />
                <TestimonialCard name="ليلى" initials="ل" flag="🇪🇬" nationality="Egypt" rating={5} quote="ميزة مراجعة الأخطاء ممتازة كل مرة أرجع لنفس الأخطاء وأصلحها" />
              </>
            ) : locale === "en" ? (
              <>
                <TestimonialCard name="Sara" initials="S" flag="🇬🇧" nationality="English" rating={5} quote="Clean UI and the explanations actually help you understand" />
                <TestimonialCard name="Ahmed" initials="A" flag="🇳🇱" nationality="Dutch" rating={5} quote="The mock exam timer feels realistic and keeps you focused" />
                <TestimonialCard name="Lina" initials="L" flag="🇸🇦" nationality="Arabic" rating={5} quote="Mistakes review is the fastest way to improve" />
              </>
            ) : (
              <>
                <TestimonialCard name="Sanne" initials="S" flag="🇳🇱" nationality="Dutch" rating={5} quote="Duidelijke uitleg en super snelle interface" />
                <TestimonialCard name="Youssef" initials="Y" flag="🇳🇱" nationality="Dutch" rating={5} quote="Het nep-examen met timer is heel realistisch" />
                <TestimonialCard name="Maya" initials="M" flag="🇬🇧" nationality="English" rating={5} quote="I love the category practice for weak areas" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-glow-lg sm:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{copy.ctaTitle}</h2>
            <p className="mt-4 text-white/80">{copy.ctaDesc}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" variant="brand" className="w-full sm:w-auto">
                <Link href={`/${locale}/register`}>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  {copy.ctaBtn}
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 sm:w-auto">
                <Link href={`/${locale}/features`}>
                  <Sparkles className="mr-2 h-5 w-5" />
                  {locale === "ar" ? "شاهد الميزات" : locale === "en" ? "Explore features" : "Bekijk functies"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

