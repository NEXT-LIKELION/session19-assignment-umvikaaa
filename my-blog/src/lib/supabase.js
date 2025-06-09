import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spawifkltnjqgrbynjaj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwYXdpZmtsdG5qcWdyYnluamFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMDIxMDgsImV4cCI6MjA2NDU3ODEwOH0.oASVolZecPhGq_8bsExCV0J2Fk4B_xDY8OrZyvMweGQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
