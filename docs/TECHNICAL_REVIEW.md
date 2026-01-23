# Cindy Zody Site - Technical Review & Migration Analysis

**Date:** January 2026
**Reviewer:** Claude Code Analysis

---

## Executive Summary

The cindyzody-site is a well-architected Vue 3 application with Express backend, deployed on Render. The codebase is generally clean with good separation of concerns. Key areas requiring attention include security vulnerabilities in dependencies, dead code cleanup, and service migration to Cindy's own accounts.

---

## 1. Code Quality Assessment

### Strengths ✅

| Area | Assessment |
|------|------------|
| **Architecture** | Clean separation: Vue 3 frontend, Express backend, SQLite persistence |
| **Component Design** | Good use of Vue Composition API with `<script setup>` |
| **API Design** | RESTful endpoints with proper rate limiting |
| **Security** | XSS escaping in emails, input validation, rate limiting |
| **Error Handling** | Graceful degradation (DB/email failures don't break requests) |
| **AI Integration** | Robust NVC system prompt, crisis detection, conversation history |
| **State Management** | Proper use of composables for shared state |

### Code Patterns Rating: **B+**

---

## 2. Technical Debt Items

### 🔴 Critical (Fix Immediately)

| Issue | Location | Impact | Effort |
|-------|----------|--------|--------|
| **npm audit vulnerabilities** | `package.json` | Security risk | 1 hour |
| - `@capacitor/cli` (high) | Tar vulnerability | Update to 8.0.3+ when available |
| - `glob` (high) | Command injection | Update dependency |
| - `esbuild` (moderate) | Dev server CORS | Update vite |
| - `lodash` (moderate) | Prototype pollution | Update dependency |

**Fix:** Run `npm audit fix` or update specific packages.

### 🟡 Medium Priority

| Issue | Location | Impact | Effort |
|-------|----------|--------|--------|
| **Dead code: Supabase** | `src/lib/supabase.js` | Unused, confusing | 30 min |
| - File imports Supabase but is never used | Replace with Clerk fully | Remove file |
| **Unused dependency** | `@supabase/supabase-js` | Package bloat | Remove |
| **Email sender domain** | `server/services/email.js:12` | Uses `@resend.dev` | 2 hours |
| - Currently using Resend test domain | Needs verified domain | Setup DNS |
| **Missing error boundaries** | Vue components | App crashes on errors | 4 hours |
| **No API authentication** | `server/routes/ai.js` | Potential abuse | 4 hours |
| - AI endpoints accessible without auth | Could rack up API costs | Add Clerk verification |

### 🟢 Low Priority (Nice to Have)

| Issue | Location | Notes |
|-------|----------|-------|
| **Console.log statements** | Multiple files | Should use proper logging |
| **Magic numbers** | Rate limiting configs | Extract to constants |
| **Missing TypeScript** | Entire codebase | Would improve maintainability |
| **No unit tests** | - | Only Playwright e2e tests exist |
| **Large node_modules** | 733MB | Capacitor adds bulk |

---

## 3. Security Audit

### Current Security Measures ✅
- XSS escaping in email templates (`escapeHtml()`)
- Input validation on contact/schedule forms
- Rate limiting (contact: 5/15min, schedule: 10/hr, AI: 20/min)
- CORS configuration
- SQL parameterized queries (SQLite)

### Security Gaps ⚠️

| Risk | Severity | Recommendation |
|------|----------|----------------|
| **AI endpoints unprotected** | Medium | Add Clerk auth verification |
| **No CSRF protection** | Low | Add CSRF tokens for forms |
| **Session data in localStorage** | Low | Consider encrypted storage |
| **API keys in environment** | Low | Already handled properly |

---

## 4. Services Cindy Needs to Sign Up For

### Required Services for Production

| Service | Purpose | Current Status | Monthly Cost | Setup Time |
|---------|---------|----------------|--------------|------------|
| **Anthropic** | AI Chat (Claude API) | ✅ Using Chris's key | $20-100+ | 15 min |
| **Resend** | Transactional Email | ✅ Using Chris's key | $0 (100/day free) | 30 min |
| **Clerk** | User Authentication | ✅ Using Chris's key | $0 (10K MAU free) | 1 hour |
| **Render** | Web Hosting | ⚠️ Using Chris's account | $7/mo (Starter) | 30 min |
| **Domain** | cindyzody.com | ✅ Already owned | ~$15/year | Already done |
| **Google Analytics** | Site Analytics | ⚠️ Not configured | $0 (free) | 30 min |

### Detailed Service Breakdown

---

### 4.1 Anthropic (AI/Claude API)

**What it does:** Powers the AI chat for NVC practice sessions.

**Pricing (January 2026):**
- Pay-as-you-go model
- Claude Sonnet 4: ~$3/million input tokens, ~$15/million output tokens
- Typical session: ~1000 tokens = ~$0.02 per conversation

**Estimated Monthly Cost:**
| Usage Level | Sessions/Month | Cost |
|-------------|----------------|------|
| Light | 100 | $2 |
| Moderate | 500 | $10 |
| Heavy | 2000 | $40 |

**Setup Steps:**
1. Go to https://console.anthropic.com
2. Create account with cindyzody@gmail.com
3. Add payment method
4. Generate API key
5. Update `ANTHROPIC_API_KEY` in Render dashboard

---

### 4.2 Resend (Email Service)

**What it does:** Sends contact form notifications and appointment confirmations.

**Pricing:**
| Tier | Emails/Month | Cost |
|------|--------------|------|
| Free | 3,000 | $0 |
| Pro | 50,000 | $20/mo |

**Current Issue:** Using `noreply@resend.dev` test domain.

**Setup Steps:**
1. Go to https://resend.com
2. Create account
3. **Add and verify domain** (requires DNS access):
   - Add TXT record for domain verification
   - Add MX/SPF/DKIM records
4. Update `DEFAULT_FROM` in `server/services/email.js`
5. Update `RESEND_API_KEY` in Render dashboard

**Estimated Monthly Cost:** $0 (free tier sufficient)

---

### 4.3 Clerk (Authentication)

**What it does:** Handles user sign-up, login, and session management.

**Pricing:**
| Tier | MAU (Monthly Active Users) | Cost |
|------|---------------------------|------|
| Free | Up to 10,000 | $0 |
| Pro | Up to 100,000 | $25/mo |

**Setup Steps:**
1. Go to https://clerk.com
2. Create account
3. Create new application "Cindy Zody"
4. Configure sign-in methods (Email, Google, etc.)
5. Copy Publishable Key and Secret Key
6. Update in Render dashboard:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

**Estimated Monthly Cost:** $0 (free tier)

---

### 4.4 Render (Web Hosting)

**What it does:** Hosts the website and API.

**Current Configuration:**
- Starter plan with 1GB persistent disk
- Auto-deploy from GitHub

**Pricing:**
| Plan | RAM | CPU | Disk | Cost |
|------|-----|-----|------|------|
| Free | 512MB | Shared | None | $0 |
| Starter | 512MB | Shared | 1GB | $7/mo |
| Standard | 2GB | 1 CPU | 10GB | $25/mo |

**Recommendation:** Starter plan ($7/mo) is sufficient.

**Setup Steps:**
1. Go to https://render.com
2. Create account with cindyzody@gmail.com
3. Connect GitHub account
4. Import the cindyzody-site repository
5. Configure environment variables
6. Deploy

**Estimated Monthly Cost:** $7

---

### 4.5 Google Analytics (Optional)

**What it does:** Tracks website traffic and user behavior.

**Pricing:** Free (Google Analytics 4)

**Setup Steps:**
1. Go to https://analytics.google.com
2. Create property for cindyzody.com
3. Copy Measurement ID (G-XXXXXXX)
4. Add to Render: `VITE_GA_ID`

**Estimated Monthly Cost:** $0

---

## 5. Total Monthly Cost Estimate

| Service | Low Usage | Moderate Usage | Heavy Usage |
|---------|-----------|----------------|-------------|
| Render (Hosting) | $7 | $7 | $7 |
| Anthropic (AI) | $2 | $10 | $40 |
| Resend (Email) | $0 | $0 | $0 |
| Clerk (Auth) | $0 | $0 | $0 |
| Analytics | $0 | $0 | $0 |
| **TOTAL** | **$9/mo** | **$17/mo** | **$47/mo** |

**Annual Estimate:** $108 - $564/year

---

## 6. Migration Checklist

### Phase 1: Create Accounts (1-2 hours)
- [ ] Create Anthropic account (cindyzody@gmail.com)
- [ ] Create Resend account
- [ ] Create Clerk account
- [ ] Create Render account
- [ ] Create Google Analytics property (optional)

### Phase 2: Configure Services (2-3 hours)
- [ ] Generate Anthropic API key
- [ ] Verify domain in Resend (requires DNS access)
- [ ] Configure Clerk application
- [ ] Import repo to new Render account
- [ ] Set up Google Analytics

### Phase 3: Update Environment Variables
In Render dashboard, set:
```
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
VITE_GA_ID=G-...
CONTACT_EMAIL=cindy@cindyzody.com
```

### Phase 4: DNS Updates (if using custom email domain)
Add these DNS records:
- Resend domain verification TXT record
- SPF record for email sending
- DKIM record for email authentication

### Phase 5: Testing
- [ ] Test contact form sends emails
- [ ] Test appointment scheduling
- [ ] Test AI chat functionality
- [ ] Test user authentication
- [ ] Verify analytics tracking

---

## 7. Recommendations

### Immediate Actions
1. **Run `npm audit fix`** to address security vulnerabilities
2. **Remove Supabase** - unused dead code
3. **Add API authentication** for AI endpoints to prevent abuse

### Short-term (This Month)
1. Create Cindy's own service accounts
2. Migrate environment variables
3. Verify email domain for professional sending

### Medium-term (Next Quarter)
1. Add error boundary components
2. Implement proper logging (replace console.log)
3. Consider adding TypeScript
4. Add unit tests for critical paths

---

## 8. Files to Clean Up

```bash
# Dead code - remove these files
rm src/lib/supabase.js

# Remove unused dependency
npm uninstall @supabase/supabase-js
```

---

## Contact

For questions about this review or migration assistance:
- Developer: Chris Therriault <chris@servicevision.net>
