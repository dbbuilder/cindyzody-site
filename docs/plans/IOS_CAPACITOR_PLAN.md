# Phase 4: Feelings & Needs iOS App Plan

## App Vision

**Feelings & Needs** is a mobile-first NVC practice companion that helps users:
- Identify and articulate their feelings
- Connect feelings to underlying needs
- Practice NVC conversations with AI guidance
- Build emotional vocabulary over time

The app distills the broader cindyzody.com experience into a focused, daily-use practice tool.

---

## App Store Information

### App Identity
- **App Name**: Feelings & Needs
- **Subtitle**: NVC Practice Companion
- **Bundle ID**: com.cindyzody.feelingsandneeds
- **Category**: Health & Fitness (Primary), Education (Secondary)
- **Age Rating**: 4+ (No objectionable content)

### App Store Connect
- **Team ID**: J745X8LR59
- **App ID**: (to be created)
- **API Key**: J864TYBDLD
- **Issuer ID**: 98ea10a3-6742-45cb-82f3-748d4a7b5e51

---

## Information Architecture

### Tab Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    Feelings & Needs                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    [Active Screen]                          │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ 🏠 Home │  │ 💬 Chat │  │ 📖 Learn│  │ ℹ️ About │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Screen Hierarchy

```
Home (Tab 1)
├── Daily Check-in Card
│   └── Quick Feeling Selector
├── Practice Streak
├── Recent Sessions (3 max)
└── Quick Actions
    ├── Start Practice
    ├── Feelings List
    └── Needs List

Chat (Tab 2) - AI Practice
├── Active Session View
│   ├── Message History
│   ├── Input Field
│   └── Session Controls
├── Scenario Selector
│   ├── Workplace
│   ├── Family
│   ├── Self-Empathy
│   └── Open Practice
└── Session History

Learn (Tab 3) - Reference
├── Feelings Inventory
│   ├── When Needs Met
│   └── When Needs Unmet
├── Needs Inventory
│   ├── By Category
│   └── Search
├── NVC Basics
│   ├── Four Steps
│   ├── Examples
│   └── Common Pitfalls
└── Resources
    ├── Books
    └── External Links

About (Tab 4)
├── About Cindy Zody
│   ├── Bio Summary
│   ├── Approach
│   └── Services Overview
├── Visit Website (Link)
├── Schedule Session (Link)
├── Contact
└── App Settings
    ├── Notifications
    ├── Theme
    └── Privacy
```

---

## Screen Designs

### Home Screen

```
┌─────────────────────────────────────────┐
│ Feelings & Needs              [Profile] │
├─────────────────────────────────────────┤
│                                         │
│  Good morning, Chris                    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ How are you feeling right now? │   │
│  │                                 │   │
│  │ 😊 😐 😔 😤 😰 ➕             │   │
│  │                                 │   │
│  │ [Start Practice Session]       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🔥 5 Day Streak                │   │
│  │                                 │   │
│  │ M  T  W  T  F  S  S            │   │
│  │ ●  ●  ●  ●  ●  ○  ○            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Recent Sessions                        │
│  ┌─────────────────────────────────┐   │
│  │ Workplace feedback  •  2h ago  │   │
│  │ ───────────────────────────────│   │
│  │ Self-empathy       •  Yesterday │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Quick Access                           │
│  ┌────────┐ ┌────────┐ ┌────────┐     │
│  │Feelings│ │ Needs  │ │  NVC   │     │
│  │  List  │ │  List  │ │ Basics │     │
│  └────────┘ └────────┘ └────────┘     │
│                                         │
└─────────────────────────────────────────┘
```

### Chat Screen (AI Practice)

