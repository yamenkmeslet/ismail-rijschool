// ─────────────────────────────────────────────────────────────────────────────
// Enums (mirrored from Prisma schema for client-side use)
// ─────────────────────────────────────────────────────────────────────────────

export type Role = "STUDENT" | "ADMIN"

export type SubscriptionPlan = "FREE" | "BASIC" | "STANDARD" | "PREMIUM"

export type SubscriptionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "CANCELLED"
  | "PAST_DUE"
  | "TRIALING"

export type QuestionType = "MCQ" | "IMAGE" | "VIDEO"

export type Difficulty = "EASY" | "MEDIUM" | "HARD"

export type QuestionStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"

export type OptionKey = "A" | "B" | "C" | "D"

export type Language = "nl" | "ar" | "en"

export type ContentBlockType =
  | "TEXT"
  | "HTML"
  | "MARKDOWN"
  | "IMAGE"
  | "VIDEO"
  | "FAQ"
  | "HERO"
  | "FEATURE"

// ─────────────────────────────────────────────────────────────────────────────
// User
// ─────────────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  name: string | null
  role: Role
  subscriptionPlan: SubscriptionPlan
  avatar: string | null
  language: Language
  emailVerified: Date | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserWithStats extends User {
  _count: {
    attempts: number
    mockExams: number
    savedQuestions: number
  }
  subscription: Subscription | null
}

export interface UserProfile {
  id: string
  email: string
  name: string | null
  avatar: string | null
  language: Language
  subscriptionPlan: SubscriptionPlan
  role: Role
  createdAt: Date
}

// ─────────────────────────────────────────────────────────────────────────────
// Category
// ─────────────────────────────────────────────────────────────────────────────

export interface CategoryTranslation {
  id: string
  categoryId: string
  language: Language
  title: string
  description: string | null
}

export interface Category {
  id: string
  slug: string
  iconName: string | null
  color: string | null
  sortOrder: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  translations: CategoryTranslation[]
}

export interface CategoryWithCount extends Category {
  _count: {
    questions: number
  }
}

