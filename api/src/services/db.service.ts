// API-side DB service — uses the Supabase SERVICE ROLE key (never exposed to the browser).
//
// To activate:
//   1. npm install @supabase/supabase-js  (inside api/)
//   2. Fill SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in api/.env
//   3. Uncomment the Supabase block below.

// import { createClient } from '@supabase/supabase-js';
//
// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// );

export interface ContactSubmission {
  first_name: string;
  last_name:  string;
  email:      string;
  team_size:  string;
  location:   string;
  message:    string;
}

export const dbService = {
  async saveContactSubmission(data: ContactSubmission): Promise<void> {
    // const { error } = await supabase.from('contact_submissions').insert(data);
    // if (error) throw error;
    // TODO: wire to Supabase service role client
  },
};
