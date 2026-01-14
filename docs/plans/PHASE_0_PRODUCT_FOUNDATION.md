# Phase 0: Product Foundation

## Why This Document Exists

Before writing code, we must deeply understand what Feelings & Needs is trying to accomplish. This document serves as the **single source of truth** for product decisions across web and iOS platforms.

Every feature, screen, and interaction should trace back to principles in this document.

---

## The Problem We're Solving

### The Communication Gap

Most people struggle to:
1. **Identify what they're actually feeling** (beyond "fine," "stressed," "upset")
2. **Connect feelings to underlying needs** (why do I feel this way?)
3. **Express needs without blame or demand** (without triggering defensiveness)
4. **Hear others' feelings/needs** (especially when triggered)
5. **Find solutions that honor everyone's needs** (beyond compromise or capitulation)

### The Consequences

- Relationships suffer from miscommunication
- Conflicts escalate unnecessarily
- People feel unheard and disconnected
- Self-understanding remains shallow
- Stress and anxiety compound

### Current Solutions Fall Short

| Solution | Limitation |
|----------|------------|
| Therapy | Expensive, weekly cadence, not always NVC-focused |
| Books | Passive learning, no practice feedback |
| Workshops | Infrequent, group setting intimidating |
| Journaling | No guidance, easy to stay in "story" mode |
| Meditation apps | Don't address communication specifically |

---

## Our Solution: Feelings & Needs

### Core Value Proposition

**Feelings & Needs helps you understand yourself, connect with others, and resolve conflicts through guided NVC practice—available anytime, anywhere.**

### How We're Different

1. **Practice, Not Just Learning** - Interactive AI guides you through real situations
2. **Always Available** - Practice when you need it, not on a schedule
3. **Progressive Depth** - Start simple, grow sophisticated
4. **Connected to Human Support** - AI practice complements coaching with Cindy
5. **Multi-Modal** - Web for deep exploration, mobile for daily practice

---

## Nonviolent Communication (NVC) Framework

### The Four Components

NVC, developed by Marshall Rosenberg, consists of four interconnected components:

