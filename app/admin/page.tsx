'use client'

import {
  Users,
  CreditCard,
  FileQuestion,
  CheckCircle2,
  UserPlus,
  Euro,
  TrendingUp,
  TrendingDown,
  Database,
  HardDrive,
  AlertTriangle,
  Circle,
  ArrowRight,
  BookOpen,
  Archive,
  FileEdit,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { StatsCard } from '@/components/admin/stats-card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

// Sample data
const registrationData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date('2026-03-01')
  date.setDate(date.getDate() + i)
  return {
    date: date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' }),
    users: Math.floor(Math.random() * 25) + 5,
  }
})

const categoryData = [
  { name: 'Voorrang', questions: 142, correct: 74 },
  { name: 'Verkeersborden', questions: 208, correct: 68 },
  { name: 'Snelheid', questions: 89, correct: 82 },
  { name: 'Rijbaan', questions: 113, correct: 71 },
  { name: 'Alcohol', questions: 67, correct: 88 },
  { name: 'Gevaar', questions: 95, correct: 63 },
]

const recentUsers = [
  { id: 1, name: 'Fatima El-Amin', email: 'fatima@gmail.com', plan: 'Premium', lang: 'AR', date: '31 mrt 2026', avatar: 'F' },
  { id: 2, name: 'Ahmed Yilmaz', email: 'ahmed.y@hotmail.com', plan: 'Standard', lang: 'NL', date: '31 mrt 2026', avatar: 'A' },
  { id: 3, name: 'Lars van den Berg', email: 'lars.vdb@gmail.com', plan: 'Basic', lang: 'NL', date: '30 mrt 2026', avatar: 'L' },
  { id: 4, name: 'Samira Khalil', email: 'samira.k@yahoo.com', plan: 'Premium', lang: 'AR', date: '30 mrt 2026', avatar: 'S' },
  { id: 5, name: 'Thomas Bakker', email: 'thomas.bakker@outlook.com', plan: 'Standard', lang: 'EN', date: '29 mrt 2026', avatar: 'T' },
]

const recentActivity = [
  { id: 1, type: 'question', action: 'Nieuwe vraag gepubliceerd', detail: 'Vraag #1247 – Voorrang bij kruispunt', time: '5 min geleden', color: 'bg-green-500' },
  { id: 2, type: 'user', action: 'Nieuwe registratie', detail: 'Fatima El-Amin heeft zich geregistreerd', time: '12 min geleden', color: 'bg-blue-500' },
  { id: 3, type: 'plan', action: 'Abonnement upgrade', detail: 'Ahmed Yilmaz → Premium', time: '34 min geleden', color: 'bg-purple-500' },
  { id: 4, type: 'question', action: 'Vraag gearchiveerd', detail: 'Vraag #0891 – Oud verkeersbord', time: '1 uur geleden', color: 'bg-gray-400' },
  { id: 5, type: 'content', action: 'Content blok bijgewerkt', detail: 'Homepage hero tekst (NL)', time: '2 uur geleden', color: 'bg-orange-500' },
  { id: 6, type: 'user', action: 'Nieuwe registratie', detail: 'Lars van den Berg heeft zich geregistreerd', time: '3 uur geleden', color: 'bg-blue-500' },
]

const planColors: Record<string, string> = {
  Premium: 'bg-purple-100 text-purple-700',
  Standard: 'bg-blue-100 text-blue-700',
  Basic: 'bg-gray-100 text-gray-600',
}

export default function AdminDashboardPage() {
  const today = new Date().toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5 capitalize">{today}</p>
        </div>
        <Link
          href="/admin/questions/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <FileQuestion className="w-4 h-4" />
          Nieuwe vraag
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Totaal gebruikers"
          value="4,281"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          trend={{ value: 12.4, label: 'vs vorige maand', direction: 'up' }}
        />
        <StatsCard
          title="Actieve abonnementen"
          value="1,847"
          icon={CreditCard}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          trend={{ value: 8.1, label: 'vs vorige maand', direction: 'up' }}
        />
        <StatsCard
          title="Vragen in bank"
          value="1,714"
          icon={FileQuestion}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          subtitle="714 gepubliceerd"
        />
        <StatsCard
          title="Antwoorden vandaag"
          value="28,493"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend={{ value: 3.2, label: 'vs gisteren', direction: 'up' }}
        />
        <StatsCard
          title="Nieuwe registraties"
          value="89"
          subtitle="Afgelopen 7 dagen"
          icon={UserPlus}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
          trend={{ value: 5.7, label: 'vs vorige week', direction: 'down' }}
        />
        <StatsCard
          title="Omzet deze maand"
          value="€ 8,240"
          icon={Euro}
          iconColor="text-green-600"
          iconBg="bg-green-50"
          trend={{ value: 14.2, label: 'vs vorige maand', direction: 'up' }}
        />
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">714</p>
            <p className="text-sm text-gray-500">Gepubliceerde vragen</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <FileEdit className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">247</p>
            <p className="text-sm text-gray-500">Concept vragen</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Archive className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">753</p>
            <p className="text-sm text-gray-500">Gearchiveerde vragen</p>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Registration chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Registraties laatste 30 dagen</h3>
              <p className="text-xs text-gray-400 mt-0.5">Dagelijks aantal nieuwe gebruikers</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              +12.4%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={registrationData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                interval={6}
              />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  fontSize: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category performance */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Categorie prestaties</h3>
              <p className="text-xs text-gray-400 mt-0.5">Vragen per categorie & score %</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  fontSize: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="questions" name="Vragen" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
              <Bar dataKey="correct" name="Score %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent sign-ups */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Recente registraties</h3>
            <Link
              href="/admin/users"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5"
            >
              Alle gebruikers <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Gebruiker</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Taal</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Datum</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{user.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${planColors[user.plan]}`}>{user.plan}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {user.lang}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column: activity + system health */}
        <div className="space-y-4">
          {/* Recent activity */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">Recente activiteit</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${item.color} mt-1.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700">{item.action}</p>
                    <p className="text-xs text-gray-400 truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs text-gray-300 flex-shrink-0 mt-0.5">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System health */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">Systeemstatus</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">Database</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">Operationeel</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">Laatste backup</span>
                </div>
                <span className="text-xs text-gray-500">2 uur geleden</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-gray-600">Vragen zonder vertaling</span>
                </div>
                <Badge className="text-xs bg-yellow-100 text-yellow-700">47</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">API status</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">99.9% uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
