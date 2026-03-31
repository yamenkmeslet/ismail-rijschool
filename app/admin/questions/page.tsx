'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Eye,
  Pencil,
  MoreHorizontal,
  ChevronDown,
  CheckSquare,
  Archive,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface Question {
  id: number
  preview: string
  category: string
  type: 'MCQ' | 'Image' | 'Video'
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'published' | 'draft' | 'archived'
  languages: string[]
  createdAt: string
}

const SAMPLE_QUESTIONS: Question[] = [
  { id: 1247, preview: 'Bij een kruispunt zonder verkeersborden heeft u voorrang wanneer...', category: 'Voorrang', type: 'MCQ', difficulty: 'medium', status: 'published', languages: ['NL', 'EN', 'AR'], createdAt: '28 mrt 2026' },
  { id: 1246, preview: 'Wat betekent een rood verkeersbord met een witte balk?', category: 'Verkeersborden', type: 'Image', difficulty: 'easy', status: 'published', languages: ['NL', 'EN', 'AR'], createdAt: '28 mrt 2026' },
  { id: 1245, preview: 'Wat is de maximumsnelheid op een autosnelweg in Nederland buiten de...', category: 'Snelheid', type: 'MCQ', difficulty: 'easy', status: 'published', languages: ['NL', 'EN'], createdAt: '27 mrt 2026' },
  { id: 1244, preview: 'Wanneer moet u uw rijbaan verlaten voor een ambulance of brandweer?', category: 'Rijbaan', type: 'Video', difficulty: 'medium', status: 'draft', languages: ['NL'], createdAt: '27 mrt 2026' },
  { id: 1243, preview: 'Hoeveel promille bloed-alcoholgehalte is de wettelijke grens voor...', category: 'Alcohol & Drugs', type: 'MCQ', difficulty: 'easy', status: 'published', languages: ['NL', 'EN', 'AR'], createdAt: '26 mrt 2026' },
  { id: 1242, preview: 'U rijdt 100 km/h. Wat is de minimale volgafstand in meters tot de...', category: 'Rijbaan', type: 'MCQ', difficulty: 'hard', status: 'published', languages: ['NL', 'EN'], createdAt: '26 mrt 2026' },
  { id: 1241, preview: 'Wat moet u doen als het stoplicht oranje wordt terwijl u rijdt?', category: 'Verkeersborden', type: 'Image', difficulty: 'easy', status: 'published', languages: ['NL', 'EN', 'AR'], createdAt: '25 mrt 2026' },
  { id: 1240, preview: 'Gevaarherkenning: beschrijf de gevaren die u ziet op de volgende...', category: 'Gevaarherkenning', type: 'Video', difficulty: 'hard', status: 'draft', languages: ['NL'], createdAt: '25 mrt 2026' },
  { id: 1239, preview: 'Wat is de maximale straf voor rijden onder invloed met meer dan 1.3...', category: 'Alcohol & Drugs', type: 'MCQ', difficulty: 'medium', status: 'published', languages: ['NL', 'AR'], createdAt: '24 mrt 2026' },
  { id: 1238, preview: 'Welk bord geeft aan dat u een voorrangsweg verlaat?', category: 'Verkeersborden', type: 'Image', difficulty: 'medium', status: 'archived', languages: ['NL'], createdAt: '23 mrt 2026' },
  { id: 1237, preview: 'Op een weg met 2 rijstroken in dezelfde richting rijdt u op de rechter...', category: 'Rijbaan', type: 'MCQ', difficulty: 'medium', status: 'published', languages: ['NL', 'EN', 'AR'], createdAt: '22 mrt 2026' },
  { id: 1236, preview: 'Wat is de invloed van vermoeidheid op uw rijvaardigheid?', category: 'Gevaarherkenning', type: 'MCQ', difficulty: 'medium', status: 'published', languages: ['NL', 'EN'], createdAt: '21 mrt 2026' },
  { id: 1235, preview: 'Bij welke weersomstandigheden moet u uw dimlichten aanzetten?', category: 'Motorvoertuigen', type: 'MCQ', difficulty: 'easy', status: 'published', languages: ['NL', 'EN', 'AR'], createdAt: '20 mrt 2026' },
  { id: 1234, preview: 'Hoe berekent u de remafstand bij een snelheid van 50 km/h?', category: 'Snelheid', type: 'MCQ', difficulty: 'hard', status: 'draft', languages: ['NL'], createdAt: '19 mrt 2026' },
  { id: 1233, preview: 'Mag u links inhalen op een weg met doorgetrokken streep?', category: 'Rijbaan', type: 'Image', difficulty: 'medium', status: 'published', languages: ['NL', 'EN', 'AR'], createdAt: '18 mrt 2026' },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  published: { label: 'Gepubliceerd', className: 'bg-green-100 text-green-700' },
  draft: { label: 'Concept', className: 'bg-yellow-100 text-yellow-700' },
  archived: { label: 'Gearchiveerd', className: 'bg-gray-100 text-gray-600' },
}

const difficultyConfig: Record<string, { label: string; className: string }> = {
  easy: { label: 'Makkelijk', className: 'bg-green-100 text-green-700' },
  medium: { label: 'Gemiddeld', className: 'bg-yellow-100 text-yellow-700' },
  hard: { label: 'Moeilijk', className: 'bg-red-100 text-red-600' },
}

const typeConfig: Record<string, { className: string }> = {
  MCQ: { className: 'bg-blue-100 text-blue-700' },
  Image: { className: 'bg-indigo-100 text-indigo-700' },
  Video: { className: 'bg-orange-100 text-orange-700' },
}

