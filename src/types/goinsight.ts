/**
 * TypeScript interfaces for GoInsight API
 */

export interface FeedbackItem {
  id: string;
  created_at: string;
  customer_tier: 'enterprise' | 'professional' | 'starter' | 'free';
  priority: number; // 1-5
  product_area: 'billing' | 'api' | 'ui' | 'performance' | 'security' | 'documentation' | 'other';
  region: 'NA' | 'EU' | 'APAC' | 'LATAM' | 'other';
  sentiment: 'positive' | 'negative' | 'neutral';
  source: 'zendesk' | 'slack' | 'email' | 'survey' | 'other';
  summary: string;
  topic: string;
}

export interface Action {
  title: string;
  description: string;
  magnitude?: number;
}

export interface AskResponse {
  question: string;
  data_preview: FeedbackItem[];
  summary: string;
  recommendations: string[];
  actions: Action[];
}

export interface AskRequest {
  question: string;
}

/**
 * JIRA Ticket Creation Types
 */
export interface JiraTicketMeta {
  project_key: string;
}

export interface CreateJiraTicketsRequest {
  question: string;
  data_preview: FeedbackItem[];
  summary: string;
  recommendations: string[];
  actions: Action[];
  meta: JiraTicketMeta;
}

export interface JiraTicket {
  action_title: string;
  ticket_key: string;
  ticket_url: string;
}

export interface CreateJiraTicketsResponse {
  ticket_specs: JiraTicket[];
  created_tickets: JiraTicket[];
}

/**
 * API Error type
 */
export interface ApiError {
  message: string;
  status?: number;
}
