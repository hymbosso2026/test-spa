
-- Allow anyone to view user profiles (needed for traveler gallery/profile)
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Anyone can view profiles" ON user_profiles
  FOR SELECT TO anon, authenticated USING (true);

-- Allow users to insert photos on any travel (not just their own)
DROP POLICY IF EXISTS "Users can insert photos on own travels" ON photos;
CREATE POLICY "Users can insert own photos" ON photos
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
