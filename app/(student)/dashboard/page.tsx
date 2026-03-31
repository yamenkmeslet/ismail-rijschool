"use client"

import Link from "next/link"
import {
  TrendingUp,
  Target,
  Flame,
  Award,
  Dumbbell,
  ClipboardCheck,
  XCircle,
  Grid3x3,
  ArrowRight,
  Clock,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  Calendar,
  Zap,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import StatsCard from "@/components/student/stats-card"

const today = new Date()
const dayNames = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
const monthNames = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
]

function getGreeting() {
  const hour = today.getHours()
  if (hour < 12) return "Goedemorgen"
  if (hour < 18) return "Goedemiddag"
  return "Goedenavond"
}

const categoryReadiness = [
  { name: "Verkeerstekens", score: 88, color: "bg-green-500" },
  { name: "Voorrang regels", score: 72, color: "bg-blue-500" },
  { name: "Gevaarherkenning", score: 61, color: "bg-orange-500" },
  { name: "Rijvaardigheid", score: 54, color: "bg-red-500" },
  { name: "Milieu & economie", score: 90, color: "bg-green-500" },
  { name: "Veilig rijgedrag", score: 78, color: "bg-blue-500" },
]

const weakAreas = [
  { name: "Gevaarherkenning", accuracy: 61, questions: 45, icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Rijvaardigheid", accuracy: 54, questions: 38, icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  { name: "Rijstroken & wisselen", accuracy: 67, questions: 22, icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50" },
]

const recentActivity = [
  { id: 1, type: "practice", category: "Verkeerstekens", score: 18, total: 20, date: "Vandaag, 09:14", passed: true },
  { id: 2, type: "exam", category: "Nep-examen #12", score: 36, total: 40, date: "Gisteren, 19:30", passed: true },
  { id: 3, type: "practice", category: "Gevaarherkenning", score: 9, total: 15, date: "Gisteren, 15:22", passed: false },
  { id: 4, type: "practice", category: "Voorrang regels", score: 14, total: 20, date: "2 dagen geleden", passed: true },
  { id: 5, type: "exam", category: "Nep-examen #11", score: 33, total: 40, date: "3 dagen geleden", passed: false },
]

const quickActions = [
  { label: "Snel oefenen", sublabel: "10 willekeurige vragen", href: "/practice", icon: Dumbbell, color: "from-blue-500 to-blue-600", hover: "hover:from-blue-600 hover:to-blue-700" },
  { label: "Nep-examen", sublabel: "40 vragen, 45 minuten", href: "/exam", icon: ClipboardCheck, color: "from-indigo-500 to-indigo-600", hover: "hover:from-indigo-600 hover:to-indigo-700" },
  { label: "Fouten herhalen", sublabel: "23 foute antwoorden", href: "/wrong-answers", icon: XCircle, color: "from-orange-500 to-orange-600", hover: "hover:from-orange-600 hover:to-orange-700" },
  { label: "Per categorie", sublabel: "Kies je onderwerp", href: "/categories", icon: Grid3x3, color: "from-violet-500 to-violet-600", hover: "hover:from-violet-600 hover:to-violet-700" },
]

// Circular progress SVG helper
function CircularProgress({ value, size = 120, strokeWidth = 10 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  const color = value >= 80 ? "#22c55e" : value >= 60 ? "#3b82f6" : "#f97316"

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
    </svg>
  )
}

