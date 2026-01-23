# Code Quality Improvement Plan: B+ → A

**Goal:** Elevate codebase from B+ to A grade
**Estimated Time:** 3-4 hours
**Date:** January 2026

---

## Current State (B+)

**Strengths:**
- Clean Vue 3 + Express architecture
- Good security practices (XSS, rate limiting, validation)
- Robust AI integration with crisis detection
- Proper error handling with graceful degradation

**Gaps:**
- AI endpoints unprotected (cost/abuse risk)
- No error boundaries (app crashes on component errors)
- Large bundle size (3.6MB main chunk)
- Console.log instead of proper logging
- No TypeScript
- No unit tests

---

## Implementation Plan

### Phase 1: Protect AI Endpoints (High Priority)
**Time: 1-2 hours**

**Problem:** Anyone can hit `/api/ai/chat` and rack up Anthropic API costs.

**Solution:** Add optional Clerk authentication check on AI routes.

**Files to modify:**
- `server/routes/ai.js` - Add auth middleware
- `server/middleware/auth.js` - Create new file for Clerk verification

**Implementation:**
1. Create auth middleware that verifies Clerk session token
2. Apply to AI routes with configurable bypass for demo mode
3. Add rate limiting per authenticated user (higher limits for auth'd users)

**Acceptance Criteria:**
- Unauthenticated users get lower rate limits (5/min vs 20/min)
- Invalid tokens return 401
- Authenticated requests include user ID for tracking

---

### Phase 2: Add Vue Error Boundary (Medium Priority)
**Time: 30-45 minutes**

**Problem:** Component errors crash the entire app with white screen.

**Solution:** Create ErrorBoundary component using Vue's `onErrorCaptured`.

**Files to create/modify:**
- `src/components/ErrorBoundary.vue` - New error boundary component
- `src/App.vue` - Wrap router-view with error boundary

**Implementation:**
1. Create ErrorBoundary component with friendly error UI
2. Log errors to console (and optionally to server)
3. Provide "Try Again" button to reset state
4. Wrap main app content with boundary

**Acceptance Criteria:**
- Component errors show friendly message, not white screen
- Error details logged for debugging
- User can recover without full page refresh

---

### Phase 3: Code Splitting & Bundle Optimization (Medium Priority)
**Time: 1-1.5 hours**

**Problem:** Main bundle is 3.6MB (1.17MB gzipped). html2pdf.js alone is 1MB.

**Solution:**
1. Lazy load html2pdf.js only when PDF generation is needed
2. Lazy load heavy page components
3. Configure Vite manual chunks

**Files to modify:**
- `src/pages/Practice.vue` - Dynamic import for html2pdf
- `src/router/index.js` - Lazy load route components
- `vite.config.js` - Configure manual chunks

**Implementation:**
1. Convert static imports to dynamic `import()` for heavy deps
2. Use Vue Router's lazy loading for all page components
3. Split vendor chunks (vue, clerk, capacitor separately)

**Target:**
- Main chunk < 500KB
- Initial load < 1MB total
- PDF library loaded on-demand only

---

### Phase 4: Replace Console.log with Logger (Low Priority)
**Time: 30-45 minutes**

**Problem:** Console.log statements in production, no structured logging.

**Solution:** Create simple logger utility with log levels.

**Files to create/modify:**
- `server/utils/logger.js` - Create logger utility
- All server files - Replace console.log with logger

**Implementation:**
1. Create logger with levels: debug, info, warn, error
2. In production, only log warn+ to console
3. Include timestamp and context in logs
4. Easy to extend to external logging service later

**Acceptance Criteria:**
- No raw console.log in server code
- Debug logs hidden in production
- Errors include stack traces and context

---

### Phase 5: Add Critical Unit Tests (Low Priority - Optional)
**Time: 1-2 hours**

**Problem:** No unit tests, only Playwright e2e tests.

**Solution:** Add Vitest for unit testing critical functions.

**Files to create:**
- `vitest.config.js` - Vitest configuration
- `server/services/__tests__/database.test.js`
- `server/routes/__tests__/ai.test.js`

**Priority test targets:**
1. Database CRUD operations
2. AI crisis detection
3. Email escaping function
4. Rate limiting logic

---

## Success Metrics

| Metric | Before | Target |
|--------|--------|--------|
| Security vulnerabilities | 2 | 0* |
| API protection | None | Auth + rate limit |
| Error handling | Crash | Graceful recovery |
| Main bundle size | 3.6MB | <500KB |
| Initial load | 1.17MB gz | <500KB gz |
| Console.log statements | ~30 | 0 |
| Unit test coverage | 0% | 20%+ critical paths |

*Remaining 2 are upstream Capacitor issues

---

## Implementation Order

1. ✅ Phase 1: Protect AI Endpoints (security first)
2. ✅ Phase 2: Add Error Boundary (stability)
3. ✅ Phase 3: Code Splitting (performance)
4. ✅ Phase 4: Logger Utility (maintainability)
5. ⏭️ Phase 5: Unit Tests (optional, time permitting)

---

## Rollback Plan

Each phase is independent. If issues arise:
1. Revert specific commit
2. Previous functionality unaffected
3. Can deploy phases incrementally

---

## Post-Implementation

After completing phases 1-4:
- Run full Playwright test suite
- Manual smoke test all features
- Monitor Render logs for errors
- Check bundle analyzer output
