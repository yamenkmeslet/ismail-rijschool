/**
 * Static category data for demo deployments (no Prisma / DATABASE_URL).
 * Aligned with prisma/seed.ts category slugs and translations.
 */
export type DemoApiLanguage = "NL" | "EN" | "AR"

export function parseCategoriesLanguage(param: string | null): DemoApiLanguage {
  const u = (param ?? "NL").toUpperCase()
  if (u === "EN" || u === "AR") return u
  return "NL"
}

type Row = {
  id: string
  slug: string
  title: string
  description: string | null
}

const DATA: Record<DemoApiLanguage, Row[]> = {
  NL: [
    {
      id: "demo-cat-verkeersregels",
      slug: "verkeersregels",
      title: "Verkeersregels",
      description: "Basisregels voor deelname aan het verkeer",
    },
    {
      id: "demo-cat-voorrang",
      slug: "voorrang",
      title: "Voorrang",
      description: "Wie heeft voorrang in welke situatie",
    },
    {
      id: "demo-cat-verkeersborden",
      slug: "verkeersborden",
      title: "Verkeersborden",
      description: "Herkennen en begrijpen van verkeersborden",
    },
    {
      id: "demo-cat-gevaarherkenning",
      slug: "gevaarherkenning",
      title: "Gevaarherkenning",
      description: "Gevaarlijke situaties tijdig herkennen",
    },
    {
      id: "demo-cat-parkeren",
      slug: "parkeren",
      title: "Parkeren",
      description: "Parkeersituaties en parkeerborden",
    },
    {
      id: "demo-cat-voertuigveiligheid",
      slug: "voertuigveiligheid",
      title: "Voertuigveiligheid",
      description: "Veiligheid en techniek van het voertuig",
    },
    {
      id: "demo-cat-kinderen-gordels",
      slug: "kinderen-gordels",
      title: "Kinderen & Gordels",
      description: "Veiligheid van kinderen en gordelgebruik",
    },
    {
      id: "demo-cat-rijpositie",
      slug: "rijpositie",
      title: "Rijpositie",
      description: "Correcte positie op de weg",
    },
  ],
  EN: [
    {
      id: "demo-cat-verkeersregels",
      slug: "verkeersregels",
      title: "Traffic Rules",
      description: "Basic rules for participating in traffic",
    },
    {
      id: "demo-cat-voorrang",
      slug: "voorrang",
      title: "Right of Way",
      description: "Who has right of way in which situation",
    },
    {
      id: "demo-cat-verkeersborden",
      slug: "verkeersborden",
      title: "Traffic Signs",
      description: "Recognizing and understanding traffic signs",
    },
    {
      id: "demo-cat-gevaarherkenning",
      slug: "gevaarherkenning",
      title: "Hazard Perception",
      description: "Recognizing dangerous situations in time",
    },
    {
      id: "demo-cat-parkeren",
      slug: "parkeren",
      title: "Parking",
      description: "Parking situations and parking signs",
    },
    {
      id: "demo-cat-voertuigveiligheid",
      slug: "voertuigveiligheid",
      title: "Vehicle Safety",
      description: "Vehicle safety and technology",
    },
    {
      id: "demo-cat-kinderen-gordels",
      slug: "kinderen-gordels",
      title: "Children & Seatbelts",
      description: "Children safety and seatbelt use",
    },
    {
      id: "demo-cat-rijpositie",
      slug: "rijpositie",
      title: "Road Position",
      description: "Correct position on the road",
    },
  ],
  AR: [
    {
      id: "demo-cat-verkeersregels",
      slug: "verkeersregels",
      title: "قواعد المرور",
      description: "القواعد الأساسية للمشاركة في حركة المرور",
    },
    {
      id: "demo-cat-voorrang",
      slug: "voorrang",
      title: "حق الأولوية",
      description: "من له حق الأولوية في أي موقف",
    },
    {
      id: "demo-cat-verkeersborden",
      slug: "verkeersborden",
      title: "إشارات المرور",
      description: "التعرف على إشارات المرور وفهمها",
    },
    {
      id: "demo-cat-gevaarherkenning",
      slug: "gevaarherkenning",
      title: "إدراك المخاطر",
      description: "التعرف على المواقف الخطرة في الوقت المناسب",
    },
    {
      id: "demo-cat-parkeren",
      slug: "parkeren",
      title: "ركن السيارات",
      description: "مواقف وإشارات ركن السيارات",
    },
    {
      id: "demo-cat-voertuigveiligheid",
      slug: "voertuigveiligheid",
      title: "سلامة المركبة",
      description: "سلامة المركبة وتقنياتها",
    },
    {
      id: "demo-cat-kinderen-gordels",
      slug: "kinderen-gordels",
      title: "الأطفال وأحزمة الأمان",
      description: "سلامة الأطفال واستخدام أحزمة الأمان",
    },
    {
      id: "demo-cat-rijpositie",
      slug: "rijpositie",
      title: "موضع القيادة",
      description: "الموضع الصحيح على الطريق",
    },
  ],
}

/** Shape friendly for `/api/categories` consumers (flat title + optional prisma-like fields). */
export function getDemoCategories(language: DemoApiLanguage): Row[] {
  return DATA[language].map((r) => ({ ...r }))
}
