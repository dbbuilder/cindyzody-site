# Migration Plan: Transferring to Cindy's Own Accounts

This document provides step-by-step instructions for migrating the cindyzody-site from Chris's developer accounts to Cindy's own service accounts.

---

## Overview

| Service | Current Owner | Transfer To | Monthly Cost |
|---------|--------------|-------------|--------------|
| Render (Hosting) | Chris | Cindy | $7 |
| Anthropic (AI) | Chris | Cindy | $2-40 |
| Resend (Email) | Chris | Cindy | $0 |
| Clerk (Auth) | Chris | Cindy | $0 |
| Google Analytics | Not configured | Cindy | $0 |
| **Total** | | | **$9-47/mo** |

---

## Phase 1: Create Service Accounts

**Estimated Time: 1-2 hours**

### 1.1 Anthropic Account (AI Chat)

1. Go to https://console.anthropic.com
2. Click "Sign Up"
3. Use email: `cindyzody@gmail.com`
4. Verify email
5. Add payment method (credit card required)
6. Navigate to **API Keys**
7. Click **Create Key**
8. Name it: `cindyzody-site-production`
9. **Copy and save the key** (starts with `sk-ant-api03-...`)

**⚠️ Important:** You won't be able to see the key again after creation!

---

### 1.2 Resend Account (Email)

1. Go to https://resend.com
2. Click "Start Building"
3. Sign up with: `cindyzody@gmail.com`
4. Verify email
5. Navigate to **API Keys**
6. Click **Create API Key**
7. Name: `cindyzody-site`
8. Permission: `Full access`
9. **Copy the API key** (starts with `re_...`)

#### Domain Verification (Required for Professional Emails)

To send emails from `@cindyzody.com` instead of `@resend.dev`:

1. In Resend, go to **Domains**
2. Click **Add Domain**
3. Enter: `cindyzody.com`
4. Add the DNS records shown to your domain provider:

| Type | Name | Value |
|------|------|-------|
| TXT | resend._domainkey | (provided by Resend) |
| TXT | @ | v=spf1 include:_spf.resend.com ~all |
| MX | send | (provided by Resend) |

5. Wait for verification (can take up to 72 hours, usually faster)

---

### 1.3 Clerk Account (Authentication)

1. Go to https://clerk.com
2. Click "Start Building"
3. Sign up with: `cindyzody@gmail.com`
4. Create a new application:
   - Name: `Cindy Zody`
   - Select sign-in methods: Email, Google (recommended)
5. Go to **Configure** → **API Keys**
6. Copy both keys:
   - **Publishable Key** (starts with `pk_live_...`)
   - **Secret Key** (starts with `sk_live_...`)

#### Configure Allowed Origins

1. Go to **Configure** → **Sessions**
2. Add allowed origins:
   - `https://www.cindyzody.com`
   - `https://cindyzody.com`
   - `https://cindyzody-site.onrender.com`

---

### 1.4 Render Account (Hosting)

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with: `cindyzody@gmail.com`
4. Add payment method

---

### 1.5 Google Analytics (Optional)

1. Go to https://analytics.google.com
2. Sign in with Google account
3. Click **Start measuring**
4. Account name: `Cindy Zody`
5. Property name: `cindyzody.com`
6. Business details: Select appropriate options
7. Copy the **Measurement ID** (starts with `G-...`)

---

## Phase 2: Deploy to Cindy's Render Account

**Estimated Time: 30-60 minutes**

### 2.1 Connect GitHub

1. In Render dashboard, click **New** → **Web Service**
2. Connect your GitHub account (or use public repo URL)
3. Select repository: `dbbuilder/cindyzody-site`

### 2.2 Configure Service

| Setting | Value |
|---------|-------|
| Name | `cindyzody-site` |
| Region | Oregon (US West) |
| Branch | `main` |
| Runtime | Node |
| Build Command | `npm ci --include=dev && npm run build` |
| Start Command | `npm run start` |
| Plan | Starter ($7/month) |

### 2.3 Add Persistent Disk

1. Scroll to **Disks**
2. Click **Add Disk**
3. Name: `data`
4. Mount Path: `/var/data`
5. Size: 1 GB

### 2.4 Set Environment Variables

