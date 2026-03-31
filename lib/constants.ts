import type {
  Language,
  Difficulty,
  QuestionType,
  SubscriptionPlan,
  SubscriptionPlanDetails,
  NavLink,
} from "@/types"

// ─────────────────────────────────────────────────────────────────────────────
// Languages
// ─────────────────────────────────────────────────────────────────────────────

export const LANGUAGES: Language[] = ["nl", "ar", "en"]

export const LANGUAGE_LABELS: Record<Language, string> = {
  nl: "Nederlands",
  ar: "العربية",
  en: "English",
}

export const LANGUAGE_FLAGS: Record<Language, string> = {
  nl: "🇳🇱",
  ar: "🇸🇦",
  en: "🇬🇧",
}

export const LANGUAGE_DIRECTIONS: Record<Language, "ltr" | "rtl"> = {
  nl: "ltr",
  ar: "rtl",
  en: "ltr",
}

// ─────────────────────────────────────────────────────────────────────────────
// Difficulty Levels
// ─────────────────────────────────────────────────────────────────────────────

export const DIFFICULTY_LEVELS: Difficulty[] = ["EASY", "MEDIUM", "HARD"]

export const DIFFICULTY_LABELS: Record<Difficulty, Record<Language, string>> = {
  EASY: {
    nl: "Makkelijk",
    ar: "سهل",
    en: "Easy",
  },
  MEDIUM: {
    nl: "Gemiddeld",
    ar: "متوسط",
    en: "Medium",
  },
  HARD: {
    nl: "Moeilijk",
    ar: "صعب",
    en: "Hard",
  },
}

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  EASY: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20",
  MEDIUM: "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20",
  HARD: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20",
}

// ─────────────────────────────────────────────────────────────────────────────
// Question Types
// ─────────────────────────────────────────────────────────────────────────────

export const QUESTION_TYPES: QuestionType[] = ["MCQ", "IMAGE", "VIDEO"]

