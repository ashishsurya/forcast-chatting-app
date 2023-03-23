import { createClient } from '@supabase/supabase-js';

export default createClient(
  import.meta.env.VITE_SUPABASE_APP_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
