# Technical Architecture Supplement

## Purpose

This document addresses critical technical gaps identified in the Gap Analysis, providing specifications for authentication, data synchronization, error handling, and infrastructure decisions.

---

## 1. Authentication Architecture

### Decision: Supabase Auth

**Rationale:**
- Integrated with PostgreSQL (our chosen database)
- Built-in Row Level Security (RLS)
- Social auth providers included
- Self-hosted option available
- Free tier sufficient for MVP

### User States

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER STATE MACHINE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────┐     Sign Up     ┌────────────┐                   │
│   │  Guest   │ ───────────────►│ Registered │                   │
│   │ (anon)   │                 │   (free)   │                   │
│   └──────────┘                 └────────────┘                   │
│        │                              │                          │
│        │ Data limited                 │ Subscribe                │
│        │ to device                    ▼                          │
│        │                       ┌────────────┐                   │
│        │                       │  Premium   │                   │
│        │                       │   (paid)   │                   │
│        │                       └────────────┘                   │
│        │                              │                          │
│        │                              │ Cancel                   │
│        │                              ▼                          │
│        │                       ┌────────────┐                   │
│        │                       │   Churned  │                   │
│        │                       │ (limited)  │                   │
│        │                       └────────────┘                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Guest User Capabilities

| Feature | Guest | Registered | Premium |
|---------|-------|------------|---------|
| Feelings/Needs reference | Full | Full | Full |
| Daily check-in | 7 days history | Unlimited | Unlimited |
| AI sessions | 3 total | 5/month | Unlimited |
| Save sessions | Device only | Cloud sync | Cloud sync |
| Progress tracking | Basic | Full | Full |
| Two-person sessions | No | Yes | Yes |
| Conversation prep | No | Limited | Full |
| Pattern insights | No | No | Yes |

### Authentication Flow

```typescript
// Auth state interface
interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  isGuest: boolean
}

// User interface
interface User {
  id: string
  email: string
  created_at: string
  subscription_tier: 'free' | 'premium'
  subscription_expires_at: string | null
  preferences: UserPreferences
}

// Guest user (local storage)
interface GuestUser {
  device_id: string
  created_at: string
  sessions_used: number
  last_checkin: string | null
}
```

### Sign Up Options

1. **Email/Password** - Primary method
2. **Apple Sign In** - Required for iOS App Store
3. **Google Sign In** - Popular option
4. **Guest conversion** - Seamless upgrade preserving data

### Session Management

- JWT tokens with 1-hour expiry
- Refresh tokens with 7-day expiry
- Automatic refresh on app foreground
- Secure token storage (Keychain on iOS)

---

## 2. AI Integration Architecture

### Decision: Direct Claude API Integration

**Rationale:**
- Full control over conversation context
- Session data capture for progress tracking
- Custom system prompts for NVC facilitation
- Cost transparency and control
- Seamless user experience

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     AI INTEGRATION ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Client (Vue/iOS)                                              │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │  AIFacilitator Component                                  │  │
│   │  ┌─────────────────┐  ┌─────────────────┐               │  │
│   │  │ Chat Interface  │  │ Session State   │               │  │
│   │  └────────┬────────┘  └────────┬────────┘               │  │
│   └───────────┼─────────────────────┼────────────────────────┘  │
│               │                     │                            │
│               ▼                     ▼                            │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                    Backend API (Render)                   │  │
│   │  ┌─────────────────┐  ┌─────────────────┐               │  │
│   │  │ /api/ai/chat    │  │ Session Manager │               │  │
│   │  └────────┬────────┘  └────────┬────────┘               │  │
│   │           │                     │                         │  │
│   │           ▼                     ▼                         │  │
│   │  ┌─────────────────────────────────────────────────────┐ │  │
│   │  │              Claude API (Anthropic)                  │ │  │
│   │  │  - System prompt: NVC Facilitator                   │ │  │
│   │  │  - Context: User's feelings/needs selections        │ │  │
│   │  │  - Safety: Crisis detection layer                   │ │  │
│   │  └─────────────────────────────────────────────────────┘ │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### API Endpoints

```typescript
// POST /api/ai/chat
interface ChatRequest {
  session_id: string
  message: string
  context: {
    selected_feelings?: string[]
    selected_needs?: string[]
    scenario_id?: string
    session_type: 'self-empathy' | 'empathy' | 'prep' | 'scenario'
  }
}

interface ChatResponse {
  message: string
  suggestions?: {
    feelings?: string[]
    needs?: string[]
    follow_up?: string
  }
  session_summary?: OFNRSummary
  crisis_detected?: boolean
}

// POST /api/ai/sessions
interface CreateSessionRequest {
  type: SessionType
  scenario_id?: string
}

interface CreateSessionResponse {
  session_id: string
  initial_prompt: string
}
```

