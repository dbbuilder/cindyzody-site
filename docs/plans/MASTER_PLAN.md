# Feelings & Needs Platform - Master Plan

## Vision

**Feelings & Needs** is an NVC/IFS practice ecosystem that helps people:
1. **Understand themselves** - Identify feelings and connect to underlying needs
2. **Achieve their goals** - Formulate clear, effective requests
3. **Connect with others** - Build empathy and mutual understanding
4. **Resolve conflicts** - Navigate disagreements through needs-based dialogue

The platform spans:
- **Web App** (feelingsandneeds.com) - Full-featured NVC practice and coaching portal
- **iOS App** ("Feelings & Needs") - Mobile-first daily practice companion
- **AI Facilitator** - Embedded conversational practice guide

The existing cindyzody.com website evolves to support this ecosystem, with practitioner services available as "About Us" content and easy scheduling access.

### Core Principles
1. **Practice-First**: Every interaction should enable NVC practice, not just explain it
2. **Seamless Experience**: Web, mobile, and AI feel like one unified product
3. **Progressive Depth**: Simple entry points, sophisticated depth when ready
4. **Gentle Guidance**: Never judge—celebrate attempts, refine gently
5. **Connected to Human Support**: AI practice complements, never replaces, human coaching

---

## Phase Overview

| Phase | Focus | Key Deliverables |
|-------|-------|------------------|
| **Phase 0** | Product Foundation | NVC framework, data models, user journeys, feature parity |
| **Phase 1** | UI Enhancement | Component library, Feelings & Needs design system, accessibility |
| **Phase 2** | AI Integration | Embedded facilitator, OFNR guidance, session tracking |
| **Phase 3** | Render Migration | feelingsandneeds.com, API backend, PostgreSQL |
| **Phase 4** | iOS App | "Feelings & Needs" App Store launch, mobile-optimized UX |
| **Phase 5** | Two-Person Connection | Shared sessions, empathy exchange, conflict resolution, agreements |
| **Phase 6** | Advanced & Growth | Professional tools, community features, advanced AI, business expansion |

### Platform Evolution

```
INDIVIDUAL PRACTICE          TWO-PERSON CONNECTION         COMMUNITY & SCALE
────────────────────────────────────────────────────────────────────────────►

Phase 0-4                    Phase 5                       Phase 6
┌────────────────────┐       ┌────────────────────┐       ┌────────────────────┐
│ • Feelings/Needs   │       │ • Invite partner   │       │ • Practice circles │
│ • Self-empathy     │       │ • Individual prep  │       │ • Empathy matching │
│ • AI practice      │       │ • Empathy exchange │       │ • Pro tools        │
│ • Daily check-ins  │       │ • Shared needs     │       │ • Enterprise       │
│ • Progress tracking│       │ • Strategy co-create│      │ • Certification    │
│ • Conversation prep│       │ • Agreements       │       │ • Multi-language   │
└────────────────────┘       └────────────────────┘       └────────────────────┘
        │                            │                            │
        │ "I understand myself"      │ "We understand each other" │ "Connected community"
        └────────────────────────────┴────────────────────────────┘
```

---

## Phase 0: Product Foundation (This Document Set)

**Goal:** Establish the product vision, NVC methodology, and feature requirements before writing code.

### Why Phase 0 Matters

Every feature decision traces back to Phase 0. Without this foundation:
- Features may not align with NVC principles
- Web and iOS experiences may diverge
- AI guidance may be inconsistent
- User journeys may be fragmented

### Phase 0 Deliverables

| Document | Purpose | Status |
|----------|---------|--------|
| [PHASE_0_PRODUCT_FOUNDATION.md](./PHASE_0_PRODUCT_FOUNDATION.md) | Product vision, NVC four-step process, success metrics | ✓ Complete |
| [NVC_DATA_MODEL.md](./NVC_DATA_MODEL.md) | Complete feelings/needs taxonomy, data structures, AI prompts | ✓ Complete |
| [USER_JOURNEYS.md](./USER_JOURNEYS.md) | Personas, detailed user flows, scenario library | ✓ Complete |
| [FEATURE_MATRIX.md](./FEATURE_MATRIX.md) | Web/iOS parity, implementation priorities | ✓ Complete |

### Key Phase 0 Outcomes

**NVC Framework Implemented:**
- 100+ feelings organized by met/unmet needs
- 60+ universal needs across 7 categories
- Faux feelings → real feelings translations
- OFNR (Observation, Feeling, Need, Request) structure

**User Journeys Defined:**
- Daily check-in (< 60 seconds)
- Self-empathy practice (5-15 minutes)
- Empathy for others (5-10 minutes)
- Conversation preparation (10-20 minutes)
- Two-person conflict resolution (future)

