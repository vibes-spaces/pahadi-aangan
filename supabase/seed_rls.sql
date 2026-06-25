-- Seed rooms
INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'kathkuni-kutiya', 'Kathkuni Kutiya', 'A traditional Himachali stone & wood cottage', 'Experience authentic Himachali architecture with our Kathkuni-style cottage.', 4500, '350 sq ft', 2, 'Queen Bed', '["Traditional Architecture","Mountain View","Private Sit-out","Wood-burning Stove","Handicraft Décor","Organic Toiletries"]', true, true, true
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'kathkuni-kutiya');

INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'pahadi-mahal-suite', 'Pahadi Mahal Suite', 'Our crown jewel with panoramic valley views', 'The Pahadi Mahal Suite is our most luxurious offering.', 12000, '650 sq ft', 4, 'King Bed + Twin', '["Panoramic Valley View","Private Terrace","Jacuzzi","King-size Bed","Living Room","Mini Bar","Butler Service"]', true, true, false
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'pahadi-mahal-suite');

INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'apple-orchard-room', 'Apple Orchard Room', 'Surrounded by blooming apple trees', 'Nestled among our apple orchards.', 3500, '300 sq ft', 2, 'Queen Bed', '["Orchard View","Private Balcony","Sitting Area","Tea/Coffee Maker"]', false, true, false
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'apple-orchard-room');

INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'dhauladhar-view-room', 'Dhauladhar View Room', 'Wake up to the snow-capped Dhauladhar range', 'Imagine waking up to the majestic Dhauladhar range.', 5500, '400 sq ft', 3, 'King Bed', '["Dhauladhar View","Bay Window","Work Desk","Mini Fridge"]', true, true, false
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'dhauladhar-view-room');

INSERT INTO rooms (slug, title, subtitle, description, price, size, capacity, bed_type, amenities, featured, available, traditional)
SELECT 'buransh-family-suite', 'Buransh Family Suite', 'Perfect for families with separate living area', 'Named after the vibrant rhododendron flowers.', 8000, '550 sq ft', 5, '2 Queen Beds', '["Two Bedrooms","Living Room","Kitchenette","Garden Access","Family Board Games"]', false, true, false
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE slug = 'buransh-family-suite');

-- Seed site settings
INSERT INTO site_settings (hero_title, hero_subtitle, about_text, about_story, address, address_full, phones, email)
SELECT 'Pahadi Aangan', 'A Heritage Retreat in the Heart of Himachal', 'Nestled in the serene Kullu Valley.', 'Pahadi Aangan was born from a deep love for Himachali culture.', 'Kullu Valley, Himachal Pradesh', 'Village Shuru, Pin Valley, Kullu District, Himachal Pradesh 175101', '["+91 98765 43210", "+91 98765 43211"]', 'hello@pahadiaangan.com'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Seed dashboard stats
INSERT INTO dashboard_stats (total_bookings, total_revenue, active_guests, occupancy_rate, pending_bookings, confirmed_bookings, checked_in, cancelled_bookings)
SELECT 198, 2450000, 456, 72, 12, 156, 18, 12
WHERE NOT EXISTS (SELECT 1 FROM dashboard_stats);

-- RLS policies for public read
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE spa_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read rooms" ON rooms;
DROP POLICY IF EXISTS "Public read bookings" ON bookings;
DROP POLICY IF EXISTS "Public read reviews" ON reviews;
DROP POLICY IF EXISTS "Public read offers" ON offers;
DROP POLICY IF EXISTS "Public read gallery" ON gallery;
DROP POLICY IF EXISTS "Public read blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public read events" ON events;
DROP POLICY IF EXISTS "Public read experiences" ON experiences;
DROP POLICY IF EXISTS "Public read menu_items" ON menu_items;
DROP POLICY IF EXISTS "Public read guests" ON guests;
DROP POLICY IF EXISTS "Public read staff" ON staff;
DROP POLICY IF EXISTS "Public read spa_treatments" ON spa_treatments;
DROP POLICY IF EXISTS "Public read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Public read dashboard_stats" ON dashboard_stats;
DROP POLICY IF EXISTS "Public insert bookings" ON bookings;
DROP POLICY IF EXISTS "Public update bookings" ON bookings;
DROP POLICY IF EXISTS "Public insert reviews" ON reviews;
DROP POLICY IF EXISTS "Public insert offers" ON offers;
DROP POLICY IF EXISTS "Public insert gallery" ON gallery;
DROP POLICY IF EXISTS "Public insert blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public insert events" ON events;
DROP POLICY IF EXISTS "Public insert experiences" ON experiences;
DROP POLICY IF EXISTS "Public insert menu_items" ON menu_items;
DROP POLICY IF EXISTS "Public insert guests" ON guests;
DROP POLICY IF EXISTS "Public insert staff" ON staff;
DROP POLICY IF EXISTS "Public insert spa_treatments" ON spa_treatments;
DROP POLICY IF EXISTS "Public update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Public delete bookings" ON bookings;
DROP POLICY IF EXISTS "Public delete reviews" ON reviews;
DROP POLICY IF EXISTS "Public delete offers" ON offers;
DROP POLICY IF EXISTS "Public delete gallery" ON gallery;
DROP POLICY IF EXISTS "Public delete blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public delete events" ON events;
DROP POLICY IF EXISTS "Public delete experiences" ON experiences;
DROP POLICY IF EXISTS "Public delete menu_items" ON menu_items;
DROP POLICY IF EXISTS "Public delete guests" ON guests;
DROP POLICY IF EXISTS "Public delete staff" ON staff;
DROP POLICY IF EXISTS "Public delete spa_treatments" ON spa_treatments;

-- Public read policies
CREATE POLICY "Public read rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read offers" ON offers FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read guests" ON guests FOR SELECT USING (true);
CREATE POLICY "Public read staff" ON staff FOR SELECT USING (true);
CREATE POLICY "Public read spa_treatments" ON spa_treatments FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read dashboard_stats" ON dashboard_stats FOR SELECT USING (true);

-- Public insert/update/delete policies
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update bookings" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Public delete bookings" ON bookings FOR DELETE USING (true);
CREATE POLICY "Public insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete reviews" ON reviews FOR DELETE USING (true);
CREATE POLICY "Public insert offers" ON offers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete offers" ON offers FOR DELETE USING (true);
CREATE POLICY "Public insert gallery" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete gallery" ON gallery FOR DELETE USING (true);
CREATE POLICY "Public insert blog_posts" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete blog_posts" ON blog_posts FOR DELETE USING (true);
CREATE POLICY "Public insert events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete events" ON events FOR DELETE USING (true);
CREATE POLICY "Public insert experiences" ON experiences FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete experiences" ON experiences FOR DELETE USING (true);
CREATE POLICY "Public insert menu_items" ON menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete menu_items" ON menu_items FOR DELETE USING (true);
CREATE POLICY "Public insert guests" ON guests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete guests" ON guests FOR DELETE USING (true);
CREATE POLICY "Public insert staff" ON staff FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete staff" ON staff FOR DELETE USING (true);
CREATE POLICY "Public insert spa_treatments" ON spa_treatments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete spa_treatments" ON spa_treatments FOR DELETE USING (true);
CREATE POLICY "Public update site_settings" ON site_settings FOR UPDATE USING (true);
