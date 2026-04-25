import { supabase } from '../lib/supabase';
import { Project } from '../types';

export interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}


const PENDING_KEY = 'sazaan_pending_submissions';

function loadPending(): ContactSubmission[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const data = localStorage.getItem(PENDING_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function savePending(items: ContactSubmission[]) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(items));
  } catch (e) {
  }
}

export const dbService = {
  async saveContactSubmission(data: ContactSubmission): Promise<void> {
    if (!supabase) {
      const pending = loadPending();
      pending.push(data);
      savePending(pending);
      return;
    }
    const client = supabase;
    const { error } = await client.from('contact_submissions').insert({
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

    const client = supabase;
    const remaining: ContactSubmission[] = [];
    for (const item of pending) {
      const { error } = await client.from('contact_submissions').insert({
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
    
    const client = supabase;
    const { data, error } = await client
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
    const client = supabase;
    const track = async () => {
      try {
        const { error } = await client
          .from('page_events')
          .insert({ page, timestamp: new Date().toISOString() });
        if (error) { /* Silent for production */ }
      } catch (err) {
        /* Silent for production */
      }
    };

    const win = window as any;
    if (win.requestIdleCallback) {
      win.requestIdleCallback(() => track());
    } else {
      setTimeout(track, 1500);
    }
  },
};
