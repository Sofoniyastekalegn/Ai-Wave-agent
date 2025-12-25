import nodemailer from 'nodemailer'

export class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendContactNotification(formData, recipientEmails = null) {
    try {
      // Default recipients: sofoniyastekalegn@gmail.com and joelgerbi1@gmail.com
      const defaultRecipients = ['sofoniyastekalegn@gmail.com', 'joelgerbi1@gmail.com'];
      const recipients = recipientEmails || process.env.CONTACT_RECIPIENT_EMAIL 
        ? (Array.isArray(recipientEmails) ? recipientEmails : [recipientEmails || process.env.CONTACT_RECIPIENT_EMAIL])
        : defaultRecipients;

      // If single email string provided, convert to array
      const emailList = Array.isArray(recipients) ? recipients : [recipients];
      
      // Ensure both required emails are included
      const requiredEmails = ['sofoniyastekalegn@gmail.com', 'joelgerbi1@gmail.com'];
      const finalRecipients = [...new Set([...emailList, ...requiredEmails])];

      const mailOptions = {
        from: `"Contact Form" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: finalRecipients.join(', '),
        subject: `New Contact Form Submission from ${formData.name}`,
        html: this.generateEmailTemplate(formData),
        replyTo: formData.email,
      }

      const info = await this.transporter.sendMail(mailOptions)
      return { success: true, messageId: info.messageId, recipients: finalRecipients }
    } catch (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send email notification')
    }
  }

  generateEmailTemplate(formData) {
    return `
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
  }

  async sendAutoReply(formData) {
    try {
      const mailOptions = {
        from: `"AI WaveAgency" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: formData.email,
        subject: 'Thank you for contacting AI WaveAgency!',
        html: this.generateAutoReplyTemplate(formData),
      }

      const info = await this.transporter.sendMail(mailOptions)
      return { success: true, messageId: info.messageId }
    } catch (error) {
      console.error('Error sending auto-reply:', error)
      throw new Error('Failed to send auto-reply email')
    }
  }

  generateAutoReplyTemplate(formData) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
            .highlight { color: #667eea; font-weight: bold; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting AI WaveAgency!</h1>
            </div>
            <div class="content">
              <p>Dear <span class="highlight">${formData.name}</span>,</p>
              
              <p>Thank you for reaching out to us! We've received your message and appreciate you taking the time to contact AI WaveAgency.</p>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your message</li>
                <li>We'll get back to you within <span class="highlight">24 hours</span></li>
                <li>We'll discuss how we can help transform your business with AI automation</li>
              </ul>
              
              <p><strong>In the meantime:</strong></p>
              <ul>
                <li>Check out our services at <a href="https://aiwaveagency.com">aiwaveagency.com</a></li>
                <li>Follow us for AI automation tips and insights</li>
              </ul>
              
              <p>If you have any urgent questions, feel free to call us at <span class="highlight">+251 978 695 556</span>.</p>
              
              <p>Best regards,<br>
              <strong>The AI WaveAgency Team</strong></p>
              
              <div class="footer">
                <p>AI WaveAgency<br>
                Email: joel@aiwaveagency.com<br>
                Phone: +251 978 695 556</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  }
}

export const emailService = new EmailService()