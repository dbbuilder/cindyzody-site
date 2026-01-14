# NVC Framework & Data Model

## Purpose

This document defines the complete data model for feelings, needs, and related concepts used throughout the Feelings & Needs platform. These structures power:
- Feelings/needs inventories
- AI conversation guidance
- Pattern tracking and analytics
- Educational content

---

## Feelings Taxonomy

### Structure

```typescript
interface Feeling {
  id: string                    // Unique identifier (e.g., "joyful")
  label: string                 // Display name (e.g., "Joyful")
  category: FeelingCategory     // Parent category
  needsMet: boolean             // True if feeling indicates met needs
  intensity: 'low' | 'medium' | 'high'  // Emotional intensity
  bodySensations: string[]      // Where it might be felt in body
  relatedNeeds: string[]        // Needs often connected to this feeling
  synonyms: string[]            // Alternative words
  description: string           // Brief explanation
  examples: string[]            // Example situations
}

type FeelingCategory =
  | 'happy' | 'peaceful' | 'engaged' | 'hopeful' | 'affectionate'  // Needs met
  | 'afraid' | 'angry' | 'sad' | 'confused' | 'tired' | 'disconnected'  // Needs unmet
```

### Complete Feelings Inventory

#### When Needs Are MET

##### HAPPY
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| joyful | high | chest expansion, smiling, lightness | celebration, play, meaning |
| grateful | medium | warmth in chest, tears | appreciation, receiving |
| delighted | high | smiling, eyes bright | play, surprise, beauty |
| pleased | medium | relaxed face, slight smile | acknowledgment, ease |
| content | low | overall relaxation, settling | peace, acceptance |
| satisfied | medium | fullness, completion feeling | accomplishment, closure |
| glad | medium | lightness, ease | connection, harmony |
| cheerful | medium | energy, brightness | play, connection |
| blissful | high | floating, expansive | peace, transcendence |
| elated | high | energy surge, expansive | celebration, freedom |
| ecstatic | high | whole body energy, trembling | aliveness, peak experience |
| excited | high | energy, anticipation, restlessness | stimulation, adventure |
| exhilarated | high | breathlessness, energy | freedom, aliveness |
| thrilled | high | electricity, excitement | stimulation, surprise |

##### PEACEFUL
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| calm | low | slow breathing, settled | peace, safety |
| serene | low | stillness, spaciousness | peace, harmony |
| relaxed | low | muscles loose, breathing easy | rest, ease |
| centered | medium | grounded, balanced | stability, presence |
| tranquil | low | quiet, still | peace, quiet |
| at ease | low | comfort, absence of tension | safety, acceptance |
| comfortable | low | physical ease | comfort, safety |
| mellow | low | soft, unhurried | ease, leisure |
| quiet | low | internal stillness | solitude, peace |
| relieved | medium | release of tension, exhale | safety, resolution |
| secure | medium | groundedness | safety, stability |
| trusting | medium | openness, willingness | trust, safety |

##### ENGAGED
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| curious | medium | forward lean, alert | learning, discovery |
| fascinated | high | rapt attention | understanding, wonder |
| interested | medium | attention focused | learning, stimulation |
| absorbed | high | lost in activity | flow, meaning |
| alert | medium | awake, attentive | awareness, safety |
| stimulated | medium | energy, activation | growth, challenge |
| amazed | high | widened eyes, stillness | wonder, beauty |
| astonished | high | breath catch, eyes wide | surprise, wonder |
| awed | high | expansion, reverence | transcendence, beauty |
| enchanted | high | captivated | beauty, wonder |
| energized | high | vitality, readiness | aliveness, contribution |
| enthusiastic | high | forward motion, energy | participation, contribution |
| invigorated | high | refreshed, vital | renewal, aliveness |
| inspired | high | uplift, possibility | meaning, creativity |

