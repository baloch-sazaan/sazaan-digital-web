// API-side auth service — server-to-server Supabase Auth admin calls.
//
// To activate: uncomment the supabase block and replace stubs with real calls.

// import { createClient } from '@supabase/supabase-js';
//
// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// );

export const authService = {
  async verifyToken(_jwt: string): Promise<{ id: string; email: string } | null> {
    // const { data: { user }, error } = await supabase.auth.getUser(_jwt);
    // if (error || !user) return null;
    // return { id: user.id, email: user.email! };
    console.warn('[api/authService] verifyToken — not yet wired to Supabase');
    return null;
  },
};
