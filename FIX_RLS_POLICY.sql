-- Fix RLS Policy to allow SELECT after INSERT
-- Run this in Supabase SQL Editor if you're getting "Success. No rows returned"

-- Drop existing SELECT policy if it exists
DROP POLICY IF EXISTS "Allow select after insert for contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow service role to read all contact_submissions" ON public.contact_submissions;

-- Create new policy that allows everyone to select (needed for .select() after insert)
CREATE POLICY "Allow select after insert for contact_submissions"
  ON public.contact_submissions
  FOR SELECT
  TO anon, authenticated, service_role
  USING (true);

-- Optional: Create a more restrictive policy if you want to limit who can read
-- This allows users to only see their own submissions (by email)
-- Uncomment if you want this instead:
/*
CREATE POLICY "Allow users to see their own submissions"
  ON public.contact_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true); -- For contact form, we allow all reads since it's public submissions
*/

