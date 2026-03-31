'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Camera,
  Save,
  Trash2
} from 'lucide-react'
import { getLocaleFromPathname } from '@/lib/i18n/path'

export default function SettingsPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const [notifications, setNotifications] = useState({
    email: true,
    studyReminder: true,
    weeklyReport: false,
    examTips: true,
  })

  const t =
    locale === 'ar'
      ? {
          title: 'الإعدادات',
          subtitle: 'إدارة إعدادات الحساب والتفضيلات',
          profileTitle: 'إعدادات الملف الشخصي',
          profileDesc: 'تحديث بياناتك الشخصية',
          changePhoto: 'تغيير الصورة',
          photoHint: 'JPG PNG GIF بحد أقصى 2MB',
          firstName: 'الاسم الأول',
          lastName: 'اسم العائلة',
          email: 'البريد الإلكتروني',
          phone: 'رقم الهاتف اختياري',
          saveProfile: 'حفظ الملف',
          langTitle: 'اللغة والمنطقة',
          langDesc: 'اختر لغة الأسئلة وواجهة التطبيق',
          qLang: 'لغة الأسئلة',
          uiLang: 'لغة الواجهة',
          langHint: 'هذا يحدد لغة عرض الأسئلة والإجابات',
          saveLang: 'حفظ إعدادات اللغة',
          notifTitle: 'الإشعارات',
          notifDesc: 'اختر الإشعارات التي تريد استلامها',
          secTitle: 'الأمان',
          secDesc: 'إدارة كلمة المرور والأمان',
          currentPw: 'كلمة المرور الحالية',
          newPw: 'كلمة مرور جديدة',
          confirmPw: 'تأكيد كلمة المرور',
          changePw: 'تغيير كلمة المرور',
          subTitle: 'الاشتراك',
          subDesc: 'إدارة الاشتراك والمدفوعات',
          active: 'نشط',
          validTo: 'صالح حتى 1 يناير 2025',
          perMonth: 'شهريا',
          changePlan: 'تغيير الخطة',
          cancel: 'إلغاء',
          dangerTitle: 'منطقة حساسة',
          dangerDesc: 'إجراءات لا يمكن التراجع عنها',
          deleteTitle: 'حذف الحساب',
          deleteDesc: 'سيتم حذف بياناتك وتقدمك واشتراكاتك بشكل نهائي',
          deleteBtn: 'حذف الحساب',
          notifItems: [
            { key: 'email' as const, title: 'إشعارات البريد', description: 'استلام إشعارات عبر البريد' },
            { key: 'studyReminder' as const, title: 'تذكير التدريب', description: 'تذكير يومي للتدريب' },
            { key: 'weeklyReport' as const, title: 'تقرير أسبوعي', description: 'ملخص أسبوعي للتقدم' },
            { key: 'examTips' as const, title: 'نصائح الامتحان', description: 'نصائح وأخبار حول الامتحان' },
          ],
        }
      : locale === 'en'
        ? {
            title: 'Settings',
            subtitle: 'Manage your account settings and preferences',
            profileTitle: 'Profile settings',
            profileDesc: 'Update your personal details',
            changePhoto: 'Change photo',
            photoHint: 'JPG PNG GIF max 2MB',
            firstName: 'First name',
            lastName: 'Last name',
            email: 'Email',
            phone: 'Phone optional',
            saveProfile: 'Save profile',
            langTitle: 'Language and region',
            langDesc: 'Set question and interface language',
            qLang: 'Question language',
            uiLang: 'Interface language',
            langHint: 'This sets the language for questions and answers',
            saveLang: 'Save language settings',
            notifTitle: 'Notifications',
            notifDesc: 'Choose which notifications you receive',
            secTitle: 'Security',
            secDesc: 'Manage password and security',
            currentPw: 'Current password',
            newPw: 'New password',
            confirmPw: 'Confirm password',
            changePw: 'Change password',
            subTitle: 'Subscription',
            subDesc: 'Manage plan and billing',
            active: 'Active',
            validTo: 'Valid until Jan 1 2025',
            perMonth: 'mo',
            changePlan: 'Change plan',
            cancel: 'Cancel',
            dangerTitle: 'Danger zone',
            dangerDesc: 'Irreversible actions',
            deleteTitle: 'Delete account',
            deleteDesc: 'This permanently removes your data progress and subscriptions',
            deleteBtn: 'Delete account',
            notifItems: [
              { key: 'email' as const, title: 'Email notifications', description: 'Receive updates by email' },
              { key: 'studyReminder' as const, title: 'Study reminder', description: 'Daily reminder to practice' },
              { key: 'weeklyReport' as const, title: 'Weekly report', description: 'Weekly progress overview' },
              { key: 'examTips' as const, title: 'Exam tips', description: 'Useful tips and news' },
            ],
          }
        : null

  return (
    <div className="max-w-3xl mx-auto space-y-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t?.title ?? 'Instellingen'}</h1>
        <p className="text-gray-600 mt-1">{t?.subtitle ?? 'Beheer je accountinstellingen en voorkeuren'}</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{t?.profileTitle ?? 'Profielinstellingen'}</CardTitle>
              <CardDescription>{t?.profileDesc ?? 'Bijwerken van je persoonlijke gegevens'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              A
            </div>
            <div>
              <Button variant="outline" size="sm" className="gap-2">
                <Camera className="w-4 h-4" />
                {t?.changePhoto ?? 'Foto wijzigen'}
              </Button>
              <p className="text-sm text-gray-500 mt-1">{t?.photoHint ?? 'JPG, PNG of GIF, max. 2MB'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t?.firstName ?? 'Voornaam'}</Label>
              <Input id="firstName" defaultValue="Ahmed" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t?.lastName ?? 'Achternaam'}</Label>
              <Input id="lastName" defaultValue="Mohammed" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t?.email ?? 'E-mailadres'}</Label>
            <Input id="email" type="email" defaultValue="ahmed@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t?.phone ?? 'Telefoonnummer (optioneel)'}</Label>
            <Input id="phone" type="tel" placeholder="+31 6 12 34 56 78" />
          </div>

          <Button className="gap-2">
            <Save className="w-4 h-4" />
            {t?.saveProfile ?? 'Profiel opslaan'}
          </Button>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Globe className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{t?.langTitle ?? 'Taal & Regio'}</CardTitle>
              <CardDescription>{t?.langDesc ?? 'Stel je voorkeurstaal in voor de oefenvragen'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t?.qLang ?? 'Voorkeurstaal voor vragen'}</Label>
            <Select defaultValue="nl">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nl">🇳🇱 Nederlands</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ar">🇸🇦 العربية</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              {t?.langHint ?? 'Dit bepaalt in welke taal de vragen en antwoorden worden weergegeven.'}
            </p>
          </div>

          <div className="space-y-2">
            <Label>{t?.uiLang ?? 'Interface-taal'}</Label>
            <Select defaultValue="nl">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nl">🇳🇱 Nederlands</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ar">🇸🇦 العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="gap-2">
            <Save className="w-4 h-4" />
            {t?.saveLang ?? 'Taalinstellingen opslaan'}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{t?.notifTitle ?? 'Meldingen'}</CardTitle>
              <CardDescription>{t?.notifDesc ?? 'Kies welke meldingen je wilt ontvangen'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(t?.notifItems ??
            [
              { key: 'email' as const, title: 'E-mailmeldingen', description: 'Ontvang meldingen via e-mail' },
              { key: 'studyReminder' as const, title: 'Studeerherinnering', description: 'Dagelijkse herinnering om te oefenen' },
              { key: 'weeklyReport' as const, title: 'Wekelijks rapport', description: 'Ontvang een overzicht van je voortgang elke week' },
              { key: 'examTips' as const, title: 'Examentips', description: 'Handige tips en nieuws over het CBR-examen' },
            ]).map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <Switch
                checked={notifications[item.key]}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, [item.key]: checked }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{t?.secTitle ?? 'Beveiliging'}</CardTitle>
              <CardDescription>{t?.secDesc ?? 'Beheer je wachtwoord en beveiliging'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">{t?.currentPw ?? 'Huidig wachtwoord'}</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">{t?.newPw ?? 'Nieuw wachtwoord'}</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t?.confirmPw ?? 'Wachtwoord bevestigen'}</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button variant="outline" className="gap-2">
            <Shield className="w-4 h-4" />
            {t?.changePw ?? 'Wachtwoord wijzigen'}
          </Button>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{t?.subTitle ?? 'Abonnement'}</CardTitle>
              <CardDescription>{t?.subDesc ?? 'Beheer je abonnement en betalingen'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">Premium Plan</p>
                <Badge className="bg-blue-600 text-white">{t?.active ?? 'Actief'}</Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{t?.validTo ?? 'Geldig tot 1 januari 2025'}</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">€24.99<span className="text-sm font-normal text-gray-500">/{t?.perMonth ?? 'mo'}</span></p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">{t?.changePlan ?? 'Plan wijzigen'}</Button>
            <Button variant="outline" className="flex-1 text-red-600 hover:bg-red-50">{t?.cancel ?? 'Opzeggen'}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-red-700">{t?.dangerTitle ?? 'Gevaarlijke zone'}</CardTitle>
              <CardDescription>{t?.dangerDesc ?? 'Onomkeerbare acties voor je account'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 space-y-3">
            <div>
              <p className="font-medium text-red-800">{t?.deleteTitle ?? 'Account verwijderen'}</p>
              <p className="text-sm text-red-600 mt-1">{t?.deleteDesc ?? 'Hiermee worden al je gegevens, voortgang en abonnementen permanent verwijderd. Dit kan niet ongedaan worden gemaakt.'}</p>
            </div>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 gap-2">
              <Trash2 className="w-4 h-4" />
              {t?.deleteBtn ?? 'Account verwijderen'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
