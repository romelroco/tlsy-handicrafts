-- TLSY Handicrafts Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Crafter Profile Table
CREATE TABLE crafter_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crafter_name TEXT NOT NULL,
  crafter_name_tl TEXT NOT NULL,
  bio TEXT NOT NULL,
  bio_tl TEXT NOT NULL,
  profile_image_url TEXT,
  short_bio TEXT NOT NULL,
  short_bio_tl TEXT NOT NULL,
  background_story TEXT NOT NULL,
  background_story_tl TEXT NOT NULL,
  crafting_process TEXT NOT NULL,
  crafting_process_tl TEXT NOT NULL,
  years_experience INTEGER DEFAULT 0,
  certifications TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_name TEXT NOT NULL,
  product_name_tl TEXT NOT NULL,
  description TEXT NOT NULL,
  description_tl TEXT NOT NULL,
  short_description TEXT NOT NULL,
  short_description_tl TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'PHP',
  price_notes TEXT,
  price_notes_tl TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  turnaround_time TEXT NOT NULL,
  turnaround_time_tl TEXT NOT NULL,
  customization_available BOOLEAN DEFAULT false,
  availability BOOLEAN DEFAULT true,
  stock_quantity INTEGER,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Social Links Table
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  icon_name TEXT NOT NULL
);

-- 4. Contact Submissions Table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  subject_tl TEXT,
  message TEXT NOT NULL,
  message_tl TEXT,
  phone TEXT,
  language_preference TEXT DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  is_read BOOLEAN DEFAULT false
);

-- 5. Analytics Events Table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name TEXT NOT NULL,
  page TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  session_id TEXT NOT NULL,
  user_language TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  additional_data JSONB
);

-- 6. Page Views Table
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL,
  session_id TEXT NOT NULL,
  user_language TEXT NOT NULL,
  referrer TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  duration_seconds INTEGER
);

-- 7. Shopee Products Table (Placeholder)
CREATE TABLE shopee_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shopee_product_id TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  shopee_url TEXT NOT NULL,
  shopee_price NUMERIC(10, 2),
  shopee_stock INTEGER,
  last_synced TIMESTAMP,
  sync_enabled BOOLEAN DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_availability ON products(availability);
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX idx_page_views_session ON page_views(session_id);
CREATE INDEX idx_contact_submissions_read ON contact_submissions(is_read);

-- Insert sample crafter profile
INSERT INTO crafter_profile (
  crafter_name,
  crafter_name_tl,
  bio,
  bio_tl,
  short_bio,
  short_bio_tl,
  background_story,
  background_story_tl,
  crafting_process,
  crafting_process_tl,
  years_experience,
  profile_image_url
) VALUES (
  'TLSY Handicrafts',
  'TLSY Handicrafts',
  'Welcome to TLSY Handicrafts - The Little Shop Year 2020. We specialize in printing services, custom souvenirs, beautiful invitations, and digital products. Every piece is crafted with care and attention to detail.',
  'Maligayang pagdating sa TLSY Handicrafts - Ang Maliit na Tindahan Taon 2020. Kami ay nag-specialize sa serbisyo ng printing, custom souvenirs, magagandang imbitasyon, at mga produktong dijital. Bawat piraso ay ginawa nang may pag-aalaga at atensyon sa detalye.',
  'Printing services, souvenirs, invitations, and digital products crafted with care since 2020.',
  'Serbisyo ng printing, souvenirs, imbitasyon, at mga produktong dijital na ginawa nang may pag-aalaga mula 2020.',
  'TLSY Handicrafts was born in 2020 from a passion for creating meaningful, personalized items. What started as a small home-based operation has grown into a trusted source for printing services and custom crafts.',
  'Ang TLSY Handicrafts ay isinilang noong 2020 mula sa hilig sa paggawa ng makabuluhan at personalized na mga bagay. Ang nagsimula bilang maliit na home-based na operasyon ay lumaki na bilang pinagkakatiwalaang mapagkukunan ng serbisyo ng printing at custom crafts.',
  'We believe in quality over quantity. Each product is carefully designed and produced to meet your specific needs. From concept to completion, we work closely with our clients to ensure satisfaction.',
  'Naniniwala kami sa kalidad kaysa dami. Bawat produkto ay maingat na dinisenyo at ginawa upang matugunan ang iyong mga pangangailangan. Mula sa konsepto hanggang sa pagkumpleto, nakikipagtulungan kami nang malapit sa aming mga kliyente upang masiguro ang kasiyahan.',
  4,
  '/images/profile.jpg'
);

-- Insert sample social links
INSERT INTO social_links (platform, url, icon_name, is_active) VALUES
  ('Facebook', 'https://facebook.com/tlsyhandicrafts', 'facebook', true),
  ('Instagram', 'https://instagram.com/tlsyhandicrafts', 'instagram', true),
  ('Shopee', 'https://shopee.ph/tlsyhandicrafts', 'shopee', true);

-- Enable Row Level Security (RLS)
ALTER TABLE crafter_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopee_products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read crafter_profile" ON crafter_profile FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read social_links" ON social_links FOR SELECT USING (true);

-- Allow public insert for contact submissions and analytics
CREATE POLICY "Public insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert analytics_events" ON analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert page_views" ON page_views FOR INSERT WITH CHECK (true);
