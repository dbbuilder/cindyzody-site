# Cindy Zody - Feelings & Needs Practice Platform

## Project Overview

A web application for Cindy Zody's NVC (Nonviolent Communication) coaching practice. The platform provides interactive tools for exploring feelings and needs, with AI-powered practice sessions.

**Live URL**: TBD (Render deployment)
**Dev Server**: http://localhost:21001 (Vite) + http://localhost:21000 (Express API)

## Tech Stack

- **Frontend**: Vue 3 (Composition API), Vite, Tailwind CSS
- **Backend**: Express.js (unified with frontend on Render)
- **AI**: Claude API for NVC practice sessions
- **Hosting**: Render (migrated from Vercel)

## Architecture

```
cindyzody-site/
├── src/
│   ├── components/
│   │   └── lib/                    # Reusable NVC component library
│   │       ├── EmotionWheel.vue    # Interactive feelings wheel (NEW)
│   │       ├── NeedsWheel.vue      # Interactive needs wheel (NEW)
│   │       ├── FeelingPicker.vue   # Original feelings picker
│   │       ├── NeedBrowser.vue     # Original needs browser
│   │       ├── FeelingCard.vue     # Individual feeling card
│   │       ├── NeedCard.vue        # Individual need card
│   │       ├── ChatInterface.vue   # AI chat component
│   │       ├── SessionSummary.vue  # Practice session summary
│   │       ├── CheckInWidget.vue   # Daily check-in
│   │       └── StreakDisplay.vue   # Practice streak tracker
│   ├── pages/
│   │   ├── Home.vue                # Landing page with hero
│   │   ├── About.vue               # About Cindy
│   │   ├── Practice.vue            # Main practice page (wheels + AI)
│   │   ├── Resources.vue           # NVC resources
│   │   └── Contact.vue             # Contact form
│   ├── composables/
│   │   └── useAI.js                # AI service composable
│   ├── data/
│   │   ├── feelings.json           # 35 feelings (met/unmet, 3 intensities)
│   │   └── needs.json              # 43 needs (7 categories)
│   └── utils/
│       └── analytics.js            # Event tracking
├── server/
│   ├── index.js                    # Express server entry
│   └── routes/
│       ├── ai.js                   # AI chat/session endpoints
│       ├── contact.js              # Contact form endpoint
│       └── schedule.js             # Scheduling endpoint
├── render.yaml                     # Render deployment config
└── tailwind.config.cjs             # Tailwind with NVC design tokens
```

## Data Models

### Feelings (`src/data/feelings.json`)

```json
{
  "categories": {
    "needs_met": { "label": "When Needs Are Met" },
    "needs_unmet": { "label": "When Needs Are Unmet" }
  },
  "feelings": [
    {
      "id": "angry",
      "label": "Angry",
      "category": "needs_unmet",
      "intensity": "high",           // high, medium, low
      "bodySensations": ["heat", "tension", "clenched jaw"],
      "relatedNeeds": ["respect", "fairness", "autonomy"],
      "synonyms": ["furious", "enraged", "mad"],
      "description": "Strong response to perceived violation of needs"
    }
  ],
  "fauxFeelings": [
    {
      "id": "abandoned",
      "label": "Abandoned",
      "interpretation": "I think others have left me",
      "realFeelings": ["lonely", "scared", "hurt", "sad"]
    }
  ]
}
```

### Needs (`src/data/needs.json`)

```json
{
  "categories": [
    { "id": "connection", "label": "Connection", "color": "rose" },
    { "id": "physical", "label": "Physical Well-being", "color": "green" },
    { "id": "honesty", "label": "Honesty", "color": "blue" },
    { "id": "play", "label": "Play", "color": "yellow" },
    { "id": "peace", "label": "Peace", "color": "purple" },
    { "id": "autonomy", "label": "Autonomy", "color": "orange" },
    { "id": "meaning", "label": "Meaning", "color": "indigo" }
  ],
  "needs": [
    {
      "id": "acceptance",
      "label": "Acceptance",
      "category": "connection",
      "description": "To be received as we are, without conditions",
      "examples": ["Being welcomed without proving yourself"],
      "reflectionQuestions": ["Where do I feel most accepted?"],
      "relatedFeelingsMet": ["peaceful", "content", "grateful"],
      "relatedFeelingsUnmet": ["lonely", "sad", "hurt"]
    }
  ]
}
```

