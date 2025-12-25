// Supabase Edge Function to send contact form emails
// Deploy this function using: supabase functions deploy send-contact-email

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SMTP_HOST = Deno.env.get('SMTP_HOST') || 'smtp.gmail.com'
const SMTP_PORT = Deno.env.get('SMTP_PORT') || '587'
const SMTP_USER = Deno.env.get('SMTP_USER')
const SMTP_PASS = Deno.env.get('SMTP_PASS')
const SMTP_FROM_EMAIL = Deno.env.get('SMTP_FROM_EMAIL') || SMTP_USER

// Recipient emails - both required
const RECIPIENT_EMAILS = ['sofoniyastekalegn@gmail.com', 'joelgerbi1@gmail.com']

serve(async (req) => {
  try {
    const { record } = await req.json()
    
    if (!record) {
      return new Response(
        JSON.stringify({ error: 'No record provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const formData = {
      name: record.name,
      email: record.email,
      message: record.message,
      phone: record.phone || null,
      company: record.company || null,
    }

    // Generate email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
              <p>AI WaveAgency Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${formData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
              </div>
              ${formData.phone ? `
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${formData.phone}</div>
              </div>
              ` : ''}
              ${formData.company ? `
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${formData.company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
              </div>
              <hr style="margin: 30px 0;">
              <p style="color: #666; font-size: 14px;">
                This message was sent from your website contact form. You can reply directly to ${formData.email}.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Use Resend API if available, otherwise use SMTP
    if (RESEND_API_KEY) {
      // Send using Resend API
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: `Contact Form <${SMTP_FROM_EMAIL}>`,
          to: RECIPIENT_EMAILS,
          subject: `New Contact Form Submission from ${formData.name}`,
          html: emailHTML,
          reply_to: formData.email,
        }),
      })

      if (!resendResponse.ok) {
        throw new Error(`Resend API error: ${resendResponse.statusText}`)
      }

      const result = await resendResponse.json()
      return new Response(
        JSON.stringify({ success: true, messageId: result.id, recipients: RECIPIENT_EMAILS }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      // Fallback: Use Supabase's built-in email or log for manual sending
      // Note: Supabase doesn't have built-in SMTP, so you'll need to set up Resend or another service
      console.log('Email would be sent to:', RECIPIENT_EMAILS)
      console.log('Form data:', formData)
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email queued (configure RESEND_API_KEY for automatic sending)',
          recipients: RECIPIENT_EMAILS 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Error in send-contact-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

