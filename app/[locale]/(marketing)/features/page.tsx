import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import {
  Brain,
  ClipboardCheck,
  Image as ImageIcon,
  BarChart3,
  Languages,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/marketing/feature-card"

type FeatureBlock = {
  id: string
  icon: React.ReactNode
  tag: string
  tagColor: string
  title: string
  description: string
  bullets: string[]
  imageGradient: string
  imageContent: React.ReactNode
  reverse?: boolean
}

function getCopy(locale: Locale) {
  if (locale === "ar") {
    return {
      topTag: "الميزات",
      heroTitleA: "كل ما تحتاجه",
      heroTitleEmphasis: "لتنجح",
      heroTitleB: "في اختبار النظري",
      heroSub:
        "ميزات مصممة لتخليك تتدرب بذكاء وتفهم السبب مع مؤقت وشرح ومراجعة للأخطاء",
      heroCta: "ابدأ التدريب مجانًا",
      overview: "نظرة سريعة على الميزات",
      ctaTitle: "جاهز تبدأ",
      ctaSub: "جرّب كل الميزات مجانًا وابدأ اليوم",
      ctaBtn: "ابدأ الآن",
      blocks: {
        smart: {
          tag: "تدريب ذكي",
          title: "نظام يتعلم من إجاباتك",
          desc:
            "المنصة تتابع أداءك وتعيد الأسئلة اللي تغلط فيها أكثر وتخفف الأسئلة اللي أتقنتها عشان تستفيد من وقتك",
          bullets: [
            "تحديد نقاط الضعف تلقائيًا",
            "تغيير تكرار الأسئلة حسب مستواك",
            "عرض التقدم حسب القسم",
            "خطة تدريب تساعدك تركز على الأهم",
          ],
          mockTitle: "مخطط تدريب ذكي",
          focus: "ركز على إدراك المخاطر هذا أضعف قسم عندك",
          cats: [
            { cat: "قواعد المرور", pct: 88, color: "bg-green-400" },
            { cat: "الأولوية", pct: 62, color: "bg-amber-400" },
            { cat: "إدراك المخاطر", pct: 45, color: "bg-red-400" },
            { cat: "إشارات المرور", pct: 79, color: "bg-blue-300" },
          ],
        },
        exam: {
          tag: "امتحان تجريبي",
          title: "تجربة امتحان واقعية",
          desc:
            "امتحان تجريبي مع مؤقت ونفس أسلوب الامتحان عشان تدخل يوم الاختبار وأنت واثق",
          bullets: [
            "نمط قريب من الامتحان الحقيقي",
            "مؤقت أثناء الاختبار",
            "نتيجة مباشرة بعد الانتهاء",
            "تحليل أخطاء واضح",
          ],
          mockTitle: "امتحان تجريبي",
          qMeta: "سؤال 38 من 65",
          qText: "ماذا تفعل إذا لاحظت أن مسار الطوارئ مغلق",
          opts: ["تتابع السير", "تتصل 112", "تشغل أضواء الطوارئ", "تستخدم المنبه"],
          stats: [
            { label: "صحيح", value: "37" },
            { label: "خطأ", value: "1" },
            { label: "متبقي", value: "27" },
          ],
        },
        visual: {
          tag: "أسئلة مرئية",
          title: "شوف اللي تتعلمه",
          desc:
            "الامتحان مليان صور ومواقف. عندنا أسئلة مرئية تساعدك تتعود على شكل الامتحان",
          bullets: [
            "مواقف واقعية بشكل صور",
            "فيديوهات إدراك المخاطر",
            "أسئلة مواقف تفاعلية",
            "تغطية الأقسام المرئية المهمة",
          ],
          mockTitle: "سؤال مرئي",
          mockHint: "صورة تقاطع مع موقف أولوية",
          qText: "أي مركبة لها حق الأولوية في هذا التقاطع",
          opts: ["مركبة من اليسار", "مركبة من اليمين ✓", "مركبتك", "دراجة"],
        },
        progress: {
          tag: "التقدم",
          title: "اعرف مستواك بدقة",
          desc:
            "كل إجابة تسجل في لوحة التحكم. تابع الأداء حسب القسم وشوف التحسن بمرور الوقت",
          bullets: [
            "أداء حسب القسم",
            "مؤشرات تحسن أسبوعية",
            "معرفة الأقسام الضعيفة بسرعة",
            "تتبع وقت التدريب",
          ],
          mockTitle: "إحصاءاتي",
          mockSub: "آخر 30 يوم",
          stats: [
            { icon: <Target className="h-4 w-4" />, value: "87%", label: "الدقة" },
            { icon: <TrendingUp className="h-4 w-4" />, value: "+12%", label: "تحسن" },
            { icon: <Clock className="h-4 w-4" />, value: "24س", label: "وقت تدريب" },
            { icon: <Sparkles className="h-4 w-4" />, value: "1240", label: "أسئلة" },
          ],
          days: ["س", "ن", "ث", "ر", "خ", "ج", "س"],
        },
        lang: {
          tag: "لغات",
          title: "تدرب بلغتك",
          desc:
            "واجهة كاملة بالعربية والهولندية والإنجليزية مع دعم RTL للعربية عشان يكون التدريب أسهل",
          bullets: [
            "واجهة كاملة بثلاث لغات",
            "تبديل اللغة بسهولة",
            "ترجمة احترافية للنصوص",
            "دعم RTL للعربية",
          ],
          mockTitle: "اختيار اللغة",
          langs: [
            { flag: "🇳🇱", lang: "Nederlands", sublabel: "الافتراضي", active: true },
            { flag: "🇬🇧", lang: "English", sublabel: "متاح", active: false },
            { flag: "🇸🇦", lang: "العربية", sublabel: "متاح", active: false },
          ],
        },
        explain: {
          tag: "شرح",
          title: "افهم لماذا",
          desc:
            "مع كل سؤال تشوف شرح واضح يوضح القاعدة عشان ما تحفظ إجابات بشكل عشوائي",
          bullets: [
            "شرح مع الإجابة الصحيحة والخاطئة",
            "تبسيط القاعدة بشكل واضح",
            "نصائح تساعدك تتذكر",
            "متاح بكل اللغات",
          ],
          mockTitle: "شرح الإجابة",
          wrong: "إجابتك كانت خاطئة",
          correct: "الإجابة الصحيحة",
          law: "مصدر القاعدة",
          lawText: "قواعد المرور مثال توضيحي",
        },
      },
      tryFree: "جرّب مجانًا",
    }
  }

  if (locale === "en") {
    return {
      topTag: "Features",
      heroTitleA: "Everything you need to",
      heroTitleEmphasis: "pass",
      heroTitleB: "the Dutch theory exam",
      heroSub:
        "Premium features built to help you practice smarter with explanations timer and mistake review",
      heroCta: "Start free practice",
      overview: "Feature overview",
      ctaTitle: "Ready to start",
      ctaSub: "Try all features free and begin today",
      ctaBtn: "Get started",
      blocks: {
        smart: {
          tag: "Smart practice",
          title: "A system that adapts to you",
          desc:
            "The app learns from every answer. Missed questions come back more often and mastered topics show up less so you use your time well",
          bullets: [
            "Detect weak areas automatically",
            "Adjust repetition dynamically",
            "Progress by category",
            "Focus suggestions based on performance",
          ],
          mockTitle: "Smart study plan",
          focus: "Focus on hazard perception this is your weakest category",
          cats: [
            { cat: "Traffic rules", pct: 88, color: "bg-green-400" },
            { cat: "Right of way", pct: 62, color: "bg-amber-400" },
            { cat: "Hazard perception", pct: 45, color: "bg-red-400" },
            { cat: "Traffic signs", pct: 79, color: "bg-blue-300" },
          ],
        },
        exam: {
          tag: "Mock exams",
          title: "A realistic exam experience",
          desc:
            "Full mock exams with a timer and exam-like flow so you feel confident on test day",
          bullets: [
            "Exam-style format",
            "Timer during the exam",
            "Instant results",
            "Clear mistake analysis",
          ],
          mockTitle: "Mock exam",
          qMeta: "Question 38 of 65",
          qText: "What should you do if the emergency lane is blocked",
          opts: ["Continue", "Call 112", "Use hazard lights", "Use horn"],
          stats: [
            { label: "Correct", value: "37" },
            { label: "Wrong", value: "1" },
            { label: "Left", value: "27" },
          ],
        },
        visual: {
          tag: "Visual questions",
          title: "See what you learn",
          desc:
            "The exam includes many images and scenarios. Practice with visual questions so you know what to expect",
          bullets: [
            "Realistic image scenarios",
            "Hazard perception videos",
            "Interactive situational questions",
            "Covers visual exam topics",
          ],
          mockTitle: "Visual question",
          mockHint: "Image intersection priority situation",
          qText: "Which vehicle has priority at this intersection",
          opts: ["Car from left", "Car from right ✓", "Your car", "Bike"],
        },
        progress: {
          tag: "Progress",
          title: "Know exactly where you stand",
          desc:
            "Every answer is tracked in your dashboard. See performance by category and improvements over time",
          bullets: [
            "Category overview",
            "Weekly improvement indicators",
            "Spot weak areas fast",
            "Track study time",
          ],
          mockTitle: "My stats",
          mockSub: "Last 30 days",
          stats: [
            { icon: <Target className="h-4 w-4" />, value: "87%", label: "Accuracy" },
            { icon: <TrendingUp className="h-4 w-4" />, value: "+12%", label: "Improvement" },
            { icon: <Clock className="h-4 w-4" />, value: "24h", label: "Study time" },
            { icon: <Sparkles className="h-4 w-4" />, value: "1,240", label: "Questions" },
          ],
          days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        lang: {
          tag: "Languages",
          title: "Study in your language",
          desc:
            "Full interface in Dutch English and Arabic with RTL support so you can focus on learning",
          bullets: [
            "Full interface in 3 languages",
            "Switch anytime",
            "Professionally translated content",
            "RTL support for Arabic",
          ],
          mockTitle: "Choose language",
          langs: [
            { flag: "🇳🇱", lang: "Nederlands", sublabel: "Default", active: true },
            { flag: "🇬🇧", lang: "English", sublabel: "Available", active: false },
            { flag: "🇸🇦", lang: "العربية", sublabel: "Available", active: false },
          ],
        },
        explain: {
          tag: "Explanations",
          title: "Understand the why",
          desc:
            "Every answer includes a clear explanation so you learn the rule not just the option",
          bullets: [
            "Explanation for right and wrong answers",
            "Rule-based clarity",
            "Memory tips",
            "Available in all languages",
          ],
          mockTitle: "Answer explanation",
          wrong: "Your answer was incorrect",
          correct: "Correct answer",
          law: "Rule reference",
          lawText: "Traffic rule example reference",
        },
      },
      tryFree: "Try free",
    }
  }

  // nl (existing copy)
  return {
    topTag: "Functies",
    heroTitleA: "Alles wat je nodig hebt om te",
    heroTitleEmphasis: "slagen",
    heroTitleB: "voor je rijtheorie",
    heroSub:
      "Zes krachtige functies die samenwerken om jou zo snel en effectief mogelijk voor te bereiden op het CBR rijtheorie-examen",
    heroCta: "Gratis uitproberen",
    overview: "Overzicht",
    ctaTitle: "Klaar om te beginnen",
    ctaSub: "Probeer alle functies gratis en start vandaag",
    ctaBtn: "Start gratis",
    blocks: {
      smart: {
        tag: "Slim oefenen",
        title: "Een systeem dat meedenkt",
        desc:
          "Ons adaptieve algoritme analyseert elk antwoord. Vragen die je mist komen vaker terug en vragen die je beheerst worden minder getoond zodat je tijd optimaal wordt gebruikt",
        bullets: [
          "Detecteert zwakke punten automatisch",
          "Past vraagfrequentie dynamisch aan",
          "Toont progressie per categorie",
          "Geeft focus suggesties",
        ],
        mockTitle: "Slimme studieplanner",
        focus: "Focus op Gevaarherkenning dit is je zwakste categorie",
        cats: [
          { cat: "Verkeersregels", pct: 88, color: "bg-green-400" },
          { cat: "Voorrang", pct: 62, color: "bg-amber-400" },
          { cat: "Gevaarherkenning", pct: 45, color: "bg-red-400" },
          { cat: "Verkeersborden", pct: 79, color: "bg-blue-300" },
        ],
      },
      exam: {
        tag: "Oefenexamens",
        title: "Realistische examenervaring",
        desc:
          "Onze oefenexamens bootsen het examen na met timer en score zodat je op examendag geen verrassingen hebt",
        bullets: [
          "Examenvorm en format",
          "Timer tijdens examen",
          "Directe beoordeling",
          "Foutanalyse",
        ],
        mockTitle: "Oefenexamen",
        qMeta: "Vraag 38 van 65",
        qText: "Wat moet u doen als u een vluchtstrook ziet blokkeren",
        opts: ["Doorrijden", "Bel 112", "Noodlichten", "Claxon"],
        stats: [
          { label: "Correct", value: "37" },
          { label: "Fout", value: "1" },
          { label: "Over", value: "27" },
        ],
      },
      visual: {
        tag: "Visuele vragen",
        title: "Zie wat je leert",
        desc:
          "Het examen is vol afbeeldingen en situaties. Oefen met visuele vragen zodat je weet wat je kunt verwachten",
        bullets: [
          "Realistische situaties als afbeelding",
          "Gevaarherkenningsvideo's",
          "Interactieve vragen",
          "Beeldcategorieën gedekt",
        ],
        mockTitle: "Visuele vraag",
        mockHint: "Afbeelding kruispunt met voorrang",
        qText: "Welke auto heeft voorrang op dit kruispunt",
        opts: ["Auto van links", "Auto van rechts ✓", "Uw auto", "Fiets"],
      },
      progress: {
        tag: "Voortgang",
        title: "Weet precies hoe je ervoor staat",
        desc:
          "Elk antwoord wordt bijgehouden. Zie per categorie hoe je presteert en waar je nog aandacht aan moet besteden",
        bullets: [
          "Overzicht per categorie",
          "Trend weergave",
          "Zwakke punten ontdekken",
          "Studietijdregistratie",
        ],
        mockTitle: "Mijn statistieken",
        mockSub: "Afgelopen 30 dagen",
        stats: [
          { icon: <Target className="h-4 w-4" />, value: "87%", label: "Nauwkeurigheid" },
          { icon: <TrendingUp className="h-4 w-4" />, value: "+12%", label: "Verbetering" },
          { icon: <Clock className="h-4 w-4" />, value: "24u", label: "Studietijd" },
          { icon: <Sparkles className="h-4 w-4" />, value: "1.240", label: "Vragen" },
        ],
        days: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
      },
      lang: {
        tag: "Meertalig",
        title: "Studeer in jouw taal",
        desc:
          "Volledige interface in Nederlands Engels en Arabisch met RTL ondersteuning zodat je makkelijker kunt oefenen",
        bullets: [
          "Volledige interface in 3 talen",
          "Wisselbaar tijdens sessie",
          "Professioneel vertaald",
          "RTL ondersteuning",
        ],
        mockTitle: "Taal kiezen",
        langs: [
          { flag: "🇳🇱", lang: "Nederlands", sublabel: "Standaard", active: true },
          { flag: "🇬🇧", lang: "English", sublabel: "Available", active: false },
          { flag: "🇸🇦", lang: "العربية", sublabel: "متاح", active: false },
        ],
      },
      explain: {
        tag: "Uitleg",
        title: "Begrijp waarom",
        desc:
          "Bij elk antwoord krijg je een heldere uitleg zodat je de regel begrijpt en niet alleen het antwoord onthoudt",
        bullets: [
          "Uitleg bij goed en fout",
          "Regelgericht",
          "Leestips",
          "Beschikbaar in 3 talen",
        ],
        mockTitle: "Uitleg bij antwoord",
        wrong: "Jouw antwoord was onjuist",
        correct: "Correct antwoord",
        law: "Regel referentie",
        lawText: "RVV voorbeeld verwijzing",
      },
    },
    tryFree: "Probeer gratis",
  }
}

function getFeatureBlocks(locale: Locale): FeatureBlock[] {
  const c = getCopy(locale)
  const isAr = locale === "ar"

  return [
    {
      id: "smart-practice",
      icon: <Brain className="h-8 w-8" />,
      tag: c.blocks.smart.tag,
      tagColor: "bg-blue-100 text-blue-700",
      title: c.blocks.smart.title,
      description: c.blocks.smart.desc,
      bullets: c.blocks.smart.bullets,
      imageGradient: "from-blue-600 to-indigo-700",
      imageContent: (
        <div className="p-8 text-white" dir={isAr ? "rtl" : "ltr"}>
          <h3 className="mb-6 text-xl font-bold">{c.blocks.smart.mockTitle}</h3>
          <div className="space-y-3">
            {c.blocks.smart.cats.map((item: any) => (
              <div key={item.cat}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-blue-100">{item.cat}</span>
                  <span className="font-semibold">{item.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/20">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl bg-white/10 p-3 text-sm text-blue-100">
            💡 <strong className="text-white">{c.blocks.smart.focus}</strong>
          </p>
        </div>
      ),
      reverse: false,
    },
    {
      id: "mock-exams",
      icon: <ClipboardCheck className="h-8 w-8" />,
      tag: c.blocks.exam.tag,
      tagColor: "bg-green-100 text-green-700",
      title: c.blocks.exam.title,
      description: c.blocks.exam.desc,
      bullets: c.blocks.exam.bullets,
      imageGradient: "from-green-600 to-teal-700",
      imageContent: (
        <div className="p-8 text-white" dir={isAr ? "rtl" : "ltr"}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">{c.blocks.exam.mockTitle}</h3>
            <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm">
              <Clock className="h-3.5 w-3.5" />
              <span>18:42</span>
            </div>
          </div>
          <div className="mb-6 rounded-xl bg-white/10 p-4 text-sm">
            <p className="mb-1 text-green-200">{c.blocks.exam.qMeta}</p>
            <p className="font-medium text-white">{c.blocks.exam.qText}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {c.blocks.exam.opts.map((opt: string, i: number) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 ${
                  i === 1 ? "bg-green-500/70 font-medium text-white" : "bg-white/10 text-green-100"
                }`}
              >
                <span className={isAr ? "ml-1 font-bold" : "mr-1 font-bold"}>{String.fromCharCode(65 + i)}.</span>
                {opt}
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
            {c.blocks.exam.stats.map((s: any) => (
              <div key={s.label} className="rounded-xl bg-white/10 p-3">
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-green-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      reverse: true,
    },
    {
      id: "visual-questions",
      icon: <ImageIcon className="h-8 w-8" />,
      tag: c.blocks.visual.tag,
      tagColor: "bg-purple-100 text-purple-700",
      title: c.blocks.visual.title,
      description: c.blocks.visual.desc,
      bullets: c.blocks.visual.bullets,
      imageGradient: "from-purple-600 to-pink-700",
      imageContent: (
        <div className="p-8 text-white" dir={isAr ? "rtl" : "ltr"}>
          <h3 className="mb-4 text-xl font-bold">{c.blocks.visual.mockTitle}</h3>
          <div className="mb-4 rounded-xl bg-white/10 p-6 text-center">
            <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-white/20">
              <ImageIcon className="h-12 w-12 text-purple-200" />
            </div>
            <p className="text-sm text-purple-200">{c.blocks.visual.mockHint}</p>
          </div>
          <p className="mb-3 text-sm text-purple-100">{c.blocks.visual.qText}</p>
          <div className="space-y-2 text-sm">
            {c.blocks.visual.opts.map((opt: string, i: number) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 ${
                  i === 1 ? "bg-green-500/70 font-semibold text-white" : "bg-white/10 text-purple-100"
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      ),
      reverse: false,
    },
    {
      id: "progress-tracking",
      icon: <BarChart3 className="h-8 w-8" />,
      tag: c.blocks.progress.tag,
      tagColor: "bg-amber-100 text-amber-700",
      title: c.blocks.progress.title,
      description: c.blocks.progress.desc,
      bullets: c.blocks.progress.bullets,
      imageGradient: "from-amber-500 to-orange-600",
      imageContent: (
        <div className="p-8 text-white" dir={isAr ? "rtl" : "ltr"}>
          <h3 className="mb-2 text-xl font-bold">{c.blocks.progress.mockTitle}</h3>
          <p className="mb-6 text-sm text-amber-200">{c.blocks.progress.mockSub}</p>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {c.blocks.progress.stats.map((s: any) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                <div className="text-amber-300">{s.icon}</div>
                <div>
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-xs text-amber-200">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex h-16 items-end gap-1">
            {[40, 60, 45, 75, 65, 85, 90].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-white/30" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-xs text-amber-300">
            {c.blocks.progress.days.map((d: string) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      ),
      reverse: true,
    },
    {
      id: "multilingual",
      icon: <Languages className="h-8 w-8" />,
      tag: c.blocks.lang.tag,
      tagColor: "bg-indigo-100 text-indigo-700",
      title: c.blocks.lang.title,
      description: c.blocks.lang.desc,
      bullets: c.blocks.lang.bullets,
      imageGradient: "from-indigo-600 to-blue-700",
      imageContent: (
        <div className="p-8 text-white" dir={isAr ? "rtl" : "ltr"}>
          <h3 className="mb-6 text-xl font-bold">{c.blocks.lang.mockTitle}</h3>
          <div className="space-y-3">
            {c.blocks.lang.langs.map((x: any) => (
              <div
                key={x.lang}
                className={`flex items-center gap-4 rounded-xl p-4 ${
                  x.active ? "bg-white/25 ring-2 ring-white/40" : "bg-white/10"
                }`}
              >
                <span className="text-3xl">{x.flag}</span>
                <div>
                  <p className="font-semibold text-white">{x.lang}</p>
                  <p className="text-sm text-indigo-200">{x.sublabel}</p>
                </div>
                {x.active && <CheckCircle2 className={isAr ? "mr-auto h-5 w-5 text-white" : "ml-auto h-5 w-5 text-white"} />}
              </div>
            ))}
          </div>
        </div>
      ),
      reverse: false,
    },
    {
      id: "expert-explanations",
      icon: <BookOpen className="h-8 w-8" />,
      tag: c.blocks.explain.tag,
      tagColor: "bg-teal-100 text-teal-700",
      title: c.blocks.explain.title,
      description: c.blocks.explain.desc,
      bullets: c.blocks.explain.bullets,
      imageGradient: "from-teal-600 to-cyan-700",
      imageContent: (
        <div className="p-8 text-white" dir={isAr ? "rtl" : "ltr"}>
          <h3 className="mb-4 text-xl font-bold">{c.blocks.explain.mockTitle}</h3>
          <div className="mb-4 rounded-xl bg-red-500/30 p-4 text-sm">
            <p className="mb-1 font-semibold text-red-200">✗ {c.blocks.explain.wrong}</p>
            <p className="text-red-100">{locale === "ar" ? "هذه ليست الإجابة الصحيحة" : locale === "en" ? "That was not correct" : "Dit was onjuist"}</p>
          </div>
          <div className="mb-4 rounded-xl bg-green-500/30 p-4 text-sm">
            <p className="mb-1 font-semibold text-green-200">✓ {c.blocks.explain.correct}</p>
            <p className="text-green-100">
              {locale === "ar"
                ? "خفف السرعة واستعد للتوقف إذا لزم"
                : locale === "en"
                  ? "Adjust your speed and be ready to stop"
                  : "Pas je snelheid aan en wees klaar om te stoppen"}
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-4 text-sm text-teal-100">
            <p className="mb-1 font-semibold text-white">📖 {c.blocks.explain.law}</p>
            <p>{c.blocks.explain.lawText}</p>
          </div>
        </div>
      ),
      reverse: true,
    },
  ]
}

export default function LocalizedFeaturesPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale
  const c = getCopy(locale)
  const featureBlocks = getFeatureBlocks(locale)
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <div dir={dir}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pb-16 pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-20 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-100/50 blur-3xl" />
        </div>

        <div className="container relative text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            {c.topTag}
          </span>
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            {c.heroTitleA}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {c.heroTitleEmphasis}
            </span>{" "}
            {c.heroTitleB}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">{c.heroSub}</p>
          <Button asChild variant="brand" size="xl">
            <Link href={`/${locale}/register`}>
              {c.heroCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature overview cards */}
      <section className="bg-white py-14">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{c.overview}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureBlocks.map((fb, i) => (
              <FeatureCard key={i} icon={fb.icon} title={fb.title} description={fb.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed feature blocks */}
      {featureBlocks.map((fb, i) => (
        <section key={fb.id} id={fb.id} className={i % 2 === 0 ? "bg-slate-50 py-20" : "bg-white py-20"}>
          <div className="container">
            <div className={`flex flex-col items-center gap-10 lg:flex-row ${fb.reverse ? "lg:flex-row-reverse" : ""}`}>
              <div className="flex-1">
                <span className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${fb.tagColor}`}>
                  <span className="scale-75">{fb.icon}</span>
                  {fb.tag}
                </span>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{fb.title}</h2>
                <p className="mb-8 text-lg leading-relaxed text-slate-600">{fb.description}</p>
                <ul className="mb-8 space-y-3">
                  {fb.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <span className="text-slate-700">{b}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="brand">
                  <Link href={`/${locale}/register`}>
                    {c.tryFree}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="w-full flex-1 lg:max-w-lg">
                <div className={`overflow-hidden rounded-2xl bg-gradient-to-br ${fb.imageGradient} shadow-2xl`}>
                  {fb.imageContent}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800" aria-hidden="true" />
        <div className="container relative text-center">
          <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl">{c.ctaTitle}</h2>
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

