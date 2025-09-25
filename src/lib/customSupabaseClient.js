import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rparoorbiarrojekvrrf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwYXJvb3JiaWFycm9qZWt2cnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxODMzOTYsImV4cCI6MjA3Mzc1OTM5Nn0.AmpaZMeYIu_eWSDMqXD_WCwyJNO2SLfJbzCE8Nt_k00';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);