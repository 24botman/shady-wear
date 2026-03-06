-- ==========================================
-- SHADY WEAR — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ==========================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  image_url TEXT,
  sizes TEXT[] DEFAULT '{"S","M","L","XL"}',
  in_stock BOOLEAN DEFAULT true,
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Orders: users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reviews: anyone can read, authenticated users can create
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Contact: anyone can submit (insert), only admins can read
CREATE POLICY "Anyone can submit contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- ==========================================
-- Seed Data (Sample Products)
-- ==========================================

INSERT INTO products (name, description, price, category, image_url, sizes, in_stock, is_new) VALUES
  ('Slim Shady Classic Hoodie', 'Premium heavyweight cotton hoodie featuring the iconic Slim Shady logo.', 89.99, 'Hoodies', '/images/1438079.jpg', '{"S","M","L","XL"}', true, true),
  ('Detroit 313 Bomber Jacket', 'Military-inspired bomber jacket with Detroit 313 embroidery.', 149.99, 'Jackets', '/images/1448061.jpg', '{"M","L","XL","XXL"}', true, false),
  ('Eminem Limited Tour Tee', 'Limited edition tour t-shirt from the Revival World Tour.', 39.99, 'T-Shirts', '/images/hmgoepprod.jpeg', '{"S","M","L"}', false, false),
  ('MTBMB Red Cap', 'Snapback cap with Music To Be Murdered By embroidered logo.', 29.99, 'Accessories', '/images/OIP.jpeg', '{"OS"}', true, true),
  ('Recovery Logo Tee', 'Classic fit tee with the Recovery album cover art.', 34.99, 'T-Shirts', '/images/OIP (7).jpeg', '{"S","M","L","XL"}', true, false),
  ('Rap God Beanie', 'Knit beanie with Rap God lightning bolt embroidery.', 24.99, 'Accessories', '/images/pop.jfif', '{"OS"}', true, false),
  ('Kamikaze Anorak', 'Windbreaker anorak jacket with Kamikaze branding.', 119.99, 'Jackets', '/images/t3.jfif', '{"M","L","XL"}', true, true),
  ('8 Mile Classic Hoodie (Grey)', 'Soft fleece hoodie inspired by the 8 Mile aesthetic.', 84.99, 'Hoodies', '/images/th (11).jpeg', '{"S","M","L","XL"}', true, false);

-- Seed some reviews
INSERT INTO reviews (user_name, rating, comment) VALUES
  ('Stan M.', 5, 'The hoodie quality is insane. Heavyweight cotton just like the vintage merch. Still a fan.'),
  ('Marshall Fan 99', 4, 'Dope designs. Fast shipping. Only gave 4 stars because my size was sold out in the bomber jacket.'),
  ('Detroit Native', 5, 'Representing the 313. This gear is authentic. You can feel the quality.');