```
┌─────────────────────────────────────────┐
│ ← Back         Practice         [End]   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🤖 AI Facilitator               │   │
│  │                                 │   │
│  │ Welcome! I'm here to help you  │   │
│  │ practice NVC. What situation   │   │
│  │ would you like to explore?     │   │
│  └─────────────────────────────────┘   │
│                                         │
│        ┌─────────────────────────────┐ │
│        │ I had a difficult          │ │
│        │ conversation with my       │ │
│        │ manager today...           │ │
│        └─────────────────────────────┘ │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🤖 AI Facilitator               │   │
│  │                                 │   │
│  │ Thank you for sharing. Before  │   │
│  │ we go further, I'm curious -   │   │
│  │ how are you feeling right now  │   │
│  │ as you think about this        │   │
│  │ conversation?                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Quick feelings:                │   │
│  │ [frustrated] [anxious] [sad]   │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────┐ 📤 │
│ │ Type your message...            │    │
│ └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Feelings List Screen

```
┌─────────────────────────────────────────┐
│ ← Learn           Feelings              │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 🔍 Search feelings...               │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ When Needs Are MET                      │
│ ─────────────────────────────────────── │
│                                         │
│ 😊 HAPPY                                │
│ joyful • grateful • delighted •         │
│ pleased • content • satisfied           │
│                                         │
│ 😌 PEACEFUL                             │
│ calm • serene • relaxed • centered •    │
│ tranquil • at ease                      │
│                                         │
│ 🤔 ENGAGED                              │
│ curious • fascinated • interested •     │
│ absorbed • alert • stimulated           │
│                                         │
│ When Needs Are NOT MET                  │
│ ─────────────────────────────────────── │
│                                         │
│ 😰 AFRAID                               │
│ anxious • worried • nervous • scared •  │
│ terrified • panicked                    │
│                                         │
│ 😤 ANGRY                                │
│ frustrated • irritated • annoyed •      │
│ resentful • furious • enraged           │
│                                         │
│ 😢 SAD                                  │
│ disappointed • discouraged • dejected • │
│ grieving • lonely • hopeless            │
│                                         │
└─────────────────────────────────────────┘
```

### About Screen

```
┌─────────────────────────────────────────┐
│              About                      │
├─────────────────────────────────────────┤
│                                         │
│           ┌───────────┐                │
│           │   Photo   │                │
│           │  (Cindy)  │                │
│           └───────────┘                │
│                                         │
│        Cindy Zody                       │
│   Communications Practitioner           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Cindy specializes in Nonviolent │   │
│  │ Communication (NVC) and Internal│   │
│  │ Family Systems (IFS) to help    │   │
│  │ individuals and couples build   │   │
│  │ deeper connections...           │   │
│  │                                 │   │
│  │ [Read More]                     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Services                               │
│  ├─ Individual Coaching                │
│  ├─ Couple Sessions                    │
│  ├─ Group Workshops                    │
│  └─ Free Consultation                  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🌐 Visit Website               → │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │ 📅 Schedule a Session          → │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │ ✉️ Contact Cindy               → │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  App Settings                           │
│  ├─ Notifications                  →   │
│  ├─ Appearance                     →   │
│  └─ Privacy Policy                 →   │
│                                         │
│          Version 1.0.0                  │
│                                         │
└─────────────────────────────────────────┘
```

---

## Technical Implementation

### Capacitor Setup

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/app @capacitor/haptics
npm install @capacitor/keyboard @capacitor/status-bar @capacitor/splash-screen
npm install @capacitor/preferences @capacitor/push-notifications

# Initialize Capacitor
npx cap init "Feelings & Needs" com.cindyzody.feelingsandneeds

# Add iOS platform
npx cap add ios
```

### Capacitor Configuration

```json
// capacitor.config.json
{
  "appId": "com.cindyzody.feelingsandneeds",
  "appName": "Feelings & Needs",
  "webDir": "dist",
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#16a34a",
      "showSpinner": false,
      "splashFullScreen": true,
      "splashImmersive": true
    },
    "StatusBar": {
      "style": "Dark",
      "backgroundColor": "#16a34a"
    },
    "Keyboard": {
      "resize": "body",
      "resizeOnFullScreen": true
    },
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  },
  "ios": {
    "contentInset": "automatic",
    "preferredContentMode": "mobile",
    "scheme": "Feelings & Needs"
  }
}
```

### Project Structure

```
src/
├── App.vue                    # Root - detect platform
├── main.js                    # Entry point
├── router/
│   └── index.js              # Routes with mobile tabs
├── views/                     # Mobile-specific views
│   ├── mobile/
│   │   ├── TabLayout.vue     # Tab bar container
│   │   ├── HomeTab.vue       # Home screen
│   │   ├── ChatTab.vue       # AI Practice
│   │   ├── LearnTab.vue      # Reference content
│   │   └── AboutTab.vue      # About & settings
│   └── web/                  # Web-specific views
│       └── ... (existing pages)
├── components/
│   ├── mobile/               # Mobile components
│   │   ├── BottomNav.vue
│   │   ├── FeelingPicker.vue
│   │   ├── NeedCard.vue
│   │   ├── SessionCard.vue
│   │   └── StreakDisplay.vue
│   └── shared/               # Shared components
│       ├── ChatInterface.vue
│       └── FeelingsGrid.vue
├── composables/
│   ├── usePlatform.js        # Platform detection
│   ├── useHaptics.js         # Haptic feedback
│   └── useNotifications.js   # Push notifications
└── stores/
    ├── sessions.js           # Practice sessions
    ├── progress.js           # User progress
    └── feelings.js           # Feelings/needs data
```

### Platform Detection

```js
// src/composables/usePlatform.js
import { ref, computed } from 'vue'
import { Capacitor } from '@capacitor/core'

export function usePlatform() {
  const platform = ref(Capacitor.getPlatform())
  const isNative = computed(() => Capacitor.isNativePlatform())
  const isIOS = computed(() => platform.value === 'ios')
  const isWeb = computed(() => platform.value === 'web')

  return {
    platform,
    isNative,
    isIOS,
    isWeb
  }
}
```