##### HOPEFUL
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| hopeful | medium | lift in chest, forward lean | hope, possibility |
| optimistic | medium | lightness, possibility | trust, hope |
| encouraged | medium | heartened, uplifted | support, belief |
| expectant | medium | anticipation | hope, trust |
| confident | medium | expanded posture, grounded | competence, trust |
| empowered | high | strength, capability | autonomy, power |
| proud | medium | expansion, head high | acknowledgment, accomplishment |

##### AFFECTIONATE
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| warm | medium | heart warmth | connection, love |
| loving | high | heart opening, tenderness | love, closeness |
| tender | medium | softness, gentleness | nurturing, care |
| compassionate | medium | heart ache, warmth | care, connection |
| friendly | medium | openness, ease | belonging, connection |
| open | medium | receptive, available | connection, authenticity |
| affectionate | medium | desire to touch, warmth | touch, closeness |
| caring | medium | attention, concern | nurturing, contribution |
| moved | high | tears, heart swelling | connection, beauty |
| touched | medium | heart stirring | appreciation, being seen |

---

#### When Needs Are NOT MET

##### AFRAID
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| afraid | high | chest tight, frozen | safety, protection |
| anxious | medium | restless, tight chest | predictability, security |
| worried | medium | churning stomach, tension | reassurance, information |
| nervous | medium | butterflies, shaky | confidence, support |
| scared | high | heart racing, frozen | safety, protection |
| terrified | high | paralyzed, cold | survival, safety |
| panicked | high | racing heart, hyperventilating | safety, control |
| dread | high | heaviness, foreboding | safety, clarity |
| fearful | high | vigilant, tense | protection, security |
| apprehensive | medium | uneasy, watchful | predictability, safety |
| insecure | medium | unsteady, uncertain | stability, reassurance |
| mistrustful | medium | guarded, watchful | trust, safety |
| vulnerable | medium | exposed, unprotected | safety, support |
| suspicious | medium | guarded, alert | trust, clarity |

##### ANGRY
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| angry | high | heat, tight jaw, fists | respect, autonomy, fairness |
| frustrated | medium | blocked energy, tension | effectiveness, progress |
| irritated | low | mild tension, annoyance | space, consideration |
| annoyed | low | slight edge | respect, ease |
| resentful | medium | bitter, tight chest | fairness, acknowledgment |
| furious | high | rage, heat, shaking | respect, justice |
| enraged | high | explosive, red vision | safety, autonomy |
| hostile | high | aggressive, defensive | safety, respect |
| bitter | medium | acrid taste, tight | fairness, mourning |
| aggravated | medium | intensifying tension | consideration, respect |
| exasperated | medium | at wit's end | understanding, ease |
| impatient | medium | urgency, restlessness | efficiency, respect |
| indignant | high | righteousness, heat | fairness, respect |
| outraged | high | moral anger | justice, integrity |

##### SAD
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| sad | medium | heaviness, tears possible | comfort, connection |
| disappointed | medium | sinking feeling | hope, expectations met |
| discouraged | medium | deflated, low energy | support, hope |
| dejected | high | slumped, withdrawn | belonging, hope |
| grieving | high | deep ache, tears | mourning, support |
| lonely | high | empty, hollow | connection, belonging |
| hopeless | high | collapsed, dark | hope, support |
| depressed | high | heavy, flat | vitality, meaning |
| despairing | high | crushed, no way out | hope, support |
| heartbroken | high | chest pain, tears | love, connection |
| melancholy | medium | wistful, heavy | meaning, connection |
| sorrowful | high | deep sadness, tears | comfort, mourning |
| unhappy | medium | general malaise | multiple needs |
| despondent | high | given up | hope, agency |
| gloomy | medium | dark, heavy | hope, light |

##### CONFUSED
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| confused | medium | foggy head, uncertain | clarity, understanding |
| puzzled | low | questioning, tilted head | information, sense-making |
| uncertain | medium | unsteady, questioning | clarity, guidance |
| torn | medium | pulled in directions | clarity, integration |
| hesitant | low | holding back | confidence, clarity |
| lost | high | disoriented, foggy | direction, guidance |
| troubled | medium | unsettled, preoccupied | peace, resolution |
| ambivalent | medium | push-pull | clarity, integration |
| bewildered | high | disoriented | understanding, stability |
| mystified | medium | perplexed | understanding |
| perplexed | medium | stuck, searching | clarity, understanding |

