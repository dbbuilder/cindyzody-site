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

/**
 * Close database connection (for graceful shutdown)
 */
export function closeDatabase() {
  db.close()
}

export default {
  saveContact,
  getContacts,
  updateContactStatus,
  saveAppointment,
  getAppointment,
  getAppointments,
  updateAppointmentStatus,
  getDashboardStats,
  closeDatabase
}
