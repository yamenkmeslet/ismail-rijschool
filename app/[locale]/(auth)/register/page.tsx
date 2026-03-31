"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Loader2, Sparkles, CheckCircle2 } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const schema = z
  .object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    language: z.enum(["nl", "en", "ar"]),
    acceptTerms: z.boolean(),
  })
  .refine((d) => d.password === d.confirmPassword, { path: ["confirmPassword"], message: "password_mismatch" })

type FormData = z.infer<typeof schema>

export default function LocalizedRegisterPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const copy = useMemo(() => {
    if (params.locale === "ar") {
      return {
        badge: "ابدأ مجانا",
        title: "أنشئ حسابك",
        subtitle: "سجل خلال دقيقة وابدأ التدريب مباشرة",
        freeTitle: "يشمل الحساب المجاني",
        free: ["أسئلة تدريب يومية", "محاكاة امتحان", "متابعة التقدم", "بدون بطاقة"],
        or: "أو",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        language: "اللغة",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        termsA: "أوافق على",
        termsB: "الشروط",
        termsC: "وسياسة الخصوصية",
        submit: "إنشاء حساب",
        have: "لديك حساب",
        login: "تسجيل الدخول",
      }
    }
    if (params.locale === "en") {
      return {
        badge: "Start free",
        title: "Create your account",
        subtitle: "Sign up in a minute and start practicing",
        freeTitle: "Free plan includes",
        free: ["Daily practice", "Mock exam", "Progress tracking", "No card needed"],
        or: "OR",
        fullName: "Full name",
        email: "Email",
        language: "Language",
        password: "Password",
        confirmPassword: "Confirm password",
        termsA: "I agree to the",
        termsB: "Terms",
        termsC: "and Privacy Policy",
        submit: "Create account",
        have: "Already have an account",
        login: "Log in",
      }
    }
    return {
      badge: "Gratis beginnen",
      title: "Begin vandaag",
      subtitle: "Maak je account aan en begin meteen met oefenen",
      freeTitle: "Gratis proefperiode inclusief",
      free: ["Dagelijks oefenen", "Oefenexamens", "Voortgang bijhouden", "Geen creditcard"],
      or: "OF",
      fullName: "Volledige naam",
      email: "E-mailadres",
      language: "Voorkeurstaal",
      password: "Wachtwoord",
      confirmPassword: "Wachtwoord bevestigen",
      termsA: "Ik ga akkoord met de",
      termsB: "Gebruiksvoorwaarden",
      termsC: "en het Privacybeleid",
      submit: "Account aanmaken",
      have: "Al een account",
      login: "Log in",
    }
  }, [params.locale])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { acceptTerms: true, language: params.locale },
  })

  const acceptTerms = watch("acceptTerms")

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    console.log("demo-register", data)
    router.push(`/${params.locale}/dashboard`)
    router.refresh()
  }

  return (
    <div className="space-y-6" dir={params.locale === "ar" ? "rtl" : "ltr"}>
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-3 justify-start">
          <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
            <Sparkles className="h-3 w-3" />
            {copy.badge}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{copy.title}</h1>
        <p className="text-sm text-gray-500">{copy.subtitle}</p>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
        <p className="text-xs font-semibold text-blue-700 mb-2.5 uppercase tracking-wide">{copy.freeTitle}</p>
        <div className="grid grid-cols-2 gap-1.5">
          {copy.free.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
              <span className="text-xs text-blue-800">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-gray-400 font-medium">{copy.or}</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            {copy.fullName}
          </Label>
          <Input id="fullName" className="h-11" {...register("fullName")} />
          {errors.fullName && <p className="text-xs text-red-500">{params.locale === "ar" ? "الاسم مطلوب" : "Required"}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            {copy.email}
          </Label>
          <Input id="email" type="email" className="h-11" {...register("email")} />
          {errors.email && <p className="text-xs text-red-500">{params.locale === "ar" ? "بريد غير صالح" : "Invalid email"}</p>}
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-700">{copy.language}</Label>
          <Select defaultValue={params.locale} onValueChange={(v) => setValue("language", v as any)}>
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nl">🇳🇱 Nederlands</SelectItem>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="ar">🇸🇦 العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            {copy.password}
          </Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} className="h-11 pr-10" {...register("password")} />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            {copy.confirmPassword}
          </Label>
          <div className="relative">
            <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} className="h-11 pr-10" {...register("confirmPassword")} />
            <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{params.locale === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match"}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <Checkbox id="acceptTerms" checked={acceptTerms} onCheckedChange={(c) => setValue("acceptTerms", !!c)} className="mt-0.5" />
            <Label htmlFor="acceptTerms" className="text-sm text-gray-600 cursor-pointer font-normal leading-snug">
              {copy.termsA}{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                {copy.termsB}
              </Link>{" "}
              {copy.termsC}
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {params.locale === "ar" ? "جاري الإنشاء" : "Creating"}
            </>
          ) : (
            copy.submit
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        {copy.have}{" "}
        <Link href={`/${params.locale}/login`} className="text-blue-600 hover:text-blue-700 font-semibold">
          {copy.login}
        </Link>
      </p>
    </div>
  )
}

