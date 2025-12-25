# Send Contact Email Edge Function

This Supabase Edge Function sends email notifications when a contact form is submitted.

## Setup

1. **Deploy the function:**
   ```bash
   supabase functions deploy send-contact-email
   ```

2. **Set environment variables (secrets):**
   ```bash
   # Option 1: Using Resend (Recommended)
   supabase secrets set RESEND_API_KEY=your_resend_api_key
   
   # Option 2: Using SMTP
   supabase secrets set SMTP_HOST=smtp.gmail.com
   supabase secrets set SMTP_PORT=587
   supabase secrets set SMTP_USER=your_email@gmail.com
   supabase secrets set SMTP_PASS=your_app_password
   supabase secrets set SMTP_FROM_EMAIL=your_email@gmail.com
   ```

3. **Configure webhook in Supabase Dashboard:**
   - Go to Database > Webhooks
   - Create webhook on `contact_submissions` table
   - Trigger on INSERT
   - URL: `https://[your-project].supabase.co/functions/v1/send-contact-email`
   - Method: POST
   - Add header: `Authorization: Bearer [SERVICE_ROLE_KEY]`

## Email Recipients

Emails are sent to:
- sofoniyastekalegn@gmail.com
- joelgerbi1@gmail.com

Both recipients receive every contact form submission.