export default function DashboardPage() {
  const greeting = getGreeting()
  const dateStr = `${dayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`
  const examReadiness = 73

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">

      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {greeting}, Jan! 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm capitalize">
            {dateStr} · Klaar om te oefenen?
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50 gap-1.5 text-sm px-3 py-1.5">
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            7 dagen streak
          </Badge>
          <Link href="/practice">
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Zap className="h-4 w-4" />
              Snel oefenen
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={TrendingUp}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          title="Vragen beantwoord"
          value="1.847"
          description="Totaal beantwoord"
          trend={12}
          trendLabel="deze week"
        />
        <StatsCard
          icon={Target}
          iconColor="text-green-600"
          iconBg="bg-green-50"
          title="Nauwkeurigheid"
          value="74%"
          description="Gemiddeld correct"
          trend={5}
          trendLabel="vs. vorige week"
        />
        <StatsCard
          icon={Flame}
          iconColor="text-orange-500"
          iconBg="bg-orange-50"
          title="Oefenstreak"
          value="7 dagen"
          description="Langste: 14 dagen"
          trend={0}
          trendLabel="gelijk"
        />
        <StatsCard
          icon={Award}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
          title="Examengereedheid"
          value="73%"
          description="Doel: 87% om te slagen"
          trend={8}
          trendLabel="deze maand"
        />
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Exam readiness - spans 1 col */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Examengereedheid</h2>
            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
              CBR standaard
            </Badge>
          </div>

          {/* Circular gauge */}
          <div className="flex items-center justify-center relative">
            <CircularProgress value={examReadiness} size={140} strokeWidth={12} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{examReadiness}%</span>
              <span className="text-xs text-gray-500">gereed</span>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="space-y-3">
            {categoryReadiness.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 truncate">{cat.name}</span>
                  <span className="font-semibold text-gray-700 ml-2">{cat.score}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${cat.color}`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle column */}
        <div className="space-y-5">
          {/* Continue learning */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Verder leren</h2>
              <Badge className="bg-blue-100 text-blue-700 text-xs border-0">Aanbevolen</Badge>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 flex-shrink-0">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">Gevaarherkenning</p>
                <p className="text-xs text-gray-500 mt-0.5">Gestopt bij vraag 18 van 45</p>
                <Progress value={40} className="h-1.5 mt-2" />
              </div>
            </div>
            <Link href="/categories/voorrang">
              <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 gap-2 text-sm">
                Ga verder <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Upcoming exam */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-200" />
              <span className="text-sm font-medium text-blue-100">Gepland examen</span>
            </div>
            <div>
              <p className="text-2xl font-bold">18 april 2026</p>
              <p className="text-blue-200 text-sm mt-1">Over 18 dagen · CBR Rijswijk</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: "73%" }} />
              </div>
              <span className="text-xs text-blue-100 font-medium">73% klaar</span>
            </div>
            <p className="text-xs text-blue-200">
              Je hebt nog <strong className="text-white">14% verbetering</strong> nodig om zeker te slagen.
            </p>
          </div>
        </div>

        {/* Right column - recent activity */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recente activiteit</h2>
            <Link href="/progress" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Alles <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={item.id} className="flex items-start gap-3">
                {/* Timeline dot */}
                <div className="flex flex-col items-center flex-shrink-0 mt-1">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      item.passed ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {item.passed ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-red-500" />
                    )}
                  </div>
                  {i < recentActivity.length - 1 && (
                    <div className="w-px h-full min-h-[20px] bg-gray-100 mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.category}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs flex-shrink-0 ${
                        item.passed
                          ? "border-green-200 text-green-700 bg-green-50"
                          : "border-red-200 text-red-700 bg-red-50"
                      }`}
                    >
                      {item.score}/{item.total}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">Snelle acties</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(({ label, sublabel, href, icon: Icon, color, hover }) => (
            <Link key={href} href={href}>
              <div
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${color} ${hover} p-5 text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer h-full`}
              >
                <Icon className="h-7 w-7 mb-3 opacity-90" />
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs opacity-75 mt-0.5">{sublabel}</p>
                <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 opacity-50" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Weak areas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Zwakke punten om op te focussen</h2>
          <Link href="/progress" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            Alle statistieken <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {weakAreas.map((area) => (
            <div key={area.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 ${area.bg}`}>
                <area.icon className={`h-5 w-5 ${area.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{area.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={area.accuracy} className="h-1.5 flex-1" />
                  <span className="text-xs font-medium text-gray-500 flex-shrink-0">{area.accuracy}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{area.questions} vragen gedaan</p>
              </div>
              <Link href={`/practice/${area.name.toLowerCase().replace(/ /g, "-")}`}>
                <Button size="sm" variant="outline" className="text-xs h-8 flex-shrink-0">
                  Oefen
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
