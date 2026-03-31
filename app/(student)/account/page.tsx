'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'
import {
  Crown,
  Check,
  Zap,
  Star,
  Shield,
  Video,
  BarChart3,
  BookOpen,
  Clock,
  CreditCard,
  ArrowRight
} from 'lucide-react'
import { getLocaleFromPathname } from '@/lib/i18n/path'

const plans = [
  {
    name: 'Basic',
    price: '€9.99',
    period: '/maand',
    description: 'Ideaal voor een snelle start',
    current: false,
    color: 'gray',
    features: [
      '500 oefenvragen',
      '2 nep-examens per maand',
      'Basisvoortgang tracking',
      'Nederlands & Engels',
    ],
    missing: [
      'Videovragen',
      'Uitgebreide analytics',
      'Onbeperkt oefenen',
    ],
  },
  {
    name: 'Standard',
    price: '€14.99',
    period: '/maand',
    description: 'De meest gekozen optie',
    current: false,
    popular: true,
    color: 'blue',
    features: [
      '2.000 oefenvragen',
      '10 nep-examens per maand',
      'Uitgebreide voortgang analytics',
      'Alle 3 talen',
      'Categorieanalyse',
    ],
    missing: [
      'Videovragen',
      'Onbeperkt nep-examens',
    ],
  },
  {
    name: 'Premium',
    price: '€24.99',
    period: '/maand',
    description: 'Alles voor de perfecte voorbereiding',
    current: true,
    color: 'indigo',
    features: [
      'Volledige vragenbank (2.500+)',
      'Onbeperkte nep-examens',
      'Videovragen',
      'Alle 3 talen',
      'Uitgebreide analytics',
      'Zwakke punten coach',
      'Prioriteitsondersteuning',
    ],
    missing: [],
  },
]

export default function AccountPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)

  const copy =
    locale === 'ar'
      ? {
          title: 'اشتراكي',
          subtitle: 'إدارة الخطة ومراجعة الفواتير',
          currentPlan: 'الخطة الحالية',
          renew: 'يتجدد في 1 أبريل 2025',
          questions: 'أسئلة',
          exams: 'امتحانات',
          unlimited: 'غير محدود',
          included: 'مضمن',
          analytics: 'تحليلات',
          usage: 'الاستخدام هذا الشهر',
          answered: 'أسئلة مجابة',
          mock: 'امتحانات تجريبية',
          study: 'وقت التدريب',
          hours: 'ساعة',
          planCompare: 'مقارنة الخطط',
          popular: 'الأكثر اختيارا',
          upgrade: 'ترقية',
          billing: 'سجل الفواتير',
          paid: 'مدفوع',
          pdf: 'PDF',
        }
      : null

  return (
    <div className="max-w-5xl mx-auto space-y-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{copy?.title ?? 'Mijn abonnement'}</h1>
        <p className="text-gray-600 mt-1">{copy?.subtitle ?? 'Beheer je plan en bekijk je factuurgeschiedenis'}</p>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-300" />
              <Badge className="bg-white/20 text-white border-0">{copy?.currentPlan ?? 'Huidig plan'}</Badge>
            </div>
            <h2 className="text-3xl font-bold">Premium</h2>
            <p className="text-blue-100">Volledige toegang tot alle functies en vragenbank</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">€24.99</p>
            <p className="text-blue-200">/maand</p>
            <p className="text-sm text-blue-200 mt-2">{copy?.renew ?? 'Verlengt op 1 apr 2025'}</p>
          </div>
        </div>

        <Separator className="bg-white/20 my-4" />

        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: copy?.questions ?? 'Vragen', value: '2.500+' },
            { icon: Shield, label: copy?.exams ?? 'Examens', value: copy?.unlimited ?? 'Onbeperkt' },
            { icon: Video, label: 'Video', value: copy?.included ?? 'Inbegrepen' },
            { icon: BarChart3, label: copy?.analytics ?? 'Analytics', value: 'Uitgebreid' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-5 h-5 mx-auto text-blue-200 mb-1" />
              <p className="text-lg font-semibold">{stat.value}</p>
              <p className="text-sm text-blue-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{copy?.usage ?? 'Gebruik deze maand'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: copy?.answered ?? 'Vragen beantwoord', current: 247, total: 2500, unit: locale === 'ar' ? 'سؤال' : 'vragen' },
            { label: copy?.mock ?? 'Nep-examens afgelegd', current: 3, total: 999, unit: locale === 'ar' ? 'امتحان' : 'examens' },
            { label: copy?.study ?? 'Studietijd', current: 12, total: 999, unit: locale === 'ar' ? copy.hours : 'uur' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 font-medium">{stat.label}</span>
                <span className="text-gray-500">
                  {stat.current} / {stat.total === 999 ? 'Onbeperkt' : stat.total} {stat.unit}
                </span>
              </div>
              <Progress
                value={stat.total === 999 ? (stat.current / 100) * 10 : (stat.current / stat.total) * 100}
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{copy?.planCompare ?? 'Planvergelijking'}</h2>
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.current ? 'ring-2 ring-indigo-600 shadow-lg' : ''} ${plan.popular && !plan.current ? 'ring-2 ring-blue-400' : ''}`}
            >
              {plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-indigo-600 text-white">Huidig plan</Badge>
                </div>
              )}
              {plan.popular && !plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">{copy?.popular ?? 'Populair'}</Badge>
                </div>
              )}
              <CardHeader className="pt-6">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.missing.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm opacity-40">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                      <span className="text-gray-500 line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.current ? (
                  <Button className="w-full" variant="outline" disabled>
                    Huidig plan
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {copy?.upgrade ?? 'Upgraden'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <CardTitle className="text-lg">{copy?.billing ?? 'Factuurgeschiedenis'}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '1 mrt 2024', amount: '€24.99', status: 'Betaald', plan: 'Premium' },
              { date: '1 feb 2024', amount: '€24.99', status: 'Betaald', plan: 'Premium' },
              { date: '1 jan 2024', amount: '€24.99', status: 'Betaald', plan: 'Premium' },
              { date: '1 dec 2023', amount: '€14.99', status: 'Betaald', plan: 'Standard' },
            ].map((invoice, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded">
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{invoice.plan} Plan</p>
                    <p className="text-sm text-gray-500">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                    {locale === 'ar' ? copy?.paid ?? invoice.status : invoice.status}
                  </Badge>
                  <span className="font-semibold text-gray-900">{invoice.amount}</span>
                  <Button variant="ghost" size="sm">{copy?.pdf ?? 'PDF'}</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
