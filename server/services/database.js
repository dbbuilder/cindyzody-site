/**
 * SQLite Database Service
 * Handles persistence for contacts and appointments
 */

import Database from 'better-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Database file path
const DB_DIR = join(__dirname, '../../data')
const DB_PATH = join(DB_DIR, 'cindyzody.db')

// Ensure data directory exists
if (!existsSync(DB_DIR)) {
  mkdirSync(DB_DIR, { recursive: true })
}

// Initialize database connection
const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    status TEXT DEFAULT 'new'
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    service_name TEXT NOT NULL,
    service_duration INTEGER,
    service_type TEXT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    client_notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
  CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);
  CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
  CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(client_email);
  CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

  -- Practice Sessions
  CREATE TABLE IF NOT EXISTS practice_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    guest_id TEXT,
    type TEXT NOT NULL DEFAULT 'self-empathy',
    scenario_id TEXT,
    feelings TEXT DEFAULT '[]',
    needs TEXT DEFAULT '[]',
    messages TEXT DEFAULT '[]',
    summary TEXT,
    duration_seconds INTEGER,
    completed INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Daily Check-ins
  CREATE TABLE IF NOT EXISTS check_ins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    guest_id TEXT,
    date TEXT NOT NULL,
    feelings TEXT NOT NULL,
    needs TEXT,
    energy_level INTEGER,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, date),
    UNIQUE(guest_id, date)
  );

  -- User Progress
  CREATE TABLE IF NOT EXISTS user_progress (
    user_id TEXT PRIMARY KEY,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_sessions INTEGER DEFAULT 0,
    total_check_ins INTEGER DEFAULT 0,
    last_activity_date TEXT,
    feeling_counts TEXT DEFAULT '{}',
    need_counts TEXT DEFAULT '{}',
    insights TEXT DEFAULT '[]',
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_user ON practice_sessions(user_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_guest ON practice_sessions(guest_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_created ON practice_sessions(created_at);
  CREATE INDEX IF NOT EXISTS idx_checkins_user ON check_ins(user_id);
  CREATE INDEX IF NOT EXISTS idx_checkins_date ON check_ins(date);
`)

/**
 * Save a contact form submission
 */
export function saveContact({ name, email, phone, message }) {
  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, phone, message)
    VALUES (@name, @email, @phone, @message)
  `)

  const result = stmt.run({ name, email, phone: phone || null, message })
  return { id: result.lastInsertRowid }
}

/**
 * Get all contacts (for admin)
 */
export function getContacts({ limit = 50, offset = 0, status = null } = {}) {
  let query = 'SELECT * FROM contacts'
  const params = {}

  if (status) {
    query += ' WHERE status = @status'
    params.status = status
  }

  query += ' ORDER BY created_at DESC LIMIT @limit OFFSET @offset'
  params.limit = limit
  params.offset = offset

  return db.prepare(query).all(params)
}

/**
 * Update contact status
 */
export function updateContactStatus(id, status) {
  const stmt = db.prepare('UPDATE contacts SET status = @status WHERE id = @id')
  return stmt.run({ id, status })
}

/**
 * Save an appointment
 */
export function saveAppointment({ id, service, date, time, client, status = 'pending' }) {
  const stmt = db.prepare(`
    INSERT INTO appointments (
      id, service_name, service_duration, service_type,
      date, time, client_name, client_email, client_phone, client_notes, status
    ) VALUES (
      @id, @serviceName, @serviceDuration, @serviceType,
      @date, @time, @clientName, @clientEmail, @clientPhone, @clientNotes, @status
    )
  `)

  return stmt.run({
    id,
    serviceName: service.name,
    serviceDuration: service.duration,
    serviceType: service.type || null,
    date,
    time,
    clientName: client.name,
    clientEmail: client.email,
    clientPhone: client.phone || null,
    clientNotes: client.notes || null,
    status
  })
}

/**
 * Get appointment by ID
 */
export function getAppointment(id) {
  return db.prepare('SELECT * FROM appointments WHERE id = @id').get({ id })
}

/**
 * Get appointments (for admin)
 */
export function getAppointments({ limit = 50, offset = 0, status = null, fromDate = null } = {}) {
  let query = 'SELECT * FROM appointments WHERE 1=1'
  const params = {}

  if (status) {
    query += ' AND status = @status'
    params.status = status
  }

  if (fromDate) {
    query += ' AND date >= @fromDate'
    params.fromDate = fromDate
  }

  query += ' ORDER BY date ASC, time ASC LIMIT @limit OFFSET @offset'
  params.limit = limit
  params.offset = offset

  return db.prepare(query).all(params)
}

/**
 * Update appointment status
 */
export function updateAppointmentStatus(id, status) {
  const stmt = db.prepare(`
    UPDATE appointments
    SET status = @status, updated_at = datetime('now')
    WHERE id = @id
  `)
  return stmt.run({ id, status })
}

/**
 * Get counts for dashboard
 */
export function getDashboardStats() {
  const contacts = db.prepare(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new
    FROM contacts
  `).get()

  const appointments = db.prepare(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed
    FROM appointments
  `).get()

  return { contacts, appointments }
}

// ============================================
// PRACTICE SESSIONS
// ============================================

/**
 * Save or update a practice session
 */
export function saveSession({ id, userId, guestId, type, scenarioId, feelings, needs, messages, summary, durationSeconds, completed }) {
  const stmt = db.prepare(`
    INSERT INTO practice_sessions (id, user_id, guest_id, type, scenario_id, feelings, needs, messages, summary, duration_seconds, completed)
    VALUES (@id, @userId, @guestId, @type, @scenarioId, @feelings, @needs, @messages, @summary, @durationSeconds, @completed)
    ON CONFLICT(id) DO UPDATE SET
      feelings = @feelings,
      needs = @needs,
      messages = @messages,
      summary = @summary,
      duration_seconds = @durationSeconds,
      completed = @completed,
      updated_at = datetime('now')
  `)

  return stmt.run({
    id,
    userId: userId || null,
    guestId: guestId || null,
    type: type || 'self-empathy',
    scenarioId: scenarioId || null,
    feelings: JSON.stringify(feelings || []),
    needs: JSON.stringify(needs || []),
    messages: JSON.stringify(messages || []),
    summary: summary ? JSON.stringify(summary) : null,
    durationSeconds: durationSeconds || null,
    completed: completed ? 1 : 0
  })
}

/**
 * Get a session by ID
 */
export function getSession(id) {
  const row = db.prepare('SELECT * FROM practice_sessions WHERE id = @id').get({ id })
  if (!row) return null

  return {
    ...row,
    feelings: JSON.parse(row.feelings || '[]'),
    needs: JSON.parse(row.needs || '[]'),
    messages: JSON.parse(row.messages || '[]'),
    summary: row.summary ? JSON.parse(row.summary) : null,
    completed: !!row.completed
  }
}

/**
 * Get sessions for a user
 */
export function getSessions({ userId, guestId, limit = 20, offset = 0 } = {}) {
  let query = 'SELECT * FROM practice_sessions WHERE '
  const params = { limit, offset }

  if (userId) {
    query += 'user_id = @userId'
    params.userId = userId
  } else if (guestId) {
    query += 'guest_id = @guestId'
    params.guestId = guestId
  } else {
    return []
  }

  query += ' ORDER BY created_at DESC LIMIT @limit OFFSET @offset'

  return db.prepare(query).all(params).map(row => ({
    ...row,
    feelings: JSON.parse(row.feelings || '[]'),
    needs: JSON.parse(row.needs || '[]'),
    messages: JSON.parse(row.messages || '[]'),
    summary: row.summary ? JSON.parse(row.summary) : null,
    completed: !!row.completed
  }))
}

/**
 * Delete a session
 */
export function deleteSession(id, userId) {
  const stmt = db.prepare('DELETE FROM practice_sessions WHERE id = @id AND (user_id = @userId OR guest_id = @userId)')
  return stmt.run({ id, userId })
}

// ============================================
// CHECK-INS
// ============================================

/**
 * Save a daily check-in
 */
export function saveCheckIn({ userId, guestId, date, feelings, needs, energyLevel, notes }) {
  const stmt = db.prepare(`
    INSERT INTO check_ins (user_id, guest_id, date, feelings, needs, energy_level, notes)
    VALUES (@userId, @guestId, @date, @feelings, @needs, @energyLevel, @notes)
    ON CONFLICT(user_id, date) DO UPDATE SET
      feelings = @feelings,
      needs = @needs,
      energy_level = @energyLevel,
      notes = @notes
  `)

  const result = stmt.run({
    userId: userId || null,
    guestId: guestId || null,
    date,
    feelings: JSON.stringify(feelings),
    needs: needs ? JSON.stringify(needs) : null,
    energyLevel: energyLevel || null,
    notes: notes || null
  })

  // Update progress
  updateProgressOnCheckIn(userId || guestId, date)

  return { id: result.lastInsertRowid }
}

/**
 * Get check-ins for a user
 */
export function getCheckIns({ userId, guestId, limit = 30, offset = 0 } = {}) {
  let query = 'SELECT * FROM check_ins WHERE '
  const params = { limit, offset }

  if (userId) {
    query += 'user_id = @userId'
    params.userId = userId
  } else if (guestId) {
    query += 'guest_id = @guestId'
    params.guestId = guestId
  } else {
    return []
  }

  query += ' ORDER BY date DESC LIMIT @limit OFFSET @offset'

  return db.prepare(query).all(params).map(row => ({
    ...row,
    feelings: JSON.parse(row.feelings || '[]'),
    needs: row.needs ? JSON.parse(row.needs) : null
  }))
}

// ============================================
// PROGRESS TRACKING
// ============================================

/**
 * Get user progress
 */
export function getProgress(userId) {
  let row = db.prepare('SELECT * FROM user_progress WHERE user_id = @userId').get({ userId })

  if (!row) {
    // Create default progress
    db.prepare(`
      INSERT INTO user_progress (user_id) VALUES (@userId)
    `).run({ userId })

    row = {
      user_id: userId,
      current_streak: 0,
      longest_streak: 0,
      total_sessions: 0,
      total_check_ins: 0,
      last_activity_date: null,
      feeling_counts: '{}',
      need_counts: '{}',
      insights: '[]'
    }
  }

  return {
    userId: row.user_id,
    currentStreak: row.current_streak,
    longestStreak: row.longest_streak,
    totalSessions: row.total_sessions,
    totalCheckIns: row.total_check_ins,
    lastActivityDate: row.last_activity_date,
    feelingCounts: JSON.parse(row.feeling_counts || '{}'),
    needCounts: JSON.parse(row.need_counts || '{}'),
    insights: JSON.parse(row.insights || '[]'),
    updatedAt: row.updated_at
  }
}

/**
 * Update progress when a check-in is made
 */
function updateProgressOnCheckIn(userId, date) {
  const progress = getProgress(userId)
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  let newStreak = progress.currentStreak

  if (progress.lastActivityDate === today) {
    // Already checked in today, no change
  } else if (progress.lastActivityDate === yesterday) {
    // Consecutive day
    newStreak = progress.currentStreak + 1
  } else {
    // Streak broken or first check-in
    newStreak = 1
  }

  const longestStreak = Math.max(newStreak, progress.longestStreak)

  db.prepare(`
    UPDATE user_progress SET
      current_streak = @currentStreak,
      longest_streak = @longestStreak,
      total_check_ins = total_check_ins + 1,
      last_activity_date = @today,
      updated_at = datetime('now')
    WHERE user_id = @userId
  `).run({
    userId,
    currentStreak: newStreak,
    longestStreak,
    today
  })
}

/**
 * Update progress when a session is completed
 */
export function updateProgressOnSession(userId, feelings = [], needs = []) {
  const progress = getProgress(userId)

  // Update feeling counts
  const feelingCounts = { ...progress.feelingCounts }
  feelings.forEach(f => {
    const id = f.id || f
    feelingCounts[id] = (feelingCounts[id] || 0) + 1
  })

  // Update need counts
  const needCounts = { ...progress.needCounts }
  needs.forEach(n => {
    const id = n.id || n
    needCounts[id] = (needCounts[id] || 0) + 1
  })

  db.prepare(`
    UPDATE user_progress SET
      total_sessions = total_sessions + 1,
      feeling_counts = @feelingCounts,
      need_counts = @needCounts,
      updated_at = datetime('now')
    WHERE user_id = @userId
  `).run({
    userId,
    feelingCounts: JSON.stringify(feelingCounts),
    needCounts: JSON.stringify(needCounts)
  })
}

/**
 * Close database connection (for graceful shutdown)
 */
export function closeDatabase() {
  db.close()
}

export default {
  // Contacts
  saveContact,
  getContacts,
  updateContactStatus,
  // Appointments
  saveAppointment,
  getAppointment,
  getAppointments,
  updateAppointmentStatus,
  // Sessions
  saveSession,
  getSession,
  getSessions,
  deleteSession,
  // Check-ins
  saveCheckIn,
  getCheckIns,
  // Progress
  getProgress,
  updateProgressOnSession,
  // Stats
  getDashboardStats,
  closeDatabase
}
