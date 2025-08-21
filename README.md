# Cindy Zody Communications Practitioner Website

A modern Vue 3 website for Cindy Zody, featuring:

- **Vue 3 + Vite** - Fast development and build
- **Tailwind CSS** - Modern responsive design
- **Contact Form** - Lead capture with analytics tracking
- **SEO Optimized** - Meta tags, structured data, sitemap
- **Mobile Responsive** - Works on all devices

## Features

- NVC/IFS practitioner information
- Services and approach pages
- Contact form with validation
- Analytics integration (GA4, Meta Pixel, LinkedIn)
- Cookie consent banner
- Privacy policy

## Quick Start

```bash
npm install
npm run dev
```

## Deployment

This site is optimized for Vercel deployment. Connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

Create a `.env` file with:

```
VITE_SITE_NAME="Cindy Zody — Communications Practitioner"
VITE_SITE_URL="https://www.cindyzody.com"
VITE_GA_ID=""                           # optional GA4
VITE_META_PIXEL_ID=""                   # optional Meta/Facebook Pixel
VITE_LINKEDIN_PARTNER_ID=""             # optional LinkedIn Insight
VITE_CONTACT_API="/api/contact"         # API endpoint for contact form
```

## Build

```bash
npm run build
```

The build output will be in the `dist` directory.

## Contact

For questions about this website, contact the developer or Cindy Zody directly at cindyzody@gmail.com.
