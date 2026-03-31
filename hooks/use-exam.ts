'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export interface ExamQuestion {
  id: string
  questionText: string
  explanation: string
  mediaUrl?: string | null
  videoUrl?: string | null
  type: string
  category: {
    id: string
    translations: Array<{ language: string; title: string }>
  }
  answerOptions: Array<{
    id: string
    optionKey: string
    isCorrect: boolean
    translations: Array<{ language: string; text: string }>
  }>
}

export interface ExamState {
  questions: ExamQuestion[]
  currentIndex: number
  answers: Record<string, string>
  flagged: Set<string>
  submitted: Record<string, boolean>
  isComplete: boolean
  startTime: Date
  endTime?: Date
  timeRemaining: number
  isExamMode: boolean
}

interface UseExamOptions {
  questions: ExamQuestion[]
  timeLimit?: number // in seconds, 0 = no limit
  isExamMode?: boolean
  onComplete?: (results: ExamResults) => void
}

export interface ExamResults {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  score: number
  passed: boolean
  answers: Record<string, string>
  timeTaken: number
}

export function useExam({
  questions,
  timeLimit = 0,
  isExamMode = false,
  onComplete,
}: UseExamOptions) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [isComplete, setIsComplete] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const startTimeRef = useRef(new Date())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Start timer
  useEffect(() => {
    if (timeLimit > 0 && !isComplete) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timeLimit, isComplete])

  const currentQuestion = questions[currentIndex]

  const selectAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))

    // In practice mode, auto-submit
    if (!isExamMode) {
      setSubmitted(prev => ({ ...prev, [questionId]: true }))
    }
  }, [isExamMode])

  const submitCurrentAnswer = useCallback(() => {
    if (currentQuestion && answers[currentQuestion.id]) {
      setSubmitted(prev => ({ ...prev, [currentQuestion.id]: true }))
    }
  }, [currentQuestion, answers])

  const toggleFlag = useCallback((questionId: string) => {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(questionId)) {
        next.delete(questionId)
      } else {
        next.add(questionId)
      }
      return next
    })
  }, [])

  const goToNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex, questions.length])

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }, [currentIndex])

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index)
    }
  }, [questions.length])

  const handleComplete = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setIsComplete(true)

    const correctAnswers = questions.filter(q => {
      const selectedAnswer = answers[q.id]
      const correctOption = q.answerOptions.find(o => o.isCorrect)
      return selectedAnswer === correctOption?.optionKey
    }).length

    const results: ExamResults = {
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers: questions.length - correctAnswers,
      score: Math.round((correctAnswers / questions.length) * 100),
      passed: correctAnswers >= Math.ceil(questions.length * 0.875), // 87.5% = 35/40 CBR standard
      answers,
      timeTaken: Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000),
    }

    onComplete?.(results)
  }, [questions, answers, onComplete])

  const getQuestionStatus = useCallback((questionId: string) => {
    if (!answers[questionId]) return 'unanswered'
    if (!submitted[questionId]) return 'selected'

    const question = questions.find(q => q.id === questionId)
    if (!question) return 'unanswered'

    const correctOption = question.answerOptions.find(o => o.isCorrect)
    return answers[questionId] === correctOption?.optionKey ? 'correct' : 'incorrect'
  }, [answers, submitted, questions])

  const answeredCount = Object.keys(answers).length
  const correctCount = questions.filter(q => {
    const selectedAnswer = answers[q.id]
    const correctOption = q.answerOptions.find(o => o.isCorrect)
    return submitted[q.id] && selectedAnswer === correctOption?.optionKey
  }).length

  return {
    currentQuestion,
    currentIndex,
    answers,
    submitted,
    flagged,
    isComplete,
    timeRemaining,
    answeredCount,
    correctCount,
    totalQuestions: questions.length,
    selectAnswer,
    submitCurrentAnswer,
    toggleFlag,
    goToNext,
    goToPrevious,
    goToQuestion,
    handleComplete,
    getQuestionStatus,
    isAnswered: currentQuestion ? !!answers[currentQuestion.id] : false,
    isSubmitted: currentQuestion ? !!submitted[currentQuestion.id] : false,
    isFlagged: currentQuestion ? flagged.has(currentQuestion.id) : false,
    isLastQuestion: currentIndex === questions.length - 1,
    isFirstQuestion: currentIndex === 0,
  }
}
