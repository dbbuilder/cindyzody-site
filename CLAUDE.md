# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional website for Cindy Zody, a Communications Practitioner specializing in NVC (Non-Violent Communication) and IFS (Internal Family Systems) coaching. Built with Vue 3, Vite, and Tailwind CSS, deployed on Vercel.

## Development Commands

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build on port 5173
```

## Architecture

### Frontend Stack
- **Vue 3** with Composition API (`<script setup>` syntax)
- **Vue Router 4** for client-side routing (web history mode)
- **Tailwind CSS 3** with custom nature-inspired color palette
- **Headless UI + Heroicons** for accessible UI components

### Key Directories
- `src/pages/` - Page components (Home, About, Services, Approach, Practice, Groups, Resources, Contact, Privacy)
- `src/components/` - Reusable components (Header, Footer, CustomScheduler, ContactForm, etc.)
- `src/config/scheduling.js` - Scheduler provider configuration with service definitions
- `src/utils/` - Analytics (GA4, Meta, LinkedIn) and SEO structured data
- `api/` - Vercel serverless functions (contact form and appointment scheduling)

### Custom Scheduler System
The site uses a custom-built appointment scheduler (`src/components/CustomScheduler.vue`) rather than external services. Configuration in `src/config/scheduling.js` controls:
- Business hours (Mon-Fri, 9 AM-5 PM Pacific)
- Service types with durations
- Special hours and blocked dates
- Provider switching (supports fallback to Squarespace, Calendly, or Google Calendar)

### Tailwind Color Palette
Custom colors defined in `tailwind.config.cjs`:
- `brand` - Primary green tones for CTAs
- `earth` - Golden/warm secondary tones
- `sage` - Forest green neutrals

### API Endpoints
- `POST /api/contact` - Contact form submissions
- `POST /api/schedule` - Appointment bookings

Both endpoints currently log to console; ready for email/database integration.

## Environment Variables

```bash
VITE_SITE_NAME="Cindy Zody — Communications Practitioner"
VITE_SITE_URL="https://www.cindyzody.com"
VITE_GA_ID=""                    # Google Analytics 4
VITE_META_PIXEL_ID=""            # Meta/Facebook Pixel
VITE_LINKEDIN_PARTNER_ID=""      # LinkedIn Insight
VITE_CONTACT_API="/api/contact"
VITE_NVCAI_URL=""                # NVC AI Practice Tool URL
```

## Deployment

Deployed to Vercel with automatic builds from GitHub. Serverless functions in `/api` directory are auto-detected.
