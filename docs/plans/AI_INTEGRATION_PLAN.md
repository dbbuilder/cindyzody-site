# Phase 2: AI Integration Enhancement Plan

## Objective

Transform the current external-redirect AI integration into a seamless, embedded experience that enables users to practice NVC with guided AI facilitation without leaving the app.

---

## Current State

### How It Works Now
1. User clicks "Start Practice Session" on Practice page
2. `window.open()` opens NVCAI tool in new tab
3. User practices in separate browser window
4. No session persistence or history
5. No connection back to main site

### Pain Points
- Context switching (new tab disrupts flow)
- No session continuity
- No progress tracking
- No personalization
- Analytics limited to click events

---

## Target Experience

### Seamless Flow
1. User starts practice directly in-app
2. AI facilitator appears in embedded component
3. Session history persists across visits
4. Progress tracking motivates continued practice
5. Personalized suggestions based on history

---

## Architecture Options

### Option A: Embedded iframe (Quick Win)

**Approach:** Embed NVCAI in an iframe with postMessage communication

```vue
<!-- src/components/ai/AIFacilitator.vue -->
<template>
  <div class="h-[600px] rounded-xl overflow-hidden border shadow-lg">
    <iframe
      ref="aiFrame"
      :src="nvcaiUrl"
      class="w-full h-full"
      allow="microphone"
      @load="onFrameLoad"
    />
  </div>
</template>

<script setup>
const handleMessage = (event) => {
  if (event.origin !== nvcaiOrigin) return

  // Handle events from NVCAI
  if (event.data.type === 'session_complete') {
    saveSession(event.data.session)
    trackEvent('practice_session_complete', event.data.metrics)
  }
}

onMounted(() => window.addEventListener('message', handleMessage))
onUnmounted(() => window.removeEventListener('message', handleMessage))
</script>
```

**Pros:**
- Fastest to implement
- No NVCAI backend changes needed
- Maintains separation of concerns

**Cons:**
- Limited control over UX
- Cross-origin restrictions
- Dependent on NVCAI supporting iframe embedding

### Option B: API Integration (Recommended)

**Approach:** Build custom chat interface that calls NVCAI API directly

```
┌─────────────────────────────────────────────────────────┐
│                    Vue Frontend                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │              AIFacilitator Component              │  │
│  │  ┌─────────────┐  ┌─────────────────────────────┐ │  │
│  │  │ Chat UI     │  │ Practice Controls           │ │  │
│  │  │ - Messages  │  │ - Start/Stop Session        │ │  │
│  │  │ - Input     │  │ - Select Scenario           │ │  │
│  │  │ - Typing    │  │ - View History              │ │  │
│  │  └─────────────┘  └─────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    Backend API (Render)                 │
│  ┌───────────────────────────────────────────────────┐  │
│  │  POST /api/ai/chat       - Send message           │  │
│  │  GET  /api/ai/session    - Get session history    │  │
│  │  POST /api/ai/session    - Create new session     │  │
│  │  GET  /api/ai/scenarios  - List practice scenarios│  │
│  └───────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    NVCAI Service                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │  LLM API calls with NVC-specific system prompts   │  │
│  │  - Anthropic Claude / OpenAI GPT                  │  │
│  │  - NVC facilitation logic                         │  │
│  │  - Feelings/Needs vocabulary                      │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Pros:**
- Full control over UX
- Native app feel
- Session persistence built-in
- Offline queue support
- Better analytics

**Cons:**
- More development effort
- Need to replicate NVCAI logic or expose API

### Option C: Hybrid (Phased Approach)

1. **Phase 2a:** Implement iframe embedding with basic session tracking
2. **Phase 2b:** Build native chat UI with API integration
3. **Phase 2c:** Add advanced features (scenarios, history, progress)

---

## Recommended Implementation: Hybrid Approach

### Phase 2a: Enhanced iframe (Immediate)

```vue
<!-- src/components/ai/EmbeddedPractice.vue -->
<template>
  <Dialog :open="isOpen" @close="handleClose">
    <DialogPanel class="fixed inset-4 md:inset-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <h2 class="font-semibold">NVC Practice Session</h2>
          <p class="text-sm text-slate-500">Session started {{ sessionDuration }}</p>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="sm" @click="endSession">
            End Session
          </Button>
          <button @click="handleClose" class="p-2 hover:bg-slate-100 rounded-lg">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- iframe -->
      <iframe
        :src="nvcaiUrl"
        class="w-full h-[calc(100%-60px)]"
        allow="microphone"
      />
    </DialogPanel>
  </Dialog>
