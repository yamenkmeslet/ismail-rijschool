import { NextRequest, NextResponse } from 'next/server'
import { getQuestions } from '@/services/questions'
import { Difficulty, Language, QuestionStatus, QuestionType } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const categoryId = searchParams.get('categoryId') || undefined
    const difficulty = (searchParams.get('difficulty') as Difficulty) || undefined
    const type = (searchParams.get('type') as QuestionType) || undefined
    const status = (searchParams.get('status') as QuestionStatus) || undefined
    const language = (searchParams.get('language') as Language) || Language.NL
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || undefined

    const result = await getQuestions({
      categoryId,
      difficulty,
      type,
      status,
      language,
      page,
      limit,
      search,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}
