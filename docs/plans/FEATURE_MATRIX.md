# Feature Matrix: Web & iOS Parity

## Purpose

This document defines feature parity, platform-specific optimizations, and implementation priorities across web and iOS platforms for Feelings & Needs.

---

## Platform Philosophy

### Web (feelingsandneeds.com)
- **Primary Use:** Deep exploration, extended sessions, preparation
- **Session Length:** 5-30 minutes
- **Context:** Desktop/laptop, focused attention
- **Strengths:** Large screen, keyboard input, multitasking

### iOS (Feelings & Needs App)
- **Primary Use:** Daily practice, quick check-ins, on-the-go reference
- **Session Length:** 30 seconds - 10 minutes
- **Context:** Mobile, interruption-prone, habitual
- **Strengths:** Push notifications, haptics, native feel, always available

### Shared
- Synced data across platforms
- Same user account
- Consistent NVC content
- AI facilitator access

---

## Complete Feature Matrix

### Legend
- ✓ = Full feature
- ◐ = Partial/simplified
- ○ = View-only or link
- ✗ = Not included
- 📱 = Mobile-optimized
- 🖥️ = Desktop-optimized

---

## 1. Feelings Reference

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **Feelings Inventory** |||||
| Complete feelings list | ✓ 🖥️ | ✓ 📱 | Both have full list, different UI |
| Category browsing (met/unmet) | ✓ | ✓ | Tab-based both |
| Search feelings | ✓ | ✓ | Native search on iOS |
| Feeling detail view | ✓ | ✓ | Description, body, related needs |
| Body sensation mapping | ✓ | ✓ | Interactive body diagram |
| Related needs display | ✓ | ✓ | Tap to explore |
| Synonyms | ✓ | ◐ | iOS shows on detail only |
| **Faux Feelings** |||||
| Faux feelings list | ✓ | ✓ | Complete list |
| Faux → real translation | ✓ | ✓ | Interactive |
| In-context detection (AI) | ✓ | ✓ | AI identifies in chat |

**iOS Optimization:**
- Large tap targets for feelings
- Haptic feedback on selection
- Quick emoji-to-feeling mapping
- Swipe between categories

**Web Optimization:**
- Multi-column layout
- Hover states with previews
- Keyboard navigation
- Print-friendly view

---

## 2. Needs Reference

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **Needs Inventory** |||||
| Complete needs list | ✓ | ✓ | Full inventory |
| Category browsing | ✓ | ✓ | 7 categories |
| Search needs | ✓ | ✓ | Native search iOS |
| Need detail view | ✓ | ✓ | Description, examples, questions |
| Related feelings (met/unmet) | ✓ | ✓ | Bidirectional links |
| Examples of need being met | ✓ | ◐ | iOS shows 2-3, web shows all |
| Reflection questions | ✓ | ✓ | For deeper exploration |
| **Need-Strategy Distinction** |||||
| Educational content | ✓ | ◐ | Web deeper, iOS summary |
| Practice exercises | ✓ | ✓ | Interactive quiz |

**iOS Optimization:**
- Card-based browsing
- Pull-to-refresh
- Favorites/recently viewed
- Share need cards

**Web Optimization:**
- Side-by-side comparison
- Expandable sections
- Anchor links for categories
- Export/print capability

---

## 3. AI Practice

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **Self-Empathy Sessions** |||||
| Free-form practice | ✓ | ✓ | Core feature |
| Guided OFNR flow | ✓ | ✓ | Step-by-step |
| Feeling identification help | ✓ | ✓ | AI + picker |
| Need identification help | ✓ | ✓ | AI + picker |
| Session summary | ✓ | ✓ | OFNR captured |
| Save to history | ✓ | ✓ | Synced |
| **Empathy Practice** |||||
| Understanding others | ✓ | ✓ | Guided flow |
| Perspective taking | ✓ | ✓ | Guess their F+N |
| **Scenario Practice** |||||
| Pre-built scenarios | ✓ | ✓ | Same library |
| Scenario categories | ✓ | ✓ | Work, family, etc. |
| Difficulty levels | ✓ | ✓ | Beginner → advanced |
| Custom scenario input | ✓ | ✓ | User's own situation |
| **Conversation Prep** |||||
| Full prep wizard | ✓ 🖥️ | ◐ | iOS simplified |
| OFNR worksheet | ✓ | ✓ | Structured form |
| Empathy for other | ✓ | ✓ | Guess their view |
| Script generation | ✓ | ◐ | Web has full script |
| Practice with AI | ✓ | ✓ | Roleplay conversation |
| **Request Formulation** |||||
| Request practice | ✓ | ✓ | Craft clear requests |
| Demand vs request check | ✓ | ✓ | AI feedback |
| **Session Features** |||||
| Voice input | ◐ | ✓ 📱 | iOS native |
| Quick feeling/need pickers | ✓ | ✓ 📱 | iOS optimized |
| Typing indicator | ✓ | ✓ | Shows AI thinking |
| Message reactions | ✗ | ✗ | Future |

