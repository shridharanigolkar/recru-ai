import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabseAnonkey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(
   supabaseUrl,
   supabseAnonkey
)