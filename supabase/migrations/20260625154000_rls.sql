-- Enable RLS on all tables
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

-- Drop existing policies
DO $$ DECLARE tab TEXT; pol TEXT; BEGIN
  FOR tab IN SELECT unnest(ARRAY['rooms','bookings','reviews','offers','gallery','blog_posts','events','experiences','menu_items','guests','staff','spa_treatments','site_settings','dashboard_stats']) LOOP
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = tab LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol, tab);
    END LOOP;
  END LOOP;
END $$;

-- Read policies for all tables
CREATE POLICY "anon_read" ON rooms FOR SELECT USING (true);
CREATE POLICY "anon_read" ON bookings FOR SELECT USING (true);
CREATE POLICY "anon_read" ON reviews FOR SELECT USING (true);
CREATE POLICY "anon_read" ON offers FOR SELECT USING (true);
CREATE POLICY "anon_read" ON gallery FOR SELECT USING (true);
CREATE POLICY "anon_read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "anon_read" ON events FOR SELECT USING (true);
CREATE POLICY "anon_read" ON experiences FOR SELECT USING (true);
CREATE POLICY "anon_read" ON menu_items FOR SELECT USING (true);
CREATE POLICY "anon_read" ON guests FOR SELECT USING (true);
CREATE POLICY "anon_read" ON staff FOR SELECT USING (true);
CREATE POLICY "anon_read" ON spa_treatments FOR SELECT USING (true);
CREATE POLICY "anon_read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "anon_read" ON dashboard_stats FOR SELECT USING (true);

-- Insert/Update/Delete policies
CREATE POLICY "anon_insert" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_update" ON bookings FOR UPDATE USING (true);
CREATE POLICY "anon_delete" ON bookings FOR DELETE USING (true);
CREATE POLICY "anon_insert" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert" ON offers FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert" ON experiences FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert" ON menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert" ON guests FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert" ON staff FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_insert" ON spa_treatments FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_update" ON site_settings FOR UPDATE USING (true);