##### TIRED
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| tired | medium | heavy, slow | rest, rejuvenation |
| exhausted | high | depleted, can't move | rest, support |
| drained | high | empty, hollow | rest, boundaries |
| burned out | high | nothing left | rest, meaning, support |
| overwhelmed | high | drowning, too much | support, space, order |
| depleted | high | used up | rest, nourishment |
| fatigued | medium | weary, slow | rest |
| lethargic | medium | sluggish, heavy | stimulation, rest |
| listless | medium | no energy, flat | vitality, meaning |
| sleepy | low | drowsy, heavy eyelids | rest |
| weary | medium | bone-tired | rest, ease |
| worn out | high | threadbare | rest, care |

##### DISCONNECTED
| Feeling | Intensity | Body Sensations | Related Needs |
|---------|-----------|-----------------|---------------|
| disconnected | medium | distant, separate | connection, belonging |
| numb | high | absence of feeling | safety, feeling |
| apathetic | high | indifferent, flat | meaning, engagement |
| bored | low | restless, flat | stimulation, engagement |
| detached | medium | removed, observing | presence, connection |
| alienated | high | outside, different | belonging, acceptance |
| withdrawn | medium | pulled back, small | safety, connection |
| distant | medium | far away | presence, connection |
| indifferent | medium | uncaring | meaning, engagement |
| isolated | high | alone, cut off | connection, belonging |

---

## Needs Taxonomy

### Structure

```typescript
interface Need {
  id: string                    // Unique identifier
  label: string                 // Display name
  category: NeedCategory        // Parent category
  description: string           // What this need is about
  examples: string[]            // Ways this need might be met
  relatedFeelings: {
    whenMet: string[]           // Feelings when need is met
    whenUnmet: string[]         // Feelings when need is unmet
  }
  questions: string[]           // Questions to explore this need
}

type NeedCategory =
  | 'connection'
  | 'autonomy'
  | 'meaning'
  | 'peace'
  | 'physical_wellbeing'
  | 'play'
  | 'honesty'
```

### Complete Needs Inventory

#### CONNECTION
*The need for relationship, belonging, and being understood*

| Need | Description | Examples When Met |
|------|-------------|-------------------|
| acceptance | Being received as we are | Being welcomed without having to change |
| affection | Warmth and caring expression | Hugs, kind words, gestures of care |
| appreciation | Recognition of contribution | Thank you, acknowledgment of efforts |
| belonging | Being part of a group | Community membership, family inclusion |
| closeness | Emotional intimacy | Deep conversations, vulnerable sharing |
| communication | Exchange of information and feelings | Honest dialogue, being heard |
| community | Shared experience with others | Neighborhood, team, congregation |
| companionship | Presence with others | Shared activities, not being alone |
| compassion | Understanding of suffering | Being met with kindness in pain |
| consideration | Being thought about | Others accounting for your needs |
| empathy | Being understood emotionally | Someone reflecting your feelings |
| inclusion | Being invited in | Asked to participate, welcomed |
| intimacy | Deep emotional closeness | Knowing and being known deeply |
| love | Deep affection and care | Unconditional positive regard |
| mutuality | Reciprocal care and exchange | Give and take in relationship |
| nurturing | Being cared for | Tended to, supported in growth |
| respect | Being treated with dignity | Opinions valued, boundaries honored |
| safety (emotional) | Freedom from emotional harm | Trust, reliability, non-judgment |
| security | Stability in relationship | Knowing the connection is solid |
| support | Help when needed | Assistance, backing, encouragement |
| to know and be known | Mutual understanding | Sharing and receiving understanding |
| to see and be seen | Witnessing and being witnessed | Presence, attention, acknowledgment |
| to understand and be understood | Comprehension | Clear communication, reflection |
| trust | Confidence in reliability | Keeping agreements, consistency |
| warmth | Emotional temperature | Friendly, welcoming presence |

