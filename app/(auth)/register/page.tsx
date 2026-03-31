"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Loader2, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Naam moet minimaal 2 tekens bevatten"),
    email: z.string().email("Voer een geldig e-mailadres in"),
    password: z
      .string()
      .min(8, "Wachtwoord moet minimaal 8 tekens bevatten")
      .regex(/[A-Z]/, "Moet minimaal één hoofdletter bevatten")
      .regex(/[0-9]/, "Moet minimaal één cijfer bevatten"),
    confirmPassword: z.string(),
    language: z.string().min(1, "Selecteer een taal"),
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: "Je moet de voorwaarden accepteren",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Wachtwoorden komen niet overeen",
    path: ["confirmPassword"],
  })

type RegisterFormData = z.infer<typeof registerSchema>

const FREE_FEATURES = [
  "50 gratis oefenvragen per dag",
  "2 oefenexamens per maand",
  "Voortgang bijhouden",
  "Geen creditcard vereist",
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { acceptTerms: false },
  })

  const acceptTerms = watch("acceptTerms")
  const password = watch("password") ?? ""

  const passwordStrength = (() => {
    if (!password) return 0
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  })()

  const strengthLabels = ["", "Zwak", "Matig", "Goed", "Sterk"]
  const strengthColors = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"]

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    console.log(data)
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
            <Sparkles className="h-3 w-3" />
            Gratis beginnen
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Begin vandaag</h1>
        <p className="text-sm text-gray-500">
          Maak je gratis account aan en begin meteen met oefenen
        </p>
      </div>

      {/* Free plan highlights */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
        <p className="text-xs font-semibold text-blue-700 mb-2.5 uppercase tracking-wide">Gratis proefperiode inclusief:</p>
        <div className="grid grid-cols-2 gap-1.5">
          {FREE_FEATURES.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
              <span className="text-xs text-blue-800">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Google button */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 border-gray-200 hover:bg-gray-50 font-medium"
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Aanmelden met Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-gray-400 font-medium">OF</span>
        <Separator className="flex-1" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Volledige naam
          </Label>
          <Input
            id="fullName"
            placeholder="Jan de Vries"
            className={`h-11 ${errors.fullName ? "border-red-400 focus-visible:ring-red-400" : ""}`}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mailadres
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jan@voorbeeld.nl"
            className={`h-11 ${errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Language preference */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-700">Voorkeurstaal</Label>
          <Select onValueChange={(v) => setValue("language", v)}>
            <SelectTrigger className={`h-11 ${errors.language ? "border-red-400" : ""}`}>
              <SelectValue placeholder="Selecteer een taal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nl">🇳🇱 Nederlands</SelectItem>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="ar">🇸🇦 العربية</SelectItem>
            </SelectContent>
          </Select>
          {errors.language && (
            <p className="text-xs text-red-500">{errors.language.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Wachtwoord
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimaal 8 tekens"
              className={`h-11 pr-10 ${errors.password ? "border-red-400 focus-visible:ring-red-400" : ""}`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {/* Password strength */}
          {password.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= passwordStrength ? strengthColors[passwordStrength] : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Sterkte: <span className="font-medium">{strengthLabels[passwordStrength]}</span>
              </p>
            </div>
          )}
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Wachtwoord bevestigen
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Herhaal je wachtwoord"
              className={`h-11 pr-10 ${errors.confirmPassword ? "border-red-400 focus-visible:ring-red-400" : ""}`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <Checkbox
              id="acceptTerms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setValue("acceptTerms", !!checked)}
              className="mt-0.5"
            />
            <Label htmlFor="acceptTerms" className="text-sm text-gray-600 cursor-pointer font-normal leading-snug">
              Ik ga akkoord met de{" "}
              <Link href="/voorwaarden" className="text-blue-600 hover:underline">
                Gebruiksvoorwaarden
              </Link>{" "}
              en het{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacybeleid
              </Link>
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-xs text-red-500">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Account aanmaken...
            </>
          ) : (
            "Account aanmaken — Gratis"
          )}
        </Button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-gray-500">
        Al een account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          Log hier in
        </Link>
      </p>
    </div>
  )
}