Click **Environment** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` (from Phase 1.1) |
| `RESEND_API_KEY` | `re_...` (from Phase 1.2) |
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_live_...` (from Phase 1.3) |
| `CLERK_SECRET_KEY` | `sk_live_...` (from Phase 1.3) |
| `CONTACT_EMAIL` | `cindy@cindyzody.com` |
| `CORS_ORIGIN` | `https://www.cindyzody.com` |
| `DATABASE_PATH` | `/var/data/cindyzody.db` |
| `VITE_GA_ID` | `G-...` (from Phase 1.5, optional) |

### 2.5 Deploy

1. Click **Create Web Service**
2. Wait for build and deploy (~3-5 minutes)
3. Test at: `https://cindyzody-site.onrender.com`

---

## Phase 3: Update DNS

**Estimated Time: 15-30 minutes**

### 3.1 Point Domain to Render

In your domain provider (Name.com, GoDaddy, etc.):

1. Go to DNS settings for `cindyzody.com`
2. Add/Update CNAME record:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | `cindyzody-site.onrender.com` |

3. For apex domain (`cindyzody.com` without www), add A records:
   - Render provides IP addresses in the custom domain settings

### 3.2 Add Custom Domain in Render

1. In Render dashboard, go to your service
2. Click **Settings** → **Custom Domains**
3. Add: `www.cindyzody.com`
4. Add: `cindyzody.com`
5. Wait for SSL certificate (automatic, ~10 minutes)

---

## Phase 4: Update Email Sender

**Estimated Time: 15 minutes**

After Resend domain verification completes:

1. Edit `server/services/email.js`
2. Change line 12:
   ```javascript
   // FROM:
   const DEFAULT_FROM = 'Cindy Zody <noreply@resend.dev>'

   // TO:
   const DEFAULT_FROM = 'Cindy Zody <noreply@cindyzody.com>'
   ```
3. Commit and push to trigger redeploy

---

## Phase 5: Verification Checklist

### Test All Features

- [ ] **Homepage** loads at https://www.cindyzody.com
- [ ] **Contact form** sends emails
  - [ ] Cindy receives notification email
  - [ ] Submitter receives confirmation email
- [ ] **Appointment scheduling** works
  - [ ] Can select date/time
  - [ ] Confirmation emails sent
- [ ] **AI Chat** responds
  - [ ] Start new session
  - [ ] Send messages
  - [ ] Receive AI responses
- [ ] **User authentication** works
  - [ ] Sign up
  - [ ] Sign in
  - [ ] Sign out
- [ ] **Analytics** tracking (check GA4 Real-Time report)

---

## Credentials Summary

After migration, Cindy will have these credentials:

| Service | Dashboard URL | Login Email |
|---------|--------------|-------------|
| Anthropic | console.anthropic.com | cindyzody@gmail.com |
| Resend | resend.com | cindyzody@gmail.com |
| Clerk | clerk.com | cindyzody@gmail.com |
| Render | render.com | cindyzody@gmail.com |
| Google Analytics | analytics.google.com | (Google account) |

**Store API keys securely!** Consider using a password manager like 1Password or Bitwarden.

---

## Ongoing Maintenance

### Monthly Tasks
- [ ] Review Anthropic usage/billing
- [ ] Check Render logs for errors
- [ ] Review analytics data

### Quarterly Tasks
- [ ] Update npm dependencies (`npm update`)
- [ ] Review security advisories
- [ ] Backup SQLite database

### Cost Monitoring

Monitor Anthropic usage at: https://console.anthropic.com/settings/usage

If AI costs exceed $50/month, consider:
1. Reducing max_tokens in `server/routes/ai.js`
2. Adding usage limits per user
3. Implementing caching for common responses

---

## Support Contacts

- **Technical Issues:** Chris Therriault <chris@servicevision.net>
- **Anthropic Support:** support@anthropic.com
- **Render Support:** support@render.com
- **Clerk Support:** support@clerk.com
- **Resend Support:** support@resend.com

---

## Rollback Plan

If issues occur after migration:

1. **Immediate:** Point DNS back to old Render deployment
2. **Restore:** Old environment variables are still on Chris's Render account
3. **Investigate:** Check Render logs for errors

The old deployment can remain active (in sleep mode) for 30 days as a backup.
