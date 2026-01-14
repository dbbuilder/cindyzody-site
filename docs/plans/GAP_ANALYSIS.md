# Gap Analysis: Feelings & Needs Platform

## Purpose

This document identifies gaps, inconsistencies, and missing specifications across our planning documentation to ensure a complete and cohesive implementation roadmap.

---

## Critical Gaps

### 1. Authentication & Account System

**Status:** Not specified

**Gap:** No documentation exists for:
- User registration flow
- Login/logout mechanisms
- Password reset
- Social authentication options
- Guest vs authenticated user capabilities
- Account deletion (GDPR compliance)

**Impact:** Affects all phases from Phase 2 onwards

**Resolution Required:**
- Define authentication provider (Auth0, Supabase Auth, custom)
- Document user states (guest, registered, premium)
- Specify session management
- Define account data structure

---

### 2. Data Synchronization Strategy

**Status:** Mentioned but undefined

**Gap:** FEATURE_MATRIX.md mentions "synced data across platforms" but no specification for:
- Sync timing and triggers
- Conflict resolution rules
- Offline capability scope
- Data schema versioning
- Migration strategy for schema changes

**Impact:** Critical for iOS app and multi-device usage

**Resolution Required:**
- Define sync architecture (real-time vs eventual)
- Document offline data storage limits
- Specify conflict resolution algorithm
- Define sync error handling

---

### 3. AI Integration Architecture Decision

**Status:** Undecided

**Gap:** Two approaches mentioned without final decision:
1. **Iframe embed** - Current NVCAI external redirect
2. **API integration** - Direct Claude API calls

**Trade-offs Not Documented:**
| Aspect | Iframe | API |
|--------|--------|-----|
| Implementation effort | Low | High |
| User experience | Fragmented | Seamless |
| Data capture | Limited | Full |
| Cost control | External | Direct |
| Customization | None | Full |

**Impact:** Fundamental architecture decision affecting all AI features

**Resolution Required:**
- Make definitive decision
- Document rationale in ADR
- Specify API costs and limits

---

### 4. Error Handling & Recovery

**Status:** Not specified

**Gap:** No documentation for:
- Network failure handling
- API error responses
- Session recovery
- Data loss prevention
- User feedback for errors

**Impact:** User experience and data integrity

**Resolution Required:**
- Define error taxonomy
- Specify retry strategies
- Document user-facing error messages
- Define logging/monitoring approach

---

### 5. Privacy & Security

**Status:** Not documented

**Gap:** Missing specifications for:
- Data encryption (at rest, in transit)
- PII handling
- Session data retention
- GDPR/CCPA compliance
- Data export capabilities
- Third-party data sharing policies

**Impact:** Legal compliance and user trust

**Resolution Required:**
- Create Privacy Policy content
- Document data handling procedures
- Define retention periods
- Specify encryption standards

---

### 6. Crisis & Safety Protocols

**Status:** Not documented

**Gap:** NVC practice may surface:
- Mental health crises
- Domestic violence situations
- Self-harm indicators
- Abuse disclosure

**No documentation for:**
- AI response to crisis language
- Crisis resource integration
- Mandatory reporting considerations
- Liability limitations

**Impact:** User safety and legal liability

**Resolution Required:**
- Define crisis detection keywords
- Create crisis response protocols
- Integrate crisis hotline resources
- Document disclaimer language

---

## Moderate Gaps

### 7. Business Logic Boundaries

**Status:** Partially defined

**Gap:** PHASE_6_ADVANCED_FEATURES.md defines tiers but not:
- Feature gating implementation
- Free trial mechanics
- Subscription state management
- Payment failure handling
- Refund policies

**Resolution Required:**
- Define feature flags per tier
- Specify payment provider integration
- Document subscription lifecycle

---

### 8. Two-Person Edge Cases

**Status:** Partially documented