**iOS Optimization:**
- Voice input prominent
- Quick-pick chips for feelings/needs
- Haptic on AI response
- Minimize keyboard where possible
- Resume from notification

**Web Optimization:**
- Larger text input area
- Side panel for reference
- Copy/paste support
- Multiple tabs for research

---

## 4. Daily Check-In

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **Quick Check-In** |||||
| Emoji quick-pick | ✓ | ✓ 📱 | Primary on iOS |
| Feeling selection | ✓ | ✓ | From list |
| Need connection prompt | ✓ | ✓ | Suggestions |
| Optional note | ✓ | ✓ | Brief context |
| "Go deeper" option | ✓ | ✓ | Launch AI session |
| **Streaks** |||||
| Current streak display | ✓ | ✓ 📱 | Prominent on iOS |
| Streak calendar | ✓ | ✓ | Visual history |
| Streak celebration | ✓ | ✓ 📱 | iOS haptics + animation |
| Streak recovery | ✗ | ✗ | Keeps authentic |
| **Reminders** |||||
| Push notification | ✗ | ✓ 📱 | iOS only |
| Email reminder | ✓ | ✗ | Web only |
| Custom reminder time | ✓ | ✓ | User preference |

**iOS Optimization:**
- Widget for home screen
- Push notification with quick actions
- Under 30 seconds to complete
- Background refresh for streak

**Web Optimization:**
- Dashboard integration
- Week-at-a-glance view
- Export check-in history

---

## 5. Progress & History

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **Session History** |||||
| List all sessions | ✓ | ✓ | Scrollable |
| Session detail view | ✓ | ✓ | Full conversation |
| Search history | ✓ | ◐ | iOS basic filter |
| Filter by type | ✓ | ✓ | Check-in, practice, etc. |
| Delete session | ✓ | ✓ | User control |
| **Progress Analytics** |||||
| Feelings over time | ✓ 🖥️ | ◐ | Web has charts |
| Most common feelings | ✓ | ✓ | Top 5 |
| Most common needs | ✓ | ✓ | Top 5 |
| Practice frequency | ✓ | ✓ | Calendar view |
| Vocabulary growth | ✓ | ◐ | Web detailed |
| **Insights** |||||
| Pattern recognition | ✓ 🖥️ | ◐ | Web AI analysis |
| Weekly summary | ✓ | ✓ | Email + in-app |
| Milestone celebrations | ✓ | ✓ | Achievements |

**iOS Optimization:**
- Simple stats at glance
- Share progress cards
- Haptic milestones

**Web Optimization:**
- Interactive charts
- Date range selection
- Export to CSV
- Detailed breakdown

---

## 6. Learning Content

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **NVC Basics** |||||
| Four steps overview | ✓ | ✓ | Core education |
| Observation guide | ✓ | ◐ | iOS summary |
| Feelings guide | ✓ | ◐ | iOS summary |
| Needs guide | ✓ | ◐ | iOS summary |
| Requests guide | ✓ | ◐ | iOS summary |
| **Examples** |||||
| Example dialogues | ✓ | ✓ | Before/after |
| Video content | ✓ | ○ | Links to external |
| **Common Mistakes** |||||
| Pitfalls guide | ✓ | ◐ | iOS highlights |
| Faux feelings education | ✓ | ✓ | Both platforms |
| Demand vs request | ✓ | ✓ | Both platforms |
| **Resources** |||||
| Book recommendations | ✓ | ○ | iOS links to web |
| External links | ✓ | ○ | Safari handoff |
| Glossary | ✓ | ✓ | Searchable |

**iOS Optimization:**
- Bite-sized lessons
- Card-based browsing
- Offline access to core content

**Web Optimization:**
- Long-form articles
- Embedded media
- Print-friendly

---

## 7. About & Services

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **About Cindy** |||||
| Bio summary | ✓ | ✓ | Both have summary |
| Full biography | ✓ | ○ | iOS links to web |
| Photo | ✓ | ✓ | Both |
| Credentials | ✓ | ◐ | iOS summary |
| **Services Overview** |||||
| Services list | ✓ | ◐ | iOS summary |
| Service details | ✓ | ○ | Links to web |
| Pricing | ✓ | ○ | Links to web |
| **Scheduling** |||||
| Full scheduler | ✓ | ○ | Opens web/Safari |
| Quick schedule link | ✓ | ✓ | Deep link |
| **Contact** |||||
| Contact form | ✓ | ✓ | Both functional |
| Email link | ✓ | ✓ | Opens mail app |
| **Website Link** |||||
| Visit website CTA | ✓ | ✓ | Prominent on iOS |
| Deep links from web | ✓ | ✓ | Open in app |

