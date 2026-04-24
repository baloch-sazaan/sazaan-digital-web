export interface Project {
  id: string;
  tag: string;
  cat: string;
  title: string;
  description: string;
  fullSummary?: string;
  features?: string[];
  metric: string;
  status: string;
  accent: string;
  published: boolean;
  screenshot_url?: string;
  live_url?: string;
  sort_order?: number;
}
