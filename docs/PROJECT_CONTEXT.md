# Cindy Zody - Feelings & Needs Practice Platform

## Project Overview

A web application for **Cindy Zody's** NVC (Nonviolent Communication) coaching practice. The platform provides interactive tools for exploring feelings and needs, with AI-powered practice sessions and a guided GOFNR framework.

**Live URL**: https://www.cindyzody.com
**Dev Server**: http://localhost:21001 (Vite) + http://localhost:21000 (Express API)

---

## Tech Stack

- **Frontend**: Vue 3 (Composition API), Vite, Tailwind CSS
- **Backend**: Express.js (unified with frontend on Render)
- **Database**: SQLite (local session storage)
- **AI**: Claude API (claude-sonnet-4) for NVC practice sessions
- **Hosting**: Render (migrated from Vercel)

---

## Architecture

```
cindyzody-site/
├── src/
│   ├── components/
│   │   ├── lib/                    # Reusable NVC component library
│   │   │   ├── EmotionWheel.vue    # Interactive feelings wheel
│   │   │   ├── NeedsWheel.vue      # Interactive needs wheel
│   │   │   ├── ChatInterface.vue   # AI chat component
│   │   │   ├── ScrambledText.vue   # Letter animation component
│   │   │   ├── SessionSummary.vue  # Practice session summary
│   │   │   ├── CheckInWidget.vue   # Daily check-in
│   │   │   ├── StreakDisplay.vue   # Practice streak tracker
│   │   │   └── index.js            # Library exports
│   │   ├── Header.vue              # Site navigation
│   │   ├── Footer.vue              # Site footer
│   │   ├── SplashScreen.vue        # Animated intro (F/N circles)
│   │   ├── CustomScheduler.vue     # Appointment booking
│   │   └── ScenarioCard.vue        # Practice scenario card
│   │
│   ├── pages/
│   │   ├── Home.vue                # Landing page with hero
│   │   ├── About.vue               # About Cindy
│   │   ├── Practice.vue            # Main GOFNR practice page
│   │   ├── practice/               # GOFNR step sub-pages
│   │   │   ├── Goals.vue
│   │   │   ├── Observation.vue
│   │   │   ├── Feelings.vue
│   │   │   ├── Needs.vue
│   │   │   ├── Request.vue
│   │   │   └── Scenarios.vue       # Example scenarios
│   │   ├── services/               # Service offering pages
│   │   │   ├── Individual.vue
│   │   │   ├── Couples.vue
│   │   │   ├── GroupsWorkshops.vue
│   │   │   └── Workplace.vue
│   │   ├── approach/               # Methodology pages
│   │   │   ├── EmotionalIntelligence.vue
│   │   │   ├── NVC.vue
│   │   │   ├── IFS.vue
│   │   │   ├── Mindfulness.vue
│   │   │   ├── AttitudinalHealing.vue
│   │   │   ├── ConflictResolution.vue
│   │   │   └── Outcomes.vue
│   │   ├── groups/                 # Group workshop pages
│   │   │   ├── NVCFoundations.vue
│   │   │   ├── MindfulCommunication.vue
│   │   │   └── RepairAfterConflict.vue
│   │   ├── History.vue             # Practice history
│   │   ├── Progress.vue            # Progress tracking
│   │   ├── Services.vue            # Services overview
│   │   ├── Approach.vue            # Approach overview
│   │   ├── Groups.vue              # Groups overview
│   │   ├── Resources.vue           # Learning resources
│   │   ├── Contact.vue             # Contact form
│   │   └── Privacy.vue             # Privacy policy
│   │
│   ├── composables/
│   │   └── useAI.js                # AI service (real + mock)
│   │
│   ├── data/
│   │   ├── feelings.json           # 35 feelings (met/unmet, 3 intensities)
│   │   ├── needs.json              # 43 needs (7 categories)
│   │   └── scenarios.json          # Practice scenarios
│   │
│   ├── router/
│   │   └── index.js                # Vue Router configuration
│   │
│   └── utils/
│       └── analytics.js            # GA4, Meta, LinkedIn tracking
│
├── server/
│   ├── index.js                    # Express server entry
│   └── routes/
│       └── ai.js                   # AI chat/session endpoints
│
├── scripts/
│   └── generate-pdfs.js            # Puppeteer PDF generation
│
├── docs/                           # Documentation
├── pdfs/                           # Generated PDFs (gitignored)
├── data/                           # SQLite database
├── render.yaml                     # Render deployment config
└── tailwind.config.cjs             # Tailwind with NVC design tokens
```

---

## GOFNR Framework

The site implements a guided practice flow:

| Step | Letter | Description |
|------|--------|-------------|
| **Goals** | G | Set intentions for the conversation |
| **Observations** | O | Describe what happened without judgment |
| **Feelings** | F | Identify emotional responses (using EmotionWheel) |
| **Needs** | N | Connect feelings to universal human needs (using NeedsWheel) |
| **Request** | R | Craft clear, specific, doable requests |