### Cost Management

| Tier | Monthly AI Token Limit | Approximate Cost |
|------|----------------------|------------------|
| Guest | 10,000 tokens | ~$0.10 |
| Free | 50,000 tokens | ~$0.50 |
| Premium | 500,000 tokens | ~$5.00 |

### Rate Limiting

```typescript
// Rate limit configuration
const RATE_LIMITS = {
  guest: {
    requests_per_minute: 5,
    tokens_per_day: 10000
  },
  free: {
    requests_per_minute: 10,
    tokens_per_day: 50000
  },
  premium: {
    requests_per_minute: 30,
    tokens_per_day: 500000
  }
}
```

---

## 3. Data Synchronization

### Strategy: Optimistic UI with Background Sync

### Sync Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA SYNC ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────┐          ┌─────────────┐                      │
│   │   Client    │◄────────►│   Server    │                      │
│   │  (Vue/iOS)  │          │  (Render)   │                      │
│   └─────────────┘          └─────────────┘                      │
│         │                        │                               │
│         ▼                        ▼                               │
│   ┌─────────────┐          ┌─────────────┐                      │
│   │  IndexedDB  │          │ PostgreSQL  │                      │
│   │  (Web) or   │          │             │                      │
│   │ SQLite(iOS) │          │             │                      │
│   └─────────────┘          └─────────────┘                      │
│                                                                  │
│   SYNC TRIGGERS:                                                 │
│   • App launch                                                   │
│   • Session complete                                             │
│   • Background refresh (iOS)                                     │
│   • Network reconnection                                         │
│   • Manual pull-to-refresh                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Offline Data Storage

```typescript
// Local storage schema
interface LocalStore {
  // Core data
  user: User | GuestUser
  sessions: Session[]
  checkins: CheckIn[]

  // Sync metadata
  last_sync: string
  pending_changes: PendingChange[]
  sync_version: number
}

interface PendingChange {
  id: string
  table: string
  operation: 'create' | 'update' | 'delete'
  data: Record<string, unknown>
  created_at: string
  retry_count: number
}
```

### Conflict Resolution

```typescript
// Conflict resolution rules
const CONFLICT_RULES = {
  // User preferences: client wins (most recent edit)
  user_preferences: 'client-wins',

  // Session data: server wins (authoritative)
  sessions: 'server-wins',

  // Check-ins: merge (both valid)
  checkins: 'merge',

  // Streaks: server wins (prevents cheating)
  streaks: 'server-wins',

  // Agreements: server wins (shared state)
  agreements: 'server-wins'
}
```

### Offline Limits

| Data Type | Offline Limit |
|-----------|---------------|
| Sessions | Last 50 |
| Check-ins | Last 90 days |
| Pending AI messages | 5 |
| Reference data | Full (cached) |

---

## 4. Error Handling

### Error Taxonomy

```typescript
enum ErrorCategory {
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  VALIDATION = 'VALIDATION',
  AI = 'AI',
  SYNC = 'SYNC',
  PAYMENT = 'PAYMENT',
  UNKNOWN = 'UNKNOWN'
}

interface AppError {
  category: ErrorCategory
  code: string
  message: string  // Developer message
  userMessage: string  // User-friendly message
  recoverable: boolean
  retryable: boolean
}
```

### Error Responses

| Error Code | Category | User Message | Action |
|------------|----------|--------------|--------|
| `NET_OFFLINE` | NETWORK | "You're offline. Your progress is saved locally." | Show cached data |
| `NET_TIMEOUT` | NETWORK | "Taking longer than expected. Please try again." | Retry button |
| `AUTH_EXPIRED` | AUTH | "Please sign in again to continue." | Redirect to login |
| `AUTH_INVALID` | AUTH | "Invalid email or password." | Show inline error |
| `AI_RATE_LIMIT` | AI | "You've reached your session limit. Upgrade for more." | Show upgrade option |
| `AI_UNAVAILABLE` | AI | "AI assistant is temporarily unavailable." | Show offline exercises |
| `SYNC_CONFLICT` | SYNC | "We found a newer version. Refreshing..." | Auto-refresh |
| `PAY_DECLINED` | PAYMENT | "Payment couldn't be processed. Please try another method." | Payment form |

### Retry Strategy

