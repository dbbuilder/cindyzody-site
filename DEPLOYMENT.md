# Deployment Guide

## Quick Deploy to Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import `dbbuilder/cindyzody-site` from GitHub

2. **Auto-Configuration:**
   - Vercel automatically detects Vite framework
   - Build settings are configured automatically:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Environment Variables:**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   VITE_SITE_NAME=Cindy Zody — Communications Practitioner
   VITE_SITE_URL=https://your-domain.vercel.app
   VITE_GA_ID=G-XXXXXXXXXX
   VITE_META_PIXEL_ID=123456789
   VITE_LINKEDIN_PARTNER_ID=123456
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - Get your live URL: `https://cindyzody-site.vercel.app`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features Included

✅ Vue 3 + Vite + Tailwind CSS  
✅ Responsive design with mobile menu  
✅ Contact form with validation  
✅ Analytics tracking (GA4, Meta, LinkedIn)  
✅ SEO optimized (meta tags, sitemap, structured data)  
✅ Cookie consent banner  
✅ Vercel serverless API for contact form  

## Contact Form API

The contact form uses Vercel serverless functions (`/api/contact.js`). 
For production, you may want to integrate:
- Email service (SendGrid, Mailgun, etc.)
- Database storage (MongoDB, Supabase, etc.)
- CRM integration (HubSpot, Salesforce, etc.)

## Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain: `cindyzody.com`
3. Configure DNS records as shown
4. Update `VITE_SITE_URL` environment variable