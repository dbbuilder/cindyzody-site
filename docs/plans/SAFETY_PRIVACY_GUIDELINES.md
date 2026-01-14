# Safety & Privacy Guidelines

## Purpose

This document establishes safety protocols for crisis situations and privacy guidelines for handling sensitive user data in the Feelings & Needs platform.

---

## Part 1: Crisis Safety Protocols

### Overview

NVC practice often surfaces deep emotional content. Users may disclose:
- Mental health struggles
- Relationship abuse
- Self-harm or suicidal ideation
- Traumatic experiences
- Domestic violence situations

Our platform must respond appropriately while acknowledging we are **not a crisis intervention service**.

---

### Crisis Detection

#### Tier 1: High-Risk Keywords (Immediate Response)

```typescript
const TIER_1_KEYWORDS = [
  // Self-harm / Suicide
  'kill myself',
  'end my life',
  'want to die',
  'suicide',
  'self-harm',
  'cutting myself',
  'overdose',
  'no reason to live',

  // Imminent danger
  'going to hurt',
  'physically attacked',
  'in danger right now',
  'trapped',
  'can\'t escape'
]
```

**Response:** Immediate crisis resources overlay

#### Tier 2: Elevated Concern Keywords (Gentle Check-in)

```typescript
const TIER_2_KEYWORDS = [
  // Depression indicators
  'hopeless',
  'worthless',
  'burden to everyone',
  'nobody cares',
  'give up',
  'can\'t go on',

  // Abuse indicators
  'hits me',
  'scared of them',
  'controls everything',
  'threatens me',
  'isolated from friends',

  // Crisis adjacent
  'panic attack',
  'can\'t breathe',
  'breaking down'
]
```

**Response:** Supportive message with optional resources

---

### Crisis Response UI

#### Tier 1 Response (Immediate Overlay)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                    💚 We Care About You                          │
│                                                                  │
│  It sounds like you might be going through something            │
│  really difficult right now.                                     │
│                                                                  │
│  This app isn't equipped to provide crisis support, but         │
│  trained counselors are available 24/7:                         │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  📞 988 Suicide & Crisis Lifeline                         │  │
│  │     Call or text: 988                                      │  │
│  │     Available 24/7                              [Call Now] │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │  💬 Crisis Text Line                                       │  │
│  │     Text HOME to 741741                        [Text Now]  │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │  🌐 International Association for Suicide Prevention      │  │
│  │     https://www.iasp.info/resources/Crisis_Centres/       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [I'm safe, continue practicing]    [I need more resources]     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Tier 2 Response (Gentle In-Context)

```
┌─────────────────────────────────────────────────────────────────┐
│  AI FACILITATOR:                                                 │
│                                                                  │
│  Thank you for sharing that. It sounds like you're carrying     │
│  something heavy right now.                                      │
│                                                                  │
│  While this app can help you explore feelings and needs,        │
│  sometimes it helps to talk to someone trained in support.      │
│                                                                  │
│  Would you like me to:                                          │
│  • Continue exploring this with NVC tools                       │
│  • Show you some support resources                              │
│  • Suggest connecting with a counselor like Cindy               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### AI System Prompt Safety Layer

```typescript
const SAFETY_SYSTEM_PROMPT = `
CRITICAL SAFETY GUIDELINES:

1. NEVER provide medical, psychiatric, or crisis intervention advice.
2. NEVER minimize expressions of self-harm or suicidal ideation.
3. NEVER promise confidentiality - clearly state limitations.
4. ALWAYS acknowledge emotional pain with empathy.
5. ALWAYS defer to professional resources for crisis situations.

If user expresses:
- Suicidal thoughts → Acknowledge, express care, provide crisis resources
- Self-harm → Validate pain, avoid judgment, suggest professional support
- Abuse → Believe them, don't suggest they provoked it, offer resources
- Severe distress → Use grounding, suggest pausing if needed

RESPONSE TEMPLATE FOR CRISIS:
"I hear that you're in a lot of pain right now. That sounds incredibly
difficult. While I'm here to help you practice NVC, what you're going
through deserves support from someone trained to help with this. Would
you be open to connecting with a crisis counselor? They're available
24/7 and are wonderful at helping during really hard moments."
`
```

---

### Resource Database

```typescript
interface CrisisResource {
  name: string
  type: 'phone' | 'text' | 'chat' | 'website'
  contact: string
  description: string
  availability: string
  regions: string[]  // 'US', 'CA', 'UK', 'INT' for international
}

