import type { Locale } from "@/lib/i18n/config"

type Messages = {
  nav: {
    features: string
    pricing: string
    faq: string
    login: string
    register: string
  }
  hero: {
    pill: string
    titleA: string
    titleEmphasis: string
    titleB: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    demoAnchor: string
    trust1: string
    trust2: string
    trust3: string
    dashboardUrl: string
  }
  language: {
    switch: string
  }
  auth: {
    loginTitle: string
    loginSubtitle: string
    loginEmail: string
    loginPassword: string
    loginRemember: string
    loginForgot: string
    loginSubmit: string
    loginAlt: string
    loginAltLoading: string
    loginOr: string
    loginNoAccount: string
    loginCreate: string
    loginDemoButton: string
    loginDemoHint: string
    loginMissingFields: string
  }
  student: {
    home: string
    logOut: string
    dashboard: string
    practice: string
    categories: string
    exam: string
    wrongAnswers: string
    saved: string
    progress: string
    settings: string
    searchQuestions: string
    notifications: string
    newLabel: string
    upgradeTitle: string
    upgradeSub: string
    upgradeBtn: string
    freePlan: string
  }
}

const nl: Messages = {
  nav: {
    features: "Functies",
    pricing: "Prijzen",
    faq: "FAQ",
    login: "Inloggen",
    register: "Gratis starten",
  },
  hero: {
    pill: "Meer dan 50.000 studenten oefenen met RijPro",
    titleA: "Slaag sneller voor je",
    titleEmphasis: "rijtheorie",
    titleB: "met oefenen dat echt lijkt op het examen",
    subtitle:
      "Oefen met echte examenvragen, duidelijke uitleg en een timer. Kies snel oefenen, per categorie of een volledig nep examen en zie direct waar je beter wordt.",
    ctaPrimary: "Start gratis met oefenen",
    ctaSecondary: "Bekijk voorbeeldvraag",
    demoAnchor: "demo",
    trust1: "CBR-gecertificeerde voorbereiding",
    trust2: "3 talen beschikbaar",
    trust3: "Expertenvragen",
    dashboardUrl: "rijpro.nl/oefenen",
  },
  language: {
    switch: "Taal kiezen",
  },
  auth: {
    loginTitle: "Welkom terug",
    loginSubtitle: "Log in op je account om verder te leren",
    loginEmail: "E-mailadres",
    loginPassword: "Wachtwoord",
    loginRemember: "Onthoud mij op dit apparaat",
    loginForgot: "Wachtwoord vergeten",
    loginSubmit: "Inloggen",
    loginAlt: "Aanmelden met Google",
    loginAltLoading: "Bezig",
    loginOr: "OF",
    loginNoAccount: "Nog geen account",
    loginCreate: "Maak er gratis een aan",
    loginDemoButton: "Demo — direct inloggen",
    loginDemoHint:
      "Demo-modus: elk e-mailadres en wachtwoord werken, of gebruik de knop hierboven.",
    loginMissingFields: "Vul je e-mailadres en wachtwoord in.",
  },
  student: {
    home: "Thuis",
    logOut: "Uitloggen",
    dashboard: "Dashboard",
    practice: "Oefenen",
    categories: "Per categorie",
    exam: "Nep-examen",
    wrongAnswers: "Foute antwoorden",
    saved: "Opgeslagen",
    progress: "Voortgang",
    settings: "Instellingen",
    searchQuestions: "Zoek vragen",
    notifications: "Meldingen",
    newLabel: "nieuw",
    upgradeTitle: "Gratis plan",
    upgradeSub: "50 vragen resterend",
    upgradeBtn: "Upgrade naar Pro",
    freePlan: "Free",
  },
}