**Main Implementation**: `src/pages/Practice.vue`
- Tab-based navigation with highlighted first letters (G, O, F, N, R)
- Breadcrumb navigation between steps
- AI Plan generation for goals
- PDF export of GOFNR roadmap

---

## Splash Screen Animation

**File**: `src/components/SplashScreen.vue`

### Animation Sequence (3.5 seconds)
1. **0-200ms**: Letters appear scrambled/scattered
2. **200-1000ms**: Letters animate into place spelling "FEELINGS" and "NEEDS"
3. **1000ms+**: Circles merge together
4. **Center circle**: Rotating NVC benefits appear

### Rotating Benefits
- Deeper Connection
- True Understanding
- Peaceful Resolution
- Authentic Expression
- Compassionate Listening
- Emotional Clarity
- Stronger Relationships
- Inner Peace
- Mutual Respect
- Heartfelt Communication
- Empathy & Growth
- Healing Conversations

Benefits rotate every 800ms with fade up/down transitions.

**Note**: Only shows once per session (uses sessionStorage).
**To test**: Run `sessionStorage.removeItem('splash_shown')` in console, then refresh.

---

## Routes (31 total)

### Main Pages
| Route | Component |
|-------|-----------|
| `/` | Home.vue |
| `/about` | About.vue |
| `/services` | Services.vue |
| `/approach` | Approach.vue |
| `/practice` | Practice.vue |
| `/groups` | Groups.vue |
| `/resources` | Resources.vue |
| `/contact` | Contact.vue |
| `/privacy` | Privacy.vue |

### Practice Sub-pages (GOFNR)
| Route | Component |
|-------|-----------|
| `/practice/goals` | Goals.vue |
| `/practice/observation` | Observation.vue |
| `/practice/feelings` | Feelings.vue |
| `/practice/needs` | Needs.vue |
| `/practice/request` | Request.vue |
| `/practice/scenarios` | Scenarios.vue |
| `/history` | History.vue |
| `/progress` | Progress.vue |

### Service Sub-pages
| Route | Component |
|-------|-----------|
| `/services/individual` | Individual.vue |
| `/services/couples` | Couples.vue |
| `/services/groups` | GroupsWorkshops.vue |
| `/services/workplace` | Workplace.vue |

### Approach Sub-pages
| Route | Component |
|-------|-----------|
| `/approach/emotional-intelligence` | EmotionalIntelligence.vue |
| `/approach/nvc` | NVC.vue |
| `/approach/ifs` | IFS.vue |
| `/approach/mindfulness` | Mindfulness.vue |
| `/approach/attitudinal-healing` | AttitudinalHealing.vue |
| `/approach/conflict-resolution` | ConflictResolution.vue |
| `/approach/outcomes` | Outcomes.vue |

### Group Sub-pages
| Route | Component |
|-------|-----------|
| `/groups/nvc-foundations` | NVCFoundations.vue |
| `/groups/mindful-communication` | MindfulCommunication.vue |
| `/groups/repair-after-conflict` | RepairAfterConflict.vue |

---

## Key Components

### EmotionWheel
Interactive feelings explorer:
- Two categories: "Needs Met" (emerald) and "Needs Unmet" (indigo)
- Three intensity levels per category (high, medium, low)
- Visual ring-based SVG layout
- Multi-select up to 5 feelings
- Hover tooltips with body sensations
- Related needs mapping

### NeedsWheel
Universal human needs explorer with 7 categories:
- Connection (pink)
- Autonomy (green)
- Meaning (blue)
- Well-being (yellow)
- Honesty (purple)
- Peace (orange)
- Play (indigo)

### ChatInterface
AI-powered NVC practice chat:
- Real-time messaging with Claude AI
- Conversation history for context
- Feeling/need suggestions from responses
- Follow-up prompts
- Crisis detection with safety resources
- Session persistence to localStorage

### ScrambledText
Reusable letter animation component:
- Letters start at random positions with random rotations
- Animate smoothly into place
- Configurable delay, duration, stagger
- Highlight first letter option

---

## AI System

### Frontend Composable
**File**: `src/composables/useAI.js`

- `useAI()` - Real API integration
- `useMockAI()` - Development/demo fallback

**Features**:
- Session management
- Conversation history passed to backend
- localStorage persistence (max 10 sessions)
- Crisis detection handling