</template>
```

### Phase 2b: Native Chat Interface

```vue
<!-- src/components/ai/ChatInterface.vue -->
<template>
  <div class="flex flex-col h-full">
    <!-- Messages -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <TransitionGroup name="message">
        <ChatMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :isUser="message.role === 'user'"
        />
      </TransitionGroup>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex items-center gap-2 text-slate-500">
        <div class="flex gap-1">
          <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms" />
          <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms" />
          <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms" />
        </div>
        <span class="text-sm">AI is thinking...</span>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t p-4">
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <Input
          v-model="input"
          placeholder="Share what's happening..."
          class="flex-1"
          :disabled="isTyping"
        />
        <Button type="submit" :loading="isTyping" :disabled="!input.trim()">
          Send
        </Button>
      </form>

      <!-- Quick actions -->
      <div class="flex gap-2 mt-2">
        <button
          v-for="prompt in quickPrompts"
          :key="prompt"
          @click="input = prompt"
          class="text-xs px-2 py-1 bg-slate-100 rounded-full hover:bg-slate-200"
        >
          {{ prompt }}
        </button>
      </div>
    </div>
  </div>
</template>
```

### Phase 2c: Advanced Features

#### Session History

```vue
<!-- src/components/ai/SessionHistory.vue -->
<template>
  <div class="space-y-4">
    <h3 class="font-semibold">Practice History</h3>

    <div v-for="session in sessions" :key="session.id" class="border rounded-lg p-4">
      <div class="flex justify-between items-start">
        <div>
          <p class="font-medium">{{ session.scenario || 'Open Practice' }}</p>
          <p class="text-sm text-slate-500">{{ formatDate(session.createdAt) }}</p>
        </div>
        <Badge :variant="session.completed ? 'success' : 'warning'">
          {{ session.completed ? 'Completed' : 'In Progress' }}
        </Badge>
      </div>

      <div class="mt-2 flex gap-4 text-sm text-slate-600">
        <span>{{ session.messageCount }} messages</span>
        <span>{{ formatDuration(session.duration) }}</span>
      </div>

      <Button variant="ghost" size="sm" class="mt-2" @click="resumeSession(session)">
        {{ session.completed ? 'Review' : 'Continue' }}
      </Button>
    </div>
  </div>
</template>
```

#### Practice Scenarios

```js
// src/data/scenarios.js
export const practiceScenarios = [
  {
    id: 'workplace-feedback',
    title: 'Receiving Difficult Feedback',
    description: 'Practice responding to critical feedback from a colleague or manager',
    difficulty: 'beginner',
    openingPrompt: "Your manager just told you that your recent project didn't meet expectations..."
  },
  {
    id: 'family-boundary',
    title: 'Setting Boundaries with Family',
    description: 'Practice expressing your needs while maintaining connection',
    difficulty: 'intermediate',
    openingPrompt: "A family member keeps making comments about your life choices..."
  },
  {
    id: 'conflict-resolution',
    title: 'Mediating a Disagreement',
    description: 'Practice facilitating understanding between two perspectives',
    difficulty: 'advanced',
    openingPrompt: "Two friends are in conflict and have asked for your help..."
  },
  {
    id: 'self-empathy',
    title: 'Self-Empathy Practice',
    description: 'Practice connecting with your own feelings and needs',
    difficulty: 'beginner',
    openingPrompt: "Take a moment to reflect on something that's been weighing on you..."
  },
  {
    id: 'open-practice',
    title: 'Open Practice',
    description: 'Bring your own situation for guided NVC practice',
    difficulty: 'any',
    openingPrompt: null
  }
]
```

#### Progress Tracking

```vue
<!-- src/components/ai/ProgressTracker.vue -->
<template>
  <div class="bg-brand-50 rounded-xl p-6">
    <h3 class="font-semibold mb-4">Your Practice Journey</h3>

    <!-- Streak -->
    <div class="flex items-center gap-3 mb-4">
      <div class="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
        <FireIcon class="w-6 h-6 text-brand-600" />
      </div>
      <div>
        <p class="text-2xl font-bold text-brand-700">{{ streak }} days</p>
        <p class="text-sm text-slate-600">Current streak</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 text-center">
      <div>
        <p class="text-xl font-semibold">{{ totalSessions }}</p>
        <p class="text-xs text-slate-500">Sessions</p>
      </div>
      <div>
        <p class="text-xl font-semibold">{{ formatTime(totalTime) }}</p>
        <p class="text-xs text-slate-500">Practice Time</p>
      </div>
      <div>
        <p class="text-xl font-semibold">{{ scenariosCompleted }}</p>
        <p class="text-xs text-slate-500">Scenarios</p>
      </div>
    </div>

    <!-- Weekly calendar -->
    <div class="mt-4 flex justify-between">
      <div
        v-for="day in weekDays"
        :key="day.date"
        :class="[
          'w-8 h-8 rounded-full flex items-center justify-center text-xs',
          day.practiced ? 'bg-brand-500 text-white' : 'bg-slate-100'
        ]"
      >
        {{ day.label }}
      </div>
    </div>
  </div>