const en: Messages = {
  nav: {
    features: "Features",
    pricing: "Pricing",
    faq: "FAQ",
    login: "Log in",
    register: "Get started",
  },
  hero: {
    pill: "Trusted by 50,000+ students",
    titleA: "Pass your",
    titleEmphasis: "Dutch theory exam",
    titleB: "faster with exam-like practice",
    subtitle:
      "Practice real exam-style questions with clear explanations and a timer. Choose quick practice, categories, or a full mock exam and track your readiness.",
    ctaPrimary: "Start free practice",
    ctaSecondary: "View example question",
    demoAnchor: "demo",
    trust1: "Exam-aligned preparation",
    trust2: "3 languages supported",
    trust3: "Expert explanations",
    dashboardUrl: "rijpro.nl/practice",
  },
  language: {
    switch: "Choose language",
  },
  auth: {
    loginTitle: "Welcome back",
    loginSubtitle: "Log in to continue learning",
    loginEmail: "Email",
    loginPassword: "Password",
    loginRemember: "Remember me on this device",
    loginForgot: "Forgot password",
    loginSubmit: "Log in",
    loginAlt: "Continue with Google",
    loginAltLoading: "Loading",
    loginOr: "OR",
    loginNoAccount: "No account yet",
    loginCreate: "Create one for free",
    loginDemoButton: "Demo — sign in instantly",
    loginDemoHint: "Demo mode: any email and password work, or use the button above.",
    loginMissingFields: "Please enter your email and password.",
  },
  student: {
    home: "Home",
    logOut: "Log out",
    dashboard: "Dashboard",
    practice: "Practice",
    categories: "By category",
    exam: "Mock exam",
    wrongAnswers: "Wrong answers",
    saved: "Saved",
    progress: "Progress",
    settings: "Settings",
    searchQuestions: "Search questions",
    notifications: "Notifications",
    newLabel: "new",
    upgradeTitle: "Free plan",
    upgradeSub: "50 questions left",
    upgradeBtn: "Upgrade to Pro",
    freePlan: "Free",
  },
}

const ar: Messages = {
  nav: {
    features: "الميزات",
    pricing: "الأسعار",
    faq: "الأسئلة الشائعة",
    login: "تسجيل الدخول",
    register: "ابدأ مجانًا",
  },
  hero: {
    pill: "موثوق من أكثر من 50,000 طالب",
    titleA: "اجتز اختبار",
    titleEmphasis: "النظري الهولندي",
    titleB: "بسرعة مع تدريب يشبه الامتحان",
    subtitle:
      "تدريب بأسئلة واقعية مع شرح واضح ومؤقت. اختر تدريب سريع أو حسب القسم أو امتحان تجريبي كامل وتابع جاهزيتك خطوة بخطوة",
    ctaPrimary: "ابدأ التدريب مجانًا",
    ctaSecondary: "شاهد سؤال مثال",
    demoAnchor: "demo",
    trust1: "تحضير مطابق لمحتوى الامتحان",
    trust2: "يدعم 3 لغات",
    trust3: "شروحات احترافية",
    dashboardUrl: "rijpro.nl/تدريب",
  },
  language: {
    switch: "اختيار اللغة",
  },
  auth: {
    loginTitle: "مرحبا بعودتك",
    loginSubtitle: "سجل الدخول لمتابعة التدريب",
    loginEmail: "البريد الإلكتروني",
    loginPassword: "كلمة المرور",
    loginRemember: "تذكرني على هذا الجهاز",
    loginForgot: "نسيت كلمة المرور",
    loginSubmit: "تسجيل الدخول",
    loginAlt: "المتابعة عبر Google",
    loginAltLoading: "جاري التحميل",
    loginOr: "أو",
    loginNoAccount: "ليس لديك حساب",
    loginCreate: "أنشئ حسابا مجانا",
    loginDemoButton: "تجربة — دخول فوري",
    loginDemoHint: "وضع العرض: أي بريد وكلمة مرور صالحان أو استخدم الزر أعلاه.",
    loginMissingFields: "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
  },
  student: {
    home: "الرئيسية",
    logOut: "تسجيل الخروج",
    dashboard: "لوحة التحكم",
    practice: "تدريب",
    categories: "حسب القسم",
    exam: "امتحان تجريبي",
    wrongAnswers: "مراجعة الأخطاء",
    saved: "المحفوظات",
    progress: "التقدم",
    settings: "الإعدادات",
    searchQuestions: "ابحث عن الأسئلة",
    notifications: "الإشعارات",
    newLabel: "جديد",
    upgradeTitle: "الخطة المجانية",
    upgradeSub: "50 سؤال متبقي",
    upgradeBtn: "الترقية إلى Pro",
    freePlan: "Free",
  },
}

export function getMessages(locale: Locale | string | undefined): Messages {
  if (locale === "nl") return nl
  if (locale === "en") return en
  if (locale === "ar") return ar
  return nl
}