```
┌─────────────────────────────────────────────────────────────────┐
│                    NVC Process Flow                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   1. OBSERVATION          2. FEELING                           │
│   ┌─────────────────┐     ┌─────────────────┐                  │
│   │ What happened?  │ ──▶ │ How do I feel?  │                  │
│   │ (facts only,    │     │ (emotions, not  │                  │
│   │  no judgment)   │     │  thoughts)      │                  │
│   └─────────────────┘     └────────┬────────┘                  │
│                                    │                            │
│                                    ▼                            │
│   4. REQUEST              3. NEED                              │
│   ┌─────────────────┐     ┌─────────────────┐                  │
│   │ What would I    │ ◀── │ What need is    │                  │
│   │ like?           │     │ met or unmet?   │                  │
│   │ (concrete,      │     │ (universal      │                  │
│   │  doable)        │     │  human needs)   │                  │
│   └─────────────────┘     └─────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Component Details

#### 1. Observation (O)
**What:** Stating what happened without evaluation, interpretation, or judgment
**Why:** Creates shared understanding without triggering defensiveness
**Common Mistakes:**
- Adding interpretation: "You ignored me" vs "I said hello and you didn't respond"
- Generalizing: "You always..." or "You never..."
- Labeling: "That was rude" vs describing the behavior

**Product Implementation:**
- Observation prompts in AI practice
- "What happened?" as first question
- Feedback when observations contain judgments

#### 2. Feeling (F)
**What:** Identifying the emotion(s) arising from the observation
**Why:** Connects us to our humanity and vulnerability
**Common Mistakes:**
- Pseudo-feelings: "I feel abandoned" (implies someone abandoned me)
- Thoughts disguised as feelings: "I feel like you don't care"
- Blaming: "I feel hurt because you..."

**Product Implementation:**
- Feelings inventory with nuanced vocabulary
- Distinction between feelings and "faux feelings"
- Body sensation connection ("Where do you feel this?")

#### 3. Need (N)
**What:** Identifying the universal human need connected to the feeling
**Why:** Needs are universal—they create connection, not division
**Common Mistakes:**
- Confusing needs with strategies: "I need you to call me" vs "I need connection"
- Making needs about specific people: "I need YOU to..."
- Denying needs: "I don't need anything"

**Product Implementation:**
- Needs inventory organized by category
- Need vs strategy distinction training
- Connecting feelings to needs ("What need is alive?")

#### 4. Request (R)
**What:** A concrete, positive, doable ask
**Why:** Translates understanding into action
**Common Mistakes:**
- Demands (with punishment for refusal)
- Vague requests: "I want you to be nicer"
- Negative requests: "Stop doing X" vs "Would you be willing to Y?"

**Product Implementation:**
- Request formulation practice
- Checking for demand vs request energy
- Hearing "no" as information about needs

---

## The Two Directions of NVC

### Self-Empathy (Inward)
Applying NVC to understand your own experience:
- What am I observing?
- What am I feeling?
- What do I need?
- What would I like to request (of myself or others)?

**Use Cases:**
- Processing difficult emotions
- Preparing for challenging conversations
- Daily emotional check-ins
- Understanding recurring patterns

### Empathy for Others (Outward)
Guessing what another person might be experiencing:
- What are they observing?
- What might they be feeling?
- What might they be needing?
- What might their underlying request be?

**Use Cases:**
- Understanding someone who triggered you
- Preparing to hear someone's perspective
- Mediating conflicts
- Building compassion

---

## Core User Journeys

### Journey 1: Self-Empathy Practice

**Trigger:** User is upset, stressed, or confused about their emotions
**Goal:** Gain clarity on feelings and needs
**Flow:**

```
Entry Point: "How are you feeling right now?"
                    │
                    ▼
┌─────────────────────────────────────────┐
│ STEP 1: Name the Feeling               │
│                                         │
│ "I'm noticing I feel..."               │
│ [Feeling picker with categories]        │
│                                         │
│ AI: "It sounds like you're feeling     │
│      frustrated and maybe anxious.     │
│      Did I get that right?"            │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ STEP 2: Describe What Happened         │
│                                         │
│ "What's going on that's connected      │
│  to these feelings?"                   │
│                                         │
│ AI: Listens, reflects observations     │
│     Gently separates facts from        │
│     interpretations                    │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ STEP 3: Connect to Needs               │
│                                         │
│ "When you feel [feeling], it often     │
│  points to a need for..."              │
│ [Needs suggestions based on feeling]   │
│                                         │
│ AI: "Are you needing more [need]       │
│      in this situation?"               │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ STEP 4: Explore Requests               │
│                                         │
│ "What might support meeting this       │
│  need? What would you like?"           │
│                                         │
│ AI: Helps formulate concrete requests  │
│     Distinguishes requests from demands│
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ COMPLETION: Session Summary            │
│                                         │
│ O: What happened                       │
│ F: How you felt                        │
│ N: Needs identified                    │
│ R: Possible requests                   │
│                                         │
│ [Save to History] [Share] [New Session]│
└─────────────────────────────────────────┘
```

### Journey 2: Understanding Others (Empathy Practice)

**Trigger:** User is frustrated/confused by someone else's behavior
**Goal:** Develop empathy for the other person's experience
**Flow:**

```
Entry Point: "I want to understand someone better"
                    │
                    ▼
