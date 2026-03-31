import { NextRequest, NextResponse } from 'next/server'
import { getQuestionById } from '@/services/questions'
import { prisma } from '@/lib/prisma'
import { Language, QuestionStatus } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const language = (searchParams.get('language') as Language) || Language.NL

    const question = await getQuestionById(params.id, language)

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    return NextResponse.json(question)
  } catch (error) {
    console.error('Error fetching question:', error)
    return NextResponse.json({ error: 'Failed to fetch question' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const question = await prisma.question.update({
      where: { id: params.id },
      data: {
        type: body.type,
        categoryId: body.categoryId,
        difficulty: body.difficulty,
        status: body.status,
        mediaUrl: body.mediaUrl,
        videoUrl: body.videoUrl,
        tags: body.tags || [],
      },
    })

    return NextResponse.json(question)
  } catch (error) {
    console.error('Error updating question:', error)
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.question.update({
      where: { id: params.id },
      data: { status: QuestionStatus.ARCHIVED },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting question:', error)
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 })
  }
}
