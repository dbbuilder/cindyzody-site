# User Journeys & Use Cases

## Purpose

This document details specific user journeys, personas, and use cases for the Feelings & Needs platform. These journeys inform feature priorities, UX decisions, and success metrics.

---

## User Personas

### Persona 1: The NVC Newcomer
**Name:** Sarah, 32
**Situation:** Recently read "Nonviolent Communication" book, wants to practice
**Goals:**
- Learn feelings/needs vocabulary
- Practice identifying her own feelings
- Start using NVC with her partner

**Challenges:**
- Overwhelmed by new concepts
- Forgets steps in real conversations
- Feels awkward using new language

**Platform Use:**
- Daily check-ins to build habit
- Feelings/needs reference when stuck
- AI practice for low-stakes learning

**Key Needs:** Simplicity, encouragement, quick wins

---

### Persona 2: The Conflict Avoider
**Name:** Marcus, 45
**Situation:** Avoids difficult conversations at work and home
**Goals:**
- Prepare for specific conversations
- Build confidence to speak up
- Learn to hear others without reacting

**Challenges:**
- Triggers shut him down
- Fears conflict escalation
- Tends to people-please

**Platform Use:**
- Conversation prep before meetings
- Self-empathy after triggering events
- Empathy practice to understand boss/partner

**Key Needs:** Safety, preparation, scripts

---

### Persona 3: The Relationship Healer
**Name:** Alex & Jordan (couple)
**Situation:** Recurring conflicts, want deeper connection
**Goals:**
- Understand each other's needs
- Break negative communication patterns
- Rebuild trust after hurts

**Challenges:**
- Each feels unheard
- Conversations escalate quickly
- Historical resentment

**Platform Use:**
- Individual self-empathy work
- Sharing sessions together (future)
- Conversation prep before hard talks

**Key Needs:** Mutual understanding, fairness, progress

---

### Persona 4: The Personal Growth Seeker
**Name:** Maya, 28
**Situation:** Therapy background, wants daily practice
**Goals:**
- Deepen emotional awareness
- Build self-empathy habit
- Track patterns over time

**Challenges:**
- Knows concepts but doesn't practice
- Insights fade without reinforcement
- Wants measurable progress

**Platform Use:**
- Daily check-ins (streak building)
- Pattern analysis over time
- AI practice for deeper dives

**Key Needs:** Consistency, depth, progress tracking

---

### Persona 5: The Professional Helper
**Name:** Dr. Chen, 55
**Situation:** Therapist/coach who uses NVC with clients
**Goals:**
- Recommend tool to clients
- Use as between-session practice
- Reference for teaching

**Challenges:**
- Needs credible, safe resource
- Must complement (not replace) therapy
- Privacy concerns for clients

**Platform Use:**
- Recommends to clients
- Uses reference materials
- May connect with Cindy for collaboration

**Key Needs:** Professionalism, safety, clinical alignment

---

## Detailed User Journeys

### Journey 1: First-Time User Onboarding

**Scenario:** Sarah downloads iOS app after hearing about NVC

