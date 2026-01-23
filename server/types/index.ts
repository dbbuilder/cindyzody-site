/**
 * Server Type Definitions
 */

import type { Request, Response, NextFunction } from 'express'

// Extend Express Request with auth properties
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
      } | null
      isAuthenticated?: boolean
    }
  }
}

// API Response types
export interface ApiResponse<T = unknown> {
  status?: 'success' | 'error'
  data?: T
  error?: string
  message?: string
}

// Contact form types
export interface ContactFormData {
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  message: string
  consent: boolean
}

// Appointment types
export interface AppointmentClient {
  firstName?: string
  lastName?: string
  name?: string
  email: string
  phone?: string
  message?: string
  notes?: string
  consent?: boolean
}

export interface AppointmentService {
  id?: string
  name: string
  duration: number
  type?: string
  price?: string
}

export interface AppointmentData {
  id?: string
  service: AppointmentService
  date: string | Date
  time: number | string
  client: AppointmentClient
  timestamp?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
}

// Session types
export interface PracticeSession {
  id: string
  userId?: string | null
  guestId?: string | null
  type: 'self-empathy' | 'empathy' | 'prep' | 'scenario'
  scenarioId?: string | null
  feelings: FeelingData[]
  needs: NeedData[]
  messages: ChatMessage[]
  summary?: SessionSummary | null
  durationSeconds?: number | null
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

export interface FeelingData {
  id: string
  label?: string
  category?: string
}

export interface NeedData {
  id: string
  label?: string
  category?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
  suggestions?: MessageSuggestions
}

export interface MessageSuggestions {
  feelings?: string[]
  needs?: string[]
  followUp?: string
}

export interface SessionSummary {
  observation?: string | null
  feelings: string[]
  needs: string[]
  request?: string | null
  keyInsights: string[]
  practiceNotes: string
}

// Progress types
export interface UserProgress {
  userId: string
  currentStreak: number
  longestStreak: number
  totalSessions: number
  totalCheckIns: number
  lastActivityDate?: string | null
  feelingCounts: Record<string, number>
  needCounts: Record<string, number>
  insights: ProgressInsight[]
  updatedAt?: string
}

export interface ProgressInsight {
  type: 'top_feelings' | 'top_needs' | 'streak' | 'milestone'
  title: string
  message?: string
  data?: Array<{ id: string; count: number }>
}

export interface CheckInData {
  id?: number
  userId?: string | null
  guestId?: string | null
  date: string
  feelings: FeelingData[]
  needs?: NeedData[] | null
  energyLevel?: number | null
  notes?: string | null
  createdAt?: string
}

// AI types
export interface AISessionContext {
  feelings?: FeelingData[]
  needs?: NeedData[]
  scenario?: string | { title: string; description?: string } | null
}

export interface AIChatContext {
  selectedFeelings?: FeelingData[]
  selectedNeeds?: NeedData[]
  history?: Array<{ role: string; content: string }>
}

export interface AISessionResponse {
  sessionId: string
  type: string
  greeting: string
  suggestions: MessageSuggestions
  createdAt: string
}

export interface AIChatResponse {
  message: string
  suggestions: MessageSuggestions
  crisisDetected: boolean
}

// Database row types (for better-sqlite3)
export interface ContactRow {
  id: number
  name: string
  email: string
  phone: string | null
  message: string
  created_at: string
  status: string
}

export interface AppointmentRow {
  id: string
  service_name: string
  service_duration: number
  service_type: string | null
  date: string
  time: string
  client_name: string
  client_email: string
  client_phone: string | null
  client_notes: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface SessionRow {
  id: string
  user_id: string | null
  guest_id: string | null
  type: string
  scenario_id: string | null
  feelings: string // JSON string
  needs: string // JSON string
  messages: string // JSON string
  summary: string | null // JSON string
  duration_seconds: number | null
  completed: number // SQLite boolean
  created_at: string
  updated_at: string
}

export interface CheckInRow {
  id: number
  user_id: string | null
  guest_id: string | null
  date: string
  feelings: string // JSON string
  needs: string | null // JSON string
  energy_level: number | null
  notes: string | null
  created_at: string
}

export interface ProgressRow {
  user_id: string
  current_streak: number
  longest_streak: number
  total_sessions: number
  total_check_ins: number
  last_activity_date: string | null
  feeling_counts: string // JSON string
  need_counts: string // JSON string
  insights: string // JSON string
  updated_at: string
}

// Middleware types
export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void

export type ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void

// Logger types
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogContext {
  module?: string
  [key: string]: unknown
}

export interface Logger {
  debug: (message: string, context?: LogContext) => void
  info: (message: string, context?: LogContext) => void
  warn: (message: string, context?: LogContext) => void
  error: (message: string, context?: LogContext) => void
  child: (defaultContext: LogContext) => Logger
}
