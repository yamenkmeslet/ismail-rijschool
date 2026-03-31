import Link from "next/link"
import {
  Brain,
  ClipboardCheck,
  Image as ImageIcon,
  BarChart3,
  Languages,
  BookOpen,
  Shield,
  AlertTriangle,
  MapPin,
  Eye,
  ParkingSquare,
  Wrench,
  Baby,
  Navigation,
  ArrowRight,
  CheckCircle2,
  UserPlus,
  Zap,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HeroSection } from "@/components/marketing/hero-section"
import { FeatureCard } from "@/components/marketing/feature-card"
import { PricingCard } from "@/components/marketing/pricing-card"
import { TestimonialCard } from "@/components/marketing/testimonial-card"

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Slim Oefenen",
    description:
      "Ons adaptieve systeem detecteert jouw zwakke punten en focust de oefensessies automatisch op de onderdelen die jij het hardst nodig hebt.",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: "Oefenexamens",
    description:
      "Doe realistische oefenexamens die de échte CBR-omstandigheden nabootsen, inclusief tijdslimiet en het exacte vragenformat.",
  },
  {
    icon: <ImageIcon className="h-6 w-6" />,
    title: "Visuele Vragen",
    description:
      "Ofen met afbeeldingen en situatieschetsen die identiek zijn aan het echte examen — inclusief verkeerssituaties en gevaarherkenning.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Voortgangsanalyse",
    description:
      "Gedetailleerde grafieken en statistieken laten precies zien hoe je presteert per categorie, zodat je gericht kunt bijsturen.",
  },
  {
    icon: <Languages className="h-6 w-6" />,
    title: "Meertalig",
    description:
      "Studeer in het Nederlands, Engels of Arabisch. Alle vragen, uitleg en interface zijn volledig vertaald en gecertificeerd.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Expertuitleg",
    description:
      "Elk antwoord — goed of fout — wordt helder uitgelegd met de bijbehorende verkeersregel, zodat je nooit alleen een 'nee' krijgt.",
  },
]

const steps = [
  {
    number: "01",
    icon: <UserPlus className="h-8 w-8" />,
    title: "Registreer en kies een plan",
    description:
      "Maak binnen één minuut een gratis account aan. Kies vervolgens het abonnement dat het beste bij jouw situatie past. Je kunt altijd upgraden of annuleren.",
  },
  {
    number: "02",
    icon: <Zap className="h-8 w-8" />,
    title: "Oefen met het slimme systeem",
    description:
      "Begin met de zelfstudie-modules of ga direct aan de slag met oefenvragen. Het systeem leert jou kennen en past zich aan aan jouw tempo en niveau.",
  },
  {
    number: "03",
    icon: <Trophy className="h-8 w-8" />,
    title: "Slaag met vertrouwen",
    description:
      "Dankzij onze gerichte voorbereiding ga je het CBR-examen in met vertrouwen. Onze studenten slagen gemiddeld in de eerste poging met een score van 87%.",
  },
]

const categories = [
  { icon: <Shield className="h-6 w-6" />, name: "Verkeersregels", count: 320, color: "blue" },
  { icon: <AlertTriangle className="h-6 w-6" />, name: "Voorrang", count: 185, color: "amber" },
  { icon: <MapPin className="h-6 w-6" />, name: "Verkeersborden", count: 240, color: "red" },
  { icon: <Eye className="h-6 w-6" />, name: "Gevaarherkenning", count: 150, color: "purple" },
  { icon: <ParkingSquare className="h-6 w-6" />, name: "Parkeren", count: 120, color: "green" },
  { icon: <Wrench className="h-6 w-6" />, name: "Voertuigveiligheid", count: 95, color: "orange" },
  { icon: <Baby className="h-6 w-6" />, name: "Kinderen & Gordels", count: 80, color: "pink" },
  { icon: <Navigation className="h-6 w-6" />, name: "Rijpositie", count: 110, color: "indigo" },
]

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
  purple: "bg-purple-50 text-purple-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  pink: "bg-pink-50 text-pink-600",
  indigo: "bg-indigo-50 text-indigo-600",
}

