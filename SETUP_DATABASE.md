# Database Setup for Contact Form

## Quick Setup

The contact form requires a `contact_submissions` table in your Supabase database. Follow these steps:

### Option 1: Run SQL Migration (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `rparoorbiarrojekvrrf`
3. Go to **SQL Editor**
4. Copy and paste the contents of `supabase/migrations/000_create_contact_submissions_table.sql`
5. Click **Run**

### Option 2: Manual Table Creation

Run this SQL in Supabase SQL Editor:

```sql
-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (for contact form)
CREATE POLICY "Allow anonymous inserts to contact_submissions"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow service role to read all (for admin)
CREATE POLICY "Allow service role to read all contact_submissions"
  ON public.contact_submissions
  FOR SELECT
  TO service_role
  USING (true);
```

### Verify Setup

After creating the table, test the contact form. If you see "Message sent successfully!", the table is set up correctly.

### Troubleshooting

**Error: "relation does not exist"**
- The table hasn't been created yet. Run the SQL above.

**Error: "permission denied"**
- Row Level Security policies need to be set up. Run the full SQL above.

**Error: "new row violates row-level security policy"**
- Check that the INSERT policy is created correctly.

### Next Steps

Once the table is created, you can:
1. Set up email notifications (see `CONTACT_FORM_SETUP.md`)
2. View submissions in Supabase Dashboard > Table Editor > contact_submissions

