# Deployment Guide

## Quick Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Set environment variable: `RESEND_API_KEY` = your Resend API key
4. Deploy

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `RESEND_API_KEY` | From [resend.com](https://resend.com) | Yes (for contact form) |

## Before Deploying — Checklist

- [ ] Replace `/public/resume.pdf` with your actual resume PDF
- [ ] Add your professional headshot as `/public/images/avatar.jpg`
- [ ] Create an OG image at `/public/og-image.png` (1200×630px)
- [ ] Get a Resend API key at resend.com and add to `.env.local`
- [ ] Update `src/app/layout.tsx` — replace `dheerajkashyap.com` with your real domain
- [ ] Update `src/app/sitemap.ts` — replace `dheerajkashyap.com` with your real domain
- [ ] Update `src/data/profile.ts` — update `calendlyUrl` with your real Calendly link
- [ ] Update cert verification URLs in `src/data/certifications.ts` with real credential links

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Updating Content

All content is in `/src/data/` — no component changes needed:

- `profile.ts` — name, bio, stats, contact info
- `projects.ts` — project case studies
- `certifications.ts` — certifications with dates and IDs
- `experience.ts` — career history
- `education.ts` — academic background
- `skills.ts` — skill categories
- `testimonials.ts` — client/colleague testimonials
- `consulting.ts` — services offered
- `socialLinks.ts` — social profiles