### Conditional Routing

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform()

const routes = isNative ? [
  // Mobile tab-based routes
  {
    path: '/',
    component: () => import('@/views/mobile/TabLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/mobile/HomeTab.vue') },
      { path: 'chat', name: 'chat', component: () => import('@/views/mobile/ChatTab.vue') },
      { path: 'learn', name: 'learn', component: () => import('@/views/mobile/LearnTab.vue') },
      { path: 'about', name: 'about', component: () => import('@/views/mobile/AboutTab.vue') }
    ]
  }
] : [
  // Web routes (existing)
  { path: '/', component: () => import('@/pages/Home.vue') },
  { path: '/about', component: () => import('@/pages/About.vue') },
  // ... other web routes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
```

### Mobile Tab Layout

```vue
<!-- src/views/mobile/TabLayout.vue -->
<template>
  <div class="flex flex-col h-screen">
    <!-- Content area -->
    <main class="flex-1 overflow-y-auto pb-safe">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>

    <!-- Bottom navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe">
      <div class="flex justify-around py-2">
        <router-link
          v-for="tab in tabs"
          :key="tab.path"
          :to="tab.path"
          class="flex flex-col items-center px-4 py-2"
          :class="{ 'text-brand-600': isActive(tab.path) }"
          @click="onTabClick"
        >
          <component :is="tab.icon" class="w-6 h-6" />
          <span class="text-xs mt-1">{{ tab.label }}</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { HomeIcon, ChatBubbleLeftIcon, BookOpenIcon, UserIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const tabs = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/chat', label: 'Practice', icon: ChatBubbleLeftIcon },
  { path: '/learn', label: 'Learn', icon: BookOpenIcon },
  { path: '/about', label: 'About', icon: UserIcon }
]

const isActive = (path) => route.path === path

const onTabClick = () => {
  Haptics.impact({ style: ImpactStyle.Light })
}
</script>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
```

### Haptic Feedback

```js
// src/composables/useHaptics.js
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { Capacitor } from '@capacitor/core'

export function useHaptics() {
  const isNative = Capacitor.isNativePlatform()

  const impact = async (style = 'light') => {
    if (!isNative) return
    const styles = {
      light: ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy: ImpactStyle.Heavy
    }
    await Haptics.impact({ style: styles[style] })
  }

  const notification = async (type = 'success') => {
    if (!isNative) return
    const types = {
      success: NotificationType.Success,
      warning: NotificationType.Warning,
      error: NotificationType.Error
    }
    await Haptics.notification({ type: types[type] })
  }

  const selection = async () => {
    if (!isNative) return
    await Haptics.selectionStart()
    await Haptics.selectionEnd()
  }

  return { impact, notification, selection }
}
```

### Offline Storage

```js
// src/composables/useStorage.js
import { Preferences } from '@capacitor/preferences'

export function useStorage() {
  const get = async (key) => {
    const { value } = await Preferences.get({ key })
    return value ? JSON.parse(value) : null
  }

  const set = async (key, value) => {
    await Preferences.set({ key, value: JSON.stringify(value) })
  }

  const remove = async (key) => {
    await Preferences.remove({ key })
  }

  return { get, set, remove }
}
```

---

## iOS-Specific Configuration

### Info.plist Additions

```xml
<!-- ios/App/App/Info.plist -->
<key>NSCameraUsageDescription</key>
<string>Camera access is not required for this app</string>

<key>NSMicrophoneUsageDescription</key>
<string>Microphone access for voice input (future feature)</string>

<key>UIBackgroundModes</key>
<array>
  <string>fetch</string>
  <string>remote-notification</string>
</array>

<key>ITSAppUsesNonExemptEncryption</key>
<false/>
```

### App Icons

Generate icons at these sizes:
- 20pt (1x, 2x, 3x) - Notification
- 29pt (1x, 2x, 3x) - Settings
- 40pt (1x, 2x, 3x) - Spotlight
- 60pt (2x, 3x) - App Icon
- 76pt (1x, 2x) - iPad
- 83.5pt (2x) - iPad Pro
- 1024pt (1x) - App Store

### Launch Screen

```swift
// Use storyboard-based launch screen
// ios/App/App/Base.lproj/LaunchScreen.storyboard
// - Centered logo
// - Brand green background (#16a34a)
// - No text (localizable)
```

---

## App Store Submission

### App Store Listing

**Description:**
```
Feelings & Needs is your daily companion for practicing Nonviolent Communication (NVC). Whether you're new to NVC or deepening your practice, this app helps you:

• Identify your feelings with an intuitive feelings inventory
• Connect feelings to underlying universal human needs
• Practice NVC conversations with AI-guided sessions
• Build your emotional vocabulary over time
• Track your practice streak and progress

Developed in partnership with Cindy Zody, an experienced NVC & IFS practitioner, Feelings & Needs brings the principles of compassionate communication to your pocket.

Features:
- Comprehensive feelings and needs inventories
- AI-powered practice conversations
- Daily check-ins and streak tracking
- NVC basics and learning resources
- Easy access to schedule coaching sessions

Start your journey toward more connected communication today.
```

**Keywords:**
```
NVC, nonviolent communication, feelings, needs, empathy, emotional intelligence, communication skills, mindfulness, self-awareness, relationships
```

**What's New (v1.0):**
```
Welcome to Feelings & Needs! This first release includes:
- Feelings and Needs inventories
- AI-powered practice sessions
- Daily check-ins
- NVC learning resources
- Practice streak tracking
```

### Screenshots Required

| Device | Size | Quantity |
|--------|------|----------|
| iPhone 6.7" | 1290 x 2796 | 3-10 |
| iPhone 6.5" | 1284 x 2778 | 3-10 |
| iPhone 5.5" | 1242 x 2208 | 3-10 |
| iPad Pro 12.9" | 2048 x 2732 | 3-10 |

**Screenshot Content:**
1. Home screen with streak display
2. Feelings inventory list
3. AI practice conversation
4. Needs inventory by category
5. About screen with Cindy

### App Review Notes

```
This app provides educational content about Nonviolent Communication (NVC) and offers AI-assisted practice conversations. The AI facilitator guides users through NVC principles but does not provide medical or mental health advice.

Test Account: Not required (no login)

Demo Mode: The app can be fully tested without any account or purchases.

AI Content: The AI facilitator uses Claude/GPT to provide guided NVC practice. All responses follow NVC principles and are designed to be supportive and educational.
```

---

## Build & Deployment

### Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Sync with iOS
npx cap sync ios

# Open in Xcode
npx cap open ios

# Build for TestFlight
# (use Xcode: Product > Archive)
```

### CI/CD with EAS Build (Alternative)

If using Expo's EAS Build service:

```json
// eas.json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "chris@servicevision.net",
        "ascAppId": "TBD",
        "appleTeamId": "J745X8LR59"
      }
    }
  }
}
```

### GitHub Actions for iOS

```yaml
# .github/workflows/ios.yml
name: iOS Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build web
        run: npm run build

      - name: Sync Capacitor
        run: npx cap sync ios

      - name: Setup Xcode
        uses: maxim-lobanov/setup-xcode@v1
        with:
          xcode-version: latest-stable

      - name: Install CocoaPods
        run: |
          cd ios/App
          pod install

      - name: Build iOS
        run: |
          cd ios/App
          xcodebuild -workspace App.xcworkspace \
            -scheme App \
            -configuration Release \
            -archivePath build/App.xcarchive \
            archive

      - name: Upload to TestFlight
        env:
          APP_STORE_CONNECT_API_KEY: ${{ secrets.ASC_API_KEY }}
        run: |
          cd ios/App
          xcodebuild -exportArchive \
            -archivePath build/App.xcarchive \
            -exportOptionsPlist ExportOptions.plist \
            -exportPath build/export
```

---

## Implementation Checklist

### Setup
- [ ] Install Capacitor dependencies
- [ ] Initialize Capacitor project
- [ ] Add iOS platform
- [ ] Configure capacitor.config.json
- [ ] Set up app icons and splash screen

### Mobile Views
- [ ] Create TabLayout.vue
- [ ] Create HomeTab.vue
- [ ] Create ChatTab.vue
- [ ] Create LearnTab.vue
- [ ] Create AboutTab.vue

### Components
- [ ] Create BottomNav.vue
- [ ] Create FeelingPicker.vue
- [ ] Create NeedCard.vue
- [ ] Create SessionCard.vue
- [ ] Create StreakDisplay.vue

### Features
- [ ] Implement platform detection
- [ ] Add haptic feedback
- [ ] Set up offline storage
- [ ] Configure push notifications
- [ ] Add keyboard handling

### iOS
- [ ] Configure Info.plist
- [ ] Generate app icons
- [ ] Create launch screen
- [ ] Test on device
- [ ] Test on simulator

### App Store
- [ ] Create App Store Connect listing
- [ ] Prepare screenshots
- [ ] Write description and keywords
- [ ] Submit for review

---

## Success Metrics

| Metric | Target |
|--------|--------|
| App Store rating | > 4.5 stars |
| Cold start time | < 3 seconds |
| Crash-free rate | > 99.5% |
| Daily active users | Track baseline |
| Practice completion rate | > 60% |
| Session retention (D7) | > 30% |