┌─────────────────────────────────────────┐
│ STEP 1: Describe Their Behavior        │
│                                         │
│ "What did they do or say?"             │
│                                         │
│ AI: Reflects back observations,        │
│     helps separate facts from          │
│     interpretations                    │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ STEP 2: Guess Their Feelings           │
│                                         │
│ "When they did that, they might        │
│  have been feeling..."                 │
│ [Feeling suggestions]                  │
│                                         │
│ AI: "What feelings might make sense    │
│      given what you observed?"         │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ STEP 3: Guess Their Needs              │
│                                         │
│ "People act that way when they need..."│
│ [Need suggestions]                     │
│                                         │
│ AI: "What universal need might they    │
│      be trying to meet?"               │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ STEP 4: Consider Their Request         │
│                                         │
│ "What might they want from you         │
│  or the situation?"                    │
│                                         │
│ AI: Helps imagine their perspective    │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ INSIGHT: Perspective Summary           │
│                                         │
│ "When [person] did [observation],      │
│  they might have been feeling [F]      │
│  because they needed [N]."             │
│                                         │
│ [How does this change things for you?] │
└─────────────────────────────────────────┘
```

### Journey 3: Preparing for a Conversation

**Trigger:** User has an upcoming difficult conversation
**Goal:** Prepare clear OFNR for both self and other
**Flow:**

```
Entry Point: "I need to have a difficult conversation"
                    │
                    ▼
┌─────────────────────────────────────────┐
│ CONTEXT                                │
│                                         │
│ "Who is this conversation with?"       │
│ "What's the situation?"                │
│                                         │
│ AI: Understands the relationship       │
│     and stakes involved                │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ YOUR SIDE: Self-Empathy                │
│                                         │
│ Complete OFNR for yourself:            │
│ - What you observed                    │
│ - How you feel about it                │
│ - What you need                        │
│ - What you'd like to request           │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ THEIR SIDE: Empathy Guesses            │
│                                         │
│ Guess their OFNR:                      │
│ - What they might have observed        │
│ - How they might feel                  │
│ - What they might need                 │
│ - What they might want                 │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ SHARED NEEDS                           │
│                                         │
│ "What needs do you both share?"        │
│ [Highlight overlapping needs]          │
│                                         │
│ AI: "You both seem to need [X].        │
│      Starting there might help."       │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ CONVERSATION PLAN                       │
│                                         │
│ Suggested opening:                     │
│ "When [O], I felt [F] because I        │
│  needed [N]. I'm wondering if you'd    │
│  be willing to [R]?"                   │
│                                         │
│ Prepare for their response:            │
│ - If they say yes                      │
│ - If they say no (what need?)          │
│ - If they get defensive                │
└─────────────────────────────────────────┘
```

### Journey 4: Conflict Resolution (Two-Person - Future)

**Trigger:** Two users want to work through a conflict together
**Goal:** Mutual understanding and shared solutions
**Flow:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONFLICT RESOLUTION                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐              ┌─────────────┐                  │
│  │  PERSON A   │              │  PERSON B   │                  │
│  └──────┬──────┘              └──────┬──────┘                  │
│         │                            │                          │
│         ▼                            ▼                          │
│  ┌─────────────┐              ┌─────────────┐                  │
│  │ My OFNR    │              │ My OFNR    │                  │
│  │ (private)   │              │ (private)   │                  │
│  └──────┬──────┘              └──────┬──────┘                  │
│         │                            │                          │
│         ▼                            ▼                          │
│  ┌─────────────┐              ┌─────────────┐                  │
│  │ Guess their │◄────────────►│ Guess their │                  │
│  │ OFNR        │   Exchange   │ OFNR        │                  │
│  └──────┬──────┘   guesses    └──────┬──────┘                  │
│         │                            │                          │
│         └────────────┬───────────────┘                          │
│                      ▼                                          │
│         ┌─────────────────────────┐                            │
│         │ SHARED UNDERSTANDING    │                            │
│         │                         │                            │
│         │ "You both need [X, Y]" │                            │
│         │ "Here's what differs..." │                           │
│         └────────────┬────────────┘                            │
│                      ▼                                          │
│         ┌─────────────────────────┐                            │
│         │ STRATEGY BRAINSTORM     │                            │
│         │                         │                            │
│         │ "What strategies might  │                            │
│         │  meet both needs?"      │                            │
│         └────────────┬────────────┘                            │
│                      ▼                                          │
│         ┌─────────────────────────┐                            │
│         │ AGREEMENT               │                            │
│         │                         │                            │
│         │ Shared requests/        │                            │
│         │ commitments             │                            │
│         └─────────────────────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Journey 5: Daily Check-In (Mobile-First)

**Trigger:** User opens app (habit), notification, or feels "off"
**Goal:** Quick emotional awareness and grounding
**Flow:**

```
Entry Point: App open or notification
                    │
                    ▼