export interface CategoryLocalised {
  id: string
  slug: string
  iconName: string | null
  color: string | null
  title: string
  description: string | null
  questionCount?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Answer Options
// ─────────────────────────────────────────────────────────────────────────────

export interface AnswerOptionTranslation {
  id: string
  answerId: string
  language: Language
  text: string
}

export interface AnswerOption {
  id: string
  questionId: string
  optionKey: OptionKey
  isCorrect: boolean
  sortOrder: number
  translations: AnswerOptionTranslation[]
}

export interface AnswerOptionLocalised {
  id: string
  optionKey: OptionKey
  isCorrect: boolean
  text: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Question
// ─────────────────────────────────────────────────────────────────────────────

export interface QuestionTranslation {
  id: string
  questionId: string
  language: Language
  questionText: string
  explanation: string | null
}

export interface Question {
  id: string
  type: QuestionType
  categoryId: string
  difficulty: Difficulty
  status: QuestionStatus
  mediaUrl: string | null
  videoUrl: string | null
  tags: string[]
  sortOrder: number
  createdAt: Date
  updatedAt: Date
  category?: Category
  translations: QuestionTranslation[]
  answerOptions: AnswerOption[]
}

export interface QuestionLocalised {
  id: string
  type: QuestionType
  categoryId: string
  difficulty: Difficulty
  status: QuestionStatus
  mediaUrl: string | null
  videoUrl: string | null
  tags: string[]
  questionText: string
  explanation: string | null
  answerOptions: AnswerOptionLocalised[]
  category?: CategoryLocalised
}

export interface QuestionWithStats extends Question {
  _count: {
    attempts: number
    savedBy: number
  }
  correctRate?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Quiz / Practice
// ─────────────────────────────────────────────────────────────────────────────

export interface QuizQuestion extends QuestionLocalised {
  userAnswer?: OptionKey
  isAnswered: boolean
  isSaved: boolean
}

export interface QuizState {
  questions: QuizQuestion[]
  currentIndex: number
  totalQuestions: number
  answeredCount: number
  correctCount: number
  incorrectCount: number
  isComplete: boolean
  startedAt: Date
  completedAt: Date | null
  timeSpentMs: number
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  skipped: number
  score: number
  passed: boolean
  timeSpentMs: number
  questionResults: Array<{
    question: QuestionLocalised
    selectedAnswer: OptionKey | null
    isCorrect: boolean
  }>
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock Exam
// ─────────────────────────────────────────────────────────────────────────────

export interface MockExam {
  id: string
  userId: string
  startedAt: Date
  completedAt: Date | null
  score: number | null
  totalQuestions: number
  passed: boolean | null
  durationMs: number | null
}

export interface MockExamQuestion {
  id: string
  mockExamId: string
  questionId: string
  selectedAnswer: OptionKey | null
  isCorrect: boolean | null
  answeredAt: Date | null
  question?: QuestionLocalised
}

export interface MockExamWithQuestions extends MockExam {
  questions: MockExamQuestion[]
}

export interface MockExamResult {
  examId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  passed: boolean
  durationMs: number
  passThreshold: number
  categoryBreakdown: Array<{
    categoryId: string
    categoryTitle: string
    total: number
    correct: number
    percentage: number
  }>
}

// ─────────────────────────────────────────────────────────────────────────────
// User Attempt & Progress
// ─────────────────────────────────────────────────────────────────────────────

export interface UserQuestionAttempt {
  id: string
  userId: string
  questionId: string
  selectedAnswer: OptionKey
  isCorrect: boolean
  timeSpentMs: number | null
  attemptedAt: Date
  question?: QuestionLocalised
}

export interface UserProgress {
  totalAttempts: number
  correctAttempts: number
  incorrectAttempts: number
  accuracy: number
  totalQuestionsAttempted: number
  categoryProgress: Array<{
    categoryId: string
    categoryTitle: string
    total: number
    attempted: number
    correct: number
    accuracy: number
  }>
  recentActivity: Array<{
    date: string
    attempts: number
    correct: number
  }>
  streakDays: number
  lastActiveAt: Date | null
}

export interface SavedQuestion {
  id: string
  userId: string
  questionId: string
  savedAt: Date
  notes: string | null
  question?: QuestionLocalised
}

// ─────────────────────────────────────────────────────────────────────────────
// Subscription
// ─────────────────────────────────────────────────────────────────────────────

export interface Subscription {
  id: string
  userId: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  startDate: Date | null
  endDate: Date | null
  trialEndDate: Date | null
  stripeSubscriptionId: string | null
  stripeCustomerId: string | null
  stripePriceId: string | null
  cancelAtPeriodEnd: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionPlanDetails {
  id: SubscriptionPlan
  name: string
  nameNl: string
  nameAr: string
  price: number
  priceYearly: number
  currency: string
  features: string[]
  featuresNl: string[]
  featuresAr: string[]
  maxQuestionsPerDay: number | null
  hasUnlimitedAccess: boolean
  hasMockExams: boolean
  hasExplanations: boolean
  hasProgressTracking: boolean
  hasPrioritySupport: boolean
  stripePriceId: string | null
  stripePriceIdYearly: string | null
  isPopular: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Content Blocks (CMS)
// ─────────────────────────────────────────────────────────────────────────────

export interface ContentBlockTranslation {
  id: string
  contentBlockId: string
  language: Language
  title: string | null
  body: string | null
  mediaUrl: string | null
  ctaLabel: string | null
  ctaUrl: string | null
}

export interface ContentBlock {
  id: string
  key: string
  type: ContentBlockType
  isActive: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
  translations: ContentBlockTranslation[]
}

export interface ContentBlockLocalised {
  id: string
  key: string
  type: ContentBlockType
  title: string | null
  body: string | null
  mediaUrl: string | null
  ctaLabel: string | null
  ctaUrl: string | null
}

// ─────────────────────────────────────────────────────────────────────────────
// API Response Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface QuestionFilterParams extends PaginationParams {
  categoryId?: string
  difficulty?: Difficulty
  type?: QuestionType
  status?: QuestionStatus
  tags?: string[]
  language?: Language
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin Types
// ─────────────────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalQuestions: number
  publishedQuestions: number
  totalAttempts: number
  totalMockExams: number
  revenueThisMonth: number
  subscriptionBreakdown: Record<SubscriptionPlan, number>
  newUsersThisWeek: number
  newUsersThisMonth: number
}

export interface AdminUserRow extends UserProfile {
  subscriptionStatus: SubscriptionStatus | null
  totalAttempts: number
  lastActiveAt: Date | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Form Types
// ─────────────────────────────────────────────────────────────────────────────

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  language: Language
  agreeToTerms: boolean
}

export interface CreateQuestionFormData {
  type: QuestionType
  categoryId: string
  difficulty: Difficulty
  status: QuestionStatus
  mediaUrl?: string
  videoUrl?: string
  tags: string[]
  translations: Array<{
    language: Language
    questionText: string
    explanation?: string
  }>
  answerOptions: Array<{
    optionKey: OptionKey
    isCorrect: boolean
    translations: Array<{
      language: Language
      text: string
    }>
  }>
}

export interface ProfileUpdateFormData {
  name: string
  avatar?: string
  language: Language
}

export interface PasswordChangeFormData {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  href: string
  label: string
  labelNl: string
  labelAr: string
  icon?: string
  badge?: string
  isExternal?: boolean
  children?: NavLink[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Types
// ─────────────────────────────────────────────────────────────────────────────

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type WithId<T> = T & { id: string }

export type Nullable<T> = T | null

export type AsyncFn<T = void, A extends unknown[] = []> = (...args: A) => Promise<T>

export type LoadingState = "idle" | "loading" | "success" | "error"