### Backend Routes
**File**: `server/routes/ai.js`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/session` | Create new session |
| POST | `/api/ai/chat` | Send message (with history) |
| GET | `/api/ai/session/:id/summary` | Get OFNR extraction |

**Model**: `claude-sonnet-4-20250514`

**System Prompt** includes:
- NVC facilitator role
- OFNR framework guidance
- Feeling vs faux-feeling distinction
- Crisis detection keywords
- Response format guidelines

---

## Data Models

### Feeling
```json
{
  "id": "frustrated",
  "label": "Frustrated",
  "category": "needs_unmet",
  "intensity": "medium",
  "bodySensations": ["tension", "heat"],
  "relatedNeeds": ["effectiveness", "progress"],
  "description": "Blocked from achieving goals"
}
```

### Need
```json
{
  "id": "connection",
  "label": "Connection",
  "category": "connection",
  "description": "To feel close to others...",
  "examples": ["Being truly heard"],
  "reflectionQuestions": ["Where do I feel most connected?"]
}
```

### Scenario
```json
{
  "id": "workplace-feedback",
  "title": "Receiving Difficult Feedback",
  "description": "Your manager gives critical feedback...",
  "category": "workplace",
  "difficulty": "beginner",
  "suggestedFeelings": ["hurt", "anxious", "frustrated"],
  "suggestedNeeds": ["respect", "competence", "understanding"],
  "practiceGoals": ["Identify observation vs evaluation"]
}
```

---

## Design System

### Colors (Tailwind)
```javascript
brand: { 50-900 }           // Nature green for CTAs
earth: { 50-900 }           // Golden/warm secondary
sage: { 50-900 }            // Forest green neutrals

feeling: {
  met: '#10b981',           // Emerald
  unmet: '#6366f1'          // Indigo
}

need: {
  connection: '#ec4899',    // Pink
  physical: '#22c55e',      // Green
  honesty: '#3b82f6',       // Blue
  play: '#eab308',          // Yellow
  peace: '#a855f7',         // Purple
  autonomy: '#f97316',      // Orange
  meaning: '#6366f1'        // Indigo
}
```

---

## PDF Generation

**Script**: `scripts/generate-pdfs.js`

Uses Puppeteer to:
1. Generate individual PDFs for all 31 routes
2. Verify each PDF (size, structure, page count)
3. Combine into `cindyzody-complete-site.pdf` with title page

**Commands**:
```bash
# Full generation
node scripts/generate-pdfs.js --base-url http://localhost:PORT

# Verify and combine only
node scripts/generate-pdfs.js --verify-only
```

**Output**: `pdfs/` directory
- 31 individual page PDFs
- 1 combined PDF (121 pages, ~24MB)

**Note**: `home.pdf` excluded from combined PDF due to intro animations.

---

## Development

```bash
# Install dependencies
npm install

# Run dev server (Express + Vite concurrent)
npm run dev

# Frontend only
npm run dev:client

# Backend only
npm run dev:server

# Build for production
npm run build

# Preview production
npm run preview
```

### Ports
- **21000**: Express API server
- **21001+**: Vite dev server (auto-increments if busy)

---

## Environment Variables

```bash
# Site
VITE_SITE_NAME="Cindy Zody — Communications Practitioner"
VITE_SITE_URL="https://www.cindyzody.com"

# Analytics
VITE_GA_ID=""                    # Google Analytics 4
VITE_META_PIXEL_ID=""            # Meta/Facebook Pixel
VITE_LINKEDIN_PARTNER_ID=""      # LinkedIn Insight

# API
VITE_API_URL=""                  # Backend API URL

# Backend
ANTHROPIC_API_KEY=""             # Required for AI chat
PORT=21000                       # Server port
```

---

## Deployment (Render)

```yaml
# render.yaml
services:
  - type: web
    name: cindyzody-site
    runtime: node
    buildCommand: npm ci && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: ANTHROPIC_API_KEY
        sync: false
```

---

## Recent Updates (January 2026)

### Latest Commit (dcc362c)
**Add GOFNR practice flow, splash animation, and comprehensive site updates**

- Splash screen: Full FEELINGS/NEEDS words with scrambled letter animation
- Rotating NVC benefits in center overlap (12 benefits, 800ms rotation)
- AI chat: Added conversation history for better multi-turn context
- GOFNR framework: Goals, Observation, Feelings, Needs, Request tabs
- New sub-pages: approach/, groups/, practice/, services/ directories
- PDF generation script with Puppeteer (31 pages + combined PDF)
- ScrambledText reusable component for letter animations
- Added pdfs/ to .gitignore

### Feature Details

1. **GOFNR Flow Enhancement**
   - Added Observations step between Goals and Feelings
   - Added Request step after Needs
   - Breadcrumb navigation showing previous step
   - First letters highlighted in green (G, O, F, N, R)

2. **Splash Screen Animation**
   - Full "FEELINGS" and "NEEDS" words (not just F/N)
   - Scrambled letters animate into place
   - Rotating NVC benefits in center overlap
   - Extended duration (3.5 seconds)

3. **AI Improvements**
   - Conversation history passed to backend
   - Better context for coherent multi-turn conversations

4. **PDF Generation**
   - Automated Puppeteer script for all pages
   - Verification loop checking file size and structure
   - Combined PDF with custom title page
   - Home page excluded (animation issues)

5. **Example Scenarios**
   - Standalone Scenarios page (`/practice/scenarios`)
   - Dropdown in Goals to start from examples
   - Categories: Self, Workplace, Family, Romantic, Friendship

---

## Contact

**Cindy Zody**
Communications Practitioner
- Email: cindyzody@gmail.com
- Phone: (206) 992-5992
- Website: https://www.cindyzody.com
