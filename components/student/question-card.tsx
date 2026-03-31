"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Play, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface AnswerOption {
  id: string
  label: "A" | "B" | "C" | "D"
  text: string
}

export interface Question {
  id: string
  number: number
  total: number
  text: string
  imageUrl?: string
  videoUrl?: string
  options: AnswerOption[]
  correctOptionId: string
  explanation?: string
  category?: string
  difficulty?: "easy" | "medium" | "hard"
}

interface QuestionCardProps {
  question: Question
  mode: "practice" | "exam"
  selectedOptionId?: string
  isSubmitted?: boolean
  onSelectOption?: (optionId: string) => void
  className?: string
}

const difficultyMap = {
  easy: { label: "Makkelijk", className: "border-green-200 text-green-700 bg-green-50" },
  medium: { label: "Gemiddeld", className: "border-orange-200 text-orange-700 bg-orange-50" },
  hard: { label: "Moeilijk", className: "border-red-200 text-red-700 bg-red-50" },
}

export default function QuestionCard({
  question,
  mode,
  selectedOptionId,
  isSubmitted = false,
  onSelectOption,
  className,
}: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false)

  const showResult = isSubmitted && mode === "practice"
  const isCorrect = selectedOptionId === question.correctOptionId

  function getOptionState(optionId: string) {
    if (!isSubmitted) {
      return selectedOptionId === optionId ? "selected" : "default"
    }
    if (optionId === question.correctOptionId) return "correct"
    if (optionId === selectedOptionId && !isCorrect) return "incorrect"
    return "disabled"
  }

  const optionStyles = {
    default: "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer",
    selected: "border-blue-500 bg-blue-50 ring-2 ring-blue-200",
    correct: "border-green-500 bg-green-50 ring-2 ring-green-200",
    incorrect: "border-red-500 bg-red-50 ring-2 ring-red-200",
    disabled: "border-gray-100 bg-gray-50 opacity-60",
  }

  const optionLabelStyles = {
    default: selectedOptionId ? "bg-gray-100 text-gray-500" : "bg-gray-100 text-gray-600",
    selected: "bg-blue-500 text-white",
    correct: "bg-green-500 text-white",
    incorrect: "bg-red-500 text-white",
    disabled: "bg-gray-100 text-gray-400",
  }

  return (
    <div className={cn("space-y-5", className)}>
      {/* Question meta */}
      <div className="flex items-center gap-2 flex-wrap">
        {question.category && (
          <Badge variant="secondary" className="text-xs">
            {question.category}
          </Badge>
        )}
        {question.difficulty && (
          <Badge variant="outline" className={cn("text-xs", difficultyMap[question.difficulty].className)}>
            {difficultyMap[question.difficulty].label}
          </Badge>
        )}
      </div>

      {/* Question text */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Vraag {question.number} van {question.total}
        </p>
        <h2 className="text-lg font-semibold text-gray-900 leading-relaxed">{question.text}</h2>
      </div>

      {/* Image */}
      {question.imageUrl && (
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
          <img
            src={question.imageUrl}
            alt="Vraag afbeelding"
            className="w-full max-h-72 object-contain mx-auto"
          />
        </div>
      )}

      {/* Video */}
      {question.videoUrl && (
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-900 aspect-video flex items-center justify-center relative group cursor-pointer">
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play className="h-6 w-6 ml-1" />
            </div>
            <p className="text-sm font-medium opacity-80">Klik om de video te bekijken</p>
          </div>
        </div>
      )}

      {/* Answer options */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const state = getOptionState(option.id)
          return (
            <button
              key={option.id}
              onClick={() => !isSubmitted && onSelectOption?.(option.id)}
              disabled={isSubmitted}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150",
                optionStyles[state]
              )}
            >
              {/* Option label */}
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold flex-shrink-0 transition-colors",
                  optionLabelStyles[state]
                )}
              >
                {state === "correct" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : state === "incorrect" ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  option.label
                )}
              </div>

              {/* Option text */}
              <span
                className={cn(
                  "text-sm font-medium leading-snug",
                  state === "correct" && "text-green-800",
                  state === "incorrect" && "text-red-800",
                  state === "selected" && "text-blue-800",
                  (state === "default" || state === "disabled") && "text-gray-700"
                )}
              >
                {option.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* Explanation (practice mode only) */}
      {showResult && question.explanation && (
        <div className="mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            className={cn(
              "w-full justify-between text-sm font-medium rounded-xl border",
              isCorrect
                ? "border-green-200 text-green-700 hover:bg-green-50 bg-green-50/50"
                : "border-red-200 text-red-700 hover:bg-red-50 bg-red-50/50"
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              {isCorrect ? "Correct! Bekijk uitleg" : "Fout. Bekijk de uitleg"}
            </div>
            {showExplanation ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          {showExplanation && (
            <div
              className={cn(
                "mt-2 p-4 rounded-xl border text-sm leading-relaxed",
                isCorrect
                  ? "bg-green-50 border-green-200 text-green-900"
                  : "bg-red-50 border-red-200 text-red-900"
              )}
            >
              {question.explanation}
            </div>
          )}
        </div>
      )}

      {/* Exam mode result indicator */}
      {isSubmitted && mode === "exam" && selectedOptionId && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          Antwoord opgeslagen
        </div>
      )}
    </div>
  )
}
