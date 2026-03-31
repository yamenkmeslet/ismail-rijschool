import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = {
  nl: [
    { q: "Hoe werkt het CBR-theorie-examen?", a: "Het CBR-theorie-examen bestaat uit 65 vragen in 30 minuten. Je mag maximaal 10 fouten maken." },
    { q: "In welke talen kan ik studeren?", a: "RijPro is beschikbaar in Nederlands, Engels en Arabisch — inclusief vragen, uitleg en interface." },
    { q: "Kan ik mijn abonnement opzeggen?", a: "Ja, je kunt op elk moment opzeggen. Je behoudt toegang tot het einde van je betaalperiode." },
  ],
  en: [
    { q: "How does the Dutch theory exam work?", a: "The theory exam contains 65 questions in 30 minutes. You can make up to 10 mistakes to pass." },
    { q: "Which languages are supported?", a: "RijPro supports Dutch, English, and Arabic — across questions, explanations, and UI." },
    { q: "Can I cancel my subscription?", a: "Yes. You can cancel anytime and keep access until the end of your billing period." },
  ],
  ar: [
    { q: "كيف يعمل اختبار النظري الهولندي؟", a: "يتكون الاختبار من 65 سؤالا خلال 30 دقيقة يمكنك ارتكاب 10 أخطاء كحد أقصى للنجاح" },
    { q: "ما اللغات المتاحة؟", a: "يدعم RijPro الهولندية والإنجليزية والعربية داخل الأسئلة والشرح وواجهة الاستخدام" },
    { q: "هل يمكنني إلغاء الاشتراك؟", a: "نعم يمكنك الإلغاء في أي وقت مع الاحتفاظ بالوصول حتى نهاية فترة الدفع" },
  ],
} satisfies Record<Locale, { q: string; a: string }[]>

export default function FaqPage({ params }: { params: { locale: Locale } }) {
  const m = getMessages(params.locale)
  const items = faqs[params.locale]
  return (
    <section className="bg-white pt-28 pb-20 md:pt-36">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              {m.nav.faq}
            </span>
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {params.locale === "nl"
                ? "Veelgestelde vragen"
                : params.locale === "en"
                  ? "Frequently asked questions"
                  : "الأسئلة الشائعة"}
            </h1>
            <p className="text-slate-500">
              {params.locale === "nl"
                ? "Snelle, duidelijke antwoorden zodat je meteen verder kunt."
                : params.locale === "en"
                  ? "Clear answers so you can keep moving."
                  : "إجابات واضحة وسريعة لتكمل طريقك بثقة."}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {items.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-slate-200">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline hover:text-blue-700">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center text-sm text-slate-500">
            {params.locale === "nl" ? (
              <>
                Nog vragen?{" "}
                <Link className="font-semibold text-blue-600 hover:underline" href={`/${params.locale}/register`}>
                  Start gratis
                </Link>{" "}
                en vraag het in de app.
              </>
            ) : params.locale === "en" ? (
              <>
                Still questions?{" "}
                <Link className="font-semibold text-blue-600 hover:underline" href={`/${params.locale}/register`}>
                  Start free
                </Link>{" "}
                and ask inside the app.
              </>
            ) : (
              <>
                لديك أسئلة أخرى؟{" "}
                <Link className="font-semibold text-blue-600 hover:underline" href={`/${params.locale}/register`}>
                  ابدأ مجانًا
                </Link>{" "}
                واسأل داخل التطبيق.
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

