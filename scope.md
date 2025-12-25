# Project Scope - AI WaveAgency

## 📋 Project Overview

**AI WaveAgency** is a modern web application that provides AI-powered business automation solutions. The platform offers AI receptionist services, workflow automation, client dashboards, and comprehensive business intelligence tools.

**Repository:** https://github.com/Sofoniyastekalegn/Ai-Wave-agent.git  
**Project Type:** Single Page Application (SPA)  
**Framework:** React 18 with Vite

---

## 🎯 Core Features

### 1. **Home Page**
- Hero section with call-to-action
- Services overview with feature highlights
- Calendar booking integration
- Benefits and value propositions
- Responsive design with smooth animations

### 2. **About Page**
- Company information and mission
- Team overview
- Company values and vision

### 3. **Services Page**
- Service packages and pricing tiers:
  - **Starter Plan** ($100/month)
  - **Pro Plan** ($200/month) - Most Popular
  - **Enterprise Plan** (Custom pricing)
- Feature comparisons
- Service descriptions

### 4. **Contact Page** ⭐ (Recently Enhanced)
- **Contact Form** with Supabase integration
  - Name, Email, and Message fields
  - Form validation and error handling
  - Success/error toast notifications
  - Database persistence via Supabase
- **Contact Information Display**
  - Email addresses: sofoniyastekalegn@gmail.com, joel@aiwaveagency.com
  - Phone numbers: +251978695556, +12403939520
  - Response time information
- **Email Notification System**
  - Automatic email notifications to:
    - sofoniyastekalegn@gmail.com
    - joelgerbi1@gmail.com
  - Formatted HTML email templates
  - Auto-reply functionality (configurable)
- **FAQ Section**
  - Common questions about services
  - Implementation timelines
  - Support information

### 5. **Dashboard Page**
- Client dashboard interface
- Project management tools
- Analytics and reporting

### 6. **Authentication**
- Login page
- Supabase authentication integration
- User session management

### 7. **Calendar Booking Component**
- Google Calendar deep linking
- Two-step booking flow (date/time confirmation)
- Pre-filled event details
- Responsive modal with glass morphism effects

---

## 🛠️ Technical Stack

### Frontend
- **React 18.2.0** - UI library
- **Vite 4.4.5** - Build tool and dev server
- **React Router DOM 6.16.0** - Client-side routing
- **Framer Motion 10.16.4** - Animation library
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives
  - Alert Dialog
  - Avatar
  - Checkbox
  - Dialog
  - Dropdown Menu
  - Label
  - Slider
  - Tabs
  - Toast

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Row Level Security (RLS)
  - Edge Functions
  - Authentication
- **Supabase JS Client 2.89.0** - Database client

### Email Services
- **Resend API** (Recommended) - Email delivery service
- **SMTP** (Alternative) - For custom email servers
- **Nodemailer** - Email sending library (server-side)

### Development Tools
- **TypeScript** (via @types packages)
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📧 Contact Form Implementation

### Database Schema
**Table:** `contact_submissions`
```sql
- id (BIGSERIAL PRIMARY KEY)
- name (TEXT NOT NULL)
- email (TEXT NOT NULL)
- message (TEXT NOT NULL)
- phone (TEXT, optional)
- company (TEXT, optional)
- status (TEXT DEFAULT 'new')
- created_at (TIMESTAMPTZ DEFAULT NOW())
- updated_at (TIMESTAMPTZ DEFAULT NOW())
```

### Features
- ✅ Form validation (client-side)
- ✅ Supabase database integration
- ✅ Error handling with fallback mechanisms
- ✅ Row Level Security (RLS) policies
- ✅ Email notifications to dual recipients
- ✅ Success/error user feedback
- ✅ Responsive design

### Email Notification Flow
1. User submits contact form
2. Data saved to Supabase `contact_submissions` table
3. Database trigger/webhook fires
4. Supabase Edge Function (`send-contact-email`) executes
5. Email sent to both recipients via Resend API or SMTP
6. User receives success confirmation

---

## 🗄️ Database Setup

### Required Tables
1. **contact_submissions** - Contact form submissions
2. **contact_form_errors** (optional) - Error logging

### Security
- Row Level Security (RLS) enabled
- Anonymous insert policy for contact form
- Service role read access for admin

### Migrations
- `000_create_contact_submissions_table.sql` - Table creation
- `001_contact_email_trigger.sql` - Email trigger setup

---

## 🚀 Supabase Edge Functions

