-- Migration to set up database trigger for sending emails on contact form submission
-- This trigger calls the Supabase Edge Function when a new contact submission is inserted

-- Create a function to call the Edge Function
CREATE OR REPLACE FUNCTION public.send_contact_email()
RETURNS TRIGGER AS $$
DECLARE
  payload jsonb;
BEGIN
  -- Build the payload with the new record
  payload := jsonb_build_object(
    'record', jsonb_build_object(
      'id', NEW.id,
      'name', NEW.name,
      'email', NEW.email,
      'message', NEW.message,
      'phone', NEW.phone,
      'company', NEW.company,
      'created_at', NEW.created_at
    )
  );

  -- Call the Edge Function using pg_net
  -- Note: This requires the pg_net extension to be enabled
  PERFORM
    net.http_post(
      url := current_setting('app.settings.edge_function_url', true) || '/send-contact-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := payload::text
    );

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to trigger email: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_send_contact_email ON public.contact_submissions;
CREATE TRIGGER trigger_send_contact_email
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.send_contact_email();

-- Alternative: Use Supabase Webhooks instead of database triggers
-- You can set up a webhook in Supabase Dashboard:
-- 1. Go to Database > Webhooks
-- 2. Create a new webhook on the contact_submissions table
-- 3. Set the webhook URL to: https://[your-project].supabase.co/functions/v1/send-contact-email
-- 4. Set the HTTP method to POST
-- 5. Enable "Send on INSERT"

