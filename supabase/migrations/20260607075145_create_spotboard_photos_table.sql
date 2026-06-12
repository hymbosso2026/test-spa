CREATE TABLE IF NOT EXISTS spotboard_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  photo_id UUID NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  location TEXT,
  camera_make TEXT,
  camera_model TEXT,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE spotboard_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_all_spotboard_photos" ON spotboard_photos FOR SELECT
  USING (true);

CREATE POLICY "users_insert_own_spotboard_photos" ON spotboard_photos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_spotboard_photos" ON spotboard_photos FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_delete_own_spotboard_photos" ON spotboard_photos FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX spotboard_photos_user_id_idx ON spotboard_photos(user_id);
CREATE INDEX spotboard_photos_created_at_idx ON spotboard_photos(created_at DESC);
CREATE INDEX spotboard_photos_likes_idx ON spotboard_photos(likes_count DESC);