**Platform Parity Established:**
- Core features identical across web/iOS
- Platform-specific optimizations documented
- Shared data model and sync strategy
- Implementation priorities (P0-P3)

---

## Brand Evolution

```
Current:                        Future:
┌──────────────────┐           ┌──────────────────────────────────────┐
│ cindyzody.com    │           │        Feelings & Needs              │
│                  │           │           Ecosystem                  │
│ - NVC Coaching   │    ──►    ├──────────────────────────────────────┤
│ - IFS Work       │           │  feelingsandneeds.com  │  iOS App   │
│ - NVCAI Tool     │           │  (web platform)        │  (mobile)  │
└──────────────────┘           ├──────────────────────────────────────┤
                               │           AI Facilitator             │
                               │    (embedded in both platforms)      │
                               ├──────────────────────────────────────┤
                               │   About Us / Coaching Services       │
                               │   (cindyzody.com content preserved)  │
                               └──────────────────────────────────────┘
```

---

## Phase 1: UI Enhancement

**Goal:** Build the component library and design system that will power both web and iOS

### Key Initiatives
- Implement Headless UI components (Dialog, Listbox, Menu)
- Replace inline SVGs with @heroicons/vue library
- Create Feelings & Needs design system:
  - FeelingCard, NeedCard components
  - FeelingPicker, NeedBrowser components
  - ChatInterface, SessionSummary components
- Enhance accessibility (WCAG 2.1 AA compliance)
- Add dark mode support
- Implement loading states and micro-interactions

### Success Criteria
- All Phase 0 user journeys have corresponding UI components
- Lighthouse accessibility score > 95
- Components work for both web and mobile viewports

**Detailed Plan:** [UI_ENHANCEMENT_PLAN.md](./UI_ENHANCEMENT_PLAN.md)

---

## Phase 2: AI Integration Enhancement

**Goal:** Create seamless AI-guided NVC practice experience

### Key Initiatives
- Embed AI facilitator directly (eliminate external redirect)
- Implement OFNR-guided conversation flow:
  - Step 1: Help identify observations (separate from judgments)
  - Step 2: Help identify feelings (real vs faux)
  - Step 3: Help connect to needs (universal human needs)
  - Step 4: Help formulate requests (clear, doable, positive)
- Build feelings/needs suggestion engine
- Implement session persistence and history
- Add practice streaks and progress tracking
- Create scenario library (workplace, family, self)

### Success Criteria
- Users complete OFNR process in 80% of sessions
- Average session includes 2+ feelings, 2+ needs identified
- Session completion rate > 65%

**Detailed Plan:** [AI_INTEGRATION_PLAN.md](./AI_INTEGRATION_PLAN.md)

---

## Phase 3: Render Migration

**Goal:** Deploy feelingsandneeds.com with full backend support

### Key Initiatives
- Set up Render static site for Vue app
- Migrate serverless functions to Render web services
- Deploy PostgreSQL for:
  - User accounts (optional sign-in)
  - Practice session history
  - Progress tracking and streaks
  - Feelings/needs data
- Configure custom domain (feelingsandneeds.com)
- Implement CI/CD pipeline

### Success Criteria
- Zero-downtime migration
- Session sync working across devices
- All user journeys functional end-to-end

**Detailed Plan:** [RENDER_MIGRATION_PLAN.md](./RENDER_MIGRATION_PLAN.md)

---

## Phase 4: iOS Capacitor App

**Goal:** Launch "Feelings & Needs" on Apple App Store

### Key Initiatives
- Configure Capacitor for iOS
- Implement mobile-optimized UX:
  - Quick daily check-in (< 30 seconds)
  - Touch-optimized feelings/needs pickers
  - Haptic feedback on selections
  - Push notification reminders
- Build four-tab structure:
  - Home (check-in, streak, quick actions)
  - Practice (AI facilitator, scenarios)
  - Learn (feelings, needs, NVC basics)
  - About (Cindy, services, website link)
- Implement offline capability
- Prepare App Store submission

### Success Criteria
- App Store approval on first submission
- Cold start < 3 seconds
- Daily check-in completion rate > 85%

**Detailed Plan:** [IOS_CAPACITOR_PLAN.md](./IOS_CAPACITOR_PLAN.md)

---

## Phase 5: Two-Person Connection & Conflict Resolution

**Goal:** Enable two people to work through situations together using structured NVC dialogue

