CREATE TABLE IF NOT EXISTS spotboard_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  photo_id UUID NOT NULL REFERENCES spotboard_photos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(photo_id, user_id)
);

ALTER TABLE spotboard_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_all_ratings" ON spotboard_ratings FOR SELECT
  USING (true);

CREATE POLICY "users_insert_own_ratings" ON spotboard_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_ratings" ON spotboard_ratings FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_delete_own_ratings" ON spotboard_ratings FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX spotboard_ratings_photo_id_idx ON spotboard_ratings(photo_id);
CREATE INDEX spotboard_ratings_user_id_idx ON spotboard_ratings(user_id);