# Contact Form Email Setup Guide

This guide explains how to set up email notifications for the contact form to send emails to both `sofoniyastekalegn@gmail.com` and `joelgerbi1@gmail.com`.

## Current Implementation

The contact form (`src/pages/Contact.jsx`) now:
1. Saves form submissions to Supabase `contact_submissions` table
2. Triggers email notifications via Supabase webhooks or Edge Functions

## Setup Options

### Option 1: Supabase Webhooks (Recommended - Easiest)

1. **Deploy the Edge Function:**
   ```bash
   # Install Supabase CLI if not already installed
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link to your project
   supabase link --project-ref rparoorbiarrojekvrrf
   
   # Deploy the Edge Function
   supabase functions deploy send-contact-email
   ```

2. **Set Environment Variables:**
   - Go to Supabase Dashboard > Edge Functions > send-contact-email > Settings
   - Add these secrets:
     - `RESEND_API_KEY` (recommended) - Get from https://resend.com
     - OR `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_EMAIL`

3. **Set up Database Webhook:**
   - Go to Supabase Dashboard > Database > Webhooks
   - Click "Create a new webhook"
   - Name: `contact-form-email`
   - Table: `contact_submissions`
   - Events: Check "INSERT"
   - HTTP Request:
     - URL: `https://rparoorbiarrojekvrrf.supabase.co/functions/v1/send-contact-email`
     - Method: `POST`
     - HTTP Headers: 
       - `Authorization: Bearer [YOUR_SERVICE_ROLE_KEY]`
       - `Content-Type: application/json`
   - Click "Save"

### Option 2: Database Trigger (Alternative)

1. **Run the migration:**
   ```bash
   supabase db push
   ```
   Or manually run the SQL in `supabase/migrations/001_contact_email_trigger.sql`

2. **Configure settings:**
   ```sql
   ALTER DATABASE postgres SET app.settings.edge_function_url = 'https://rparoorbiarrojekvrrf.supabase.co/functions/v1';
   ALTER DATABASE postgres SET app.settings.service_role_key = 'YOUR_SERVICE_ROLE_KEY';
   ```

### Option 3: Use Resend API Directly (Simplest for Testing)

If you want to test immediately without Edge Functions, you can modify the Edge Function to use Resend API:

1. Sign up at https://resend.com
2. Get your API key
3. The Edge Function already supports Resend - just add `RESEND_API_KEY` as a secret

## Email Recipients

The system is configured to send emails to:
- `sofoniyastekalegn@gmail.com`
- `joelgerbi1@gmail.com`

Both emails will receive notifications for every contact form submission.

## Testing

1. Fill out the contact form on your website
2. Check Supabase Dashboard > Database > contact_submissions to verify the record was saved
3. Check both email inboxes for the notification
4. Check Edge Function logs in Supabase Dashboard if emails don't arrive

## Troubleshooting

- **Emails not sending:** Check Edge Function logs in Supabase Dashboard
- **Webhook not triggering:** Verify webhook is enabled and URL is correct
- **SMTP errors:** Ensure SMTP credentials are correct and allow "less secure apps" if using Gmail
- **Resend API errors:** Verify API key is correct and account is active

## Security Notes

- Never commit API keys or secrets to git
- Use Supabase secrets for environment variables
- Service Role Key should only be used server-side (in Edge Functions)