### Key Initiatives
- Invite & connect flow (share link to partner/friend/colleague)
- Individual preparation (private OFNR for each person)
- Empathy guessing (guess partner's feelings/needs before reveal)
- The Exchange (see how well you understood each other)
- Shared needs discovery (visualize common ground)
- Strategy brainstorm (collaborative solution-finding)
- Agreement creation (commitments both parties sign off on)
- Follow-up check-ins (track how agreements are working)

### The Two-Person Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Person A   │     │  Person B   │     │   SHARED    │
│  (Initiator)│     │  (Invitee)  │     │   SPACE     │
├─────────────┤     ├─────────────┤     ├─────────────┤
│             │     │             │     │             │
│ 1. Invite   │────▶│ 1. Accept   │     │             │
│             │     │             │     │             │
│ 2. My OFNR  │     │ 2. My OFNR  │     │             │
│   (private) │     │   (private) │     │             │
│             │     │             │     │             │
│ 3. Guess    │     │ 3. Guess    │     │             │
│    their FN │     │    their FN │     │             │
│             │     │             │     │             │
│             │     │             │────▶│ 4. Exchange │
│             │     │             │     │    Reveal   │
│             │     │             │     │             │
│             │     │             │     │ 5. Shared   │
│             │     │             │     │    Needs    │
│             │     │             │     │             │
│             │     │             │     │ 6. Strategy │
│             │     │             │     │    Brainstorm│
│             │     │             │     │             │
│             │     │             │     │ 7. Agreement│
│             │◀────│             │◀────│             │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Success Criteria
- Invitation acceptance rate > 60%
- Both parties complete preparation > 70%
- Agreement reached > 70% of completed sessions
- Check-in follow-through > 50%

**Detailed Plan:** [PHASE_5_TWO_PERSON.md](./PHASE_5_TWO_PERSON.md)

---

## Phase 6: Advanced Features & Growth

**Goal:** Expand into a comprehensive communication ecosystem with professional tools, community, and business sustainability

### 6A: Professional & Practitioner Tools
- Client practice portal for coaches/therapists
- Custom scenario builder
- Activity visibility (with client consent)
- Session prep review before appointments
- White-label option for practitioners

### 6B: Community & Group Features
- Practice circles (scheduled group sessions)
- Empathy buddy matching
- Community-contributed scenarios
- Facilitator certification program

### 6C: Advanced AI Capabilities
- Conversation simulation (AI plays the other person)
- Post-conversation analysis
- Pattern recognition over time
- Voice mode (speak instead of type)

### 6D: Platform Integrations
- Calendar integration (prep reminders before difficult meetings)
- Apple Health/wellness correlation
- Communication app analysis (reflect on past messages)

### 6E: Business Model Expansion

| Tier | Features |
|------|----------|
| **Free** | Daily check-ins, reference, 3 AI sessions/month |
| **Practice** ($9/mo) | Unlimited AI, all scenarios, progress |
| **Connect** ($19/mo) | + Two-person sessions, agreements |
| **Pro** ($49/mo) | + Client portal, custom scenarios, white-label |

### Success Criteria
- Free to paid conversion > 5%
- Practice circles attendance > 75%
- Certified facilitators: 100+
- Enterprise customers: 10+

**Detailed Plan:** [PHASE_6_ADVANCED_FEATURES.md](./PHASE_6_ADVANCED_FEATURES.md)

---

## Technical Architecture

### Target Stack
```
Frontend:   Vue 3 + Vite + Tailwind CSS + Headless UI
Mobile:     Capacitor iOS (shared Vue codebase)
Backend:    Render Web Services (Node.js + Express)
Database:   PostgreSQL on Render
AI:         Claude API with NVC-specific system prompts
Analytics:  GA4, custom events for NVC metrics
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         User Interfaces                             │
├───────────────────────────┬─────────────────────────────────────────┤
│   Web (feelingsandneeds.com)   │      iOS App (Feelings & Needs)   │
│   - Deep exploration           │      - Daily practice              │
│   - Conversation prep          │      - Quick check-ins             │
│   - Full reference             │      - On-the-go reference         │
├───────────────────────────┴─────────────────────────────────────────┤
│                      Shared Vue 3 Codebase                          │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  Components: FeelingPicker, NeedBrowser, ChatInterface,      │  │
│   │              SessionSummary, StreakDisplay, OFNR Wizard      │  │
│   └──────────────────────────────────────────────────────────────┘  │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  Data: feelings.json, needs.json, scenarios.json, prompts    │  │
│   └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                      Backend Services (Render)                      │
│   ┌────────────────┬────────────────┬────────────────────────────┐  │
│   │  /api/contact  │  /api/schedule │  /api/ai/*                 │  │
│   │  (form submit) │  (appointments)│  (chat, sessions, progress)│  │
│   └────────────────┴────────────────┴────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                         Data Layer                                  │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  PostgreSQL: users, sessions, messages, progress, feelings  │   │
│   └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Success Metrics

### Engagement
| Metric | Target | Phase |
|--------|--------|-------|
| Daily Active Users | Track baseline | 2+ |
| Sessions per user/week | > 3 | 2+ |
| Session completion rate | > 65% | 2+ |
| 7-day streak retention | > 40% | 2+ |
| 30-day streak retention | > 20% | 4 |

### Learning
| Metric | Target | Phase |
|--------|--------|-------|
| Feelings identified/session | > 2 | 2+ |
| Needs identified/session | > 2 | 2+ |
| OFNR completion rate | > 60% | 2+ |
| Vocabulary growth | Increasing | 3+ |

### Outcomes
| Metric | Target | Phase |
|--------|--------|-------|
| User-reported improvement | > 60% | 4 |
| App Store rating | > 4.5 | 4 |
| Coaching conversion rate | Track | 3+ |

---

## Risk Considerations

| Risk | Impact | Mitigation |
|------|--------|------------|
| NVC content accuracy | High | Review with Cindy, cite sources |
| Render migration downtime | High | Blue-green deployment |
| App Store rejection | High | Pre-submission review |
| AI hallucination in guidance | Medium | Constrained prompts, human fallback |
| Scope creep | Medium | Strict phase boundaries, MVP focus |
| Web/iOS feature drift | Medium | Feature matrix, shared components |

---

## Dependencies & Prerequisites

### Phase 0 (Complete)
- NVC expertise (Cindy review)
- Product planning time

### Phase 1 (UI)
- Phase 0 complete
- Design decisions finalized

### Phase 2 (AI)
- Phase 1 components available
- Claude API access
- Feelings/needs data loaded

### Phase 3 (Render)
- Render account setup
- Domain access (feelingsandneeds.com)
- Phase 2 features working locally

### Phase 4 (iOS)
- Phase 3 backend deployed
- Apple Developer account ($99/year)
- Xcode 15+ on macOS

### Phase 5 (Two-Person)
- Phase 4 complete (or at least Phase 3)
- WebSocket infrastructure for real-time sync
- Push notifications for session updates
- Stable user base for testing

### Phase 6 (Advanced)
- Phase 5 complete for connection foundation
- Revenue stream for compute costs
- Community moderation systems
- Legal review for enterprise/healthcare

---

## Document Index

### Phase 0: Foundation
- [PHASE_0_PRODUCT_FOUNDATION.md](./PHASE_0_PRODUCT_FOUNDATION.md) - Vision, NVC process, principles
- [NVC_DATA_MODEL.md](./NVC_DATA_MODEL.md) - Feelings, needs, data structures
- [USER_JOURNEYS.md](./USER_JOURNEYS.md) - Personas, flows, scenarios
- [FEATURE_MATRIX.md](./FEATURE_MATRIX.md) - Platform parity, priorities

### Implementation Phases (1-4)
- [UI_ENHANCEMENT_PLAN.md](./UI_ENHANCEMENT_PLAN.md) - Phase 1 UI/UX
- [AI_INTEGRATION_PLAN.md](./AI_INTEGRATION_PLAN.md) - Phase 2 AI
- [RENDER_MIGRATION_PLAN.md](./RENDER_MIGRATION_PLAN.md) - Phase 3 Infrastructure
- [IOS_CAPACITOR_PLAN.md](./IOS_CAPACITOR_PLAN.md) - Phase 4 Mobile

### Future Phases (5-6)
- [PHASE_5_TWO_PERSON.md](./PHASE_5_TWO_PERSON.md) - Phase 5 Two-Person Connection
- [PHASE_6_ADVANCED_FEATURES.md](./PHASE_6_ADVANCED_FEATURES.md) - Phase 6 Advanced & Growth

### Technical Supplements
- [TECHNICAL_ARCHITECTURE_SUPPLEMENT.md](./TECHNICAL_ARCHITECTURE_SUPPLEMENT.md) - Auth, sync, AI integration, error handling, performance
- [SAFETY_PRIVACY_GUIDELINES.md](./SAFETY_PRIVACY_GUIDELINES.md) - Crisis protocols, privacy compliance, data handling
- [GAP_ANALYSIS.md](./GAP_ANALYSIS.md) - Identified gaps and resolutions

---

## Terminology Glossary

| Term | Definition |
|------|------------|
| **Session** | A single AI-facilitated practice conversation |
| **Check-in** | Daily feelings/needs quick capture |
| **Practice** | Any NVC learning activity |
| **Partner** | The other person in a two-person session |
| **Prep** | Conversation preparation mode |
| **OFNR** | Observation, Feeling, Need, Request - the NVC framework |
| **Faux feeling** | A thought or judgment disguised as a feeling |

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-01-12 | Chris Therriault | Initial planning document |
| 2025-01-12 | Chris Therriault | Added Phase 0 foundation documents |
| 2025-01-12 | Chris Therriault | Integrated NVC framework throughout |
| 2025-01-12 | Chris Therriault | Added Phase 5 (Two-Person) and Phase 6 (Advanced) |
| 2025-01-12 | Chris Therriault | Added technical supplements: Gap Analysis, Architecture, Safety & Privacy |
