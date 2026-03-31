"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Check,
  Minus,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PricingCard } from "@/components/marketing/pricing-card"
import { cn } from "@/lib/utils"

// ─── Data ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Basis",
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    description: "Perfect om te beginnen met oefenen",
    ctaLabel: "Begin met Basis",
    popular: false,
    features: [
      { text: "500 oefenvragen", included: true },
      { text: "3 oefenexamens per maand", included: true },
      { text: "Basisvoortgangsoverzicht", included: true },
      { text: "1 taal naar keuze", included: true },
      { text: "Adaptief leersysteem", included: false },
      { text: "Onbeperkte oefenexamens", included: false },
      { text: "Alle 3 talen", included: false },
      { text: "Uitgebreide statistieken", included: false },
      { text: "Prioriteitsondersteuning", included: false },
    ],
  },
  {
    name: "Standaard",
    monthlyPrice: 14.99,
    annualPrice: 11.99,
    description: "Onze meest gekozen optie voor slagen",
    ctaLabel: "Begin met Standaard",
    popular: true,
    features: [
      { text: "2.000+ oefenvragen", included: true },
      { text: "Onbeperkte oefenexamens", included: true },
      { text: "Uitgebreide voortgangsanalyse", included: true },
      { text: "Alle 3 talen", included: true },
      { text: "Adaptief leersysteem", included: true },
      { text: "Expertuitleg per vraag", included: true },
      { text: "Studieplan op maat", included: true },
      { text: "Uitgebreide statistieken", included: false },
      { text: "Prioriteitsondersteuning", included: false },
    ],
  },
  {
    name: "Premium",
    monthlyPrice: 24.99,
    annualPrice: 19.99,
    description: "Alles wat je nodig hebt, plus meer",
    ctaLabel: "Begin met Premium",
    popular: false,
    features: [
      { text: "2.000+ oefenvragen", included: true },
      { text: "Onbeperkte oefenexamens", included: true },
      { text: "Uitgebreide voortgangsanalyse", included: true },
      { text: "Alle 3 talen", included: true },
      { text: "Adaptief leersysteem", included: true },
      { text: "Expertuitleg per vraag", included: true },
      { text: "Studieplan op maat", included: true },
      { text: "Geavanceerde statistieken & AI-tips", included: true },
      { text: "Prioriteitsondersteuning (24/7)", included: true },
    ],
  },
]

// Feature comparison rows
const comparisonFeatures = [
  {
    category: "Oefenmateriaal",
    items: [
      {
        label: "Oefenvragen",
        basic: "500",
        standard: "2.000+",
        premium: "2.000+",
      },
      {
        label: "Oefenexamens per maand",
        basic: "3",
        standard: "Onbeperkt",
        premium: "Onbeperkt",
      },
      {
        label: "Visuele vragen (afbeeldingen)",
        basic: true,
        standard: true,
        premium: true,
      },
      {
        label: "Gevaarherkenningsvideo's",
        basic: false,
        standard: true,
        premium: true,
      },
    ],
  },
  {
    category: "Leren & Analyse",
    items: [
      {
        label: "Basisvoortgangsoverzicht",
        basic: true,
        standard: true,
        premium: true,
      },
      {
        label: "Adaptief leersysteem",
        basic: false,
        standard: true,
        premium: true,
      },
      {
        label: "Uitgebreide statistieken",
        basic: false,
        standard: true,
        premium: true,
      },
      {
        label: "Geavanceerde AI-tips",
        basic: false,
        standard: false,
        premium: true,
      },
    ],
  },
  {
    category: "Talen & Toegankelijkheid",
    items: [
      {
        label: "Beschikbare talen",
        basic: "1",
        standard: "3",
        premium: "3",
      },
      {
        label: "RTL Arabisch ondersteuning",
        basic: false,
        standard: true,
        premium: true,
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        label: "Community forum",
        basic: true,
        standard: true,
        premium: true,
      },
      {
        label: "E-mailondersteuning",
        basic: false,
        standard: true,
        premium: true,
      },
      {
        label: "Prioriteitsondersteuning (24/7)",
        basic: false,
        standard: false,
        premium: true,
      },
    ],
  },
]