export const QUESTION_TYPE_LABELS: Record<QuestionType, Record<Language, string>> = {
  MCQ: {
    nl: "Meerkeuze",
    ar: "اختيار متعدد",
    en: "Multiple Choice",
  },
  IMAGE: {
    nl: "Afbeelding",
    ar: "صورة",
    en: "Image",
  },
  VIDEO: {
    nl: "Video",
    ar: "فيديو",
    en: "Video",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  {
    slug: "verkeersregels",
    iconName: "traffic-cone",
    color: "#2563eb",
    titleNl: "Verkeersregels",
    titleAr: "قواعد المرور",
    titleEn: "Traffic Rules",
    descriptionNl: "Leer alle verkeersregels die je moet kennen voor je rijbewijs",
    descriptionAr: "تعلم جميع قواعد المرور التي تحتاجها لرخصة القيادة",
    descriptionEn: "Learn all traffic rules you need to know for your driving license",
  },
  {
    slug: "verkeersborden",
    iconName: "sign-post",
    color: "#dc2626",
    titleNl: "Verkeersborden",
    titleAr: "اللافتات المرورية",
    titleEn: "Traffic Signs",
    descriptionNl: "Ken alle verkeersborden en hun betekenissen",
    descriptionAr: "تعرف على جميع اللافتات المرورية ومعانيها",
    descriptionEn: "Know all traffic signs and their meanings",
  },
  {
    slug: "voorrang",
    iconName: "arrow-right-left",
    color: "#d97706",
    titleNl: "Voorrangsregels",
    titleAr: "قواعد الأولوية",
    titleEn: "Priority Rules",
    descriptionNl: "Begrijp wanneer je voorrang hebt of moet verlenen",
    descriptionAr: "افهم متى تكون لك الأولوية أو يجب أن تمنحها",
    descriptionEn: "Understand when you have priority or must yield",
  },
  {
    slug: "rijvaardigheid",
    iconName: "steering-wheel",
    color: "#059669",
    titleNl: "Rijvaardigheid",
    titleAr: "مهارات القيادة",
    titleEn: "Driving Skills",
    descriptionNl: "Technische vaardigheden en rijgedrag",
    descriptionAr: "المهارات التقنية وسلوك القيادة",
    descriptionEn: "Technical skills and driving behavior",
  },
  {
    slug: "gevaarherkenning",
    iconName: "alert-triangle",
    color: "#7c3aed",
    titleNl: "Gevaarherkenning",
    titleAr: "التعرف على المخاطر",
    titleEn: "Hazard Perception",
    descriptionNl: "Leer gevaarlijke situaties herkennen en vermijden",
    descriptionAr: "تعلم التعرف على المواقف الخطرة وتجنبها",
    descriptionEn: "Learn to recognize and avoid dangerous situations",
  },
  {
    slug: "milieu-en-zuinig-rijden",
    iconName: "leaf",
    color: "#16a34a",
    titleNl: "Milieu & Zuinig Rijden",
    titleAr: "البيئة والقيادة الاقتصادية",
    titleEn: "Eco & Efficient Driving",
    descriptionNl: "Rijden met minder brandstof en minder uitstoot",
    descriptionAr: "القيادة بكفاءة وبأقل انبعاثات",
    descriptionEn: "Drive with less fuel and lower emissions",
  },
  {
    slug: "voertuigkennis",
    iconName: "car",
    color: "#0891b2",
    titleNl: "Voertuigkennis",
    titleAr: "معرفة المركبة",
    titleEn: "Vehicle Knowledge",
    descriptionNl: "Kennis over de auto en zijn onderdelen",
    descriptionAr: "المعرفة بالسيارة وأجزائها",
    descriptionEn: "Knowledge about the car and its components",
  },
  {
    slug: "bijzondere-situaties",
    iconName: "construction",
    color: "#ea580c",
    titleNl: "Bijzondere Situaties",
    titleAr: "المواقف الخاصة",
    titleEn: "Special Situations",
    descriptionNl: "Rijden in bijzondere omstandigheden zoals gladheid en werk in uitvoering",
    descriptionAr: "القيادة في ظروف خاصة مثل الانزلاق وأعمال البناء",
    descriptionEn: "Driving in special circumstances like icy roads and construction zones",
  },
] as const

export type CategorySlug = typeof CATEGORIES[number]["slug"]

// ─────────────────────────────────────────────────────────────────────────────
// Subscription Plans
// ─────────────────────────────────────────────────────────────────────────────

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlan, SubscriptionPlanDetails> = {
  FREE: {
    id: "FREE",
    name: "Free",
    nameNl: "Gratis",
    nameAr: "مجاني",
    price: 0,
    priceYearly: 0,
    currency: "EUR",
    features: [
      "20 questions per day",
      "Basic progress tracking",
      "3 categories",
    ],
    featuresNl: [
      "20 vragen per dag",
      "Basis voortgangsregistratie",
      "3 categorieën",
    ],
    featuresAr: [
      "20 سؤالاً يومياً",
      "تتبع التقدم الأساسي",
      "3 فئات",
    ],
    maxQuestionsPerDay: 20,
    hasUnlimitedAccess: false,
    hasMockExams: false,
    hasExplanations: false,
    hasProgressTracking: true,
    hasPrioritySupport: false,
    stripePriceId: null,
    stripePriceIdYearly: null,
    isPopular: false,
  },
  BASIC: {
    id: "BASIC",
    name: "Basic",
    nameNl: "Basis",
    nameAr: "أساسي",
    price: 4.99,
    priceYearly: 44.99,
    currency: "EUR",
    features: [
      "100 questions per day",
      "All 8 categories",
      "Answer explanations",
      "Progress tracking",
    ],
    featuresNl: [
      "100 vragen per dag",
      "Alle 8 categorieën",
      "Uitleg bij antwoorden",
      "Voortgangsregistratie",
    ],
    featuresAr: [
      "100 سؤال يومياً",
      "جميع الفئات الـ8",
      "شرح الإجابات",
      "تتبع التقدم",
    ],
    maxQuestionsPerDay: 100,
    hasUnlimitedAccess: false,
    hasMockExams: false,
    hasExplanations: true,
    hasProgressTracking: true,
    hasPrioritySupport: false,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID ?? null,
    stripePriceIdYearly: process.env.NEXT_PUBLIC_STRIPE_BASIC_YEARLY_PRICE_ID ?? null,
    isPopular: false,
  },
  STANDARD: {
    id: "STANDARD",
    name: "Standard",
    nameNl: "Standaard",
    nameAr: "قياسي",
    price: 9.99,
    priceYearly: 89.99,
    currency: "EUR",
    features: [
      "Unlimited questions",
      "All categories",
      "Mock exams (CBR simulation)",
      "Answer explanations",
      "Detailed statistics",
      "Save questions",
    ],
    featuresNl: [
      "Onbeperkte vragen",
      "Alle categorieën",
      "Oefenexamens (CBR simulatie)",
      "Uitleg bij antwoorden",
      "Gedetailleerde statistieken",
      "Vragen opslaan",
    ],
    featuresAr: [
      "أسئلة غير محدودة",
      "جميع الفئات",
      "اختبارات تجريبية (محاكاة CBR)",
      "شرح الإجابات",
      "إحصائيات مفصلة",
      "حفظ الأسئلة",
    ],
    maxQuestionsPerDay: null,
    hasUnlimitedAccess: true,
    hasMockExams: true,
    hasExplanations: true,
    hasProgressTracking: true,
    hasPrioritySupport: false,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID ?? null,
    stripePriceIdYearly: process.env.NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PRICE_ID ?? null,
    isPopular: true,
  },
  PREMIUM: {
    id: "PREMIUM",
    name: "Premium",
    nameNl: "Premium",
    nameAr: "مميز",
    price: 14.99,
    priceYearly: 129.99,
    currency: "EUR",
    features: [
      "Everything in Standard",
      "Priority support",
      "Personalised weak-spot training",
      "Multiple languages",
      "Early access to new features",
    ],
    featuresNl: [
      "Alles van Standaard",
      "Prioriteitsondersteuning",
      "Gepersonaliseerde zwakke punten training",
      "Meerdere talen",
      "Vroege toegang tot nieuwe functies",
    ],
    featuresAr: [
      "كل ما في الخطة القياسية",
      "دعم ذو أولوية",
      "تدريب شخصي على نقاط الضعف",
      "لغات متعددة",
      "وصول مبكر إلى الميزات الجديدة",
    ],
    maxQuestionsPerDay: null,
    hasUnlimitedAccess: true,
    hasMockExams: true,
    hasExplanations: true,
    hasProgressTracking: true,
    hasPrioritySupport: true,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ?? null,
    stripePriceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID ?? null,
    isPopular: false,
  },
}

export const PLAN_ORDER: SubscriptionPlan[] = ["FREE", "BASIC", "STANDARD", "PREMIUM"]

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Links
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  {
    href: "/",
    label: "Home",
    labelNl: "Home",
    labelAr: "الرئيسية",
  },
  {
    href: "/hoe-het-werkt",
    label: "How it works",
    labelNl: "Hoe het werkt",
    labelAr: "كيف يعمل",
  },
  {
    href: "/prijzen",
    label: "Pricing",
    labelNl: "Prijzen",
    labelAr: "الأسعار",
  },
  {
    href: "/categorieën",
    label: "Categories",
    labelNl: "Categorieën",
    labelAr: "الفئات",
  },
  {
    href: "/over-ons",
    label: "About",
    labelNl: "Over ons",
    labelAr: "من نحن",
  },
]