</template>
```

---

## Backend API Design

### Endpoints

```
POST   /api/ai/sessions              Create new practice session
GET    /api/ai/sessions              List user's sessions
GET    /api/ai/sessions/:id          Get session details
PATCH  /api/ai/sessions/:id          Update session (end, add notes)
DELETE /api/ai/sessions/:id          Delete session

POST   /api/ai/sessions/:id/messages Send message, get AI response
GET    /api/ai/sessions/:id/messages Get message history

GET    /api/ai/scenarios             List practice scenarios
GET    /api/ai/progress              Get user's progress stats
```

### Database Schema (PostgreSQL)

```sql
-- Practice sessions
CREATE TABLE practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),  -- Optional, can be anonymous
  device_id VARCHAR(255),             -- For anonymous tracking
  scenario_id VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active', -- active, completed, abandoned
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  message_count INT DEFAULT 0,
  metadata JSONB DEFAULT '{}'
);

-- Session messages
CREATE TABLE session_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES practice_sessions(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,          -- user, assistant, system
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'         -- feelings/needs identified, etc.
);

-- Progress tracking
CREATE TABLE practice_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  device_id VARCHAR(255),
  date DATE NOT NULL,
  sessions_count INT DEFAULT 0,
  total_minutes INT DEFAULT 0,
  scenarios_tried TEXT[],
  streak_days INT DEFAULT 0,
  UNIQUE(COALESCE(user_id::text, device_id), date)
);
```

### AI System Prompt

```js
// src/api/ai/prompts.js
export const NVC_FACILITATOR_PROMPT = `You are a compassionate NVC (Nonviolent Communication) practice facilitator. Your role is to guide users through the NVC process with empathy and patience.

## Your Approach
- Listen deeply and reflect back what you hear
- Help identify underlying feelings and needs
- Guide through the 4 steps: Observation, Feeling, Need, Request
- Never judge or criticize
- Celebrate small wins and progress
- Offer gentle corrections when NVC principles are missed

## NVC Framework
1. **Observations**: Concrete actions we observe (without evaluation)
2. **Feelings**: How we feel in relation to what we observe
3. **Needs**: The values/desires creating our feelings
4. **Requests**: Concrete actions to enrich life

## Feelings Vocabulary
- When needs ARE met: grateful, hopeful, inspired, joyful, peaceful, relieved
- When needs are NOT met: afraid, angry, confused, embarrassed, sad, tired

## Universal Needs
- Connection: acceptance, belonging, love, support, trust
- Autonomy: choice, freedom, independence, space
- Meaning: contribution, creativity, growth, purpose
- Well-being: comfort, peace, rest, safety

## Response Style
- Keep responses concise (2-4 sentences typical)
- Ask one question at a time
- Use the user's own words when reflecting
- Acknowledge emotions before offering guidance
- End with an invitation to continue or go deeper`
```

---

## Feelings & Needs Reference Data

### Feelings List (for iOS app)

```js
// src/data/feelings.js
export const feelings = {
  metNeeds: {
    happy: ['joyful', 'grateful', 'delighted', 'pleased', 'content', 'satisfied'],
    peaceful: ['calm', 'serene', 'relaxed', 'centered', 'tranquil', 'at ease'],
    engaged: ['curious', 'fascinated', 'interested', 'absorbed', 'alert', 'stimulated'],
    hopeful: ['optimistic', 'encouraged', 'expectant', 'confident', 'inspired'],
    affectionate: ['warm', 'loving', 'tender', 'compassionate', 'friendly', 'open']
  },
  unmetNeeds: {
    afraid: ['anxious', 'worried', 'nervous', 'scared', 'terrified', 'panicked'],
    angry: ['frustrated', 'irritated', 'annoyed', 'resentful', 'furious', 'enraged'],
    sad: ['disappointed', 'discouraged', 'dejected', 'grieving', 'lonely', 'hopeless'],
    confused: ['puzzled', 'uncertain', 'torn', 'hesitant', 'lost', 'troubled'],
    tired: ['exhausted', 'drained', 'burned out', 'overwhelmed', 'depleted', 'fatigued']
  }
}

