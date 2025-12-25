-- Create contact_submissions table if it doesn't exist
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

-- Create policy to allow anonymous inserts (for contact form)
CREATE POLICY "Allow anonymous inserts to contact_submissions"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow users to select their own inserted rows (needed for .select() after insert)
CREATE POLICY "Allow select after insert for contact_submissions"
  ON public.contact_submissions
  FOR SELECT
  TO anon, authenticated, service_role
  USING (true);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON public.contact_submissions(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
  ON public.contact_submissions(status);

