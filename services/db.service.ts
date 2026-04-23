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
    if (!supabase) {
      const pending = loadPending();
      pending.push(data);
      savePending(pending);
      return;
    }
    const { error } = await supabase.from('contact_submissions').insert({
      name: `${data.firstName} ${data.lastName}`.trim(),
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      company: data.company ?? null,
      phone: data.phone ?? null,
      message: data.message,
    });
    if (error) {
      const pending = loadPending();
      pending.push(data);
      savePending(pending);
      throw error;
    }
  },

  async syncPendingSubmissions(): Promise<void> {
    if (!supabase) return;
    const pending = loadPending();
    if (pending.length === 0) return;

    const remaining: ContactSubmission[] = [];
    for (const item of pending) {
      const { error } = await supabase.from('contact_submissions').insert({
        name: `${item.firstName} ${item.lastName}`.trim(),
        first_name: item.firstName,
        last_name: item.lastName,
        email: item.email,
        company: item.company ?? null,
        phone: item.phone ?? null,
        message: item.message,
      });
      if (error) remaining.push(item);
    }
    savePending(remaining);
  },

  _projectsCache: null as Project[] | null,
  async fetchProjects(): Promise<Project[]> {
    if (this._projectsCache) return this._projectsCache;
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    this._projectsCache = (data ?? []) as Project[];
    return this._projectsCache;
  },

  async trackPageView(page: string): Promise<void> {
    if (!supabase) return;
    supabase
      .from('page_events')
      .insert({ page, timestamp: new Date().toISOString() })
      .then(({ error }) => {
        if (error) console.warn('[Analytics] Failed to track page view:', error.message);
      });
  },
};