export const STUDENT_NAV_LINKS: NavLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    labelNl: "Dashboard",
    labelAr: "لوحة التحكم",
    icon: "layout-dashboard",
  },
  {
    href: "/dashboard/oefenen",
    label: "Practice",
    labelNl: "Oefenen",
    labelAr: "تدريب",
    icon: "book-open",
  },
  {
    href: "/dashboard/oefenexamen",
    label: "Mock Exam",
    labelNl: "Oefenexamen",
    labelAr: "الاختبار التجريبي",
    icon: "clipboard-list",
  },
  {
    href: "/dashboard/opgeslagen",
    label: "Saved Questions",
    labelNl: "Opgeslagen vragen",
    labelAr: "الأسئلة المحفوظة",
    icon: "bookmark",
  },
  {
    href: "/dashboard/statistieken",
    label: "Statistics",
    labelNl: "Statistieken",
    labelAr: "الإحصائيات",
    icon: "bar-chart-2",
  },
  {
    href: "/dashboard/instellingen",
    label: "Settings",
    labelNl: "Instellingen",
    labelAr: "الإعدادات",
    icon: "settings",
  },
]

export const ADMIN_NAV_LINKS: NavLink[] = [
  {
    href: "/admin",
    label: "Dashboard",
    labelNl: "Dashboard",
    labelAr: "لوحة التحكم",
    icon: "layout-dashboard",
  },
  {
    href: "/admin/vragen",
    label: "Questions",
    labelNl: "Vragen",
    labelAr: "الأسئلة",
    icon: "help-circle",
  },
  {
    href: "/admin/categorieën",
    label: "Categories",
    labelNl: "Categorieën",
    labelAr: "الفئات",
    icon: "tag",
  },
  {
    href: "/admin/gebruikers",
    label: "Users",
    labelNl: "Gebruikers",
    labelAr: "المستخدمون",
    icon: "users",
  },
  {
    href: "/admin/abonnementen",
    label: "Subscriptions",
    labelNl: "Abonnementen",
    labelAr: "الاشتراكات",
    icon: "credit-card",
  },
  {
    href: "/admin/content",
    label: "Content",
    labelNl: "Content",
    labelAr: "المحتوى",
    icon: "file-text",
  },
  {
    href: "/admin/statistieken",
    label: "Analytics",
    labelNl: "Statistieken",
    labelAr: "التحليلات",
    icon: "trending-up",
  },
  {
    href: "/admin/instellingen",
    label: "Settings",
    labelNl: "Instellingen",
    labelAr: "الإعدادات",
    icon: "settings",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Exam Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const EXAM_CONFIG = {
  // CBR official exam settings
  TOTAL_QUESTIONS: 65,
  PASS_THRESHOLD: 60, // must get at least 60 out of 65 correct
  TIME_LIMIT_MINUTES: 55,
  // Practice mock exam settings
  MOCK_TOTAL_QUESTIONS: 25,
  MOCK_PASS_THRESHOLD_PERCENTAGE: 80,
  MOCK_TIME_LIMIT_MINUTES: 30,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Option Keys
// ─────────────────────────────────────────────────────────────────────────────

export const OPTION_KEYS = ["A", "B", "C", "D"] as const

// ─────────────────────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// ─────────────────────────────────────────────────────────────────────────────
// App Metadata
// ─────────────────────────────────────────────────────────────────────────────

export const APP_NAME = "Rijschool Platform"
export const APP_DESCRIPTION_NL =
  "De beste manier om je rijbewijs theorie te leren. Oefen met echte CBR-vragen en doe oefenexamens."
export const APP_DESCRIPTION_AR =
  "أفضل طريقة لتعلم نظرية رخصة القيادة. تدرب على أسئلة CBR الحقيقية وأجري اختبارات تجريبية."
export const APP_DESCRIPTION_EN =
  "The best way to learn Dutch driving theory. Practice with real CBR questions and take mock exams."

export const SUPPORT_EMAIL = "support@rijschool-platform.nl"

// ─────────────────────────────────────────────────────────────────────────────
// Error Messages
// ─────────────────────────────────────────────────────────────────────────────

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Je bent niet ingelogd. Log in om door te gaan.",
  FORBIDDEN: "Je hebt geen toegang tot deze pagina.",
  NOT_FOUND: "De gevraagde pagina of inhoud is niet gevonden.",
  SERVER_ERROR: "Er is een serverfout opgetreden. Probeer het later opnieuw.",
  SUBSCRIPTION_REQUIRED: "Dit onderdeel is alleen beschikbaar met een betaald abonnement.",
  DAILY_LIMIT_REACHED: "Je hebt je dagelijkse limiet voor vragen bereikt. Upgrade je abonnement voor meer vragen.",
} as const