#### AUTONOMY
*The need for choice, independence, and self-determination*

| Need | Description | Examples When Met |
|------|-------------|-------------------|
| choice | Having options | Multiple paths available |
| freedom | Absence of constraint | Acting without restriction |
| independence | Self-reliance | Making own decisions |
| self-expression | Authentic manifestation | Art, words, actions that reflect self |
| space | Room to exist | Physical and emotional room |
| spontaneity | Unplanned expression | Acting on impulse when desired |
| sovereignty | Self-governance | Ruling own life |
| authenticity | Being genuine | Acting in alignment with values |
| individuality | Being unique | Expressing distinctiveness |
| self-determination | Directing own life | Choosing own path |

#### MEANING
*The need for purpose, growth, and contribution*

| Need | Description | Examples When Met |
|------|-------------|-------------------|
| awareness | Conscious understanding | Insight, noticing, mindfulness |
| celebration | Marking achievements | Parties, acknowledgment, ritual |
| challenge | Growth through difficulty | Stretch goals, learning curves |
| clarity | Clear understanding | Knowing what's what |
| competence | Skill and capability | Being good at something |
| consciousness | Aware presence | Mindful living |
| contribution | Making a difference | Helping, giving, creating |
| creativity | Generative expression | Making new things, innovation |
| discovery | Finding new things | Exploration, learning |
| efficacy | Ability to affect outcomes | Making things happen |
| effectiveness | Producing results | Achieving goals |
| growth | Development and evolution | Learning, expanding, maturing |
| hope | Belief in possibility | Future orientation, optimism |
| learning | Acquiring knowledge/skill | Study, practice, experience |
| mourning | Processing loss | Grief rituals, acknowledgment |
| participation | Taking part | Involvement, engagement |
| purpose | Reason for being | Direction, calling, mission |
| self-expression | Authentic manifestation | Creating, communicating self |
| stimulation | Mental activation | Interesting inputs, novelty |
| to matter | Significance | Being important to someone/something |
| understanding | Comprehension | Making sense of things |

#### PEACE
*The need for harmony, order, and ease*

| Need | Description | Examples When Met |
|------|-------------|-------------------|
| beauty | Aesthetic pleasure | Art, nature, design |
| communion | Deep connection | Spiritual union, flow states |
| ease | Absence of difficulty | Things working smoothly |
| equality | Fairness and balance | Equal treatment, equity |
| harmony | Things working together | Alignment, flow |
| inspiration | Uplifting influence | Moved to action or creation |
| order | Organization and structure | Systems, routines, predictability |
| peace | Absence of conflict | Calm, resolution |
| stability | Steadiness | Reliable conditions |
| predictability | Knowing what's coming | Routine, expectation met |

#### PHYSICAL WELLBEING
*The need for bodily health and sustenance*

| Need | Description | Examples When Met |
|------|-------------|-------------------|
| air | Oxygen, breathing | Fresh air, ability to breathe |
| food | Nutrition | Nourishing meals |
| movement | Physical activity | Exercise, dance, walking |
| rest | Recovery time | Sleep, relaxation |
| safety (physical) | Freedom from bodily harm | Secure environment |
| shelter | Protection from elements | Home, covering |
| touch | Physical contact | Hugs, massage, holding hands |
| water | Hydration | Clean drinking water |
| sexual expression | Physical intimacy | Consensual sexual connection |
| comfort | Physical ease | Temperature, position, softness |
| health | Body functioning well | Vitality, energy |

#### PLAY
*The need for fun, humor, and enjoyment*

