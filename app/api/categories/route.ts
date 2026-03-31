import { NextRequest, NextResponse } from 'next/server'
import { getCategories } from '@/services/questions'
import { Language } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = (searchParams.get('language') as Language) || Language.NL

    const categories = await getCategories(language)
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