const testimonials = [
  {
    name: "Ahmed M.",
    initials: "AM",
    flag: "🇲🇦",
    nationality: "Marokko",
    rating: 5,
    quote:
      "Geweldig platform! Ik ben in één keer geslaagd na drie weken oefenen. De visuele vragen en uitleg maken het verschil. Ik kan dit aan iedereen aanbevelen.",
    role: "Geslaagd op eerste poging",
  },
  {
    name: "Sara V.",
    initials: "SV",
    flag: "🇳🇱",
    nationality: "Nederland",
    rating: 5,
    quote:
      "De visuele vragen zijn precies zoals het echte examen. Het adaptieve systeem zorgde ervoor dat ik mijn zwakke punten snel aanpakte. Top service!",
    role: "Geslaagd op eerste poging",
  },
  {
    name: "Karim B.",
    initials: "KB",
    flag: "🇩🇿",
    nationality: "Algerije",
    rating: 5,
    quote:
      "De Arabische ondersteuning was perfect voor mij. Ik kon alles begrijpen zonder taalbarrière. Highly recommend to anyone who wants to pass first time!",
    role: "Geslaagd op eerste poging",
  },
]

const pricingPlans = [
  {
    name: "Basis",
    price: 9.99,
    annualPrice: 7.99,
    description: "Perfect om te beginnen met oefenen",
    features: [
      { text: "500 oefenvragen", included: true },
      { text: "3 oefenexamens per maand", included: true },
      { text: "Voortgangsoverzicht", included: true },
      { text: "1 taal naar keuze", included: true },
      { text: "Adaptief leersysteem", included: false },
      { text: "Onbeperkte oefenexamens", included: false },
      { text: "Alle 3 talen", included: false },
    ],
    ctaLabel: "Begin met Basis",
    popular: false,
  },
  {
    name: "Standaard",
    price: 14.99,
    annualPrice: 11.99,
    description: "Onze meest gekozen optie voor slagen",
    features: [
      { text: "2.000+ oefenvragen", included: true },
      { text: "Onbeperkte oefenexamens", included: true },
      { text: "Uitgebreide voortgangsanalyse", included: true },
      { text: "Alle 3 talen", included: true },
      { text: "Adaptief leersysteem", included: true },
      { text: "Expertuitleg per vraag", included: true },
      { text: "Prioriteitsondersteuning", included: false },
    ],
    ctaLabel: "Begin met Standaard",
    popular: true,
  },
  {
    name: "Premium",
    price: 24.99,
    annualPrice: 19.99,
    description: "Alles wat je nodig hebt, plus meer",
    features: [
      { text: "2.000+ oefenvragen", included: true },
      { text: "Onbeperkte oefenexamens", included: true },
      { text: "Geavanceerde statistieken & AI-tips", included: true },
      { text: "Alle 3 talen", included: true },
      { text: "Adaptief leersysteem", included: true },
      { text: "Expertuitleg per vraag", included: true },
      { text: "Prioriteitsondersteuning (24/7)", included: true },
    ],
    ctaLabel: "Begin met Premium",
    popular: false,
  },
]