| Need | Description | Examples When Met |
|------|-------------|-------------------|
| fun | Enjoyment | Activities done for pleasure |
| humor | Laughter and lightness | Jokes, playfulness |
| joy | Deep happiness | Delight, bliss |
| rejuvenation | Renewal of energy | Vacation, breaks, leisure |
| adventure | Exciting experience | New experiences, risk |
| recreation | Leisure activity | Hobbies, sports, games |
| pleasure | Sensory enjoyment | Good food, music, beauty |

#### HONESTY
*The need for truth, integrity, and authenticity*

| Need | Description | Examples When Met |
|------|-------------|-------------------|
| authenticity | Being genuine | Acting in alignment with self |
| integrity | Wholeness and alignment | Walking the talk |
| presence | Being fully here | Attention, mindfulness |
| transparency | Openness | Sharing fully, no hidden agenda |
| truth | Accuracy and honesty | Honest communication |
| self-worth | Valuing self | Self-respect, self-esteem |

---

## Faux Feelings (Pseudo-Feelings)

These words *sound* like feelings but actually contain interpretations about others' behavior. They imply someone did something *to* us.

### Structure

```typescript
interface FauxFeeling {
  word: string                  // The pseudo-feeling
  interpretation: string        // What it implies about others
  actualFeelings: string[]      // True feelings underneath
  likelyNeeds: string[]         // Needs probably involved
  example: {
    faux: string               // Statement using faux feeling
    translated: string         // Same in true feelings/needs
  }
}
```

### Common Faux Feelings

| Faux Feeling | Implies | Actual Feelings | Likely Needs |
|--------------|---------|-----------------|--------------|
| abandoned | Someone left me | scared, lonely, hurt, sad | connection, safety, belonging |
| abused | Someone mistreated me | hurt, scared, angry | safety, respect, care |
| attacked | Someone was aggressive | scared, angry, hurt | safety, respect |
| betrayed | Someone broke trust | shocked, hurt, angry | trust, integrity, honesty |
| blamed | Someone faulted me | hurt, scared, angry | understanding, fairness |
| bullied | Someone dominated me | scared, hurt, angry | safety, respect, autonomy |
| cheated | Someone was unfair | hurt, angry, sad | fairness, trust, respect |
| coerced | Someone forced me | scared, angry, resentful | autonomy, choice, freedom |
| criticized | Someone judged me | hurt, embarrassed | acceptance, appreciation |
| diminished | Someone made me small | hurt, sad, angry | respect, to matter |
| disrespected | Someone showed no respect | hurt, angry | respect, to matter |
| ignored | Someone didn't notice me | hurt, lonely, sad | to be seen, connection |
| insulted | Someone attacked my worth | hurt, angry | respect, dignity |
| intimidated | Someone threatened me | scared, nervous | safety, autonomy |
| invalidated | Someone dismissed me | hurt, frustrated | understanding, to be heard |
| invisible | No one sees me | lonely, sad, hurt | to be seen, to matter |
| manipulated | Someone controlled me | angry, scared, confused | autonomy, trust, honesty |
| misunderstood | Someone got me wrong | frustrated, sad, lonely | understanding, to be known |
| neglected | Someone didn't care for me | hurt, sad, lonely | care, attention, nurturing |
| overworked | Someone demanded too much | tired, resentful, exhausted | rest, consideration, balance |
| patronized | Someone talked down to me | angry, hurt | respect, equality |
| pressured | Someone pushed me | stressed, resentful, anxious | autonomy, space, choice |
| rejected | Someone didn't want me | hurt, sad, scared | acceptance, belonging, love |
| taken for granted | Someone didn't appreciate me | hurt, resentful | appreciation, to matter |
| threatened | Someone implied harm | scared, anxious | safety, security |
| unappreciated | Someone didn't value me | hurt, sad | appreciation, acknowledgment |
| unheard | Someone didn't listen | frustrated, sad, lonely | to be heard, understanding |
| unseen | No one notices me | lonely, sad | to be seen, recognition |
| unsupported | No one helps me | overwhelmed, alone, scared | support, care |
| used | Someone took advantage | angry, hurt, violated | respect, mutuality, consideration |
| victimized | Someone harmed me | scared, hurt, powerless | safety, autonomy, justice |