┌─────────────────────────────────────────┐
│ QUICK CHECK-IN (< 2 minutes)           │
│                                         │
│ "How are you feeling right now?"       │
│                                         │
│ [5-emoji picker: 😊 😐 😔 😤 😰]         │
│ or [Full feelings list]                │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ NEED CONNECTION                         │
│                                         │
│ "What might you be needing?"           │
│                                         │
│ [3 suggested needs based on feeling]   │
│ [Browse all needs]                     │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ OPTIONAL: Go Deeper                    │
│                                         │
│ [Start full practice session]          │
│ [Just log this check-in]               │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│ LOGGED                                 │
│                                         │
│ "Check-in saved. 🔥 5 day streak!"      │
│                                         │
│ [View history] [Done]                  │
└─────────────────────────────────────────┘
```

---

## Feature Categories

### Category 1: Feelings & Needs Reference

**Purpose:** Educational foundation—the "dictionary" of emotional life

**Features:**
- **Feelings Inventory**
  - Organized by met/unmet needs
  - Parent categories (happy, sad, angry, etc.)
  - Granular feelings under each
  - Body sensation connections
  - Audio pronunciations (accessibility)

- **Needs Inventory**
  - Organized by category (connection, autonomy, meaning, etc.)
  - Universal human needs (not strategies)
  - Examples of each need
  - Related feelings

- **Feelings-Needs Mapping**
  - "When you feel X, you might need Y"
  - Bidirectional exploration
  - Pattern recognition over time

- **Faux Feelings Education**
  - "Abandoned," "rejected," "manipulated" are judgments
  - How to translate to true feelings
  - Practice identifying the difference

### Category 2: AI-Guided Practice

**Purpose:** Interactive skill-building through conversation

**Features:**
- **Self-Empathy Sessions**
  - Guided OFNR process
  - Reflection and clarification
  - Summary and insights

- **Empathy Practice**
  - Understanding others' perspectives
  - Guessing feelings and needs
  - Building compassion

- **Scenario Practice**
  - Pre-built scenarios (workplace, family, etc.)
  - User-submitted situations
  - Difficulty progression

- **Request Formulation**
  - Clear, positive, doable requests
  - Demand vs request distinction
  - Practicing flexibility

### Category 3: Progress & Tracking

**Purpose:** Motivation and pattern recognition

**Features:**
- **Practice Streaks**
  - Daily check-in tracking
  - Streak maintenance encouragement
  - Weekly/monthly views

- **Session History**
  - Past practice sessions
  - Key insights surfaced
  - Growth over time

- **Emotional Patterns**
  - Most common feelings over time
  - Most common needs
  - Triggers and patterns

- **Vocabulary Growth**
  - Feelings vocabulary expansion
  - Needs vocabulary expansion
  - Gamification (unlock new feelings)

### Category 4: Conflict & Connection Tools (Future)

**Purpose:** Apply NVC in relationships

**Features:**
- **Conversation Prep**
  - Prepare for difficult talks
  - Script OFNR statements
  - Anticipate responses

- **Shared Sessions** (two-person)
  - Invite partner/friend
  - Guided mediation
  - Mutual understanding exercises

- **Request Exchange**
  - Share requests with others
  - Track agreements
  - Follow-up check-ins

- **Celebration Practice**
  - Expressing gratitude in NVC
  - Celebrating met needs
  - Strengthening connection

---

## Platform Parity Matrix

| Feature | Web | iOS | Notes |
|---------|-----|-----|-------|
| **Reference** ||||
| Feelings inventory | ✓ | ✓ | Full depth both platforms |
| Needs inventory | ✓ | ✓ | Full depth both platforms |
| NVC basics education | ✓ | ✓ | Web has more, iOS summarized |
| Search feelings/needs | ✓ | ✓ | Native search on iOS |
| **Practice** ||||
| Self-empathy sessions | ✓ | ✓ | Core feature both |
| Empathy practice | ✓ | ✓ | Core feature both |
| Scenario library | ✓ | ✓ | Same scenarios |
| Request practice | ✓ | ✓ | Core feature both |
| Conversation prep | ✓ | ✓ | Web: deeper, iOS: quick |
| **Tracking** ||||
| Daily check-ins | ✓ | ✓ | iOS optimized for quick |
| Practice streaks | ✓ | ✓ | Synced across devices |
| Session history | ✓ | ✓ | Synced across devices |
| Emotional patterns | ✓ | ○ | Web deeper analytics |
| **Connection** (Future) ||||
| Two-person sessions | ✓ | ✓ | Core feature both |
| Request sharing | ✓ | ✓ | Share links |
| Agreements | ✓ | ○ | Web primary, iOS view |
| **About/Services** ||||
| About Cindy | Summary | Summary | Full site link |
| Services overview | ✓ | Summary | Link to web |
| Schedule session | Link | Link | Opens scheduler |
| Contact | ✓ | ✓ | Same form |

Legend: ✓ = Full feature, ○ = Limited/View-only, Link = External link

---

## Success Metrics

### Engagement Metrics
| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Daily Active Users | Track growth | Platform health |
| Sessions per user/week | > 3 | Habit formation |
| Session completion rate | > 70% | Content quality |
| Streak retention (7-day) | > 40% | Engagement |
| Streak retention (30-day) | > 20% | Long-term value |

### Learning Metrics
| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Feelings vocabulary used | Growing | Learning happening |
| Needs identified per session | > 2 | Depth of practice |
| Observation accuracy | Improving | Skill development |
| Request quality | Improving | Practical application |

### Outcome Metrics
| Metric | Target | Why It Matters |
|--------|--------|----------------|
| User-reported communication improvement | > 60% | Real-world impact |
| Conflict resolution success | Track | Feature value |
| Coaching conversion | Track | Business alignment |
| App Store rating | > 4.5 | User satisfaction |
| NPS score | > 50 | Recommendation likelihood |

---

## Guiding Principles for Development

### 1. Practice Over Theory
- Every screen should enable practice, not just explain concepts
- "Try it now" beats "learn about it"
- Interactive beats passive

### 2. Gentle Guidance, Not Judgment
- AI never criticizes or corrects harshly
- "I'm curious..." not "You should..."
- Celebrate attempts, refine gently

### 3. Progressive Depth
- Simple entry points (emoji picker)
- Depth available when ready (full feelings list)
- Don't overwhelm beginners

### 4. Universal, Not Prescriptive
- Needs are universal—honor that
- Multiple valid paths to meet needs
- User autonomy always respected

### 5. Connection to Human Support
- AI practice complements, never replaces
- Clear pathways to coaching
- Acknowledge AI limitations

### 6. Mobile-First, Web-Complete
- iOS: Quick, focused, daily use
- Web: Deep exploration, session prep
- Synced, not duplicated

---

## Next Steps

This document establishes the foundation. Each subsequent phase must:

1. **Reference this document** for feature decisions
2. **Implement user journeys** as defined here
3. **Measure success** against these metrics
4. **Honor these principles** in all interactions

**Phase 1:** Build UI components that support these journeys
**Phase 2:** Implement AI that guides these practices
**Phase 3:** Deploy infrastructure for synced experiences
**Phase 4:** Launch iOS with parity features

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-01-12 | Chris Therriault | Initial product foundation |
