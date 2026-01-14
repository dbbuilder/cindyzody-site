# Phase 3: Render Migration Plan

## Objective

Migrate the Feelings & Needs platform from Vercel to Render for better control, pricing, and unified infrastructure management as the platform grows.

---

## Current Vercel Setup

### Services Deployed
- **Static Site**: Vue 3 SPA built with Vite → `dist/` directory
- **Serverless Functions**: `/api/contact.js`, `/api/schedule.js`
- **Environment Variables**: Analytics IDs, API endpoints

### Configuration
```json
// vercel.json (currently empty - auto-detected)
{}
```

### Build Settings
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

## Why Render?

| Factor | Vercel | Render |
|--------|--------|--------|
| Static Sites | Free tier | Free tier |
| Serverless Functions | 100GB-hrs/month free | N/A - use Web Services |
| Web Services | N/A | $7/mo (starter) |
| PostgreSQL | N/A | $7/mo (starter) |
| Background Jobs | Limited | Built-in |
| Custom Domains | Unlimited | Unlimited |
| Unified Dashboard | Functions only | Full stack |
| Docker Support | Limited | Full |

### Key Advantages for Feelings & Needs
1. **PostgreSQL included** - Need database for session history, progress tracking
2. **Persistent services** - AI chat backend needs long-running connections
3. **Unified platform** - Single dashboard for web, API, and database
4. **Docker support** - Flexibility for future services
5. **Predictable pricing** - No surprise bills from function invocations

---