export const needs = {
  connection: ['acceptance', 'appreciation', 'belonging', 'closeness', 'community', 'companionship', 'empathy', 'inclusion', 'intimacy', 'love', 'respect', 'support', 'trust', 'understanding'],
  autonomy: ['choice', 'freedom', 'independence', 'self-expression', 'space', 'spontaneity'],
  meaning: ['awareness', 'celebration', 'challenge', 'clarity', 'competence', 'consciousness', 'contribution', 'creativity', 'discovery', 'growth', 'hope', 'learning', 'mourning', 'purpose', 'self-expression', 'stimulation', 'understanding'],
  peace: ['beauty', 'communion', 'ease', 'equality', 'harmony', 'inspiration', 'order'],
  physicalWellBeing: ['air', 'food', 'movement', 'rest', 'safety', 'shelter', 'touch', 'water'],
  play: ['fun', 'humor', 'joy', 'rejuvenation']
}
```

---

## Analytics Events

```js
// src/utils/aiAnalytics.js
export const AI_EVENTS = {
  SESSION_START: 'ai_session_start',
  SESSION_END: 'ai_session_end',
  MESSAGE_SENT: 'ai_message_sent',
  SCENARIO_SELECTED: 'ai_scenario_selected',
  FEELING_IDENTIFIED: 'ai_feeling_identified',
  NEED_IDENTIFIED: 'ai_need_identified',
  SESSION_RESUMED: 'ai_session_resumed',
  STREAK_ACHIEVED: 'ai_streak_achieved'
}

export function trackAIEvent(event, data = {}) {
  trackEvent(event, {
    ...data,
    timestamp: Date.now(),
    sessionId: currentSessionId.value
  })
}
```

---

## Implementation Checklist

### Phase 2a (Embedded iframe)
- [ ] Create EmbeddedPractice component with Dialog
- [ ] Add session timing and tracking
- [ ] Implement postMessage listener for NVCAI events
- [ ] Store session metadata in localStorage
- [ ] Update Practice page to use embedded component
- [ ] Add analytics for session duration

### Phase 2b (Native Chat)
- [ ] Create ChatInterface component
- [ ] Build ChatMessage component with styling
- [ ] Implement typing indicator
- [ ] Set up backend API endpoints
- [ ] Connect to LLM API (Claude/GPT)
- [ ] Add NVC facilitator system prompt
- [ ] Implement message persistence

### Phase 2c (Advanced Features)
- [ ] Create SessionHistory component
- [ ] Build ProgressTracker component
- [ ] Implement practice scenarios
- [ ] Add streak tracking logic
- [ ] Create feelings/needs reference UI
- [ ] Implement session resume functionality
- [ ] Add practice reminders (optional)

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Session completion rate | > 60% |
| Average session duration | > 5 minutes |
| Return user rate (7-day) | > 40% |
| Messages per session | > 8 |
| Practice streak (weekly) | > 30% of users |