```
┌─────────────────────────────────────────────────────────────────┐
│                    ONBOARDING FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SCREEN 1: Welcome                                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │         Welcome to Feelings & Needs                     │   │
│  │                                                         │   │
│  │    Discover what you're really feeling,                │   │
│  │    understand what you truly need,                     │   │
│  │    and communicate with compassion.                    │   │
│  │                                                         │   │
│  │              [Get Started]                              │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  SCREEN 2: Experience Level                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    How familiar are you with                           │   │
│  │    Nonviolent Communication (NVC)?                     │   │
│  │                                                         │   │
│  │    [ ] New to NVC                                      │   │
│  │    [ ] Read about it / took a class                    │   │
│  │    [ ] Practice regularly                              │   │
│  │    [ ] Teach or coach NVC                              │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  SCREEN 3: First Check-In                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    Let's start with how you're feeling right now.      │   │
│  │                                                         │   │
│  │    [😊] [😐] [😔] [😤] [😰]                              │   │
│  │                                                         │   │
│  │    Tap one that fits, or [See more feelings]           │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  SCREEN 4: Need Connection                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    When you feel [selected], you might need:           │   │
│  │                                                         │   │
│  │    [Rest]  [Support]  [Understanding]                  │   │
│  │                                                         │   │
│  │    [See all needs]                                     │   │
│  │                                                         │   │
│  │    These are universal human needs -                   │   │
│  │    everyone has them!                                  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  SCREEN 5: Notification Preference                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    Would you like a daily reminder to check in?        │   │
│  │                                                         │   │
│  │    Building awareness takes practice.                  │   │
│  │    A gentle reminder can help.                         │   │
│  │                                                         │   │
│  │    [Yes, remind me]  [Maybe later]                     │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  SCREEN 6: Ready                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    You're all set! 🎉                                   │   │
│  │                                                         │   │
│  │    Try these to get started:                           │   │
│  │                                                         │   │
│  │    [🧘 Practice with AI]                                │   │
│  │    [📖 Explore Feelings]                                │   │
│  │    [💡 Learn NVC Basics]                                │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Success Metrics:**
- Onboarding completion rate > 80%
- First check-in completion > 90%
- Notification opt-in > 50%

---

### Journey 2: Daily Check-In (Mobile)

**Scenario:** Maya opens app in morning as part of routine

```
┌─────────────────────────────────────────────────────────────────┐
│                    DAILY CHECK-IN FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TRIGGER: App open or push notification                        │
│           "Good morning! How are you feeling?"                 │
│                                                                 │
│  STEP 1: Quick Feeling Selection (< 10 seconds)                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    Good morning, Maya                                   │   │
│  │                                                         │   │
│  │    How are you feeling right now?                       │   │
│  │                                                         │   │
│  │    [😊] [😐] [😔] [😤] [😰]                              │   │
│  │     ↑                                                   │   │
│  │    tap                                                  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 2: Nuance (optional, < 20 seconds)                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    Can you name it more specifically?                   │   │
│  │                                                         │   │
│  │    [anxious] [worried] [nervous]                        │   │
│  │    [scared] [apprehensive]                              │   │
│  │                                                         │   │
│  │    [Skip →]                                             │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 3: Need Connection (< 15 seconds)                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    When you feel anxious, you might need:               │   │
│  │                                                         │   │
│  │    [✓ Predictability]  [ Safety]  [ Clarity]            │   │
│  │                                                         │   │
│  │    [Done] or [Go deeper with AI →]                      │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 4: Logged                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    ✓ Check-in saved                                     │   │
│  │                                                         │   │
│  │    🔥 12 day streak!                                    │   │
│  │                                                         │   │
│  │    You've checked in 47 times this month.               │   │
│  │    Top feelings: anxious (8), calm (7), tired (6)       │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  TOTAL TIME: 30-60 seconds                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Success Metrics:**
- Check-in completion rate > 85%
- Average time < 60 seconds
- "Go deeper" selection > 15%

---

### Journey 3: Self-Empathy After Triggering Event

**Scenario:** Marcus had frustrating meeting, needs to process

