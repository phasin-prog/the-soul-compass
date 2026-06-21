# Deployment Guide

This document describes how to deploy The Soul's Compass to Vercel.

---

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free tier is sufficient)
- Node.js 18.x or 20.x locally

---

## Method 1: Vercel CLI (Recommended)

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy to Production

```bash
vercel --prod
```

The CLI will:
- Detect Next.js framework automatically
- Upload and build your project
- Provide a production URL

### 4. Set Environment Variables

```bash
vercel env add NEXT_PUBLIC_SITE_URL production
```

When prompted, enter:
```
https://your-project.vercel.app
```

Or if you have a custom domain:
```
https://thesoulscompass.com
```

### 5. Redeploy with Environment Variable

```bash
vercel --prod
```

---

## Method 2: GitHub Integration

### 1. Push to GitHub

```bash
git remote add origin https://github.com/your-username/the-souls-compass.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)
   - **Node.js Version:** 20.x

### 3. Add Environment Variables

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add variable:
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://your-project.vercel.app`
   - **Environment:** Production

### 4. Redeploy

Push to main branch or click "Redeploy" in Vercel dashboard.

---

## Custom Domain Setup

### 1. Add Domain in Vercel

```bash
vercel domains add thesoulscompass.com
```

Or via dashboard:
1. Go to Project Settings → Domains
2. Add domain: `thesoulscompass.com`
3. Add `www.thesoulscompass.com` (optional)

### 2. Configure DNS

At your domain registrar, add these records:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**CNAME Record (for www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3. Wait for DNS Propagation

Usually takes 5-30 minutes. Check status:
```bash
vercel domains inspect thesoulscompass.com
```

### 4. Update Environment Variable

```bash
vercel env add NEXT_PUBLIC_SITE_URL production
```

Enter:
```
https://thesoulscompass.com
```

### 5. Redeploy

```bash
vercel --prod
```

---

## Post-Deployment Checklist

### Functional Tests
- [ ] Homepage loads at production URL
- [ ] All navigation links work
- [ ] Locale switching works (TH ↔ EN)
- [ ] All 5 category pages accessible
- [ ] Articles/Concepts/Series pages load
- [ ] About/Manifesto pages load
- [ ] Resources page loads
- [ ] TPDT warning banner shows

### SEO Verification
- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` accessible
- [ ] `/opengraph-image` generates
- [ ] Meta tags present (view source)
- [ ] Canonical URLs correct
- [ ] hreflang tags present

### Performance Check
Run Lighthouse audit:
```bash
# Install Lighthouse CLI
npm i -g lighthouse

# Run audit
lighthouse https://your-site.com --view
```

Target scores:
- Performance: > 90
- Accessibility: 100
- SEO: 100
- Best Practices: > 90

### Accessibility Check
- [ ] Skip link works (Tab + Enter)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Color contrast sufficient

---

## Continuous Deployment

With GitHub integration, every push to `main` triggers a deployment:

```bash
git add .
git commit -m "Update content"
git push origin main
```

Vercel will:
1. Run build
2. Deploy to production
3. Notify you via email/Slack

---

## Rollback

To rollback to a previous deployment:

```bash
vercel rollback <deployment-url>
```

Or via dashboard:
1. Go to Deployments
2. Find previous deployment
3. Click "Promote to Production"

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production URL | `https://thesoulscompass.com` |

---

## Troubleshooting

### Build Fails

Check build logs:
```bash
vercel logs <deployment-url>
```

Common issues:
- Missing environment variables
- TypeScript errors
- Dependency conflicts

### 404 on Routes

Ensure middleware is working:
- Check `middleware.ts` exists
- Verify locale detection logic
- Test locally first

### Slow First Load

Enable Edge caching:
1. Go to Project Settings → Functions
2. Set Runtime: Edge (if compatible)

---

## Monitoring

### Analytics (Optional)

Add Vercel Analytics:
```bash
npm install @vercel/analytics
```

In `app/[locale]/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

// Add to body
<Analytics />
```

### Web Vitals

Check Web Vitals in Vercel dashboard:
1. Go to Analytics
2. View Core Web Vitals
3. Monitor LCP, FID, CLS

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: [Create issue]

---

**Last Updated:** 2026-06-20
