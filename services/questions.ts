import { prisma } from '@/lib/prisma'
import { Difficulty, Language, QuestionStatus, QuestionType } from '@prisma/client'

export interface GetQuestionsOptions {
  categoryId?: string
  difficulty?: Difficulty
  type?: QuestionType
  status?: QuestionStatus
  language?: Language
  page?: number
  limit?: number
  search?: string
}

export async function getQuestions(options: GetQuestionsOptions = {}) {
  const {
    categoryId,
    difficulty,
    type,
    status = QuestionStatus.PUBLISHED,
    language = Language.NL,
    page = 1,
    limit = 20,
    search,
  } = options

  const skip = (page - 1) * limit

  const where = {
    ...(categoryId && { categoryId }),
    ...(difficulty && { difficulty }),
    ...(type && { type }),
    ...(status && { status }),
    ...(search && {
      translations: {
        some: {
          language,
          questionText: { contains: search, mode: 'insensitive' as const },
        },
      },
    }),
  }

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      skip,
      take: limit,
      include: {
        translations: { where: { language } },
        answerOptions: {
          include: {
            translations: { where: { language } },
          },
          orderBy: { optionKey: 'asc' },
        },
        category: {
          include: {
            translations: { where: { language } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.question.count({ where }),
  ])

  return {
    questions,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getQuestionById(id: string, language: Language = Language.NL) {
  return prisma.question.findUnique({
    where: { id },
    include: {
      translations: { where: { language } },
      answerOptions: {
        include: {
          translations: { where: { language } },
        },
        orderBy: { optionKey: 'asc' },
      },
      category: {
        include: {
          translations: { where: { language } },
        },
      },
    },
  })
}

export async function getRandomQuestions(options: {
  categoryId?: string
  difficulty?: Difficulty
  count: number
  language?: Language
  excludeIds?: string[]
}) {
  const { categoryId, difficulty, count, language = Language.NL, excludeIds = [] } = options

  const questions = await prisma.question.findMany({
    where: {
      status: QuestionStatus.PUBLISHED,
      ...(categoryId && { categoryId }),
      ...(difficulty && { difficulty }),
      ...(excludeIds.length > 0 && { id: { notIn: excludeIds } }),
    },
    include: {
      translations: { where: { language } },
      answerOptions: {
        include: {
          translations: { where: { language } },
        },
        orderBy: { optionKey: 'asc' },
      },
      category: {
        include: {
          translations: { where: { language } },
        },
      },
    },
  })

  // Shuffle and take count
  const shuffled = questions.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export async function getCategories(language: Language = Language.NL) {
  const categories = await prisma.category.findMany({
    include: {
      translations: { where: { language } },
      _count: {
        select: { questions: true },
      },
    },
    orderBy: { slug: 'asc' },
  })

  return categories
}

export async function getUserProgress(userId: string) {
  const [attempts, savedQuestions, mockExams] = await Promise.all([
    prisma.userQuestionAttempt.findMany({
      where: { userId },
      include: {
        question: {
          include: {
            category: {
              include: { translations: true },
            },
          },
        },
      },
      orderBy: { attemptedAt: 'desc' },
    }),
    prisma.savedQuestion.count({ where: { userId } }),
    prisma.mockExam.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      take: 10,
    }),
  ])

  const totalAnswered = attempts.length
  const correctAnswers = attempts.filter(a => a.isCorrect).length
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0

  // Group by category
  const categoryStats = attempts.reduce((acc, attempt) => {
    const catId = attempt.question.categoryId
    if (!acc[catId]) {
      acc[catId] = {
        categoryId: catId,
        category: attempt.question.category,
        total: 0,
        correct: 0,
      }
    }
    acc[catId].total++
    if (attempt.isCorrect) acc[catId].correct++
    return acc
  }, {} as Record<string, { categoryId: string; category: typeof attempts[0]['question']['category']; total: number; correct: number }>)

  const categoryStatsArray = Object.values(categoryStats).map(stat => ({
    ...stat,
    accuracy: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
  }))

  return {
    totalAnswered,
    correctAnswers,
    incorrectAnswers: totalAnswered - correctAnswers,
    accuracy,
    savedQuestions,
    mockExams,
    categoryStats: categoryStatsArray,
    recentAttempts: attempts.slice(0, 20),
  }
}
