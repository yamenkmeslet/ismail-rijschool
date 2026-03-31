'use client'

import { useState, useEffect } from 'react'

interface CategoryStat {
  categoryId: string
  category: {
    id: string
    translations: Array<{ language: string; title: string; description: string }>
  }
  total: number
  correct: number
  accuracy: number
}

interface MockExam {
  id: string
  score: number
  totalQuestions: number
  passed: boolean
  startedAt: string
  completedAt: string | null
}

interface Progress {
  totalAnswered: number
  correctAnswers: number
  incorrectAnswers: number
  accuracy: number
  savedQuestions: number
  mockExams: MockExam[]
  categoryStats: CategoryStat[]
  recentAttempts: Array<{
    id: string
    questionId: string
    isCorrect: boolean
    attemptedAt: string
  }>
}

export function useProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    const fetchProgress = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/progress?userId=${userId}`)
        if (!res.ok) throw new Error('Failed to fetch progress')
        const data = await res.json()
        setProgress(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [userId])

  const examReadiness = progress ? Math.min(100, Math.round(
    (progress.accuracy * 0.6) +
    (Math.min(progress.totalAnswered / 200, 1) * 100 * 0.2) +
    (progress.mockExams.filter(e => e.passed).length > 0 ? 20 : 0)
  )) : 0

  const weakCategories = progress?.categoryStats
    .filter(s => s.total >= 5 && s.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3) || []

  const strongCategories = progress?.categoryStats
    .filter(s => s.total >= 5 && s.accuracy >= 80)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 3) || []

  return {
    progress,
    loading,
    error,
    examReadiness,
    weakCategories,
    strongCategories,
  }
}
