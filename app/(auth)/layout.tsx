import Link from "next/link"
import { Car, CheckCircle2, Users, BookOpen, Award } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col justify-between p-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3 w-fit">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
            <Car className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Rijschool Platform</span>
        </Link>

        {/* Center content */}
        <div className="relative space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Haal je rijbewijs <br />
              <span className="text-blue-200">met vertrouwen</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-sm leading-relaxed">
              Leer op jouw eigen tempo met duizenden CBR-vragen, oefenexamens en gedetailleerde uitleg.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              { icon: BookOpen, text: "2.500+ officiële CBR oefenvragen" },
              { icon: CheckCircle2, text: "Direct feedback na elk antwoord" },
              { icon: Award, text: "Realistische oefenexamens" },
              { icon: Users, text: "Beschikbaar in NL, EN en AR" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 border border-white/20 flex-shrink-0">
                  <Icon className="h-4 w-4 text-blue-100" />
                </div>
                <span className="text-blue-50 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="relative grid grid-cols-3 gap-4">
          {[
            { value: "12.400+", label: "Studenten" },
            { value: "94%", label: "Slagingspercentage" },
            { value: "4.8★", label: "Beoordeling" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-blue-200 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 p-6 border-b border-gray-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Rijschool Platform</span>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 text-center text-xs text-gray-400 border-t border-gray-100">
          © 2026 Rijschool Platform ·{" "}
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/voorwaarden" className="hover:text-gray-600 transition-colors">
            Voorwaarden
          </Link>
        </div>
      </div>
    </div>
  )
}
