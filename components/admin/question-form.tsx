'use client'

import { useState } from 'react'
import { Plus, Trash2, CheckCircle2, Image as ImageIcon, Link2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MediaUpload } from '@/components/admin/media-upload'
import { cn } from '@/lib/utils'

export interface QuestionFormData {
  content: { nl: string; en: string; ar: string }
  explanation: { nl: string; en: string; ar: string }
  options: Array<{
    id: string
    content: { nl: string; en: string; ar: string }
    isCorrect: boolean
  }>
  status: string
  type: string
  categoryId: string
  difficulty: string
  tags: string
  imageUrl?: string
  videoUrl?: string
}

interface QuestionFormProps {
  initialData?: Partial<QuestionFormData>
  onSubmit?: (data: QuestionFormData) => void
  onSaveDraft?: (data: QuestionFormData) => void
  submitLabel?: string
  isSubmitting?: boolean
}

const CATEGORIES = [
  { value: 'voorrang', label: 'Voorrang' },
  { value: 'verkeersborden', label: 'Verkeersborden' },
  { value: 'rijbaan', label: 'Rijbaan & Rijstroken' },
  { value: 'snelheid', label: 'Snelheid' },
  { value: 'alcohol', label: 'Alcohol & Drugs' },
  { value: 'motorvoertuigen', label: 'Motorvoertuigen' },
  { value: 'gevaarherkenning', label: 'Gevaarherkenning' },
  { value: 'milieu', label: 'Milieu & Brandstof' },
]