const pricingFaqs = [
  {
    q: "Kan ik mijn abonnement op elk moment opzeggen?",
    a: "Ja, je kunt op elk moment opzeggen zonder boetes. Je behoudt toegang tot het einde van de betaalde periode. Bij jaarlijkse abonnementen heb je recht op volledige terugbetaling binnen 30 dagen na afsluiting.",
  },
  {
    q: "Is er een gratis proefperiode?",
    a: "Ja! Elk betaald plan begint met een gratis proefperiode van 7 dagen. Je hebt volledige toegang tot alle functies van het gekozen plan en wordt pas na 7 dagen gefactureerd. Je kunt ook starten met onze gratis basisversie zonder tijdslimiet.",
  },
  {
    q: "Kan ik van plan wisselen?",
    a: "Ja, je kunt op elk moment upgraden of downgraden. Bij een upgrade heb je onmiddellijk toegang tot de extra functies. Bij een downgrade gaat de wijziging in na het einde van de huidige betaalperiode.",
  },
  {
    q: "Welke betaalmethoden worden geaccepteerd?",
    a: "We accepteren iDEAL, creditcards (Visa, Mastercard, American Express), PayPal en Bancontact. Alle betalingen worden verwerkt via Stripe, een veilige betalingsverwerker.",
  },
  {
    q: "Is er korting voor rijscholen of groepen?",
    a: "Ja! Voor rijscholen en groepen van 5 of meer studenten bieden we speciale groepstarieven. Neem contact op via sales@rijpro.nl voor een offerte op maat.",
  },
]

// ─── Comparison cell helper ───────────────────────────────────────────────────

function Cell({
  value,
  highlight,
}: {
  value: boolean | string
  highlight?: boolean
}) {
  if (typeof value === "boolean") {
    return (
      <td
        className={cn(
          "px-4 py-3 text-center",
          highlight && "bg-blue-600/5"
        )}
      >
        {value ? (
          <Check className="mx-auto h-5 w-5 text-blue-600" />
        ) : (
          <Minus className="mx-auto h-4 w-4 text-slate-300" />
        )}
      </td>
    )
  }
  return (
    <td
      className={cn(
        "px-4 py-3 text-center text-sm font-medium",
        highlight ? "bg-blue-600/5 text-blue-700" : "text-slate-600"
      )}
    >
      {value}
    </td>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pb-16 pt-32 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -bottom-16 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-100/40 blur-3xl" />
        </div>

        <div className="container relative text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Prijzen
          </span>
          <h1 className="mx-auto mb-4 max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Eerlijk geprijsd,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              geen verrassingen
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-slate-500">
            Kies het plan dat bij jouw situatie past. Alle plannen starten met
            7 dagen gratis uitproberen.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-lg px-5 py-2 text-sm font-medium transition-colors",
                !annual
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Maandelijks
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-colors",
                annual
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Jaarlijks
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                Bespaar 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="bg-white pb-20 pt-8">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            {plans.map((plan, i) => (
              <PricingCard
                key={i}
                name={plan.name}
                price={plan.monthlyPrice}
                annualPrice={plan.annualPrice}
                description={plan.description}
                features={plan.features}
                ctaLabel={plan.ctaLabel}
                popular={plan.popular}
                annual={annual}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 text-center text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>Alle plannen inclusief 7 dagen gratis. Geen creditcard vereist.</span>
            </div>
            <p>Niet gelieerd aan het CBR. Uitsluitend voor studieleerdoeleinden.</p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-slate-50 py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900">
              Vergelijk alle functies
            </h2>
            <p className="text-slate-500">
              Een compleet overzicht van wat elk plan inhoudt.
            </p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="w-1/2 px-6 py-4 text-left font-semibold text-slate-500 md:w-2/5">
                      Functie
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-slate-700">
                      Basis
                    </th>
                    <th className="bg-blue-600/5 px-4 py-4 text-center font-bold text-blue-700">
                      Standaard
                      <span className="ml-1.5 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
                        Populair
                      </span>
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-slate-700">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((group) => (
                    <>
                      <tr
                        key={group.category}
                        className="border-b border-slate-100 bg-slate-50"
                      >
                        <td
                          colSpan={4}
                          className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-400"
                        >
                          {group.category}
                        </td>
                      </tr>
                      {group.items.map((item, j) => (
                        <tr
                          key={j}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-6 py-3 text-slate-700">
                            {item.label}
                          </td>
                          <Cell value={item.basic} />
                          <Cell value={item.standard} highlight />
                          <Cell value={item.premium} />
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900">
                Vragen over prijzen
              </h2>
              <p className="text-slate-500">
                Alles wat je wil weten over onze abonnementen en betaling.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {pricingFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`pfaq-${i}`}
                  className="border-slate-200"
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline hover:text-blue-700">
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 shrink-0 text-blue-400" />
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800"
          aria-hidden="true"
        />
        <div className="container relative text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
            Klaar om te starten?
          </h2>
          <p className="mb-10 text-lg text-blue-200">
            7 dagen gratis uitproberen. Annuleer op elk moment.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="xl"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Link href="/register">
                Begin gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/contact">Neem contact op</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