### Functions
1. **send-contact-email**
   - Location: `supabase/functions/send-contact-email/`
   - Purpose: Send email notifications on form submission
   - Supports: Resend API and SMTP
   - Recipients: sofoniyastekalegn@gmail.com, joelgerbi1@gmail.com

---

## 📁 Project Structure

```
ai-wave-agency/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Contact.jsx ⭐
│   │   ├── Dashboard.jsx
│   │   └── Login.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CalendarBooking.jsx
│   │   ├── contactForm.jsx
│   │   └── ui/ (Radix UI components)
│   ├── lib/
│   │   ├── customSupabaseClient.js
│   │   └── utils.js
│   ├── services/
│   │   └── contact-service.js
│   └── App.jsx
├── server/
│   └── src/
│       └── lib/
│           └── email-service.js
├── supabase/
│   ├── functions/
│   │   └── send-contact-email/
│   │       ├── index.ts
│   │       └── README.md
│   └── migrations/
│       ├── 000_create_contact_submissions_table.sql
│       └── 001_contact_email_trigger.sql
├── CONTACT_FORM_SETUP.md
├── SETUP_DATABASE.md
├── FIX_RLS_POLICY.sql
└── scope.md
```

---

## 🔧 Setup Requirements

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Supabase account
- Resend API account (for email) OR SMTP credentials

### Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rparoorbiarrojekvrrf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Email (Supabase Edge Function Secrets)
RESEND_API_KEY=your_resend_api_key
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM_EMAIL=your_email@gmail.com
```

### Installation Steps
1. Clone repository
2. Install dependencies: `npm install`
3. Set up Supabase database (run migrations)
4. Configure email service (Resend or SMTP)
5. Deploy Edge Function: `supabase functions deploy send-contact-email`
6. Set up database webhook
7. Run development server: `npm run dev`

---

## 📝 Recent Updates (Form Branch)

### Contact Form Enhancements
- ✅ Integrated Supabase for form submissions
- ✅ Added dual email recipient support
- ✅ Created Supabase Edge Function for email sending
- ✅ Implemented database migrations
- ✅ Added comprehensive error handling
- ✅ Created setup documentation

### Commits
1. `feat: integrate Supabase for contact form submissions`
2. `feat: update email service to send to dual recipients`
3. `feat: add Supabase Edge Function and database migrations`
4. `docs: add setup documentation and RLS policy fix`

---

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Framer Motion transitions
- **Glass Morphism** - Modern visual effects
- **Toast Notifications** - User feedback system
- **Loading States** - Better user experience
- **Error Handling** - Graceful error messages
- **Accessibility** - Radix UI components

---

## 🔐 Security Features

- Row Level Security (RLS) on database tables
- Secure API key management via Supabase secrets
- Input validation on contact form
- CORS configuration
- Environment variable protection

---

## 📊 Future Enhancements (Out of Scope)

### Potential Features
- [ ] Admin dashboard for viewing submissions
- [ ] Email template customization
- [ ] Form submission analytics
- [ ] Multi-language support
- [ ] File upload capability
- [ ] SMS notifications
- [ ] Integration with CRM systems
- [ ] Automated follow-up emails
- [ ] Submission status tracking
- [ ] Export functionality

---

## 🐛 Known Issues & Limitations

### Current Limitations
- Email sending requires Edge Function deployment
- Database webhook setup required for automatic emails
- RLS policy must be configured correctly
- SMTP requires app password for Gmail

### Troubleshooting
- See `SETUP_DATABASE.md` for database issues
- See `CONTACT_FORM_SETUP.md` for email configuration
- See `FIX_RLS_POLICY.sql` for RLS policy fixes

---

## 📞 Support & Contact

**Primary Contacts:**
- **Sofoniya Stekalegn:** sofoniyastekalegn@gmail.com
- **Joel Gerbi:** joelgerbi1@gmail.com, joel@aiwaveagency.com

**Phone:**
- +251 978 695 556
- +1 240 393 9520

---

## 📄 Documentation Files

- `CONTACT_FORM_SETUP.md` - Complete email setup guide
- `SETUP_DATABASE.md` - Database configuration instructions
- `FIX_RLS_POLICY.sql` - RLS policy fix script
- `supabase/functions/send-contact-email/README.md` - Edge Function documentation

---

## 🏷️ Version Information

- **Project Version:** 0.0.0
- **React Version:** 18.2.0
- **Supabase JS:** 2.89.0
- **Last Updated:** 2024 (Form Branch)

---

## 📜 License

Private project - All rights reserved

---

**Note:** This scope document reflects the current state of the project as of the Form branch implementation. For the most up-to-date information, refer to the GitHub repository and commit history.

