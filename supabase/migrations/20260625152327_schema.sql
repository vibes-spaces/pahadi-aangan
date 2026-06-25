CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  long_description TEXT,
  price NUMERIC NOT NULL,
  size TEXT,
  capacity INT DEFAULT 2,
  bed_type TEXT,
  amenities JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  available BOOLEAN DEFAULT true,
  traditional BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  room_type TEXT,
  room_title TEXT,
  room_id UUID REFERENCES rooms(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','checked-in','checked-out','cancelled')),
  total_amount NUMERIC NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','refunded')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  date DATE DEFAULT CURRENT_DATE,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  discount TEXT,
  valid_until DATE,
  code TEXT,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT,
  date DATE DEFAULT CURRENT_DATE,
  image TEXT,
  category TEXT,
  tags JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  capacity INT,
  pricing TEXT,
  icon TEXT,
  features JSONB DEFAULT '[]',
  category TEXT CHECK (category IN ('wedding','corporate','celebration','cultural')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  duration TEXT,
  price NUMERIC,
  images JSONB DEFAULT '[]',
  included JSONB DEFAULT '[]',
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  category TEXT,
  traditional BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  total_stays INT DEFAULT 0,
  total_spent NUMERIC DEFAULT 0,
  join_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  email TEXT,
  phone TEXT,
  join_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','inactive')),
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS spa_treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  price NUMERIC,
  image TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT,
  hero_subtitle TEXT,
  about_text TEXT,
  about_story TEXT,
  address TEXT,
  address_full TEXT,
  phones JSONB DEFAULT '[]',
  email TEXT,
  check_in TEXT DEFAULT '14:00',
  check_out TEXT DEFAULT '11:00',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dashboard_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_bookings INT DEFAULT 0,
  total_revenue NUMERIC DEFAULT 0,
  active_guests INT DEFAULT 0,
  occupancy_rate NUMERIC DEFAULT 0,
  pending_bookings INT DEFAULT 0,
  confirmed_bookings INT DEFAULT 0,
  checked_in INT DEFAULT 0,
  cancelled_bookings INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data (idempotent)
INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'kathkuni-kutiya', 'Kathkuni Kutiya', 'A traditional Himachali stone & wood cottage', 'Experience authentic Himachali architecture with our Kathkuni-style cottage, featuring locally sourced stone and deodar wood construction.', 4500, '350 sq ft', 2, 'Queen Bed', '["Traditional Architecture","Mountain View","Private Sit-out","Wood-burning Stove","Handicraft Décor","Organic Toiletries"]', true, true, true
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'kathkuni-kutiya');

INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'pahadi-mahal-suite', 'Pahadi Mahal Suite', 'Our crown jewel with panoramic valley views', 'The Pahadi Mahal Suite is our most luxurious offering with unobstructed views of the Kullu Valley.', 12000, '650 sq ft', 4, 'King Bed + Twin', '["Panoramic Valley View","Private Terrace","Jacuzzi","King-size Bed","Living Room","Mini Bar","Butler Service"]', true, true, false
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'pahadi-mahal-suite');

INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'apple-orchard-room', 'Apple Orchard Room', 'Surrounded by blooming apple trees', 'Nestled among our apple orchards, this room offers a truly unique stay amidst nature.', 3500, '300 sq ft', 2, 'Queen Bed', '["Orchard View","Private Balcony","Sitting Area","Tea/Coffee Maker"]', false, true, false
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'apple-orchard-room');

INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'dhauladhar-view-room', 'Dhauladhar View Room', 'Wake up to the snow-capped Dhauladhar range', 'Imagine waking up to the majestic Dhauladhar range right outside your window.', 5500, '400 sq ft', 3, 'King Bed', '["Dhauladhar View","Bay Window","Work Desk","Mini Fridge"]', true, true, false
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'dhauladhar-view-room');

INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'buransh-family-suite', 'Buransh Family Suite', 'Perfect for families with separate living area', 'Named after the vibrant rhododendron flowers of Himachal, this suite is designed for families.', 8000, '550 sq ft', 5, '2 Queen Beds', '["Two Bedrooms","Living Room","Kitchenette","Garden Access","Family Board Games"]', false, true, false
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'buransh-family-suite');

INSERT INTO site_settings (hero_title, hero_subtitle, about_text, about_story, address, address_full, phones, email)
SELECT 'Pahadi Aangan', 'A Heritage Retreat in the Heart of Himachal', 'Nestled in the serene Kullu Valley, Pahadi Aangan is a celebration of Himachali heritage, offering an immersive experience in traditional mountain living.', 'Pahadi Aangan was born from a deep love for Himachali culture and the desire to share its beauty with the world. Every stone, every beam tells a story of centuries-old craftsmanship.', 'Kullu Valley, Himachal Pradesh', 'Village Shuru, Pin Valley, Kullu District, Himachal Pradesh 175101', '["+91 98765 43210", "+91 98765 43211"]', 'hello@pahadiaangan.com'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

INSERT INTO dashboard_stats (total_bookings, total_revenue, active_guests, occupancy_rate, pending_bookings, confirmed_bookings, checked_in, cancelled_bookings)
SELECT 198, 2450000, 456, 72, 12, 156, 18, 12
WHERE NOT EXISTS (SELECT 1 FROM dashboard_stats);