const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: '988 Suicide & Crisis Lifeline',
    type: 'phone',
    contact: '988',
    description: 'Free, confidential support for people in distress',
    availability: '24/7',
    regions: ['US']
  },
  {
    name: 'Crisis Text Line',
    type: 'text',
    contact: 'Text HOME to 741741',
    description: 'Text-based crisis support',
    availability: '24/7',
    regions: ['US', 'CA', 'UK']
  },
  {
    name: 'National Domestic Violence Hotline',
    type: 'phone',
    contact: '1-800-799-7233',
    description: 'Support for domestic violence survivors',
    availability: '24/7',
    regions: ['US']
  },
  {
    name: 'SAMHSA National Helpline',
    type: 'phone',
    contact: '1-800-662-4357',
    description: 'Mental health and substance abuse referrals',
    availability: '24/7',
    regions: ['US']
  },
  {
    name: 'International Association for Suicide Prevention',
    type: 'website',
    contact: 'https://www.iasp.info/resources/Crisis_Centres/',
    description: 'Directory of crisis centers worldwide',
    availability: 'Varies by region',
    regions: ['INT']
  }
]
```

---

### Mandatory Disclaimers

#### In-App Disclaimer (Settings > About)

```
IMPORTANT NOTICE

Feelings & Needs is an educational tool for practicing Nonviolent
Communication. It is NOT a substitute for professional mental health
care, therapy, or crisis intervention.

If you are experiencing a mental health emergency, please contact
emergency services or a crisis helpline immediately.

The AI facilitator in this app is designed to help you practice NVC
concepts. It is not a licensed therapist and should not be used for
medical advice or crisis support.

By using this app, you acknowledge these limitations and agree to
seek appropriate professional help when needed.
```

#### Session Start Reminder (First AI Session)

```
Before we begin, I want you to know: I'm an AI designed to help
you practice NVC. I'm not a therapist, and if you're going through
something really difficult, I'd encourage you to connect with a
professional who can give you the support you deserve.

That said, I'm here to help you explore your feelings and needs.
What's on your mind today?
```

---

## Part 2: Privacy Guidelines

### Data Classification

| Category | Sensitivity | Examples | Handling |
|----------|-------------|----------|----------|
| **Account** | Low | Email, name | Encrypted at rest |
| **Usage** | Low | Session counts, streaks | Aggregatable |
| **Emotional** | High | Feelings selected, AI conversations | Encrypted, no aggregation |
| **Relationship** | High | Partner info, agreements | Encrypted, access-controlled |
| **Crisis** | Critical | Crisis keyword triggers | Logged separately, deletion available |

---

### Data Collection Principles

1. **Minimal Collection** - Only collect what's needed for features
2. **Purpose Limitation** - Use data only for stated purposes
3. **User Control** - Users can view, export, and delete their data
4. **Transparency** - Clear documentation of what we collect and why

---

### What We Collect

```typescript
interface CollectedData {
  // Account data
  account: {
    email: string
    name?: string
    created_at: string
    subscription_tier: string
  }

  // Practice data
  sessions: {
    id: string
    type: string
    created_at: string
    duration_seconds: number
    feelings_selected: string[]
    needs_selected: string[]
    // Note: AI conversation content stored separately
  }[]

  // Check-in data
  checkins: {
    date: string
    feelings: string[]
    needs: string[]
    note?: string  // User-provided, optional
  }[]

  // Usage analytics (aggregated, anonymized)
  analytics: {
    screens_viewed: string[]
    features_used: string[]
    session_duration: number
    // No PII, no conversation content
  }
}
```

---

### What We DON'T Collect

- Precise location data
- Contact lists
- Photos or media
- Other app usage
- Keyboard input outside our app
- Biometric data
- Health data (unless user explicitly connects)

---

### Data Retention

| Data Type | Retention Period | Deletion Trigger |
|-----------|-----------------|------------------|
| Account info | Until account deletion | User request |
| AI conversations | 90 days | User request or auto-expire |
| Check-ins | 2 years | User request |
| Session summaries | 2 years | User request |
| Analytics | 1 year | Automatic |
| Crisis logs | 30 days | Automatic |

---

### User Rights (GDPR/CCPA Compliance)

#### Right to Access

```
GET /api/user/data-export

Response: ZIP file containing:
- account.json - Account information
- sessions.json - All session data
- checkins.json - Check-in history
- preferences.json - User preferences
- agreements.json - Any shared agreements
```

#### Right to Deletion

```
DELETE /api/user/account