## Key Components

### EmotionWheel (NEW)

Interactive wheel for exploring feelings with progressive disclosure:

1. **Overview Mode**: Shows 3 concentric rings by intensity (Subtle, Moderate, Strong)
2. **Expanded Mode**: Click a ring to see all feelings at that intensity
3. **Features**:
   - YOU at center
   - Met/Unmet toggle with animated color transition
   - Hover tooltips with body sensations
   - Multi-select up to 5 feelings
   - Staggered entrance animations

### NeedsWheel (NEW)

Interactive wheel for exploring needs by category:

1. **Overview Mode**: Shows 7 category nodes (Connection, Physical, Honesty, Play, Peace, Autonomy, Meaning)
2. **Expanded Mode**: Click a category to see all needs in it
3. **Features**:
   - Category icons and colors
   - Count badges showing needs per category
   - Hover tooltips with examples and reflection questions
   - Multi-select up to 5 needs

### ChatInterface

AI-powered NVC practice chat:

- OFNR framework guidance (Observation, Feeling, Need, Request)
- Crisis detection and appropriate responses
- Context-aware based on selected feelings/needs
- Session history and summaries

## Design System

### Colors (Tailwind tokens)

```javascript
// Brand (nature green)
brand: { 50: '#f0fdf4', 500: '#22c55e', 700: '#15803d' }

// Feelings
feeling: {
  met: { light: '#ecfdf5', DEFAULT: '#10b981' },    // Emerald
  unmet: { light: '#f0f9ff', DEFAULT: '#6366f1' }   // Indigo
}

// Need categories
need: {
  connection: '#ec4899',  // Pink
  physical: '#22c55e',    // Green
  honesty: '#3b82f6',     // Blue
  play: '#eab308',        // Yellow
  peace: '#a855f7',       // Purple
  autonomy: '#f97316',    // Orange
  meaning: '#6366f1'      // Indigo
}

// Intensity
intensity: {
  high: '#ef4444',        // Red
  medium: '#f59e0b',      // Amber
  low: '#3b82f6'          // Blue
}
```

### Animations

- **Breathing rings**: Subtle scale pulsing on wheel backgrounds
- **Staggered entrance**: Nodes animate in sequentially with spring physics
- **Hover scale**: 1.15x scale on hover
- **Selection glow**: Pulsing glow effect on selected items
- **View transitions**: Fade + scale between overview/expanded modes

## API Endpoints

### POST /api/ai/session
Create new practice session

```json
{
  "type": "self-empathy",
  "feelings": [{ "id": "frustrated", "label": "Frustrated" }],
  "needs": [{ "id": "respect", "label": "Respect" }]
}
```

### POST /api/ai/chat
Send message in active session

```json
{
  "sessionId": "uuid",
  "message": "I had a conflict with my colleague..."
}
```

### POST /api/contact
Submit contact form

### POST /api/schedule
Request coaching session

## Development

```bash
# Install dependencies
npm install

# Run dev server (Express + Vite concurrent)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Ports
- **21000**: Express API server
- **21001**: Vite dev server (proxies /api to 21000)

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

## NVC Framework Reference

### OFNR Process
1. **Observation**: What happened (without judgment)
2. **Feeling**: What you're feeling
3. **Need**: The underlying need
4. **Request**: A specific, actionable request

### Feeling vs Faux-Feeling
- **Real feelings**: Internal states (angry, sad, joyful)
- **Faux feelings**: Thoughts disguised as feelings (abandoned, attacked, betrayed)
  - These imply what someone did TO you
  - The app helps translate faux feelings to real feelings

## Future Considerations

### Strategic Partnerships Researched
- **King Center Nonviolence365**: Legitimate potential partnership for Kingian Nonviolence integration
- **Dr. Aaron Gibson**: Research inconclusive on NVC practice connection

### Potential Enhancements
- Guided meditation integration
- Progress tracking over time
- Community/group practice features
- Mobile app (React Native)
- Integration with scheduling tools (Calendly, etc.)