```typescript
const RETRY_CONFIG = {
  maxRetries: 3,
  backoff: 'exponential',
  initialDelay: 1000,
  maxDelay: 30000,

  // Non-retryable errors
  noRetry: [
    'AUTH_INVALID',
    'VALIDATION_ERROR',
    'PAY_DECLINED'
  ]
}
```

### Error Logging

```typescript
// Error logging interface
interface ErrorLog {
  timestamp: string
  user_id?: string
  error_code: string
  error_message: string
  stack_trace?: string
  context: {
    screen: string
    action: string
    device_info: DeviceInfo
  }
  session_id?: string
}
```

---

## 5. Performance Requirements

### Page Load Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | 2.5s |
| Largest Contentful Paint | < 2.5s | 4.0s |
| Time to Interactive | < 3.0s | 5.0s |
| Cumulative Layout Shift | < 0.1 | 0.25 |

### API Response Targets

| Endpoint | Target | Maximum |
|----------|--------|---------|
| Reference data | < 100ms | 300ms |
| AI chat (streaming) | First token < 500ms | 1000ms |
| Session create | < 200ms | 500ms |
| Sync operations | < 500ms | 2000ms |

### Bundle Size Limits

| Asset | Target | Maximum |
|-------|--------|---------|
| Initial JS | < 150KB | 250KB |
| Initial CSS | < 30KB | 50KB |
| Total initial load | < 300KB | 500KB |
| Lazy-loaded route | < 50KB | 100KB |

### iOS Performance

| Metric | Target |
|--------|--------|
| App launch (cold) | < 2s |
| App launch (warm) | < 500ms |
| Memory usage (idle) | < 50MB |
| Memory usage (active) | < 150MB |
| Battery impact | < 5% per hour active |

---

## 6. Real-Time Infrastructure

### Decision: Supabase Realtime

**Rationale:**
- Integrated with our PostgreSQL/Supabase stack
- Built-in presence for two-person sessions
- Postgres CDC (Change Data Capture)
- Scales with Supabase plan

### Two-Person Session Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   REAL-TIME ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   User A                          User B                         │
│   ┌──────────┐                   ┌──────────┐                   │
│   │  Client  │                   │  Client  │                   │
│   └────┬─────┘                   └────┬─────┘                   │
│        │                              │                          │
│        │     WebSocket Channel        │                          │
│        └──────────┬───────────────────┘                          │
│                   │                                              │
│                   ▼                                              │
│        ┌──────────────────────┐                                 │
│        │  Supabase Realtime   │                                 │
│        │  Channel: session_   │                                 │
│        │  {session_id}        │                                 │
│        └──────────────────────┘                                 │
│                   │                                              │
│                   ▼                                              │
│        ┌──────────────────────┐                                 │
│        │     PostgreSQL       │                                 │
│        │  shared_sessions     │                                 │
│        │  session_messages    │                                 │
│        │  presence            │                                 │
│        └──────────────────────┘                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Channel Events

```typescript
// Real-time event types
type SessionEvent =
  | { type: 'user_joined', user_id: string, name: string }
  | { type: 'user_left', user_id: string }
  | { type: 'prep_complete', user_id: string }
  | { type: 'empathy_submitted', user_id: string, data: EmpathyGuess }
  | { type: 'needs_revealed', shared_needs: string[] }
  | { type: 'strategy_proposed', strategy: Strategy }
  | { type: 'agreement_drafted', agreement: Agreement }
  | { type: 'typing', user_id: string, is_typing: boolean }
```

### Presence State

```typescript
interface PresenceState {
  user_id: string
  online_at: string
  current_step: SessionStep
  is_typing: boolean
}
```

### Reconnection Strategy

```typescript
const RECONNECT_CONFIG = {
  maxAttempts: 10,
  baseDelay: 1000,
  maxDelay: 30000,

  // On reconnect
  onReconnect: async (channel) => {
    // Fetch missed messages
    const lastMessage = getLastMessageTimestamp()
    const missed = await fetchMessages({ since: lastMessage })
    applyMissedMessages(missed)
  }
}
```

---

## 7. Infrastructure Decisions Summary

| Component | Decision | Provider |
|-----------|----------|----------|
| Hosting | PaaS | Render |
| Database | PostgreSQL | Render PostgreSQL |
| Auth | Managed auth | Supabase Auth |
| Real-time | WebSocket | Supabase Realtime |
| AI | Direct API | Claude (Anthropic) |
| Storage | Object storage | Render Disk |
| CDN | Edge caching | Render (built-in) |
| Monitoring | APM + Logging | Sentry + Render logs |
| Email | Transactional | Resend |

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-01-12 | Chris Therriault | Initial technical architecture supplement |