---

## Data Structures for Implementation

### Database Schema

```sql
-- Feelings table
CREATE TABLE feelings (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  needs_met BOOLEAN NOT NULL,
  intensity VARCHAR(20) CHECK (intensity IN ('low', 'medium', 'high')),
  description TEXT,
  body_sensations TEXT[], -- Array of body sensations
  related_needs TEXT[],   -- Array of need IDs
  synonyms TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Needs table
CREATE TABLE needs (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  examples TEXT[],
  questions TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Feeling-Need relationships
CREATE TABLE feeling_need_map (
  feeling_id VARCHAR(50) REFERENCES feelings(id),
  need_id VARCHAR(50) REFERENCES needs(id),
  relationship VARCHAR(20) CHECK (relationship IN ('when_met', 'when_unmet')),
  strength FLOAT CHECK (strength >= 0 AND strength <= 1), -- Correlation strength
  PRIMARY KEY (feeling_id, need_id, relationship)
);

-- Faux feelings table
CREATE TABLE faux_feelings (
  id VARCHAR(50) PRIMARY KEY,
  word VARCHAR(100) NOT NULL,
  interpretation TEXT,
  actual_feelings TEXT[],
  likely_needs TEXT[],
  example_faux TEXT,
  example_translated TEXT
);
```

### TypeScript Types

```typescript
// src/types/nvc.ts

export interface Feeling {
  id: string
  label: string
  category: FeelingCategory
  needsMet: boolean
  intensity: 'low' | 'medium' | 'high'
  bodySensations: string[]
  relatedNeeds: string[]
  synonyms: string[]
  description: string
}

export type FeelingCategory =
  | 'happy' | 'peaceful' | 'engaged' | 'hopeful' | 'affectionate'
  | 'afraid' | 'angry' | 'sad' | 'confused' | 'tired' | 'disconnected'

export interface Need {
  id: string
  label: string
  category: NeedCategory
  description: string
  examples: string[]
  questions: string[]
}

export type NeedCategory =
  | 'connection' | 'autonomy' | 'meaning' | 'peace'
  | 'physical_wellbeing' | 'play' | 'honesty'

export interface FauxFeeling {
  id: string
  word: string
  interpretation: string
  actualFeelings: string[]
  likelyNeeds: string[]
  example: {
    faux: string
    translated: string
  }
}

export interface OFNR {
  observation: string
  feelings: Feeling[]
  needs: Need[]
  request: string
}

export interface PracticeSession {
  id: string
  userId?: string
  deviceId: string
  type: 'self_empathy' | 'empathy_other' | 'conversation_prep' | 'daily_checkin'
  scenario?: string
  messages: SessionMessage[]
  ofnr?: OFNR
  insights: string[]
  startedAt: Date
  completedAt?: Date
}

export interface SessionMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  metadata?: {
    feelingsIdentified?: string[]
    needsIdentified?: string[]
    step?: 'observation' | 'feeling' | 'need' | 'request'
  }
  timestamp: Date
}
```

### JSON Data Files

```typescript
// src/data/feelings.json (partial example)
{
  "categories": {
    "needsMet": ["happy", "peaceful", "engaged", "hopeful", "affectionate"],
    "needsUnmet": ["afraid", "angry", "sad", "confused", "tired", "disconnected"]
  },
  "feelings": [
    {
      "id": "joyful",
      "label": "Joyful",
      "category": "happy",
      "needsMet": true,
      "intensity": "high",
      "bodySensations": ["chest expansion", "smiling", "lightness", "energy"],
      "relatedNeeds": ["celebration", "play", "meaning", "connection"],
      "synonyms": ["elated", "jubilant", "overjoyed"],
      "description": "A state of great happiness and delight"
    }
    // ... more feelings
  ]
}

// src/data/needs.json (partial example)
{
  "categories": [
    { "id": "connection", "label": "Connection", "description": "Relationship and belonging" },
    { "id": "autonomy", "label": "Autonomy", "description": "Choice and independence" },
    // ... more categories
  ],
  "needs": [
    {
      "id": "acceptance",
      "label": "Acceptance",
      "category": "connection",
      "description": "Being received as we are, without needing to change",
      "examples": [
        "Being welcomed into a group without conditions",
        "A friend accepting your quirks",
        "Feeling at home in your own skin"
      ],
      "questions": [
        "Do I feel like I can be myself here?",
        "Am I trying to change to be accepted?",
        "Where do I feel most accepted?"
      ]
    }
    // ... more needs
  ]
}
```