const faqs = [
  {
    question: "Hoe werkt het CBR-theorie-examen?",
    answer:
      "Het CBR-theorie-examen bestaat uit 65 meerkeuzevragen die je in 30 minuten moet beantwoorden. Je mag maximaal 10 fouten maken om te slagen. De vragen gaan over verkeersregels, verkeersborden, voorrang en gevaarherkenning. RijPro bereidt je voor op exact dit format.",
  },
  {
    question: "Wat is inbegrepen in een abonnement?",
    answer:
      "Elk abonnement geeft toegang tot onze oefenvragendatabase, oefenexamens, voortgangsanalyse en meertalige interface. Het Standaard- en Premium-abonnement bieden bovendien het adaptieve leersysteem, onbeperkte oefenexamens en uitgebreide uitleg bij elke vraag.",
  },
  {
    question: "In welke talen kan ik studeren?",
    answer:
      "RijPro is volledig beschikbaar in Nederlands, Engels en Arabisch. Alle vragen, antwoorden, uitleg en de interface zijn professioneel vertaald. Je kunt op elk moment van taal wisselen, zelfs halverwege een sessie.",
  },
  {
    question: "Kan ik mijn abonnement opzeggen?",
    answer:
      "Ja, je kunt je abonnement op elk moment opzeggen — zonder kosten of boetes. Je behoudt toegang tot het einde van de betaalde periode. Bij jaarlijkse abonnementen kun je tot 30 dagen na afsluiting een volledige terugbetaling aanvragen.",
  },
  {
    question: "Zijn de vragen gebaseerd op het echte CBR-examen?",
    answer:
      "Onze vragendatabase is samengesteld door verkeersinstructeurs en examenconsultants op basis van de officiële CBR-leerstof en exameneisen. Hoewel we niet officieel gelieerd zijn aan het CBR, zijn de vragen qua stijl, moeilijkheidsgraad en onderwerpen zo nauw mogelijk afgestemd op het echte examen.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── Features ─────────────────────────────────────────────── */}
      <section id="features" className="bg-slate-50 py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              Functies
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Alles wat je nodig hebt om te slagen
            </h2>
            <p className="text-lg text-slate-500">
              RijPro combineert bewezen leermethodes met moderne technologie voor
              de meest effectieve examenvoorbereiding.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} highlighted={i === 4} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="brand" size="lg">
              <Link href="/features">
                Alle functies bekijken
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
              Hoe het werkt
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              In drie stappen naar je rijbewijs
            </h2>
            <p className="text-lg text-slate-500">
              Geen ingewikkeld systeem. Registreer, oefen en slaag — dat is
              alles.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl">
            {/* Connector line */}
            <div
              className="absolute left-12 top-12 hidden h-[calc(100%-6rem)] w-px bg-gradient-to-b from-blue-200 via-indigo-200 to-transparent md:block"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-12">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-8">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-brand-md">
                      {step.icon}
                      <span className="mt-1 text-xs font-bold opacity-70">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="max-w-lg leading-relaxed text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories ───────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
              Categorieën
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Alle onderwerpen gedekt
            </h2>
            <p className="text-lg text-slate-500">
              Van verkeersregels tot gevaarherkenning — alle CBR-categorieën
              staan in onze database.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-card-hover"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white ${colorMap[cat.color]}`}
                >
                  {cat.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {cat.name}
                  </p>
                  <p className="text-xs text-slate-400">{cat.count} vragen</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              Ervaringen
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Wat studenten zeggen
            </h2>
            <p className="text-lg text-slate-500">
              Meer dan 50.000 studenten gingen je voor. Dit zijn hun verhalen.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {[
              { label: "50.000+ studenten", icon: "👥" },
              { label: "4.8/5 gemiddelde beoordeling", icon: "⭐" },
              { label: "95% slagingspercentage", icon: "🏆" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing Preview ──────────────────────────────────────── */}
      <section id="pricing" className="bg-slate-50 py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              Prijzen
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Transparante, eerlijke prijzen
            </h2>
            <p className="text-lg text-slate-500">
              Geen verborgen kosten. Kies het plan dat bij jou past en start
              vandaag nog.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={i} {...plan} />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-slate-400">
            Alle plannen inclusief 7 dagen gratis proberen. Geen creditcard
            vereist.
          </p>

          <div className="mt-6 text-center">
            <Link
              href="/pricing"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Bekijk volledige prijsvergelijking →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ Preview ──────────────────────────────────────────── */}
      <section id="faq" className="bg-white py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                Veelgestelde vragen
              </span>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Antwoorden op jouw vragen
              </h2>
              <p className="text-lg text-slate-500">
                Staat jouw vraag er niet bij? Neem dan contact op via onze
                helpdesk.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-slate-200">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline hover:text-blue-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Bekijk alle veelgestelde vragen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        {/* Gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)",
          }}
          aria-hidden="true"
        />

        <div className="container relative text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-blue-200" />
              <span className="text-sm font-medium text-blue-200">
                7 dagen gratis proberen — geen creditcard vereist
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Begin vandaag met oefenen
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-blue-200">
              Sluit je aan bij 50.000+ studenten die met RijPro geslaagd zijn.
              Gratis starten, geen verplichtingen.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="xl"
                className="w-full bg-white text-blue-700 hover:bg-blue-50 sm:w-auto"
              >
                <Link href="/register">
                  Maak gratis account aan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto"
              >
                <Link href="/pricing">Bekijk plannen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