**iOS Optimization:**
- Summarized About
- Prominent "Visit Website" button
- Deep link to schedule
- Contact card integration

**Web Optimization:**
- Full service descriptions
- Embedded scheduler
- SEO-optimized pages

---

## 8. Two-Person Features (Future)

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **Invite Partner** |||||
| Generate invite link | ✓ | ✓ | Share sheet |
| Accept invitation | ✓ | ✓ | Deep link |
| **Shared Session** |||||
| Individual prep | ✓ | ✓ | Private |
| Exchange empathy guesses | ✓ | ✓ | Real-time |
| View shared needs | ✓ | ✓ | Visual |
| Strategy brainstorm | ✓ | ✓ | Collaborative |
| **Agreements** |||||
| Create agreement | ✓ | ◐ | Web full edit |
| View agreements | ✓ | ✓ | Both |
| Set follow-up | ✓ | ✓ | Reminder |
| Check-in on agreement | ✓ | ✓ | Both |

---

## 9. Settings & Account

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **Account** |||||
| Create account | ✓ | ✓ | Email or social |
| Guest mode | ✓ | ✓ | Limited features |
| Sign in | ✓ | ✓ | Synced sessions |
| Delete account | ✓ | ✓ | GDPR compliance |
| **Preferences** |||||
| Notification settings | ✓ | ✓ 📱 | iOS native |
| Daily reminder time | ✓ | ✓ | User choice |
| Theme (dark mode) | ✓ | ✓ | System or manual |
| **Privacy** |||||
| Privacy policy | ✓ | ✓ | In-app |
| Terms of service | ✓ | ✓ | In-app |
| Data export | ✓ | ○ | Web only |
| Analytics opt-out | ✓ | ✓ | User control |

---

## Implementation Phases

### Phase 1: MVP (Web + iOS)
**Goal:** Core practice functionality

| Feature | Web | iOS | Priority |
|---------|-----|-----|----------|
| Feelings inventory | ✓ | ✓ | P0 |
| Needs inventory | ✓ | ✓ | P0 |
| Self-empathy AI | ✓ | ✓ | P0 |
| Daily check-in | ✓ | ✓ | P0 |
| Streak tracking | ✓ | ✓ | P0 |
| Session history | ✓ | ✓ | P0 |
| About Cindy | ✓ | ◐ | P0 |
| Basic settings | ✓ | ✓ | P0 |

### Phase 2: Enhanced Practice
**Goal:** Deeper NVC support

| Feature | Web | iOS | Priority |
|---------|-----|-----|----------|
| Empathy practice | ✓ | ✓ | P1 |
| Scenario library | ✓ | ✓ | P1 |
| Conversation prep | ✓ | ◐ | P1 |
| Faux feelings education | ✓ | ✓ | P1 |
| Progress analytics | ✓ | ◐ | P1 |
| Push notifications | ✗ | ✓ | P1 |

### Phase 3: Connection Features
**Goal:** Two-person support

| Feature | Web | iOS | Priority |
|---------|-----|-----|----------|
| Two-person invite | ✓ | ✓ | P2 |
| Shared sessions | ✓ | ✓ | P2 |
| Agreements | ✓ | ◐ | P2 |
| Request sharing | ✓ | ✓ | P2 |

### Phase 4: Polish & Growth
**Goal:** Engagement and retention

| Feature | Web | iOS | Priority |
|---------|-----|-----|----------|
| Gamification | ✓ | ✓ | P3 |
| Vocabulary badges | ✓ | ✓ | P3 |
| Pattern insights | ✓ | ◐ | P3 |
| Widget | ✗ | ✓ | P3 |
| Apple Watch | ✗ | ◐ | P3 |

---

## Shared Component Library

Components that should be identical across platforms:

### Data Components
- Feelings data model
- Needs data model
- OFNR structure
- Session structure
- User preferences

### AI Components
- System prompts
- Feeling identification logic
- Need suggestion logic
- Conversation flow logic

### Content Components
- NVC educational content
- Scenario library
- Faux feelings translations
- Example dialogues

---

## Sync Strategy

### What Syncs
- User account
- Session history
- Check-in history
- Streak data
- Preferences
- Favorites
- Agreements

### Sync Timing
- Real-time for active sessions
- On app launch
- Background sync (iOS)
- Manual pull-to-refresh