**Gap:** PHASE_5_TWO_PERSON.md covers happy path but not:
- Partner declines invitation
- Partner abandons mid-session
- Disagreement on agreement terms
- Asymmetric commitment levels
- Session timeout handling
- Inappropriate content between users

**Resolution Required:**
- Document all edge cases
- Define timeout policies
- Specify content moderation approach

---

### 9. Accessibility Compliance

**Status:** Mentioned but not specified

**Gap:** No documentation for:
- WCAG 2.1 compliance level target
- Screen reader testing plan
- Keyboard navigation requirements
- Color contrast requirements
- Alternative text standards

**Resolution Required:**
- Define WCAG target level (AA recommended)
- Create accessibility checklist
- Specify testing methodology

---

### 10. Performance Requirements

**Status:** Not specified

**Gap:** No documentation for:
- Page load time targets
- API response time limits
- Animation performance standards
- Bundle size limits
- Memory usage limits (iOS)

**Resolution Required:**
- Define performance budgets
- Specify monitoring approach
- Create performance test plan

---

## Minor Gaps

### 11. Content Management

**Gap:** NVC content (feelings, needs, scenarios) management:
- Who updates content?
- Version control for content changes
- Translation workflow
- Content approval process

### 12. Analytics & Metrics Implementation

**Gap:** Success metrics defined but not:
- Analytics provider selection
- Event tracking specification
- Privacy-compliant tracking approach
- Dashboard requirements

### 13. Testing Strategy

**Gap:** No documentation for:
- Unit test coverage targets
- Integration test scope
- E2E test scenarios
- iOS-specific testing
- AI response testing

### 14. Deployment & Rollback

**Gap:** Render migration covers deployment but not:
- Rollback procedures
- Feature flag management
- Staged rollout strategy
- Incident response procedures

---

## Cross-Document Inconsistencies

### Terminology Inconsistencies

| Term | Used In | Alternative Used |
|------|---------|-----------------|
| "Session" | AI_INTEGRATION_PLAN | "Conversation" in USER_JOURNEYS |
| "Practice" | FEATURE_MATRIX | "Exercise" in NVC_DATA_MODEL |
| "Partner" | PHASE_5 | "Other person" in USER_JOURNEYS |

**Resolution:** Create glossary in MASTER_PLAN.md

### Priority Inconsistencies

| Feature | FEATURE_MATRIX Priority | IOS_CAPACITOR_PLAN Priority |
|---------|------------------------|---------------------------|
| Push notifications | P1 | MVP |
| Voice input | P1 | Post-MVP |

**Resolution:** Reconcile and document in single source

---

## Dependency Gaps

### Undocumented Dependencies

1. **Claude API access** - No documentation on:
   - API key management
   - Rate limiting handling
   - Cost monitoring
   - Fallback if API unavailable

2. **PostgreSQL specifics** - Not specified:
   - Connection pooling approach
   - Backup strategy
   - Read replica needs

3. **WebSocket infrastructure** - Not specified:
   - Provider selection
   - Connection management
   - Reconnection strategy
   - Message queue for offline users

---

## Resolution Priority

### Immediate (Before Phase 1)

1. Authentication architecture decision
2. AI integration decision (iframe vs API)
3. Privacy & security guidelines
4. Crisis protocol definition

### Before Phase 2

5. Data synchronization specification
6. Error handling standards
7. Performance requirements

### Before Phase 4 (iOS)

8. Accessibility compliance checklist
9. App Store content policies review
10. Push notification strategy

### Before Phase 5

11. Two-person edge cases
12. Content moderation approach
13. Real-time infrastructure selection

---

## Next Steps

1. **Create Technical Architecture Supplement** - Address gaps 1, 2, 4, 10
2. **Create Safety & Privacy Guidelines** - Address gaps 5, 6
3. **Update Feature Matrix** - Reconcile priorities
4. **Create Architecture Decision Records** - Document AI integration choice

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2025-01-12 | Chris Therriault | Initial gap analysis |
