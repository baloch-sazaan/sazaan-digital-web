import { supabase } from '../lib/supabase';

export interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export interface Project {
  id: string;
  tag: 'web' | 'seo' | 'brand';
  cat: string;
  title: string;
  description: string;
  metric: string;
  status: 'Live' | 'In Progress';
  accent: string;
  screenshot_url?: string;
  live_url?: string;
  published: boolean;
  sort_order?: number;
}

const PENDING_KEY = 'sazaan_pending_submissions';

function loadPending(): ContactSubmission[] {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) || '[]');
  } catch {
    return [];
  }
}

function savePending(items: ContactSubmission[]) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(items));
  } catch {}
}

export const dbService = {
  async saveContactSubmission(data: ContactSubmission): Promise<void> {
    const { error } = await supabase.from('contact_submissions').insert(data);
    if (error) {
      // Persist locally so we can retry next visit
      const pending = loadPending();
      pending.push(data);
      savePending(pending);
      throw error;
    }
  },

  // Call once on app mount — flushes any locally-queued submissions
  async syncPendingSubmissions(): Promise<void> {
    const pending = loadPending();
    if (pending.length === 0) return;

    const remaining: ContactSubmission[] = [];
    for (const item of pending) {
      const { error } = await supabase.from('contact_submissions').insert(item);
      if (error) remaining.push(item);
    }
    savePending(remaining);
  },

  async fetchProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data ?? []) as Project[];
  },

  async trackPageView(page: string): Promise<void> {
    // Fire-and-forget — analytics should never block the UI
    supabase
      .from('page_events')
      .insert({ page, timestamp: new Date().toISOString() })
      .then(({ error }) => {
        if (error) console.warn('[Analytics] Failed to track page view:', error.message);
      });
  },
};
