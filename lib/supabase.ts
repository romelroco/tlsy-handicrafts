import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  crafter_profile: CrafterProfile;
  products: Product;
  social_links: SocialLink;
  contact_submissions: ContactSubmission;
  analytics_events: AnalyticsEvent;
  page_views: PageView;
  shopee_products: ShopeeProduct;
};

export interface CrafterProfile {
  id: string;
  crafter_name: string;
  crafter_name_tl: string;
  bio: string;
  bio_tl: string;
  profile_image_url: string;
  short_bio: string;
  short_bio_tl: string;
  background_story: string;
  background_story_tl: string;
  crafting_process: string;
  crafting_process_tl: string;
  years_experience: number;
  certifications: string;
  updated_at: string;
}

export interface Product {
  id: string;
  product_name: string;
  product_name_tl: string;
  description: string;
  description_tl: string;
  short_description: string;
  short_description_tl: string;
  category: string;
  price: number;
  currency: string;
  price_notes?: string;
  price_notes_tl?: string;
  images: string[];
  specifications: Record<string, any>;
  turnaround_time: string;
  turnaround_time_tl: string;
  customization_available: boolean;
  availability: boolean;
  stock_quantity?: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  is_active: boolean;
  icon_name: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  subject_tl?: string;
  message: string;
  message_tl?: string;
  phone?: string;
  language_preference: string;
  created_at: string;
  is_read: boolean;
}

export interface AnalyticsEvent {
  id: string;
  event_name: string;
  page: string;
  product_id?: string;
  session_id: string;
  user_language: string;
  timestamp: string;
  additional_data?: Record<string, any>;
}

export interface PageView {
  id: string;
  page_path: string;
  session_id: string;
  user_language: string;
  referrer?: string;
  timestamp: string;
  duration_seconds?: number;
}

export interface ShopeeProduct {
  id: string;
  shopee_product_id: string;
  product_id?: string;
  shopee_url: string;
  shopee_price?: number;
  shopee_stock?: number;
  last_synced?: string;
  sync_enabled: boolean;
}
