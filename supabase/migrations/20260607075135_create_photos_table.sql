CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_all_photos" ON photos FOR SELECT
  USING (true);

CREATE POLICY "users_insert_own_photos" ON photos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_photos" ON photos FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_delete_own_photos" ON photos FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX photos_user_id_idx ON photos(user_id);
CREATE INDEX photos_created_at_idx ON photos(created_at DESC);