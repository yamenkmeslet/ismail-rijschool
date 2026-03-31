import { NextRequest, NextResponse } from "next/server"
import { isDemoAuthMode } from "@/lib/auth/mode"
import { getDemoQuestionById, parseQuestionLanguage } from "@/lib/demo/demo-questions-api"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const language = parseQuestionLanguage(request.nextUrl.searchParams.get("language"))

    if (isDemoAuthMode()) {
      return NextResponse.json(getDemoQuestionById(params.id, language))
    }

    const { Language } = await import("@prisma/client")
    const { getQuestionById } = await import("@/services/questions")
    const langEnum = language === "EN" ? Language.EN : language === "AR" ? Language.AR : Language.NL

    const question = await getQuestionById(params.id, langEnum)

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 })
    }

    return NextResponse.json(question)
  } catch (error) {
    console.error("Error fetching question:", error)
    return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (isDemoAuthMode()) {
      const body = await request.json().catch(() => ({}))
      return NextResponse.json({ id: params.id, ...body, demo: true, message: "Not persisted in demo mode" })
    }

    const { prisma } = await import("@/lib/prisma")
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
    console.error("Error updating question:", error)
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (isDemoAuthMode()) {
      return NextResponse.json({ success: true, demo: true })
    }

    const { prisma } = await import("@/lib/prisma")
    const { QuestionStatus } = await import("@prisma/client")

    await prisma.question.update({
      where: { id: params.id },
      data: { status: QuestionStatus.ARCHIVED },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting question:", error)
    return NextResponse.json({ error: "Failed to delete question" }, { status: 500 })
  }
}