## Migration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Render Platform                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │  Static Site    │    │   Web Service   │                    │
│  │  (feelings-     │    │   (feelings-    │                    │
│  │   needs-web)    │    │    needs-api)   │                    │
│  │                 │    │                 │                    │
│  │  Vue 3 SPA      │───▶│  Node.js API    │                    │
│  │  dist/          │    │  /api/*         │                    │
│  └─────────────────┘    └────────┬────────┘                    │
│                                  │                              │
│                         ┌────────▼────────┐                    │
│                         │   PostgreSQL    │                    │
│                         │   (feelings-    │                    │
│                         │    needs-db)    │                    │
│                         └─────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Migration

### Step 1: Create Render Account & Project

1. Sign up at render.com
2. Connect GitHub repository
3. Create Blueprint (infrastructure as code)

### Step 2: Create `render.yaml` Blueprint

```yaml
# render.yaml
services:
  # Static Site - Vue 3 SPA
  - type: web
    name: feelings-needs-web
    runtime: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    pullRequestPreviewsEnabled: true
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    headers:
      - path: /*
        name: Cache-Control
        value: public, max-age=0, must-revalidate
      - path: /assets/*
        name: Cache-Control
        value: public, max-age=31536000, immutable
    envVars:
      - key: VITE_SITE_NAME
        value: "Feelings & Needs"
      - key: VITE_SITE_URL
        value: "https://feelingsandneeds.com"
      - key: VITE_GA_ID
        sync: false
      - key: VITE_META_PIXEL_ID
        sync: false
      - key: VITE_LINKEDIN_PARTNER_ID
        sync: false
      - key: VITE_API_URL
        fromService:
          name: feelings-needs-api
          type: web
          property: host

  # API Service - Node.js/Express
  - type: web
    name: feelings-needs-api
    runtime: node
    buildCommand: npm install
    startCommand: node server.js
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: feelings-needs-db
          property: connectionString
      - key: ANTHROPIC_API_KEY
        sync: false
      - key: CORS_ORIGIN
        fromService:
          name: feelings-needs-web
          type: web
          property: host

databases:
  - name: feelings-needs-db
    databaseName: feelings_needs
    plan: starter
    postgresMajorVersion: 16
```

### Step 3: Restructure API for Render

**Current Vercel structure:**
```
api/
├── contact.js    # Serverless function
└── schedule.js   # Serverless function
```

**New Render structure:**
```
server/
├── server.js           # Express app entry
├── routes/
│   ├── contact.js      # Contact form route
│   ├── schedule.js     # Scheduling route
│   └── ai.js           # AI chat routes (new)
├── services/
│   ├── email.js        # Email service
│   └── ai.js           # AI service
├── db/
│   ├── index.js        # Database connection
│   └── migrations/     # SQL migrations
└── middleware/
    ├── cors.js
    └── validation.js
```

### Step 4: Create Express Server

```js
// server/server.js
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { contactRouter } from './routes/contact.js'
import { scheduleRouter } from './routes/schedule.js'
import { aiRouter } from './routes/ai.js'

const app = express()
const PORT = process.env.PORT || 3000

// Security
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/contact', contactRouter)
app.use('/api/schedule', scheduleRouter)
app.use('/api/ai', aiRouter)

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

### Step 5: Migrate Serverless Functions

**Before (Vercel):**
```js
// api/contact.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  // ... handle contact
}
```

**After (Express):**
```js
// server/routes/contact.js
import { Router } from 'express'

export const contactRouter = Router()

contactRouter.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, consent } = req.body

    // Validation
    if (!email || !message || !consent) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Process contact (email, database, etc.)
    // ...

    res.json({ success: true, message: 'Message received' })
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({ error: 'Failed to process message' })
  }
})
```

### Step 6: Database Setup

```js
// server/db/index.js
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

export const query = (text, params) => pool.query(text, params)

export default pool
```

### Step 7: Update Frontend API Calls

```js
// src/config/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = {
  async post(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  async get(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  }
}
```

---

## Domain Migration

### Current DNS
- Domain: cindyzody.com (or similar)
- Hosted: Vercel

### New DNS Configuration

```
# A Records (Render static site)
@     A     216.24.57.1
www   CNAME feelings-needs-web.onrender.com

# API subdomain
api   CNAME feelings-needs-api.onrender.com
```

### SSL Certificates
- Render provides automatic SSL via Let's Encrypt
- Custom domains require DNS validation
- Supports wildcard certificates

---

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Render

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### Render Auto-Deploy
- Enable "Auto-Deploy" in Render dashboard
- Deploys on every push to main branch
- Preview deployments for PRs

---

## Environment Variables

### Static Site (feelings-needs-web)

| Variable | Value | Secret |
|----------|-------|--------|
| VITE_SITE_NAME | "Feelings & Needs" | No |
| VITE_SITE_URL | https://feelingsandneeds.com | No |
| VITE_GA_ID | UA-XXXXX | Yes |
| VITE_META_PIXEL_ID | XXXXX | Yes |
| VITE_LINKEDIN_PARTNER_ID | XXXXX | Yes |
| VITE_API_URL | (from API service) | No |

### API Service (feelings-needs-api)

| Variable | Value | Secret |
|----------|-------|--------|
| NODE_ENV | production | No |
| DATABASE_URL | (from database) | Yes |
| ANTHROPIC_API_KEY | sk-ant-xxx | Yes |
| CORS_ORIGIN | (from static site) | No |
| JWT_SECRET | (generated) | Yes |

---

## Migration Checklist

### Pre-Migration
- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Create `render.yaml` blueprint
- [ ] Set up staging environment
- [ ] Test build process on Render

### Backend Migration
- [ ] Create Express server structure
- [ ] Migrate contact.js to Express route
- [ ] Migrate schedule.js to Express route
- [ ] Add AI routes for Phase 2
- [ ] Set up PostgreSQL database
- [ ] Run database migrations
- [ ] Test all API endpoints

### Frontend Migration
- [ ] Update API URL configuration
- [ ] Test frontend with Render backend
- [ ] Update environment variables
- [ ] Test production build

### DNS & Domain
- [ ] Update DNS records
- [ ] Verify SSL certificates
- [ ] Test custom domain
- [ ] Update SEO sitemap

### Cutover
- [ ] Deploy to production
- [ ] Verify all functionality
- [ ] Monitor error logs
- [ ] Update analytics
- [ ] Disable Vercel deployment

### Post-Migration
- [ ] Remove Vercel configuration
- [ ] Update documentation
- [ ] Delete Vercel project (optional)
- [ ] Monitor performance metrics

---

## Rollback Plan

If issues arise during migration:

1. **DNS Rollback**: Point DNS back to Vercel (5-minute TTL)
2. **Keep Vercel Active**: Don't delete Vercel project until 7 days post-migration
3. **Database Backup**: Export Render PostgreSQL before any changes
4. **Feature Flags**: Use environment variables to toggle new features

---

## Cost Estimate

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Static Site | Free | $0 |
| Web Service | Starter | $7 |
| PostgreSQL | Starter | $7 |
| **Total** | | **$14/month** |

Note: Vercel is currently free for this workload. Render cost is justified by:
- PostgreSQL for session persistence
- Better control for AI backend
- Unified infrastructure
- Predictable scaling costs

---

## Performance Targets

| Metric | Current (Vercel) | Target (Render) |
|--------|------------------|-----------------|
| TTFB | < 100ms | < 200ms |
| LCP | < 2.5s | < 2.5s |
| Cold Start | ~500ms | < 1s |
| API Latency | ~200ms | < 300ms |

---

## Timeline

| Task | Duration |
|------|----------|
| Render setup & Blueprint | 1 session |
| Backend restructure | 1-2 sessions |
| Frontend updates | 1 session |
| Testing | 1 session |
| DNS migration | 1 session |
| Monitoring | Ongoing |