export default function QuestionsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [langFilter, setLangFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const pageSize = 10

  const filtered = SAMPLE_QUESTIONS.filter((q) => {
    if (search && !q.preview.toLowerCase().includes(search.toLowerCase())) return false
    if (categoryFilter !== 'all' && q.category !== categoryFilter) return false
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false
    if (typeFilter !== 'all' && q.type !== typeFilter) return false
    if (statusFilter !== 'all' && q.status !== statusFilter) return false
    if (langFilter !== 'all' && !q.languages.includes(langFilter)) return false
    return true
  })

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(filtered.length / pageSize)

  const allSelected = paginated.length > 0 && paginated.every((q) => selectedIds.includes(q.id))
  const someSelected = paginated.some((q) => selectedIds.includes(q.id)) && !allSelected

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !paginated.some((q) => q.id === id)))
    } else {
      const newIds = paginated.map((q) => q.id).filter((id) => !selectedIds.includes(id))
      setSelectedIds((prev) => [...prev, ...newIds])
    }
  }

  const toggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const categories = Array.from(new Set(SAMPLE_QUESTIONS.map((q) => q.category)))

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vragenbeheer</h1>
          <p className="text-sm text-gray-500 mt-0.5">{SAMPLE_QUESTIONS.length} vragen in totaal</p>
        </div>
        <Link href="/admin/questions/create">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Nieuwe vraag
          </Button>
        </Link>
      </div>

      {/* Bulk actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl">
          <span className="text-sm font-medium text-blue-700">
            {selectedIds.length} geselecteerd
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 border-blue-300 text-blue-700 hover:bg-blue-100">
              <CheckSquare className="w-3.5 h-3.5" />
              Publiceer geselecteerde
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 border-blue-300 text-blue-700 hover:bg-blue-100">
              <Archive className="w-3.5 h-3.5" />
              Archiveer geselecteerde
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 border-red-300 text-red-600 hover:bg-red-50">
              <Trash2 className="w-3.5 h-3.5" />
              Verwijder geselecteerde
            </Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Zoek vragen..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(1) }}>
            <SelectTrigger className="h-9 w-[160px] text-sm">
              <SelectValue placeholder="Alle categorieën" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle categorieën</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={(v) => { setDifficultyFilter(v); setPage(1) }}>
            <SelectTrigger className="h-9 w-[140px] text-sm">
              <SelectValue placeholder="Moeilijkheid" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle niveaus</SelectItem>
              <SelectItem value="easy">Makkelijk</SelectItem>
              <SelectItem value="medium">Gemiddeld</SelectItem>
              <SelectItem value="hard">Moeilijk</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1) }}>
            <SelectTrigger className="h-9 w-[120px] text-sm">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle types</SelectItem>
              <SelectItem value="MCQ">MCQ</SelectItem>
              <SelectItem value="Image">Afbeelding</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
            <SelectTrigger className="h-9 w-[140px] text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="published">Gepubliceerd</SelectItem>
              <SelectItem value="draft">Concept</SelectItem>
              <SelectItem value="archived">Gearchiveerd</SelectItem>
            </SelectContent>
          </Select>
          <Select value={langFilter} onValueChange={(v) => { setLangFilter(v); setPage(1) }}>
            <SelectTrigger className="h-9 w-[110px] text-sm">
              <SelectValue placeholder="Taal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle talen</SelectItem>
              <SelectItem value="NL">Nederlands</SelectItem>
              <SelectItem value="EN">Engels</SelectItem>
              <SelectItem value="AR">Arabisch</SelectItem>
            </SelectContent>
          </Select>
          {(search || categoryFilter !== 'all' || difficultyFilter !== 'all' || typeFilter !== 'all' || statusFilter !== 'all' || langFilter !== 'all') && (
            <button
              onClick={() => { setSearch(''); setCategoryFilter('all'); setDifficultyFilter('all'); setTypeFilter('all'); setStatusFilter('all'); setLangFilter('all'); setPage(1) }}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Filters wissen
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={allSelected}
                    data-state={someSelected ? 'indeterminate' : allSelected ? 'checked' : 'unchecked'}
                    onCheckedChange={toggleAll}
                    className="border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vraag</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Categorie</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Niveau</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Talen</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Aangemaakt</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acties</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((q) => (
                <tr
                  key={q.id}
                  className={cn(
                    'border-b border-gray-50 hover:bg-gray-50 transition-colors',
                    selectedIds.includes(q.id) && 'bg-blue-50 hover:bg-blue-50'
                  )}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedIds.includes(q.id)}
                      onCheckedChange={() => toggleRow(q.id)}
                      className="border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-gray-400">#{q.id}</span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="text-sm text-gray-800 truncate" title={q.preview}>
                      {q.preview.length > 62 ? q.preview.slice(0, 62) + '…' : q.preview}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="bg-gray-100 text-gray-700 text-xs font-medium">{q.category}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={cn('text-xs font-medium', typeConfig[q.type]?.className)}>
                      {q.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={cn('text-xs font-medium', difficultyConfig[q.difficulty]?.className)}>
                      {difficultyConfig[q.difficulty]?.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={cn('text-xs font-medium', statusConfig[q.status]?.className)}>
                      {statusConfig[q.status]?.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {q.languages.map((lang) => (
                        <span
                          key={lang}
                          className="text-xs font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{q.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <MoreHorizontal className="w-4 h-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/questions/${q.id}/edit`} className="flex items-center gap-2">
                            <Pencil className="w-3.5 h-3.5" /> Bewerken
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5" /> Bekijken
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" /> Verwijderen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
          <p className="text-sm text-gray-500">
            {filtered.length === 0
              ? 'Geen vragen gevonden'
              : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} van ${filtered.length}`}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Vorige
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={page === p ? 'default' : 'outline'}
                size="sm"
                className={cn('h-8 w-8 p-0 text-xs', page === p && 'bg-blue-600 hover:bg-blue-700')}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Volgende
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
