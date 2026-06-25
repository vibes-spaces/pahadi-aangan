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
