# Vercel Deployment Guide

## ✅ Deployment Status

**Status:** Successfully Deployed  
**Branch:** Form  
**Production URL:** https://ai-wave-eet925iih-sofoniyas-projects.vercel.app  
**Vercel Dashboard:** https://vercel.com/sofoniyas-projects/ai-wave

## 📋 Deployment Details

- **Project:** ai-wave
- **Account:** sofoniyastekalegn
- **Build Time:** ~9 seconds
- **Build Status:** ✅ Ready

## 🔧 Environment Variables Setup (Recommended)

Currently, Supabase credentials are hardcoded. For better security, add environment variables in Vercel:

### Steps to Add Environment Variables:

1. Go to Vercel Dashboard: https://vercel.com/sofoniyas-projects/ai-wave/settings/environment-variables
2. Add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://rparoorbiarrojekvrrf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwYXJvb3JiaWFycm9qZWt2cnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxODMzOTYsImV4cCI6MjA3Mzc1OTM5Nn0.AmpaZMeYIu_eWSDMqXD_WCwyJNO2SLfJbzCE8Nt_k00
```

3. Apply to: **Production**, **Preview**, and **Development**
4. Redeploy after adding variables

### Using Vercel CLI:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Enter: https://rparoorbiarrojekvrrf.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Enter: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwYXJvb3JiaWFycm9qZWt2cnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxODMzOTYsImV4cCI6MjA3Mzc1OTM5Nn0.AmpaZMeYIu_eWSDMqXD_WCwyJNO2SLfJbzCE8Nt_k00
```

## 🌐 Domain Configuration

If you want to use `ai-wave-delta.vercel.app` or a custom domain:

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS settings if using custom domain

## 🔄 Redeploy Commands

```bash
# Redeploy production
vercel --prod

# Deploy preview
vercel

# View deployment logs
vercel inspect <deployment-url> --logs

# List deployments
vercel ls
```

## 📝 Current Configuration

- **Framework:** Vite + React
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** Auto-detected
- **SPA Routing:** Configured in `vercel.json`

## ✅ What's Deployed

From the **Form** branch:
- ✅ Contact form with Supabase integration
- ✅ Email notification system setup
- ✅ Database migrations
- ✅ Supabase Edge Functions
- ✅ All documentation files
- ✅ Updated email service

## 🐛 Troubleshooting

### If contact form doesn't work:
1. Check Supabase database is set up (run migrations)
2. Verify RLS policies are configured
3. Check browser console for errors
4. Verify Supabase credentials are correct

### If build fails:
1. Check `vercel inspect <url> --logs`
2. Verify all dependencies are in `package.json`
3. Check for TypeScript/ESLint errors

## 📞 Support

- **Vercel Dashboard:** https://vercel.com/sofoniyas-projects
- **Project URL:** https://vercel.com/sofoniyas-projects/ai-wave
- **Deployment URL:** https://ai-wave-eet925iih-sofoniyas-projects.vercel.app

