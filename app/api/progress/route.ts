import { NextRequest, NextResponse } from 'next/server'
import { getUserProgress } from '@/services/questions'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const progress = await getUserProgress(userId)
    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, questionId, selectedAnswer, isCorrect } = body

    const attempt = await prisma.userQuestionAttempt.create({
      data: {
        userId,
        questionId,
        selectedAnswer,
        isCorrect,
      },
    })

    return NextResponse.json(attempt)
  } catch (error) {
    console.error('Error saving attempt:', error)
    return NextResponse.json({ error: 'Failed to save attempt' }, { status: 500 })
  }
}