Actions:
1. Queue all user data for deletion
2. Remove from active database immediately
3. Purge from backups within 30 days
4. Send confirmation email
5. Invalidate all sessions
```

#### Right to Correction

Users can edit:
- Name
- Email (with verification)
- Preferences
- Check-in notes
- Session notes

---

### Encryption Standards

| Data State | Encryption |
|------------|------------|
| In transit | TLS 1.3 |
| At rest (database) | AES-256 |
| At rest (backups) | AES-256 |
| Client storage (iOS) | iOS Keychain |
| Client storage (Web) | IndexedDB (unencrypted by default) |

---

### Third-Party Data Sharing

| Third Party | Data Shared | Purpose |
|-------------|-------------|---------|
| Anthropic (Claude) | Conversation text | AI facilitation |
| Supabase | All app data | Database hosting |
| Render | Server logs | Infrastructure |
| Sentry | Error logs (anonymized) | Error tracking |
| Apple | Analytics (if opted in) | App Store analytics |

**We do NOT sell data to advertisers or data brokers.**

---

### Privacy Policy Summary (User-Facing)

```markdown
# Privacy at Feelings & Needs

## What we collect
- Your email (to create your account)
- The feelings and needs you explore
- Your AI conversations (to save your progress)
- How you use the app (to make it better)

## What we DON'T do
- Sell your data to anyone
- Read your conversations (they're private)
- Track you outside our app
- Share your info without permission

## You're in control
- Download all your data anytime
- Delete your account and all data
- Turn off analytics
- Choose what to save or discard

## Keeping you safe
- All data encrypted
- Secure, trusted hosting
- Regular security reviews
- We follow GDPR & CCPA rules
```

---

### iOS App Store Privacy Labels

**Data Used to Track You:** None

**Data Linked to You:**
- Contact Info (Email)
- User Content (Feelings/needs selections, notes)

**Data Not Linked to You:**
- Usage Data
- Diagnostics

---

### Incident Response

#### Data Breach Protocol

1. **Detection** - Automated monitoring alerts
2. **Containment** - Isolate affected systems (< 1 hour)
3. **Assessment** - Determine scope and impact (< 4 hours)
4. **Notification** - Inform affected users (< 72 hours per GDPR)
5. **Remediation** - Fix vulnerability and restore service
6. **Review** - Post-incident analysis and improvements

#### User Notification Template

```
Subject: Important Security Notice from Feelings & Needs

Dear [Name],

We're writing to inform you of a security incident that may have
affected your account.

What happened: [Brief description]
When: [Date/time]
What was affected: [Data types]
What we've done: [Remediation steps]
What you should do: [Recommended actions]

We take the security of your data seriously and apologize for
any concern this may cause. If you have questions, please
contact us at privacy@feelingsandneeds.com.

Sincerely,
The Feelings & Needs Team
```

---

## Part 3: Content Moderation (Two-Person Features)

### Moderation Approach

For Phase 5 (two-person sessions), users can exchange messages. We implement:

1. **No Automatic Scanning** - We don't read private messages
2. **User Reporting** - Partners can report inappropriate content
3. **Block Functionality** - Users can block partners
4. **Session Termination** - Either party can end session immediately

### Reportable Content

```typescript
enum ReportReason {
  HARASSMENT = 'harassment',
  THREATS = 'threats',
  INAPPROPRIATE = 'inappropriate',
  SPAM = 'spam',
  IMPERSONATION = 'impersonation',
  OTHER = 'other'
}
```

### Report Handling

1. Reports reviewed within 24 hours
2. Account suspension for severe violations
3. Law enforcement notification if legally required
4. Appeal process available

---

## Implementation Checklist

### Pre-Launch (Phase 2)

- [ ] Crisis detection keywords implemented
- [ ] Crisis overlay UI built
- [ ] AI safety system prompt active
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Data export endpoint working
- [ ] Account deletion working
- [ ] Encryption verified

### iOS Launch (Phase 4)

- [ ] App Store privacy labels submitted
- [ ] Apple's data deletion requirements met
- [ ] Crisis resources localized
- [ ] Keychain storage implemented

### Two-Person Launch (Phase 5)

- [ ] Reporting system implemented
- [ ] Block functionality working
- [ ] Content moderation queue setup
- [ ] Incident response team identified

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-01-12 | Chris Therriault | Initial safety and privacy guidelines |