```
┌─────────────────────────────────────────────────────────────────┐
│                    SELF-EMPATHY SESSION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ENTRY: Marcus taps "Start Practice" feeling upset             │
│                                                                 │
│  AI: "I'm here. What's happening for you right now?"           │
│                                                                 │
│  USER: "I just had the most frustrating meeting. My boss       │
│         completely dismissed my proposal in front of everyone  │
│         without even looking at it."                           │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  AI: "That sounds really hard. When your proposal was          │
│       dismissed without being considered, what feelings        │
│       are coming up for you?"                                  │
│                                                                 │
│       Quick picks: [frustrated] [angry] [hurt]                 │
│                                                                 │
│  USER: [frustrated] [hurt]                                     │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  AI: "Frustrated and hurt - I can understand that.             │
│                                                                 │
│       When you feel frustrated, it often points to a need      │
│       for effectiveness or being heard. And hurt often         │
│       connects to a need for respect or consideration.         │
│                                                                 │
│       What resonates for you - what do you think you           │
│       were needing in that meeting?"                           │
│                                                                 │
│       Suggestions: [respect] [to be heard] [consideration]     │
│                    [fairness] [acknowledgment]                 │
│                                                                 │
│  USER: "I guess I needed to be heard. And respected.           │
│         I worked really hard on that proposal."                │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  AI: "It sounds like being heard and respected are really      │
│       important to you - especially after putting in           │
│       significant effort.                                      │
│                                                                 │
│       It makes sense you'd feel frustrated and hurt when       │
│       those needs weren't met.                                 │
│                                                                 │
│       Would you like to:                                       │
│       [Explore what your boss might have been experiencing]    │
│       [Think about what you might want to request]             │
│       [Sit with this for now]                                  │
│                                                                 │
│  USER: [Explore what your boss might have been experiencing]   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  AI: "Let's guess what might have been going on for your       │
│       boss. This isn't to excuse the behavior, but to          │
│       understand it.                                           │
│                                                                 │
│       When someone dismisses something quickly without         │
│       looking, they might be feeling...                        │
│                                                                 │
│       [overwhelmed] [pressured] [anxious] [impatient]          │
│                                                                 │
│       What seems possible?"                                    │
│                                                                 │
│  USER: "Probably overwhelmed. They've been stressed about      │
│         the quarterly numbers."                                │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  AI: "So your boss might have been feeling overwhelmed,        │
│       possibly needing... support? Or ease? Or maybe           │
│       efficiency given the pressure they're under?             │
│                                                                 │
│       This doesn't make dismissing your work okay, but         │
│       it might explain why it happened.                        │
│                                                                 │
│       Knowing this, is there something you'd like to           │
│       request - of yourself, your boss, or the situation?"     │
│                                                                 │
│  USER: "Maybe I could ask for 15 minutes to present it         │
│         properly when they're less stressed."                  │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  AI: "That sounds like a clear, doable request that honors     │
│       your need to be heard while considering their            │
│       situation.                                               │
│                                                                 │
│       You might say: 'I notice you're under a lot of          │
│       pressure right now. I'd really value 15 minutes          │
│       to walk through my proposal when you have some           │
│       space. Would that work for you?'                         │
│                                                                 │
│       How does that land?"                                     │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  SESSION SUMMARY                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Observation: Proposal dismissed without review         │   │
│  │                                                         │   │
│  │  Your feelings: frustrated, hurt                        │   │
│  │  Your needs: to be heard, respect                       │   │
│  │                                                         │   │
│  │  Their possible feelings: overwhelmed                   │   │
│  │  Their possible needs: ease, efficiency                 │   │
│  │                                                         │   │
│  │  Possible request: 15 min dedicated time to present     │   │
│  │                                                         │   │
│  │  [Save to History] [Prepare Conversation] [Done]        │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Success Metrics:**
- Session completion rate > 65%
- Average messages > 8
- Empathy section selected > 40%
- Request formulated > 50%

---

### Journey 4: Conversation Preparation

**Scenario:** Alex prepares for talk with Jordan about household responsibilities

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONVERSATION PREP FLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ENTRY: Alex selects "Prepare for Conversation"                │
│                                                                 │
│  STEP 1: Context                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Who is this conversation with?                         │   │
│  │  [Partner/Spouse] [Family] [Friend] [Coworker] [Other] │   │
│  │                                                         │   │
│  │  What's the topic?                                      │   │
│  │  [Sharing household responsibilities more fairly]       │   │
│  │                                                         │   │
│  │  How important is this? (1-5)                           │   │
│  │  [●●●●○] 4 - Very important                            │   │
│  │                                                         │   │
│  │  How nervous are you? (1-5)                             │   │
│  │  [●●●○○] 3 - Moderately                                │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 2: Your Observation                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  What specific behaviors have you noticed?              │   │
│  │  (Facts only - what would a camera see?)                │   │
│  │                                                         │   │
│  │  "In the last week, I did the dishes 6 times,          │   │
│  │   you did them once. I also did all the laundry         │   │
│  │   and grocery shopping."                                │   │
│  │                                                         │   │
│  │  ✓ Good - these are observable facts                    │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 3: Your Feelings                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  When you think about this, how do you feel?            │   │
│  │                                                         │   │
│  │  [✓ exhausted] [✓ resentful] [ frustrated]             │   │
│  │  [ unappreciated] [ overwhelmed] [more...]              │   │
│  │                                                         │   │
│  │  Note: "unappreciated" is a faux feeling - it implies   │   │
│  │  they're not appreciating you. The feeling might be     │   │
│  │  "hurt" or "sad" with a need for appreciation.          │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 4: Your Needs                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  What needs are connected to these feelings?            │   │
│  │                                                         │   │
│  │  When feeling exhausted/resentful, you might need:      │   │
│  │                                                         │   │
│  │  [✓ support] [✓ fairness] [✓ rest]                     │   │
│  │  [ consideration] [ partnership] [more...]              │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 5: Your Request                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  What specific, doable thing would you like?            │   │
│  │                                                         │   │
│  │  "Would you be willing to take on dishes Mon/Wed/Fri   │   │
│  │   and alternate weeks on laundry?"                      │   │
│  │                                                         │   │
│  │  ✓ Clear ✓ Specific ✓ Doable                           │   │
│  │                                                         │   │
│  │  Remember: This is a request, not a demand.             │   │
│  │  They might say no - then we explore their needs.       │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 6: Their Perspective (Empathy)                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Now let's guess what might be going on for them...     │   │
│  │                                                         │   │
│  │  They might be feeling:                                 │   │
│  │  [✓ overwhelmed] [ guilty] [ defensive]                │   │
│  │                                                         │   │
│  │  They might be needing:                                 │   │
│  │  [✓ acknowledgment] [✓ understanding] [ rest]          │   │
│  │                                                         │   │
│  │  (Jordan has been working extra hours lately)           │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 7: Common Ground                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Needs you might share:                                 │   │
│  │                                                         │   │
│  │  • Support (you both need to feel supported)            │   │
│  │  • Rest (you're both tired)                             │   │
│  │  • Partnership (you both want teamwork)                 │   │
│  │                                                         │   │
│  │  Starting from shared needs creates connection.         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  STEP 8: Conversation Script                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  OPENING (start with connection):                       │   │
│  │  "I know we've both been really stretched lately.       │   │
│  │   I'd like to talk about how we're handling things      │   │
│  │   at home. Is now a good time?"                         │   │
│  │                                                         │   │
│  │  YOUR OFNR:                                             │   │
│  │  "I've noticed I've been doing most of the dishes       │   │
│  │   and laundry this week [O]. I'm feeling exhausted      │   │
│  │   and honestly a bit resentful [F], because I really    │   │
│  │   need support and fairness in how we share this [N].   │   │
│  │   Would you be willing to talk about dividing things    │   │
│  │   differently? [R]"                                     │   │
│  │                                                         │   │
│  │  IF THEY GET DEFENSIVE:                                 │   │
│  │  "It sounds like you might be feeling overwhelmed       │   │
│  │   too? I imagine you're needing acknowledgment for      │   │
│  │   how hard you've been working."                        │   │
│  │                                                         │   │
│  │  IF THEY SAY NO:                                        │   │
│  │  "I hear that doesn't work for you. Can you help me     │   │
│  │   understand what's making that hard? What do you       │   │
│  │   need right now?"                                      │   │
│  │                                                         │   │
│  │  [Save Script] [Practice with AI] [Print/Share]         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Success Metrics:**
- Prep completion rate > 60%
- Empathy step completion > 70%
- Script saved > 80%
- "Practice with AI" clicked > 30%

---

### Journey 5: Two-Person Conflict Resolution (Future)

**Scenario:** Alex and Jordan use the app together to work through issue

```
┌─────────────────────────────────────────────────────────────────┐
│              TWO-PERSON CONFLICT RESOLUTION                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SETUP: Alex invites Jordan via share link                     │
│                                                                 │
│  PHASE 1: Individual Reflection (Separate)                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Each person completes privately:                       │   │
│  │                                                         │   │
│  │  ALEX'S VIEW:                        JORDAN'S VIEW:     │   │
│  │  O: [what I observed]                O: [what I observed]│   │
│  │  F: exhausted, resentful             F: guilty, pressured│   │
│  │  N: support, fairness                N: acknowledgment   │   │
│  │  R: split chores equally             R: appreciation first│  │
│  │                                                         │   │
│  │  Guess THEIR feelings/needs:         Guess THEIR f/n:   │   │
│  │  F: overwhelmed, stressed            F: angry, hurt     │   │
│  │  N: understanding                    N: rest            │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  PHASE 2: Exchange Empathy Guesses                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Alex, here's what Jordan guessed about you:            │   │
│  │                                                         │   │
│  │  "I think Alex might be feeling angry and hurt,         │   │
│  │   needing rest."                                        │   │
│  │                                                         │   │
│  │  How accurate is this?                                  │   │
│  │  [✓ Partly] "Close - more exhausted than angry"         │   │
│  │                                                         │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  Jordan, here's what Alex guessed about you:            │   │
│  │                                                         │   │
│  │  "I think Jordan might be feeling overwhelmed,          │   │
│  │   needing understanding."                               │   │
│  │                                                         │   │
│  │  How accurate is this?                                  │   │
│  │  [✓ Yes!] "That's exactly it"                          │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  PHASE 3: Shared Understanding                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  WHAT YOU NOW KNOW:                                     │   │
│  │                                                         │   │
│  │  Alex is feeling: exhausted, resentful                  │   │
│  │  Alex needs: support, fairness, rest                    │   │
│  │                                                         │   │
│  │  Jordan is feeling: overwhelmed, guilty                 │   │
│  │  Jordan needs: acknowledgment, understanding            │   │
│  │                                                         │   │
│  │  NEEDS YOU SHARE:                                       │   │
│  │  • Support (you both need to feel supported)            │   │
│  │  • Rest (you're both exhausted)                         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  PHASE 4: Strategy Brainstorm                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Given both your needs, what strategies might work?     │   │
│  │                                                         │   │
│  │  ALEX suggests: "Hire a cleaner once a month"          │   │
│  │  JORDAN suggests: "I'll take over laundry completely"  │   │
│  │  AI suggests: "Written schedule with clear ownership"   │   │
│  │                                                         │   │
│  │  Vote on strategies: ❤️ ❤️ ❤️                           │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  PHASE 5: Agreement                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  YOUR AGREEMENT:                                        │   │
│  │                                                         │   │
│  │  1. Jordan takes over laundry completely                │   │
│  │  2. Alex handles dishes M/W/F, Jordan T/Th/weekend      │   │
│  │  3. Both acknowledge each other's work weekly           │   │
│  │  4. Revisit in 2 weeks to adjust                        │   │
│  │                                                         │   │
│  │  [Both sign off] ✓ Alex  ✓ Jordan                       │   │
│  │                                                         │   │
│  │  [Set reminder for check-in: 2 weeks]                   │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Success Metrics:**
- Both parties complete > 50%
- Empathy exchange accuracy > 60%
- Agreement reached > 70%
- Follow-up check-in completed > 40%

---

## Use Case Scenarios

### Scenario Library for Practice

| Category | Scenario | Difficulty |
|----------|----------|------------|
| **Workplace** | Boss criticizes your work publicly | Beginner |
| | Colleague takes credit for your idea | Intermediate |
| | Asked to work weekend last minute | Beginner |
| | Performance review disagreement | Advanced |
| | Team conflict between members | Advanced |
| **Family** | Parent gives unsolicited advice | Beginner |
| | Sibling disagrees on caregiving | Intermediate |
| | Child refuses to do chores | Intermediate |
| | In-law boundary violations | Advanced |
| | Family member with addiction | Advanced |
| **Romantic** | Partner forgets important date | Beginner |
| | Disagreement about spending | Intermediate |
| | Different needs for alone time | Intermediate |
| | Trust breach/past hurts | Advanced |
| | Deciding about having children | Advanced |
| **Friendship** | Friend cancels plans repeatedly | Beginner |
| | Feeling excluded from group | Intermediate |
| | Friend borrows money, doesn't repay | Intermediate |
| | Political disagreement | Advanced |
| **Self** | Procrastinating on important task | Beginner |
| | Inner critic being harsh | Intermediate |
| | Grieving a loss | Intermediate |
| | Major life decision paralysis | Advanced |

### Scenario Detail Example

```yaml
scenario:
  id: workplace-credit-taken
  title: "Colleague Takes Credit for Your Idea"
  category: workplace
  difficulty: intermediate

  setup: |
    In a team meeting, your colleague presented an idea that you
    had shared with them last week as their own. Your manager
    praised them for the innovative thinking. You said nothing
    in the moment.

  user_feelings_likely:
    - angry
    - hurt
    - betrayed (faux - translate to hurt, scared)
    - frustrated

  user_needs_likely:
    - acknowledgment
    - fairness
    - respect
    - honesty

  other_feelings_possible:
    - pressured (needed to impress)
    - anxious (about performance)
    - disconnected (didn't realize impact)

  other_needs_possible:
    - recognition
    - security (job)
    - belonging

  learning_objectives:
    - Distinguish observation from interpretation
    - Identify multiple needs at play
    - Consider other's perspective without excusing
    - Formulate clear request

  possible_requests:
    - "Would you be willing to mention my contribution to the manager?"
    - "Could we agree to credit ideas to their source in the future?"
    - "Would you tell me what was going on for you?"

  pitfalls_to_address:
    - Wanting to punish vs wanting needs met
    - "Betrayed" as faux feeling
    - Demand vs request energy
```

---

## Journey Metrics Dashboard

| Journey | Completion | Avg Time | Satisfaction |
|---------|------------|----------|--------------|
| Onboarding | 82% | 3 min | 4.2/5 |
| Daily Check-in | 91% | 45 sec | 4.5/5 |
| Self-Empathy | 67% | 8 min | 4.3/5 |
| Conversation Prep | 58% | 12 min | 4.4/5 |
| Two-Person (future) | TBD | TBD | TBD |

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-01-12 | Chris Therriault | Initial user journeys |