---

## AI Prompt Integration

### Feeling Identification Prompt

```markdown
When helping users identify feelings:

1. Listen for emotional language and reflect it back
2. Distinguish between true feelings and faux feelings
3. If user says a faux feeling (e.g., "I feel rejected"), gently explore:
   - "When you say 'rejected,' I hear that something happened that was painful.
      What feelings come up for you? Maybe hurt, or sad, or scared?"
4. Offer feeling suggestions from the appropriate category
5. Ask about body sensations to deepen awareness
6. Connect identified feelings to potential needs

Feelings vocabulary to draw from:
- When needs MET: [happy, peaceful, engaged, hopeful, affectionate categories]
- When needs UNMET: [afraid, angry, sad, confused, tired, disconnected categories]

Never judge or minimize feelings. All feelings are valid signals.
```

### Need Identification Prompt

```markdown
When helping users identify needs:

1. Feelings are doorways to needs - ask "What might you be needing?"
2. Needs are universal - avoid strategies disguised as needs
   - "I need you to call me" = strategy for connection
   - "I need connection" = actual need
3. Multiple needs are usually present - explore several
4. Needs don't require anyone specific to meet them
5. Help users distinguish needs from preferences

Needs categories to draw from:
- Connection: acceptance, belonging, love, support, trust...
- Autonomy: choice, freedom, independence, space...
- Meaning: purpose, contribution, growth, learning...
- Peace: harmony, ease, order, stability...
- Physical: rest, safety, comfort, movement...
- Play: fun, humor, joy, adventure...
- Honesty: authenticity, integrity, truth...

When a need is identified, celebrate it: "It sounds like [need] is really
important to you right now."
```

---

## Usage Patterns

### Feelings Picker Component

```vue
<!-- Component shows feelings organized by met/unmet needs -->
<template>
  <div class="feelings-picker">
    <div class="tabs">
      <button :class="{ active: tab === 'unmet' }" @click="tab = 'unmet'">
        When needs aren't met
      </button>
      <button :class="{ active: tab === 'met' }" @click="tab = 'met'">
        When needs are met
      </button>
    </div>

    <div v-for="category in categories" :key="category.id" class="category">
      <h3>{{ category.label }}</h3>
      <div class="feelings-grid">
        <button
          v-for="feeling in category.feelings"
          :key="feeling.id"
          :class="{ selected: selected.includes(feeling.id) }"
          @click="toggleFeeling(feeling)"
        >
          {{ feeling.label }}
        </button>
      </div>
    </div>
  </div>
</template>
```

### Needs Browser Component

```vue
<!-- Component shows needs organized by category with exploration -->
<template>
  <div class="needs-browser">
    <input v-model="search" placeholder="Search needs..." />

    <div v-for="category in filteredCategories" :key="category.id">
      <h3>{{ category.label }}</h3>
      <p class="category-description">{{ category.description }}</p>

      <div class="needs-list">
        <div
          v-for="need in category.needs"
          :key="need.id"
          class="need-card"
          @click="selectNeed(need)"
        >
          <h4>{{ need.label }}</h4>
          <p>{{ need.description }}</p>
          <div class="related-feelings">
            <span v-for="feeling in need.relatedFeelings.whenUnmet.slice(0, 3)">
              {{ feeling }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-01-12 | Chris Therriault | Initial NVC data model |
