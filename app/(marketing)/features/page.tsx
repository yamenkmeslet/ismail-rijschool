import Link from "next/link"
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const featureBlocks = [
  {
    id: "smart-practice",
    icon: <Brain className="h-8 w-8" />,
    tag: "Slim oefenen",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Een systeem dat meedenkt",
    description:
      "Ons adaptieve algoritme analyseert elk antwoord dat je geeft. Vragen die je mist, komen vaker terug. Vragen die je beheerst, worden minder frequent getoond. Zo besteed je jouw studietijd optimaal.",
    bullets: [
      "Detecteert zwakke punten automatisch",
      "Past vraagfrequentie dynamisch aan",
      "Toont progressie per categorie",
      "Vergelijkt jou met andere studenten",
    ],
    imageGradient: "from-blue-600 to-indigo-700",
    imageContent: (
      <div className="p-8 text-white">
        <h3 className="mb-6 text-xl font-bold">Slimme studieplanner</h3>
        <div className="space-y-3">
          {[
            { cat: "Verkeersregels", pct: 88, color: "bg-green-400" },
            { cat: "Voorrang", pct: 62, color: "bg-amber-400" },
            { cat: "Gevaarherkenning", pct: 45, color: "bg-red-400" },
            { cat: "Verkeersborden", pct: 79, color: "bg-blue-300" },
          ].map((item) => (
            <div key={item.cat}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-blue-100">{item.cat}</span>
                <span className="font-semibold">{item.pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-xl bg-white/10 p-3 text-sm text-blue-100">
          💡 Focus op <strong className="text-white">Gevaarherkenning</strong> — dit is je zwakste categorie
        </p>
      </div>
    ),
    reverse: false,
  },
  {
    id: "mock-exams",
    icon: <ClipboardCheck className="h-8 w-8" />,
    tag: "Oefenexamens",
    tagColor: "bg-green-100 text-green-700",
    title: "Realistische examenervaring",
    description:
      "Onze oefenexamens bootsen het echte CBR-examen tot in detail na. Dezelfde tijdslimiet van 30 minuten, 65 vragen, exacte scoregrens — zodat je op examendag geen verrassingen hebt.",
    bullets: [
      "Exacte CBR-examenvorm en -format",
      "Tijdslimiet van 30 minuten",
      "Directe beoordeling na afloop",
      "Gedetailleerde foutanalyse",
    ],
    imageGradient: "from-green-600 to-teal-700",
    imageContent: (
      <div className="p-8 text-white">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Oefenexamen</h3>
          <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm">
            <Clock className="h-3.5 w-3.5" />
            <span>18:42</span>
          </div>
        </div>
        <div className="mb-6 rounded-xl bg-white/10 p-4 text-sm">
          <p className="mb-1 text-green-200">Vraag 38 van 65</p>
          <p className="text-white font-medium">
            Wat moet u doen als u een vluchtstrook ziet blokkeren?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {["Doorrij­den", "Bel 112", "Gebruik noodlichten", "Gebruik claxon"].map(
            (opt, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 ${
                  i === 1
                    ? "bg-green-500/70 font-medium text-white"
                    : "bg-white/10 text-green-100"
                }`}
              >
                <span className="font-bold mr-1">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </div>
            )
          )}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
          {[
            { label: "Correct", value: "37" },
            { label: "Fout", value: "1" },
            { label: "Over", value: "27" },
          ].map((s) => (
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
    tag: "Visuele vragen",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Zie wat je leert",
    description:
      "Het CBR-examen is vol afbeeldingen en situatieschetsen. Onze database bevat honderden visuele vragen met realistische verkeerssituaties, zodat je exact weet wat je kunt verwachten.",
    bullets: [
      "Realistische verkeerssituaties als afbeelding",
      "Gevaarherkenningsvideo's",
      "Interactieve situatievragen",
      "Alle CBR-beeldcategorieën gedekt",
    ],
    imageGradient: "from-purple-600 to-pink-700",
    imageContent: (
      <div className="p-8 text-white">
        <h3 className="mb-4 text-xl font-bold">Visuele vraag</h3>
        <div className="mb-4 rounded-xl bg-white/10 p-6 text-center">
          <div className="mx-auto mb-3 h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-purple-200" />
          </div>
          <p className="text-sm text-purple-200">Afbeelding: kruispunt met voorrangssituatie</p>
        </div>
        <p className="mb-3 text-sm text-purple-100">
          Welke auto heeft voorrang op dit kruispunt?
        </p>
        <div className="space-y-2 text-sm">
          {["Auto van links", "Auto van rechts ✓", "Uw auto", "Fiets"].map(
            (opt, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 ${
                  i === 1
                    ? "bg-green-500/70 font-semibold text-white"
                    : "bg-white/10 text-purple-100"
                }`}
              >
                {opt}
              </div>
            )
          )}
        </div>
      </div>
    ),
    reverse: false,
  },
  {
    id: "progress-tracking",
    icon: <BarChart3 className="h-8 w-8" />,
    tag: "Voortgang",
    tagColor: "bg-amber-100 text-amber-700",
    title: "Weet precies hoe je ervoor staat",
    description:
      "Elk goed en fout antwoord wordt bijgehouden in jouw persoonlijk dashboard. Zie per categorie hoe je presteert, vergelijk je met de gemiddelde student en ontdek waar je nog aandacht aan moet besteden.",
    bullets: [
      "Overzicht per categorie en subcategorie",
      "Historische trendgrafieken",
      "Vergelijking met gemiddelde student",
      "Studietijdregistratie",
    ],
    imageGradient: "from-amber-500 to-orange-600",
    imageContent: (
      <div className="p-8 text-white">
        <h3 className="mb-2 text-xl font-bold">Mijn statistieken</h3>
        <p className="mb-6 text-sm text-amber-200">Afgelopen 30 dagen</p>
        <div className="mb-6 grid grid-cols-2 gap-3">
          {[
            { icon: <Target className="h-4 w-4" />, value: "87%", label: "Nauwkeurigheid" },
            { icon: <TrendingUp className="h-4 w-4" />, value: "+12%", label: "Verbetering" },
            { icon: <Clock className="h-4 w-4" />, value: "24u", label: "Studietijd" },
            { icon: <Sparkles className="h-4 w-4" />, value: "1.240", label: "Vragen" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-xl bg-white/10 p-3"
            >
              <div className="text-amber-300">{s.icon}</div>
              <div>
                <p className="text-lg font-bold text-white">{s.value}</p>
                <p className="text-xs text-amber-200">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-1 h-16">
          {[40, 60, 45, 75, 65, 85, 90].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-white/30"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-xs text-amber-300">
          <span>Ma</span><span>Di</span><span>Wo</span><span>Do</span>
          <span>Vr</span><span>Za</span><span>Zo</span>
        </div>
      </div>
    ),
    reverse: true,
  },
  {
    id: "multilingual",
    icon: <Languages className="h-8 w-8" />,
    tag: "Meertalig",
    tagColor: "bg-indigo-100 text-indigo-700",
    title: "Studeer in jouw taal",
    description:
      "Voor veel studenten is het rijexamen al moeilijk genoeg. Voeg daarbij een taalbarrière en de kans op mislukken verdubbelt. RijPro is volledig beschikbaar in Nederlands, Engels én Arabisch.",
    bullets: [
      "Volledige interface in 3 talen",
      "Professioneel vertaalde vragen",
      "Wisselbaar midden in een sessie",
      "RTL-ondersteuning voor Arabisch",
    ],
    imageGradient: "from-indigo-600 to-blue-700",
    imageContent: (
      <div className="p-8 text-white">
        <h3 className="mb-6 text-xl font-bold">Taal kiezen</h3>
        <div className="space-y-3">
          {[
            { flag: "🇳🇱", lang: "Nederlands", sublabel: "Standaardtaal", active: true },
            { flag: "🇬🇧", lang: "English", sublabel: "Available", active: false },
            { flag: "🇸🇦", lang: "العربية", sublabel: "متاح", active: false },
          ].map((l) => (
            <div
              key={l.lang}
              className={`flex items-center gap-4 rounded-xl p-4 ${
                l.active ? "bg-white/25 ring-2 ring-white/40" : "bg-white/10"
              }`}
            >
              <span className="text-3xl">{l.flag}</span>
              <div>
                <p className="font-semibold text-white">{l.lang}</p>
                <p className="text-sm text-indigo-200">{l.sublabel}</p>
              </div>
              {l.active && (
                <CheckCircle2 className="ml-auto h-5 w-5 text-white" />
              )}
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
    tag: "Uitleg",
    tagColor: "bg-teal-100 text-teal-700",
    title: "Begrijp waarom, niet alleen wat",
    description:
      "Elk antwoord wordt vergezeld van een heldere uitleg die verwijst naar de officiële verkeersregel. Zo leer je niet uit het hoofd, maar begrijp je waarom iets goed of fout is — en vergeet je het nooit meer.",
    bullets: [
      "Uitleg bij elk goed én fout antwoord",
      "Verwijzing naar verkeersregels",
      "Aanvullende leestips",
      "Beschikbaar in alle 3 talen",
    ],
    imageGradient: "from-teal-600 to-cyan-700",
    imageContent: (
      <div className="p-8 text-white">
        <h3 className="mb-4 text-xl font-bold">Uitleg bij antwoord</h3>
        <div className="mb-4 rounded-xl bg-red-500/30 p-4 text-sm">
          <p className="mb-1 font-semibold text-red-200">✗ Jouw antwoord: Stoppen voor oversteekplaats</p>
          <p className="text-red-100">Dit is onjuist in deze situatie.</p>
        </div>
        <div className="mb-4 rounded-xl bg-green-500/30 p-4 text-sm">
          <p className="mb-1 font-semibold text-green-200">✓ Correct antwoord: Snelheid aanpassen</p>
          <p className="text-green-100">
            Je moet je snelheid aanpassen zodat je veilig kunt stoppen als de
            voetganger oversteekt.
          </p>
        </div>
        <div className="rounded-xl bg-white/10 p-4 text-sm text-teal-100">
          <p className="mb-1 font-semibold text-white">📖 Wettelijke grondslag</p>
          <p>RVV 1990, artikel 49 — Gedrag bij voetgangersoversteekplaatsen</p>
        </div>
      </div>
    ),
    reverse: true,
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pb-20 pt-32 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-20 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-100/50 blur-3xl" />
        </div>

        <div className="container relative text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Functies
          </span>
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Alles wat je nodig hebt om te{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              slagen
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-500">
            Zes krachtige functies die samenwerken om jou zo snel en effectief
            mogelijk voor te bereiden op het CBR-rijtheorie-examen.
          </p>
          <Button asChild variant="brand" size="xl">
            <Link href="/register">
              Gratis uitproberen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature overview cards */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureBlocks.map((fb, i) => (
              <FeatureCard
                key={i}
                icon={fb.icon}
                title={fb.title.split(" ").slice(0, 3).join(" ")}
                description={fb.description.slice(0, 100) + "…"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed feature blocks */}
      {featureBlocks.map((fb, i) => (
        <section
          key={fb.id}
          id={fb.id}
          className={i % 2 === 0 ? "bg-slate-50 py-24" : "bg-white py-24"}
        >
          <div className="container">
            <div
              className={`flex flex-col items-center gap-12 lg:flex-row ${
                fb.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text side */}
              <div className="flex-1">
                <span
                  className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${fb.tagColor}`}
                >
                  {fb.icon &&
                    <span className="scale-75">{fb.icon}</span>
                  }
                  {fb.tag}
                </span>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {fb.title}
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-slate-500">
                  {fb.description}
                </p>
                <ul className="mb-8 space-y-3">
                  {fb.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <span className="text-slate-700">{b}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="brand">
                  <Link href="/register">
                    Probeer gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Image / mockup side */}
              <div className="w-full flex-1 lg:max-w-lg">
                <div
                  className={`overflow-hidden rounded-2xl bg-gradient-to-br ${fb.imageGradient} shadow-2xl`}
                >
                  {fb.imageContent}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800"
          aria-hidden="true"
        />
        <div className="container relative text-center">
          <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl">
            Klaar om te beginnen?
          </h2>
          <p className="mb-10 text-lg text-blue-200">
            Probeer alle functies 7 dagen gratis. Geen creditcard vereist.
          </p>
          <Button
            asChild
            size="xl"
            className="bg-white text-blue-700 hover:bg-blue-50"
          >
            <Link href="/register">
              Start gratis proefperiode
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
