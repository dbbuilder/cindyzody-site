# Feelings & Needs App - 12 Week Sprint Plan

## Goal
Transform the Feelings & Needs practice tools into a complete standalone app with user accounts, session persistence, progress tracking, and iOS availability.

---

## Phase 1: Foundation (Weeks 1-2)

### Week 1: Authentication System
- [ ] Install Supabase client
- [ ] Create auth composable (useAuth)
- [ ] Build auth UI components:
  - [ ] LoginForm.vue
  - [ ] SignupForm.vue
  - [ ] ForgotPassword.vue
  - [ ] AccountSettings.vue
- [ ] Add auth pages to router
- [ ] Implement protected routes
- [ ] Add user menu to header

### Week 2: Session Persistence
- [ ] Extend database schema for sessions
- [ ] Create session API endpoints:
  - [ ] POST /api/sessions - create/save session
  - [ ] GET /api/sessions - list user sessions
  - [ ] GET /api/sessions/:id - get session detail
  - [ ] DELETE /api/sessions/:id - delete session
- [ ] Create useSession composable
- [ ] Auto-save sessions during AI practice
- [ ] Session resume functionality

---

## Phase 2: Engagement (Weeks 3-4)

### Week 3: Progress Tracking
- [ ] Database schema for progress/streaks
- [ ] Progress API endpoints:
  - [ ] GET /api/progress - user stats
  - [ ] POST /api/check-in - daily check-in
- [ ] Streak calculation logic
- [ ] useProgress composable
- [ ] ProgressDashboard.vue component

### Week 4: Daily Check-In
- [ ] CheckInWidget.vue component
- [ ] Quick feeling selector (3-tap flow)
- [ ] Mood trends over time
- [ ] Push notification setup (web)
- [ ] Email reminder system (optional)

---

## Phase 3: History & Insights (Weeks 5-6)

### Week 5: Session History UI
- [ ] SessionHistory.vue page
- [ ] Session cards with summary
- [ ] Filter by date, type, feelings
- [ ] Session replay/review mode
- [ ] Export session (PDF, text)

### Week 6: Insights & Analytics
- [ ] Pattern recognition (common feelings/needs)
- [ ] Weekly/monthly summaries
- [ ] Insights cards ("You often feel X when...")
- [ ] Growth visualization
- [ ] Milestone celebrations

---

## Phase 4: Content & Scenarios (Weeks 7-8)

### Week 7: Scenario Library
- [ ] Create scenarios.json data file
- [ ] ScenarioSelector.vue component
- [ ] Categories: Workplace, Family, Relationship, Self
- [ ] Difficulty levels
- [ ] AI prompts per scenario

### Week 8: Guided Practice Modes
- [ ] ConversationPrep.vue (prepare for real talk)
- [ ] SelfEmpathy.vue (process feelings)
- [ ] EmpathyPractice.vue (understand others)
- [ ] Onboarding flow improvements
- [ ] Educational content integration

---

## Phase 5: iOS App (Weeks 9-10)

### Week 9: Capacitor Setup
- [ ] Install Capacitor
- [ ] Configure iOS project
- [ ] Native splash screen
- [ ] App icons (all sizes)
- [ ] iOS-specific optimizations:
  - [ ] Safe area handling
  - [ ] Keyboard behavior
  - [ ] Haptic feedback

### Week 10: iOS Features
- [ ] Push notifications (APNs)
- [ ] Deep linking
- [ ] Share extension
- [ ] Widget (iOS 14+) - stretch goal
- [ ] TestFlight build

---

## Phase 6: Launch (Weeks 11-12)

### Week 11: App Store Prep
- [ ] App Store screenshots (6.5", 5.5")
- [ ] App preview video
- [ ] App description & keywords
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] App Store Connect setup
- [ ] Submit for review

### Week 12: Polish & Launch
- [ ] Bug fixes from TestFlight
- [ ] Performance optimization
- [ ] Analytics setup (Mixpanel/Amplitude)
- [ ] Error monitoring (Sentry)
- [ ] Marketing landing page
- [ ] Launch announcement
- [ ] Respond to App Store review

---

## Technical Stack

### Frontend
- Vue 3 + Composition API
- Tailwind CSS
- Capacitor (iOS)
- PWA support

### Backend
- Node.js + Express (Render)
- SQLite → PostgreSQL (production)
- Supabase Auth
- Resend (email)

### AI
- Claude API (Anthropic)
- NVC-specific system prompts
- Crisis detection layer

### Infrastructure
- Render (web service + database)
- Supabase (auth)
- App Store Connect (iOS)
- Sentry (monitoring)

---

## Database Schema

```sql
-- Users (managed by Supabase Auth, extended here)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  timezone TEXT DEFAULT 'America/Los_Angeles',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Practice Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  type TEXT NOT NULL, -- 'self-empathy', 'empathy', 'prep', 'scenario'
  scenario_id TEXT,
  feelings JSONB DEFAULT '[]',
  needs JSONB DEFAULT '[]',
  messages JSONB DEFAULT '[]',
  summary JSONB,
  duration_seconds INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Daily Check-ins
CREATE TABLE check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  date DATE NOT NULL,
  feelings JSONB NOT NULL,
  needs JSONB,
  energy_level INTEGER, -- 1-5
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Progress & Streaks
CREATE TABLE progress (
  user_id UUID PRIMARY KEY REFERENCES user_profiles(id),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  total_check_ins INTEGER DEFAULT 0,
  last_activity_date DATE,
  feeling_counts JSONB DEFAULT '{}',
  need_counts JSONB DEFAULT '{}',
  insights JSONB DEFAULT '[]',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_created ON sessions(created_at);
CREATE INDEX idx_check_ins_user_date ON check_ins(user_id, date);
```

---

## API Endpoints

### Auth (Supabase handles most)
- POST /api/auth/profile - create/update profile
- GET /api/auth/profile - get current user profile

### Sessions
- POST /api/sessions - create new session
- GET /api/sessions - list sessions (paginated)
- GET /api/sessions/:id - get session
- PUT /api/sessions/:id - update session
- DELETE /api/sessions/:id - delete session

### Progress
- GET /api/progress - get user progress
- POST /api/check-in - daily check-in
- GET /api/check-ins - list check-ins
- GET /api/insights - get personalized insights

### AI (existing)
- POST /api/ai/session - start AI session
- POST /api/ai/chat - send message

---

## Success Metrics

### Week 4 Milestone
- [ ] Users can sign up and log in
- [ ] Sessions are saved and retrievable
- [ ] Streaks are tracked
- [ ] Daily check-in works

### Week 8 Milestone
- [ ] Full session history with insights
- [ ] Scenario library available
- [ ] Multiple practice modes
- [ ] Onboarding complete

### Week 12 Milestone
- [ ] iOS app in App Store
- [ ] 100+ beta users
- [ ] <2s load time
- [ ] 99.9% uptime
- [ ] Zero critical bugs

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Supabase integration complexity | Use official Vue plugin, follow docs closely |
| App Store rejection | Review guidelines early, prepare all assets |
| AI costs | Set rate limits, monitor usage, cache responses |
| Data privacy concerns | Encrypt sensitive data, clear privacy policy |
| Scope creep | Stick to weekly goals, defer nice-to-haves |

---

## Getting Started

Begin with Week 1, Day 1:
1. Install @supabase/supabase-js
2. Create Supabase project
3. Configure auth settings
4. Build useAuth composable
5. Create LoginForm.vue

Let's build! 🚀
