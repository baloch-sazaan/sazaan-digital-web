import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let _supabase: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (_supabase) return _supabase;
  if (url && key) {
    _supabase = createClient(url, key);
  }
  return _supabase;
};

// For backward compatibility while encouraging lazy usage
export const supabase = getSupabase();