const defaultOption = () => ({
  id: `opt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
  content: { nl: '', en: '', ar: '' },
  isCorrect: false,
})

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E']

export function QuestionForm({
  initialData,
  onSubmit,
  onSaveDraft,
  submitLabel = 'Publiceren',
  isSubmitting = false,
}: QuestionFormProps) {
  const [content, setContent] = useState(
    initialData?.content ?? { nl: '', en: '', ar: '' }
  )
  const [explanation, setExplanation] = useState(
    initialData?.explanation ?? { nl: '', en: '', ar: '' }
  )
  const [options, setOptions] = useState(
    initialData?.options ?? [
      { ...defaultOption(), isCorrect: true },
      defaultOption(),
      defaultOption(),
      defaultOption(),
    ]
  )
  const [status, setStatus] = useState(initialData?.status ?? 'draft')
  const [type, setType] = useState(initialData?.type ?? 'mcq')
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? '')
  const [difficulty, setDifficulty] = useState(initialData?.difficulty ?? 'medium')
  const [tags, setTags] = useState(initialData?.tags ?? '')
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl ?? '')
  const [previewLang, setPreviewLang] = useState<'nl' | 'en' | 'ar'>('nl')
  const [activeLang, setActiveLang] = useState<'nl' | 'en' | 'ar'>('nl')

  const getFormData = (): QuestionFormData => ({
    content,
    explanation,
    options,
    status,
    type,
    categoryId,
    difficulty,
    tags,
    videoUrl,
  })

  const setCorrect = (id: string) => {
    setOptions((prev) => prev.map((o) => ({ ...o, isCorrect: o.id === id })))
  }

  const updateOption = (id: string, lang: 'nl' | 'en' | 'ar', value: string) => {
    setOptions((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, content: { ...o.content, [lang]: value } } : o
      )
    )
  }

  const addOption = () => {
    if (options.length >= 5) return
    setOptions((prev) => [...prev, defaultOption()])
  }

  const removeOption = (id: string) => {
    if (options.length <= 2) return
    setOptions((prev) => {
      const filtered = prev.filter((o) => o.id !== id)
      if (!filtered.some((o) => o.isCorrect)) {
        filtered[0].isCorrect = true
      }
      return filtered
    })
  }

  const statusColors: Record<string, string> = {
    draft: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-600',
  }

  const difficultyColors: Record<string, string> = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main form — left 2/3 */}
      <div className="lg:col-span-2 space-y-6">
        {/* Question content */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-800">Vraag tekst</h3>
          </div>
          <div className="p-5">
            <Tabs value={activeLang} onValueChange={(v) => setActiveLang(v as 'nl' | 'en' | 'ar')}>
              <TabsList className="mb-4">
                <TabsTrigger value="nl" className="gap-1.5">
                  <span>🇳🇱</span> Nederlands
                </TabsTrigger>
                <TabsTrigger value="en" className="gap-1.5">
                  <span>🇬🇧</span> Engels
                </TabsTrigger>
                <TabsTrigger value="ar" className="gap-1.5">
                  <span>🇸🇦</span> Arabisch
                </TabsTrigger>
              </TabsList>

              {(['nl', 'en', 'ar'] as const).map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-4">
                  <div>
                    <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block">
                      Vraag tekst ({lang.toUpperCase()})
                    </Label>
                    <Textarea
                      value={content[lang]}
                      onChange={(e) =>
                        setContent((prev) => ({ ...prev, [lang]: e.target.value }))
                      }
                      placeholder={`Voer de vraag in ${lang === 'nl' ? 'het Nederlands' : lang === 'en' ? 'het Engels' : 'het Arabisch'} in...`}
                      rows={3}
                      className={cn('resize-none', lang === 'ar' && 'direction-rtl text-right')}
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block">
                      Uitleg ({lang.toUpperCase()})
                    </Label>
                    <Textarea
                      value={explanation[lang]}
                      onChange={(e) =>
                        setExplanation((prev) => ({ ...prev, [lang]: e.target.value }))
                      }
                      placeholder="Uitleg waarom het antwoord correct is..."
                      rows={2}
                      className="resize-none"
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        {/* Answer options */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Antwoordopties</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addOption}
              disabled={options.length >= 5}
              className="h-7 text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Optie toevoegen
            </Button>
          </div>
          <div className="p-5 space-y-3">
            <Tabs value={activeLang}>
              <TabsList className="mb-4 h-7">
                {(['nl', 'en', 'ar'] as const).map((lang) => (
                  <TabsTrigger
                    key={lang}
                    value={lang}
                    className="text-xs h-6 px-2"
                    onClick={() => setActiveLang(lang)}
                  >
                    {lang.toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>

              {options.map((option, idx) => (
                <div
                  key={option.id}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                    option.isCorrect
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setCorrect(option.id)}
                    className={cn(
                      'mt-2 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors',
                      option.isCorrect
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300 hover:border-green-400'
                    )}
                    title="Markeer als correct"
                  >
                    {option.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </button>

                  <div className="w-7 h-7 mt-1.5 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-gray-500">
                      {OPTION_LABELS[idx]}
                    </span>
                  </div>

                  <div className="flex-1">
                    <Input
                      value={option.content[activeLang]}
                      onChange={(e) => updateOption(option.id, activeLang, e.target.value)}
                      placeholder={`Antwoord ${OPTION_LABELS[idx]}...`}
                      className="h-8 text-sm"
                      dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>

                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(option.id)}
                      className="mt-2 w-5 h-5 rounded flex items-center justify-center hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </Tabs>

            <p className="text-xs text-gray-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              Klik op de cirkel links om het juiste antwoord te markeren
            </p>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-800">Media (optioneel)</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" />
                Afbeelding uploaden
              </Label>
              <MediaUpload accept="image/*" multiple={false} />
            </div>
            <Separator />
            <div>
              <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5" />
                Video URL (YouTube / Vimeo)
              </Label>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="h-9"
              />
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              Live voorbeeld
            </h3>
            <div className="flex items-center gap-1">
              {(['nl', 'en', 'ar'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setPreviewLang(lang)}
                  className={cn(
                    'px-2 py-0.5 text-xs rounded font-medium transition-colors',
                    previewLang === lang
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  )}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="p-5">
            <div className="bg-gray-50 rounded-lg p-4 space-y-4" dir={previewLang === 'ar' ? 'rtl' : 'ltr'}>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm font-medium text-gray-800 flex-1">
                  {content[previewLang] || (
                    <span className="text-gray-400 italic">Nog geen vraag tekst...</span>
                  )}
                </p>
              </div>
              <div className="space-y-2 ml-9">
                {options.map((opt, idx) => (
                  <div
                    key={opt.id}
                    className={cn(
                      'flex items-center gap-3 p-2.5 rounded-lg border text-sm',
                      opt.isCorrect
                        ? 'border-green-300 bg-green-50 text-green-800'
                        : 'border-gray-200 bg-white text-gray-700'
                    )}
                  >
                    <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {OPTION_LABELS[idx]}
                    </span>
                    <span>
                      {opt.content[previewLang] || (
                        <span className="text-gray-300 italic">Optie {OPTION_LABELS[idx]}...</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              {explanation[previewLang] && (
                <div className="ml-9 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-semibold text-blue-700 mb-1">Uitleg:</p>
                  <p className="text-xs text-blue-600">{explanation[previewLang]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar — 1/3 */}
      <div className="space-y-4">
        {/* Status & publish */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Publicatie</h3>
            <Badge className={cn('text-xs', statusColors[status] ?? '')}>
              {status === 'draft' ? 'Concept' : status === 'published' ? 'Gepubliceerd' : 'Gearchiveerd'}
            </Badge>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <Label className="text-xs text-gray-600 mb-1 block">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Concept</SelectItem>
                  <SelectItem value="published">Gepubliceerd</SelectItem>
                  <SelectItem value="archived">Gearchiveerd</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8"
                onClick={() => onSaveDraft?.(getFormData())}
              >
                Concept opslaan
              </Button>
              <Button
                type="button"
                size="sm"
                className="flex-1 text-xs h-8 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setStatus('published')
                  onSubmit?.(getFormData())
                }}
                disabled={isSubmitting}
              >
                {submitLabel}
              </Button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-800">Instellingen</h3>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <Label className="text-xs text-gray-600 mb-1 block">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">Multiple Choice</SelectItem>
                  <SelectItem value="image">Afbeelding</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-gray-600 mb-1 block">Categorie</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Selecteer categorie" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-gray-600 mb-1 block">Moeilijkheidsgraad</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Makkelijk</SelectItem>
                  <SelectItem value="medium">Gemiddeld</SelectItem>
                  <SelectItem value="hard">Moeilijk</SelectItem>
                </SelectContent>
              </Select>
              {difficulty && (
                <Badge
                  className={cn(
                    'mt-1.5 text-xs',
                    difficultyColors[difficulty]
                  )}
                >
                  {difficulty === 'easy' ? 'Makkelijk' : difficulty === 'medium' ? 'Gemiddeld' : 'Moeilijk'}
                </Badge>
              )}
            </div>

            <div>
              <Label className="text-xs text-gray-600 mb-1 block">Tags</Label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="voorrang, bord, snelheid..."
                className="h-8 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">Komma-gescheiden</p>
            </div>

            {tags && (
              <div className="flex flex-wrap gap-1 pt-1">
                {tags.split(',').map((tag) =>
                  tag.trim() ? (
                    <Badge
                      key={tag.trim()}
                      variant="secondary"
                      className="text-xs px-1.5 py-0"
                    >
                      {tag.trim()}
                    </Badge>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
