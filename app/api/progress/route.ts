import { NextRequest, NextResponse } from "next/server"
import { isDemoAuthMode } from "@/lib/auth/mode"
import { demoPostProgressResponse, getDemoProgress } from "@/lib/demo/demo-progress"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")
    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 })
    }

    if (isDemoAuthMode()) {
      return NextResponse.json(getDemoProgress(userId))
    }

    const { getUserProgress } = await import("@/services/questions")
    const progress = await getUserProgress(userId)
    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (isDemoAuthMode()) {
      await request.json().catch(() => ({}))
      return NextResponse.json(demoPostProgressResponse())
    }

    const { prisma } = await import("@/lib/prisma")
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
    console.error("Error saving attempt:", error)
    return NextResponse.json({ error: "Failed to save attempt" }, { status: 500 })
  }
}