### Conflict Resolution
- Last-write-wins for preferences
- Merge for session history
- Server authoritative for streaks

---

## 10. Safety & Crisis Features

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **Crisis Detection** |||||
| Tier 1 keyword detection | ✓ | ✓ | Immediate overlay |
| Tier 2 keyword detection | ✓ | ✓ | Gentle in-context |
| Crisis resources overlay | ✓ | ✓ | Tap-to-call on iOS |
| **Resources** |||||
| Crisis hotline links | ✓ | ✓ | Localized by region |
| "I'm safe" dismiss option | ✓ | ✓ | Resume practice |
| **Disclaimers** |||||
| Not-a-therapist notice | ✓ | ✓ | First session + settings |
| Terms of service | ✓ | ✓ | Onboarding + settings |

**See:** SAFETY_PRIVACY_GUIDELINES.md for full crisis protocol

---

## 11. Authentication & User Tiers

| Feature | Guest | Registered (Free) | Premium |
|---------|-------|-------------------|---------|
| Feelings/Needs reference | ✓ | ✓ | ✓ |
| Daily check-in | 7 days | Unlimited | Unlimited |
| AI sessions | 3 total | 5/month | Unlimited |
| Save to cloud | ✗ | ✓ | ✓ |
| Session history | Device only | Full | Full |
| Progress tracking | Basic | Full | Full |
| Two-person sessions | ✗ | ✓ | ✓ |
| Conversation prep | ✗ | Limited | Full |
| Pattern insights | ✗ | ✗ | ✓ |
| Priority support | ✗ | ✗ | ✓ |

**See:** TECHNICAL_ARCHITECTURE_SUPPLEMENT.md for auth implementation

---

## 12. Performance Requirements

### Page Load Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | 2.5s |
| Largest Contentful Paint | < 2.5s | 4.0s |
| Time to Interactive | < 3.0s | 5.0s |

### API Response Targets

| Endpoint | Target | Maximum |
|----------|--------|---------|
| Reference data | < 100ms | 300ms |
| AI chat (first token) | < 500ms | 1000ms |
| Sync operations | < 500ms | 2000ms |

### iOS-Specific

| Metric | Target |
|--------|--------|
| App launch (cold) | < 2s |
| App launch (warm) | < 500ms |
| Memory (idle) | < 50MB |
| Memory (active) | < 150MB |

**See:** TECHNICAL_ARCHITECTURE_SUPPLEMENT.md for full specs

---

## Terminology Glossary

To ensure consistency across all documents:

| Term | Definition | Avoid Using |
|------|------------|-------------|
| **Session** | A single AI-facilitated practice conversation | "Conversation" (ambiguous) |
| **Check-in** | Daily feelings/needs quick capture | "Log", "Entry" |
| **Practice** | Any NVC learning activity | "Exercise" (reserved for specific drills) |
| **Partner** | The other person in a two-person session | "Other person", "User B" |
| **Prep** | Conversation preparation mode | "Planning", "Worksheet" |
| **OFNR** | Observation, Feeling, Need, Request framework | Spell out on first use |
| **Faux feeling** | Thought disguised as feeling | "Fake feeling", "False feeling" |

---

## Priority Definitions

| Priority | Meaning | Timeline |
|----------|---------|----------|
| **P0** | MVP - Required for launch | Phase 1 |
| **P1** | Core enhancement - Next iteration | Phase 2 |
| **P2** | Two-person features | Phase 5 |
| **P3** | Growth & polish | Phase 6+ |

### Reconciled Priority Notes

Items moved for consistency:
- Push notifications: P1 (iOS) - Part of Phase 2 enhanced practice
- Voice input: P1 (iOS native), P2 (Web) - iOS prioritized for mobile UX
- Widgets: P3 (iOS only) - Post-MVP engagement feature

---

## Cross-Reference Documents

| Document | Purpose |
|----------|---------|
| MASTER_PLAN.md | Executive overview, phase summaries |
| PHASE_0_PRODUCT_FOUNDATION.md | NVC principles, core journeys |
| NVC_DATA_MODEL.md | Feelings/needs taxonomy, TypeScript interfaces |
| USER_JOURNEYS.md | Personas, detailed flows |
| TECHNICAL_ARCHITECTURE_SUPPLEMENT.md | Auth, sync, AI, error handling |
| SAFETY_PRIVACY_GUIDELINES.md | Crisis protocols, privacy compliance |
| GAP_ANALYSIS.md | Identified gaps and resolutions |

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-01-12 | Chris Therriault | Initial feature matrix |
| 2025-01-12 | Chris Therriault | Added safety, auth tiers, performance, glossary, cross-references |
