import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://supabase.com/dashboard/project/qnsidqguelxuwkpbclgp';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuc2lkcWd1ZWx4dXdrcGJjbGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MTA4OTIsImV4cCI6MjA4NTk4Njg5Mn0.Iw8_d2PmASPOtWcWhWOYUf8KFya5JbJVrn7knrLsWGg';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;